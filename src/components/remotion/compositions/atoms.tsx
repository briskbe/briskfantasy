import type { CSSProperties } from "react";
import { brisk, rgba } from "./shared";

/**
 * Soft radial glow. Position with `x`/`y` (px, centre) and `size` (diameter).
 * One lime glow per screen; teal only as a sparse secondary.
 */
export function Glow({
  x,
  y,
  size,
  color = brisk.brand,
  opacity = 0.35,
  style,
}: {
  x: number;
  y: number;
  size: number;
  color?: string;
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${rgba(color, 0.55)} 0%, ${rgba(color, 0.18)} 35%, ${rgba(color, 0)} 70%)`,
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/** Subtle noise texture; keeps flat dark areas from banding. Static so it costs nothing per frame. */
export function Grain({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: 160,
      }}
    />
  );
}

/** Hairline rule */
export function Hairline({ style, light = false }: { style?: CSSProperties; light?: boolean }) {
  return <div style={{ position: "absolute", background: light ? brisk.lineLight : brisk.line, ...style }} />;
}
