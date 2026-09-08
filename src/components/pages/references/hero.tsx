"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { WordsStagger } from "@/components/spell/words-stagger";
import { ShowreelBrowser, SHOWREEL_BROWSER_META, showreelDuration, type ShowreelShot } from "@/components/remotion/compositions";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { RemotionPlayer } from "@/components/remotion/remotion-player";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Compact editorial hero: copy bottom-left, a Remotion showreel of four live
 * sites on the right that drifts up as you scroll, a facts rail underneath.
 */
export function ReferencesHero({
  siteCount,
  screenCount,
  shots,
}: {
  siteCount: number;
  screenCount: number;
  shots: ShowreelShot[];
}) {
  const t = useTranslations("References");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const reelY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="references-hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-amber absolute -right-[12%] top-[-25%] h-[75vh] w-[70vw] opacity-35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[92svh] flex-col pt-36 pb-8 sm:pt-40 lg:pb-10">
        <div className="grid flex-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div style={{ opacity: fade, y: copyY }} className="lg:col-span-6 lg:pr-8">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <h1 id="references-hero-title" className="text-h1 mt-6 max-w-[11ch] text-balance">
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                >
                  {t.rich("hero.title", { ...richTags, count: siteCount })}
                </motion.span>
              </span>
            </h1>

            <WordsStagger className="text-lead mt-7 max-w-xl text-muted text-pretty" delay={0.7} stagger={0.02} speed={0.6}>
              {t("hero.lead")}
            </WordsStagger>

            <motion.p
              className="mt-8 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span className="relative flex size-2 items-center justify-center" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-pulse-soft" />
                <span className="size-1.5 rounded-full bg-emerald-400" />
              </span>
              {t("hero.note")}
            </motion.p>
          </motion.div>

          <motion.div
            style={{ y: reelY }}
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
          >
            <figure
              className="relative overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]"
              aria-label={t("hero.reelLabel")}
            >
              {/* static first shot behind the player so the frame is never empty before it mounts */}
              <div className="pointer-events-none absolute inset-[6%] top-[7.5%]" aria-hidden>
                <div className="browser-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shots[0].src} alt="" className="aspect-[16/10] w-full object-cover object-top" decoding="async" />
                </div>
              </div>
              <RemotionPlayer
                component={ShowreelBrowser}
                inputProps={{ shots }}
                durationInFrames={showreelDuration(shots.length)}
                fps={SHOWREEL_BROWSER_META.fps}
                width={SHOWREEL_BROWSER_META.width}
                height={SHOWREEL_BROWSER_META.height}
                className="relative"
              />
            </figure>
          </motion.div>
        </div>

        <motion.ul
          className="mt-12 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <li className="flex items-center gap-3">
            <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
            {t("hero.facts.sites", { count: siteCount })}
          </li>
          <li className="flex items-center gap-3">
            <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
            {t("hero.facts.screens", { count: screenCount })}
          </li>
          <li className="flex items-center gap-3">
            <span className="size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
            {t("hero.facts.reply")}
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
