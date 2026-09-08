import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only iPhone-style frame (9:19.5), thin bezel, dynamic island and home
 * indicator. Put an absolutely positioned image/video inside; the display
 * clips it with the inner radius.
 */
export function PhoneFrame({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={cn(
        "relative aspect-[9/19.5] rounded-[2.5rem] bg-ink-3 p-[3px]",
        "shadow-[inset_0_0_0_1px_rgba(244,241,234,0.22),0_40px_90px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-[16%] h-[5%] w-[3px] rounded-l bg-ink-4 shadow-[inset_0_0_0_1px_rgba(244,241,234,0.12)]" />
      <span aria-hidden className="absolute -left-[3px] top-[23%] h-[8%] w-[3px] rounded-l bg-ink-4 shadow-[inset_0_0_0_1px_rgba(244,241,234,0.12)]" />
      <span aria-hidden className="absolute -left-[3px] top-[32%] h-[8%] w-[3px] rounded-l bg-ink-4 shadow-[inset_0_0_0_1px_rgba(244,241,234,0.12)]" />
      <span aria-hidden className="absolute -right-[3px] top-[26%] h-[12%] w-[3px] rounded-r bg-ink-4 shadow-[inset_0_0_0_1px_rgba(244,241,234,0.12)]" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-ink">
        {children}
        {/* dynamic island */}
        <span aria-hidden className="absolute left-1/2 top-[1.4%] z-10 h-[3.2%] w-[26%] -translate-x-1/2 rounded-full bg-ink shadow-[inset_0_0_0_1px_rgba(244,241,234,0.06)]" />
        {/* home indicator */}
        <span aria-hidden className="absolute bottom-[1.1%] left-1/2 z-10 h-[0.5%] w-[36%] -translate-x-1/2 rounded-full bg-paper/60 mix-blend-difference" />
      </div>
    </div>
  );
}
