"use client";

import { Component, useEffect, useId, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

// Keeping this boundary inside a Client Component is required by Next.js.
// The GPU library never participates in server rendering or the initial bundle.
const PixelInkRenderer = dynamic(() => import("./pixel-ink-renderer"), {
  ssr: false,
  loading: () => null,
});

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Static ink-like particles provide a first-paint and reduced-motion backdrop.
 * The supplied InkFlow is deliberately cursor-driven, so this quiet layer also
 * gives it a setting before the visitor moves their pointer.
 */
function InkBackdrop() {
  const id = useId().replace(/:/g, "");

  return (
    <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMin slice" focusable="false">
      <defs>
        <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#d5e6bd" />
        </pattern>
        <linearGradient id={`${id}-light`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#d3f882" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#d5e6bd" stopOpacity="0.7" />
          <stop offset="1" stopColor="#9aabad" stopOpacity="0.15" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <mask id={`${id}-ribbon`}>
          <path d="M630 -90C1320 45 655 350 1110 470S1620 890 895 1060" fill="none" stroke="white" strokeWidth="170" filter={`url(#${id}-soft)`} />
          <path d="M950 -120C560 135 1440 250 970 570S1230 960 1510 980" fill="none" stroke="white" strokeWidth="50" opacity="0.45" filter={`url(#${id}-soft)`} />
        </mask>
      </defs>
      <path d="M630 -90C1320 45 655 350 1110 470S1620 890 895 1060" fill="none" stroke={`url(#${id}-light)`} strokeWidth="74" opacity="0.24" filter={`url(#${id}-soft)`} />
      <rect width="1440" height="1000" fill={`url(#${id}-dots)`} mask={`url(#${id}-ribbon)`} />
    </svg>
  );
}

export function PixelInkBackground() {
  const reduced = usePrefersReducedMotion();
  const [deferred, setDeferred] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // InkFlow responds to pointer movement. Avoid downloading or compiling a
    // GPU runtime for touch, data-saving or reduced-motion visitors.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduced || !("gpu" in navigator) || !window.matchMedia("(pointer: fine)").matches || connection?.saveData) return;

    let frame = 0;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    const enable = () => {
      if (!cancelled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setDeferred(true);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      window.removeEventListener("pointermove", onPointerMove);
      // Let existing content paint before requesting the optional GPU chunk.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if ("requestIdleCallback" in window) idle = window.requestIdleCallback(enable, { timeout: 1800 });
          else timer = setTimeout(enable, 250);
        });
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
      data-shader-preset="127db0a9-bb24-43ff-8174-11b850c5307e"
    >
      <div className="absolute inset-0 bg-[#161617]" />
      <div className="absolute -right-[10%] -top-[28%] h-[85%] w-[90%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(141,163,111,0.12),transparent_67%)]" />
      <InkBackdrop />
      {deferred && !reduced && (
        <ShaderBoundary>
          <PixelInkRenderer />
        </ShaderBoundary>
      )}
      {/* Keep the strongest particles in the open space around the captures. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,25,0.9)_0%,rgba(12,22,25,0.76)_28%,rgba(12,22,25,0.26)_58%,rgba(12,22,25,0.03)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,22,25,0.22)_0%,transparent_22%,transparent_57%,rgba(12,22,25,0.84)_89%,#0c1619_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_47%,rgba(12,22,25,0.28),transparent_65%)] lg:bg-none" />
    </div>
  );
}
