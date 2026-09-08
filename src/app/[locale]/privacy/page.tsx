import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { Section } from "@/components/ui/section";
import { PrivacyHero } from "@/components/pages/privacy/hero";
import { PrivacyBody } from "@/components/pages/privacy/body";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function Page({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 1. Hero (dark) */}
      <PrivacyHero />

      {/* 2. The policy itself (light, readable) */}
      <Section theme="light" id="beleid">
        <PrivacyBody />
      </Section>

      {/* 3. Closing CTA */}
      <CtaBand />
    </>
  );
}
