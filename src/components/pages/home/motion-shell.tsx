"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Honours `prefers-reduced-motion` for every motion/react animation on this
 * page (the global CSS override only reaches CSS animations, not WAAPI).
 * With `reducedMotion="user"` motion drops transform/filter animations and
 * keeps opacity, so entrances still read but nothing slides or blurs.
 */
export function MotionShell({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
