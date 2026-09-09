import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoHero, SeoLinkGrid } from "@/components/pages/seo/seo-page";
import { clustersByParent, clusterSlugFor, type ServiceParent } from "@/data/seo/clusters";
import { hasClusterContent } from "@/data/seo/content";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, organizationSchema, pageMetadata, websiteSchema } from "@/lib/seo";

const PARENTS: ServiceParent[] = ["websites", "webshops", "software", "apps"];

export async function generateMetadata({ params }: PageProps<"/[locale]/diensten">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common" });
  return pageMetadata({
    title: t("seo.servicesHub.metaTitle"),
    description: t("seo.servicesHub.metaDescription"),
    href: "/diensten",
    locale: locale as AppLocale,
  });
}

/**
 * The services index. Its job is crawl paths: every cluster page is one click
 * from here, and this page is one click from the footer.
 */
export default async function ServicesHub({ params }: PageProps<"/[locale]/diensten">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const loc = locale as AppLocale;

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationSchema(loc),
          websiteSchema(loc),
          breadcrumbSchema([
            { name: t("seo.home"), url: absoluteUrl("/", loc) },
            { name: t("seo.servicesHub.eyebrow"), url: absoluteUrl("/diensten", loc) },
          ]),
        ])}
      />
      <SeoHero
        eyebrow={t("seo.servicesHub.eyebrow")}
        h1={t.rich("seo.servicesHub.title", { em: (c) => <em>{c}</em> })}
        lead={t("seo.servicesHub.lead")}
        ctaLabel={t("seo.ctaLabel")}
        breadcrumbs={[
          { name: t("seo.home"), href: "/" },
          { name: t("seo.servicesHub.eyebrow"), href: "/diensten" },
        ]}
      />
      {PARENTS.map((parent) => (
        <SeoLinkGrid
          key={parent}
          eyebrow={nav(parent)}
          title={t(`services.${parent}.title`)}
          links={clustersByParent(parent).filter((c) => hasClusterContent(c.slug)).map((c) => ({
            label: c.keyword[loc],
            sub: c.related[loc][0],
            href: "/diensten/[slug]",
            params: { slug: clusterSlugFor(c, loc) },
          }))}
        />
      ))}
      <ClientWall variant="compact" />
      <CtaBand />
    </>
  );
}
