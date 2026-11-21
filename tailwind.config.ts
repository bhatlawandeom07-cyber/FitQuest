import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        surface: "#0a0a0a",
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#18181b",
          foreground: "#a1a1aa",
        },
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          "system-ui",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro"',
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
