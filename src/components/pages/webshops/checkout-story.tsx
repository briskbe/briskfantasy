"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { Check, Search } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const STEPS = ["1", "2", "3"] as const;
type Step = (typeof STEPS)[number];

/* ---------- typographic shop screens (no images) ---------- */

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-2 rounded-sm bg-fg/12", className)} aria-hidden />;
}

function Chrome({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
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

function CatalogScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.1");
  return (
    <Chrome name={t("name")}>
      <div className="flex h-11 items-center gap-3 rounded-full border border-line-2 bg-bg-3 px-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
        <Search className="size-3.5 shrink-0" aria-hidden />
        <span>{t("search")}</span>
        <span className={cn("ml-0.5 h-3.5 w-px bg-amber", active && "animate-pulse-soft")} aria-hidden />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["filter1", "filter2", "filter3"] as const).map((k, i) => (
          <span
            key={k}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em]",
              i === 0 ? "border-amber/60 text-amber" : "border-line text-muted",
            )}
          >
            {t(k)}
          </span>
        ))}
        <span className="ml-auto self-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          <span className="text-fg">128</span> {t("results")}
        </span>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn("rounded-xl border p-2.5", i === 1 ? "border-amber/70" : "border-line")}
            initial={false}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 6 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[4/3] rounded-md bg-fg/6" aria-hidden />
            <Bar className="mt-3 w-4/5" />
            <Bar className="mt-1.5 w-1/2 bg-fg/8" />
            <span className={cn("mt-3 block h-2 w-1/3 rounded-sm", i === 1 ? "bg-amber" : "bg-fg/20")} aria-hidden />
          </motion.div>
        ))}
      </div>
    </Chrome>
  );
}

function ProductScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.2");
  return (
    <Chrome name={t("name")}>
      <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr] sm:gap-7">
        <div aria-hidden>
          <div className="relative aspect-[4/3] rounded-xl bg-fg/6">
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {t("badge")}
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-4 gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("aspect-square rounded-md bg-fg/6", i === 0 && "ring-1 ring-amber/70")} />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <Bar className="w-1/3 bg-fg/8" />
          <p className="mt-3 text-[1.35rem] font-medium leading-tight tracking-[-0.02em]">{t("title")}</p>
          <div className="mt-2 flex items-center gap-1.5" aria-hidden>
            <span className="text-[1.1rem] font-medium leading-none">€</span>
            <span className="h-4 w-14 rounded-sm bg-fg/15" />
          </div>
          <ul className="mt-5 space-y-2.5">
            {(["spec1", "spec2", "spec3"] as const).map((k, i) => (
              <motion.li
                key={k}
                className="flex items-center gap-2.5 text-[0.85rem] text-fg-2"
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -6 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="flex size-4.5 items-center justify-center rounded-full bg-amber/15 text-amber">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden />
                </span>
                {t(k)}
              </motion.li>
            ))}
          </ul>
          <span className="mt-auto flex h-11 items-center justify-center rounded-full bg-amber pt-0 text-[0.9rem] font-medium text-ink sm:mt-6">
            {t("cta")}
          </span>
        </div>
      </div>
    </Chrome>
  );
}

