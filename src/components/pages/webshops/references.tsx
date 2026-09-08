import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import type { AppLocale } from "@/i18n/routing";
import type { Reference } from "@/data/references";
import { ShopReferenceCard } from "./reference-card";

/** Dark section: the webshops and ordering platforms we built, as large live cards. */
export async function ShopReferences({ items }: { items: Reference[] }) {
  const t = await getTranslations("Webshops");
  const locale = (await getLocale()) as AppLocale;

  return (
    <Section id="referenties" className="scroll-mt-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index={3}>{t("references.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-h2 mt-5 max-w-[16ch] text-balance">{t("references.title")}</h2>
          </Reveal>
        </div>
        <Reveal delay={0.16} className="lg:col-span-5 lg:pb-2">
          <p className="text-lead max-w-lg text-muted text-pretty">{t("references.intro")}</p>
          <Link
            href="/referenties"
            data-cursor="link"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-fg"
          >
            <span className="relative">
              {t("references.all")}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

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
          />
        ))}
      </ul>
    </Section>
  );
}
