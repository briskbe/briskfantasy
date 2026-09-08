"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SlideUpText } from "@/components/spell/slide-up-text";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./phone-frame";

export type AppScreen = {
  id: string;
  src: string;
  caption: string;
  alt: string;
  /** CSS object-position aimed at the phone inside the 16:12 mockup */
  position: string;
  /** Extra magnification about the same point, trims the mockup's bezel */
  zoom: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Dark gallery of portfolio screens in CSS phone frames. On large screens the
 * section pins and the row scrolls horizontally with the page; on touch and
 * reduced-motion it is a native snap scroller.
 */
export function AppScreens({ screens }: { screens: AppScreen[] }) {
  const t = useTranslations("Apps");
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const pinned = wide && !reduced;

  const sectionRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Horizontal distance the track travels while pinned (0 when it is a native scroller).
  const shift = useMotionValue(0);
  const [index, setIndex] = useState(1);

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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = screens.length;
    setIndex(Math.min(n, Math.max(1, Math.round(v * (n - 1)) + 1)));
  });

  return (
    <section
      id="schermen"
      ref={sectionRef}
      className={cn("theme-dark relative bg-ink text-paper", pinned ? "h-[360vh]" : "section-y")}
      aria-labelledby="apps-screens-title"
    >
      <div className={cn("flex flex-col", pinned && "sticky top-0 h-screen overflow-hidden pt-28 pb-8")}>
        <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={2}>{t("screens.eyebrow")}</Eyebrow>
            </Reveal>
            <h2 id="apps-screens-title" className="text-h2 mt-5 text-balance">
              <SlideUpText inView split="words" stagger={0.06} className="pb-[0.1em]">
                {t("screens.title")}
              </SlideUpText>
            </h2>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("screens.intro")}</p>
          </Reveal>
        </div>

        {/* track */}
        <div ref={viewRef} className={cn("relative mt-12 lg:mt-0", pinned && "flex flex-1 items-center")}>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className={cn(
              "flex items-start gap-5 sm:gap-8 [--ph:min(134vw,560px)] lg:gap-10 lg:[--ph:min(56vh,600px)]",
              "px-[clamp(1.25rem,4vw,4rem)] will-change-transform",
              pinned ? "w-max" : "snap-x snap-mandatory overflow-x-auto no-scrollbar",
            )}
          >
            {screens.map((s, i) => (
              <motion.figure
                key={s.id}
                className={cn("shrink-0 snap-center", i % 2 === 1 && "lg:mt-16")}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <PhoneFrame className="h-[var(--ph)] w-[calc(var(--ph)*0.4615)]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 70vw"
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: s.position, transform: `scale(${s.zoom})`, transformOrigin: s.position }}
                  />
                </PhoneFrame>
                <figcaption className="mt-5 flex max-w-[calc(var(--ph)*0.4615)] gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                  <span className="text-amber">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-pretty">{s.caption}</span>
                </figcaption>
              </motion.figure>
            ))}
            {/* trailing space so the last phone can reach the centre */}
            <div className="w-[10vw] shrink-0" aria-hidden />
          </motion.div>
        </div>

        {/* progress (pinned) / hint (scroller) */}
        <div className="container-x mt-10 lg:mt-6">
          {pinned ? (
            <div className="flex items-center gap-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              <span className="tabular-nums">
                <span className="text-fg">{String(index).padStart(2, "0")}</span> / {String(screens.length).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-line" aria-hidden>
                <motion.div style={{ scaleX: barScale }} className="absolute inset-0 origin-left bg-amber" />
              </div>
            </div>
          ) : (
            <p className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {t("screens.hint")}
              <ArrowRight className="size-3.5 text-amber" aria-hidden />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
