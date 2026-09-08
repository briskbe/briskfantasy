import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { ContactHero } from "@/components/pages/contact/hero";
import { Alternatives } from "@/components/pages/contact/alternatives";
import { Faq } from "@/components/pages/contact/faq";
import { ClosingStrip } from "@/components/pages/contact/closing-strip";

export async function generateMetadata({ params }: PageProps<"/[locale]/gesprek-inplannen">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function Page({ params }: PageProps<"/[locale]/gesprek-inplannen">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 1. Hero + form (dark) */}
      <ContactHero />

      {/* 2. Other ways in (light) */}
      <Section theme="light" id="alternatieven">
        <Alternatives />
      </Section>

      {/* 3. FAQ about the intro call (dark) */}
      <Section id="faq">
        <Faq />
      </Section>

      {/* 4. Slim closing strip — no CTA band here, it would loop back to this page */}
      <ClosingStrip />
    </>
  );
}
