"use client";

import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { ProcessReel, PROCESS_REEL_META, processReelDuration, type ProcessStep } from "@/components/remotion/compositions";

const STEPS = ["1", "2", "3", "4"] as const;

/** Dark section: copy on the left (5), the ProcessReel Remotion composition in a framed panel on the right (7). */
export function SoftwareInMotion() {
  const t = useTranslations("Software");
  const steps: ProcessStep[] = STEPS.map((k, i) => ({
    index: String(i + 1).padStart(2, "0"),
    title: t(`motion.steps.${k}.title`),
    body: t(`motion.steps.${k}.body`),
  }));

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="software-motion-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5 lg:pr-8">
          <Reveal>
            <Eyebrow index={3}>{t("motion.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="software-motion-title" className="text-h2 mt-5 text-balance">
              {t.rich("motion.title", richTags)}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("motion.body")}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <ol className="mt-10 border-t border-line">
              {steps.map((s) => (
                <li key={s.index} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-line py-4">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] text-amber">{s.index}</span>
                  <span className="text-[1.05rem] font-medium tracking-[-0.01em] text-fg">{s.title}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 glow-amber opacity-30 blur-3xl" aria-hidden />
            <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] sm:rounded-3xl">
              <RemotionPlayer
                component={ProcessReel}
                inputProps={{ steps, eyebrow: t("motion.reelEyebrow") }}
                durationInFrames={processReelDuration(steps.length)}
                fps={PROCESS_REEL_META.fps}
                width={PROCESS_REEL_META.width}
                height={PROCESS_REEL_META.height}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
