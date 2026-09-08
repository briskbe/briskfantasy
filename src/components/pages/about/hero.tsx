"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { richTags } from "@/components/ui/rich";
import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { WordmarkReel, WORDMARK_REEL_META } from "@/components/remotion/compositions";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One headline line: clipped wrapper, the line rises into view. */
function Line({ children, delay, ready }: { children: ReactNode; delay: number; ready: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={ready ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * About hero: statement headline bottom-left, the WordmarkReel (Remotion)
 * framed and glowing on the right. The reel drifts slightly on scroll.
 */
export function AboutHero() {
  const t = useTranslations("About.hero");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState<{ ready: boolean; delay: number }>({ ready: false, delay: 0.2 });
  const { ready, delay } = intro;

  // Wait for the preloader curtain on a first visit; start right away afterwards.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("brisk:intro-seen") === "1";
    } catch {
      seen = false;
    }
    const id = requestAnimationFrame(() => setIntro({ ready: true, delay: seen ? 0.15 : 1.35 }));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const reelY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="theme-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="about-title">
      {/* Backdrop: one warm glow, faint grid, grain */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-[10%] top-[5%] h-[70vh] w-[70vh] glow-amber opacity-40 blur-3xl" />
        <div className="absolute -left-[15%] bottom-[-10%] h-[50vh] w-[50vh] glow-sky opacity-20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-x relative flex min-h-[92svh] flex-col justify-end pb-12 pt-36 sm:pt-40 lg:pb-16">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div className="lg:col-span-7" style={reduced ? undefined : { y: textY, opacity: fade }}>
            <motion.p
              className="eyebrow inline-flex items-center gap-3 text-amber"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay }}
            >
              <span className="size-1.5 rounded-full bg-current" aria-hidden />
              {t("eyebrow")}
            </motion.p>
            <h1 id="about-title" className="text-display mt-6 max-w-[10ch] text-balance">
              <Line delay={delay + 0.1} ready={ready}>
                {t("titleLine1")}
              </Line>
              <Line delay={delay + 0.22} ready={ready}>
                {t.rich("titleLine2", richTags)}
              </Line>
            </h1>
            <motion.p
              className="text-lead mt-8 max-w-xl text-paper/80 text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + 0.45 }}
            >
              {t("lead")}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + 0.58 }}
            >
              <Button href="/gesprek-inplannen" size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button href="/referenties" variant="secondary" size="lg" icon="up-right">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Wordmark reel */}
          <motion.figure
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: delay + 0.35 }}
            style={reduced ? undefined : { y: reelY }}
          >
            <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 glow-amber opacity-50 blur-3xl" aria-hidden />
            <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] sm:rounded-3xl">
              <RemotionPlayer
                component={WordmarkReel}
                inputProps={{ tagline: t("tagline") }}
                durationInFrames={WORDMARK_REEL_META.durationInFrames}
                fps={WORDMARK_REEL_META.fps}
                width={WORDMARK_REEL_META.width}
                height={WORDMARK_REEL_META.height}
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/55">
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-amber" aria-hidden />
                {t("reelCaption")}
              </span>
              <span className="hidden sm:inline">16 : 9</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
