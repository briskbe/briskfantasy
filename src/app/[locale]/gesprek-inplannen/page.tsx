import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { ContactHero } from "@/components/pages/contact/hero";
import { Proof } from "@/components/pages/contact/proof";
import { Faq } from "@/components/pages/contact/faq";
import { Closing } from "@/components/pages/contact/closing";
import { pageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: PageProps<"/[locale]/gesprek-inplannen">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return pageMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    href: "/gesprek-inplannen",
    locale: locale as AppLocale,
  });
}

export default async function Page({ params }: PageProps<"/[locale]/gesprek-inplannen">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 1. Hero + form (dark) */}
      <ContactHero />

      {/* 2. Why the call is worth it: real client sites (light) */}
      <Section theme="light" id="werk">
        <Proof />
      </Section>

      {/* 3. FAQ about the intro call (dark) */}
      <Section id="faq">
        <Faq />
      </Section>

      {/* 4. Direct route out — light, so the page doesn't end in a dark slab
          with the footer. No CtaBand: it would link back to this page. */}
      <Section theme="light" padded={false} className="py-16 lg:py-24">
        <Closing />
      </Section>
    </>
  );
}
