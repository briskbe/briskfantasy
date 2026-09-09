import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SERVICES: { key: "websites" | "webshops" | "apps"; href: AppPathname }[] = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
];

/**
 * Page-local variant of the shared `OtherServices` block.
 *
 * The shared version renders three `min-h-40` boxes that hold a number and a
 * title, which leaves ~100px of empty card on every viewport, and it is dark —
 * which would put four dark sections (FAQ, this, CtaBand, Footer) back to back.
 * This one is light, content-sized, and each row carries a one-line descriptor.
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
          {SERVICES.map((s, i) => (
            <RevealItem key={s.key}>
              <Link
                href={s.href}
                data-cursor-label={tc(`services.${s.key}.short`)}
                className="group block border-t border-line py-6 lg:py-8 lg:pr-8"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">0{i + 1}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </span>
                <span className="text-h4 mt-6 block lg:mt-10">{tc(`services.${s.key}.title`)}</span>
                <span className="mt-2 block max-w-sm text-[0.95rem] text-muted text-pretty">{t(`otherServices.${s.key}`)}</span>
                <span className="mt-5 block h-px w-0 bg-amber transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:w-full" aria-hidden />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
