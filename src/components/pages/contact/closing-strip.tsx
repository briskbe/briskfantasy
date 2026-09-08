import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";

/** Slim dark strip that closes the page instead of the CTA band (which would loop back here). */
export async function ClosingStrip() {
  const t = await getTranslations("Contact.closing");
  const locale = (await getLocale()) as "nl" | "en";

  return (
    <section className="theme-dark relative overflow-hidden border-t border-line bg-ink text-paper" aria-label={t("eyebrow")}>
      <div className="pointer-events-none absolute -bottom-32 left-[15%] h-64 w-[40rem] glow-amber opacity-20 blur-3xl" aria-hidden />
      <Reveal className="container-x relative grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="eyebrow text-amber">{t("eyebrow")}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group mt-5 inline-flex items-baseline gap-3 text-h2 tracking-[-0.03em] text-fg"
            data-cursor="link"
          >
            <span className="relative">
              {siteConfig.email}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-amber transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="size-[0.6em] shrink-0 self-center text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber" />
          </a>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:gap-8">
          <div>
            <dt className="eyebrow text-muted">{t("locationLabel")}</dt>
            <dd className="mt-3 text-[1.05rem] tracking-[-0.01em] text-fg">{siteConfig.location[locale]}</dd>
          </div>
          <div>
            <dt className="sr-only">{t("eyebrow")}</dt>
            <dd className="text-[1.05rem] tracking-[-0.01em] text-muted sm:mt-[calc(0.72rem+0.75rem)]">{t("note")}</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
