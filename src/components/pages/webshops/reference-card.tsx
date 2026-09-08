"use client";

import { ArrowUpRight } from "lucide-react";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/spell/tilt-card";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Large 2-column reference card: browser-framed live screenshot on a subtle
 * Spell tilt, then name, type, industry, blurb and an outbound link. The whole
 * card is one link (one focus stop, one tap target).
 */
export function ShopReferenceCard({
  slug,
  url,
  name,
  type,
  industry,
  blurb,
  alt,
  visitLabel,
  index,
}: {
  slug: string;
  url: string;
  name: string;
  type: string;
  industry: string;
  blurb: string;
  alt: string;
  visitLabel: string;
  index: number;
}) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const tilt = fine && !reduced;

  return (
    <Reveal as="li" delay={(index % 2) * 0.1} amount={0.2} className="h-full">
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={visitLabel}
        className="group flex h-full flex-col rounded-3xl"
      >
        <TiltCard
          tiltLimit={tilt ? 3 : 0}
          scale={tilt ? 1.01 : 1}
          perspective={1600}
          effect="gravitate"
          spotlight={tilt}
          className="rounded-[1.1rem]"
        >
          <MicrolinkShot
            url={url}
            slug={slug}
            alt={alt}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="transition-shadow duration-700 ease-[var(--ease-out-expo)] group-hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)]"
            imgClassName="transition-transform duration-[1000ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </TiltCard>

        <div className="flex flex-1 flex-col px-1 pt-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-h3">{name}</h3>
                <span className="rounded-full border border-line-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-2">
                  {type}
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{industry}</p>
            </div>
            <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <p className="text-body mt-4 max-w-xl text-muted text-pretty">{blurb}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[0.9rem] text-fg">
            <span className="relative">
              {visitLabel}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}
