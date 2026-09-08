"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/spell/tilt-card";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const BATCH = 12;

export type GalleryItem =
  | { kind: "image"; id: string; src: string; width: number; height: number; title: string }
  | { kind: "video"; id: string; src: string; width: number; height: number; title: string };

/**
 * Light-theme masonry (CSS columns) of product-design screens. The first
 * batch is rendered immediately, the rest is revealed in batches of 12.
 * Videos sit as highlighted items inside the flow.
 */
export function ProductGallery({ items }: { items: GalleryItem[] }) {
  const t = useTranslations("References");
  const [shown, setShown] = useState(BATCH);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const tilt = fine && !reduced;

  const visible = items.slice(0, shown);
  const remaining = items.length - shown;

  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="product-gallery-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={2}>{t("product.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="product-gallery-title" className="text-h2 mt-5 max-w-[14ch] text-balance">
                {t.rich("product.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("product.body")}</p>
            <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              {t("product.total", { count: items.length })}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:mt-20 lg:columns-3">
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <GalleryFigure key={item.id} item={item} index={i} total={items.length} tilt={tilt} fresh={i >= shown - BATCH} />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted" aria-live="polite">
            {t("product.showing", { shown: visible.length, total: items.length })}
          </p>
          {remaining > 0 && (
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => setShown((s) => Math.min(items.length, s + BATCH))}
                data-cursor="link"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-line-2 px-6 text-[0.95rem] font-medium tracking-[-0.01em] text-fg transition-[border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:border-fg/60 hover:bg-fg/5"
              >
                {t("product.moreCount", { count: Math.min(BATCH, remaining) })}
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
}: {
  item: GalleryItem;
  index: number;
  total: number;
  tilt: boolean;
  fresh: boolean;
}) {
  const t = useTranslations("References");
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-bg-2" data-cursor-label={item.kind === "video" ? t("product.video") : undefined}>
      {item.kind === "image" ? (
        <Image
          src={item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          loading="lazy"
          className="block h-auto w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      ) : (
        <GalleryVideo src={item.src} width={item.width} height={item.height} label={t("product.videoAlt", { title: item.title })} />
      )}
      {item.kind === "video" && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper backdrop-blur">
          <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" aria-hidden />
          {t("product.video")}
        </span>
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-12 opacity-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      >
        <span className="block text-[0.9rem] font-medium text-paper">{item.title}</span>
      </div>
    </div>
  );

  return (
    <motion.figure
      className="mb-6 break-inside-avoid"
      initial={fresh ? { opacity: 0, y: 30, filter: "blur(8px)" } : false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % BATCH) * 0.05 }}
    >
      {tilt ? (
        <TiltCard tiltLimit={4} scale={1.015} perspective={1400} effect="gravitate" spotlight className="rounded-2xl">
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

/** Muted, looping video that only plays while on screen. */
function GalleryVideo({ src, width, height, label }: { src: string; width: number; height: number; label: string }) {
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
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={cn("block h-auto w-full bg-ink")}
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}
