import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

/** Privacy hero: giant "Privacy" bottom-left, the three-line summary on the right. */
export async function PrivacyHero() {
  const t = await getTranslations("Privacy.hero");
  const points = ["1", "2", "3"] as const;

  return (
    <section className="theme-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="privacy-title">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-[10%] top-[10%] h-[60vh] w-[60vh] glow-brand opacity-25 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-x relative flex flex-col justify-end pb-20 pt-36 sm:pt-44 lg:pb-28">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-3 text-accent">
                <span className="size-1.5 rounded-full bg-current" aria-hidden />
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 id="privacy-title" className="text-display mt-6">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">{t("updated")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow text-muted">{t("summaryTitle")}</p>
            <ol className="mt-5 divide-y divide-line border-y border-line">
              {points.map((p) => (
                <li key={p} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4">
                  <span className="font-mono text-[0.72rem] leading-6 tracking-[0.18em] text-muted">0{p}</span>
                  <p className="text-[1.05rem] leading-6 tracking-[-0.01em] text-fg text-pretty">{t(`summary.${p}`)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
