import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const ITEMS = ["1", "2", "3"] as const;

/**
 * Light section: headline + three columns on hairlines, each led by an
 * outlined giant mono index (01–03).
 */
export async function OneCodebase() {
  const t = await getTranslations("Apps");
  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="apps-codebase-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={1}>{t("codebase.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-codebase-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t.rich("codebase.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("codebase.intro")}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid border-t border-line md:grid-cols-3 lg:mt-24" stagger={0.1}>
          {ITEMS.map((k, i) => (
            <RevealItem
              key={k}
              as="article"
              className="group relative flex flex-col border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:min-h-[26rem]"
            >
              <span
                aria-hidden
                className="font-mono text-[clamp(4.5rem,8vw,7.5rem)] leading-none tracking-[-0.06em] text-paper-3 transition-colors duration-700 ease-[var(--ease-out-expo)] group-hover:text-amber"
              >
                0{i + 1}
              </span>
              <h3 className="text-h3 mt-8 max-w-[14ch] text-balance md:mt-auto md:pt-12">{t(`codebase.items.${k}.title`)}</h3>
              <p className="text-body mt-4 max-w-sm text-fg-2 text-pretty">{t(`codebase.items.${k}.body`)}</p>
              <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">{t(`codebase.items.${k}.tags`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
