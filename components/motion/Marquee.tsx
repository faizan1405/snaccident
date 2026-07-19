import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Seamless infinite marquee. Two identical tracks translate -100% in lockstep.
 * CSS pauses the animation under prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  children,
  reverse = false,
  durationSeconds = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  durationSeconds?: number;
  className?: string;
}) {
  const trackStyle: CSSProperties = {
    animationDuration: `${durationSeconds}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div className={cn("flex w-full overflow-hidden", className)} aria-hidden>
      <div className="animate-marquee flex shrink-0" style={trackStyle}>
        {children}
      </div>
      <div className="animate-marquee flex shrink-0" style={trackStyle}>
        {children}
      </div>
    </div>
  );
}
