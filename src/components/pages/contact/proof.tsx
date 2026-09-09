import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { richTags } from "@/components/ui/rich";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";

/** Four captures that read well small and sit together warmly. */
const SHOWCASE = ["landelijkglas-be", "sanae-align-com", "city-housing-be", "mirkozvending-com"] as const;

/**
 * The reason to have the call, in the light section right after the form:
 * real client sites, real numbers. No claims we cannot back up.
 */
export async function Proof() {
  const t = await getTranslations("Contact.proof");
  const locale = (await getLocale()) as "nl" | "en";
  const picks = SHOWCASE.map((slug) => references.find((r) => r.slug === slug)).filter(
    (r): r is (typeof references)[number] => Boolean(r),
  );

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <Reveal className="self-start lg:sticky lg:top-32 lg:col-span-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h2 mt-5 max-w-sm text-balance">{t.rich("title", richTags)}</h2>
        <p className="text-body mt-6 max-w-sm text-fg-2 text-pretty">{t("lead")}</p>

        <dl className="mt-9 grid max-w-sm grid-cols-2 gap-6 border-t border-line pt-7">
          <div>
            <dt className="eyebrow text-muted">{t("sitesLabel")}</dt>
            <dd className="text-h3 mt-3 tabular-nums">{references.length}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">{t("screensLabel")}</dt>
            <dd className="text-h3 mt-3 tabular-nums">{Math.floor(portfolio.length / 10) * 10}+</dd>
          </div>
        </dl>

        <Link
          href="/referenties"
          className="group/link mt-8 inline-flex h-11 items-center gap-1.5 text-[0.95rem] font-medium tracking-[-0.01em] text-fg"
          data-cursor="link"
        >
          <span className="relative">
            {t("link")}
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100" />
          </span>
          <ArrowUpRight className="size-4 text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      </Reveal>

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6" stagger={0.09}>
        {picks.map((r, i) => (
          <RevealItem key={r.slug} as="figure" className={i > 1 ? "hidden sm:block" : undefined}>
            <MicrolinkShot
              url={r.url}
              slug={r.slug}
              alt={`${r.name} — ${r.industry[locale]}`}
              live={false}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
            />
            <figcaption className="mt-3.5 flex items-baseline justify-between gap-4">
              <span className="text-[0.95rem] tracking-[-0.01em] text-fg">{r.name}</span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">{r.industry[locale]}</span>
            </figcaption>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
