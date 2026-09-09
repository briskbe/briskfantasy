import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const STEPS = ["1", "2", "3"] as const;

/**
 * Closing editorial block: a 5/7 split with the statement and the primary CTA
 * held sticky on the left and the three steps stacked as a hairline-separated
 * list on the right. Light (paper-2) so the page does not run into the dark
 * CtaBand + footer as one long slab.
 */
export async function HowItStarts() {
  const t = await getTranslations("References");
  return (
    <section
      className="theme-light relative bg-bg-2 text-fg section-y"
      aria-labelledby="how-it-starts-title"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index={3} tone="muted">
                  {t("start.eyebrow")}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="how-it-starts-title"
                  className="text-h2 mt-5 max-w-[13ch] text-balance"
                >
                  {t.rich("start.title", richTags)}
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="text-lead mt-7 max-w-md text-fg-2 text-pretty">
                  {t("start.lead")}
                </p>
              </Reveal>
              <Reveal
                delay={0.2}
                className="mt-10 flex flex-col items-start gap-4"
              >
                <Button href="/gesprek-inplannen" size="lg">
                  {t("start.cta")}
                </Button>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  {t("start.note")}
                </p>
              </Reveal>
            </div>
          </div>

          <RevealGroup className="lg:col-span-6 lg:col-start-7" stagger={0.1}>
            <ol>
              {STEPS.map((s, i) => (
                <RevealItem
                  key={s}
                  as="li"
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] sm:gap-x-6 sm:py-10"
                >
                  <span
                    className="font-mono text-[0.72rem] tracking-[0.18em] text-muted"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-h3">{t(`start.steps.${s}.title`)}</h3>
                    <p className="text-body mt-4 max-w-md text-muted text-pretty">
                      {t(`start.steps.${s}.body`)}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
