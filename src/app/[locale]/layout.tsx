import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cursor } from "@/components/layout/cursor";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getClientMessages } from "@/components/i18n/messages";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return {
    metadataBase: new URL(siteConfig.url),
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
    title: {
      default: t("meta.title"),
      template: `%s — ${siteConfig.name}`,
    },
    description: t("meta.description"),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "nl" ? "nl_BE" : "en_GB",
      images: [{ url: "/hero-poster.jpg", width: 1924, height: 1076 }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0c1619",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const clientMessages = await getClientMessages(locale, ["Common", "Nav"]);

  return (
    <html
      lang={locale === "nl" ? "nl-BE" : "en"}
      className={`${fontVariables} theme-dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col bg-ink text-paper">
        {/* Site-wide graph. Page templates add their own Service, Breadcrumb
            and FAQ nodes, all pointing back at this organisation's @id. */}
        <JsonLd data={jsonLdGraph([organizationSchema(locale as AppLocale), websiteSchema()])} />
        <NextIntlClientProvider messages={clientMessages}>
          <SmoothScroll>
            <Cursor />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            {/* Last in the DOM so it is last in the tab order, not a detour on
                the way into the page. */}
            <WhatsAppWidget />
          </SmoothScroll>
        </NextIntlClientProvider>
        <GoogleAnalytics locale={locale} />
      </body>
    </html>
  );
}
