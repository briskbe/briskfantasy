"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { Reveal } from "./reveal";
import { PhoneFrame, PhoneScreen } from "./phone-frame";
import type { ScreenRect } from "./screen-crops";

export type AppScreen = { id: string; caption: string; alt: string; rect: ScreenRect };

const EASE = [0.16, 1, 0.3, 1] as const;
const SIZES = "(min-width: 1024px) 960px, 180vw";

/**
 * Gallery of app screens in one consistent device.
 *
 * Geometry is CSS-driven (`lg:motion-safe:`), so the server and the first
 * client paint agree and nothing shifts after hydration: on large screens the
 * section pins and the row travels sideways with the page; on touch and
 * reduced-motion it is a plain snap scroller. The section headline sits beside
 * the track rather than above it, which leaves the phones the full height of
 * the viewport.
 */
export function AppScreens({ screens }: { screens: AppScreen[] }) {
  const t = useTranslations("Apps");
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const pinned = wide && !reduced;

  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  /** Horizontal distance the track travels while pinned (0 when it is a native scroller). */
  const shift = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    const view = viewRef.current;
    if (!pinned || !track || !view) {
      shift.set(0);
      return;
    }
    // ResizeObserver fires once on observe, so this also handles the initial measurement.
    const ro = new ResizeObserver(() => shift.set(Math.max(0, track.scrollWidth - view.clientWidth)));
    ro.observe(track);
    ro.observe(view);
    return () => ro.disconnect();
  }, [pinned, shift]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * shift.get());
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Driven straight from the motion value: no state, no re-render per scroll tick.
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(screens.length, Math.max(1, Math.round(v * (screens.length - 1)) + 1))).padStart(2, "0"),
  );

  return (
    <section
      id="screens"
      ref={sectionRef}
      className="theme-dark relative scroll-mt-24 bg-ink text-paper section-y lg:motion-safe:h-[240vh] lg:motion-safe:py-0"
      aria-labelledby="apps-screens-title"
    >
      <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:overflow-hidden">
        <div className="flex w-full flex-col gap-12 lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-0">
          {/* header, beside the track on large screens */}
          <div className="px-[clamp(1.25rem,4vw,4rem)] lg:motion-safe:w-[34%] lg:motion-safe:max-w-[30rem] lg:motion-safe:shrink-0 lg:motion-safe:pr-14">
            <Reveal>
              <Eyebrow index={2}>{t("screens.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-screens-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t("screens.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("screens.intro")}</p>
            </Reveal>

            {/* progress, pinned only */}
            <div className="mt-10 hidden items-center gap-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted lg:motion-safe:flex">
              <span className="tabular-nums">
                <motion.span className="text-fg">{counter}</motion.span> / {String(screens.length).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-line" aria-hidden>
                <motion.div style={{ scaleX: barScale }} className="absolute inset-0 origin-left bg-brand" />
              </div>
            </div>
          </div>

          {/* track */}
          <div ref={viewRef} className="relative min-w-0 lg:motion-safe:flex-1 lg:motion-safe:overflow-hidden lg:motion-safe:py-8">
            <motion.ul
              ref={trackRef}
              style={{ x }}
              className="flex snap-x snap-proximity items-start gap-6 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] no-scrollbar [--ph:min(112vw,520px)] sm:gap-10 lg:[--ph:min(68vh,640px)] lg:motion-safe:w-max lg:motion-safe:snap-none lg:motion-safe:gap-10 lg:motion-safe:overflow-visible lg:motion-safe:px-0 lg:motion-safe:pr-[clamp(1.25rem,4vw,4rem)]"
            >
              {screens.map((s, i) => (
                <motion.li
                  key={s.id}
                  className="w-[calc(var(--ph)*0.4615)] shrink-0 snap-center lg:motion-safe:[&:nth-child(even)]:mt-12"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <figure>
                    <PhoneFrame className="w-full">
                      <PhoneScreen rect={s.rect} alt={s.alt} sizes={SIZES} />
                    </PhoneFrame>
                    <figcaption className="mt-5 flex gap-3 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-muted">
                      <span className="text-fg/50">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-pretty">{s.caption}</span>
                    </figcaption>
                  </figure>
                </motion.li>
              ))}
              {/* trailing space so the last phone can reach the centre of a small screen */}
              <li aria-hidden className="w-[calc(50vw-var(--ph)*0.24)] shrink-0 lg:motion-safe:hidden" />
            </motion.ul>
          </div>

          {/* hint, native scroller only */}
          <p className="inline-flex items-center gap-3 px-[clamp(1.25rem,4vw,4rem)] font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted lg:motion-safe:hidden">
            {t("screens.hint")}
            <ArrowRight className="size-3.5" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}
