"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { TiltCard } from "@/components/spell/tilt-card";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { portfolio, type PortfolioItem } from "@/data/portfolio";

/**
 * Eight screens that share a near-white ground, so the row reads as one system
 * instead of a temperature clash between mockup backgrounds.
 */
const IDS = ["043-w037", "007-w001", "033-w027", "041-w035", "036-w030", "055-w049", "047-w041", "022-w016"];
const ITEMS: PortfolioItem[] = IDS.map((id) => portfolio.find((p) => p.id === id)!);

const CARD_W = "w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[min(26rem,46vh)] xl:w-[min(29rem,50vh)]";

/**
 * The image is decorative (`alt=""`): the <figcaption> is the accessible name,
 * so assistive tech announces each screen once instead of twice.
 * `tilt` is only ever true where there is a real pointer — a swiping finger
 * must not tilt cards.
 */
function ProductCard({ item, index, locale, tilt }: { item: PortfolioItem; index: number; locale: "nl" | "en"; tilt: boolean }) {
  const shot = (
    <div className="overflow-hidden rounded-xl bg-bg-3">
      <Image
        src={item.src}
        alt=""
        width={item.width}
        height={item.height}
        sizes="(min-width: 1280px) 29rem, (min-width: 1024px) 26rem, (min-width: 640px) 24rem, 78vw"
        className="h-auto w-full"
        loading="lazy"
      />
    </div>
  );
  return (
    <figure className={CARD_W}>
      {tilt ? (
        <TiltCard tiltLimit={6} scale={1.02} effect="gravitate" spotlight className="rounded-2xl border border-line bg-bg-2 p-2">
          {shot}
        </TiltCard>
      ) : (
        <div className="rounded-2xl border border-line bg-bg-2 p-2">{shot}</div>
      )}
      <figcaption className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-[0.95rem] text-fg-2">{item.title[locale]}</span>
      </figcaption>
    </figure>
  );
}

function Heading() {
  const t = useTranslations("Home.product");
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-7">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h2 mt-5 text-balance">{t.rich("title", richTags)}</h2>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
        <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
      </Reveal>
    </div>
  );
}

/** Desktop: a sticky viewport in which the strip slides horizontally as you scroll vertically. */
function ScrollDriven({ locale }: { locale: "nl" | "en" }) {
  const t = useTranslations("Home.product");
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      const gutter = el.getBoundingClientRect().left;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + gutter));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // The strip travels a little faster than the page so the section stays short enough to feel deliberate.
  const travel = Math.round(distance * 0.72);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100vh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
        <div className="container-x">
          <Heading />
        </div>
        <div className="container-x mt-8 xl:mt-10">
          <motion.div ref={track} className="flex w-max gap-6 will-change-transform xl:gap-8" style={{ x }}>
            {ITEMS.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} locale={locale} tilt />
            ))}
          </motion.div>
        </div>
        <div className="container-x mt-8 flex items-center gap-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{t("hint")}</span>
          <span className="relative h-px max-w-48 flex-1 bg-line">
            <motion.span className="absolute inset-0 origin-left bg-fg/60" style={{ scaleX: lineScale }} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced motion: native horizontal scroll-snap. */
function NativeRow({ locale }: { locale: "nl" | "en" }) {
  const t = useTranslations("Home.product");
  return (
    <div className="section-y">
      <div className="container-x">
        <Heading />
      </div>
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,4vw,4rem)] pb-4" data-lenis-prevent>
        {ITEMS.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} locale={locale} tilt={false} />
        ))}
        <span className="w-px shrink-0" aria-hidden />
      </div>
      <p className="container-x mt-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{t("hintMobile")}</p>
    </div>
  );
}

export function ProductStrip() {
  const locale = useLocale() as "nl" | "en";
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  return wide && !reduced ? <ScrollDriven locale={locale} /> : <NativeRow locale={locale} />;
}
