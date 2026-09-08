"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { TiltCard } from "@/components/spell/tilt-card";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Light section: the hero's screen wall, upright and in daylight. Three
 * columns of uncropped 4:3 product screens; on desktop each column starts at
 * a different height and drifts at its own speed while scrolling. Below `lg`
 * the column wrappers dissolve (`display: contents`) into a 2-col / 1-col grid;
 * the third column is hidden on phones to keep the page short.
 */
export function InterfaceGallery({ items }: { items: PortfolioItem[] }) {
  const t = useTranslations("Software");
  const locale = useLocale() as "nl" | "en";
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y0 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140]);
  const columns = [
    { y: y0, className: "" },
    { y: y1, className: "lg:pt-24" },
    { y: y2, className: "hidden sm:contents lg:flex lg:pt-10" },
  ];
  const cols = items.reduce<PortfolioItem[][]>((acc, p, i) => ((acc[i % 3] ??= []).push(p), acc), []);

  return (
    <section id="interfaces" className="theme-light relative bg-bg text-fg section-y scroll-mt-24" aria-labelledby="software-gallery-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={4}>{t("gallery.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-gallery-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
                {t.rich("gallery.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("gallery.intro")}</p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:flex lg:items-start lg:gap-8">
          {cols.map((col, ci) => (
            <motion.ul
              key={ci}
              style={{ y: columns[ci].y }}
              className={cn("contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-8", columns[ci].className)}
              aria-label={`${t("gallery.eyebrow")} ${ci + 1}/3`}
            >
              {col.map((p, i) => {
                const n = cols.slice(0, ci).reduce((sum, c) => sum + c.length, 0) + i + 1;
                return (
                  <Reveal key={p.id} as="li" delay={ci * 0.07} amount={0.15} className="min-w-0">
                    <TiltCard
                      tiltLimit={reduced ? 0 : 5}
                      scale={reduced ? 1 : 1.015}
                      perspective={1400}
                      effect="gravitate"
                      spotlight={!reduced}
                      className="rounded-2xl"
                    >
                      <figure className="rounded-2xl border border-line bg-bg-2 p-2 transition-shadow duration-700 ease-[var(--ease-out-expo)] hover:shadow-[0_40px_80px_-40px_rgba(7,8,12,0.45)]">
                        <div className="overflow-hidden rounded-xl bg-bg-3">
                          <Image
                            src={p.src}
                            alt={t("gallery.imageAlt", { title: p.title[locale] })}
                            width={p.width}
                            height={p.height}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                            loading="lazy"
                            className="block h-auto w-full"
                          />
                        </div>
                        <figcaption className="flex min-w-0 items-center justify-between gap-4 overflow-hidden px-2 pb-1.5 pt-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                          <span className="truncate">{p.title[locale]}</span>
                          <span className="shrink-0 tabular-nums">{String(n).padStart(2, "0")}</span>
                        </figcaption>
                      </figure>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </motion.ul>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-end lg:mt-16">
          <Button href="/referenties" variant="ghost" icon="up-right" className="min-h-11 text-base">
            {t("gallery.more")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
