import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";
import { AppsHero } from "@/components/pages/apps/hero";
import { AppsMotionProvider } from "@/components/pages/apps/motion-provider";
import { OneCodebase } from "@/components/pages/apps/one-codebase";
import { AppScreens, type AppScreen } from "@/components/pages/apps/screens";
import { SCREEN_CROPS, screenRect } from "@/components/pages/apps/screen-crops";
import { Included } from "@/components/pages/apps/included";
import { AppsProcess } from "@/components/pages/apps/process";
import { AppsFaq } from "@/components/pages/apps/faq";

export async function generateMetadata({ params }: PageProps<"/[locale]/mobiele-apps">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Apps" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function Page({ params }: PageProps<"/[locale]/mobiele-apps">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Apps");

  // Every crop is resolved here so the hero and the gallery share one list.
  const screens: AppScreen[] = SCREEN_CROPS.map((crop, i) => {
    const caption = t(`screens.items.${i + 1}.caption`);
    return { id: `${crop.id}-${i}`, caption, alt: t("screens.alt", { caption }), rect: screenRect(crop) };
  });

  return (
    <AppsMotionProvider>
      <AppsHero />
      <OneCodebase />
      <AppScreens screens={screens} />
      <Included />
      <AppsProcess />
      <AppsFaq />
      <OtherServices current="apps" />
      <CtaBand />
    </AppsMotionProvider>
  );
}
