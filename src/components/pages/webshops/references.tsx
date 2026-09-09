import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import type { AppLocale } from "@/i18n/routing";
import type { Reference } from "@/data/references";
import { ShopReferenceCard } from "./reference-card";
import { SectionIntro } from "./section-intro";

/**
 * Light section: the webshops and ordering platforms we built, as large live
 * cards. Paper under the browser frames breaks the dark run between the checkout
 * story and the rest of the page.
 */
export async function ShopReferences({ items }: { items: Reference[] }) {
  const t = await getTranslations("Webshops");
  const locale = (await getLocale()) as AppLocale;

  return (
    <Section theme="light" id="referenties" className="scroll-mt-24">
      <SectionIntro index={3} eyebrow={t("references.eyebrow")} title={t("references.title")} lead={t("references.intro")}>
        <Link href="/referenties" data-cursor="link" className="group inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-fg">
          <span className="relative">
            {t("references.all")}
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
          </span>
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </Link>
      </SectionIntro>

      <ul className="mt-16 grid gap-x-8 gap-y-16 lg:mt-20 lg:grid-cols-2" role="list">
        {items.map((r, i) => (
          <ShopReferenceCard
            key={r.slug}
            index={i}
            slug={r.slug}
            url={r.url}
            name={r.name}
            type={t(`references.types.${r.type === "platform" ? "platform" : "webshop"}`)}
            industry={r.industry[locale]}
            blurb={r.blurb[locale]}
            alt={t("references.shotAlt", { name: r.name })}
            visitLabel={t("references.visit")}
            newTabLabel={t("references.newTab")}
          />
        ))}
      </ul>
    </Section>
  );
}
