import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const STEPS = ["1", "2", "3"] as const;

/** Three-column strip: call, proposal, kick-off. Dark, with the primary CTA. */
export async function HowItStarts() {
  const t = await getTranslations("References");
  return (
    <section className="theme-dark relative overflow-hidden bg-bg text-fg section-y" aria-labelledby="how-it-starts-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-sky absolute -left-[20%] bottom-[-40%] h-[60vh] w-[60vw] opacity-25" />
      </div>
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={3}>{t("start.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="how-it-starts-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t.rich("start.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9 lg:items-end">
            <Button href="/gesprek-inplannen" size="lg">
              {t("start.cta")}
            </Button>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{t("start.note")}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-8 lg:mt-20" stagger={0.1}>
          {STEPS.map((s, i) => (
            <RevealItem key={s} as="div" className="relative md:border-l md:border-line md:pl-6 md:first:border-l-0 md:first:pl-0">
              <span className="font-mono text-[0.72rem] tracking-[0.18em] text-amber">0{i + 1}</span>
              <h3 className="text-h3 mt-5">{t(`start.steps.${s}.title`)}</h3>
              <p className="text-body mt-4 max-w-sm text-muted text-pretty">{t(`start.steps.${s}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
