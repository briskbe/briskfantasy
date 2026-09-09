"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const STEPS = ["1", "2", "3", "4"] as const;

function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const bg = useTransform(progress, [at - 0.02, at + 0.03], ["var(--bg)", "var(--color-amber)"]);
  const border = useTransform(progress, [at - 0.02, at + 0.03], ["var(--line-2)", "var(--color-amber)"]);
  const scale = useTransform(progress, [at - 0.02, at + 0.03], [1, 1.25]);
  return (
    <motion.span
      aria-hidden
      style={{ backgroundColor: bg, borderColor: border, scale }}
      className="block size-3 rounded-full border"
    />
  );
}

/**
 * Light section: four steps on a hairline. The amber line draws as the
 * section scrolls through the viewport; dots light up as the line passes.
 */
export function ProcessTimeline() {
  const t = useTranslations("Websites");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const progress = reduced ? scrollYProgress : smooth;
  const scaleX = useTransform(progress, [0, 1], [reduced ? 1 : 0, 1]);
  const scaleY = scaleX;

  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="websites-process-title">
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={4} tone="muted" className="text-xs">
                {t("process.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="websites-process-title" className="text-h2 mt-5 text-balance">
                {t.rich("process.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("process.intro")}</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* horizontal track (md+) */}
          <div className="absolute inset-x-0 top-[5px] hidden h-px bg-line md:block" aria-hidden>
            <motion.div style={{ scaleX }} className="h-full w-full origin-left bg-amber" />
          </div>
          {/* vertical track (mobile) */}
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-line md:hidden" aria-hidden>
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-amber" />
          </div>

          <ol className="grid gap-12 md:grid-cols-4 md:gap-6 lg:gap-8">
            {STEPS.map((k, i) => (
              <li key={k} className="relative pl-9 md:pl-0 md:pt-10">
                <span className="absolute left-0 top-1 md:left-0 md:top-0">
                  <Dot progress={progress} at={i / 3} />
                </span>
                <Reveal delay={i * 0.08} amount={0.4}>
                  <span className="font-mono text-xs tracking-[0.18em] text-muted">0{i + 1}</span>
                  <h3 className="text-h3 mt-3">{t(`process.steps.${k}.title`)}</h3>
                  <p className="text-body mt-4 max-w-xs text-fg-2 text-pretty">{t(`process.steps.${k}.body`)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
