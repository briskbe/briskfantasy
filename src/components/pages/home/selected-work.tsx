import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { references, type Reference } from "@/data/references";
import { cn } from "@/lib/utils";

const PICKS = ["landelijkglas-be", "legacycristal-com", "city-housing-be", "fileservicechiptuning-com", "priveglas-be"] as const;
/** 8 + 4, then 4 + 4 + 4 */
const SPANS = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

function WorkCard({ r, span, locale, visit, cursor, alt, priority }: { r: Reference; span: string; locale: "nl" | "en"; visit: string; cursor: string; alt: string; priority: boolean }) {
  return (
    <RevealItem as="article" className={cn("group", span)}>
      <a
        href={r.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={cursor}
        className="block transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 focus-visible:-translate-y-1"
      >
        <div className="[&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-[var(--ease-out-expo)] group-hover:[&_img]:scale-[1.04]">
          <MicrolinkShot url={r.url} slug={r.slug} alt={alt} priority={priority} sizes="(min-width: 1024px) 60vw, 100vw" />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-h4 text-fg">{r.name}</h3>
            <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{r.industry[locale]}</p>
          </div>
          <span className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[0.9rem] text-fg-2 transition-colors group-hover:text-amber">
            {visit}
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </RevealItem>
  );
}

export async function SelectedWork() {
  const t = await getTranslations("Home.work");
  const locale = (await getLocale()) as "nl" | "en";
  const picks = PICKS.map((slug) => references.find((r) => r.slug === slug)!);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h1 mt-5 text-balance">{t.rich("title", richTags)}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 lg:mt-20 lg:grid-cols-12" stagger={0.1} amount={0.1}>
        {picks.map((r, i) => (
          <WorkCard
            key={r.slug}
            r={r}
            span={SPANS[i]}
            locale={locale}
            visit={t("visit")}
            cursor={t("cursor")}
            alt={t("shotAlt", { name: r.name })}
            priority={false}
          />
        ))}
      </RevealGroup>

      <Reveal className="mt-14 flex justify-end lg:mt-20">
        <Button href="/referenties" variant="ghost" className="text-lg">
          {t("all")}
        </Button>
      </Reveal>
    </div>
  );
}
