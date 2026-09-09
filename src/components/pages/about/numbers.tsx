"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Counter } from "./counter";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

/**
 * Proof band that closes the light "what we stand for" section: four counted
 * facts, the qualifying note underneath them (so it is read *after* the
 * figures) and one quiet link to the work. Deliberately set a step below the
 * section heading — it is a coda, not a second section.
 */
export function Numbers({ liveSites, screens }: { liveSites: number; screens: number }) {
  const t = useTranslations("About.numbers");

  const metrics = [
    { key: "sites", value: liveSites, suffix: "" },
    { key: "screens", value: screens, suffix: "+" },
    { key: "intro", value: 30, suffix: t("introSuffix") },
    { key: "reply", value: 24, suffix: t("replySuffix") },
  ] as const;

  return (
    <div className="mt-24 border-t border-line pt-10 lg:mt-32 lg:pt-14">
      <Reveal>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-8">
          <h3 className="text-h3 text-balance">{t.rich("title", richTags)}</h3>
          <p className="eyebrow text-muted">{t("eyebrow")}</p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {metrics.map((m) => (
            // `flex-col-reverse` keeps the DOM order dt → dd (valid, and read
            // correctly by screen readers) while the figure still sits on top.
            <div key={m.key} className="flex flex-col-reverse">
              <dt className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {t(`items.${m.key}`)}
              </dt>
              <dd className="text-[clamp(2.75rem,6vw,6rem)] font-medium leading-none tracking-[-0.045em] tabular-nums text-fg">
                <Counter value={m.value} />
                {m.suffix && <span className="text-fg/35">{m.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="max-w-md text-[0.9rem] leading-relaxed text-muted">{t("note")}</p>
          <Button href="/referenties" variant="ghost" icon="arrow" className="self-start text-[0.95rem] sm:self-auto">
            {t("link")}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
