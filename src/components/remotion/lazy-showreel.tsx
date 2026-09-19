"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { ShowreelShot } from "./compositions/showreel-browser";

export type { ShowreelShot } from "./compositions/showreel-browser";

// Import the composition and the player together, only when this component is
// near the viewport. A static composition import would eagerly include Remotion.
const ShowreelRuntime = dynamic(() => import("./showreel-runtime"), { ssr: false });

export function LazyShowreel({ shots, className }: { shots: ShowreelShot[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const first = shots[0];

  return (
    // Match the composition's1600×1000 canvas before any JS or image arrives.
    <div ref={ref} className={cn("relative w-full overflow-hidden bg-ink-2", className)} style={{ aspectRatio: "8 / 5" }}>
      {first && (
        <div className="absolute inset-[6%] overflow-hidden rounded-lg border border-line bg-ink">
          <div className="flex h-8 items-center gap-1.5 border-b border-line bg-ink-3 px-3 sm:h-10" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-paper/30" />
            <span className="size-1.5 rounded-full bg-paper/30" />
            <span className="size-1.5 rounded-full bg-paper/30" />
            <span className="ml-3 truncate font-mono text-[0.6rem] text-paper/65 sm:text-xs">{first.domain}</span>
          </div>
          <div className="absolute inset-x-0 top-8 bottom-0 sm:top-10">
            <Image src={first.src} alt={first.name} fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover object-top" loading="lazy" />
          </div>
        </div>
      )}
      {nearViewport && !reducedMotion && shots.length > 0 && (
        <div className="absolute inset-0" aria-hidden="true">
          <ShowreelRuntime shots={shots} />
        </div>
      )}
    </div>
  );
}
