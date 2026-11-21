"use client";

import * as React from "react";

interface RandomLetterSwapNavProps {
  links?: string[];
  activeLink?: string;
  onSelect?: (link: string) => void;
  className?: string;
}

const defaultLinks = ["Home", "Leaderboard", "Streaks Card", "Simulator", "Splits"];

export default function RandomLetterSwapNav({
  links = defaultLinks,
  activeLink,
  onSelect,
  className = "",
}: RandomLetterSwapNavProps) {
  return (
    <div className={`flex items-center justify-center p-1 rounded-full border border-white/[0.08] bg-zinc-950/70 backdrop-blur-2xl shadow-xl ${className}`}>
      <nav className="flex items-center gap-1 sm:gap-1.5">
        {links.map((link) => {
          const isActive = activeLink === link;
          return (
            <button
              key={link}
              onClick={() => onSelect && onSelect(link)}
              type="button"
              className={`group relative inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer outline-none select-none ${
                isActive
                  ? "text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {/* Active / Inactive Glass Pill Layer */}
              {isActive ? (
                <div className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none" />
              ) : (
                <div className="absolute inset-0 rounded-full bg-transparent hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-colors pointer-events-none" />
              )}

              {/* Clean Static Label */}
              <span className="relative z-10 flex items-center gap-2">
                <span>{link}</span>
                {isActive && (
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
