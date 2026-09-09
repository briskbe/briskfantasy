import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { references, type Reference } from "@/data/references";
import { cn } from "@/lib/utils";
import { InMotion } from "./in-motion";

/** One hero card (browser chrome), two stacked secondaries, then a 6/6 pair. */
const PICKS = ["landelijkglas-be", "legacycristal-com", "city-housing-be", "fileservicechiptuning-com", "priveglas-be"] as const;
/** References the grid does not show, so the reel never repeats an image from it. */
const REEL_PICKS = ["sanae-align-com", "mirkozvending-com", "vestra-armor-com", "tcko-be", "hp-chiptuningfiles-com"] as const;

function WorkCard({
  r,
  className,
  locale,
  visit,
  cursor,
  alt,
  feature = false,
}: {
  r: Reference;
  className?: string;
  locale: "nl" | "en";
  visit: string;
  cursor: string;
  alt: string;
  feature?: boolean;
}) {
  return (
    <RevealItem as="article" className={cn("group", className)}>
      <a
        href={r.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={cursor}
        className="block transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 focus-visible:-translate-y-1"
      >
        <div
          className={cn(
            "[&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-[var(--ease-out-expo)] group-hover:[&_img]:scale-[1.04]",
            !feature && "overflow-hidden rounded-xl border border-line",
          )}
        >
          <MicrolinkShot
            url={r.url}
            slug={r.slug}
            alt={alt}
            live={false}
            frame={feature}
            sizes={feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          />
        </div>
        {feature ? (
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-h3 text-fg">{r.name}</h3>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{r.industry[locale]}</p>
            </div>
            <span className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap text-[0.9rem] text-fg-2 transition-colors group-hover:text-accent">
              {visit}
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-h4 flex min-w-0 items-center gap-1.5 text-fg">
              {r.name}
              <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              <span className="sr-only">— {visit}</span>
            </h3>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted">{r.industry[locale]}</p>
          </div>
        )}
      </a>
    </RevealItem>
  );
}

export async function SelectedWork() {
  const t = await getTranslations("Home.work");
  const tm = await getTranslations("Home.motion");
  const locale = (await getLocale()) as "nl" | "en";
  const byslug = (s: string) => references.find((r) => r.slug === s)!;
  const [hero, second, third, fourth, fifth] = PICKS.map(byslug);
  const shots = REEL_PICKS.map(byslug).map((r) => ({ src: `/references/${r.slug}.webp`, domain: r.domain, name: r.name }));

  const shared = (r: Reference) => ({
    r,
    locale,
    visit: t("visit"),
    cursor: t("cursor"),
    alt: t("shotAlt", { name: r.name }),
  });

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{t.rich("title", richTags)}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-12" stagger={0.1} amount={0.1}>
        <WorkCard {...shared(hero)} feature className="lg:col-span-8 lg:row-span-2" />
        <WorkCard {...shared(second)} className="lg:col-span-4" />
        <WorkCard {...shared(third)} className="lg:col-span-4" />
        <WorkCard {...shared(fourth)} className="lg:col-span-6" />
        <WorkCard {...shared(fifth)} className="lg:col-span-6" />
      </RevealGroup>

      {/* Closing beat: five more live sites, scrolling, plus the way through to all 17. */}
      <div className="mt-16 border-t border-line pt-12 lg:mt-24 lg:pt-16">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow tone="muted">{tm("eyebrow")}</Eyebrow>
            <h3 className="text-h3 mt-4 text-balance">{tm("title")}</h3>
            <p className="text-body mt-5 max-w-sm text-muted text-pretty">{tm("body")}</p>
            <Button href="/referenties" variant="secondary" size="lg" className="mt-8">
              {t("all")}
            </Button>
          </div>
          <div className="hidden lg:col-span-8 lg:block">
            <InMotion shots={shots} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
