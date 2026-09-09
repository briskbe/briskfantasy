import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const ITEMS = ["1", "2", "3"] as const;

/**
 * Light section: headline and lead on one baseline, then three columns on
 * hairlines. The index sits above each column at a scale below the headline,
 * so the section reads as a list under the statement instead of three
 * competing headlines.
 */
export async function OneCodebase() {
  const t = await getTranslations("Apps");
  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="apps-codebase-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index={1}>{t("codebase.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-codebase-title" className="text-h2 mt-5 max-w-[13ch] text-balance">
                {t.rich("codebase.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8">
            <p className="text-body max-w-md text-muted text-pretty">{t("codebase.intro")}</p>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-16 grid border-t border-line md:grid-cols-3 lg:mt-20" stagger={0.1}>
          {ITEMS.map((k, i) => (
            <RevealItem
              key={k}
              as="li"
              className="group flex flex-col border-b border-line py-9 md:border-b-0 md:border-r md:px-8 md:py-11 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span
                aria-hidden
                className="font-mono text-[clamp(2.25rem,3.4vw,3.25rem)] leading-none tracking-[-0.05em] text-paper-3 transition-colors duration-700 ease-[var(--ease-out-expo)] group-hover:text-accent"
              >
                0{i + 1}
              </span>
              <h3 className="text-h3 mt-7 max-w-[14ch] text-balance">{t(`codebase.items.${k}.title`)}</h3>
              <p className="text-body mt-4 max-w-sm text-fg-2 text-pretty">{t(`codebase.items.${k}.body`)}</p>
              <p className="mt-7 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted md:mt-auto md:pt-8">{t(`codebase.items.${k}.tags`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
