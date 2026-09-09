import { AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Glow, Grain } from "./atoms";
import { brisk, clamp, ease, fonts, rgba, smooth } from "./shared";

export type ShowreelShot = { src: string; domain: string; name: string };

export type ShowreelBrowserProps = {
  shots: ShowreelShot[];
};

const FPS = 30;
const W = 1600;
const H = 1000;
const PAD = 96;
/** Frames per shot (~3.2s) */
export const SHOWREEL_SHOT_FRAMES = 96;
/** Frames the incoming shot overlaps the outgoing one */
const OVERLAP = 18;

/** Total duration for `n` shots */
export function showreelDuration(n: number) {
  return Math.max(1, n) * SHOWREEL_SHOT_FRAMES;
}

export const SHOWREEL_BROWSER_META = {
  fps: FPS,
  width: W,
  height: H,
  durationInFrames: showreelDuration(4),
} as const;

// Browser window geometry
const WIN_X = PAD;
const WIN_Y = PAD + 24;
const WIN_W = W - PAD * 2; // 1408
const WIN_H = H - WIN_Y - PAD + 12; // bottom edge sits just above the margin
const CHROME_H = 60;
const CONTENT_H = WIN_H - CHROME_H;
// Screenshots are 16:10 -> at WIN_W wide they are taller than the viewport, which gives us scroll range.
const IMG_H = WIN_W * (1000 / 1600);
const SCROLL_RANGE = IMG_H * 1.04 - CONTENT_H;

