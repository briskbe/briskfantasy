"use client";

import { useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SiteShot } from "./site-shot";
import type { Reference } from "@/data/references";

const EASE = [0.16, 1, 0.3, 1] as const;

export type HeroShot = Pick<Reference, "slug" | "url" | "name" | "domain">;

/**
 * Split hero: editorial copy on the left, one dominant browser-framed capture
 * with a second frame peeking from behind on the right. Both captures are
 * tinted back so the headline stays the brightest thing on the screen, and the
 * whole stack stays inside the 12-column container.
 */
export function WebsitesHero({ shots, siteCount }: { shots: HeroShot[]; siteCount: number }) {
  const t = useTranslations("Websites");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);

  const [front, back] = shots;

  const jumpToWork = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById("referenties");
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: -96 });
      else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [lenis, reduced],
  );

  return (
    <section
      ref={ref}
      className="theme-dark relative overflow-hidden bg-ink text-paper grain"
      aria-labelledby="websites-hero-title"
    >
      {/* atmosphere: one glow, well inside the frame so no edge can show */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-amber absolute -right-[6%] top-[-18%] h-[70vh] w-[62vw] opacity-40 blur-[60px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pt-36 pb-10 sm:pt-40 lg:pb-12">
        <div className="grid flex-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <motion.div style={{ opacity: fade, y: rise }} className="lg:col-span-6 lg:pr-10">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Eyebrow tone="muted" className="text-xs">
                {t("hero.eyebrow")}
              </Eyebrow>
            </motion.div>

            <h1 id="websites-hero-title" className="text-h1 mt-6 max-w-[12ch] text-balance">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                >
                  {t.rich("hero.title", richTags)}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="text-lead mt-7 max-w-xl text-muted text-pretty"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
            >
              <Button href="/gesprek-inplannen" size="lg">
                {t("hero.primary")}
              </Button>
              <Magnetic strength={0.35}>
                <a
                  href="#referenties"
                  onClick={jumpToWork}
                  data-cursor="link"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-line-2 px-7 text-base font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
                >
                  {t("hero.secondary")}
                  <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-1" aria-hidden />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* one dominant capture, one peeking behind it (desktop) */}
          {front && back && (
            <div className="relative hidden h-[28rem] lg:col-span-6 lg:block xl:h-[32rem]">
              <motion.div
                style={{ y: yBack }}
                className="absolute right-[2%] top-0 z-10 w-[56%]"
                aria-hidden
              >
                <motion.div
                  initial={{ opacity: 0, y: 60, rotate: -1.5, filter: reduced ? "none" : "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotate: -3, filter: reduced ? "none" : "blur(0px)" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
                >
                  <SiteShot
                    slug={back.slug}
                    domain={back.domain}
                    alt=""
                    tint="deep"
                    sizes="(min-width: 1024px) 20vw, 0px"
                    className="shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </motion.div>

              <motion.div style={{ y: yFront }} className="absolute bottom-[4%] left-0 z-20 w-[92%]">
                <motion.div
                  initial={{ opacity: 0, y: 70, filter: reduced ? "none" : "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: reduced ? "none" : "blur(0px)" }}
                  transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
                >
                  <SiteShot
                    slug={front.slug}
                    domain={front.domain}
                    alt={t("hero.shotAlt", { name: front.name })}
                    priority
                    sizes="(min-width: 1024px) 34vw, 0px"
                    className="shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* single capture (mobile) */}
          {front && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            >
              <SiteShot
                slug={front.slug}
                domain={front.domain}
                alt={t("hero.shotAlt", { name: front.name })}
                priority
                sizes="(min-width: 1024px) 0px, 92vw"
              />
            </motion.div>
          )}
        </div>

        {/* facts row */}
        <motion.ul
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {(["sites", "reply", "intro"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-fg/30" aria-hidden />
              {t(`hero.facts.${k}`, { count: siteCount })}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
