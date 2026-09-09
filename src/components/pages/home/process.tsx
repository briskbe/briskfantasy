"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const STEP_KEYS = ["discover", "design", "build", "launch"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

/** One real screen per step: scope, screens, code, measurement. */
const STEP_IMAGES = ["010-w004", "026-w020", "052-w046", "005-a002"].map((id) => portfolio.find((p) => p.id === id)!);

export function Process() {
  const t = useTranslations("Home.process");
  const locale = useLocale() as "nl" | "en";
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  const steps = STEP_KEYS.map((k, i) => ({
    key: k,
    index: t(`steps.${k}.index`),
    title: t(`steps.${k}.title`),
    short: t(`steps.${k}.short`),
    body: t(`steps.${k}.body`),
    image: STEP_IMAGES[i],
  }));

  // The step crossing the middle of the viewport drives the sticky visual.
  useEffect(() => {
    const nodes = items.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = nodes.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <Reveal>
            <Eyebrow tone="muted">{t("eyebrow")}</Eyebrow>
            <h2 className="text-h2 mt-5 max-w-[12ch] text-balance">{t("title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("body")}</p>
          </Reveal>

          {/* Sticky visual: the screen that belongs to the step you are reading. */}
          <Reveal delay={0.16} className="mt-9 hidden lg:block" amount={0.1}>
            <div className="relative aspect-[16/10] w-full max-w-[26rem] overflow-hidden rounded-2xl border border-line bg-bg-2 p-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.key}
                  className="absolute inset-2 overflow-hidden rounded-xl bg-bg-3"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image
                    src={s.image.src}
                    alt={t("visualAlt", { title: s.image.title[locale] })}
                    fill
                    sizes="26rem"
                    className="object-cover object-top"
                  />
                </motion.div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-hidden>
              <span className="text-fg">{steps[active].index}</span>
              <span className="h-px w-6 bg-line-2" />
              <span>{steps[active].title}</span>
            </p>
          </Reveal>

          <Reveal delay={0.22} className="mt-9">
            <Button href="/gesprek-inplannen" size="lg">
              {t("cta")}
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-7">
        <ol className="list-none">
          {steps.map((s, i) => (
            <motion.li
              key={s.key}
              ref={(el) => {
                items.current[i] = el;
              }}
              className={cn(
                "relative grid gap-4 border-t border-line py-10 sm:grid-cols-[5rem_1fr] sm:gap-8 lg:py-14",
                i === steps.length - 1 && "border-b",
              )}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <span
                className={cn(
                  "font-mono text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.03em] transition-colors duration-500",
                  active === i ? "text-fg" : "text-fg/25",
                )}
                aria-hidden
              >
                {s.index}
              </span>
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{s.short}</p>
                <h3 className="text-h3 mt-3 text-balance">
                  <span className="sr-only">{s.index} </span>
                  {s.title}
                </h3>
                <p className="text-body mt-4 max-w-xl text-muted text-pretty">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
