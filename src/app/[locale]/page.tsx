import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { ClientWall } from "@/components/blocks/client-wall";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { MotionShell } from "@/components/pages/home/motion-shell";
import { HomeHero } from "@/components/pages/home/hero";
import { TrustBand } from "@/components/pages/home/trust-band";
import { ServicesRows } from "@/components/pages/home/services-rows";
import { SelectedWork } from "@/components/pages/home/selected-work";
import { ProductStrip } from "@/components/pages/home/product-strip";
import { Process } from "@/components/pages/home/process";
import { WhyBrisk } from "@/components/pages/home/why-brisk";
import { siteConfig } from "@/data/site";
import { yearsOfExperience } from "@/data/clients";
import { portfolio } from "@/data/portfolio";
import { pageMetadata } from "@/lib/seo";
import type { AppLocale } from "@/i18n/routing";

/** 53 screens today -> "50+". Rounded down to the nearest ten so the claim can never overstate. */
const screenCount = Math.max(50, Math.floor(portfolio.length / 10) * 10);

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return pageMetadata({
    title: t("meta.title"),
    description: t("meta.description", { total: siteConfig.projectsDelivered, years: yearsOfExperience() }),
    href: "/",
    locale: locale as AppLocale,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <MotionShell>
      {/* 1. Hero — dark */}
      <HomeHero />

      {/* 2. Trust band — dark */}
      <TrustBand screens={screenCount} />

      {/* 3. Who we work for — light. Placed directly under the hero because the
          client list is the strongest credibility signal on the site. */}
      <ClientWall />

      {/* 4. Services — light */}
      <Section theme="light" id="services">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{t("services.eyebrow")}</Eyebrow>
            <h2 className="text-h2 mt-5 text-balance">{t("services.title")}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty">{t("services.lead")}</p>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-16">
          <ServicesRows />
        </div>
      </Section>

      {/* 5. Selected work + the reel that closes it — dark */}
      <Section id="work">
        <SelectedWork />
      </Section>

      {/* 6. Product design — light */}
      {/* lg:min-h-screen reserves the sticky scroller's height in the server HTML, so the desktop
          upgrade from the native row does not shift the page on hydration. */}
      <section className="theme-light relative bg-bg text-fg lg:min-h-screen" id="product-design">
        <ProductStrip />
      </section>

      {/* 7. Process — dark */}
      <Section id="process">
        <Process />
      </Section>

      {/* 8. Why Brisk — light, so the page does not end on a dark run into the CTA band */}
      <Section theme="light" id="why">
        <WhyBrisk liveSites={siteConfig.projectsDelivered} screens={screenCount} />
      </Section>

      {/* 9. Closing CTA */}
      <CtaBand />
    </MotionShell>
  );
}
