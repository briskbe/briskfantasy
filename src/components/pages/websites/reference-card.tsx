import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { SiteShot } from "./site-shot";

export type CardSize = "feature" | "wide" | "compact";

const SPAN: Record<CardSize, string> = {
  feature: "lg:col-span-7",
  wide: "lg:col-span-5",
  compact: "lg:col-span-4",
};

const SIZES: Record<CardSize, string> = {
  feature: "(min-width: 1024px) 56vw, 92vw",
  wide: "(min-width: 1024px) 40vw, 92vw",
  compact: "(min-width: 1024px) 30vw, 92vw",
};

/**
 * One live-site card. The whole card is the link: one focus stop, one tap
 * target, one affordance — the arrow after the name nudges on hover instead of
 * a separate circle button plus a "view live" line.
 */
export function ReferenceCard({
  slug,
  url,
  domain,
  name,
  industry,
  blurb,
  alt,
  visitLabel,
  newTabLabel,
  index,
  size,
}: {
  slug: string;
  url: string;
  domain: string;
  name: string;
  industry: string;
  blurb: string;
  alt: string;
  visitLabel: string;
  newTabLabel: string;
  index: number;
  size: CardSize;
}) {
  const showBlurb = size !== "compact";
  return (
    <Reveal as="li" delay={(index % 3) * 0.08} amount={0.2} className={cn("h-full", SPAN[size])}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={visitLabel}
        aria-label={`${name} — ${visitLabel}, ${newTabLabel}`}
        className="group flex h-full flex-col rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1"
      >
        <SiteShot slug={slug} domain={domain} alt={alt} sizes={SIZES[size]} hoverZoom />
        <div className="flex flex-1 flex-col px-1 pt-5">
          <h3 className={cn("flex items-start gap-2", size === "feature" ? "text-h3" : "text-h4")}>
            <span>{name}</span>
            <ArrowUpRight
              className="mt-[0.35em] size-[0.7em] shrink-0 text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
              aria-hidden
            />
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{industry}</p>
          {showBlurb && <p className="text-body mt-4 max-w-md text-muted text-pretty">{blurb}</p>}
        </div>
      </a>
    </Reveal>
  );
}
