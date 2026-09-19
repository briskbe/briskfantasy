import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";
import { GuideBody, GuideBreadcrumbs, GuideCards, GuideNextSteps } from "@/components/pages/knowledge/guide-components";
import { guides, guideBySlug, guideHrefFor, guideReadingMinutes, guideWordCount } from "@/data/seo/guides";
import { siteConfig } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, ORG_ID, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** The parent layout supplies the locale; generate only its valid article slugs. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) return [];
  return guides.map((guide) => ({ slug: guide.slug[locale] }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const guide = guideBySlug(slug, locale);
  if (!guide) notFound();
  const copy = guide.copy[locale];
  const metadata = pageMetadata({
    title: copy.metaTitle,
    description: copy.description,
    href: guideHrefFor(guide),
    locale,
  });
  return {
    ...metadata,
    authors: [{ name: siteConfig.name, url: absoluteUrl("/over-ons", locale) }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: [absoluteUrl("/over-ons", locale)],
      section: copy.category,
    },
  };
}

export default async function KnowledgeArticle({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const guide = guideBySlug(slug, locale);
  if (!guide) notFound();
  setRequestLocale(locale);

  const copy = guide.copy[locale];
  const isNl = locale === "nl";
  const url = absoluteUrl(guideHrefFor(guide), locale);
  const hubLabel = isNl ? "Kennisbank" : "Guides";
  const related = guides.filter((item) => item.id !== guide.id);

  return (
    <>
      <JsonLd data={jsonLdGraph([
        {
          "@type": "Article",
          "@id": `${url}#article`,
          url,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          headline: copy.title,
          description: copy.description,
          inLanguage: locale,
          articleSection: copy.category,
          wordCount: guideWordCount(copy),
          author: { "@type": "Organization", "@id": ORG_ID, name: siteConfig.name, url: absoluteUrl("/over-ons", locale) },
          publisher: { "@id": ORG_ID },
          isPartOf: { "@type": "CollectionPage", "@id": `${absoluteUrl("/kennisbank", locale)}#webpage` },
        },
        breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/", locale) },
          { name: hubLabel, url: absoluteUrl("/kennisbank", locale) },
          { name: copy.title, url },
        ]),
      ])} />

      <article>
        <header className="theme-dark relative overflow-hidden bg-ink text-paper">
          <div className="container-x pt-36 pb-16 sm:pt-40 lg:pb-20">
            <GuideBreadcrumbs locale={locale} title={copy.title} />
            <div className="max-w-5xl">
              <Eyebrow>{copy.category}</Eyebrow>
              <h1 className="text-h1 mt-5 text-balance">{copy.title}</h1>
              <p className="text-lead mt-8 max-w-[64ch] text-paper/80">{copy.introduction}</p>
              <p className="mt-7 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                <span>{isNl ? "Door " : "By "}<Link href="/over-ons" rel="author" className="underline underline-offset-4 hover:text-fg">{siteConfig.name}</Link></span>
                <span aria-hidden="true">·</span>
                <span>{guideReadingMinutes(copy)} {isNl ? "minuten leestijd" : "minute read"}</span>
                <span aria-hidden="true">·</span>
                <span>{isNl ? "Praktische projectgids" : "Practical project guide"}</span>
              </p>
            </div>
            <div className="mt-10 max-w-4xl rounded-2xl border border-line bg-paper/[0.03] p-6 sm:p-8">
              <p className="eyebrow mb-3 text-accent">{isNl ? "Om mee te nemen" : "Key takeaway"}</p>
              <p className="text-body text-paper/85">{copy.takeaway}</p>
            </div>
          </div>
        </header>
        <GuideBody copy={copy} locale={locale} />
      </article>

      <GuideNextSteps guide={guide} locale={locale} />

      <Section theme="light">
        <Eyebrow>{isNl ? "Verder voorbereiden" : "Keep planning"}</Eyebrow>
        <h2 className="text-h2 mt-5 mb-10">{isNl ? "Meer praktische gidsen." : "More practical guides."}</h2>
        <GuideCards items={related} locale={locale} />
        <Link href="/kennisbank" className="mt-8 inline-block text-sm underline decoration-line-2 underline-offset-4 hover:text-accent">
          {isNl ? "Terug naar de volledige kennisbank" : "Back to all website guides"}
        </Link>
      </Section>
    </>
  );
}
