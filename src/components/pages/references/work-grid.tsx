"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import type { ReferenceService, ReferenceType } from "@/data/references";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export type WorkCardData = {
  slug: string;
  url: string;
  name: string;
  domain: string;
  type: ReferenceType;
  industry: string;
  blurb: string;
  services: ReferenceService[];
};

type Filter = "all" | ReferenceType;
const FILTERS: Filter[] = ["all", "website", "webshop", "platform"];

/**
 * Filter pills + the full grid of live sites. The active pill background
 * slides between buttons (layoutId), cards re-flow with layout animations.
 */
export function WorkGrid({ items }: { items: WorkCardData[] }) {
  const t = useTranslations("References");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.type === filter)), [items, filter]);
  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: items.length, website: 0, webshop: 0, platform: 0 };
    for (const i of items) c[i.type] += 1;
    return c;
  }, [items]);

  return (
    <section id="live" className="theme-dark relative bg-bg text-fg section-y" aria-labelledby="work-grid-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={1}>{t("grid.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="work-grid-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
                {t.rich("grid.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("grid.intro")}</p>
          </Reveal>
        </div>

        {/* filter rail */}
        <Reveal delay={0.2} className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <LayoutGroup id="work-filter">
            <div role="group" aria-label={t("grid.filterLabel")} className="-mx-1 flex flex-wrap gap-1">
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    data-cursor="link"
                    className={cn(
                      "relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-ink" : "text-muted hover:text-fg",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter-pill"
                        className="absolute inset-0 rounded-full bg-amber"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{t(`grid.filters.${f}`)}</span>
                    <span className={cn("relative z-10 font-mono text-[0.68rem]", active ? "text-ink/70" : "text-muted/70")}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={visible.length}
                className="inline-block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {t("grid.count", { count: visible.length })}
              </motion.span>
            </AnimatePresence>
          </p>
        </Reveal>

        <motion.ul layout className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, i) => (
              <WorkCard key={item.slug} item={item} index={i} />
            ))}
          </AnimatePresence>
          <NextProjectCard />
        </motion.ul>
      </div>
    </section>
  );
}

function WorkCard({ item, index }: { item: WorkCardData; index: number }) {
  const t = useTranslations("References");
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE, delay: (index % 3) * 0.07 } }}
      exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE } }}
      className="h-full"
    >
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={t("grid.visit")}
        className="group flex h-full flex-col rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1"
      >
        <div className="relative overflow-hidden rounded-[0.95rem]">
          <MicrolinkShot
            url={item.url}
            slug={item.slug}
            alt={t("grid.alt", { name: item.name })}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="transition-[box-shadow] duration-700 ease-[var(--ease-out-expo)] group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
            imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col px-1 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-h4">{item.name}</h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                <span>{t(`grid.types.${item.type}`)}</span>
                <span aria-hidden className="text-muted/50">
                  /
                </span>
                <span>{item.industry}</span>
              </p>
            </div>
            <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>

          <p className="text-body mt-3 text-muted text-pretty">{item.blurb}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t("grid.servicesLabel")}>
            {item.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-2 transition-colors duration-500 group-hover:border-line-2"
              >
                {t(`services.${s}`)}
              </li>
            ))}
          </ul>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.9rem] text-fg">
            <span className="relative">
              {t("grid.visit")}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <span className="font-mono text-[0.68rem] tracking-wide text-muted">{item.domain}</span>
          </span>
        </div>
      </a>
    </motion.li>
  );
}

/** Closing card that fills the last grid slot: the next project could be yours. */
function NextProjectCard() {
  const t = useTranslations("References");
  return (
    <motion.li layout className="h-full">
      <Link
        href="/gesprek-inplannen"
        data-cursor-label="→"
        className="group flex h-full min-h-[22rem] flex-col justify-between rounded-2xl border border-dashed border-line-2 p-6 transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-amber hover:bg-fg/[0.03] sm:p-8"
      >
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-amber">{t("grid.next.eyebrow")}</span>
        <span className="mt-10">
          <span className="text-h3 block max-w-[12ch] text-balance">{t.rich("grid.next.title", richTags)}</span>
          <span className="text-body mt-4 block max-w-sm text-muted text-pretty">{t("grid.next.body")}</span>
        </span>
        <span className="mt-10 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-fg">
          {t("grid.next.cta")}
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.li>
  );
}
