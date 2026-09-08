import { getLocale, getTranslations } from "next-intl/server";
import { referencesByType } from "@/data/references";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { ReferenceCard } from "./reference-card";
import { WebsitesShowreel } from "./showreel";

/** Dark section: the Remotion showreel plus a grid of every live website. */
export async function WebsiteReferences() {
  const t = await getTranslations("Websites");
  const locale = (await getLocale()) as "nl" | "en";
  const sites = referencesByType("website");
  const reelShots = sites
    .filter((r) => r.featured)
    .concat(sites.filter((r) => !r.featured))
    .slice(0, 4)
    .map((r) => ({ src: `/references/${r.slug}.webp`, domain: r.domain, name: r.name }));

  return (
    <section
      id="referenties"
      className="theme-dark relative bg-ink text-paper section-y scroll-mt-24"
      aria-labelledby="websites-refs-title"
    >
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index={3}>{t("references.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="websites-refs-title" className="text-h2 mt-5 text-balance">
                {t.rich("references.title", { ...richTags, count: sites.length })}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-md text-muted text-pretty">{t("references.intro")}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <WebsitesShowreel shots={reelShots} label={t("references.reelLabel")} />
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {sites.map((r, i) => (
            <ReferenceCard
              key={r.slug}
              index={i}
              wide={i === sites.length - 1 && sites.length % 3 === 1}
              slug={r.slug}
              url={r.url}
              name={r.name}
              industry={r.industry[locale]}
              blurb={r.blurb[locale]}
              alt={t("references.shotAlt", { name: r.name })}
              visitLabel={t("references.visit")}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
