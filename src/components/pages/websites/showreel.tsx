"use client";

import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { ShowreelBrowser, SHOWREEL_BROWSER_META, showreelDuration, type ShowreelShot } from "@/components/remotion/compositions";

/** Remotion browser showreel of the live sites, framed for a dark section. */
export function WebsitesShowreel({ shots, label }: { shots: ShowreelShot[]; label: string }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 lg:rounded-3xl">
      <RemotionPlayer
        component={ShowreelBrowser}
        inputProps={{ shots }}
        durationInFrames={showreelDuration(shots.length)}
        fps={SHOWREEL_BROWSER_META.fps}
        width={SHOWREEL_BROWSER_META.width}
        height={SHOWREEL_BROWSER_META.height}
      />
      <figcaption className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" aria-hidden />
        {label}
      </figcaption>
    </figure>
  );
}
