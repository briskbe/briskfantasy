import { Easing } from "remotion";

/**
 * Brisk tokens for Remotion compositions. Compositions are pure React and
 * cannot use Tailwind classes, so the palette lives here as plain strings
 * (mirrors `src/app/globals.css`).
 */
export const brisk = {
  ink: "#0C1619",
  ink2: "#142328",
  ink3: "#1B2F36",
  ink4: "#26424B",
  paper: "#F2F4EE",
  paper2: "#E6EBE0",
  paper3: "#D5DCCD",
  muted: "#8B9A97",
  mutedLight: "#63736F",
  /** The logo lime. Reels render on ink, so this is safe as text there. */
  brand: "#D3F882",
  brand2: "#E6FCB8",
  brandDeep: "#A9D84F",
  teal: "#5FB3A1",
  line: "rgba(242, 244, 238, 0.11)",
  line2: "rgba(242, 244, 238, 0.2)",
  lineLight: "rgba(12, 22, 25, 0.12)",
  lineLight2: "rgba(12, 22, 25, 0.22)",
} as const;

/** Font stacks. The CSS variables resolve inside the Next.js page DOM. */
export const fonts = {
  sans: "var(--font-geist), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
  serif: "var(--font-instrument-serif), 'Iowan Old Style', 'Times New Roman', Georgia, serif",
} as const;

/** Easing curves from DESIGN.md §4 */
export const ease = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outQuint: Easing.bezier(0.22, 1, 0.36, 1),
  inOutQuart: Easing.bezier(0.76, 0, 0.24, 1),
  brisk: Easing.bezier(0.65, 0, 0.35, 1),
} as const;

/** Smooth, non-bouncy spring for entrances (DESIGN.md: springs, no overshoot). */
export const smooth = { damping: 200 } as const;

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Eyebrow-style mono label */
export const monoLabel = (size = 18) =>
  ({
    fontFamily: fonts.mono,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 500,
  }) as const;

/** Hex -> rgba helper for glows */
export function rgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
