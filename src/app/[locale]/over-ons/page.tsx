import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section } from "@/components/ui/section";
import { AboutHero } from "@/components/pages/about/hero";
import { Manifesto } from "@/components/pages/about/manifesto";
import { Numbers } from "@/components/pages/about/numbers";
import { Principles } from "@/components/pages/about/principles";
import { HowWeWork } from "@/components/pages/about/how-we-work";
import { AboutMotion } from "@/components/pages/about/motion-settings";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";

/** Same rounding the on-page counter uses, so SERP and page never disagree. */
const screens = Math.max(50, Math.floor(portfolio.length / 10) * 10);

export async function generateMetadata({ params }: PageProps<"/[locale]/over-ons">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("meta.title"),
    description: t("meta.description", { sites: references.length, screens }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/over-ons">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* The app layout is shared, so reduced-motion is scoped here instead. */}
      <AboutMotion>
        {/* 1. Hero — dark */}
        <AboutHero />

        {/* 2. What we stand for, closed by the proof band — light */}
        <Section theme="light" id="manifest">
          <Manifesto />
          <Numbers liveSites={references.length} screens={screens} />
        </Section>

        {/* 3. Principles, with a sticky roll of our own work — dark */}
        <Section id="principes" className="overflow-x-clip pb-24 lg:pb-32">
          <Principles />
        </Section>

        {/* 4. How a project runs + the tools — light, so the page hands over
               to the dark CtaBand instead of ending in one long ink slab. */}
        <Section theme="light" id="werkwijze" className="overflow-hidden pb-24 lg:pb-28">
          <HowWeWork />
        </Section>
      </AboutMotion>

      {/* 5. Closing CTA */}
      <CtaBand />
    </>
  );
}
