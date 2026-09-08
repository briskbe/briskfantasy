import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const ITEMS = ["1", "2", "3", "4", "5", "6"] as const;

function Check() {
  return (
    <span
      aria-hidden
      className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-line-2 text-amber transition-[background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover:border-amber group-hover:bg-amber group-hover:text-ink"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

/** Light section: editorial two-column checklist on hairlines. */
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

        <RevealGroup className="grid border-t border-line sm:grid-cols-2 lg:col-span-8" stagger={0.06}>
          {ITEMS.map((k, i) => (
            <RevealItem
              key={k}
              as="article"
              className="group flex gap-5 border-b border-line py-8 sm:pr-8 sm:odd:border-r sm:even:pl-8 lg:py-10"
            >
              <Check />
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">0{i + 1}</p>
                <h3 className="text-h4 mt-2">{t(`included.items.${k}.title`)}</h3>
                <p className="text-body mt-2 max-w-xs text-fg-2 text-pretty">{t(`included.items.${k}.body`)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
