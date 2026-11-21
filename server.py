import http.server
import os
import sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        try:
            msg = format % args
        except Exception:
            msg = " ".join(str(a) for a in args)
        print(f"[{self.log_date_time_string()}] {msg}", flush=True)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    server_address = ('0.0.0.0', port)
    
    server = http.server.ThreadingHTTPServer(server_address, NoCacheHandler)
    print(f"[FitQuest Server] Serving HTTP on 0.0.0.0 port {port} (http://localhost:{port}/)...", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        server.server_close()
