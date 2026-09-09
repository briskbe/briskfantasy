"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

export type HeroTile = { id: string; src: string; width: number; height: number };

const FACTS = ["screens", "reply", "ownership"] as const;

function Screen({
  tile,
  className,
  y,
  opacity,
  delay,
  sizes,
}: {
  tile: HeroTile;
  className: string;
  y: MotionValue<number>;
  opacity: number;
  delay: number;
  sizes: string;
}) {
  return (
    <motion.div style={{ y }} className={className}>
      <motion.div
        className="overflow-hidden rounded-xl border border-paper/10 bg-ink-2 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)]"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity, y: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <Image src={tile.src} alt="" width={tile.width} height={tile.height} sizes={sizes} quality={70} className="block h-auto w-full" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Dark hero. The copy owns the left half on its own ink ground; three dark-toned
 * product screens are stacked in perspective in the right half, well below the
 * header line and behind a left-to-right scrim, so no headline, nav link or
 * stat ever sits on top of UI pixels. One warm glow sits behind the lead screen.
 */
export function SoftwareHero({ screens }: { screens: HeroTile[] }) {
  const t = useTranslations("Software");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yLead = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -50]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);

  const [lead, back, front] = screens;

  const jumpToInterfaces = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById("interfaces");
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: 0 });
      else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [lenis, reduced],
  );

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="software-hero-title">
      {/* Screen stack, right half only, desktop only. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="glow-brand absolute right-[6%] top-[18%] h-[56vh] w-[40vw] opacity-30 blur-[70px]" />
        <div className="absolute inset-y-0 right-0 w-[52%] [perspective:1800px]">
          {back && (
            <Screen
              tile={back}
              y={yBack}
              opacity={0.26}
              delay={0.35}
              sizes="22vw"
              className="absolute right-[46%] top-[15%] w-[46%] will-change-transform [transform:rotateY(-17deg)_rotateX(7deg)]"
            />
          )}
          {lead && (
            <Screen
              tile={lead}
              y={yLead}
              opacity={0.92}
              delay={0.2}
              sizes="42vw"
              className="absolute right-[6%] top-[27%] w-[76%] will-change-transform [transform:rotateY(-13deg)_rotateX(5deg)]"
            />
          )}
          {front && (
            <Screen
              tile={front}
              y={yFront}
              opacity={0.4}
              delay={0.5}
              sizes="20vw"
              className="absolute bottom-[13%] right-[34%] w-[38%] will-change-transform [transform:rotateY(-13deg)_rotateX(5deg)]"
            />
          )}
        </div>
        {/* Scrims: copy side stays pure ink, the header line and the stats rule keep clear air. */}
        <div className="absolute inset-y-0 left-0 w-[78%] bg-[linear-gradient(90deg,#0c1619_0%,rgba(12,22,25,0.97)_40%,rgba(12,22,25,0.35)_78%,transparent_100%)]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,#0c1619_0%,rgba(12,22,25,0.8)_55%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(0deg,#0c1619_0%,rgba(12,22,25,0.85)_45%,transparent_100%)]" />
      </div>

      {/* Mobile / tablet: no screens behind the type — one warm glow and the grain carry it. */}
      <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden>
        <div className="glow-brand absolute -left-[25%] bottom-[-18%] h-[55vh] w-[95vw] opacity-40 blur-[60px]" />
      </div>

      <div className="container-x relative flex min-h-[94svh] flex-col justify-end pt-40 pb-10 sm:pt-44 lg:min-h-[100svh] lg:pb-12">
        <motion.div style={{ opacity: fade, y: rise }} className="max-w-2xl lg:max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
            <Eyebrow tone="muted">{t("hero.eyebrow")}</Eyebrow>
          </motion.div>

          <h1 id="software-hero-title" className="text-display mt-6 max-w-[11ch] text-balance">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
                {t.rich("hero.title", richTags)}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="text-lead mt-7 max-w-xl text-fg-2 text-pretty"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          >
            {t("hero.lead")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          >
            <Button href="/gesprek-inplannen" size="lg">
              {t("hero.primary")}
            </Button>
            <Magnetic strength={0.35}>
              <a
                href="#interfaces"
                onClick={jumpToInterfaces}
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
          className="mt-14 grid gap-4 border-t border-line pt-6 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-muted sm:grid-cols-3 lg:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          aria-label={t("hero.gridLabel")}
        >
          {FACTS.map((k) => (
            <li key={k} className="flex items-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-fg/25" aria-hidden />
              {t(`hero.facts.${k}`)}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
