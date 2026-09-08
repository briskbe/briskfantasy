import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { cn } from "@/lib/utils";

const ITEMS = ["1", "2", "3", "4"] as const;
/** Asymmetric 2x2: 7/5 on the first row, 5/7 on the second. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/** Light section: the four pillars of every shop we build, as an asymmetric grid with big mono numbers. */
export async function Pillars() {
  const t = await getTranslations("Webshops");

  return (
    <Section theme="light" id="pijlers">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index={1}>{t("pillars.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-h2 mt-5 text-balance">{t.rich("pillars.title", richTags)}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.16} className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <p className="text-lead max-w-xl text-muted text-pretty">{t("pillars.intro")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:mt-20 lg:grid-cols-12" stagger={0.08}>
        {ITEMS.map((k, i) => {
          const tags = t(`pillars.items.${k}.tags`).split("·").map((s) => s.trim());
          return (
            <RevealItem key={k} as="article" className={cn("flex h-full flex-col justify-between bg-bg p-7 sm:p-9 lg:min-h-[24rem] lg:p-11", SPANS[i])}>
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.05em] text-fg/10 tabular-nums" aria-hidden>
                  0{i + 1}
                </span>
                <span className="mt-2 size-2 rounded-full bg-amber" aria-hidden />
              </div>
              <div className="mt-12 lg:mt-16">
                <h3 className="text-h3 text-balance">{t(`pillars.items.${k}.title`)}</h3>
                <p className="text-body mt-4 max-w-md text-muted text-pretty">{t(`pillars.items.${k}.body`)}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={t(`pillars.items.${k}.title`)}>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line-2 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-fg-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
