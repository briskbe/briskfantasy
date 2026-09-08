"use client";

import { ArrowUpRight } from "lucide-react";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * One live-site card: browser-framed screenshot, name, industry, blurb and an
 * outbound link. The whole card is the link (one focus stop, one tap target).
 */
export function ReferenceCard({
  slug,
  url,
  name,
  industry,
  blurb,
  alt,
  visitLabel,
  index,
  wide = false,
}: {
  slug: string;
  url: string;
  name: string;
  industry: string;
  blurb: string;
  alt: string;
  visitLabel: string;
  index: number;
  /** Full-width closing card (used for an orphan last row on desktop). */
  wide?: boolean;
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 0.08} amount={0.2} className={cn("h-full", wide && "sm:col-span-2 lg:col-span-3")}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={visitLabel}
        className={cn(
          "group flex h-full flex-col rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1",
          wide && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-8",
        )}
      >
        <div className={cn("relative overflow-hidden rounded-[0.95rem]", wide && "lg:col-span-8")}>
          <MicrolinkShot
            url={url}
            slug={slug}
            alt={alt}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="transition-[transform,box-shadow] duration-700 ease-[var(--ease-out-expo)] group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
            imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </div>
        <div className={cn("flex flex-1 flex-col px-1 pt-5", wide && "lg:col-span-4 lg:pb-2 lg:pt-0")}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-h4">{name}</h3>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{industry}</p>
            </div>
            <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <p className="text-body mt-3 text-muted text-pretty">{blurb}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.9rem] text-fg">
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