function Shot({ shot, isLast }: { shot: ShowreelShot; isLast: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: smooth, durationInFrames: 34 });
  const scale = interpolate(enter, [0, 1], [1.06, 1.0]);
  const enterY = interpolate(enter, [0, 1], [70, 0]);

  const local = frame;
  const exitStart = SHOWREEL_SHOT_FRAMES - (isLast ? 14 : 0);
  const exit = isLast ? interpolate(local, [exitStart, SHOWREEL_SHOT_FRAMES], [0, 1], { ...clamp, easing: ease.inOutQuart }) : 0;

  // Slow "scroll" through the page while it holds
  const scroll = interpolate(local, [18, SHOWREEL_SHOT_FRAMES + OVERLAP], [0, -SCROLL_RANGE], {
    ...clamp,
    easing: ease.brisk,
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: enter * (1 - exit),
        transform: `translateY(${enterY}px) scale(${scale})`,
        transformOrigin: "50% 30%",
        willChange: "transform, opacity",
      }}
    >
      <Img
        src={shot.src}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: WIN_W,
          height: IMG_H * 1.04,
          objectFit: "cover",
          objectPosition: "top",
          transform: `translateY(${scroll}px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}

function UrlBar({ shots }: { shots: ShowreelShot[] }) {
  const frame = useCurrentFrame();
  const idx = Math.min(shots.length - 1, Math.floor(frame / SHOWREEL_SHOT_FRAMES));
  const local = frame - idx * SHOWREEL_SHOT_FRAMES;
  const shot = shots[idx];
  const domain = shot.domain;
  // Type out the domain over ~24 frames, easing so it speeds up like real typing.
  const typed = Math.round(interpolate(local, [4, 30], [0, domain.length], { ...clamp, easing: ease.outQuint }));
  const text = domain.slice(0, typed);
  const caretOn = local < 40 ? Math.floor(local / 8) % 2 === 0 : false;
  const tabIn = spring({ frame: local, fps: FPS, config: smooth, durationInFrames: 24 });
  // After the first shot the tab only dips instead of vanishing, so the chrome never looks empty.
  const tabOpacity = idx === 0 ? tabIn : interpolate(tabIn, [0, 1], [0.35, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: WIN_W,
        height: CHROME_H,
        background: brisk.ink2,
        borderBottom: `1px solid ${brisk.line}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 20,
        fontFamily: fonts.mono,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        {[brisk.brandDeep, brisk.brand, brisk.brand2].map((c, i) => (
          <span key={i} style={{ width: 12, height: 12, borderRadius: 999, background: c, opacity: 0.85, display: "block" }} />
        ))}
      </div>
      {/* Tab with site name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 16px",
          height: 36,
          borderRadius: 10,
          background: brisk.ink3,
          border: `1px solid ${brisk.line}`,
          color: brisk.paper2,
          fontFamily: fonts.sans,
          fontSize: 17,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          opacity: tabOpacity,
          transform: `translateY(${(1 - tabIn) * 6}px)`,
          maxWidth: 300,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: brisk.brand, display: "block", flex: "none" }} />
        {shot.name}
      </div>
      {/* URL bar */}
      <div
        style={{
          flex: 1,
          height: 36,
          borderRadius: 10,
          background: brisk.ink,
          border: `1px solid ${brisk.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontSize: 17,
          letterSpacing: "0.02em",
          color: brisk.paper,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span style={{ color: brisk.muted }}>https://</span>
        <span>{text}</span>
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 18,
            marginLeft: 2,
            background: brisk.brand,
            opacity: caretOn ? 1 : 0,
          }}
        />
      </div>
      <div style={{ width: 60 }} />
    </div>
  );
}

/**
 * ShowreelBrowser: a dark browser window cycling through client sites. The
 * URL types out per shot; each screenshot lands with a smooth spring and
 * scrolls slowly while it holds. Duration: `showreelDuration(shots.length)`.
 */
export function ShowreelBrowser({ shots }: ShowreelBrowserProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const list = shots.length > 0 ? shots : [{ src: "", domain: "brisk.be", name: "Brisk" }];

  const t = (frame / Math.max(1, durationInFrames)) * Math.PI * 2;
  const gx = W * 0.5 + Math.sin(t) * 260;
  const windowIn = spring({ frame, fps: FPS, config: smooth, durationInFrames: 30 });

  return (
    <AbsoluteFill style={{ background: brisk.ink, overflow: "hidden" }}>
      <Glow x={gx} y={H * 0.1} size={1300} opacity={0.32} />
      <Glow x={W * 0.9} y={H * 1.05} size={800} color={brisk.teal} opacity={0.12} />
      <Grain opacity={0.05} />

      <div
        style={{
          position: "absolute",
          left: WIN_X,
          top: WIN_Y,
          width: WIN_W,
          height: WIN_H,
          borderRadius: 22,
          overflow: "hidden",
          background: brisk.ink2,
          border: `1px solid ${brisk.line2}`,
          boxShadow: `0 40px 120px ${rgba(brisk.ink, 0.7)}, 0 0 0 1px ${rgba(brisk.ink, 0.6)}`,
          opacity: windowIn,
          transform: `translateY(${(1 - windowIn) * 40}px)`,
        }}
      >
        {/* Content viewport */}
        <div style={{ position: "absolute", left: 0, top: CHROME_H, width: WIN_W, height: CONTENT_H, overflow: "hidden", background: brisk.ink }}>
          {list.map((shot, i) => {
            const isLast = i === list.length - 1;
            const dur = isLast ? SHOWREEL_SHOT_FRAMES : SHOWREEL_SHOT_FRAMES + OVERLAP;
            return (
              <Sequence key={shot.src + i} from={i * SHOWREEL_SHOT_FRAMES} durationInFrames={dur} layout="none">
                <Shot shot={shot} isLast={isLast} />
              </Sequence>
            );
          })}
          {/* Bottom fade inside the viewport so the scroll never hard-cuts */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 140,
              background: `linear-gradient(180deg, ${rgba(brisk.ink, 0)}, ${rgba(brisk.ink, 0.55)})`,
              pointerEvents: "none",
            }}
          />
        </div>
        <UrlBar shots={list} />
      </div>
    </AbsoluteFill>
  );
}
