"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const STEPS = ["1", "2", "3", "4", "5"] as const;

function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const bg = useTransform(progress, [at - 0.02, at + 0.03], ["var(--bg)", "var(--color-amber)"]);
  const border = useTransform(progress, [at - 0.02, at + 0.03], ["var(--line-2)", "var(--color-amber)"]);
  const scale = useTransform(progress, [at - 0.02, at + 0.03], [1, 1.3]);
  const glow = useTransform(progress, [at - 0.02, at + 0.03], ["0 0 0 0 rgba(255,159,77,0)", "0 0 0 6px rgba(255,159,77,0.18)"]);
  return <motion.span aria-hidden style={{ backgroundColor: bg, borderColor: border, scale, boxShadow: glow }} className="block size-3 rounded-full border" />;
}

/**
 * Dark section: sticky headline on the left, a five-step vertical timeline on
 * the right. The amber line draws as you scroll; dots light up as it passes.
 */
export function AppsProcess() {
  const t = useTranslations("Apps");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 62%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const progress = reduced ? scrollYProgress : smooth;
  const scaleY = useTransform(progress, [0, 1], [reduced ? 1 : 0, 1]);

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="apps-process-title">
      <div className="glow-amber pointer-events-none absolute -left-[20%] bottom-[-10%] h-[60vh] w-[60vw] opacity-20" aria-hidden />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={4}>{t("process.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-process-title" className="text-h2 mt-5 max-w-[12ch] text-balance">
                {t.rich("process.title", richTags)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-sm text-muted text-pretty">{t("process.intro")}</p>
            </Reveal>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden>
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-amber" />
          </div>
          {STEPS.map((k, i) => (
            <li key={k} className="relative pl-10 pb-14 last:pb-0 sm:pl-14 lg:pb-20">
              <span className="absolute left-0 top-2">
                <Dot progress={progress} at={i / (STEPS.length - 1)} />
              </span>
              <Reveal amount={0.4}>
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted">0{i + 1}</span>
                <h3 className="text-h3 mt-3 max-w-[16ch] text-balance">{t(`process.steps.${k}.title`)}</h3>
                <p className="text-body mt-4 max-w-md text-fg-2 text-pretty">{t(`process.steps.${k}.body`)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
