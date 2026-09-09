import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Column spans, row by row: 7+5 · 4+4+4 · 6+6 · 4+4+4. Deliberate size variation, no masonry. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5 lg:self-end",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

const SIZES = [
  "(min-width: 1024px) 48vw, 78vw",
  "(min-width: 1024px) 33vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
  "(min-width: 1024px) 40vw, 78vw",
  "(min-width: 1024px) 40vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
  "(min-width: 1024px) 26vw, 78vw",
] as const;

/**
 * Dark section: the product screens as an edited wall. Below `lg` the same DOM
 * becomes a horizontal snap scroller so the section stays roughly one viewport
 * on a phone instead of ten stacked cards; from `lg` up it is a 12-column
 * editorial grid, numbered in reading order.
 */
export async function InterfaceGallery({ items }: { items: PortfolioItem[] }) {
  const t = await getTranslations("Software");
  const locale = (await getLocale()) as "nl" | "en";

  return (
    <section id="interfaces" className="theme-dark relative bg-ink text-paper section-y scroll-mt-24" aria-labelledby="software-gallery-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index={4}>{t("gallery.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-gallery-title" className="text-h2 mt-5 max-w-[15ch] text-balance">
                {t.rich("gallery.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("gallery.intro")}</p>
          </Reveal>
        </div>

        <div
          className={cn(
            "no-scrollbar -mx-[clamp(1.25rem,4vw,4rem)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-2",
            "lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14 lg:overflow-visible lg:px-0 lg:pb-0",
          )}
        >
          {items.map((p, i) => (
            <Reveal key={p.id} as="figure" amount={0.15} delay={(i % 3) * 0.06} className={cn("w-[78vw] shrink-0 snap-start lg:w-auto lg:shrink", SPANS[i])}>
              <div className="overflow-hidden rounded-xl border border-line bg-ink-2">
                <Image
                  src={p.src}
                  alt={t("gallery.imageAlt", { title: p.title[locale] })}
                  width={p.width}
                  height={p.height}
                  sizes={SIZES[i]}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 font-mono text-[0.72rem] uppercase leading-[1.35] tracking-[0.12em] text-muted">
                <span className="line-clamp-2">{p.title[locale]}</span>
                <span className="shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-end border-t border-line pt-6 lg:mt-16">
          <Button href="/referenties" variant="ghost" icon="arrow" className="min-h-11 text-base">
            {t("gallery.more")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
