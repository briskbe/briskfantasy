"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * The global CSS `prefers-reduced-motion` rule only collapses CSS animations;
 * motion/react drives its entrances through WAAPI/JS and ignores it. This
 * scopes `reducedMotion="user"` over the whole page, so for a reduced-motion
 * visitor every transform/filter animation here (including the shared
 * <Reveal> rises and blurs) resolves instantly and only opacity remains.
 *
 * It lives in this folder rather than the app layout because the layout is
 * shared with the other pages and is not this page's to change.
 */
export function AboutMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
