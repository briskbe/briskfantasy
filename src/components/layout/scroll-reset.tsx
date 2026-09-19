"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Start each page at the top, including reloads and browser history visits. */
export function ScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    let frame = 0;
    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // Next also manages scroll during navigation. Finish after that commit.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    };
    reset();
    window.addEventListener("pageshow", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", reset);
    };
  }, [pathname]);

  return null;
}
