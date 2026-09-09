import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glow, Grain } from "./atoms";
import { brisk, clamp, ease, fonts, rgba, smooth } from "./shared";

export type WordmarkReelProps = {
  tagline: string;
};

const FPS = 30;
const W = 1600;
const H = 900;
const DURATION = 150; // 5s, loop-friendly

export const WORDMARK_REEL_META = {
  fps: FPS,
  width: W,
  height: H,
  durationInFrames: DURATION,
} as const;

const LETTERS = ["B", "r", "i", "s", "k"];
const SIZE = 300;
const PERIOD_DROP_AT = 26;
const RING_AT = PERIOD_DROP_AT + 13;
const TAGLINE_AT = 58;

/**
 * WordmarkReel: "Brisk." — letters rise with staggered smooth springs, the
 * lime period drops with a bounce and emits a ring, then the tagline types
 * in mono. Fades out at the end so it loops seamlessly.
 */
export function WordmarkReel({ tagline }: WordmarkReelProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outro = interpolate(frame, [DURATION - 20, DURATION], [0, 1], { ...clamp, easing: ease.inOutQuart });
  const outroStyle = {
    opacity: 1 - outro,
    filter: outro > 0.02 ? `blur(${outro * 12}px)` : undefined,
    transform: `translateY(${-30 * outro}px)`,
  } as const;

  // Period: bouncy drop (the one deliberate bounce in the library)
  const drop = spring({ frame, fps, delay: PERIOD_DROP_AT, config: { damping: 11, stiffness: 170, mass: 0.9 }, durationInFrames: 40 });
  const periodY = interpolate(drop, [0, 1], [-260, 0]);
  const periodOpacity = interpolate(frame, [PERIOD_DROP_AT, PERIOD_DROP_AT + 4], [0, 1], clamp);
  // Squash on impact
  const squash = interpolate(frame, [RING_AT - 2, RING_AT + 2, RING_AT + 10], [1, 0.82, 1], { ...clamp, easing: ease.outExpo });

  // Ring emitted at impact
  const ring = interpolate(frame, [RING_AT, RING_AT + 40], [0, 1], { ...clamp, easing: ease.outExpo });
  const ringScale = interpolate(ring, [0, 1], [0.2, 4.2]);
  const ringOpacity = interpolate(ring, [0, 0.08, 1], [0, 0.9, 0], clamp);
  const flash = interpolate(frame, [RING_AT, RING_AT + 14], [0.6, 0], { ...clamp, easing: ease.outExpo });

  // Tagline typing
  const typed = Math.round(interpolate(frame, [TAGLINE_AT, TAGLINE_AT + 44], [0, tagline.length], { ...clamp, easing: ease.outQuint }));
  const caretOn = frame >= TAGLINE_AT - 6 && (frame < TAGLINE_AT + 50 ? Math.floor(frame / 7) % 2 === 0 : Math.floor(frame / 16) % 2 === 0);
  const taglineIn = spring({ frame, fps, delay: TAGLINE_AT - 8, config: smooth, durationInFrames: 30 });

  const glowT = (frame / DURATION) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ background: brisk.ink, overflow: "hidden" }}>
      <Glow x={W * 0.58 + Math.sin(glowT) * 80} y={H * 0.52 + Math.cos(glowT) * 40} size={1300} opacity={0.34 + flash * 0.5} />
      <Glow x={W * 0.08} y={H * 0.95} size={700} color={brisk.teal} opacity={0.12} />
      <Grain opacity={0.05} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 44,
          ...outroStyle,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: fonts.sans,
            fontSize: SIZE,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            fontWeight: 500,
            color: brisk.paper,
            paddingLeft: "0.05em",
          }}
        >
          {LETTERS.map((ch, i) => {
            const s = spring({ frame, fps, delay: 4 + i * 4, config: smooth, durationInFrames: 40 });
            return (
              <span key={ch + i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
                <span
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - s) * 110}%)`,
                    opacity: interpolate(s, [0, 0.35, 1], [0, 1, 1]),
                    willChange: "transform",
                  }}
                >
                  {ch}
                </span>
              </span>
            );
          })}
          {/* Lime period */}
          <span style={{ position: "relative", display: "inline-block", width: "0.32em", height: "0.72em", marginLeft: "0.02em" }}>
            {/* Ring */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "100%",
                width: "0.26em",
                height: "0.26em",
                marginLeft: "-0.13em",
                marginTop: "-0.26em",
                borderRadius: 999,
                border: `2px solid ${brisk.brand}`,
                boxShadow: `0 0 24px ${rgba(brisk.brand, 0.5)}`,
                opacity: ringOpacity,
                transform: `scale(${ringScale})`,
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "0.03em",
                bottom: 0,
                width: "0.26em",
                height: "0.26em",
                borderRadius: 999,
                background: brisk.brand,
                boxShadow: `0 0 ${24 + flash * 60}px ${rgba(brisk.brand, 0.55 + flash * 0.4)}`,
                opacity: periodOpacity,
                transform: `translateY(${periodY}px) scale(${1 / squash}, ${squash})`,
                transformOrigin: "50% 100%",
                willChange: "transform",
              }}
            />
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 28,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: brisk.muted,
            opacity: taglineIn,
            transform: `translateY(${(1 - taglineIn) * 16}px)`,
            display: "flex",
            alignItems: "center",
            height: 40,
            maxWidth: W * 0.88,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <span>{tagline.slice(0, typed)}</span>
          <span style={{ display: "inline-block", width: 12, height: 28, marginLeft: 8, background: brisk.brand, opacity: caretOn ? 1 : 0 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
}
