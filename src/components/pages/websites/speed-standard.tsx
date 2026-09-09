import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const ARGS = ["1", "2", "3"] as const;
const CHECKS = ["1", "2", "3", "4", "5", "6"] as const;

/**
 * Dark section: the standard every project is held to.
 *
 * Deliberately has no score dial. Three ring gauges reading 90+/100/100 looked
 * like measured client results, which they were not, and the rings were drawn
 * full regardless of value so they carried no information. What replaces them
 * is the thing we can actually stand behind: the pre-launch checklist.
 *
 * The layout runs horizontally (wide header, three columns, one rule of checks)
 * so it does not repeat the sticky-sidebar-plus-stacked-list of section 01.
 */
export async function SpeedStandard() {
  const t = await getTranslations("Websites");

  return (
    <section className="theme-dark relative bg-ink text-paper grain pt-[clamp(5rem,10vw,11rem)] pb-[clamp(4rem,7vw,7rem)]" aria-labelledby="websites-speed-title">
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index={2} className="text-xs">
                {t("speed.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="websites-speed-title" className="text-h2 mt-5 max-w-[15ch] text-balance">
                {t("speed.title")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lead max-w-md text-muted text-pretty">{t("speed.lead")}</p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-24 lg:gap-12" stagger={0.09}>
          {ARGS.map((k, i) => (
            <RevealItem key={k} className="border-t border-line pt-6">
              <span className="font-mono text-xs tracking-[0.18em] text-muted">0{i + 1}</span>
              <h3 className="text-h3 mt-5 text-balance">{t(`speed.args.${k}.title`)}</h3>
              <p className="text-body mt-4 text-muted text-pretty">{t(`speed.args.${k}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* pre-launch checklist: the honest version of a score dial */}
        <div className="mt-20 border-t border-line pt-8 lg:mt-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-3">
              <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-muted text-balance">
                {t("speed.checksTitle")}
              </p>
            </Reveal>
            <RevealGroup className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-8 lg:col-start-5" stagger={0.05}>
              {CHECKS.map((k) => (
                <RevealItem key={k} className="flex items-start gap-3 border-t border-line/60 pt-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-fg/45" aria-hidden />
                  <span className="text-[0.95rem] leading-relaxed text-fg-2">{t(`speed.checks.${k}`)}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
