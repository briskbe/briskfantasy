import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";
import { SoftwareHero, type HeroTile } from "@/components/pages/software/hero";
import { WhatWeBuild } from "@/components/pages/software/what-we-build";
import { CaseDuo } from "@/components/pages/software/case-duo";
import { SoftwareInMotion } from "@/components/pages/software/in-motion";
import { InterfaceGallery } from "@/components/pages/software/interface-gallery";
import { StackPrinciples } from "@/components/pages/software/stack";
import { SoftwareFaq } from "@/components/pages/software/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/software-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Software" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/** Hero wall: dashboard + SaaS screens, one dark-toned piece per column, arranged so tones alternate. */
const HERO_COLUMNS = [
  ["015-w009", "005-a002", "007-w001", "036-w030"],
  ["043-w037", "014-w008", "022-w016", "023-w017"],
  ["047-w041", "009-w003", "048-w042", "024-w018"],
] as const;

/** Gallery: dashboard, saas, settings, finance, email and ai tags, mixed tones, none repeated from the hero. */
const GALLERY_IDS = ["035-w029", "006-a003", "013-w007", "033-w027", "056-w050", "046-w040", "049-w043", "030-w024", "053-w047", "037-w031", "050-w044", "027-w021"] as const;

const CASE_SLUGS = ["hp-chiptuningfiles-com", "fileservicechiptuning-com"] as const;

const byId = (id: string) => portfolio.find((p) => p.id === id)!;

export default async function Page({ params }: PageProps<"/[locale]/software-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const columns: HeroTile[][] = HERO_COLUMNS.map((col) =>
    col.map((id) => {
      const p = byId(id);
      return { id: p.id, src: p.src, width: p.width, height: p.height };
    }),
  );
  const gallery = GALLERY_IDS.map(byId);
  const cases = CASE_SLUGS.map((slug) => references.find((r) => r.slug === slug)!);

  return (
    <>
      <SoftwareHero columns={columns} />
      <WhatWeBuild />
      <CaseDuo items={cases} />
      <SoftwareInMotion />
      <InterfaceGallery items={gallery} />
      <StackPrinciples />
      <SoftwareFaq />
      <OtherServices current="software" />
      <CtaBand />
    </>
  );
}
