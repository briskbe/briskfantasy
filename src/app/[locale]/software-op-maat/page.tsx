import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";
import { SoftwareMotionConfig } from "@/components/pages/software/reduced-motion";
import { SoftwareHero, type HeroTile } from "@/components/pages/software/hero";
import { WhatWeBuild } from "@/components/pages/software/what-we-build";
import { CaseDuo } from "@/components/pages/software/case-duo";
import { SoftwarePhases } from "@/components/pages/software/phases";
import { InterfaceGallery } from "@/components/pages/software/interface-gallery";
import { StackPrinciples } from "@/components/pages/software/stack";
import { SoftwareFaq } from "@/components/pages/software/faq";
import { SoftwareOtherServices } from "@/components/pages/software/other-services";

export async function generateMetadata({ params }: PageProps<"/[locale]/software-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Software" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/**
 * Hero: three dark-toned screens only — a lead dashboard, one screen behind it
 * and one in front — so the stack never turns into a bright collage under the
 * header or the headline. Order is [lead, back, front].
 */
const HERO_SCREENS = ["035-w029", "014-w008", "056-w050"] as const;

/**
 * Gallery, in reading order. Spans per row: 8+4 · 4+4+4 · 6+6 · 4+4+4.
 * Dashboards, automation, settings, finance, email and AI; one dark screen in
 * each half for tonal variation; none repeated from the hero.
 */
const GALLERY_IDS = ["043-w037", "048-w042", "007-w001", "033-w027", "037-w031", "047-w041", "049-w043", "030-w024", "046-w040", "013-w007"] as const;

const CASE_SLUGS = ["hp-chiptuningfiles-com", "fileservicechiptuning-com"] as const;

const byId = (id: string) => portfolio.find((p) => p.id === id)!;

export default async function Page({ params }: PageProps<"/[locale]/software-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const screens: HeroTile[] = HERO_SCREENS.map((id) => {
    const p = byId(id);
    return { id: p.id, src: p.src, width: p.width, height: p.height };
  });
  const gallery = GALLERY_IDS.map(byId);
  const cases = CASE_SLUGS.map((slug) => references.find((r) => r.slug === slug)!);

  return (
    <SoftwareMotionConfig>
      {/* dark · light · dark · light · dark · light · dark · light · dark(CTA) */}
      <SoftwareHero screens={screens} />
      <WhatWeBuild />
      <CaseDuo items={cases} />
      <SoftwarePhases />
      <InterfaceGallery items={gallery} />
      <StackPrinciples />
      <SoftwareFaq />
      <ClientWall variant="compact" />
      <SoftwareOtherServices />
      <CtaBand />
    </SoftwareMotionConfig>
  );
}
