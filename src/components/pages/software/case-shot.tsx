"use client";

import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * The case screenshot. Below `lg` the frame is ~350px wide, so the second
 * (1440×900) Microlink capture is pure waste there: the static shot is the
 * only layer that renders. The live refresh is enabled from `lg` up only.
 */
export function CaseShot({ url, slug, alt, sizes, className }: { url: string; slug: string; alt: string; sizes: string; className?: string }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  return (
    <MicrolinkShot
      url={url}
      slug={slug}
      alt={alt}
      live={wide}
      sizes={sizes}
      className={className}
      imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
    />
  );
}
