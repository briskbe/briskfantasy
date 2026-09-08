import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only infinite marquee (no JS, no layout shift). Children are duplicated
 * for the seamless loop. Set `reverse` to alternate direction between bands.
 */
export function MarqueeBand({
  children,
  className,
  reverse = false,
  speed = 40,
  gap = "gap-10",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
  gap?: string;
}) {
  return (
    <div className={cn("relative flex w-full overflow-hidden mask-fade-x", className)}>
      <div
        className={cn("flex w-max shrink-0 items-center animate-marquee", gap)}
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className={cn("flex shrink-0 items-center", gap)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", gap)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
