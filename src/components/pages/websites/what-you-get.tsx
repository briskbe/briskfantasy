import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const ITEMS = ["1", "2", "3", "4", "5"] as const;

/** Light section: sticky intro on the left, an editorial numbered list on the right. */
export async function WhatYouGet() {
  const t = await getTranslations("Websites");
  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="websites-what-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={1} className="text-xs">
                {t("whatYouGet.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="websites-what-title" className="text-h2 mt-5 text-balance">
                {t.rich("whatYouGet.title", richTags)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("whatYouGet.intro")}</p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7" aria-label={t("whatYouGet.eyebrow")}>
          {ITEMS.map((k, i) => (
            <Reveal key={k} as="li" amount={0.3} className="group border-t border-line last:border-b">
              <div className="grid gap-4 py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-6 lg:grid-cols-[6rem_1fr] lg:py-10">
                <span className="font-mono text-xs tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-fg">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-h3 text-balance">{t(`whatYouGet.items.${k}.title`)}</h3>
                  <p className="text-body mt-4 max-w-xl text-fg-2 text-pretty">{t(`whatYouGet.items.${k}.body`)}</p>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    {t(`whatYouGet.items.${k}.tags`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
