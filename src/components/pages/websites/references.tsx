import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { references, referencesByType } from "@/data/references";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { ReferenceCard, type CardSize } from "./reference-card";
import { WebsitesShowreel } from "./showreel";

/**
 * Curated selection, not a directory. Captures that read as broken out of
 * context (a page that is still blank above the fold, a chat widget covering
 * the hero) are left to the Referenties page; the seven here are the ones that
 * survive being blown up to half a screen.
 *
 * The two "feature" slots are the largest cards on the page and the only ones
 * that open and close the grid, so they carry the work we most want seen:
 * City Housing and Mirkoz Vending. Sizes are load-bearing — each row has to
 * add up to the 12-column grid (7+5, 4+4+4, 5+7), so a size change here means
 * re-checking the whole sequence, not just one entry.
 */
const CURATED: { slug: string; size: CardSize }[] = [
  { slug: "city-housing-be", size: "feature" },
  { slug: "landelijkglas-be", size: "wide" },
  { slug: "priveglas-be", size: "compact" },
  { slug: "vestra-armor-com", size: "compact" },
  { slug: "comfortsolutions-be", size: "compact" },
  { slug: "sanae-align-com", size: "wide" },
  { slug: "mirkozvending-com", size: "feature" },
];

/** Shots for the reel, deliberately not the two cards that open the grid. */
const REEL = ["mirkozvending-com", "priveglas-be", "sanae-align-com", "roetfilterservice-be"];

const FALLBACK_SIZES: CardSize[] = ["feature", "wide", "compact", "compact", "compact", "wide", "feature"];

/** Dark section: the showreel plus an editorial grid of live client sites. */
export async function WebsiteReferences() {
  const t = await getTranslations("Websites");
  const locale = (await getLocale()) as "nl" | "en";
  const bySlug = new Map(references.map((r) => [r.slug, r]));

  // Curated first; if a slug ever disappears from the data, fall back to the
  // websites in data order so the section degrades instead of crashing.
  const picked = CURATED.map((c) => ({ ref: bySlug.get(c.slug), size: c.size })).filter(
    (c): c is { ref: NonNullable<ReturnType<typeof bySlug.get>>; size: CardSize } => Boolean(c.ref),
  );
  const cards =
    picked.length >= 5
      ? picked
      : referencesByType("website")
          .slice(0, 7)
          .map((ref, i) => ({ ref, size: FALLBACK_SIZES[i] ?? "compact" }));

  const reelShots = REEL.map((slug) => bySlug.get(slug))
    .filter((r) => r !== undefined)
    .map((r) => ({ src: `/references/${r.slug}.webp`, domain: r.domain, name: r.name }));

  return (
    <section
      id="referenties"
      className="theme-dark relative border-t border-line bg-ink-2 text-paper scroll-mt-24 pt-[clamp(3.5rem,7vw,7rem)] pb-[clamp(5rem,10vw,11rem)]"
      aria-labelledby="websites-refs-title"
    >
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index={3} className="text-xs">
                {t("references.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="websites-refs-title" className="text-h2 mt-5 max-w-[13ch] text-balance">
                {t.rich("references.title", richTags)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("references.intro")}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                href="/referenties"
                data-cursor="link"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 text-fg"
              >
                <span className="relative">
                  {t("references.all", { count: references.length })}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </span>
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <WebsitesShowreel
              shots={reelShots}
              label={t("references.reelLabel")}
              caption={t("references.reelCaption")}
            />
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-x-8 gap-y-16 lg:mt-28 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-24">
          {cards.map(({ ref: r, size }, i) => (
            <ReferenceCard
              key={r.slug}
              index={i}
              size={size}
              slug={r.slug}
              url={r.url}
              domain={r.domain}
              name={r.name}
              industry={r.industry[locale]}
              blurb={r.blurb[locale]}
              alt={t("references.shotAlt", { name: r.name })}
              visitLabel={t("references.visit")}
              newTabLabel={t("references.newTab")}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
