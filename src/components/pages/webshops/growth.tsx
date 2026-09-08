import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const ITEMS = ["1", "2", "3"] as const;

/** Light section: the three "after launch" services in a row, with a secondary CTA. */
export async function Growth() {
  const t = await getTranslations("Webshops");

  return (
    <Section theme="light" id="groei">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index={4}>{t("growth.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-h2 mt-5 text-balance">{t.rich("growth.title", richTags)}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.16} className="lg:col-span-6 lg:col-start-7 lg:self-end">
          <p className="text-lead max-w-xl text-muted text-pretty">{t("growth.intro")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8 lg:mt-20" stagger={0.1}>
        {ITEMS.map((k, i) => (
          <RevealItem key={k} as="article" className="flex flex-col">
            <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted">0{i + 1}</span>
            <h3 className="text-h4 mt-6 max-w-[16ch] text-balance">{t(`growth.items.${k}.title`)}</h3>
            <p className="text-body mt-4 max-w-sm text-muted text-pretty">{t(`growth.items.${k}.body`)}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-5 border-t border-line pt-10 lg:mt-20">
        <Button href="/gesprek-inplannen" variant="secondary" size="lg">
          {t("growth.cta")}
        </Button>
        <p className="eyebrow inline-flex items-center gap-3 text-muted">
          <span className="size-1.5 rounded-full bg-amber" aria-hidden />
          {t("growth.note")}
        </p>
      </Reveal>
    </Section>
  );
}
