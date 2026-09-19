import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { richTags } from "@/components/ui/rich";
import { siteConfig } from "@/data/site";
import { SocialProof } from "@/components/ui/google-rating";
import { HomeHeroMedia } from "./hero-media";

const SERVICE_LINKS: { key: "websites" | "webshops" | "software" | "apps"; href: StaticAppPathname }[] = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "software", href: "/software-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
];

/** The entire message is visible in the first HTML, before any client effects. */
export async function HomeHero() {
  const t = await getTranslations("Home.hero");

  return (
    <section className="theme-dark relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <HomeHeroMedia src={siteConfig.heroVideo}>
        <Image
          src={siteConfig.heroPoster}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[68%_center] brightness-95 saturate-[0.42] sm:object-center"
        />
      </HomeHeroMedia>
      {/* The poster and film share this fixed layer, so playback cannot move content. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34%] bg-gradient-to-b from-ink/80 via-ink/30 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink-2/30 mix-blend-color" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-12 pt-40 sm:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <p className="eyebrow inline-flex items-center gap-3 text-paper/70">
              <span className="size-1.5 rounded-full bg-paper/40" aria-hidden />
              {t("eyebrow")}
            </p>
            <h1 id="hero-title" className="text-display mt-6 max-w-[11ch] text-balance">
              <span className="block pb-[0.08em] -mb-[0.08em]">{t("titleLine1")}</span>{" "}
              <span className="block pb-[0.08em] -mb-[0.08em]">{t.rich("titleLine2", richTags)}</span>
            </h1>
            <p className="text-lead mt-8 max-w-xl text-paper/80 text-pretty">{t("lead")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button href="/gesprek-inplannen" size="lg" className="min-w-[13.5rem] sm:min-w-0">
                {t("ctaPrimary")}
              </Button>
              <Button href="/referenties" variant="secondary" size="lg" icon="up-right" className="min-w-[13.5rem] sm:min-w-0">
                {t("ctaSecondary")}
              </Button>
            </div>

            <SocialProof className="mt-8" />
          </div>

          <div className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end">
            <nav aria-label={t("navLabel")}>
              <ul className="flex flex-col items-end">
                {SERVICE_LINKS.map((service) => (
                  <li key={service.key}>
                    <Link
                      href={service.href}
                      className="group inline-flex min-h-10 items-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper"
                    >
                      <span className="relative">
                        {t(`links.${service.key}`)}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex items-center gap-3" aria-hidden>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper/50">{t("scroll")}</span>
              <span className="relative block h-12 w-px overflow-hidden bg-paper/15">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-paper/70" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
