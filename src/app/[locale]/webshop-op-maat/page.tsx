import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { OtherServices } from "@/components/blocks/other-services";
import { references, referencesByType } from "@/data/references";
import { WebshopsHero } from "@/components/pages/webshops/hero";
import { Pillars } from "@/components/pages/webshops/pillars";
import { CheckoutStory } from "@/components/pages/webshops/checkout-story";
import { ShopReferences } from "@/components/pages/webshops/references";
import { Growth } from "@/components/pages/webshops/growth";
import { WebshopsFaq } from "@/components/pages/webshops/faq";
import { MotionShell } from "@/components/pages/webshops/motion-shell";
import { pageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]/webshop-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Webshops" });
  return pageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    href: "/webshop-op-maat",
    locale: locale as AppLocale,
  });
}

const HERO_SLUG = "roetfilterkopen-com";

export default async function Page({ params }: PageProps<"/[locale]/webshop-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hero = references.find((r) => r.slug === HERO_SLUG) ?? referencesByType("webshop")[0];
  const shops = [...referencesByType("webshop"), ...referencesByType("platform")];

  return (
    <MotionShell>
      <WebshopsHero shot={{ slug: hero.slug, url: hero.url, name: hero.name }} siteCount={references.length} />
      <Pillars />
      <CheckoutStory />
      <ShopReferences items={shops} />
      <Growth />
      <WebshopsFaq />
      <ClientWall variant="compact" />
      <OtherServices current="webshops" />
      <CtaBand />
    </MotionShell>
  );
}
