"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-2 hover:text-fg transition-colors"
      data-cursor="link"
    >
      {label}
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
