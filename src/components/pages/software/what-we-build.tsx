import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const ITEMS = ["1", "2", "3", "4", "5"] as const;
const TAGS = ["1", "2", "3"] as const;

/** Light section: an editorial list with oversized titles, a mono index and three keyword pills per row. */
export async function WhatWeBuild() {
  const t = await getTranslations("Software");
  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="software-build-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={1}>{t("build.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-build-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
                {t.rich("build.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("build.intro")}</p>
          </Reveal>
        </div>

        <ol className="mt-16 lg:mt-24" aria-label={t("build.eyebrow")}>
          {ITEMS.map((k, i) => (
            <Reveal key={k} as="li" amount={0.3} className="group border-t border-line last:border-b">
              <div className="grid gap-5 py-9 sm:grid-cols-[4rem_1fr] lg:grid-cols-12 lg:gap-8 lg:py-12">
                <span className="font-mono text-[0.78rem] tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-amber lg:col-span-1 lg:pt-3">
                  0{i + 1}
                </span>
                <h3 className="text-h2 text-balance lg:col-span-6">{t(`build.items.${k}.title`)}</h3>
                <div className="sm:col-start-2 lg:col-span-4 lg:col-start-9 lg:pt-2">
                  <p className="text-body max-w-md text-fg-2 text-pretty">{t(`build.items.${k}.body`)}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={t(`build.items.${k}.title`)}>
                    {TAGS.map((tk) => (
                      <li
                        key={tk}
                        className="rounded-full border border-line-2 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-2 transition-colors duration-500 group-hover:border-fg/40"
                      >
                        {t(`build.items.${k}.tags.${tk}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
