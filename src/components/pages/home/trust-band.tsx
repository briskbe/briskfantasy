import { getTranslations } from "next-intl/server";
import { Counter } from "@/components/ui/counter";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";

/** Hairline band: two static counters at the left, the 17 client names in a marquee at the right. */
export async function TrustBand() {
  const t = await getTranslations("Home.trust");
  const screens = Math.max(50, Math.floor(portfolio.length / 10) * 10);

  return (
    <section className="theme-dark relative overflow-hidden border-y border-line bg-ink text-paper" aria-label={t("marqueeLabel")}>
      <div className="container-x grid items-center gap-y-6 py-6 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <dl className="flex gap-12 lg:col-span-4 lg:h-24 lg:items-center lg:border-r lg:border-line xl:col-span-3">
          <div>
            <dd className="text-h3 tabular-nums leading-none text-paper">
              <Counter value={references.length} duration={1.4} />
            </dd>
            <dt className="mt-2 whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">{t("liveLabel")}</dt>
          </div>
          <div>
            <dd className="text-h3 tabular-nums leading-none text-paper">
              <Counter value={screens} suffix="+" duration={1.8} />
            </dd>
            <dt className="mt-2 whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">{t("screensLabel")}</dt>
          </div>
        </dl>
        <div className="min-w-0 lg:col-span-8 xl:col-span-9">
          <MarqueeBand speed={70} gap="gap-8">
            {references.map((r) => (
              <span key={r.slug} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.2em] text-paper/70">{r.name}</span>
                <span className="size-1.5 rounded-full bg-amber" aria-hidden />
              </span>
            ))}
          </MarqueeBand>
        </div>
      </div>
    </section>
  );
}
