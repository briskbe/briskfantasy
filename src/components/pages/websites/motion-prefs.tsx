"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Page-scoped reduced-motion contract. The global CSS reset only collapses CSS
 * animations, so every Motion-driven entrance on this page (Reveal, SlideUpText,
 * parallax, accordion height) would still run for visitors who asked their OS
 * for less motion. `reducedMotion="user"` makes Motion drop transform animations
 * and keep opacity only, for every descendant.
 */
export function MotionPrefs({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
