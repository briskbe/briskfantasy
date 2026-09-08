"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { WordsStagger } from "@/components/spell/words-stagger";
import { DeviceReel, DEVICE_REEL_META, deviceReelDuration, type DeviceScreen } from "@/components/remotion/compositions";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { RemotionPlayer } from "@/components/remotion/remotion-player";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Portfolio mockups tagged "mobile", cropped so the phone UI fills the reel's display. */
const REEL_SCREENS: DeviceScreen[] = [
  { src: "/portfolio/012-w006.webp", zoom: 1.12, focus: { x: 0.5, y: 0.55 } },
  { src: "/portfolio/031-w025.webp", zoom: 1.15 },
  { src: "/portfolio/054-w048.webp", zoom: 1.12, focus: { x: 0.5, y: 0.5 } },
  { src: "/portfolio/044-w038.webp", zoom: 1.2, focus: { x: 0.22, y: 0.52 } },
  { src: "/portfolio/026-w020.webp", zoom: 1.25, focus: { x: 0.5, y: 0.5 } },
  { src: "/portfolio/045-w039.webp", zoom: 1.25, focus: { x: 0.2, y: 0.64 } },
];

/**
 * Split hero: editorial copy bottom-left, the DeviceReel Remotion composition
 * floating on the right with an amber glow behind it. On small screens the
 * reel drops below the copy at ~70vw.
 */
export function AppsHero() {
  const t = useTranslations("Apps");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -4]);

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="apps-hero-title">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-sky absolute -left-[20%] top-[-30%] h-[60vh] w-[60vw] opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pt-36 pb-10 sm:pt-40 lg:pb-12">
        <div className="grid flex-1 items-end gap-14 lg:grid-cols-12 lg:gap-8">
          {/* copy */}
          <motion.div style={{ opacity: fade, y: rise }} className="lg:col-span-7 lg:pr-8 xl:col-span-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <h1 id="apps-hero-title" className="text-h1 mt-6 max-w-[11ch] text-balance">
              <span className="block overflow-hidden pb-[0.1em]">
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

            <WordsStagger className="text-lead mt-7 max-w-xl text-muted text-pretty" delay={0.75} stagger={0.025} speed={0.6}>
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
                  href="#schermen"
                  data-cursor="link"
                  className="group inline-flex h-14 items-center gap-2.5 rounded-full border border-line-2 px-7 text-base font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
                >
                  {t("hero.secondary")}
                  <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-1" />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* device reel */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end xl:col-span-6">
            <motion.figure
              style={{ y: deviceY, rotate: deviceRotate }}
              className="relative w-[70vw] max-w-[440px] lg:w-[min(42vw,520px)] lg:max-w-[520px]"
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
              aria-label={t("hero.reelLabel")}
            >
              <div className="glow-amber absolute left-1/2 top-1/2 -z-0 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-50" aria-hidden />
              <div className="relative animate-float will-change-transform">
                <RemotionPlayer
                  component={DeviceReel}
                  inputProps={{ screens: REEL_SCREENS }}
                  durationInFrames={deviceReelDuration(REEL_SCREENS.length)}
                  fps={DEVICE_REEL_META.fps}
                  width={DEVICE_REEL_META.width}
                  height={DEVICE_REEL_META.height}
                  className="overflow-hidden rounded-[2rem] border border-line bg-ink-2 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]"
                />
              </div>
            </motion.figure>
          </div>
        </div>

        {/* facts row */}
        <motion.ul
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:grid-cols-3 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {(["platforms", "screens", "reply"] as const).map((k) => (
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
