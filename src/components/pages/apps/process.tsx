"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { Reveal } from "./reveal";

const STEPS = ["1", "2", "3", "4", "5"] as const;

/**
 * A static bordered dot with an lime fill on top. Motion cannot interpolate
 * between two CSS-variable strings, so the previous version snapped its colour
 * at the midpoint; fading the fill's opacity gives the smooth light-up.
 */
function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const opacity = useTransform(progress, [at - 0.02, at + 0.03], [0, 1]);
  const scale = useTransform(progress, [at - 0.02, at + 0.03], [1, 1.25]);
  return (
    <motion.span aria-hidden style={{ scale }} className="relative block size-3 rounded-full border border-line-2 bg-bg">
      <motion.span
        style={{ opacity }}
        className="absolute inset-[-1px] rounded-full bg-brand shadow-[0_0_0_6px_rgba(255,159,77,0.16)]"
      />
    </motion.span>
  );
}

/**
 * Dark section: sticky headline and a live step counter on the left, a
 * five-step timeline on the right. The lime line draws as you scroll and the
 * dots light up as it passes.
 */
export function AppsProcess() {
  const t = useTranslations("Apps");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 62%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const progress = reduced ? scrollYProgress : smooth;
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  const counter = useTransform(progress, (v) =>
    String(Math.min(STEPS.length, Math.max(1, Math.round(v * (STEPS.length - 1)) + 1))).padStart(2, "0"),
  );

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="apps-process-title">
      {/* the glow sits well inside the section so its edge never reads as a seam */}
      <div className="glow-brand pointer-events-none absolute -left-[16%] top-[22%] h-[46vh] w-[42vw] opacity-25" aria-hidden />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
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
            <Reveal delay={0.24}>
              <p
                aria-hidden
                className="mt-10 border-t border-line pt-6 font-mono text-[clamp(2.25rem,3.4vw,3.25rem)] leading-none tracking-[-0.05em] tabular-nums text-fg/25"
              >
                <motion.span className="text-fg">{counter}</motion.span> / 0{STEPS.length}
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden>
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-brand" />
          </div>
          {STEPS.map((k, i) => (
            <li key={k} className="relative pb-14 pl-10 last:pb-0 sm:pl-14 lg:pb-20">
              <span className="absolute left-0 top-2">
                <Dot progress={progress} at={i / (STEPS.length - 1)} />
              </span>
              <Reveal amount={0.4}>
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted">0{i + 1}</span>
                <h3 className="text-h3 mt-3 max-w-[16ch] text-balance">{t(`process.steps.${k}.title`)}</h3>
                <p className="text-body mt-4 max-w-xl text-fg-2 text-pretty">{t(`process.steps.${k}.body`)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
