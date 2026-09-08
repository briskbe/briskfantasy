"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const KEYS = ["one", "two", "three", "four", "five"] as const;
type Key = (typeof KEYS)[number];

const VIDEO = "/portfolio/video/003-a000c.mp4";
/** Dark portfolio still shown until the first frame decodes (and for reduced motion). */
const POSTER = "/portfolio/048-w042.webp";

function Principle({
  k,
  index,
  active,
  onActive,
}: {
  k: Key;
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const t = useTranslations("About.principles.items");
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  // Report the principle closest to the viewport centre as the active one.
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-14">
      <Reveal amount={0.4}>
        <div className="grid gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
          <span
            className={`font-mono text-[0.8rem] tracking-[0.18em] transition-colors duration-500 sm:pt-2 ${active ? "text-amber" : "text-muted"}`}
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={`text-h3 text-balance transition-colors duration-500 ${active ? "text-fg" : "text-fg/70"}`}>
              {t(`${k}.title`)}
            </h3>
            <p className="text-body mt-4 max-w-lg text-muted text-pretty">{t(`${k}.body`)}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * Numbered principles on the left, a sticky framed portfolio video on the
 * right. The active number lights up amber and drives a small progress bar
 * under the video.
 */
export function Principles() {
  const t = useTranslations("About.principles");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div>
      <Reveal className="max-w-4xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h1 mt-5 text-balance">{t.rich("title", richTags)}</h2>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
        <ol className="order-2 lg:order-1 lg:col-span-6">
          {KEYS.map((k, i) => (
            <Principle key={k} k={k} index={i} active={active === i} onActive={setActive} />
          ))}
        </ol>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <figure className="lg:sticky lg:top-28">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 glow-amber opacity-30 blur-3xl" aria-hidden />
              <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)]">
                <video
                  className="aspect-[16/9] w-full object-cover"
                  src={VIDEO}
                  poster={POSTER}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduced}
                  preload="metadata"
                  aria-label={t("videoLabel")}
                />
              </div>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                <span className="size-1.5 rounded-full bg-amber" aria-hidden />
                {t("videoCaption")}
              </span>
              {/* Progress ticks: one per principle */}
              <span className="flex items-center gap-1.5" aria-hidden>
                {KEYS.map((k, i) => (
                  <motion.span
                    key={k}
                    className="h-px rounded-full"
                    animate={{ width: active === i ? 28 : 10, backgroundColor: i <= active ? "#ff9f4d" : "rgba(244,241,234,0.2)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
