import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";

/**
 * Light closing band: the direct route (mail) next to the two things people
 * still ask at this point. No CTA band here — it would link back to this page.
 */
export async function Closing() {
  const t = await getTranslations("Contact.closing");
  const locale = (await getLocale()) as "nl" | "en";

  return (
    <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-7">
        <Eyebrow tone="muted">{t("eyebrow")}</Eyebrow>
        <a
          href={`mailto:${siteConfig.email}`}
          className="group mt-6 flex items-baseline gap-3 text-h2 tracking-[-0.035em] text-fg"
          data-cursor="link"
        >
          <span className="relative">
            {siteConfig.email}
            <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-amber transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
          </span>
          <ArrowUpRight className="size-[0.5em] shrink-0 self-center text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <p className="text-body mt-7 max-w-md text-muted text-pretty">{t("note")}</p>
      </div>

      <dl className="divide-y divide-line border-y border-line lg:col-span-4 lg:col-start-9 lg:self-end">
        <div className="py-6">
          <dt className="text-[1.05rem] font-medium tracking-[-0.01em] text-fg">{t("briefTitle")}</dt>
          <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted text-pretty">
            {t("briefBody")}{" "}
            <a href="#formulier" className="text-fg underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-amber">
              {t("briefLink")}
            </a>
          </dd>
        </div>
        <div className="py-6">
          <dt className="eyebrow text-muted">{t("locationLabel")}</dt>
          <dd className="mt-3 text-[1.05rem] tracking-[-0.01em] text-fg">{siteConfig.location[locale]}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
