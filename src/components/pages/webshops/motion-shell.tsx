"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Page-level motion context. `reducedMotion="user"` makes every motion/react
 * animation inside the page respect prefers-reduced-motion (the global CSS rule
 * only collapses CSS animations, not JS-driven ones). Server-rendered children
 * are passed through, so the sections below stay server components.
 */
export function MotionShell({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
