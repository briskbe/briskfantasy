"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { richTags } from "@/components/ui/rich";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { Reference } from "@/data/references";
import { ProductCard } from "./product-card";

const EASE = [0.16, 1, 0.3, 1] as const;

type Shot = Pick<Reference, "slug" | "url" | "name">;

/**
 * Dark split hero. Left: editorial copy. Right: a large browser-framed live
 * screenshot of a webshop we built, dimmed into the ink at its bottom edge, with
 * an interactive product card overlapping its bottom-left corner. The two layers
 * parallax at different speeds — on desktop only, where they actually overlap.
 */
export function WebshopsHero({ shot, siteCount }: { shot: Shot; siteCount: number }) {
  const t = useTranslations("Webshops");
  const reduced = usePrefersReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const move = !reduced && isLg;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yShot = useTransform(scrollYProgress, [0, 1], [0, move ? -60 : 0]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, move ? -140 : 0]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, move ? 60 : 0]);

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="webshops-hero-title">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-amber absolute -right-[12%] top-[-25%] h-[75vh] w-[70vw] opacity-40" />
        <div className="glow-sky absolute -left-[20%] bottom-[-30%] h-[60vh] w-[50vw] opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pt-36 pb-10 sm:pt-40 lg:pb-12">
        <div className="grid flex-1 items-end gap-14 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <motion.div style={{ opacity: fade, y: rise }} className="lg:col-span-6 lg:pr-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <h1 id="webshops-hero-title" className="text-h1 mt-6 max-w-[14ch] text-balance">
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                >
                  {t.rich("hero.title", richTags)}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="text-lead mt-7 max-w-xl text-muted text-pretty"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            >
              <Button href="/gesprek-inplannen" size="lg">
                {t("hero.primary")}
              </Button>
              <Magnetic strength={0.35}>
                <a
                  href="#referenties"
                  data-cursor="link"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-line-2 px-7 text-base font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
                >
                  {t("hero.secondary")}
                  <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-1" />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* visual */}
          <div className="relative lg:col-span-6">
            <div className="relative lg:pl-[16%] lg:pb-16">
              <motion.div
                style={{ y: yShot }}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
                className="relative lg:w-[111%] lg:will-change-transform"
              >
                <MicrolinkShot
                  url={shot.url}
                  slug={shot.slug}
                  alt={t("hero.shotAlt", { name: shot.name })}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]"
                />
                {/* the shop is the backdrop, not the subject: dim the top chrome and
                    dissolve the bottom edge into the ink instead of cutting it off */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[0.9rem] bg-gradient-to-b from-ink/35 via-ink/0 to-ink"
                  aria-hidden
                />
              </motion.div>

              {/* product card: overlaps the bottom-left corner on desktop, sits below on mobile */}
              <motion.div
                style={{ y: yCard }}
                initial={{ opacity: 0, y: 40, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.8 }}
                className="relative z-10 -mt-16 ml-auto w-[min(20rem,88%)] sm:-mt-20 lg:absolute lg:bottom-0 lg:left-0 lg:ml-0 lg:mt-0 lg:will-change-transform"
              >
                <ProductCard />
              </motion.div>
            </div>
          </div>
        </div>

        {/* facts row */}
        <motion.ul
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {(["sites", "reply", "intro"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-fg/25" aria-hidden />
              {t(`hero.facts.${k}`, { count: siteCount })}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
