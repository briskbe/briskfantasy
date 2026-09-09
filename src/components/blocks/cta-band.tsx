import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { siteConfig } from "@/data/site";
import { RaysBackdrop } from "./rays-backdrop";

/**
 * The closing "Gesprek inplannen" band used at the bottom of every page.
 * Full-bleed, dark, with Spell UI light rays behind the headline.
 */
export async function CtaBand() {
  const t = await getTranslations("Common");
  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper">
      <RaysBackdrop />
      <div className="container-x relative flex min-h-[70vh] flex-col justify-center py-28 text-center">
        <Reveal>
          <p className="eyebrow text-amber">{t("ctaBand.eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          {/* One step below `.text-display`: the hero owns the top of the type
              scale on every page, so this closing statement reads as a
              crescendo rather than a second hero. */}
          <h2 className="text-h1 mx-auto mt-6 max-w-5xl text-balance">{t.rich("ctaBand.title", richTags)}</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-lead mx-auto mt-8 max-w-2xl text-muted text-pretty">{t("ctaBand.body")}</p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col items-center gap-5">
          <Button href="/gesprek-inplannen" size="lg">
            {t("ctaBand.button")}
          </Button>
          <p className="text-[0.9rem] text-muted">
            {t("cta.email")}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center px-1 text-fg underline-offset-6 hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
          <p className="eyebrow text-muted/70">{t("ctaBand.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
