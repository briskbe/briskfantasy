"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Play, Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/spell/tilt-card";
import {
  useFinePointer,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { spanClass } from "./layout";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Rows revealed at once — every row is complete, so the grid never frays. */
const ROW_BATCH = 5;

type Base = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  /** Tiles in this row (2, 3 or 4) — drives the column span. */
  size: number;
  /** `cover` for the native 4:3 screens, `contain` for wide pieces and video. */
  fit: "cover" | "contain";
};

export type GalleryItem =
  | (Base & { kind: "image" })
  | (Base & { kind: "video"; poster: string });

/**
 * Light-theme product-design gallery on a 12-column editorial grid: rows
 * alternate three-up and two-up, every tile is a 4:3 card on the paper ground,
 * and reveals happen a whole set of rows at a time so the section always ends
 * on a straight line instead of a ragged masonry edge.
 */
export function ProductGallery({
  items,
  rows,
}: {
  items: GalleryItem[];
  rows: number[];
}) {
  const t = useTranslations("References");
  const [shownRows, setShownRows] = useState(ROW_BATCH);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const tilt = fine && !reduced;

  const cuts = useMemo(() => {
    const out: number[] = [];
    let n = 0;
    for (const size of rows) {
      n += size;
      out.push(n);
    }
    return out;
  }, [rows]);

  const shownCount = cuts[Math.min(shownRows, cuts.length) - 1] ?? items.length;
  const prevCount =
    shownRows <= ROW_BATCH
      ? 0
      : (cuts[Math.min(shownRows - ROW_BATCH, cuts.length) - 1] ?? 0);
  const visible = items.slice(0, shownCount);
  const remaining = items.length - shownCount;
  const nextChunk =
    (cuts[Math.min(shownRows + ROW_BATCH, cuts.length) - 1] ?? items.length) -
    shownCount;

  return (
    <section
      className="theme-light relative bg-bg text-fg section-y"
      aria-labelledby="product-gallery-title"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={2} tone="muted">
                {t("product.eyebrow")}
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="product-gallery-title"
                className="text-h2 mt-5 max-w-[14ch] text-balance"
              >
                {t.rich("product.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">
              {t("product.body")}
            </p>
            <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              {t("product.total", { count: items.length })}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          {visible.map((item, i) => (
            <GalleryFigure
              key={item.id}
              item={item}
              index={i}
              total={items.length}
              tilt={tilt}
              fresh={i >= prevCount}
              freshIndex={i - prevCount}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p
            className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted"
            aria-live="polite"
          >
            {t("product.showing", {
              shown: visible.length,
              total: items.length,
            })}
          </p>
          {remaining > 0 && (
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() =>
                  setShownRows((r) => Math.min(rows.length, r + ROW_BATCH))
                }
                data-cursor="link"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line-2 px-6 text-[0.95rem] font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
              >
                {t("product.moreCount", { count: Math.max(1, nextChunk) })}
                <Plus className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
              </button>
            </Magnetic>
          )}
        </div>
      </div>
    </section>
  );
}

function GalleryFigure({
  item,
  index,
  total,
  tilt,
  fresh,
  freshIndex,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  tilt: boolean;
  fresh: boolean;
  freshIndex: number;
}) {
  const t = useTranslations("References");
  const contain = item.fit === "contain";

  const inner = (
    <div
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg-2"
      data-cursor-label={item.kind === "video" ? t("product.video") : undefined}
    >
      <div className={cn("absolute inset-0", contain && "p-3 sm:p-5")}>
        {item.kind === "image" ? (
          <Image
            src={item.src}
            alt={item.title}
            width={item.width}
            height={item.height}
            sizes={
              item.size === 2
                ? "(min-width: 1024px) 46vw, (min-width: 640px) 46vw, 92vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            }
            loading="lazy"
            className={cn(
              "h-full w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]",
              contain
                ? "object-contain object-center"
                : "object-cover object-top",
            )}
          />
        ) : (
          <GalleryVideo
            src={item.src}
            poster={item.poster}
            label={t("product.videoAlt", { title: item.title })}
          />
        )}
      </div>

      {item.kind === "video" && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper backdrop-blur">
          <Play className="size-2.5 fill-current" aria-hidden />
          {t("product.video")}
        </span>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-12 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      >
        <span className="block text-[0.9rem] font-medium text-paper">
          {item.title}
        </span>
      </div>
    </div>
  );

  return (
    <motion.figure
      className={cn("min-w-0", spanClass(item.size))}
      initial={fresh ? { opacity: 0, y: 30, filter: "blur(8px)" } : false}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay: (Math.max(0, freshIndex) % 6) * 0.05,
      }}
    >
      {tilt ? (
        <TiltCard
          tiltLimit={4}
          scale={1.015}
          perspective={1400}
          effect="gravitate"
          spotlight
          className="rounded-2xl"
        >
          {inner}
        </TiltCard>
      ) : (
        inner
      )}
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1">
        <span className="truncate text-[0.85rem] text-fg-2">{item.title}</span>
        <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          {String(index + 1).padStart(2, "0")} / {total}
        </span>
      </figcaption>
    </motion.figure>
  );
}

/** Muted, looping video that only plays while on screen. The poster keeps the
 *  tile bright before the first frame decodes — never a black rectangle. */
function GalleryVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="h-full w-full rounded-lg object-contain object-center"
    />
  );
}
