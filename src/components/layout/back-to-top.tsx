"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      className="group inline-flex items-center gap-2 hover:text-fg transition-colors"
      data-cursor="link"
    >
      {label}
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
