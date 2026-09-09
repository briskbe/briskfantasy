import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const ITEMS = ["1", "2", "3", "4", "5", "6"] as const;

/**
 * Light section: a sticky intro and a 2×3 list on hairlines. No icons — the
 * mono numbers already mark the rows, and six identical lime check marks
 * turned the section into a generic feature grid.
 */
export async function Included() {
  const t = await getTranslations("Apps");
  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="apps-included-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={3}>{t("included.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-included-title" className="text-h2 mt-5 max-w-[12ch] text-balance">
                {t.rich("included.title", richTags)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-sm text-muted text-pretty">{t("included.intro")}</p>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" className="grid border-t border-line sm:grid-cols-2 lg:col-span-8" stagger={0.06}>
          {ITEMS.map((k, i) => (
            <RevealItem
              key={k}
              as="li"
              className="group border-b border-line py-8 sm:pr-10 sm:odd:border-r sm:even:pl-10 lg:py-10"
            >
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-fg">
                0{i + 1}
              </p>
              <h3 className="text-h4 mt-3 max-w-[18ch] text-balance">{t(`included.items.${k}.title`)}</h3>
              <p className="text-body mt-2.5 max-w-sm text-fg-2 text-pretty">{t(`included.items.${k}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
