import { AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glow, Grain } from "./atoms";
import { brisk, clamp, ease, rgba, smooth } from "./shared";

export type DeviceScreen =
  | string
  | {
      src: string;
      /** Per-screen magnification on top of `fit` (overrides the global `zoom`) */
      zoom?: number;
      /**
       * Where the zoomed window sits, 0–1 per axis (CSS object-position + transform-origin).
       * 0 shows the top/left edge, 0.5 the centre (default), 1 the bottom/right edge; the
       * window never leaves the image. Use it to aim at the phone inside a landscape mockup.
       */
      focus?: { x: number; y: number };
    };

export type DeviceReelProps = {
  /** Image srcs (public paths, e.g. "/portfolio/016-w010.webp") or `{ src, zoom, focus }` objects */
  screens: DeviceScreen[];
  /** How a screen fills the phone display. "cover" (default) crops to the centre; "contain" letterboxes on ink. */
  fit?: "cover" | "contain";
  /**
   * Extra magnification on top of `fit` (default 1). Use ~1.5–1.8 for the
   * 16:12 portfolio mockups so the phone inside the mockup fills the display.
   */
  zoom?: number;
};

const FPS = 30;
const W = 1080;
const H = 1350;
const PAD = 81; // 6% of 1350
/** Frames per screen (~3.2s) */
export const DEVICE_SCREEN_FRAMES = 96;
const OVERLAP = 20;

export function deviceReelDuration(n: number) {
  return Math.max(1, n) * DEVICE_SCREEN_FRAMES;
}

export const DEVICE_REEL_META = {
  fps: FPS,
  width: W,
  height: H,
  durationInFrames: deviceReelDuration(3),
} as const;

// Device geometry (roughly iPhone 15 Pro proportions)
const DEV_H = H - PAD * 2; // 1188
const DEV_W = Math.round(DEV_H / 2.16); // 550
const DEV_X = (W - DEV_W) / 2;
const DEV_Y = PAD;
const RADIUS = 54;
const BEZEL = 14;
const SCREEN_RADIUS = RADIUS - BEZEL + 2;

function Screen({ src, fit, zoom, focus, isLast }: { src: string; fit: "cover" | "contain"; zoom: number; focus: { x: number; y: number }; isLast: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: smooth, durationInFrames: 36 });
  const y = interpolate(enter, [0, 1], [120, 0]);
  const exit = isLast ? interpolate(frame, [DEVICE_SCREEN_FRAMES - 16, DEVICE_SCREEN_FRAMES], [0, 1], { ...clamp, easing: ease.inOutQuart }) : 0;
  // Ken Burns: slow zoom + gentle drift while the screen holds
  const kb = zoom * interpolate(frame, [0, DEVICE_SCREEN_FRAMES + OVERLAP], [1, 1.1], { ...clamp, easing: ease.brisk });
  const drift = interpolate(frame, [0, DEVICE_SCREEN_FRAMES + OVERLAP], [0, -14], clamp);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: enter * (1 - exit),
        transform: `translateY(${y - 40 * exit}px)`,
        willChange: "transform, opacity",
        background: fit === "contain" ? brisk.ink2 : undefined,
      }}
    >
      <Img
        src={src}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: fit,
          objectPosition: `${focus.x * 100}% ${focus.y * 100}%`,
          transform: `scale(${kb}) translateY(${drift}px)`,
          transformOrigin: `${focus.x * 100}% ${focus.y * 100}%`,
          willChange: "transform",
        }}
      />
    </div>
  );
}

/**
 * DeviceReel: an iPhone-style frame cycling through app screens with a
 * vertical slide + fade, each screen slowly zooming (Ken Burns) while it holds.
 * Duration: `deviceReelDuration(screens.length)`.
 */
