"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Wraps the page so every motion/react animation below it honours the
 * visitor's "reduce motion" setting: transforms and layout animations are
 * dropped, opacity is kept. The global CSS rule only shortens CSS animations,
 * which motion/react does not use.
 */
export function AppsMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
