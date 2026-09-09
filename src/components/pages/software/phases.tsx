"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { cn } from "@/lib/utils";

const STEPS = ["1", "2", "3", "4"] as const;
const DELIVERABLES = ["1", "2", "3"] as const;

/**
 * Light section: the four phases as a scroll-told story. A sticky rail on the
 * left tracks which phase is in view; each phase on the right carries its own
 * body copy and the concrete things you hold at the end of it. Real DOM, so it
 * is legible at 390px, readable by screen readers and needs no player chunk.
 */
export function SoftwarePhases() {
  const t = useTranslations("Software");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-phase]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.phase));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="software-phases-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index={3}>{t("phases.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-phases-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t.rich("phases.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("phases.body")}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Sticky rail: where you are in the four phases. */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </p>
              <ol className="mt-6" aria-hidden>
                {STEPS.map((k, i) => (
                  <li key={k} className="relative flex items-center gap-4 py-3 pl-6">
                    <span className="absolute left-0 top-0 h-full w-px bg-line" />
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-full w-px origin-top bg-fg transition-transform duration-700 ease-[var(--ease-out-expo)]",
                        i <= active ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span className={cn("font-mono text-[0.7rem] tracking-[0.18em] transition-colors duration-500", i <= active ? "text-fg" : "text-muted")}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn("text-[1.05rem] font-medium tracking-[-0.01em] transition-colors duration-500", i === active ? "text-fg" : "text-muted")}
                    >
                      {t(`phases.steps.${k}.title`)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol ref={listRef} className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((k, i) => (
              <li
                key={k}
                data-phase={i}
                className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-16 lg:first:pt-0"
              >
                <Reveal amount={0.2}>
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">
                    0{i + 1} <span className="px-2 text-line-2">/</span> 0{STEPS.length}
                  </p>
                  <h3 className="text-h3 mt-5 text-balance">{t(`phases.steps.${k}.title`)}</h3>
                  <p className="text-lead mt-5 max-w-xl text-fg-2 text-pretty">{t(`phases.steps.${k}.body`)}</p>
                  <ul className="mt-7 flex flex-wrap gap-2" aria-label={t("phases.deliverablesLabel", { title: t(`phases.steps.${k}.title`) })}>
                    {DELIVERABLES.map((d) => (
                      <li key={d} className="rounded-full border border-line-2 px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-fg-2">
                        {t(`phases.steps.${k}.deliverables.${d}`)}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
