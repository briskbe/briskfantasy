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
import { flattenRows, planRows, spanClass } from "./layout";

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
  /** The bundled static capture fired early or caught a promo layer. */
  weakCapture?: boolean;
};

type Filter = "all" | ReferenceType;
const FILTERS: Filter[] = ["all", "website", "webshop", "platform"];

/**
 * Filter pills + the live-website grid. The first project opens the section as
 * a full-width lead card (8/4 split); everything after it runs on a 12-column
 * rhythm that alternates three-up and two-up rows, with the "next project"
 * invitation closing the last row so no column is ever left empty.
 */
export function WorkGrid({ items }: { items: WorkCardData[] }) {
  const t = useTranslations("References");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
    [items, filter],
  );
  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: items.length,
      website: 0,
      webshop: 0,
      platform: 0,
    };
    for (const i of items) c[i.type] += 1;
    return c;
  }, [items]);

  // The lead card and the wide (2-up) tiles show a screenshot large, so they
  // only ever get a capture we trust; weak captures fall back to the 3-up size.
  const { lead, rest, restSizes } = useMemo(() => {
    const list = [...visible];
    const strong = list.findIndex((i) => !i.weakCapture);
    const [head] = list.splice(strong >= 0 ? strong : 0, 1);
    // +1 for the closing "next project" tile, so the final row always fills out.
    const sizes = flattenRows(planRows(list.length + 1));
    for (let i = 0; i < list.length; i += 1) {
      if (sizes[i] !== 2 || !list[i].weakCapture) continue;
      const swap = list.findIndex(
        (it, j) => j > i && sizes[j] !== 2 && !it.weakCapture,
      );
      if (swap > -1) [list[i], list[swap]] = [list[swap], list[i]];
    }
    return { lead: head, rest: list, restSizes: sizes };
  }, [visible]);

  return (
    <section
      id="live"
      className="theme-dark relative bg-bg text-fg section-y"
      aria-labelledby="work-grid-title"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={1} tone="muted">
                {t("grid.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="work-grid-title"
                className="text-h2 mt-5 max-w-[16ch] text-balance"
              >
                {t.rich("grid.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">
              {t("grid.intro")}
            </p>
          </Reveal>
        </div>

        {/* filter rail — a snapping scroll row on small screens, a static group above sm */}
        <Reveal
          delay={0.2}
          className="mt-12 border-t border-line pt-6 sm:flex sm:items-center sm:justify-between sm:gap-6 lg:mt-16"
        >
          <LayoutGroup id="work-filter">
            <div
              role="group"
              aria-label={t("grid.filterLabel")}
              className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto px-1 [mask-image:linear-gradient(90deg,#000_0,#000_88%,transparent)] sm:flex-wrap sm:overflow-visible sm:[mask-image:none]"
            >
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
                      "relative inline-flex h-11 shrink-0 snap-start items-center gap-2 rounded-full px-4 text-[0.92rem] tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-ink" : "text-muted hover:text-fg",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter-pill"
                        className="absolute inset-0 rounded-full bg-brand"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {t(`grid.filters.${f}`)}
                    </span>
                    <span
                      className={cn(
                        "relative z-10 font-mono text-[0.68rem]",
                        active ? "text-ink/70" : "text-muted/70",
                      )}
                    >
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <p
            className="sr-only font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted sm:not-sr-only sm:shrink-0"
            aria-live="polite"
          >
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

        <motion.ul
          layout
          className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {lead && <WorkCard key={lead.slug} item={lead} index={0} lead />}
            {rest.map((item, i) => (
              <WorkCard
                key={item.slug}
                item={item}
                index={i}
                size={restSizes[i] ?? 3}
              />
            ))}
          </AnimatePresence>
          <NextProjectCard size={restSizes[rest.length] ?? 3} />
        </motion.ul>
      </div>
    </section>
  );
}

function WorkCard({
  item,
  index,
  size = 3,
  lead = false,
}: {
  item: WorkCardData;
  index: number;
  size?: number;
  lead?: boolean;
}) {
  const t = useTranslations("References");
  const wide = size === 2;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: EASE, delay: (index % 3) * 0.07 },
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        filter: "blur(6px)",
        transition: { duration: 0.3, ease: EASE },
      }}
      className={cn(
        "h-full",
        lead ? "sm:col-span-2 lg:col-span-12" : spanClass(size),
      )}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor-label={t("grid.visit")}
        className={cn(
          "group flex h-full rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1",
          lead
            ? "flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10"
            : "flex-col",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-[0.95rem]",
            lead && "lg:col-span-8",
          )}
        >
          <MicrolinkShot
            url={item.url}
            slug={item.slug}
            alt={t("grid.alt", { name: item.name })}
            priority={lead}
            sizes={
              lead
                ? "(min-width: 1024px) 62vw, 92vw"
                : wide
                  ? "(min-width: 1024px) 46vw, (min-width: 640px) 92vw, 92vw"
                  : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            }
            className="transition-[box-shadow] duration-700 ease-[var(--ease-out-expo)] group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
            imgClassName={cn(
              "transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
              lead && "lg:aspect-[16/9]",
            )}
          />
          {/* Soft bottom edge so sticky bars and chat bubbles on the live sites
              never sit hard against the card's corner. */}
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-bg to-transparent"
            aria-hidden
          />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col px-1 pt-5",
            lead && "lg:col-span-4 lg:pt-0",
          )}
        >
          {lead && (
            <p className="mb-8 hidden border-b border-line pb-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted lg:block">
              {t("grid.featured")}
            </p>
          )}
          <div
            className={cn(
              "flex flex-1 flex-col",
              lead && "lg:mt-auto lg:flex-none",
            )}
          >
            <h3 className={cn(lead ? "text-h3" : "text-h4")}>{item.name}</h3>
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              <span className="whitespace-nowrap">
                {t(`grid.types.${item.type}`)}
              </span>
              <span aria-hidden className="px-2 text-muted/50">
                ·
              </span>
              <span>{item.industry}</span>
            </p>

            <p
              className={cn(
                "text-body mt-4 text-muted text-pretty",
                lead ? "max-w-md" : "line-clamp-3",
              )}
            >
              {item.blurb}
            </p>

            <ul
              className="mt-5 flex flex-wrap gap-1.5"
              aria-label={t("grid.servicesLabel")}
            >
              {item.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-2 transition-colors duration-500 group-hover:border-line-2"
                >
                  {t(`services.${s}`)}
                </li>
              ))}
            </ul>

            <span className="mt-auto inline-flex items-center gap-2 self-start pt-6 text-[0.9rem] text-fg">
              <span className="relative">
                {t("grid.visit")}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="font-mono text-[0.68rem] tracking-wide text-muted">
                {item.domain}
              </span>
            </span>
          </div>
        </div>
      </a>
    </motion.li>
  );
}

/** Closing tile that completes the last row: the next project could be yours. */
function NextProjectCard({ size }: { size: number }) {
  const t = useTranslations("References");
  return (
    <motion.li layout className={cn("h-full", spanClass(size))}>
      <Link
        href="/gesprek-inplannen"
        data-cursor-label="→"
        className="group flex h-full min-h-[20rem] flex-col justify-between rounded-2xl border border-dashed border-line-2 p-6 transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-accent hover:bg-fg/[0.03] sm:p-8"
      >
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          {t("grid.next.eyebrow")}
        </span>
        <span className="mt-10">
          <span className="text-h3 block max-w-[12ch] text-balance">
            {t.rich("grid.next.title", richTags)}
          </span>
          <span className="text-body mt-4 block max-w-sm text-muted text-pretty">
            {t("grid.next.body")}
          </span>
        </span>
        <span className="mt-10 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-fg">
          {t("grid.next.cta")}
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.li>
  );
}
