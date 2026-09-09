"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const PARAS = ["p1", "p2", "p3"] as const;

/**
 * Three promises at lead size, each opening in serif, hairlines between.
 * The left column carries the section heading and stays with the reader
 * (sticky) so the 4/8 grid never leaves a hairline around empty paper.
 */
export function Manifesto() {
  const t = useTranslations("About.manifesto");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <Eyebrow tone="muted">{t("eyebrow")}</Eyebrow>
          <h2 id="manifest-title" className="text-h2 mt-5 text-balance">
            {t.rich("title", richTags)}
          </h2>
          <p className="text-body mt-7 max-w-xs text-muted text-pretty">{t("lead")}</p>
        </div>
      </Reveal>

      <div ref={ref} className="relative lg:col-span-7 lg:col-start-6">
        {/* Reading progress line — the single lime moment on this screen */}
        <div className="pointer-events-none absolute -left-8 top-0 bottom-0 hidden w-px bg-line lg:block" aria-hidden>
          <motion.span
            className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
            style={{ scaleY: reduced ? 1 : scaleY }}
          />
        </div>

        <div className="max-w-3xl">
          {PARAS.map((k, i) => (
            <Reveal
              key={k}
              as="div"
              amount={0.35}
              className={i > 0 ? "mt-10 border-t border-line pt-10 lg:mt-14 lg:pt-14" : undefined}
            >
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
