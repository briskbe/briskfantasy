import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

const ITEMS = ["1", "2", "3", "4"] as const;
/** Asymmetric 2x2: 7/5 on the first row, 5/7 on the second. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/** Light section: the four pillars of every shop we build, as an asymmetric grid with big mono numbers. */
export async function Pillars() {
  const t = await getTranslations("Webshops");

  return (
    <Section theme="light" id="pijlers">
      <SectionIntro index={1} eyebrow={t("pillars.eyebrow")} title={t.rich("pillars.title", richTags)} lead={t("pillars.intro")} />

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:mt-20 lg:grid-cols-12" stagger={0.08}>
        {ITEMS.map((k, i) => {
          const tags = t(`pillars.items.${k}.tags`).split("·").map((s) => s.trim());
          return (
            <RevealItem key={k} as="article" className={cn("flex h-full flex-col bg-bg p-7 sm:p-9 lg:p-11", SPANS[i])}>
              {/* the ghost number carries the top of the card; the title always
                  starts at the same offset below it, so rows stay aligned */}
              <span
                className="block font-mono text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.78] tracking-[-0.06em] text-fg/[0.08] tabular-nums"
                aria-hidden
              >
                0{i + 1}
              </span>
              <h3 className="text-h3 mt-8 max-w-[18ch] text-balance">{t(`pillars.items.${k}.title`)}</h3>
              <p className="text-body mt-4 max-w-md text-muted text-pretty">{t(`pillars.items.${k}.body`)}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label={t(`pillars.items.${k}.title`)}>
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line-2 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fg-2"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
