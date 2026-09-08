import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";
import { references, referencesByType } from "@/data/references";
import { WebshopsHero } from "@/components/pages/webshops/hero";
import { Pillars } from "@/components/pages/webshops/pillars";
import { CheckoutStory } from "@/components/pages/webshops/checkout-story";
import { ShopReferences } from "@/components/pages/webshops/references";
import { Growth } from "@/components/pages/webshops/growth";
import { WebshopsFaq } from "@/components/pages/webshops/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/webshop-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Webshops" });
  return { title: t("meta.title"), description: t("meta.description") };
}

const HERO_SLUG = "roetfilterkopen-com";

export default async function Page({ params }: PageProps<"/[locale]/webshop-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hero = references.find((r) => r.slug === HERO_SLUG) ?? referencesByType("webshop")[0];
  const shops = [...referencesByType("webshop"), ...referencesByType("platform")];

  return (
    <>
      <WebshopsHero shot={{ slug: hero.slug, url: hero.url, name: hero.name }} siteCount={references.length} />
      <Pillars />
      <CheckoutStory />
      <ShopReferences items={shops} />
      <Growth />
      <WebshopsFaq />
      <OtherServices current="webshops" />
      <CtaBand />
    </>
  );
}
