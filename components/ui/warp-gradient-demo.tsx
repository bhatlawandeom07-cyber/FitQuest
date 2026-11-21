"use client";

import WarpGradient from "@/components/ui/warp-gradient";

export default function WarpGradientDemo() {
  return (
    <div className="relative isolate h-screen w-full overflow-hidden">
      <WarpGradient preset="tide" grain={0.25} />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl font-semibold text-white">Into the blue</h2>
      </div>
    </div>
  );
}

export { WarpGradientDemo };
