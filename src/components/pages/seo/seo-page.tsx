import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { GoogleRating } from "@/components/ui/google-rating";
import type { Faq } from "@/data/seo/content/types";
import { cn } from "@/lib/utils";

/**
 * Shared furniture for the SEO landing pages.
 *
 * These pages have to do two jobs at once: rank, and convince a person who
 * landed from a search. So they use the same type scale, rhythm and CTA as the
 * rest of the site rather than looking like a separate SEO annex.
 */

export function SeoHero({
  eyebrow,
  h1,
  lead,
  breadcrumbs,
  ctaLabel,
  secondary,
}: {
  eyebrow: string;
  h1: ReactNode;
  lead: string;
  breadcrumbs: { name: string; href: string }[];
  ctaLabel: string;
  secondary?: ReactNode;
}) {
  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[620px] glow-brand opacity-20" aria-hidden />
      <div className="container-x relative pt-36 pb-16 sm:pt-40 lg:pb-24">
        {/* Visible breadcrumbs, matching the BreadcrumbList structured data */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
            {breadcrumbs.map((b, i) => (
              <li key={b.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page" className="text-fg/70">{b.name}</span>
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- href is a validated internal route key
                  <Link href={b.href as any} className="transition-colors hover:text-fg">
                    {b.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="text-h1 mt-5 text-balance">{h1}</h1>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lead text-paper/80 text-pretty">{lead}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/gesprek-inplannen" size="lg">
                {ctaLabel}
              </Button>
              <GoogleRating />
            </div>
          </Reveal>
        </div>
        {secondary}
      </div>
    </section>
  );
}

/** The body copy. Long-form is the point of these pages, so it gets a real reading measure. */
export function SeoSections({ sections }: { sections: { heading: string; body: string[] }[] }) {
  return (
    <Section theme="light">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.04} className={cn(i > 0 && "mt-14 border-t border-line pt-14")}>
              <h2 className="text-h3 text-balance">{s.heading}</h2>
              <div className="mt-5 space-y-4">
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)} className="text-body max-w-[62ch] text-fg-2 text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function SeoChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <Section theme="light" padded={false} className="pb-[clamp(5rem,10vw,11rem)]">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <div className="rounded-2xl border border-line bg-bg-2 p-8 sm:p-10">
            <h2 className="text-h4">{title}</h2>
            <RevealGroup className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {items.map((item) => (
                <RevealItem key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="text-body text-fg-2">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}

/**
 * FAQ built on <details>, so every answer is in the HTML with no JavaScript.
 * That matters here: the same questions and answers are emitted as FAQPage
 * structured data, and Google has to be able to match them to visible text.
 */
export async function SeoFaq({ faq, title }: { faq: Faq[]; title?: string }) {
  const t = await getTranslations("Common");
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t("seo.faqEyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{title ?? t("seo.faqTitle")}</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faq.map((item) => (
              <li key={item.question} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-h4 text-balance">{item.question}</h3>
                    <span
                      aria-hidden
                      className="relative mt-1 size-4 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                    </span>
                  </summary>
                  <p className="text-body max-w-[62ch] pb-7 text-muted text-pretty">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/**
 * Internal links out of the page. Crawl paths matter as much as copy: an
 * orphaned landing page is one Google has to guess its way to.
 */
export async function SeoLinkGrid({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string;
  title: string;
  links: { label: string; sub?: string; href: string; params?: Record<string, string> }[];
}) {
  return (
    <Section theme="light">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h3 mt-4 text-balance">{title}</h2>
      <RevealGroup className="mt-10 -ml-px -mt-px grid grid-cols-1 overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <RevealItem key={`${l.href}-${l.label}`} className="border-l border-t border-line">
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- href/params come from the routing table
              href={(l.params ? { pathname: l.href, params: l.params } : l.href) as any}
              className="group flex h-full min-h-28 flex-col justify-between gap-4 bg-bg p-6 transition-colors hover:bg-bg-2"
            >
              <span className="text-[1.05rem] font-medium tracking-[-0.02em] text-balance">{l.label}</span>
              <span className="flex items-end justify-between gap-3">
                {l.sub && <span className="text-[0.85rem] text-muted">{l.sub}</span>}
                <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
