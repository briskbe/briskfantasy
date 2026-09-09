import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glow, Grain } from "./atoms";
import { brisk, clamp, ease, fonts, monoLabel, smooth } from "./shared";

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

export type MetricsReelProps = {
  metrics: Metric[];
  theme?: "dark" | "light";
  /** Intl locale used for thousands separators (default "nl-BE") */
  locale?: string;
};

const FPS = 30;
const W = 1600;
const H = 600;
const PAD = 96;
const DURATION = 180; // 6s: count 0–70, hold, exit in the last 20
const EXIT_START = DURATION - 22;

export const METRICS_REEL_META = {
  fps: FPS,
  width: W,
  height: H,
  durationInFrames: DURATION,
} as const;

function MetricCell({
  metric,
  i,
  count,
  dark,
  locale,
}: {
  metric: Metric;
  i: number;
  count: number;
  dark: boolean;
  locale: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 6 + i * 7;
  const s = spring({ frame, fps, config: smooth, delay, durationInFrames: 70 });
  const counted = Math.round(metric.value * s);
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(counted);
  const rise = interpolate(s, [0, 1], [46, 0]);
  const blur = interpolate(s, [0, 1], [10, 0]);
  const labelIn = spring({ frame, fps, config: smooth, delay: delay + 10, durationInFrames: 40 });

  const fg = dark ? brisk.paper : brisk.ink;
  const mutedC = dark ? brisk.muted : brisk.mutedLight;
  // Scale the numeral down for wide values so 4 columns never clip.
  const chars = number.length + (metric.suffix?.length ?? 0) + (metric.prefix?.length ?? 0);
  const size = count >= 4 ? (chars > 6 ? 112 : 140) : chars > 7 ? 130 : 172;

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingLeft: i === 0 ? 0 : 44,
        paddingRight: i === count - 1 ? 0 : 44,
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: size,
          lineHeight: 0.95,
          letterSpacing: "-0.045em",
          fontWeight: 500,
          color: fg,
          fontVariantNumeric: "tabular-nums",
          opacity: s,
          transform: `translateY(${rise}px)`,
          filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
          whiteSpace: "nowrap",
          willChange: "transform, filter",
        }}
      >
        {metric.prefix ? <span style={{ color: brisk.brand, fontSize: "0.6em", verticalAlign: "0.35em", marginRight: "0.05em" }}>{metric.prefix}</span> : null}
        {number}
        {metric.suffix ? <span style={{ color: brisk.brand, fontSize: "0.62em", marginLeft: "0.04em" }}>{metric.suffix}</span> : null}
      </div>
      <div
        style={{
          marginTop: 30,
          color: mutedC,
          ...monoLabel(17),
          lineHeight: 1.4,
          opacity: labelIn,
          transform: `translateY(${(1 - labelIn) * 14}px)`,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          textWrap: "balance",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: 999, background: brisk.brand, display: "block", flex: "none", marginTop: 8 }} />
        <span>{metric.label}</span>
      </div>
    </div>
  );
}

/**
 * MetricsReel: 3–4 headline numbers counting up with staggered springs.
 * Ends with a soft exit so it loops cleanly.
 */
export function MetricsReel({ metrics, theme = "dark", locale = "nl-BE" }: MetricsReelProps) {
  const frame = useCurrentFrame();
  const dark = theme === "dark";
  const list = metrics.slice(0, 4);
  const exit = interpolate(frame, [EXIT_START, DURATION], [0, 1], { ...clamp, easing: ease.inOutQuart });
  const lineIn = interpolate(frame, [0, 40], [0, 1], { ...clamp, easing: ease.outExpo });

  const bg = dark ? brisk.ink : brisk.paper;
  const line = dark ? brisk.line2 : brisk.lineLight2;

  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {dark ? <Glow x={W * 0.85} y={H * 0.15} size={900} opacity={0.32} /> : <Glow x={W * 0.9} y={H * 0.1} size={900} opacity={0.22} />}
      {dark ? <Grain opacity={0.05} /> : null}

      {/* Top hairline draws in from the left */}
      <div style={{ position: "absolute", left: PAD, top: PAD, height: 1, width: (W - PAD * 2) * lineIn, background: line, opacity: 1 - exit }} />

      <div
        style={{
          position: "absolute",
          left: PAD,
          right: PAD,
          top: PAD + 1,
          bottom: PAD,
          display: "flex",
          alignItems: "stretch",
          opacity: 1 - exit,
          transform: `translateY(${-24 * exit}px)`,
          filter: exit > 0.02 ? `blur(${exit * 8}px)` : undefined,
        }}
      >
        {list.map((m, i) => (
          <div key={`${m.label}-${i}`} style={{ flex: 1, minWidth: 0, display: "flex", paddingBottom: 6 }}>
            {i > 0 ? (
              <div
                style={{
                  width: 1,
                  alignSelf: "stretch",
                  background: line,
                  transform: `scaleY(${lineIn})`,
                  transformOrigin: "top",
                }}
              />
            ) : null}
            <MetricCell metric={m} i={i} count={list.length} dark={dark} locale={locale} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
