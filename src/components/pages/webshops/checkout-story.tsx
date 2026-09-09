"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { Check, Search } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { FilterMark } from "./filter-mark";

const STEPS = ["1", "2", "3"] as const;
type Step = (typeof STEPS)[number];
const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- illustrative shop screens ----------
   Every element on these three screens is real type or real line art: no grey
   placeholder bars, so they read as designed screens rather than a loading state.
   They are decorative, so each card is exposed to assistive tech as one labelled
   figure (see StoryCard) and the internals are aria-hidden. */

function Chrome({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
        </span>
        <span className="mx-auto font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{name}</span>
      </div>
      <div className="flex-1 p-5 sm:p-7">{children}</div>
    </div>
  );
}

const PRODUCTS = ["1", "2", "3", "4", "5", "6"] as const;

function CatalogScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.1");
  return (
    <Chrome name={t("name")}>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">{t("searchLabel")}</p>
      <div className="mt-2 flex h-11 items-center gap-3 rounded-full border border-line-2 bg-bg-3 px-4">
        <Search className="size-3.5 shrink-0 text-muted" />
        <span className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-fg">{t("plate")}</span>
        <span className={cn("h-4 w-px bg-fg/70", active && "animate-pulse-soft")} />
        <span className="ml-auto shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          <span className="text-fg tabular-nums">128</span> {t("results")}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["filter1", "filter2", "filter3"] as const).map((k, i) => (
          <span
            key={k}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em]",
              i === 0 ? "border-fg/50 text-fg" : "border-line text-muted",
            )}
          >
            {t(k)}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRODUCTS.map((p, i) => {
          const highlight = i === 1;
          return (
            <motion.div
              key={p}
              className={cn(
                "flex flex-col rounded-xl border p-2.5",
                highlight ? "border-fg/45 bg-fg/[0.04]" : "border-line",
              )}
              initial={false}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0.55, y: 6 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            >
              <span className="relative flex aspect-[4/3] items-center justify-center rounded-md bg-fg/[0.05] p-2 text-fg/45">
                <FilterMark detail={i < 4} />
                {highlight && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-bg px-2 py-0.5 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-fg">
                    {t("fit")}
                  </span>
                )}
              </span>
              <span className="mt-2.5 text-[0.8rem] leading-tight tracking-[-0.01em] text-fg">{t(`products.${p}.name`)}</span>
              <span className="mt-1 font-mono text-[0.68rem] text-muted tabular-nums">{t(`products.${p}.price`)}</span>
            </motion.div>
          );
        })}
      </div>
    </Chrome>
  );
}

function ProductScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.2");
  return (
    <Chrome name={t("name")}>
      <div className="grid gap-6 sm:grid-cols-[1.05fr_1fr] sm:gap-7">
        <div>
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-xl border border-line bg-fg/[0.04] p-7 text-fg/55">
            <FilterMark />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {t("badge")}
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-md border p-2",
                  i === 0 ? "border-fg/45 text-fg/60" : "border-line text-fg/30",
                )}
              >
                <FilterMark detail={false} />
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">{t("kicker")}</p>
          <p className="mt-2.5 text-[1.35rem] font-medium leading-tight tracking-[-0.02em]">{t("title")}</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-[1.35rem] font-medium leading-none tracking-[-0.02em] tabular-nums">{t("price")}</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">{t("priceNote")}</span>
          </p>
          <ul className="mt-5 space-y-2.5">
            {(["spec1", "spec2", "spec3"] as const).map((k, i) => (
              <motion.li
                key={k}
                className="flex items-center gap-2.5 text-[0.85rem] text-fg-2"
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0.45, x: -6 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fg/10 text-fg">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                {t(k)}
              </motion.li>
            ))}
          </ul>
          <span className="mt-6 flex h-11 items-center justify-center rounded-full bg-fg text-[0.9rem] font-medium text-bg sm:mt-auto">
            {t("cta")}
          </span>
        </div>
      </div>
    </Chrome>
  );
}

const FIELDS = ["1", "2", "3", "4", "5"] as const;
const FIELD_SPAN = ["", "", "col-span-2", "", ""];

function CheckoutScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.3");
  const steps = ["step1", "step2", "step3"] as const;
  return (
    <Chrome name={t("name")}>
      <ol className="flex items-center gap-2 sm:gap-3">
        {steps.map((k, i) => {
          const done = i < 2;
          return (
            <li key={k} className="flex flex-1 items-center gap-2 sm:gap-3">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem]",
                  done ? "bg-fg/15 text-fg" : "bg-fg text-bg",
                )}
              >
                {done ? <Check className="size-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className={cn("truncate font-mono text-[0.6rem] uppercase tracking-[0.14em]", done ? "text-muted" : "text-fg")}>
                {t(k)}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-line" />}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_0.85fr] sm:items-start sm:gap-7">
        <div>
          <div className="grid grid-cols-2 gap-2.5">
            {FIELDS.map((f, i) => (
              <span
                key={f}
                className={cn(
                  "flex h-14 flex-col justify-center gap-1.5 rounded-xl border px-3.5",
                  i === 0 ? "border-fg/45" : "border-line",
                  FIELD_SPAN[i],
                )}
              >
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted">{t(`fields.${f}`)}</span>
                <span className={cn("h-3.5 w-px", i === 0 ? "bg-fg/70" : "bg-transparent", i === 0 && active && "animate-pulse-soft")} />
              </span>
            ))}
          </div>

          <ul className="mt-2.5 space-y-2.5">
            {(["method1", "method2", "method3"] as const).map((k, i) => (
              <motion.li
                key={k}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xl border px-4 text-[0.9rem]",
                  i === 0 ? "border-fg/45 text-fg" : "border-line text-muted",
                )}
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 6 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
              >
                <span className={cn("flex size-4 items-center justify-center rounded-full border", i === 0 ? "border-fg" : "border-line-2")}>
                  {i === 0 && <span className="size-2 rounded-full bg-fg" />}
                </span>
                <span className="truncate">{t(k)}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-xl border border-line p-4">
          <ul className="space-y-2.5">
            {(["1", "2"] as const).map((s) => (
              <li key={s} className="flex items-baseline justify-between gap-3 text-[0.82rem]">
                <span className="truncate text-fg-2">{t(`summary.${s}.label`)}</span>
                <span className="shrink-0 font-mono text-[0.75rem] text-muted tabular-nums">{t(`summary.${s}.value`)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{t("total")}</span>
            <span className="text-[1.05rem] font-medium leading-none tracking-[-0.02em] tabular-nums">{t("totalValue")}</span>
          </div>
          <span className="mt-4 flex h-11 items-center justify-center rounded-full bg-fg text-[0.9rem] font-medium text-bg">{t("cta")}</span>
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- the story ---------- */

function StoryCard({
  step,
  index,
  label,
  screen,
  body,
  onView,
  children,
}: {
  step: Step;
  index: number;
  label: string;
  screen: string;
  body: string;
  onView: (s: Step, inView: boolean) => void;
  children: (active: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  useEffect(() => {
    onView(step, inView);
  }, [inView, onView, step]);

  return (
    <div ref={ref} id={`webshops-story-${step}`} className="scroll-mt-28 lg:py-[7vh] lg:first:pt-0 lg:last:pb-0">
      {/* below lg the pinned list is gone, so each screen carries its own caption */}
      <div className="mb-6 lg:hidden">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">0{index + 1}</span>
          <h3 className="text-h4">{label}</h3>
        </div>
        <p className="text-body mt-2 pl-[2.55rem] text-muted text-pretty">{body}</p>
      </div>
      <Reveal amount={0.2}>
        <div role="img" aria-label={`${label} — ${screen}`}>
          <div
            className="theme-dark overflow-hidden rounded-3xl border border-line bg-ink-2 text-paper shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]"
            aria-hidden
          >
            {children(inView)}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Dark sticky storytelling. On desktop the left column stays pinned with the
 * headline and three clickable step labels that light up (and scroll to) the
 * matching screen. Below lg the list collapses and every screen carries its own
 * caption, so no copy is ever hidden behind a scroll driver.
 */
export function CheckoutStory() {
  const t = useTranslations("Webshops");
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const [seen, setSeen] = useState<Record<Step, boolean>>({ "1": false, "2": false, "3": false });
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  const onView = useCallback((s: Step, inView: boolean) => {
    setSeen((prev) => (prev[s] === inView ? prev : { ...prev, [s]: inView }));
  }, []);

  /** first screen currently in the centre band, falling back to step 1 */
  const active: Step = STEPS.find((s) => seen[s]) ?? "1";

  const jumpTo = (s: Step) => {
    const el = document.getElementById(`webshops-story-${s}`);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -140, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="theme-dark relative bg-ink text-paper section-y" aria-labelledby="webshops-story-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="glow-amber absolute left-[-18%] top-[-8%] h-[55vh] w-[45vw] opacity-30" />
      </div>
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={2}>{t("story.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="webshops-story-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t.rich("story.title", richTags)}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("story.intro")}</p>
            </Reveal>

            <Reveal delay={0.24} className="mt-12 hidden lg:block">
              <div className="relative">
                <span className="absolute left-0 top-0 h-full w-px bg-line" aria-hidden />
                <motion.span
                  className="absolute left-0 top-0 h-full w-px origin-top bg-amber"
                  style={{ scaleY: reduced ? 1 : scaleY }}
                  aria-hidden
                />
                <ol className="space-y-1 pl-8">
                  {STEPS.map((s, i) => {
                    const on = active === s;
                    return (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => jumpTo(s)}
                          data-cursor="link"
                          className="group block w-full py-3 text-left"
                        >
                          <span className="flex items-baseline gap-4">
                            <span className={cn("font-mono text-[0.7rem] tracking-[0.18em] transition-colors duration-500", on ? "text-fg" : "text-muted")}>
                              0{i + 1}
                            </span>
                            <span className={`text-h4 ${cn("transition-colors duration-500", on ? "text-fg" : "text-fg/45 group-hover:text-fg/80")}`}>
                              {t(`story.steps.${s}.label`)}
                            </span>
                          </span>
                          <motion.span
                            className="text-body block max-w-sm overflow-hidden pl-[2.55rem] text-muted text-pretty"
                            initial={false}
                            animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0, marginTop: on ? 8 : 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                          >
                            {t(`story.steps.${s}.body`)}
                          </motion.span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>

        <div ref={trackRef} className="space-y-14 lg:col-span-7 lg:space-y-0">
          {STEPS.map((s, i) => (
            <StoryCard
              key={s}
              step={s}
              index={i}
              label={t(`story.steps.${s}.label`)}
              screen={t(`story.screens.${s}.name`)}
              body={t(`story.steps.${s}.body`)}
              onView={onView}
            >
              {(on) => (s === "1" ? <CatalogScreen active={on} /> : s === "2" ? <ProductScreen active={on} /> : <CheckoutScreen active={on} />)}
            </StoryCard>
          ))}
        </div>
      </div>
    </section>
  );
}
