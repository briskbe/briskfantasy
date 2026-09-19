"use client";

import { LazyShowreel, type ShowreelShot } from "@/components/remotion/lazy-showreel";

/**
 * Remotion browser showreel of the live sites.
 *
 * The caption sits below the player in normal flow: absolutely positioned it
 * landed on top of the composition's own browser chrome on small screens.
 */
export function WebsitesShowreel({ shots, label, caption }: { shots: ShowreelShot[]; label: string; caption: string }) {
  return (
    <figure className="flex flex-col">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-ink-3 to-ink lg:rounded-3xl">
        <LazyShowreel shots={shots} />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span className="text-fg">{label}</span>
        <span aria-hidden className="h-px w-6 bg-line-2" />
        <span className="normal-case tracking-normal">{caption}</span>
      </figcaption>
    </figure>
  );
}
