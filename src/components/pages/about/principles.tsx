"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { portfolio, type PortfolioItem } from "@/data/portfolio";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

const KEYS = ["one", "two", "three", "four", "five"] as const;
type Key = (typeof KEYS)[number];

/**
 * Six screens we actually shipped — dark and light alternating, so the strip
 * reads as a curated roll of work rather than one product's screenshots.
 */
const REEL: PortfolioItem[] = ["023-w017", "051-w045", "043-w037", "014-w008", "047-w041", "055-w049"].map(
  (id) => portfolio.find((p) => p.id === id)!,
);

function Principle({
  k,
  index,
  active,
  onActive,
}: {
  k: Key;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const t = useTranslations("About.principles.items");
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Report the principle closest to the viewport centre as the active one.
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-b border-line py-10 lg:py-14">
      <Reveal amount={0.4}>
        <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
          <span
            className={`font-mono text-[0.8rem] tracking-[0.18em] transition-colors duration-500 sm:pt-2 ${active ? "text-amber" : "text-muted"}`}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={`text-h3 text-balance transition-colors duration-500 ${active ? "text-fg" : "text-fg/70"}`}>
              {t(`${k}.title`)}
            </h3>
            <p className="text-body mt-4 max-w-lg text-muted text-pretty">{t(`${k}.body`)}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * Numbered principles on the left; on the right a tall sticky window onto our
 * own work that scrolls a roll of shipped screens past as you read. The
 * active number lights up and drives the progress ticks under the window.
 */
export function Principles() {
  const t = useTranslations("About.principles");
  const locale = useLocale() === "en" ? "en" : "nl";
  const reduced = usePrefersReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Percentages of the roll's own height, capped so the strip never exposes
  // empty frame at either edge while the figure is pinned.
  const reelY = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{t.rich("title", richTags)}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-8">
          <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
        </Reveal>
      </div>

      <div ref={ref} className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
        <ol className="order-2 border-t border-line lg:order-1 lg:col-span-6">
          {KEYS.map((k, i) => (
            <Principle key={k} k={k} index={i} active={active === i} onActive={setActive} />
          ))}
        </ol>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <figure className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
              <div className="h-[15rem] sm:h-[20rem] lg:h-[min(64vh,34rem)]">
                <motion.div
                  className="flex flex-col gap-3 p-3"
                  style={reduced || !isLg ? undefined : { y: reelY }}
                >
                  {REEL.map((item) => (
                    <Image
                      key={item.id}
                      src={item.src}
                      alt={item.title[locale]}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 1024px) 34vw, 92vw"
                      className="h-auto w-full rounded-lg border border-line"
                      loading="lazy"
                    />
                  ))}
                </motion.div>
              </div>
              {/* Soft top/bottom edges so the roll runs off the frame */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-2 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-2 to-transparent"
                aria-hidden
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {t("reelCaption")}
              </span>
              {/* Progress ticks: one per principle. Desktop only — below lg the
                  figure is not sticky, so the ticks would scroll away long
                  before the list they describe. */}
              <span className="hidden items-center gap-1.5 lg:flex" aria-hidden>
                {KEYS.map((k, i) => (
                  <motion.span
                    key={k}
                    className={`h-px rounded-full transition-colors duration-500 ${i <= active ? "bg-fg/70" : "bg-fg/20"}`}
                    animate={{ width: active === i ? 28 : 10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
