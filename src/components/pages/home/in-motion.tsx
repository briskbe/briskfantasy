"use client";

import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { ShowreelBrowser, SHOWREEL_BROWSER_META, showreelDuration, type ShowreelShot } from "@/components/remotion/compositions";

/** The ShowreelBrowser Remotion composition, framed like the work cards. */
export function InMotion({ shots }: { shots: ShowreelShot[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.7)]">
      <RemotionPlayer
        component={ShowreelBrowser}
        inputProps={{ shots }}
        durationInFrames={showreelDuration(shots.length)}
        fps={SHOWREEL_BROWSER_META.fps}
        width={SHOWREEL_BROWSER_META.width}
        height={SHOWREEL_BROWSER_META.height}
      />
    </div>
  );
}
