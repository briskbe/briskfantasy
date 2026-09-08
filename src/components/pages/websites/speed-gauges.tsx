"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "motion/react";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SlideUpText } from "@/components/spell/slide-up-text";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const EASE = [0.16, 1, 0.3, 1] as const;

const GAUGES = [
  { key: "performance", value: 90, suffix: "+" },
  { key: "accessibility", value: 100, suffix: "" },
  { key: "seo", value: 100, suffix: "" },
] as const;

const R = 74;
const C = 2 * Math.PI * R;

function Gauge({
  label,
  value,
  suffix,
  target,
  delay,
  active,
  reduced,
}: {
  label: string;
  value: number;
  suffix: string;
  target: string;
  delay: number;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div className="flex items-center gap-6 sm:flex-col sm:gap-0 sm:text-center">
      <div className="relative size-28 shrink-0 sm:size-40 lg:size-44 xl:size-48">
        <svg viewBox="0 0 180 180" className="size-full -rotate-90" aria-hidden>
          <circle cx="90" cy="90" r={R} fill="none" stroke="currentColor" strokeWidth="3" className="text-fg/10" />
          <motion.circle
            cx="90"
            cy="90"
            r={R}
            fill="none"
            stroke="var(--color-amber)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: active ? C * (1 - value / 100) : C }}
            transition={{ duration: reduced ? 0 : 1.8, ease: EASE, delay: reduced ? 0 : delay }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[1.9rem] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[2.5rem] lg:text-[2.9rem]">
            <Counter value={value} suffix={suffix} duration={1.8} />
          </span>
        </div>
      </div>
      <div className="sm:mt-5">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fg">{label}</p>
        <p className="eyebrow mt-2 text-muted">{target}</p>
      </div>
    </div>
  );
}

/** Dark section: the bar we hold every project to. Three ring gauges plus three arguments. */
export function SpeedGauges() {
  const t = useTranslations("Websites");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="websites-speed-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-sky absolute -left-[20%] bottom-[-30%] h-[60vh] w-[60vw] opacity-20" />
      </div>
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index={2}>{t("speed.eyebrow")}</Eyebrow>
          </Reveal>
          <h2 id="websites-speed-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
            <SlideUpText inView split="words" stagger={0.06} transition={{ type: "tween", ease: EASE, duration: 0.9 }}>
              {t("speed.title")}
            </SlideUpText>
          </h2>
          <Reveal delay={0.2}>
            <p className="text-lead mt-6 max-w-lg text-muted text-pretty">{t("speed.lead")}</p>
          </Reveal>

          <RevealGroup className="mt-12 border-t border-line" stagger={0.1}>
            {(["1", "2", "3"] as const).map((k, i) => (
              <RevealItem key={k} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-amber">0{i + 1}</span>
                <div>
                  <h3 className="text-h4">{t(`speed.args.${k}.title`)}</h3>
                  <p className="text-body mt-2 max-w-md text-muted text-pretty">{t(`speed.args.${k}.body`)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div
              ref={ref}
              className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-7 grain sm:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="glow-amber absolute left-1/2 top-[-40%] h-[80%] w-[80%] -translate-x-1/2 opacity-25" />
              </div>
              <div className="relative flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                <span>{t("speed.targetLabel")}</span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" aria-hidden />
                  {t("speed.when")}
                </span>
              </div>
              <div className="relative mt-8 grid gap-7 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:mt-16">
                {GAUGES.map((g, i) => (
                  <Gauge
                    key={g.key}
                    label={t(`speed.gauges.${g.key}`)}
                    value={g.value}
                    suffix={g.suffix}
                    target={t("speed.targetLabel")}
                    delay={0.15 + i * 0.15}
                    active={inView}
                    reduced={reduced}
                  />
                ))}
              </div>
              <p className="relative mt-8 max-w-md border-t border-line pt-6 text-[0.85rem] leading-relaxed text-muted sm:mt-12 lg:mt-16">{t("speed.note")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
