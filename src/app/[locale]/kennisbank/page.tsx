import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { GuideBreadcrumbs, GuideCards } from "@/components/pages/knowledge/guide-components";
import { guides, guideHrefFor } from "@/data/seo/guides";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, ORG_ID, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const hubCopy = {
  nl: {
    title: "Kennisbank: praktische gidsen voor je website",
    description: "Bereid je website voor met praktische gidsen over planning, een webdesign bureau kiezen, SEO, redesign en onderhoud. Checklists en heldere afwegingen van Brisk.",
    label: "Kennisbank",
    heading: "Goede websites beginnen met goede keuzes.",
    lead: "Van de eerste briefing tot het onderhoud na lancering: deze gidsen helpen je de juiste vragen stellen, voorstellen vergelijken en je websiteproject zorgvuldig voorbereiden.",
  },
  en: {
    title: "Website guides: planning, SEO, redesign and maintenance",
    description: "Practical website guides covering project planning, choosing an agency, SEO, redesign and maintenance. Checklists and clear decisions from Brisk.",
    label: "Guides",
    heading: "Good websites start with good decisions.",
    lead: "From the first brief to maintenance after launch, these guides help you ask useful questions, compare proposals and prepare your website project with care.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const copy = hubCopy[locale];
  return pageMetadata({ title: copy.title, description: copy.description, href: "/kennisbank", locale });
}

export default async function KnowledgeHub({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const copy = hubCopy[locale];
  const isNl = locale === "nl";
  const url = absoluteUrl("/kennisbank", locale);

  return (
    <>
      <JsonLd data={jsonLdGraph([
        {
          "@type": "CollectionPage",
          "@id": `${url}#webpage`,
          url,
          name: copy.heading,
          description: copy.description,
          inLanguage: locale,
          publisher: { "@id": ORG_ID },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: guides.length,
            itemListElement: guides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: guide.copy[locale].title,
              url: absoluteUrl(guideHrefFor(guide), locale),
            })),
          },
        },
        breadcrumbSchema([{ name: "Home", url: absoluteUrl("/", locale) }, { name: copy.label, url }]),
      ])} />

      <Section padded={false} className="overflow-hidden pt-36 pb-16 sm:pt-40 lg:pb-24">
        <GuideBreadcrumbs locale={locale} />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.label}</Eyebrow>
            <h1 className="text-h1 mt-5 text-balance">{copy.heading}</h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lead text-paper/80">{copy.lead}</p>
            <p className="mt-6 text-sm text-muted">
              {isNl ? "Gidsen van " : "Guides by "}
              <Link href="/over-ons" className="underline underline-offset-4 hover:text-fg">Brisk</Link>
              {isNl ? ", digitaal bureau uit Genk, België." : ", a digital agency based in Genk, Belgium."}
            </p>
          </div>
        </div>
      </Section>

      <Section theme="light">
        <GuideCards items={guides} locale={locale} />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Eyebrow>{isNl ? "Jouw volgende stap" : "Your next step"}</Eyebrow>
            <h2 className="text-h2 mt-5 text-balance">{isNl ? "Een concreet websiteproject in gedachten?" : "Have a website project in mind?"}</h2>
            <p className="text-body mt-5 max-w-[60ch] text-fg-2">
              {isNl ? "Bekijk onze aanpak voor " : "Explore our approach to "}
              <Link href="/website-op-maat" className="underline decoration-line-2 underline-offset-4 hover:text-accent">{isNl ? "websites op maat" : "custom websites"}</Link>
              {isNl ? " en onze " : " and our "}
              <Link href="/referenties" className="underline decoration-line-2 underline-offset-4 hover:text-accent">{isNl ? "uitgevoerde projecten" : "completed projects"}</Link>
              {isNl ? ". We bespreken graag hoe je de aanbevelingen uit deze gidsen toepast op jouw bedrijf." : ". We can discuss how to apply the recommendations in these guides to your business."}
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button href="/gesprek-inplannen" size="lg" magnetic={false}>{isNl ? "Bespreek je website" : "Discuss your website"}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
