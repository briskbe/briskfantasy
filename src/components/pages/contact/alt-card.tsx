"use client";

import type { ReactNode } from "react";
import { TiltCard } from "@/components/spell/tilt-card";
import { cn } from "@/lib/utils";

/** Spell TiltCard tuned down for a light, editorial card. */
export function AltCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <TiltCard
      tiltLimit={4}
      scale={1.01}
      perspective={1400}
      effect="gravitate"
      spotlight
      className={cn(
        "flex h-full min-h-[19rem] flex-col rounded-3xl border border-line bg-bg-2 p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(7,8,12,0.25)] sm:p-8",
        className,
      )}
    >
      {children}
    </TiltCard>
  );
}
