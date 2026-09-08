"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { WordsStagger } from "@/components/spell/words-stagger";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

export type HeroTile = { id: string; src: string; width: number; height: number };

/**
 * Full-bleed dark hero. Behind the copy: three columns of dashboard/SaaS
 * screens tilted back in 3D, each column drifting at its own speed on scroll,
 * masked to ink at the edges and dimmed so the headline stays readable.
 */
export function SoftwareHero({ columns }: { columns: HeroTile[][] }) {
  const t = useTranslations("Software");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y0 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -200]);
  const ys = [y0, y1, y2];
  const offsets = ["-6%", "-22%", "-12%"];
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="software-hero-title">
      {/* 3D screen wall */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
        style={{ maskImage: "radial-gradient(120% 90% at 50% 40%, #000 35%, transparent 100%)", WebkitMaskImage: "radial-gradient(120% 90% at 50% 40%, #000 35%, transparent 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.42] [perspective:1400px]">
          <div className="absolute inset-x-[-6%] top-[-8%] h-[150%] origin-top [transform:rotateX(12deg)_scale(1.06)] [transform-style:preserve-3d]">
            <div className="grid h-full grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {columns.map((col, ci) => (
                <motion.div key={ci} style={{ y: ys[ci], marginTop: offsets[ci] }} className="flex flex-col gap-4 sm:gap-6 lg:gap-8 will-change-transform">
                  <motion.div
                    className="flex flex-col gap-4 sm:gap-6 lg:gap-8"
                    animate={reduced ? undefined : { y: [0, ci === 1 ? 26 : -26, 0] }}
                    transition={{ duration: 16 + ci * 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {col.map((tile, i) => (
                      <motion.div
                        key={tile.id}
                        className="overflow-hidden rounded-xl border border-paper/10 bg-ink-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: EASE, delay: 0.15 + ci * 0.12 + i * 0.08 }}
                      >
                        <Image
                          src={tile.src}
                          alt=""
                          width={tile.width}
                          height={tile.height}
                          sizes="36vw"
                          priority={i < 2}
                          className="block h-auto w-full"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* readability + atmosphere */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,0.55)_0%,rgba(7,8,12,0.15)_35%,rgba(7,8,12,0.75)_70%,#07080c_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[70%] bg-[linear-gradient(90deg,rgba(7,8,12,0.85)_0%,rgba(7,8,12,0.4)_50%,transparent_100%)]" />
        <div className="glow-amber absolute -left-[10%] bottom-[-30%] h-[70vh] w-[70vw] opacity-30" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pt-40 pb-10 sm:pt-44 lg:pb-12">
        <motion.div style={{ opacity: fade, y: rise }} className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
          </motion.div>

          <h1 id="software-hero-title" className="text-display mt-6 max-w-[11ch] text-balance">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
                {t.rich("hero.title", richTags)}
              </motion.span>
            </span>
          </h1>

          <WordsStagger className="text-lead mt-7 max-w-xl text-fg-2 text-pretty" delay={0.75} stagger={0.025} speed={0.6}>
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
                href="#interfaces"
                data-cursor="link"
                className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-line-2 px-7 text-base font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
              >
                {t("hero.secondary")}
                <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-1" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          aria-label={t("hero.gridLabel")}
        >
          {(["screens", "reply", "ownership"] as const).map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
              {t(`hero.facts.${k}`)}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
