"use client";

import { useLocale, useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { RemotionPlayer } from "@/components/remotion/remotion-player";
import { MetricsReel, METRICS_REEL_META } from "@/components/remotion/compositions";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

const ITEM_KEYS = ["contact", "ownership", "pace"] as const;

export function WhyBrisk({ liveSites, screens }: { liveSites: number; screens: number }) {
  const t = useTranslations("Home.why");
  const locale = useLocale();
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();

  const metrics = [
    { value: liveSites, label: t("metrics.sites") },
    { value: screens, suffix: "+", label: t("metrics.screens") },
    { value: 24, suffix: locale === "nl" ? "u" : "h", label: t("metrics.reply") },
    { value: 2, label: t("metrics.languages") },
  ];

  return (
    <div>
      <Reveal>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h1 mt-5 max-w-4xl text-balance">{t("title")}</h2>
      </Reveal>

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3" stagger={0.1}>
        {ITEM_KEYS.map((k) => (
          <RevealItem key={k} as="article" className="flex flex-col justify-between bg-bg p-7 sm:p-9 md:min-h-[22rem]">
            <span className="font-mono text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.04em] text-fg/12" aria-hidden>
              {t(`items.${k}.index`)}
            </span>
            <div className="mt-8 md:mt-14">
              <h3 className="text-h3 text-balance">{t(`items.${k}.title`)}</h3>
              <p className="text-body mt-4 text-muted text-pretty">{t(`items.${k}.body`)}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8" amount={0.2}>
        {wide && !reduced ? (
          <div className="overflow-hidden rounded-3xl border border-line bg-paper">
            <RemotionPlayer
              component={MetricsReel}
              inputProps={{ metrics, theme: "light", locale: locale === "nl" ? "nl-BE" : "en-GB" }}
              durationInFrames={METRICS_REEL_META.durationInFrames}
              fps={METRICS_REEL_META.fps}
              width={METRICS_REEL_META.width}
              height={METRICS_REEL_META.height}
            />
          </div>
        ) : (
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {metrics.map((m) => (
              <div key={m.label} className="bg-bg p-6">
                <dd className="text-h2 tabular-nums text-fg">
                  <Counter value={m.value} suffix={m.suffix ?? ""} />
                </dd>
                <dt className="mt-2 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  <span className="size-1.5 rounded-full bg-amber" aria-hidden />
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        )}
      </Reveal>
    </div>
  );
}
