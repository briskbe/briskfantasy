"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

/**
 * Fade + rise + un-blur when scrolled into view. Use `delay` for manual
 * stagger, or wrap several in <RevealGroup> for automatic stagger.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "li" | "span" | "figure";
  once?: boolean;
  amount?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn("will-change-[transform,opacity,filter]", className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay}
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
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "figure" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={cn("will-change-[transform,opacity,filter]", className)} variants={revealVariants}>
      {children}
    </Tag>
  );
}
