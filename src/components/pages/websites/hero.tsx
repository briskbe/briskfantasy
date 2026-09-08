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
import { WordsStagger } from "@/components/spell/words-stagger";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { Reference } from "@/data/references";

const EASE = [0.16, 1, 0.3, 1] as const;

type Shot = Pick<Reference, "slug" | "url" | "name">;

/**
 * Split hero: editorial copy on the left, a floating stack of three
 * browser-framed live screenshots on the right. Each shot has its own
 * parallax speed so the stack breathes as you scroll.
 */
export function WebsitesHero({ shots, siteCount }: { shots: Shot[]; siteCount: number }) {
  const t = useTranslations("Websites");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Three parallax speeds: the back shot drifts the least, the front one the most.
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -150]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);

  const [back, mid, front] = shots;

  const layers = [
    { shot: back, y: yBack, className: "left-0 top-[4%] w-[66%]", rotate: -5, delay: 0.55, z: "z-10" },
    { shot: mid, y: yMid, className: "right-[-2%] top-[24%] w-[64%]", rotate: 4, delay: 0.7, z: "z-20" },
    { shot: front, y: yFront, className: "left-[8%] top-[48%] w-[70%]", rotate: -2, delay: 0.85, z: "z-30" },
  ];

  return (
    <section
      ref={ref}
      className="theme-dark relative overflow-hidden bg-ink text-paper grain"
      aria-labelledby="websites-hero-title"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-amber absolute -right-[10%] top-[-20%] h-[70vh] w-[70vw] opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pt-36 pb-10 sm:pt-40 lg:pb-12">
        <div className="grid flex-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <motion.div style={{ opacity: fade, y: rise }} className="lg:col-span-6 lg:pr-10 xl:col-span-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
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

            <WordsStagger
              className="text-lead mt-7 max-w-xl text-muted text-pretty"
              delay={0.75}
              stagger={0.025}
              speed={0.6}
            >
              {t("hero.lead")}
            </WordsStagger>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
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

          {/* floating stack (desktop) */}
          <div className="relative hidden min-h-[36rem] lg:col-span-6 lg:block" aria-hidden>
            {layers.map((l) => (
              <motion.div key={l.shot.slug} style={{ y: l.y }} className={`absolute ${l.className} ${l.z}`}>
                <motion.div
                  initial={{ opacity: 0, y: 70, rotate: l.rotate + 4, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotate: l.rotate, filter: "blur(0px)" }}
                  transition={{ duration: 1.3, ease: EASE, delay: l.delay }}
                  className="will-change-transform"
                >
                  <MicrolinkShot
                    url={l.shot.url}
                    slug={l.shot.slug}
                    alt=""
                    priority
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    className="shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* single shot (mobile) */}
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          >
            <MicrolinkShot
              url={front.url}
              slug={front.slug}
              alt={t("hero.shotAlt", { name: front.name })}
              priority
              sizes="100vw"
            />
          </motion.div>
        </div>

        {/* facts row */}
        <motion.ul
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {(["sites", "reply", "intro"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
              {t(`hero.facts.${k}`, { count: siteCount })}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
