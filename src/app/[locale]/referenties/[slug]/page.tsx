import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";
import { references, type ReferenceService } from "@/data/references";
import { caseStudies, caseForSlug, caseHrefFor } from "@/data/seo/cases";
import { siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, ORG_ID, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // The parent layout generates both locales; these slugs are shared by them.
  return caseStudies.map(({ slug }) => ({ slug }));
}

function resolveCase(locale: string, slug: string) {
  if (locale !== "nl" && locale !== "en") notFound();
  const caseStudy = caseForSlug(slug);
  if (!caseStudy) notFound();
  const reference = references.find((item) => item.slug === caseStudy.referenceSlug);
  if (!reference) notFound();
  return { locale: locale as AppLocale, caseStudy, reference, copy: caseStudy.copy[locale] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = resolveCase(locale, slug);
  return pageMetadata({
    title: project.copy.metaTitle,
    description: project.copy.description,
    href: caseHrefFor(project.caseStudy),
    locale: project.locale,
    images: [`/references/${project.reference.slug}.webp`],
  });
}

const services: Record<AppLocale, Record<ReferenceService, string>> = {
  nl: { design: "Webdesign", development: "Ontwikkeling", seo: "SEO", copy: "Teksten", ecommerce: "E-commerce", booking: "Boekingsfunctionaliteit", branding: "Merkidentiteit" },
  en: { design: "Web design", development: "Development", seo: "SEO", copy: "Copywriting", ecommerce: "E-commerce", booking: "Booking functionality", branding: "Brand identity" },
};

export default async function Page({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const { locale, caseStudy, reference, copy } = resolveCase(rawLocale, slug);
  setRequestLocale(locale);
  const nl = locale === "nl";
  const image = `/references/${reference.slug}.webp`;
  const canonical = absoluteUrl(caseHrefFor(caseStudy), locale);
  const serviceLabel = caseStudy.serviceHref === "/webshop-op-maat"
    ? (nl ? "Een webshop op maat laten maken" : "Explore custom e-commerce development")
    : (nl ? "Een website op maat laten maken" : "Explore custom website development");
  const graph = jsonLdGraph([
    {
      "@type": "CreativeWork",
      "@id": `${canonical}#project`,
      name: copy.title,
      description: copy.description,
      url: canonical,
      inLanguage: nl ? "nl-BE" : "en",
      creator: { "@id": ORG_ID },
      about: { "@type": "WebSite", name: reference.name, url: reference.url },
      image: `${siteConfig.url}${image}`,
    },
    breadcrumbSchema([
      { name: "Brisk", url: absoluteUrl("/", locale) },
      { name: nl ? "Referenties" : "Work", url: absoluteUrl("/referenties", locale) },
      { name: reference.name, url: canonical },
    ]),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <Section className="pt-32 md:pt-44" innerClassName="max-w-[1500px]">
        <nav aria-label={nl ? "Broodkruimelpad" : "Breadcrumb"} className="mb-12 flex flex-wrap items-center gap-3 text-sm text-muted">
          <Link href="/" className="hover:text-fg">Brisk</Link>
          <span aria-hidden="true">/</span>
          <Link href="/referenties" className="hover:text-fg">{nl ? "Referenties" : "Work"}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-fg">{reference.name}</span>
        </nav>
        <Eyebrow>{nl ? "Project uit ons portfolio" : "From our portfolio"}</Eyebrow>
        <h1 className="mt-6 max-w-5xl text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">{copy.title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{copy.introduction}</p>
        <dl className="mt-10 grid gap-7 border-t border-line pt-7 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">{nl ? "Bedrijf" : "Business"}</dt>
            <dd className="mt-2 font-medium">{reference.name}</dd>
          </div>
          <div>
            <dt className="text-muted">{nl ? "Sector" : "Industry"}</dt>
            <dd className="mt-2 font-medium">{reference.industry[locale]}</dd>
          </div>
          <div>
            <dt className="text-muted">{nl ? "Dienstverlening" : "Project services"}</dt>
            <dd className="mt-2 font-medium">{reference.services.map((service) => services[locale][service]).join(" · ")}</dd>
          </div>
        </dl>
        <figure className="mt-12">
          <Image src={image} alt={copy.screenshotAlt} width={1600} height={1000} sizes="(max-width: 767px) 100vw, 90vw" className="h-auto w-full rounded-2xl border border-line" />
          <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{copy.screenshotCaption}</figcaption>
        </figure>
        <a href={reference.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-fg/30 pb-1 text-sm font-medium hover:text-accent">
          {nl ? `Bezoek ${reference.domain}` : `Visit ${reference.domain}`}<ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </Section>
      <Section theme="light">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Eyebrow>{nl ? "Het project toegelicht" : "A closer look"}</Eyebrow>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{nl ? "De zichtbare keuzes, de vastgelegde dienstverlening en wat je uit dit voorbeeld kunt meenemen." : "The visible decisions, documented services and practical ideas you can take from this example."}</p>
          </div>
          <article className="max-w-3xl space-y-12" aria-label={nl ? "Projectbeschrijving" : "Project description"}>
            {copy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-relaxed text-muted md:text-lg">{paragraph}</p>)}
              </section>
            ))}
            <aside className="rounded-2xl border border-line p-6">
              <h2 className="text-base font-medium">{nl ? "Over de beschikbare projectgegevens" : "About the available project information"}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{copy.measurementNote}</p>
            </aside>
          </article>
        </div>
      </Section>
      <Section>
        <Eyebrow>{nl ? "Jouw volgende stap" : "Your next step"}</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight tracking-tight md:text-5xl">{nl ? "Welke vragen moet jouw website beantwoorden?" : "What questions should your website answer?"}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{nl ? "Vertel ons over je aanbod, je klanten en wat je website moet doen. We bekijken welk ontwerp en welke functionaliteit bij jouw project passen." : "Tell us about your offer, your customers and what your website needs to do. We can discuss the design and functionality that fit your project."}</p>
        <div className="mt-9 flex flex-wrap gap-5">
          <Link href="/gesprek-inplannen" className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-4 font-medium text-ink hover:bg-brand-2">{nl ? "Bespreek je project" : "Discuss your project"}<ArrowRight className="size-4" aria-hidden="true" /></Link>
          <Link href={caseStudy.serviceHref} className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-4 font-medium hover:border-fg/60">{serviceLabel}<ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <Link href="/referenties" className="mt-9 inline-block text-sm text-muted underline underline-offset-4 hover:text-fg">{nl ? "Bekijk alle referenties" : "View all projects"}</Link>
      </Section>
    </>
  );
}
