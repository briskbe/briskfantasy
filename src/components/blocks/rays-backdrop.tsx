"use client";

import dynamic from "next/dynamic";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

const Rays = dynamic(() => import("@/components/spell/light-rays"), { ssr: false });

/**
 * Spell UI "Light Rays" (WebGL) as an absolutely positioned backdrop, tinted
 * to the Brisk amber. Skipped for reduced-motion users and on very small screens.
 */
export function RaysBackdrop({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 640px)");
  const enabled = wide && !reduced;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {enabled && (
        <Rays
          intensity={9}
          rays={28}
          reach={18}
          position={50}
          backgroundColor="transparent"
          raysColor={{ mode: "multi", color1: "#ff9f4d", color2: "#8bb4ff" }}
          animation={{ animate: true, speed: 5 }}
          style={{ position: "absolute", inset: 0, opacity: 0.55 }}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgba(255,159,77,0.18),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
