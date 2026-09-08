"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "brisk:intro-seen";

/**
 * A short cinematic intro shown once per session: the wordmark rises while a
 * counter runs to 100, then the curtain lifts. Rendered on the server so the
 * page never flashes before it; on repeat visits it exits immediately.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      const id = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(id);
    }
    const start = performance.now();
    const total = 1150;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out so the count decelerates near 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setTimeout(() => setVisible(false), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-ink text-paper px-[clamp(1.25rem,4vw,4rem)] py-8"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex items-center justify-between eyebrow text-muted">
            <span>Brisk — Digital agency</span>
            <span>Antwerp · Limburg · Remote</span>
          </div>
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }}
              className="text-display leading-none"
            >
              Brisk<span className="text-amber">.</span>
            </motion.div>
            <div className="font-mono text-[clamp(2rem,6vw,5rem)] leading-none tabular-nums text-muted">
              {String(count).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
