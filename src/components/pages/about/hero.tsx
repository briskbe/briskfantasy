"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { richTags } from "@/components/ui/rich";
import { portfolio, type PortfolioItem } from "@/data/portfolio";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Three dark-toned screens from our own portfolio. They share a near-black
 * ground so the stack reads as one composition on the ink hero instead of
 * three unrelated crops.
 */
const STACK: PortfolioItem[] = ["035-w029", "056-w050", "015-w009"].map(
  (id) => portfolio.find((p) => p.id === id)!,
);

/** One headline line: clipped wrapper, the line rises into view. */
function Line({
  children,
  delay,
  show,
  reduced,
}: {
  children: ReactNode;
  delay: number;
  show: boolean;
  reduced: boolean;
}) {
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={show ? { y: "0%" } : { y: "110%" }}
        transition={reduced ? { duration: 0 } : { duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Shot({ item, sizes, priority }: { item: PortfolioItem; sizes: string; priority?: boolean }) {
  const locale = useLocale() === "en" ? "en" : "nl";
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2 p-1.5">
      <Image
        src={item.src}
        alt={item.title[locale]}
        width={item.width}
        height={item.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-lg"
      />
    </div>
  );
}

/**
 * About hero: the statement bottom-left, a stack of three real product screens
 * on the right so the first screen already shows what the team makes. The
 * stack drifts slightly against the copy on scroll.
 */
export function AboutHero() {
  const t = useTranslations("About.hero");
  const reduced = usePrefersReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
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
  const stackY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // The fade is a desktop effect only: on a phone the hero is taller than the
  // viewport, so tying opacity to section progress dims copy that is still on
  // screen (and still tappable).
  const drift = reduced || !isLg;
  // Reduced motion still has to *arrive*: the entrances resolve at duration 0
  // rather than being dropped, so nothing is left stranded at its start state.
  const show = ready || reduced;

  return (
    <section
      ref={ref}
      className="theme-dark relative isolate overflow-hidden bg-ink text-paper"
      aria-labelledby="about-title"
    >
      {/* Backdrop: one warm glow, a cool counterweight, grain */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-[10%] top-[5%] h-[70vh] w-[70vh] glow-amber opacity-35 blur-3xl" />
        <div className="absolute -left-[15%] bottom-[-10%] h-[50vh] w-[50vh] glow-sky opacity-20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-x relative flex min-h-[78svh] flex-col justify-end pb-16 pt-36 sm:pt-40 lg:min-h-[92svh] lg:pb-16">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div className="lg:col-span-7" style={drift ? undefined : { y: textY, opacity: fade }}>
            <motion.p
              className="eyebrow inline-flex items-center gap-3 text-amber"
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={reduced ? { duration: 0 } : { duration: 0.8, ease: EASE, delay }}
            >
              <span className="size-1.5 rounded-full bg-current" aria-hidden />
              {t("eyebrow")}
            </motion.p>
            <h1 id="about-title" className="text-display mt-6 max-w-[12ch] text-balance">
              <Line delay={delay + 0.1} show={show} reduced={reduced}>
                {t("titleLine1")}
              </Line>
              <Line delay={delay + 0.22} show={show} reduced={reduced}>
                {t.rich("titleLine2", richTags)}
              </Line>
            </h1>
            <motion.p
              className="text-lead mt-8 max-w-lg text-paper/80 text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: delay + 0.45 }}
            >
              {t("lead")}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: delay + 0.58 }}
            >
              <Button href="/gesprek-inplannen" size="lg" className="w-full sm:w-auto">
                {t("ctaPrimary")}
              </Button>
              <Button href="/referenties" variant="secondary" size="lg" className="w-full sm:w-auto">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </motion.div>

          {/* Work stack — desktop only: on a phone it would push the first
              section a further screen down without adding information. */}
          <motion.figure
            className="hidden lg:col-span-5 lg:col-start-8 lg:block"
            // No `y` here: the scroll drift below already owns that channel.
            initial={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
            animate={show ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 1.2, ease: EASE, delay: delay + 0.35 }}
            style={drift ? undefined : { y: stackY }}
          >
            <div className="grid gap-3">
              <Shot item={STACK[0]} sizes="34vw" priority />
              <div className="grid grid-cols-2 gap-3">
                <Shot item={STACK[1]} sizes="17vw" />
                <Shot item={STACK[2]} sizes="17vw" />
              </div>
            </div>
            <figcaption className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {t("workCaption")}
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
