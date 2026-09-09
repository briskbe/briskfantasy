import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { JsonLd } from "@/components/seo/json-ld";
import { SeoHero, SeoSections, SeoFaq, SeoLinkGrid } from "@/components/pages/seo/seo-page";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { regions, regionBySlug } from "@/data/seo/regions";
import { regionContent, hasRegionContent } from "@/data/seo/content";
import { clusters, clusterSlugFor } from "@/data/seo/clusters";
import { references } from "@/data/references";
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

const SERVICE_ROUTES = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "software", href: "/software-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
] as const;

export function generateStaticParams() {
  return regions.filter((r) => hasRegionContent(r.slug)).map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/regio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const region = regionBySlug(slug);
  const copy = regionContent[slug]?.[locale as AppLocale];
  if (!region || !copy) return {};
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    href: { pathname: "/regio/[slug]", params: { slug } },
    locale: locale as AppLocale,
    // The province and its cities are the long tail this page is built to catch.
    keywords: [region.name, ...region.cities.map((c) => `website laten maken ${c}`)],
  });
}

export default async function RegionPage({ params }: PageProps<"/[locale]/regio/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const region = regionBySlug(slug);
  const copy = regionContent[slug]?.[locale as AppLocale];
  if (!region || !copy) notFound();

  const t = await getTranslations("Common");
  const nav = await getTranslations("Nav");
  const loc = locale as AppLocale;
  const name = loc === "en" ? (region.nameEn ?? region.name) : region.name;
  const url = absoluteUrl({ pathname: "/regio/[slug]", params: { slug } }, loc);

  const nearby = (region.nearbyReferences ?? [])
    .map((s) => references.find((r) => r.slug === s))
    .filter((r) => r !== undefined)
    .slice(0, 3);

  // Sibling provinces in the same country keep the regional set crawlable.
  const siblings = regions.filter((r) => r.country === region.country && r.slug !== region.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationSchema(loc),
          serviceSchema({
            name: copy.h1,
            description: copy.metaDescription,
            url,
            serviceType: loc === "nl" ? "Webdesign en softwareontwikkeling" : "Web and software development",
            areaServed: [name, ...region.cities],
          }),
          breadcrumbSchema([
            { name: t("seo.home"), url: absoluteUrl("/", loc) },
            { name: t("seo.regionsHub.eyebrow"), url: absoluteUrl("/regio", loc) },
            { name: name, url },
          ]),
          faqSchema(copy.faq),
        ])}
      />

      <SeoHero
        eyebrow={t("seo.regionEyebrow")}
        h1={copy.h1}
        lead={copy.lead}
        ctaLabel={t("seo.ctaLabel")}
        breadcrumbs={[
          { name: t("seo.home"), href: "/" },
          { name: t("seo.regionsHub.eyebrow"), href: "/regio" },
          { name: name, href: "/regio" },
        ]}
      />

      <SeoSections sections={[{ heading: t("seo.servicesInRegion", { region: name }), body: copy.localAngle }]} />

      {/* The cities this page is expected to be found for, stated plainly. */}
      <Section theme="light" padded={false} className="pb-[clamp(5rem,10vw,11rem)]">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <div className="rounded-2xl border border-line bg-bg-2 p-8 sm:p-10">
              <h2 className="text-h4">{t("seo.citiesTitle", { region: name })}</h2>
              <p className="text-body mt-4 max-w-[62ch] text-fg-2 text-pretty">
                {t("seo.citiesLead", { cities: region.cities.join(", ") })}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {nearby.length > 0 && (
        <Section>
          <Eyebrow>{nav("references")}</Eyebrow>
          <h2 className="text-h3 mt-4 text-balance">{t("seo.nearbyWork")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((r) => (
              <Reveal key={r.slug}>
                <a href={r.url} target="_blank" rel="noreferrer noopener" className="group block" data-cursor="link">
                  <MicrolinkShot url={r.url} slug={r.slug} alt={`${r.name} — ${r.industry[loc]}`} />
                  <p className="text-h4 mt-4">{r.name}</p>
                  <p className="eyebrow mt-2 text-muted">{r.industry[loc]}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <ClientWall variant="compact" />
      <SeoFaq faq={copy.faq} />

      <SeoLinkGrid
        eyebrow={t("seo.relatedEyebrow")}
        title={t("seo.relatedTitle")}
        links={[
          ...SERVICE_ROUTES.map((s) => ({ label: `${nav(s.key)} — ${name}`, href: s.href })),
          ...clusters.slice(0, 4).map((c) => ({
            label: c.keyword[loc],
            href: "/diensten/[slug]",
            params: { slug: clusterSlugFor(c, loc) },
          })),
          ...siblings.map((r) => ({
            label: loc === "en" ? (r.nameEn ?? r.name) : r.name,
            href: "/regio/[slug]",
            params: { slug: r.slug },
          })),
        ]}
      />

      <CtaBand />
    </>
  );
}
