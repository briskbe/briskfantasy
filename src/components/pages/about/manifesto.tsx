"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const PARAS = ["p1", "p2", "p3"] as const;

/**
 * Long-form manifesto: three paragraphs at lead size, each opening in serif,
 * hairlines between. A thin amber progress line on the left grows as you read.
 */
export function Manifesto() {
  const t = useTranslations("About.manifesto");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-3">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
      </Reveal>

      <div ref={ref} className="relative lg:col-span-8 lg:col-start-5">
        {/* Reading progress line */}
        <div className="pointer-events-none absolute -left-6 top-0 bottom-0 hidden w-px bg-line lg:block" aria-hidden>
          <motion.span
            className="absolute inset-x-0 top-0 h-full origin-top bg-amber"
            style={{ scaleY: reduced ? 1 : scaleY }}
          />
        </div>

        <div className="max-w-3xl">
          {PARAS.map((k, i) => (
            <Reveal key={k} as="div" amount={0.35} className={i > 0 ? "mt-10 border-t border-line pt-10 lg:mt-14 lg:pt-14" : undefined}>
              <p className="text-lead leading-[1.55] text-fg-2 text-pretty">
                <span className="serif text-[1.35em] leading-[1.1] text-fg">{t(`${k}.opening`)}</span>{" "}
                {t(`${k}.rest`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
