"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { ProcessReel, PROCESS_REEL_META, processReelDuration } from "@/components/remotion/compositions";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

const STEP_KEYS = ["discover", "design", "build", "launch"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function Step({ index, title, short, body, last }: { index: string; title: string; short: string; body: string; last: boolean }) {
  return (
    <motion.li
      className={`relative grid gap-5 border-t border-line py-10 sm:grid-cols-[6rem_1fr] sm:gap-8 lg:py-14 ${last ? "border-b" : ""}`}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="font-mono text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.03em] text-amber" aria-hidden>
        {index}
      </span>
      <div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{short}</p>
        <h3 className="text-h2 mt-3 text-balance">
          <span className="sr-only">{index} </span>
          {title}
        </h3>
        <p className="text-body mt-5 max-w-xl text-muted text-pretty">{body}</p>
      </div>
    </motion.li>
  );
}

export function Process() {
  const t = useTranslations("Home.process");
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();

  const steps = STEP_KEYS.map((k) => ({
    key: k,
    index: t(`steps.${k}.index`),
    title: t(`steps.${k}.title`),
    short: t(`steps.${k}.short`),
    body: t(`steps.${k}.body`),
  }));

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="text-h1 mt-5 max-w-[12ch] text-balance">{t("title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body mt-7 max-w-md text-muted text-pretty">{t("body")}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-9">
            <Button href="/gesprek-inplannen" size="lg">
              {t("cta")}
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-7">
        {wide && !reduced && (
          <Reveal className="mb-14 overflow-hidden rounded-2xl border border-line bg-ink-2" amount={0.15}>
            <RemotionPlayer
              component={ProcessReel}
              inputProps={{ steps: steps.map(({ index, title, short }) => ({ index, title, body: short })), eyebrow: t("reelEyebrow") }}
              durationInFrames={processReelDuration(steps.length)}
              fps={PROCESS_REEL_META.fps}
              width={PROCESS_REEL_META.width}
              height={PROCESS_REEL_META.height}
            />
          </Reveal>
        )}
        <ol className="list-none">
          {steps.map((s, i) => (
            <Step key={s.key} index={s.index} title={s.title} short={s.short} body={s.body} last={i === steps.length - 1} />
          ))}
        </ol>
      </div>
    </div>
  );
}
