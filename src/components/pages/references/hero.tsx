"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { WordsStagger } from "@/components/spell/words-stagger";
import {
  ShowreelBrowser,
  SHOWREEL_BROWSER_META,
  showreelDuration,
  type ShowreelShot,
} from "@/components/remotion/compositions";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { siteConfig } from "@/data/site";
import { RemotionPlayer } from "@/components/remotion/remotion-player";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial hero: the display statement carries the fold, a stack of two
 * browser frames sits low-right — the front one a Remotion showreel of four
 * live sites, the back one a static frame that bleeds past the gutter. Facts
 * rail underneath. The two frames drift at different speeds on scroll.
 */
export function ReferencesHero({
  screenCount,
  shots,
}: {
  screenCount: number;
  shots: ShowreelShot[];
}) {
  const t = useTranslations("References");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const reelY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const backY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 42]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const back = shots[1] ?? shots[0];

  return (
    <section
      ref={ref}
      className="theme-dark relative overflow-hidden bg-ink text-paper grain"
      aria-labelledby="references-hero-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* One warm glow, kept high and left of the frame stack: the Remotion
            canvas paints flat ink, so any glow behind it would outline it. */}
        <div className="glow-brand absolute left-[6%] top-[-48%] h-[62vh] w-[58vw] opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[92svh] flex-col pt-32 pb-10 sm:pt-36">
        <div className="grid flex-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            style={{ opacity: fade, y: copyY }}
            className="lg:col-span-7 lg:pb-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <h1
              id="references-hero-title"
              className="text-display mt-7 max-w-[12ch] text-balance"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                >
                  {t.rich("hero.title", { ...richTags, total: siteConfig.projectsDelivered })}
                </motion.span>
              </span>
            </h1>

            <WordsStagger
              className="text-lead mt-8 max-w-lg text-muted text-pretty"
              delay={0.7}
              stagger={0.02}
              speed={0.6}
            >
              {t("hero.lead")}
            </WordsStagger>

            <motion.p
              className="mt-7 inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span
                className="relative flex size-2 items-center justify-center"
                aria-hidden
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-pulse-soft" />
                <span className="size-1.5 rounded-full bg-emerald-400" />
              </span>
              {t("hero.note")}
            </motion.p>
          </motion.div>

          {/* Below lg the reel bleeds to both gutters so the showreel reads as
              a screen, not a thumbnail. */}
          <div className="relative max-lg:-mx-[clamp(1.25rem,4vw,4rem)] lg:col-span-5 lg:col-start-8 lg:pb-2">
            {/* Back frame: a second live site peeking out past the gutter. */}
            <motion.div
              style={{ y: backY }}
              className="pointer-events-none absolute -top-[16%] right-[-16%] hidden w-[64%] rotate-[3deg] opacity-60 lg:block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.75 }}
              aria-hidden
            >
              <div className="browser-frame">
                <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                  <span className="flex gap-1.5">
                    <i className="size-1.5 rounded-full bg-paper/15" />
                    <i className="size-1.5 rounded-full bg-paper/15" />
                    <i className="size-1.5 rounded-full bg-paper/15" />
                  </span>
                  <span className="mx-auto truncate font-mono text-[0.55rem] tracking-wide text-muted">
                    {back.domain}
                  </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={back.src}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-top"
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.div
              style={{ y: reelY }}
              className="relative"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
            >
              <figure className="relative" aria-label={t("hero.reelLabel")}>
                {/* Static first shot behind the player so the frame is never empty before it mounts. */}
                <div
                  className="pointer-events-none absolute inset-x-[6%] top-[12%]"
                  aria-hidden
                >
                  <div className="browser-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shots[0].src}
                      alt=""
                      className="aspect-[16/10] w-full object-cover object-top"
                      decoding="async"
                    />
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
        </div>

        <motion.ul
          className="mt-12 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <li className="flex items-center gap-3">
            <span
              className="size-1.5 shrink-0 rounded-full bg-fg/30"
              aria-hidden
            />
            {t("hero.facts.sites", { total: siteConfig.projectsDelivered })}
          </li>
          <li className="flex items-center gap-3">
            <span
              className="size-1.5 shrink-0 rounded-full bg-fg/30"
              aria-hidden
            />
            {t("hero.facts.screens", { count: screenCount })}
          </li>
          <li className="flex items-center gap-3">
            <span
              className="size-1.5 shrink-0 rounded-full bg-fg/30"
              aria-hidden
            />
            {t("hero.facts.reply")}
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
