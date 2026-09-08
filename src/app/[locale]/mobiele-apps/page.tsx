import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";
import { portfolio } from "@/data/portfolio";
import { AppsHero } from "@/components/pages/apps/hero";
import { OneCodebase } from "@/components/pages/apps/one-codebase";
import { AppScreens, type AppScreen } from "@/components/pages/apps/screens";
import { Included } from "@/components/pages/apps/included";
import { AppsProcess } from "@/components/pages/apps/process";
import { AppsFaq } from "@/components/pages/apps/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/mobiele-apps">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Apps" });
  return { title: t("meta.title"), description: t("meta.description") };
}

/**
 * Portfolio mockups tagged "mobile" (16:12) with the object-position that aims
 * at the phone inside each mockup and a zoom that trims its bezel.
 * Order matches `screens.items.*` in the Apps messages.
 */
const SCREEN_PICKS: { id: string; position: string; zoom: number }[] = [
  { id: "026-w020", position: "97% 50%", zoom: 1 },
  { id: "044-w038", position: "17% 71%", zoom: 1.82 },
  { id: "012-w006", position: "50% 75%", zoom: 1.15 },
  { id: "041-w035", position: "75% 83%", zoom: 1.68 },
  { id: "031-w025", position: "50% 50%", zoom: 1.15 },
  { id: "026-w020", position: "2% 50%", zoom: 1 },
  { id: "045-w039", position: "20% 60%", zoom: 1.25 },
  { id: "054-w048", position: "50% 50%", zoom: 1.12 },
];

export default async function Page({ params }: PageProps<"/[locale]/mobiele-apps">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Apps");

  const screens: AppScreen[] = SCREEN_PICKS.flatMap((pick, i) => {
    const item = portfolio.find((p) => p.id === pick.id);
    if (!item) return [];
    const caption = t(`screens.items.${i + 1}.caption`);
    return [{ id: `${item.id}-${i}`, src: item.src, caption, alt: t("screens.alt", { caption }), position: pick.position, zoom: pick.zoom }];
  });

  return (
    <>
      <AppsHero />
      <OneCodebase />
      <AppScreens screens={screens} />
      <Included />
      <AppsProcess />
      <AppsFaq />
      <OtherServices current="apps" />
      <CtaBand />
    </>
  );
}
