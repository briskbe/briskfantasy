import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { SectionIntro } from "./section-intro";

const ITEMS = ["1", "2", "3"] as const;

/** Dark section: the three "after launch" services in a row, with a secondary CTA. */
export async function Growth() {
  const t = await getTranslations("Webshops");

  return (
    <Section theme="dark" id="groei">
      <SectionIntro index={4} eyebrow={t("growth.eyebrow")} title={t.rich("growth.title", richTags)} lead={t("growth.intro")} />

      <RevealGroup className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8 lg:mt-20" stagger={0.1}>
        {ITEMS.map((k, i) => (
          <RevealItem key={k} as="article" className="flex flex-col">
            <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted">0{i + 1}</span>
            <h3 className="text-h4 mt-6 max-w-[16ch] text-balance">{t(`growth.items.${k}.title`)}</h3>
            <p className="text-body mt-4 max-w-sm text-muted text-pretty">{t(`growth.items.${k}.body`)}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-5 border-t border-line pt-10 lg:mt-16">
        <Button href="/gesprek-inplannen" variant="secondary" size="lg">
          {t("growth.cta")}
        </Button>
        <p className="eyebrow inline-flex items-center gap-3 text-muted">
          <span className="size-1.5 rounded-full bg-fg/25" aria-hidden />
          {t("growth.note")}
        </p>
      </Reveal>
    </Section>
  );
}
