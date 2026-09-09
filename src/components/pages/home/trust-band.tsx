import { getTranslations } from "next-intl/server";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { references } from "@/data/references";
import { StatNumber } from "./stat";

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="flex flex-col-reverse items-start">
      <dt className="mt-2 whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="text-h3 leading-none text-paper">
        <StatNumber value={value} suffix={suffix} />
      </dd>
    </div>
  );
}

/** Hairline band: two static counters at the left, the 17 client names in a marquee at the right. */
export async function TrustBand({ screens }: { screens: number }) {
  const t = await getTranslations("Home.trust");

  return (
    <section className="theme-dark relative overflow-hidden border-y border-line bg-ink text-paper" aria-label={t("marqueeLabel")}>
      <div className="container-x grid items-center gap-y-5 py-6 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <dl className="flex gap-12 lg:col-span-4 lg:h-24 lg:items-center lg:border-r lg:border-line xl:col-span-3">
          <Stat value={references.length} label={t("liveLabel")} />
          <Stat value={screens} suffix="+" label={t("screensLabel")} />
        </dl>
        <div className="-mx-[clamp(1.25rem,4vw,4rem)] min-w-0 border-t border-line pt-5 lg:mx-0 lg:col-span-8 lg:border-0 lg:pt-0 xl:col-span-9">
          <MarqueeBand speed={70} gap="gap-8">
            {references.map((r) => (
              <span key={r.slug} className="flex items-center gap-8">
                <span className="size-1 rounded-full bg-paper/25" aria-hidden />
                <span className="whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.2em] text-paper/70">{r.name}</span>
              </span>
            ))}
          </MarqueeBand>
        </div>
      </div>
    </section>
  );
}
