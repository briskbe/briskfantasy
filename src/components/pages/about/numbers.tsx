"use client";

import { useTranslations } from "next-intl";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

/** Four counters on a dark ground: live sites, product screens, languages, reply time. */
export function Numbers({ liveSites, screens }: { liveSites: number; screens: number }) {
  const t = useTranslations("About.numbers");

  const metrics = [
    { key: "sites", value: liveSites, suffix: "" },
    { key: "screens", value: screens, suffix: "+" },
    { key: "languages", value: 2, suffix: "" },
    { key: "reply", value: 24, suffix: t("replySuffix") },
  ] as const;

  return (
    <div>
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h1 mt-5 text-balance">{t.rich("title", richTags)}</h2>
        </div>
        <p className="text-body max-w-sm text-muted lg:col-span-4 lg:col-start-9">{t("note")}</p>
      </Reveal>

      <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-8" stagger={0.1}>
        {metrics.map((m) => (
          <RevealItem key={m.key} as="div">
            <dl>
              <dd className="text-[clamp(3.25rem,7vw,7rem)] font-medium leading-none tracking-[-0.045em] tabular-nums text-fg">
                <Counter value={m.value} />
                {m.suffix && <span className="text-amber">{m.suffix}</span>}
              </dd>
              <dt className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                <span className="size-1.5 rounded-full bg-amber" aria-hidden />
                {t(`items.${m.key}`)}
              </dt>
            </dl>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
