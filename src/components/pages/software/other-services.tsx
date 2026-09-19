import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SERVICES: { key: "websites" | "webshops" | "apps"; href: StaticAppPathname }[] = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
];

/**
 * Page-local variant of the shared `OtherServices` block.
 *
 * This version uses a light background between dark sections and gives each
 * service link a short description.
 */
export async function SoftwareOtherServices() {
  const tc = await getTranslations("Common");
  const t = await getTranslations("Software");

  return (
    <section className="theme-light bg-bg text-fg" aria-labelledby="software-other-title">
      <div className="container-x section-y-sm">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <Eyebrow tone="muted">{tc("otherServices.eyebrow")}</Eyebrow>
            <h2 id="software-other-title" className="text-h3 mt-4">
              {tc("otherServices.title")}
            </h2>
          </div>
        </div>

        <RevealGroup className="mt-10 grid lg:grid-cols-3 lg:gap-x-8" stagger={0.08}>
          {SERVICES.map((s) => (
            <RevealItem key={s.key}>
              <Link
                href={s.href}
                data-cursor-label={tc(`services.${s.key}.short`)}
                className="group block border-t border-line py-6 lg:py-8 lg:pr-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-h4">{tc(`services.${s.key}.title`)}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </span>
                <span className="mt-2 block max-w-sm text-[0.95rem] text-muted text-pretty">{t(`otherServices.${s.key}`)}</span>
                <span className="mt-5 block h-px w-0 bg-brand transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" aria-hidden />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
