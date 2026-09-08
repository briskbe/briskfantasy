import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";
import { references, referencesByType } from "@/data/references";
import { WebsitesHero } from "@/components/pages/websites/hero";
import { WhatYouGet } from "@/components/pages/websites/what-you-get";
import { SpeedGauges } from "@/components/pages/websites/speed-gauges";
import { WebsiteReferences } from "@/components/pages/websites/references";
import { ProcessTimeline } from "@/components/pages/websites/process-timeline";
import { WebsitesFaq } from "@/components/pages/websites/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/website-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Websites" });
  return { title: t("meta.title"), description: t("meta.description") };
}

const HERO_SLUGS = ["priveglas-be", "city-housing-be", "landelijkglas-be"] as const;

export default async function Page({ params }: PageProps<"/[locale]/website-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const heroShots = HERO_SLUGS.map((slug) => {
    const r = references.find((x) => x.slug === slug)!;
    return { slug: r.slug, url: r.url, name: r.name };
  });

  return (
    <>
      <WebsitesHero shots={heroShots} siteCount={referencesByType("website").length} />
      <WhatYouGet />
      <SpeedGauges />
      <WebsiteReferences />
      <ProcessTimeline />
      <WebsitesFaq />
      <OtherServices current="websites" />
      <CtaBand />
    </>
  );
}
