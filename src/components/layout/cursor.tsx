"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/hooks/use-media-query";

/**
 * A quiet custom cursor: a small amber dot that follows the pointer and a
 * larger ring that expands over interactive elements. Elements can request a
 * label with `data-cursor-label="Bekijk"` (shown inside the ring) or hide the
 * cursor with `data-cursor="hide"` (e.g. over video players).
 * Only rendered for fine pointers (mouse / trackpad).
 */
export function Cursor() {
  const enabled = useFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"default" | "link" | "hide">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor], [data-cursor-label], input, textarea, select, label",
      );
      if (!el) {
        setMode("default");
        setLabel(null);
        return;
      }
      const explicit = el.dataset.cursor;
      if (explicit === "hide") {
        setMode("hide");
        setLabel(null);
        return;
      }
      setMode("link");
      setLabel(el.dataset.cursorLabel ?? null);
    };
    const leave = () => setMode("hide");
    const enter = () => setMode("default");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 88 : mode === "link" ? 52 : 36;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-2 rounded-full bg-amber"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: mode === "hide" ? 0 : 1, scale: mode === "link" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-amber/70 bg-amber/0 text-ink"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: mode === "hide" ? 0 : 1,
          backgroundColor: label ? "rgba(255,159,77,1)" : mode === "link" ? "rgba(255,159,77,0.14)" : "rgba(255,159,77,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="eyebrow !tracking-[0.12em] text-[0.62rem] font-medium"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
