import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { HomeHero } from "@/components/pages/home/hero";
import { TrustBand } from "@/components/pages/home/trust-band";
import { ServicesRows } from "@/components/pages/home/services-rows";
import { SelectedWork } from "@/components/pages/home/selected-work";
import { InMotion } from "@/components/pages/home/in-motion";
import { ProductStrip } from "@/components/pages/home/product-strip";
import { Process } from "@/components/pages/home/process";
import { WhyBrisk } from "@/components/pages/home/why-brisk";
import { featuredReferences, references } from "@/data/references";
import { portfolio } from "@/data/portfolio";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const shots = featuredReferences.slice(0, 6).map((r) => ({ src: `/references/${r.slug}.webp`, domain: r.domain, name: r.name }));
  const screens = Math.max(50, Math.floor(portfolio.length / 10) * 10);

  return (
    <>
      {/* 1. Hero */}
      <HomeHero />

      {/* 2. Trust band */}
      <TrustBand />

      {/* 3. Services */}
      <Section theme="light" id="services">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{t("services.eyebrow")}</Eyebrow>
            <h2 className="text-h1 mt-5 text-balance">{t("services.title")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("services.lead")}</p>
          </Reveal>
        </div>
        <div className="mt-14 lg:mt-20">
          <ServicesRows />
        </div>
      </Section>

      {/* 4. Selected work */}
      <Section id="work">
        <SelectedWork />
      </Section>

      {/* 5. In motion */}
      <Section className="overflow-hidden pt-0" padded={false} innerClassName="pb-[clamp(5rem,10vw,11rem)]">
        <div className="mx-auto mb-12 max-w-6xl lg:mb-16">
          <Reveal className="grid gap-4 border-t border-line pt-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Eyebrow>{t("motion.eyebrow")}</Eyebrow>
              <h2 className="text-h3 mt-4">{t("motion.title")}</h2>
            </div>
            <p className="text-body max-w-md text-muted lg:col-span-5 lg:col-start-8">{t("motion.body")}</p>
          </Reveal>
        </div>
        <InMotion shots={shots} />
      </Section>

      {/* 6. Product design */}
      <section className="theme-light relative bg-bg text-fg" id="product-design">
        <ProductStrip />
      </section>

      {/* 7. Process */}
      <Section id="process">
        <Process />
      </Section>

      {/* 8. Why Brisk */}
      <Section theme="light" id="why">
        <WhyBrisk liveSites={references.length} screens={screens} />
      </Section>

      {/* 9. Closing CTA */}
      <CtaBand />
    </>
  );
}
