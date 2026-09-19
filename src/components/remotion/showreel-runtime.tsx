"use client";

import { RemotionPlayer } from "./remotion-player";
import { ShowreelBrowser, SHOWREEL_BROWSER_META, showreelDuration, type ShowreelShot } from "./compositions/showreel-browser";

/** This module and its Remotion imports stay behind LazyShowreel's viewport gate. */
export default function ShowreelRuntime({ shots }: { shots: ShowreelShot[] }) {
  return (
    <RemotionPlayer
      component={ShowreelBrowser}
      inputProps={{ shots }}
      durationInFrames={showreelDuration(shots.length)}
      fps={SHOWREEL_BROWSER_META.fps}
      width={SHOWREEL_BROWSER_META.width}
      height={SHOWREEL_BROWSER_META.height}
    />
  );
}
