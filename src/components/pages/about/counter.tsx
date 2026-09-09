"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

/**
 * Local copy of `@/components/ui/counter` with two fixes this page needs and
 * that cannot be made in the shared file (owned elsewhere):
 *  - it renders the real figure on the server, so the band reads
 *    "17 live websites" without JS and never flashes "0";
 *  - it starts the count near the target and skips it entirely for reduced
 *    motion or small values, so "30" does not tick up from zero.
 */
export function Counter({ value, className, decimals = 0 }: { value: number; className?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { duration: 1200, bounce: 0 });
  const [display, setDisplay] = useState(() => value.toFixed(decimals));

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !inView) return;
    // Count over the last stretch only: a short, confident settle instead of a
    // slot machine spinning up from nothing.
    mv.jump(Math.round(value * 0.55));
    mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => spring.on("change", (v) => setDisplay(v.toFixed(decimals))), [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
