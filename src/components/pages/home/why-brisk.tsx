"use client";

import { useLocale, useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatNumber } from "./stat";

const ITEM_KEYS = ["contact", "ownership", "pace"] as const;

export function WhyBrisk({ liveSites, screens }: { liveSites: number; screens: number }) {
  const t = useTranslations("Home.why");
  const locale = useLocale();

  const metrics = [
    { key: "sites", value: liveSites, label: t("metrics.sites") },
    { key: "screens", value: screens, suffix: "+", label: t("metrics.screens") },
    { key: "reply", value: 24, suffix: locale === "nl" ? "u" : "h", label: t("metrics.reply") },
    { key: "intro", value: 30, suffix: " min", label: t("metrics.intro") },
  ];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:mt-20" stagger={0.1}>
        {ITEM_KEYS.map((k) => (
          <RevealItem key={k} as="article" className="bg-bg p-8 sm:p-9">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-hidden>
              {t(`items.${k}.index`)}
            </p>
            <h3 className="text-h4 mt-7 text-balance md:min-h-[2.4em]">{t(`items.${k}.title`)}</h3>
            <p className="text-body mt-4 text-muted text-pretty">{t(`items.${k}.body`)}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 lg:mt-20" amount={0.15}>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-4 lg:pt-12">
          {metrics.map((m) => (
            <div key={m.key} className="flex flex-col-reverse items-start">
              <dt className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{m.label}</dt>
              <dd className="text-[clamp(2.75rem,5.2vw,4.75rem)] font-medium leading-none tracking-[-0.04em] text-fg">
                <StatNumber value={m.value} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}
