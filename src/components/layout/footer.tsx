import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import { richTags } from "@/components/ui/rich";
import { Button } from "@/components/ui/button";
import { BackToTop } from "./back-to-top";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as "nl" | "en";
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 glow-amber opacity-30" aria-hidden />
      <div className="container-x relative">
        <div className="grid gap-12 border-t border-line pt-20 pb-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="text-h2 max-w-xl text-balance">{t.rich("tagline", richTags)}</p>
            <p className="mt-6 max-w-md text-body text-muted">{t("body")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/gesprek-inplannen" size="lg">
                {t("links.contact")}
              </Button>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-2 text-fg/80 underline-offset-6 hover:text-fg hover:underline"
              >
                {siteConfig.email}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            <div>
              <p className="eyebrow text-muted mb-5">{t("columns.services")}</p>
              <ul className="space-y-3 text-[0.95rem]">
                <li><Link className="hover:text-amber transition-colors" href="/website-op-maat">{t("links.websites")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/webshop-op-maat">{t("links.webshops")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/software-op-maat">{t("links.software")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/mobiele-apps">{t("links.apps")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted mb-5">{t("columns.company")}</p>
              <ul className="space-y-3 text-[0.95rem]">
                <li><Link className="hover:text-amber transition-colors" href="/referenties">{t("links.references")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/over-ons">{t("links.about")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/gesprek-inplannen">{t("links.contact")}</Link></li>
                <li><Link className="hover:text-amber transition-colors" href="/privacy">{t("links.privacy")}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow text-muted mb-5">{t("columns.contact")}</p>
              <ul className="space-y-3 text-[0.95rem]">
                <li>
                  <a className="hover:text-amber transition-colors" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </li>
                <li className="text-muted">{siteConfig.location[locale]}</li>
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a className="hover:text-amber transition-colors" href={s.href} target="_blank" rel="noreferrer noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center gap-2 text-[0.8rem] text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {t("status")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("legal", { year })}</p>
          <p>{t("madeIn")}</p>
          <BackToTop label={t("backToTop")} />
        </div>
      </div>

      <div className="container-x relative select-none" aria-hidden>
        <div className="mask-fade-b overflow-hidden">
          <p className="translate-y-[18%] text-center text-[clamp(6rem,24vw,26rem)] font-medium leading-none tracking-[-0.06em] text-paper/[0.06]">
            Brisk<span className="text-amber/40">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