export function DeviceReel({ screens, fit = "cover", zoom = 1 }: DeviceReelProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const list = (screens.length > 0 ? screens : [""]).map((s) => (typeof s === "string" ? { src: s } : s));

  const t = (frame / Math.max(1, durationInFrames)) * Math.PI * 2;
  const gx = W * 0.5 + Math.sin(t) * 160;
  const gy = H * 0.55 + Math.cos(t) * 120;
  const deviceIn = spring({ frame, fps: FPS, config: smooth, durationInFrames: 40 });
  // Sheen slides across the glass once per loop
  const sheenX = interpolate(Math.sin(t * 0.5) ** 2, [0, 1], [-DEV_W, DEV_W * 1.6]);

  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${brisk.ink} 0%, ${brisk.ink2} 100%)`, overflow: "hidden" }}>
      <Glow x={gx} y={gy} size={1300} opacity={0.5} />
      <Grain opacity={0.06} />

      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          left: DEV_X + 40,
          top: DEV_Y + 60,
          width: DEV_W - 80,
          height: DEV_H,
          borderRadius: RADIUS,
          boxShadow: `0 80px 160px ${rgba(brisk.ink, 0.9)}`,
          opacity: deviceIn,
        }}
      />

      {/* Device body */}
      <div
        style={{
          position: "absolute",
          left: DEV_X,
          top: DEV_Y,
          width: DEV_W,
          height: DEV_H,
          borderRadius: RADIUS,
          background: `linear-gradient(160deg, ${brisk.ink4} 0%, ${brisk.ink3} 45%, ${brisk.ink2} 100%)`,
          boxShadow: `inset 0 0 0 1px ${rgba(brisk.paper, 0.22)}, inset 0 0 0 3px ${brisk.ink2}, inset 0 0 0 4px ${rgba(brisk.paper, 0.06)}, 0 30px 80px ${rgba(brisk.ink, 0.8)}`,
          opacity: deviceIn,
          transform: `translateY(${(1 - deviceIn) * 60}px)`,
        }}
      >
        {/* Bezel highlight along the top-left edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS,
            background: `linear-gradient(135deg, ${rgba(brisk.amber2, 0.28)} 0%, ${rgba(brisk.paper, 0)} 28%, ${rgba(brisk.paper, 0)} 72%, ${rgba(brisk.sky, 0.14)} 100%)`,
            pointerEvents: "none",
          }}
        />
        {/* Side buttons */}
        {[
          { top: 210, height: 44, left: -3 },
          { top: 290, height: 84, left: -3 },
          { top: 400, height: 84, left: -3 },
          { top: 330, height: 130, right: -3 },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              height: b.height,
              width: 4,
              left: b.left,
              right: b.right,
              borderRadius: 2,
              background: brisk.ink4,
              boxShadow: `inset 0 0 0 1px ${rgba(brisk.paper, 0.12)}`,
            }}
          />
        ))}

        {/* Display */}
        <div
          style={{
            position: "absolute",
            left: BEZEL,
            top: BEZEL,
            right: BEZEL,
            bottom: BEZEL,
            borderRadius: SCREEN_RADIUS,
            overflow: "hidden",
            background: brisk.ink,
          }}
        >
          {list.map((screen, i) => {
            const isLast = i === list.length - 1;
            return (
              <Sequence key={screen.src + i} from={i * DEVICE_SCREEN_FRAMES} durationInFrames={isLast ? DEVICE_SCREEN_FRAMES : DEVICE_SCREEN_FRAMES + OVERLAP} layout="none">
                <Screen src={screen.src} fit={fit} zoom={Math.max(1, screen.zoom ?? zoom)} focus={screen.focus ?? { x: 0.5, y: 0.5 }} isLast={isLast} />
              </Sequence>
            );
          })}

          {/* Glass sheen */}
          <div
            style={{
              position: "absolute",
              top: -200,
              bottom: -200,
              width: 220,
              left: sheenX,
              transform: "rotate(18deg)",
              background: `linear-gradient(90deg, ${rgba(brisk.paper, 0)} 0%, ${rgba(brisk.paper, 0.07)} 50%, ${rgba(brisk.paper, 0)} 100%)`,
              pointerEvents: "none",
            }}
          />

          {/* Dynamic island */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: "50%",
              width: 132,
              height: 38,
              marginLeft: -66,
              borderRadius: 999,
              background: brisk.ink,
              boxShadow: `inset 0 0 0 1px ${rgba(brisk.paper, 0.06)}`,
            }}
          >
            <div style={{ position: "absolute", right: 12, top: 11, width: 16, height: 16, borderRadius: 999, background: brisk.ink3, boxShadow: `inset 0 0 0 2px ${brisk.ink2}` }} />
          </div>

          {/* Home indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              width: 150,
              height: 5,
              marginLeft: -75,
              borderRadius: 999,
              background: rgba(brisk.paper, 0.55),
              mixBlendMode: "difference",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}
