"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Page-level motion context.
 *
 * `globals.css` only collapses *CSS* animations for `prefers-reduced-motion`,
 * so every motion/react `initial/animate/whileInView` on this page still moved.
 * `reducedMotion="user"` makes every transform-based animation in the subtree
 * instant while keeping opacity fades, which covers the shared `Reveal`,
 * `WordsStagger` and the accordion without forking those components.
 */
export function SoftwareMotionConfig({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
