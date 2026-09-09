import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ScreenRect } from "./screen-crops";

/**
 * CSS-only iPhone-style frame (9:19.5), thin bezel, dynamic island and home
 * indicator. Put a <PhoneScreen> (or any absolutely positioned child) inside;
 * the display clips it with the inner radius.
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

/**
 * A single app screen inside a <PhoneFrame>. `rect` comes from `screenRect()`
 * and positions the source mockup so the phone's own screen — status bar
 * included — fills the display exactly, at the same scale on every screen.
 */
export function PhoneScreen({
  rect,
  alt,
  sizes,
  priority = false,
  className,
}: {
  rect: ScreenRect;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-paper", className)}>
      <div
        className="absolute"
        style={{ left: `${rect.left}%`, top: `${rect.top}%`, width: `${rect.width}%`, height: `${rect.height}%` }}
      >
        <Image src={rect.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
