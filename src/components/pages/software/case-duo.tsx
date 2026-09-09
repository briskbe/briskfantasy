import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import type { Reference } from "@/data/references";
import { cn } from "@/lib/utils";
import { CaseShot } from "./case-shot";

const CASES = ["1", "2"] as const;
const SPECS = ["1", "2", "3"] as const;

/**
 * Dark section: the two platforms as two mirrored editorial rows (7 columns of
 * screenshot against 4 columns of copy, sides swapped on the second row) so the
 * pair reads as two cases rather than one card duplicated.
 */
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

        <ul className="mt-16 grid gap-y-20 lg:mt-24 lg:gap-y-32">
          {items.map((r, i) => {
            const k = CASES[i] ?? "1";
            const mirrored = i % 2 === 1;
            return (
              <Reveal key={r.slug} as="li" amount={0.15} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-12">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-label={t("cases.visit")}
                  aria-label={`${t("cases.visit")}: ${r.name}`}
                  className={cn(
                    "block rounded-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1 lg:col-span-7",
                    mirrored ? "lg:col-start-6 lg:row-start-1" : "lg:col-start-1",
                  )}
                >
                  <CaseShot
                    url={r.url}
                    slug={r.slug}
                    alt={t("cases.shotAlt", { name: r.name })}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]"
                  />
                </a>

                <div className={cn("lg:col-span-4", mirrored ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9")}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">{r.industry[locale]}</p>
                  <h3 className="text-h3 mt-3">{r.name}</h3>
                  <p className="text-body mt-4 max-w-md text-muted text-pretty">{r.blurb[locale]}</p>

                  <dl className="mt-8 border-t border-line">
                    <dt className="sr-only">{t("cases.builtLabel")}</dt>
                    {SPECS.map((s, si) => (
                      <dd key={s} className="flex items-center gap-4 border-b border-line py-2.5 text-[0.92rem] text-fg-2">
                        <span className="font-mono text-[0.64rem] tracking-[0.16em] text-muted">0{si + 1}</span>
                        {t(`cases.items.${k}.specs.${s}`)}
                      </dd>
                    ))}
                  </dl>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="link"
                    className="group/link mt-7 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-fg"
                  >
                    <span className="relative">
                      {t("cases.visit")}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100" />
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition-all duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-fg" />
                    <span className="sr-only">
                      {r.domain} {t("cases.newTab")}
                    </span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
