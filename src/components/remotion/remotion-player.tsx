"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import type { PlayerRef } from "@remotion/player";
import { cn } from "@/lib/utils";

const Player = dynamic(() => import("@remotion/player").then((m) => m.Player), { ssr: false });

/**
 * Thin wrapper around the Remotion <Player>. Compositions live in
 * `src/components/remotion/compositions/*` and are pure React (no browser-only
 * APIs) so they can also be rendered to MP4 with the Remotion CLI.
 * The player only plays while visible to save CPU.
 *
 * The Player is imported dynamically (`ssr: false`), so its ref attaches after
 * the first in-view measurement; playback is (re)started once both the ref and
 * the in-view state are known, so a reel that is already on screen on load
 * starts without a scroll nudge.
 */
export function RemotionPlayer<T extends Record<string, unknown>>({
  component,
  inputProps,
  durationInFrames,
  fps = 30,
  width,
  height,
  className,
  loop = true,
  playbackRate = 1,
}: {
  component: FC<T>;
  inputProps: T;
  durationInFrames: number;
  fps?: number;
  width: number;
  height: number;
  className?: string;
  loop?: boolean;
  playbackRate?: number;
}) {
  const playerRef = useRef<PlayerRef | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  const attach = useCallback((p: PlayerRef | null) => {
    playerRef.current = p;
    setReady(p !== null);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const p = playerRef.current;
    if (!ready || !p) return;
    if (inView) p.play();
    else p.pause();
  }, [inView, ready]);

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)} style={{ aspectRatio: `${width} / ${height}` }} data-cursor="hide">
      <Player
        ref={attach}
        component={component as FC<Record<string, unknown>>}
        inputProps={inputProps}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={width}
        compositionHeight={height}
        loop={loop}
        autoPlay={false}
        controls={false}
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        initiallyMuted
        playbackRate={playbackRate}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
