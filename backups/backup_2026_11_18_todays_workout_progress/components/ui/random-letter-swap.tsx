"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export interface RandomLetterSwapProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: { duration?: number; type?: string; [key: string]: any };
}

export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition,
  ...props
}: RandomLetterSwapProps) {
  const [displayText, setDisplayText] = React.useState(label);
  const intervalRef = React.useRef<number | null>(null);

  const startScramble = () => {
    let iteration = 0;
    const maxIterations = label.length * 3;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        label
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration / 3) {
              return label[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(label);
      }

      iteration += 1;
    }, Math.max(20, (staggerDuration || 0.025) * 1000));
  };

  React.useEffect(() => {
    setDisplayText(label);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [label]);

  return (
    <span
      onMouseEnter={startScramble}
      className={cn(
        "inline-block font-medium transition-colors duration-200 select-none",
        className
      )}
      {...props}
    >
      {displayText}
    </span>
  );
}

export default RandomLetterSwap;
