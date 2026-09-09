import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoHero, SeoSections, SeoChecklist, SeoFaq, SeoLinkGrid } from "@/components/pages/seo/seo-page";
import { clusters, clusterBySlug, clusterSlugFor, clustersByParent, type Cluster } from "@/data/seo/clusters";
import { clusterContent, hasClusterContent } from "@/data/seo/content";
import { regions } from "@/data/seo/regions";
import type { AppLocale } from "@/i18n/routing";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  organizationSchema,
  pageMetadata,
  serviceSchema,
} from "@/lib/seo";

/** The service page each cluster reports to, so the internal linking forms a hub. */
const PARENT_ROUTE = {
  websites: "/website-op-maat",
  webshops: "/webshop-op-maat",
  software: "/software-op-maat",
  apps: "/mobiele-apps",
} as const;

/**
 * Both locales are generated for every cluster, using that locale's slug.
 * `dynamicParams = false` means anything not in this list is a 404 rather than
 * a rendered-on-demand page, so no stray URL can become indexable.
 */
export function generateStaticParams() {
  return clusters
    .filter((c) => hasClusterContent(c.slug))
    .flatMap((c) => [{ slug: c.slug }, ...(c.slugEn ? [{ slug: c.slugEn }] : [])]);
}
export const dynamicParams = false;

/** A slug may arrive in either locale's spelling; resolve it to the cluster either way. */
function resolve(slug: string): Cluster | undefined {
  return clusterBySlug(slug) ?? clusters.find((c) => c.slugEn === slug);
}

/** Each locale links to its own slug, so hreflang never points at a 404. */
const hrefFor = (cluster: Cluster) => (l: AppLocale) =>
  ({ pathname: "/diensten/[slug]" as const, params: { slug: clusterSlugFor(cluster, l) } });

export async function generateMetadata({ params }: PageProps<"/[locale]/diensten/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const cluster = resolve(slug);
  if (!cluster) return {};
  const copy = clusterContent[cluster.slug]?.[locale as AppLocale];
  // Only the slug that belongs to this locale is a real page; the other
  // locale's spelling would be a duplicate of the same content.
  if (!copy || clusterSlugFor(cluster, locale) !== slug) return {};
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    href: hrefFor(cluster),
    locale: locale as AppLocale,
    keywords: [cluster.keyword[locale as AppLocale], ...cluster.related[locale as AppLocale]],
  });
}

export default async function ClusterPage({ params }: PageProps<"/[locale]/diensten/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cluster = resolve(slug);
  if (!cluster) notFound();
  const copy = clusterContent[cluster.slug]?.[locale as AppLocale];
  if (!copy) notFound();
  // `generateStaticParams` yields both spellings across both locales; the pair
  // that does not belong together is a 404 rather than a duplicate page.
  if (clusterSlugFor(cluster, locale) !== slug) notFound();

  const t = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const loc = locale as AppLocale;
  const url = absoluteUrl(hrefFor(cluster), loc);

  // Siblings under the same service, plus a few regions: every landing page
  // needs outgoing links or it sits at the edge of the site on its own.
  const siblings = clustersByParent(cluster.parent)
    .filter((c) => c.slug !== cluster.slug)
    .slice(0, 6);
  const regionLinks = regions.slice(0, 6);

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationSchema(loc),
          serviceSchema({
            name: cluster.keyword[loc],
            description: copy.metaDescription,
            url,
            serviceType: cluster.keyword[loc],
          }),
          breadcrumbSchema([
            { name: t("seo.home"), url: absoluteUrl("/", loc) },
            { name: nav(cluster.parent), url: absoluteUrl(PARENT_ROUTE[cluster.parent], loc) },
            { name: copy.h1, url },
          ]),
          faqSchema(copy.faq),
        ])}
      />

      <SeoHero
        eyebrow={t("seo.clusterEyebrow")}
        h1={copy.h1}
        lead={copy.lead}
        ctaLabel={t("seo.ctaLabel")}
        breadcrumbs={[
          { name: t("seo.home"), href: "/" },
          { name: nav(cluster.parent), href: PARENT_ROUTE[cluster.parent] },
          { name: copy.h1, href: PARENT_ROUTE[cluster.parent] },
        ]}
      />

      <SeoSections sections={copy.sections} />
      {copy.checklist && <SeoChecklist title={copy.checklist.title} items={copy.checklist.items} />}
      <ClientWall variant="compact" />
      <SeoFaq faq={copy.faq} />

      {siblings.length > 0 && (
        <SeoLinkGrid
          eyebrow={t("seo.relatedEyebrow")}
          title={t("seo.relatedTitle")}
          links={[
            ...siblings.map((c) => ({
              label: c.keyword[loc],
              href: "/diensten/[slug]",
              params: { slug: clusterSlugFor(c, loc) },
            })),
            ...regionLinks.map((r) => ({
              label: `${cluster.keyword[loc]} — ${loc === "en" ? (r.nameEn ?? r.name) : r.name}`,
              href: "/regio/[slug]",
              params: { slug: r.slug },
            })),
          ]}
        />
      )}

      <CtaBand />
    </>
  );
}
