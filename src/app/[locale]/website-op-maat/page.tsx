import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { OtherServices } from "@/components/blocks/other-services";
import { references, referencesByType } from "@/data/references";
import { MotionPrefs } from "@/components/pages/websites/motion-prefs";
import { WebsitesHero, type HeroShot } from "@/components/pages/websites/hero";
import { WhatYouGet } from "@/components/pages/websites/what-you-get";
import { SpeedStandard } from "@/components/pages/websites/speed-standard";
import { WebsiteReferences } from "@/components/pages/websites/references";
import { ProcessTimeline } from "@/components/pages/websites/process-timeline";
import { WebsitesFaq } from "@/components/pages/websites/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/website-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Websites" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/** Front frame first, then the frame that peeks from behind it. */
const HERO_SLUGS = ["landelijkglas-be", "vestra-armor-com"];

function heroShots(): HeroShot[] {
  const picked = HERO_SLUGS.map((slug) => references.find((r) => r.slug === slug)).filter((r) => r !== undefined);
  const pool = picked.length === HERO_SLUGS.length ? picked : referencesByType("website").filter((r) => r.featured);
  return pool.slice(0, 2).map(({ slug, url, name, domain }) => ({ slug, url, name, domain }));
}

export default async function Page({ params }: PageProps<"/[locale]/website-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MotionPrefs>
      <WebsitesHero shots={heroShots()} siteCount={references.length} />
      <WhatYouGet />
      <SpeedStandard />
      <WebsiteReferences />
      <ProcessTimeline />
      <WebsitesFaq />
      <ClientWall variant="compact" />
      <OtherServices current="websites" />
      <CtaBand />
    </MotionPrefs>
  );
}
