"use client";

import { ArrowUpRight } from "lucide-react";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal } from "@/components/ui/reveal";

/**
 * Large 2-column reference card: a browser-framed screenshot cropped to the
 * site's hero band, then name, type, industry, blurb and one outbound action.
 * The whole card is a single link (one focus stop, one tap target).
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
  newTabLabel,
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
  newTabLabel: string;
  index: number;
}) {
  return (
    <Reveal as="li" delay={(index % 2) * 0.1} amount={0.2} className="h-full">
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={visitLabel}
        className="group flex h-full flex-col rounded-3xl"
      >
        <MicrolinkShot
          url={url}
          slug={slug}
          alt={alt}
          live={false}
          sizes="(min-width: 1024px) 46vw, 92vw"
          className="transition-shadow duration-700 ease-[var(--ease-out-expo)] group-hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.35)]"
          imgClassName="aspect-[16/9] transition-transform duration-[1000ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />

        <div className="flex flex-1 flex-col px-1 pt-6">
          <h3 className="text-h3">{name}</h3>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
            <span className="rounded-full border border-line-2 px-2.5 py-1 text-[0.6rem] text-fg-2">{type}</span>
            <span>{industry}</span>
          </p>
          <p className="text-body mt-4 max-w-xl text-muted text-pretty">{blurb}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] text-fg">
            <span className="relative">
              {visitLabel}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">{newTabLabel}</span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}
