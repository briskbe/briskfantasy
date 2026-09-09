import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const SERVICES: { key: "websites" | "webshops" | "software" | "apps"; href: StaticAppPathname }[] = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "software", href: "/software-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
];

/** Cross-links to the other three service pages. Pass the current service key to exclude it. */
export async function OtherServices({ current }: { current?: "websites" | "webshops" | "software" | "apps" }) {
  const t = await getTranslations("Common");
  const items = SERVICES.filter((s) => s.key !== current);
  return (
    <section className="theme-dark bg-ink text-paper">
      <div className="container-x section-y-sm">
        <Eyebrow>{t("otherServices.eyebrow")}</Eyebrow>
        <h2 className="text-h3 mt-4">{t("otherServices.title")}</h2>
        <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {items.map((s, i) => (
            <RevealItem key={s.key}>
              <Link
                href={s.href}
                data-cursor-label="→"
                className="group flex h-full min-h-40 flex-col justify-between bg-ink-2 p-6 transition-colors hover:bg-ink-3"
              >
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">0{i + 1}</span>
                <span className="flex items-end justify-between gap-4">
                  <span className="text-h4">{t(`services.${s.key}.title`)}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