function CheckoutScreen({ active }: { active: boolean }) {
  const t = useTranslations("Webshops.story.screens.3");
  const steps = ["step1", "step2", "step3"] as const;
  return (
    <Chrome name={t("name")}>
      <ol className="flex items-center gap-2 sm:gap-3" aria-hidden>
        {steps.map((k, i) => {
          const done = i < 2;
          return (
            <li key={k} className="flex flex-1 items-center gap-2 sm:gap-3">
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem]",
                  done ? "bg-fg/15 text-fg" : "bg-amber text-ink",
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
      <div className="mt-6 h-px w-full overflow-hidden rounded-full bg-fg/10" aria-hidden>
        <motion.span
          className="block h-full bg-amber"
          initial={false}
          animate={{ width: active ? "100%" : "66%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_0.85fr] sm:gap-7">
        <div>
          <div className="grid grid-cols-2 gap-2.5" aria-hidden>
            {[0, 1].map((i) => (
              <span key={i} className="flex h-11 items-center rounded-xl border border-line px-4">
                <Bar className={i === 0 ? "w-2/3" : "w-1/2"} />
              </span>
            ))}
            <span className="col-span-2 flex h-11 items-center rounded-xl border border-line px-4">
              <Bar className="w-3/4" />
            </span>
          </div>
        <ul className="mt-2.5 space-y-2.5">
          {(["method1", "method2", "method3"] as const).map((k, i) => (
            <motion.li
              key={k}
              className={cn(
                "flex h-12 items-center gap-3 rounded-xl border px-4 text-[0.9rem]",
                i === 0 ? "border-amber text-fg" : "border-line text-muted",
              )}
              initial={false}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 6 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={cn("flex size-4 items-center justify-center rounded-full border", i === 0 ? "border-amber" : "border-line-2")} aria-hidden>
                {i === 0 && <span className="size-2 rounded-full bg-amber" />}
              </span>
              {t(k)}
            </motion.li>
          ))}
        </ul>
        </div>
        <div className="flex flex-col rounded-xl border border-line p-4">
          <Bar className="w-2/3" />
          <Bar className="mt-2 w-1/2 bg-fg/8" />
          <Bar className="mt-2 w-3/5 bg-fg/8" />
          <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{t("total")}</span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="text-[1rem] font-medium leading-none">€</span>
              <span className="h-3.5 w-12 rounded-sm bg-fg/15" />
            </span>
          </div>
          <span className="mt-4 flex h-11 items-center justify-center rounded-full bg-amber text-[0.9rem] font-medium text-ink">{t("cta")}</span>
        </div>
      </div>
    </Chrome>
  );
}

/* ---------- the story ---------- */

function StoryCard({ step, onActive, children }: { step: Step; onActive: (s: Step) => void; children: (active: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(step);
  }, [inView, onActive, step]);
  return (
    <div ref={ref} className="lg:py-[7vh] lg:first:pt-0 lg:last:pb-0">
      <Reveal amount={0.2}>
        <div className="theme-dark overflow-hidden rounded-3xl border border-line bg-ink-2 text-paper shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
          {children(inView)}
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Dark sticky storytelling. The left column stays pinned with the headline
 * and three step labels that light up as the matching screen scrolls by on
 * the right. A thin amber progress line tracks the whole scroll.
 */
export function CheckoutStory() {
  const t = useTranslations("Webshops");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<Step>("1");
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section className="theme-dark relative bg-ink text-paper section-y" aria-labelledby="webshops-story-title">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="glow-amber absolute left-[-15%] top-[30%] h-[50vh] w-[40vw] opacity-25" />
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

            <Reveal delay={0.24} className="mt-12">
              <div className="relative">
                <span className="absolute left-0 top-0 h-full w-px bg-line" aria-hidden />
                <motion.span
                  className="absolute left-0 top-0 h-full w-px origin-top bg-amber"
                  style={{ scaleY: reduced ? 1 : scaleY }}
                  aria-hidden
                />
                <ol className="space-y-1 pl-8">
                  {STEPS.map((s) => {
                    const on = active === s;
                    return (
                      <li key={s} className="py-3">
                        <div className="flex items-baseline gap-4">
                          <span className={cn("font-mono text-[0.7rem] tracking-[0.18em] transition-colors duration-500", on ? "text-amber" : "text-muted")}>0{s}</span>
                          <span className={`text-h4 ${cn("transition-colors duration-500", on ? "text-fg" : "text-fg/40")}`}>{t(`story.steps.${s}.label`)}</span>
                        </div>
                        <motion.p
                          className="text-body max-w-sm overflow-hidden pl-[2.55rem] text-muted text-pretty"
                          initial={false}
                          animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0, marginTop: on ? 8 : 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {t(`story.steps.${s}.body`)}
                        </motion.p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>

        <div ref={trackRef} className="space-y-8 lg:col-span-7 lg:space-y-0">
          <StoryCard step="1" onActive={setActive}>
            {(on) => <CatalogScreen active={on} />}
          </StoryCard>
          <StoryCard step="2" onActive={setActive}>
            {(on) => <ProductScreen active={on} />}
          </StoryCard>
          <StoryCard step="3" onActive={setActive}>
            {(on) => <CheckoutScreen active={on} />}
          </StoryCard>
        </div>
      </div>
    </section>
  );
}
