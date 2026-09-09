/**
 * Keyword-cluster landing pages.
 *
 * The target keyword list contains a lot of synonyms: "website laten maken",
 * "website laten bouwen", "professionele website laten maken" and "zakelijke
 * website laten maken" are the same search intent. Google resolves them to one
 * result set, so they belong on ONE strong page, not four thin ones competing
 * with each other. Each entry below is a genuinely distinct intent that
 * deserves its own page; `related` lists the synonyms that page should also
 * catch, and they belong in the body copy as natural sentences.
 *
 * `parent` links the page back to the main service page, which is what carries
 * the head term. These pages support that page; they do not replace it.
 */
export type ServiceParent = "websites" | "webshops" | "software" | "apps";

export interface Cluster {
  /** Shared slug for both locales where the term is the same, otherwise per locale. */
  slug: string;
  slugEn?: string;
  parent: ServiceParent;
  /** The one keyword this page is built to win. */
  keyword: { nl: string; en: string };
  /** Synonyms and long-tail this page should also catch. */
  related: { nl: string[]; en: string[] };
  /** Commercial-intent pages (cost, quote) convert hardest — they get priority in the sitemap. */
  intent?: "service" | "pricing";
}

export const clusters: Cluster[] = [
  /* ------------------------------ Websites ------------------------------ */
  {
    slug: "wordpress-website-laten-maken",
    slugEn: "wordpress-website-development",
    parent: "websites",
    keyword: { nl: "WordPress website laten maken", en: "WordPress website development" },
    related: {
      nl: ["WordPress site laten bouwen", "WordPress website op maat", "WordPress webdesign bureau", "WordPress onderhoud"],
      en: ["build a WordPress site", "custom WordPress website", "WordPress agency", "WordPress maintenance"],
    },
  },
  {
    slug: "webflow-website-laten-maken",
    slugEn: "webflow-website-development",
    parent: "websites",
    keyword: { nl: "Webflow website laten maken", en: "Webflow website development" },
    related: {
      nl: ["Webflow bureau", "Webflow site laten bouwen", "Webflow developer inhuren"],
      en: ["Webflow agency", "build a Webflow site", "hire a Webflow developer"],
    },
  },
  {
    slug: "website-laten-vernieuwen",
    slugEn: "website-redesign",
    parent: "websites",
    keyword: { nl: "website laten vernieuwen", en: "website redesign" },
    related: {
      nl: ["website redesign laten uitvoeren", "bestaande website laten verbeteren", "website restylen", "verouderde website vervangen"],
      en: ["redesign an existing website", "improve an existing website", "website refresh"],
    },
  },
  {
    slug: "landingspagina-laten-maken",
    slugEn: "landing-page-development",
    parent: "websites",
    keyword: { nl: "landingspagina laten maken", en: "landing page development" },
    related: {
      nl: ["landingspagina laten bouwen", "campagnepagina laten maken", "conversiepagina laten maken"],
      en: ["build a landing page", "campaign page", "conversion page"],
    },
  },
  {
    slug: "meertalige-website-laten-maken",
    slugEn: "multilingual-website-development",
    parent: "websites",
    keyword: { nl: "meertalige website laten maken", en: "multilingual website development" },
    related: {
      nl: ["tweetalige website laten maken", "website in meerdere talen", "internationale website laten bouwen", "hreflang correct instellen"],
      en: ["bilingual website", "website in multiple languages", "international website", "hreflang setup"],
    },
  },
  {
    slug: "webdesign-bureau",
    slugEn: "web-design-agency",
    parent: "websites",
    keyword: { nl: "webdesign bureau", en: "web design agency" },
    related: {
      nl: ["website laten ontwerpen", "webdesigner inhuren", "professioneel webdesign", "website laten maken met CMS"],
      en: ["hire a web designer", "professional web design", "website with a CMS"],
    },
  },

  /* ------------------------------ Webshops ------------------------------ */
  {
    slug: "woocommerce-webshop-laten-maken",
    slugEn: "woocommerce-development",
    parent: "webshops",
    keyword: { nl: "WooCommerce webshop laten maken", en: "WooCommerce development" },
    related: {
      nl: ["WooCommerce webshop laten bouwen", "WooCommerce op maat", "WooCommerce bureau"],
      en: ["build a WooCommerce store", "custom WooCommerce", "WooCommerce agency"],
    },
  },
  {
    slug: "shopify-webshop-laten-maken",
    slugEn: "shopify-development",
    parent: "webshops",
    keyword: { nl: "Shopify webshop laten maken", en: "Shopify development" },
    related: {
      nl: ["Shopify bureau", "Shopify webshop laten bouwen", "Shopify thema op maat"],
      en: ["Shopify agency", "build a Shopify store", "custom Shopify theme"],
    },
  },
  {
    slug: "magento-shopware-webshop-laten-maken",
    slugEn: "magento-shopware-development",
    parent: "webshops",
    keyword: { nl: "Magento of Shopware webshop laten maken", en: "Magento and Shopware development" },
    related: {
      nl: ["Magento webshop laten maken", "Shopware webshop laten maken", "Adobe Commerce bureau", "enterprise webshop laten bouwen"],
      en: ["Magento development", "Shopware development", "Adobe Commerce agency", "enterprise ecommerce build"],
    },
  },
  {
    slug: "b2b-webshop-laten-maken",
    slugEn: "b2b-ecommerce-development",
    parent: "webshops",
    keyword: { nl: "B2B webshop laten maken", en: "B2B ecommerce development" },
    related: {
      nl: [
        "webshop voor groothandel laten maken",
        "webshop met klantportaal laten maken",
        "webshop met staffelprijzen",
        "B2C webshop laten maken",
        "webshop met abonnementen laten maken",
      ],
      en: ["wholesale webshop", "ecommerce with a customer portal", "tiered pricing", "B2C webshop", "subscription commerce"],
    },
  },
  {
    slug: "webshop-laten-migreren",
    slugEn: "ecommerce-migration",
    parent: "webshops",
    keyword: { nl: "webshop laten migreren", en: "ecommerce migration" },
    related: {
      nl: ["webshop laten vernieuwen", "webshop overzetten naar ander platform", "replatforming webshop", "webshop migratie zonder SEO-verlies"],
      en: ["migrate a webshop", "replatforming", "move to another ecommerce platform", "migration without losing rankings"],
    },
  },
  {
    slug: "e-commerce-bureau",
    slugEn: "ecommerce-agency",
    parent: "webshops",
    keyword: { nl: "e-commerce bureau", en: "ecommerce agency" },
    related: {
      nl: [
        "webshop ontwikkeling uitbesteden",
        "webshop met voorraadbeheer laten maken",
        "webshop met productconfigurator laten maken",
        "webshop met iDEAL laten maken",
        "webshop met Bancontact laten maken",
      ],
      en: ["outsource ecommerce development", "stock management", "product configurator", "iDEAL payments", "Bancontact payments"],
    },
  },

  /* ------------------------------ Software ------------------------------ */
  {
    slug: "saas-platform-laten-bouwen",
    slugEn: "saas-platform-development",
    parent: "software",
    keyword: { nl: "SaaS platform laten bouwen", en: "SaaS platform development" },
    related: {
      nl: ["SaaS laten ontwikkelen", "online platform laten bouwen", "abonnementsplatform laten maken", "marktplaats platform laten maken"],
      en: ["build a SaaS product", "online platform development", "subscription platform", "marketplace platform"],
    },
  },
  {
    slug: "mvp-laten-ontwikkelen",
    slugEn: "mvp-development",
    parent: "software",
    keyword: { nl: "MVP laten ontwikkelen", en: "MVP development" },
    related: {
      nl: ["MVP laten bouwen", "prototype laten maken", "startup software laten ontwikkelen", "eerste versie van een product bouwen"],
      en: ["build an MVP", "prototype development", "startup software", "first version of a product"],
    },
  },
  {
    slug: "webapplicatie-laten-maken",
    slugEn: "web-application-development",
    parent: "software",
    keyword: { nl: "webapplicatie laten maken", en: "web application development" },
    related: {
      nl: ["webapplicatie laten bouwen", "web app op maat", "browsergebaseerde software laten ontwikkelen"],
      en: ["build a web application", "custom web app", "browser-based software"],
    },
  },
  {
    slug: "crm-op-maat-laten-maken",
    slugEn: "custom-crm-development",
    parent: "software",
    keyword: { nl: "CRM systeem op maat laten maken", en: "custom CRM development" },
    related: {
      nl: ["CRM laten bouwen", "CRM koppeling laten maken", "klantbeheersysteem op maat", "salesopvolging automatiseren"],
      en: ["build a CRM", "CRM integration", "customer management system", "sales pipeline automation"],
    },
  },
  {
    slug: "erp-op-maat-laten-maken",
    slugEn: "custom-erp-development",
    parent: "software",
    keyword: { nl: "ERP systeem op maat laten maken", en: "custom ERP development" },
    related: {
      nl: [
        "ERP koppeling laten maken",
        "voorraadbeheersysteem laten maken",
        "ordermanagementsysteem laten bouwen",
        "bedrijfssoftware laten ontwikkelen",
      ],
      en: ["ERP integration", "inventory management system", "order management system", "business software development"],
    },
  },
  {
    slug: "boekingssysteem-laten-ontwikkelen",
    slugEn: "booking-system-development",
    parent: "software",
    keyword: { nl: "boekingssysteem laten ontwikkelen", en: "booking system development" },
    related: {
      nl: [
        "reserveringssysteem laten maken",
        "planningssoftware laten ontwikkelen",
        "website met boekingssysteem laten maken",
        "afsprakensysteem op maat",
      ],
      en: ["reservation system", "scheduling software", "website with booking", "appointment system"],
    },
  },
  {
    slug: "api-koppelingen-laten-maken",
    slugEn: "api-integration-development",
    parent: "software",
    keyword: { nl: "API koppeling laten maken", en: "API integration development" },
    related: {
      nl: [
        "software koppelingen laten bouwen",
        "webshop koppelen aan boekhouding",
        "webshop koppelen aan voorraadbeheer",
        "systemen aan elkaar koppelen",
      ],
      en: ["build software integrations", "connect a webshop to accounting", "connect a webshop to inventory", "systems integration"],
    },
  },
  {
    slug: "bedrijfsprocessen-automatiseren",
    slugEn: "business-process-automation",
    parent: "software",
    keyword: { nl: "bedrijfsprocessen laten automatiseren", en: "business process automation" },
    related: {
      nl: [
        "administratieve processen laten automatiseren",
        "Excel processen laten automatiseren",
        "urenregistratiesysteem laten maken",
        "offertesysteem laten maken",
        "facturatiesoftware laten ontwikkelen",
      ],
      en: ["automate admin processes", "replace Excel processes", "time tracking system", "quotation system", "invoicing software"],
    },
  },
  {
    slug: "ai-chatbot-laten-bouwen",
    slugEn: "ai-chatbot-development",
    parent: "software",
    keyword: { nl: "AI chatbot laten bouwen", en: "AI chatbot development" },
    related: {
      nl: ["AI assistent laten ontwikkelen", "chatbot op eigen data", "AI integratie in bestaande software"],
      en: ["build an AI assistant", "chatbot on your own data", "AI in existing software"],
    },
  },
  {
    slug: "dashboard-laten-bouwen",
    slugEn: "dashboard-development",
    parent: "software",
    keyword: { nl: "dashboard laten bouwen", en: "dashboard development" },
    related: {
      nl: ["rapportagesoftware laten ontwikkelen", "managementdashboard laten maken", "data dashboard op maat"],
      en: ["reporting software", "management dashboard", "custom data dashboard"],
    },
  },
  {
    slug: "software-laten-moderniseren",
    slugEn: "legacy-software-modernisation",
    parent: "software",
    keyword: { nl: "bestaande software laten moderniseren", en: "legacy software modernisation" },
    related: {
      nl: ["legacy software vervangen", "verouderd systeem herbouwen", "softwareontwikkeling uitbesteden", "software ontwikkelbedrijf"],
      en: ["replace legacy software", "rebuild an outdated system", "outsource software development", "software development company"],
    },
  },

  /* -------------------------------- Apps -------------------------------- */
  {
    slug: "ios-app-laten-maken",
    slugEn: "ios-app-development",
    parent: "apps",
    keyword: { nl: "iOS app laten maken", en: "iOS app development" },
    related: {
      nl: ["iPhone app laten ontwikkelen", "app voor de App Store laten bouwen", "iPad app laten maken"],
      en: ["iPhone app development", "App Store app", "iPad app"],
    },
  },
  {
    slug: "android-app-laten-maken",
    slugEn: "android-app-development",
    parent: "apps",
    keyword: { nl: "Android app laten maken", en: "Android app development" },
    related: {
      nl: ["Android app laten ontwikkelen", "app voor Google Play laten bouwen", "app voor iOS en Android tegelijk"],
      en: ["Android app development", "Google Play app", "iOS and Android from one codebase"],
    },
  },
  {
    slug: "klantenportaal-laten-maken",
    slugEn: "customer-portal-development",
    parent: "apps",
    keyword: { nl: "klantenportaal laten maken", en: "customer portal development" },
    related: {
      nl: [
        "medewerkersportaal laten bouwen",
        "leveranciersportaal laten ontwikkelen",
        "website met ledenomgeving laten maken",
        "besloten omgeving laten bouwen",
      ],
      en: ["employee portal", "supplier portal", "members area", "private client area"],
    },
  },
  {
    slug: "e-learning-platform-laten-maken",
    slugEn: "e-learning-platform-development",
    parent: "apps",
    keyword: { nl: "e-learning platform laten maken", en: "e-learning platform development" },
    related: {
      nl: ["online cursusplatform laten bouwen", "leerplatform op maat", "opleidingsplatform laten ontwikkelen"],
      en: ["online course platform", "custom learning platform", "training platform"],
    },
  },
  {
    slug: "bedrijfsapp-laten-ontwikkelen",
    slugEn: "business-app-development",
    parent: "apps",
    keyword: { nl: "bedrijfsapp laten ontwikkelen", en: "business app development" },
    related: {
      nl: ["interne app laten maken", "app ontwikkelbureau", "mobiele app voor medewerkers", "app laten maken voor buitendienst"],
      en: ["internal app", "app development agency", "app for field staff", "mobile app for employees"],
    },
  },

  /* ------------------------------ Pricing ------------------------------- */
  {
    slug: "website-laten-maken-kosten",
    slugEn: "website-development-cost",
    parent: "websites",
    intent: "pricing",
    keyword: { nl: "website laten maken kosten", en: "website development cost" },
    related: {
      nl: [
        "wat kost een website laten maken",
        "website laten maken offerte",
        "betaalbare website laten maken",
        "website laten maken voor zzp",
        "website laten maken voor mkb",
        "website laten maken voor starters",
        "website laten maken inclusief onderhoud",
      ],
      en: ["what does a website cost", "website quote", "affordable website", "website for freelancers", "website for small business"],
    },
  },
  {
    slug: "webshop-laten-maken-kosten",
    slugEn: "webshop-development-cost",
    parent: "webshops",
    intent: "pricing",
    keyword: { nl: "webshop laten maken kosten", en: "webshop development cost" },
    related: {
      nl: ["wat kost een webshop laten maken", "webshop laten maken offerte", "betaalbare webshop laten maken", "webshop op maat prijs"],
      en: ["what does a webshop cost", "webshop quote", "affordable webshop", "custom ecommerce price"],
    },
  },
  {
    slug: "software-laten-ontwikkelen-kosten",
    slugEn: "software-development-cost",
    parent: "software",
    intent: "pricing",
    keyword: { nl: "maatwerk software kosten", en: "custom software cost" },
    related: {
      nl: [
        "software laten ontwikkelen offerte",
        "wat kost software op maat",
        "webapplicatie laten bouwen kosten",
        "softwareontwikkeling uitbesteden kosten",
      ],
      en: ["software development quote", "what does custom software cost", "web app development cost"],
    },
  },
  {
    slug: "app-laten-maken-kosten",
    slugEn: "app-development-cost",
    parent: "apps",
    intent: "pricing",
    keyword: { nl: "app laten maken kosten", en: "app development cost" },
    related: {
      nl: ["wat kost een app laten maken", "app laten ontwikkelen offerte", "mobiele app prijs", "app laten maken prijsindicatie"],
      en: ["what does an app cost", "app development quote", "mobile app price"],
    },
  },
];

export const clusterSlugs = clusters.map((c) => c.slug);
export const clusterBySlug = (slug: string) => clusters.find((c) => c.slug === slug);
export const clustersByParent = (parent: ServiceParent) => clusters.filter((c) => c.parent === parent);

/** The route for a cluster in a given locale. Slugs differ per locale where the term does. */
export const clusterSlugFor = (c: Cluster, locale: string) => (locale === "en" && c.slugEn ? c.slugEn : c.slug);
