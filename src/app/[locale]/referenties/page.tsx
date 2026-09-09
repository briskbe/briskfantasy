import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { references, featuredReferences } from "@/data/references";
import { portfolio, portfolioVideos } from "@/data/portfolio";
import type { AppLocale } from "@/i18n/routing";
import { ReferencesHero } from "@/components/pages/references/hero";
import {
  WorkGrid,
  type WorkCardData,
} from "@/components/pages/references/work-grid";
import {
  ProductGallery,
  type GalleryItem,
} from "@/components/pages/references/product-gallery";
import { HowItStarts } from "@/components/pages/references/how-it-starts";
import { flattenRows, planRows } from "@/components/pages/references/layout";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/referenties">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "References" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/** Tile aspect the gallery is built on; 51 of the 53 screens are natively 4:3. */
const TILE_ASPECT = 4 / 3;
/** Where the motion pieces sit, as fractions of the wide (2-up) slot list. */
const VIDEO_FRACTIONS = [0.06, 0.45, 0.85];
/** Where the two screens that are not 4:3 sit — also wide slots, so they breathe. */
const WIDE_IMAGE_FRACTIONS = [0.25, 0.66];

/**
 * Lays the 53 screens + 3 motion pieces out on the 12-column row plan. Videos
 * (and the two screens that are not 4:3) are placed in the wide 2-up slots and
 * rendered `contain` on the paper ground, so nothing is ever cropped.
 */
function buildGallery(locale: AppLocale): {
  items: GalleryItem[];
  rows: number[];
} {
  const total = portfolio.length + portfolioVideos.length;
  const rows = planRows(total);
  const slotSizes = flattenRows(rows);

  // Wide slots (rows of two) are the only places a non-4:3 piece can breathe.
  const wideSlots = slotSizes
    .map((size, i) => (size === 2 ? i : -1))
    .filter((i) => i >= 0);
  const taken = new Set<number>();
  const claim = (fraction: number) => {
    if (wideSlots.length === 0) return -1;
    let k = Math.min(
      wideSlots.length - 1,
      Math.round(fraction * (wideSlots.length - 1)),
    );
    while (taken.has(wideSlots[k]) && k + 1 < wideSlots.length) k += 1;
    taken.add(wideSlots[k]);
    return wideSlots[k];
  };

  const isSquare = (w: number, h: number) =>
    Math.abs(w / h - TILE_ASPECT) / TILE_ASPECT < 0.05;
  const wideImages = portfolio.filter((p) => !isSquare(p.width, p.height));
  const squareImages = portfolio.filter((p) => isSquare(p.width, p.height));

  const videoSlot = new Map<number, number>();
  portfolioVideos.forEach((_, vi) => {
    const slot = claim(VIDEO_FRACTIONS[vi] ?? 0.5);
    if (slot >= 0) videoSlot.set(slot, vi);
  });
  const wideImageSlot = new Map<number, number>();
  wideImages.forEach((_, wi) => {
    const slot = claim(WIDE_IMAGE_FRACTIONS[wi] ?? 0.5);
    if (slot >= 0) wideImageSlot.set(slot, wi);
  });

  const items: GalleryItem[] = [];
  let img = 0;
  slotSizes.forEach((size, i) => {
    const vi = videoSlot.get(i);
    if (vi !== undefined) {
      const v = portfolioVideos[vi];
      items.push({
        kind: "video",
        id: `video-${v.id}`,
        src: v.src,
        poster: v.poster,
        width: v.width,
        height: v.height,
        title: v.title[locale],
        size,
        fit: "contain",
      });
      return;
    }
    const wi = wideImageSlot.get(i);
    const p = wi !== undefined ? wideImages[wi] : squareImages[img];
    if (wi === undefined) img += 1;
    if (!p) return;
    items.push({
      kind: "image",
      id: p.id,
      src: p.src,
      width: p.width,
      height: p.height,
      title: p.title[locale],
      size,
      fit: isSquare(p.width, p.height) ? "cover" : "contain",
    });
  });

  return { items, rows };
}

export default async function Page({
  params,
}: PageProps<"/[locale]/referenties">) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as AppLocale;

  const reelShots = featuredReferences.slice(0, 4).map((r) => ({
    src: `/references/${r.slug}.webp`,
    domain: r.domain,
    name: r.name,
  }));

  const cards: WorkCardData[] = references.map((r) => ({
    slug: r.slug,
    url: r.url,
    name: r.name,
    domain: r.domain,
    type: r.type,
    industry: r.industry[locale],
    blurb: r.blurb[locale],
    services: r.services,
    weakCapture: r.captureQuality === "weak",
  }));

  const { items: gallery, rows: galleryRows } = buildGallery(locale);

  return (
    <>
      <ReferencesHero
        siteCount={references.length}
        screenCount={Math.floor(portfolio.length / 10) * 10}
        shots={reelShots}
      />
      <WorkGrid items={cards} />
      <ProductGallery items={gallery} rows={galleryRows} />
      <HowItStarts />
      <CtaBand />
    </>
  );
}
