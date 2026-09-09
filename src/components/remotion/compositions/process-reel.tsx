import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glow, Grain, Hairline } from "./atoms";
import { brisk, clamp, ease, fonts, monoLabel, smooth } from "./shared";

export type ProcessStep = { index: string; title: string; body: string };

export type ProcessReelProps = {
  steps: ProcessStep[];
  eyebrow: string;
};

const FPS = 30;
const W = 1600;
const H = 1000;
const PAD = 96; // 6% of 1600
/** Frames per step (~4s) */
export const PROCESS_STEP_FRAMES = 120;
/** Frames a step's exit overlaps the next step's entrance */
const EXIT = 14;

export function processReelDuration(stepCount: number) {
  return Math.max(1, stepCount) * PROCESS_STEP_FRAMES;
}

export const PROCESS_REEL_META = {
  fps: FPS,
  width: W,
  height: H,
  durationInFrames: processReelDuration(4),
} as const;

function Step({ step, position, total, length }: { step: ProcessStep; position: number; total: number; length: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exit: fade + rise + blur during the last frames of the step, while the next step already enters.
  const exit = interpolate(frame, [length - EXIT, length - 2], [0, 1], {
    ...clamp,
    easing: ease.inOutQuart,
  });
  const exitY = -70 * exit;
  const exitOpacity = interpolate(exit, [0, 0.7], [1, 0], clamp);
  const exitBlur = 12 * exit;

  // Entrances start once the previous step is mostly gone (see EXIT overlap).
  const lead = position === 0 ? 0 : 6;
  const indexIn = spring({ frame, fps, config: smooth, delay: lead, durationInFrames: 30 });
  const words = step.title.split(" ");
  const bodyIn = spring({ frame, fps, config: smooth, delay: lead + 14, durationInFrames: 36 });

  return (
    <AbsoluteFill>
      {/* Big mono index, top-left of the content block */}
      <div
        style={{
          position: "absolute",
          left: PAD,
          top: 236,
          fontFamily: fonts.mono,
          fontSize: 30,
          letterSpacing: "0.12em",
          color: brisk.brand,
          opacity: indexIn * exitOpacity,
          transform: `translateY(${(1 - indexIn) * 20 + exitY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <span>{step.index}</span>
        <span style={{ width: interpolate(indexIn, [0, 1], [0, 72]), height: 1, background: brisk.brand, display: "block" }} />
        <span style={{ color: brisk.muted, letterSpacing: "0.18em", fontSize: 18 }}>
          {String(position + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Headline: words rise + un-blur with staggered smooth springs */}
      <div
        style={{
          position: "absolute",
          left: PAD - 6,
          top: 300,
          width: W - PAD * 2 - 220,
          display: "flex",
          flexWrap: "wrap",
          columnGap: "0.24em",
          rowGap: 0,
          fontFamily: fonts.sans,
          fontSize: 124,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          fontWeight: 500,
          color: brisk.paper,
          padding: "0 6px",
          transform: `translateY(${exitY}px)`,
          filter: exitBlur > 0.2 ? `blur(${exitBlur}px)` : undefined,
          opacity: exitOpacity,
        }}
      >
        {words.map((word, i) => {
          const s = spring({ frame, fps, config: smooth, delay: lead + 3 + i * 4, durationInFrames: 40 });
          const blur = interpolate(s, [0, 1], [14, 0]);
          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                opacity: s,
                transform: `translateY(${(1 - s) * 60}px)`,
                filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
                willChange: "transform, filter",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Body copy, bottom-left, above the progress line */}
      <div
        style={{
          position: "absolute",
          left: PAD,
          bottom: PAD + 96,
          width: 660,
          fontFamily: fonts.sans,
          fontSize: 30,
          lineHeight: 1.45,
          letterSpacing: "-0.012em",
          color: brisk.muted,
          opacity: bodyIn * exitOpacity,
          transform: `translateY(${(1 - bodyIn) * 24 + exitY}px)`,
          textWrap: "pretty",
        }}
      >
        {step.body}
      </div>

    </AbsoluteFill>
  );
}

/**
 * ProcessReel: a numbered agency process, one step per ~4s. Loop-friendly:
 * the last step exits to the same empty state the first step enters from.
 */
export function ProcessReel({ steps, eyebrow }: ProcessReelProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const list = steps.length > 0 ? steps : [{ index: "01", title: "—", body: "" }];
  const total = list.length;

  // Drifting glow: one full figure-of-eight per loop so frame 0 == last frame.
  const t = (frame / Math.max(1, durationInFrames)) * Math.PI * 2;
  const gx = W * 0.78 + Math.sin(t) * 140;
  const gy = H * 0.34 + Math.sin(t * 2) * 90;

  const current = Math.min(total - 1, Math.floor(frame / PROCESS_STEP_FRAMES));
  const eyebrowIn = spring({ frame, fps: FPS, config: smooth, durationInFrames: 30 });

  // Per-step progress line: grows across the step, fades just before the hand-over.
  const stepLocal = frame - current * PROCESS_STEP_FRAMES;
  const progress = interpolate(stepLocal, [2, PROCESS_STEP_FRAMES - EXIT], [0, 1], { ...clamp, easing: ease.outQuint });
  const progressOpacity = interpolate(stepLocal, [PROCESS_STEP_FRAMES - 8, PROCESS_STEP_FRAMES - 1], [1, 0], clamp);

  return (
    <AbsoluteFill style={{ background: brisk.ink, color: brisk.paper, overflow: "hidden" }}>
      <Glow x={gx} y={gy} size={1100} opacity={0.42} />
      <Glow x={W * 0.12} y={H * 0.95} size={700} color={brisk.teal} opacity={0.14} />
      <Grain opacity={0.05} />

      {/* Eyebrow, persistent */}
      <div
        style={{
          position: "absolute",
          left: PAD,
          top: PAD,
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: brisk.paper,
          ...monoLabel(18),
          opacity: eyebrowIn,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: brisk.brand, display: "block" }} />
        {eyebrow}
      </div>

      {/* Step dots, top-right */}
      <div style={{ position: "absolute", right: PAD, top: PAD - 2, display: "flex", gap: 10, alignItems: "center" }}>
        {list.map((s, i) => (
          <span
            key={s.index + i}
            style={{
              display: "block",
              height: 3,
              width: i === current ? 40 : 14,
              borderRadius: 999,
              background: i <= current ? brisk.brand : brisk.line2,
              opacity: eyebrowIn,
            }}
          />
        ))}
      </div>

      <Hairline style={{ left: PAD, right: PAD, top: PAD + 50, height: 1, opacity: eyebrowIn }} />

      {/* Progress track */}
      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: PAD, height: 2, background: brisk.line, overflow: "hidden", opacity: eyebrowIn }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${brisk.brandDeep}, ${brisk.brand} 60%, ${brisk.brand2})`,
            opacity: progressOpacity,
          }}
        />
      </div>

      {list.map((step, i) => {
        // Every step after the first starts EXIT frames early so entrances overlap exits.
        const lead = i === 0 ? 0 : EXIT;
        const from = i * PROCESS_STEP_FRAMES - lead;
        const length = PROCESS_STEP_FRAMES + lead;
        return (
          <Sequence key={step.index + i} from={from} durationInFrames={length} layout="none">
            <Step step={step} position={i} total={total} length={length} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
