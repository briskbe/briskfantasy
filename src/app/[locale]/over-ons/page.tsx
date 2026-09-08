import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section } from "@/components/ui/section";
import { AboutHero } from "@/components/pages/about/hero";
import { Manifesto } from "@/components/pages/about/manifesto";
import { Principles } from "@/components/pages/about/principles";
import { HowWeWork } from "@/components/pages/about/how-we-work";
import { Numbers } from "@/components/pages/about/numbers";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";

export async function generateMetadata({ params }: PageProps<"/[locale]/over-ons">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function Page({ params }: PageProps<"/[locale]/over-ons">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const screens = Math.max(50, Math.floor(portfolio.length / 10) * 10);

  return (
    <>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Manifesto */}
      <Section theme="light" id="manifest">
        <Manifesto />
      </Section>

      {/* 3. Principles */}
      <Section id="principes" className="overflow-x-clip">
        <Principles />
      </Section>

      {/* 4. How we work */}
      <Section theme="light" id="werkwijze" className="overflow-hidden">
        <HowWeWork />
      </Section>

      {/* 5. Numbers */}
      <Section id="cijfers">
        <Numbers liveSites={references.length} screens={screens} />
      </Section>

      {/* 6. Closing CTA */}
      <CtaBand />
    </>
  );
}
