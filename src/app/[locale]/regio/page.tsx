import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoHero, SeoLinkGrid } from "@/components/pages/seo/seo-page";
import { regionsByCountry } from "@/data/seo/regions";
import { hasRegionContent } from "@/data/seo/content";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata, websiteSchema } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/regio">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return pageMetadata({
    title: t("seo.regionsHub.metaTitle"),
    description: t("seo.regionsHub.metaDescription"),
    href: "/regio",
    locale: locale as AppLocale,
  });
}

/** The regions index: every province one click away, in both countries. */
export default async function RegionsHub({ params }: PageProps<"/[locale]/regio">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Common");
  const loc = locale as AppLocale;

  const groups = [
    { label: t("seo.regionsHub.belgium"), regions: regionsByCountry("BE").filter((r) => hasRegionContent(r.slug)) },
    { label: t("seo.regionsHub.netherlands"), regions: regionsByCountry("NL").filter((r) => hasRegionContent(r.slug)) },
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationSchema(loc),
          websiteSchema(loc),
          breadcrumbSchema([
            { name: t("seo.home"), url: absoluteUrl("/", loc) },
            { name: t("seo.regionsHub.eyebrow"), url: absoluteUrl("/regio", loc) },
          ]),
        ])}
      />
      <SeoHero
        eyebrow={t("seo.regionsHub.eyebrow")}
        h1={t.rich("seo.regionsHub.title", { em: (c) => <em>{c}</em> })}
        lead={t("seo.regionsHub.lead")}
        ctaLabel={t("seo.ctaLabel")}
        breadcrumbs={[
          { name: t("seo.home"), href: "/" },
          { name: t("seo.regionsHub.eyebrow"), href: "/regio" },
        ]}
      />
      {groups.map((g) => (
        <SeoLinkGrid
          key={g.label}
          eyebrow={g.label}
          title={g.label}
          links={g.regions.map((r) => ({
            label: loc === "en" ? (r.nameEn ?? r.name) : r.name,
            sub: r.cities.slice(0, 3).join(" · "),
            href: "/regio/[slug]",
            params: { slug: r.slug },
          }))}
        />
      ))}
      <ClientWall variant="compact" />
      <CtaBand />
    </>
  );
}
