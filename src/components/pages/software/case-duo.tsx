import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import type { Reference } from "@/data/references";
import { cn } from "@/lib/utils";

const SPECS = ["1", "2", "3", "4"] as const;

/** Dark section: two platform references side by side, the second one offset for an editorial stagger. */
export async function CaseDuo({ items }: { items: Reference[] }) {
  const t = await getTranslations("Software");
  const locale = (await getLocale()) as "nl" | "en";

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="software-case-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-sky absolute right-[-20%] top-[-10%] h-[60vh] w-[60vw] opacity-20" />
      </div>
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={2}>{t("cases.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-case-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
                {t.rich("cases.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("cases.intro")}</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
          {items.map((r, i) => (
            <Reveal key={r.slug} as="li" delay={i * 0.1} amount={0.2} className={cn(i === 1 && "lg:mt-28")}>
              <article className="group">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-label={t("cases.visit")}
                  aria-label={`${t("cases.visit")}: ${r.name}`}
                  className="block rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1"
                >
                  <MicrolinkShot
                    url={r.url}
                    slug={r.slug}
                    alt={t("cases.shotAlt", { name: r.name })}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]"
                    imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                </a>

                <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{r.industry[locale]}</p>
                    <h3 className="text-h3 mt-2">{r.name}</h3>
                    <p className="text-body mt-4 max-w-md text-muted text-pretty">{r.blurb[locale]}</p>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="link"
                      className="group/link mt-6 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-fg"
                    >
                      <span className="relative">
                        {t("cases.visit")}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100" />
                      </span>
                      <ArrowUpRight className="size-4 text-muted transition-all duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-amber" />
                      <span className="sr-only">{r.domain}</span>
                    </a>
                  </div>

                  <dl className="sm:min-w-44">
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{t("cases.builtLabel")}</dt>
                    {SPECS.map((s, si) => (
                      <dd key={s} className="flex items-center gap-3 border-b border-line py-2.5 text-[0.9rem] text-fg-2 first-of-type:mt-3 first-of-type:border-t">
                        <span className="font-mono text-[0.62rem] tracking-[0.16em] text-amber">0{si + 1}</span>
                        {t(`cases.specs.${s}`)}
                      </dd>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
