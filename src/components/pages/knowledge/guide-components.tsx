import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { clusterBySlug, clusterSlugFor } from "@/data/seo/clusters";
import { guideHrefFor, guideReadingMinutes, type Guide, type GuideCopy } from "@/data/seo/guides";

export function GuideBreadcrumbs({ locale, title }: { locale: AppLocale; title?: string }) {
  const hub = locale === "nl" ? "Kennisbank" : "Guides";
  return (
    <nav aria-label={locale === "nl" ? "Kruimelpad" : "Breadcrumb"} className="mb-10">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
        <li><Link href="/" className="transition-colors hover:text-fg">Home</Link></li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {title ? (
            <Link href="/kennisbank" className="transition-colors hover:text-fg">{hub}</Link>
          ) : (
            <span aria-current="page" className="text-fg/80">{hub}</span>
          )}
        </li>
        {title && (
          <li className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-fg/80">{title}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}

export function GuideCards({ items, locale }: { items: Guide[]; locale: AppLocale }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((guide) => {
        const copy = guide.copy[locale];
        return (
          <article key={guide.id} className="group flex flex-col rounded-2xl border border-line bg-bg-2 p-7 sm:p-9">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Eyebrow>{copy.category}</Eyebrow>
              <span className="font-mono text-xs text-muted">
                {guideReadingMinutes(copy)} {locale === "nl" ? "min leestijd" : "min read"}
              </span>
            </div>
            <h2 className="text-h4 text-balance">
              <Link href={guideHrefFor(guide)(locale)} className="transition-colors hover:text-accent">
                {copy.title}
              </Link>
            </h2>
            <p className="text-body mt-4 flex-1 text-fg-2">{copy.description}</p>
            <Link
              href={guideHrefFor(guide)(locale)}
              className="mt-7 inline-flex items-center gap-2 self-start text-sm font-medium text-fg underline decoration-line-2 underline-offset-4 transition-colors hover:text-accent"
              aria-label={`${locale === "nl" ? "Lees de gids" : "Read the guide"}: ${copy.title}`}
            >
              {locale === "nl" ? "Lees de gids" : "Read the guide"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

/** Plain server-rendered content stays readable before or without hydration. */
export function GuideBody({ copy, locale }: { copy: GuideCopy; locale: AppLocale }) {
  return (
    <Section theme="light">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:col-span-3">
          <nav aria-label={locale === "nl" ? "Inhoud van dit artikel" : "In this article"}>
            <p className="eyebrow text-muted">{locale === "nl" ? "In deze gids" : "In this guide"}</p>
            <ol className="mt-5 space-y-4 border-l border-line pl-5">
              {copy.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm leading-relaxed text-fg-2 transition-colors hover:text-accent">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {copy.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className={`scroll-mt-32 ${index > 0 ? "mt-14 border-t border-line pt-14" : ""}`}>
              <h2 id={`${section.id}-heading`} className="text-h3 text-balance">{section.heading}</h2>
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-body max-w-[66ch] text-fg-2">{paragraph}</p>
                ))}
              </div>
              {section.checklist && (
                <ul className="mt-7 space-y-4 rounded-2xl border border-line bg-bg-2 p-6 sm:p-8">
                  {section.checklist.map((item) => (
                    <li key={item} className="flex gap-3 text-body text-fg-2">
                      <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="mt-7 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full text-left text-sm leading-relaxed">
                    <caption className="border-b border-line bg-bg-2 px-5 py-4 text-left font-medium text-fg">
                      {section.table.caption}
                    </caption>
                    <thead className="bg-bg-2 text-fg">
                      <tr>{section.table.headers.map((header) => <th key={header} scope="col" className="px-5 py-4 font-medium">{header}</th>)}</tr>
                    </thead>
                    <tbody className="text-fg-2">
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-line">
                          {row.map((cell, cellIndex) => cellIndex === 0 ? (
                            <th key={cellIndex} scope="row" className="min-w-28 px-5 py-4 align-top font-medium text-fg">{cell}</th>
                          ) : (
                            <td key={cellIndex} className="px-5 py-4 align-top">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.sources && (
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {section.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-accent">{source.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function GuideNextSteps({ guide, locale }: { guide: Guide; locale: AppLocale }) {
  const isNl = locale === "nl";
  const services = guide.serviceSlugs.flatMap((slug) => {
    const cluster = clusterBySlug(slug);
    return cluster ? [cluster] : [];
  });

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Eyebrow>{isNl ? "Van voorbereiding naar uitvoering" : "From planning to delivery"}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{isNl ? "Vertaal de gids naar jouw website." : "Apply the guide to your website."}</h2>
          <p className="text-body mt-5 max-w-[58ch] text-fg-2">
            {isNl
              ? "Bekijk hoe Brisk websites op maat bouwt, vergelijk relevante projecten en bespreek welke keuzes bij jouw organisatie passen. Neem je briefing, bestaande website of open vragen mee."
              : "Explore how Brisk builds custom websites, review relevant projects and discuss the choices that fit your organisation. Bring your brief, existing website or questions."}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/website-op-maat" className="text-sm underline decoration-line-2 underline-offset-4 hover:text-accent">
              {isNl ? "Een website op maat laten maken" : "Custom website design and development"}
            </Link>
            <Link href="/referenties" className="text-sm underline decoration-line-2 underline-offset-4 hover:text-accent">
              {isNl ? "Bekijk onze referenties" : "Explore our website projects"}
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-bg-2 p-7 lg:col-span-4 lg:col-start-9">
          <h3 className="text-h4">{isNl ? "Aansluitende diensten" : "Related services"}</h3>
          <ul className="mt-5 space-y-4">
            {services.map((cluster) => (
              <li key={cluster.slug}>
                <Link href={{ pathname: "/diensten/[slug]", params: { slug: clusterSlugFor(cluster, locale) } }} className="flex items-center justify-between gap-4 text-sm text-fg-2 transition-colors hover:text-accent">
                  {cluster.keyword[locale]}
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7"><Button href="/gesprek-inplannen" magnetic={false}>{isNl ? "Bespreek je project" : "Discuss your project"}</Button></div>
        </div>
      </div>
    </Section>
  );
}
