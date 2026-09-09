"use client";

import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { ShowreelBrowser, SHOWREEL_BROWSER_META, showreelDuration, type ShowreelShot } from "@/components/remotion/compositions";

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
        <RemotionPlayer
          className="relative"
          component={ShowreelBrowser}
          inputProps={{ shots }}
          durationInFrames={showreelDuration(shots.length)}
          fps={SHOWREEL_BROWSER_META.fps}
          width={SHOWREEL_BROWSER_META.width}
          height={SHOWREEL_BROWSER_META.height}
        />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        <span className="text-fg">{label}</span>
        <span aria-hidden className="h-px w-6 bg-line-2" />
        <span className="normal-case tracking-normal">{caption}</span>
      </figcaption>
    </figure>
  );
}
