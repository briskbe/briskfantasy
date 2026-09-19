import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { markets, marketPath, marketAlternates, legacyMarketPaths } from "@/data/markets";
import type { MarketContent, MarketPage, MarketPageId } from "@/data/markets/types";
import { references } from "@/data/references";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, faqSchema, jsonLdGraph, ORG_ID, serviceSchema } from "@/lib/seo";

export type MarketRouteProps = { params: Promise<{ slug?: string[] }> };

export function resolveMarketPage(market: MarketContent, slug?: string[]): MarketPage {
  if (slug && slug.length !== 1) notFound();
  const page = market.pages.find((item) => item.slug === (slug?.[0] ?? ""));
  if (!page) notFound();
  return page;
}

export function marketMetadata(market: MarketContent, page: MarketPage): Metadata {
  const url = siteConfig.url + marketPath(market, page.id);
  return {
    title: page.title.endsWith("Brisk") ? page.title : `${page.title} | Brisk`,
    description: page.description,
    alternates: { canonical: url, languages: marketAlternates(page.id) },
    openGraph: {
      type: "website", siteName: siteConfig.name, title: page.title, description: page.description,
      url, locale: market.ogLocale,
      images: [{ url: "/hero-poster.jpg", width: 1924, height: 1076, alt: "Brisk" }],
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/hero-poster.jpg"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

export function MarketLinks({ pageId = "home", label }: { pageId?: MarketPageId; label: string }) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
      <Link href={legacyMarketPaths[pageId]?.nl ?? "/"} hrefLang="nl-BE" className="underline underline-offset-4 hover:text-accent">België</Link>
      {markets.map((market) => <Link key={market.id} href={marketPath(market, pageId)} hrefLang={market.language} lang={market.language} className="underline underline-offset-4 hover:text-accent">{market.country}</Link>)}
    </nav>
  );
}

export function MarketPageView({ market, page }: { market: MarketContent; page: MarketPage }) {
  const url = siteConfig.url + marketPath(market, page.id);
  const isShop = page.id === "ecommerce";
  const projectSlugs = isShop
    ? ["legacycristal-com", "roetfilterkopen-com", "fileservicechiptuning-com"]
    : market.id === "de-DE"
      ? ["sanae-align-com", "city-housing-be", "landelijkglas-be"]
      : ["city-housing-be", "landelijkglas-be", "priveglas-be"];
  const projects = projectSlugs.flatMap((slug) => references.filter((r) => r.slug === slug));
  const crumbs = [{ name: market.labels.home, url: siteConfig.url + market.prefix }];
  if (page.id !== "home") crumbs.push({ name: page.nav, url });
  const formLabel = {
    "nl-NL": "Vul het contactformulier in",
    "fr-FR": "Formulaire de contact en anglais",
    "de-DE": "Kontaktformular auf Englisch",
    "en-GB": "Use the contact form",
    "en-US": "Use the contact form",
  }[market.id];

  return (
    <>
      <JsonLd data={jsonLdGraph([
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: market.language, isPartOf: { "@id": `${siteConfig.url}/#website` }, about: { "@id": ORG_ID } },
        ...(["websites", "ecommerce", "redesign"].includes(page.id) ? [serviceSchema({ name: page.h1, description: page.description, url, areaServed: [market.countryEnglish] })] : []),
        crumbs.length > 1 ? breadcrumbSchema(crumbs) : null, faqSchema(page.faq),
      ])} />
      <section className="container-x pt-16 pb-20 sm:pt-24 sm:pb-28">
        <nav aria-label={market.labels.navigation} className="mb-12 flex flex-wrap gap-3 text-sm text-muted">
          <Link href={market.prefix} className="hover:text-accent">{market.country}</Link>
          {page.id !== "home" && <><span aria-hidden>/</span><span aria-current="page">{page.nav}</span></>}
        </nav>
        <p className="eyebrow text-accent">Brisk · {market.country}</p>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.75rem,6.5vw,6rem)] leading-[1.04] font-medium tracking-[-0.045em] text-balance">{page.h1}</h1>
        <p className="text-lead mt-8 max-w-3xl text-fg-2 text-pretty">{page.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#contact" className="inline-flex min-h-14 items-center gap-6 rounded-full bg-brand px-7 py-4 font-medium text-ink hover:bg-brand-2">{market.labels.contact}<ArrowUpRight className="size-5" aria-hidden /></a>
          <a href="#projects" className="py-3 underline underline-offset-8 hover:text-accent">{market.labels.projects}</a>
        </div>
        <p className="mt-8 max-w-2xl text-sm text-muted">{market.labels.basedIn}</p>
      </section>

      <section className="theme-light bg-bg text-fg section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
          <aside>
            <nav aria-label={market.labels.onThisPage} className="lg:sticky lg:top-8">
              <p className="eyebrow text-muted">{market.labels.onThisPage}</p>
              <ol className="mt-6 space-y-4">
                {page.sections.map((section, i) => <li key={section.heading}><a href={`#section-${i + 1}`} className="flex gap-4 text-sm hover:text-accent">{section.heading}</a></li>)}
              </ol>
            </nav>
          </aside>
          <div className="space-y-14">
            {page.sections.map((section, i) => <section key={section.heading} id={`section-${i + 1}`} className="scroll-mt-8">
              <h2 className="text-h3 text-balance">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-body leading-relaxed text-fg-2">{paragraph}</p>)}
              {section.bullets && <ul className="mt-6 space-y-3 border-l-2 border-accent pl-6 text-fg-2">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>)}
          </div>
        </div>
      </section>

      <section id="projects" className="container-x section-y">
        <p className="eyebrow text-accent">Brisk</p>
        <h2 className="text-h2 mt-5">{market.labels.projects}</h2>
        <p className="mt-6 max-w-2xl text-body text-muted">{market.labels.projectsIntro}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {projects.map((project) => <a key={project.slug} href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-ink-2"><Image src={`/references/${project.slug}.webp`} alt={project.name} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" /></div>
            <h3 className="mt-5 flex items-center justify-between gap-4 text-xl">{project.name}<ArrowUpRight className="size-5 text-accent" aria-hidden /></h3>
            <p className="mt-2 text-sm text-muted">{market.labels.viewProject} · {project.domain}</p>
          </a>)}
        </div>
      </section>

      <section className="theme-light bg-bg text-fg section-y">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <h2 className="text-h2 max-w-lg">{market.labels.faq}</h2>
          <div className="border-t border-line">{page.faq.map(({ question, answer }) => <details key={question} className="group border-b border-line py-6"><summary className="cursor-pointer text-lg font-medium">{question}</summary><p className="mt-4 text-body text-fg-2">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="container-x section-y">
        <h2 className="text-h3">{market.labels.related}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{market.pages.filter((p) => p.id !== page.id && p.id !== "home").map((related) => <Link key={related.id} href={marketPath(market, related.id)} className="flex items-center justify-between gap-5 rounded-xl border border-line p-6 hover:border-accent"><span>{related.nav}</span><ArrowUpRight className="size-5 shrink-0 text-accent" aria-hidden /></Link>)}</div>
      </section>

      <section id="contact" className="bg-brand text-ink">
        <div className="container-x section-y">
          <h2 className="text-h2 max-w-3xl">{market.labels.contact}</h2>
          <p className="mt-6 max-w-2xl text-body">{market.labels.contactIntro}</p>
          <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${market.country} — ${page.nav}`)}`} className="mt-8 inline-flex min-h-14 items-center gap-6 rounded-full bg-ink px-7 py-4 text-paper">{market.labels.email}<ArrowUpRight className="size-5" aria-hidden /></a>
          <Link href={market.id === "nl-NL" ? "/gesprek-inplannen" : "/en/book-a-call"} className="mt-6 block w-fit py-3 underline underline-offset-4">{formLabel}</Link>
        </div>
      </section>
      <div className="container-x py-10"><p className="eyebrow mb-5 text-muted">{market.labels.markets}</p><MarketLinks label={market.labels.markets} pageId={page.id} /></div>
    </>
  );
}
