"use client";

import { useState } from "react";
// The modular entry consumes the pinned TypeGPU compatibility patch, which
// avoids a duplicate binding in Next's production minifier.
import { Shader, SolidColor, ParticleField, InkFlow, Glitch } from "shaders/react";

/** The user's Pixel Ink composition, loaded only by the decorative background. */
export default function PixelInkRenderer() {
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none"
      style={{ opacity: status === "ready" ? 1 : 0, mixBlendMode: "screen" }}
      data-pixel-ink-renderer={status}
    >
      {status !== "unavailable" && (
        <Shader
          toneMapping="aces"
          disableTelemetry
          onReady={() => setStatus("ready")}
          onUnavailable={() => setStatus("unavailable")}
          style={{ width: "100%", height: "100%" }}
        >
          <SolidColor color="#161617" />
          <ParticleField count={40000} cursorStrength={0} particleSize={0.37} zoom={1.4}>
            <InkFlow radius={0.6} />
          </ParticleField>
          <Glitch colorBarIntensity={0} />
        </Shader>
      )}
    </div>
  );
}
