import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { references, featuredReferences } from "@/data/references";
import { portfolio, portfolioVideos } from "@/data/portfolio";
import type { AppLocale } from "@/i18n/routing";
import { ReferencesHero } from "@/components/pages/references/hero";
import { WorkGrid, type WorkCardData } from "@/components/pages/references/work-grid";
import { ProductGallery, type GalleryItem } from "@/components/pages/references/product-gallery";
import { HowItStarts } from "@/components/pages/references/how-it-starts";

export async function generateMetadata({ params }: PageProps<"/[locale]/referenties">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "References" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/** Gallery positions (1-based) where the three portfolio videos are slotted in. */
const VIDEO_POSITIONS = [1, 8, 16] as const;

export default async function Page({ params }: PageProps<"/[locale]/referenties">) {
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
  }));

  // Interleave the three videos at fixed positions inside the image flow.
  const gallery: GalleryItem[] = portfolio.map((p) => ({
    kind: "image",
    id: p.id,
    src: p.src,
    width: p.width,
    height: p.height,
    title: p.title[locale],
  }));
  portfolioVideos.forEach((v, i) => {
    gallery.splice(VIDEO_POSITIONS[i] - 1, 0, {
      kind: "video",
      id: `video-${v.id}`,
      src: v.src,
      width: v.width,
      height: v.height,
      title: v.title[locale],
    });
  });

  return (
    <>
      <ReferencesHero siteCount={references.length} screenCount={Math.floor(portfolio.length / 10) * 10} shots={reelShots} />
      <WorkGrid items={cards} />
      <ProductGallery items={gallery} />
      <HowItStarts />
      <CtaBand />
    </>
  );
}
