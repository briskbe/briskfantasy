"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fade + rise + un-blur on entry.
 *
 * The variant *values* are identical whatever the visitor prefers — a branch
 * here would make the server and the client render different inline styles and
 * React would refuse to patch it up. Only the transition changes: with
 * "reduce" the blur and the rise land instantly and just the opacity fades,
 * while `MotionConfig reducedMotion="user"` (see motion-provider.tsx) takes
 * care of the transforms motion drives itself.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: ({ delay = 0, reduced = false }: { delay?: number; reduced?: boolean }) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: reduced
      ? { opacity: { duration: 0.35, delay: Math.min(delay, 0.15) }, y: { duration: 0 }, filter: { duration: 0 } }
      : { duration: 0.9, ease: EASE, delay },
  }),
};

type Tag = "div" | "p" | "h2" | "h3" | "li" | "span" | "figure" | "article" | "ul" | "ol";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
  amount?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag
      className={cn("will-change-[transform,opacity,filter]", className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={{ delay, reduced }}
    >
      {children}
    </Tag>
  );
}

/** Container that staggers any nested <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: Tag;
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={{ delay: 0, reduced }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0.02 : stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag
      className={cn("will-change-[transform,opacity,filter]", className)}
      variants={variants}
      custom={{ delay: 0, reduced }}
    >
      {children}
    </Tag>
  );
}
