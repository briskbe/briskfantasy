/**
 * Live client websites built by Brisk. Screenshots: a static capture lives in
 * `/public/references/<slug>.webp`; the <MicrolinkShot> component layers a
 * fresh Microlink capture on top at runtime.
 */
export type ReferenceType = "website" | "webshop" | "platform";
export type ReferenceService = "design" | "development" | "seo" | "copy" | "ecommerce" | "booking" | "branding";

export interface Reference {
  slug: string;
  name: string;
  url: string;
  domain: string;
  type: ReferenceType;
  industry: { nl: string; en: string };
  blurb: { nl: string; en: string };
  services: ReferenceService[];
  /** Site language(s) as built */
  langs: string[];
  featured?: boolean;
  /** Brand-ish accent used for hover tints */
  accent?: string;
  /**
   * Quality of the bundled static capture in `/public/references`.
   * "weak" means the capture fired before the site had finished painting, or a
   * promo layer covered the hero. Those tiles still work at small sizes (the
   * live Microlink layer replaces them for real visitors), but do NOT feature a
   * "weak" capture as a hero or full-width showpiece. Refresh them with
   * `node scripts/capture-references.mjs` and set this back to "strong".
   */
  captureQuality?: "strong" | "weak";
}

export const references: Reference[] = [
  {
    slug: "landelijkglas-be",
    name: "Landelijk Glas",
    url: "https://www.landelijkglas.be/",
    domain: "landelijkglas.be",
    type: "website",
    industry: { nl: "Interieur & glas", en: "Interiors & glass" },
    blurb: {
      nl: "Stalen deuren, steellook en pivotdeuren op maat. Een rustige, ruimtelijke site die het vakmanschap laat spreken en offertes binnenhaalt.",
      en: "Made-to-measure steel doors, steel-look and pivot doors. A calm, spacious site that lets the craft speak and brings in quote requests.",
    },
    services: ["design", "development", "seo"],
    langs: ["nl"],
    featured: true,
    accent: "#2b2b2b",
  },
  {
    slug: "city-housing-be",
    name: "City Housing Genk",
    url: "https://www.city-housing.be/",
    domain: "city-housing.be",
    type: "website",
    industry: { nl: "Hospitality", en: "Hospitality" },
    blurb: {
      nl: "Designhotel in het hart van Genk. Kamers, sfeer en boeken in één vloeiende ervaring, vanaf €89 per nacht.",
      en: "A design hotel in the heart of Genk. Rooms, atmosphere and booking in one fluid experience, from €89 a night.",
    },
    services: ["design", "development", "booking"],
    langs: ["nl"],
    featured: true,
    accent: "#8a6f4e",
  },
  {
    slug: "legacycristal-com",
    name: "LegacyCristal",
    url: "https://www.legacycristal.com/",
    domain: "legacycristal.com",
    type: "webshop",
    industry: { nl: "Geschenken & herinneringen", en: "Gifts & keepsakes" },
    blurb: {
      nl: "Eén foto wordt een 3D-lasergravure in massief kristal. Een emotionele webshop met een kraakheldere bestelflow.",
      en: "One photo becomes a 3D laser engraving in solid crystal. An emotional webshop with a crystal-clear ordering flow.",
    },
    services: ["design", "development", "ecommerce"],
    langs: ["nl"],
    featured: true,
    accent: "#6fa8dc",
  },
  {
    slug: "roetfilterkopen-com",
    name: "Roetfilterkopen.com",
    url: "https://www.roetfilterkopen.com/",
    domain: "roetfilterkopen.com",
    type: "webshop",
    industry: { nl: "Automotive e-commerce", en: "Automotive e-commerce" },
    blurb: {
      nl: "De grootste roetfilterwebshop van de Benelux: meer dan 500 A-merk filters uit eigen voorraad, gevonden op kenteken.",
      en: "The Benelux's largest DPF webshop: over 500 brand-name filters from stock, found by licence plate.",
    },
    services: ["design", "development", "ecommerce", "seo"],
    langs: ["nl"],
    featured: true,
    accent: "#e63946",
  },
  {
    slug: "fileservicechiptuning-com",
    name: "Fileservice Chiptuning",
    url: "https://www.fileservicechiptuning.com/",
    domain: "fileservicechiptuning.com",
    type: "platform",
    industry: { nl: "Automotive SaaS", en: "Automotive SaaS" },
    blurb: {
      nl: "Tuningfiles voor werkplaatsen wereldwijd, geleverd in minder dan 15 minuten. Portaal, bestelflow en klantzone op maat.",
      en: "Tuning files for workshops worldwide, delivered in under 15 minutes. Custom portal, ordering flow and client area.",
    },
    services: ["design", "development", "ecommerce"],
    langs: ["en"],
    featured: true,
    accent: "#f4a261",
  },
  {
    slug: "hp-chiptuningfiles-com",
    name: "HP Chiptuningfiles",
    url: "https://hp-chiptuningfiles.com/",
    domain: "hp-chiptuningfiles.com",
    type: "platform",
    industry: { nl: "Automotive SaaS", en: "Automotive SaaS" },
    blurb: {
      nl: "Professionele file service voor ECU-remapping met 24/7 support. Een platform gebouwd op snelheid en vertrouwen.",
      en: "Professional file service for ECU remapping with 24/7 support. A platform built on speed and trust.",
    },
    services: ["design", "development", "ecommerce"],
    langs: ["en"],
    featured: true,
    accent: "#3a86ff",
  },
  {
    slug: "priveglas-be",
    name: "PriveGlas",
    url: "https://priveglas.be/",
    domain: "priveglas.be",
    type: "website",
    industry: { nl: "Smart glass & interieur", en: "Smart glass & interiors" },
    blurb: {
      nl: "Smart film en privacy film op maat. Glas dat op één knop van transparant naar privé gaat, vertaald naar een site die het effect laat voelen.",
      en: "Smart film and privacy film made to measure. Glass that switches from clear to private at a touch, translated into a site that makes you feel the effect.",
    },
    services: ["design", "development"],
    langs: ["en", "nl"],
    featured: true,
    accent: "#4cc9f0",
  },
  {
    slug: "mirkozvending-com",
    name: "Mirkoz Vending",
    url: "https://www.mirkozvending.com/",
    domain: "mirkozvending.com",
    type: "website",
    industry: { nl: "Vending & retail", en: "Vending & retail" },
    blurb: {
      nl: "Vendingautomaten en Smart Fridges: verkoop, plaatsing en service. 24/7 verkopen zonder personeel, helder uitgelegd.",
      en: "Vending machines and Smart Fridges: sales, placement and service. Selling 24/7 without staff, explained clearly.",
    },
    services: ["design", "development", "copy"],
    langs: ["en"],
    accent: "#ffb703",
  },
  {
    slug: "sanae-align-com",
    name: "SANAE Align & Glow",
    url: "https://sanae-align.com/",
    domain: "sanae-align.com",
    type: "website",
    industry: { nl: "Beauty & wellness", en: "Beauty & wellness" },
    blurb: {
      nl: "Holistische esthetiek in Frankfurt, enkel voor vrouwen. Zacht, warm en premium, met online boeken als rode draad.",
      en: "Holistic aesthetics in Frankfurt, for women only. Soft, warm and premium, with online booking as the through-line.",
    },
    services: ["design", "development", "booking"],
    langs: ["de"],
    accent: "#e9c46a",
  },
  {
    slug: "ecuperformance-be",
    name: "ECU Performance",
    url: "https://ecuperformance.be/",
    domain: "ecuperformance.be",
    type: "website",
    industry: { nl: "Automotive", en: "Automotive" },
    blurb: {
      nl: "Premium chiptuning in Genk met in-house engineering. Donker, snel en op afspraak, net als de garage zelf.",
      en: "Premium chiptuning in Genk with in-house engineering. Dark, fast and by appointment only, just like the workshop.",
    },
    services: ["design", "development", "seo"],
    langs: ["nl"],
    accent: "#ff5400",
    // a promo modal covers the hero
    captureQuality: "weak",
  },
  {
    slug: "comfortsolutions-be",
    name: "Comfort Solutions",
    url: "https://www.comfortsolutions.be/",
    domain: "comfortsolutions.be",
    type: "website",
    industry: { nl: "Sanitair & verwarming", en: "Plumbing & heating" },
    blurb: {
      nl: "De sanitair-expert van Limburg: badkamerrenovaties, verwarming en ventilatie. Betrouwbaar en makkelijk te contacteren.",
      en: "Limburg's plumbing expert: bathroom renovations, heating and ventilation. Trustworthy and easy to get in touch with.",
    },
    services: ["design", "development", "seo"],
    langs: ["nl"],
    accent: "#0077b6",
  },
  {
    slug: "roetfilterlatenreinigen-be",
    name: "Roetfilterlatenreinigen.be",
    url: "https://www.roetfilterlatenreinigen.be/",
    domain: "roetfilterlatenreinigen.be",
    type: "website",
    industry: { nl: "Automotive", en: "Automotive" },
    blurb: {
      nl: "Specialist in het reinigen en vervangen van roetfilters, met meer dan 8 jaar ervaring. Gebouwd om te ranken en te converteren.",
      en: "Specialist in cleaning and replacing diesel particulate filters, with 8+ years of experience. Built to rank and convert.",
    },
    services: ["design", "development", "seo"],
    langs: ["nl"],
    accent: "#2a9d8f",
    // capture fired before the hero image painted
    captureQuality: "weak",
  },
  {
    slug: "roetfilterservice-be",
    name: "Roetfilter Service",
    url: "https://www.roetfilterservice.be/",
    domain: "roetfilterservice.be",
    type: "website",
    industry: { nl: "Automotive", en: "Automotive" },
    blurb: {
      nl: "DPF-reiniging vanaf €149 met resultaatgarantie. Duidelijke prijzen, snelle afspraken, nul ruis.",
      en: "DPF cleaning from €149 with a results guarantee. Clear pricing, quick appointments, zero noise.",
    },
    services: ["design", "development", "booking"],
    langs: ["nl"],
    accent: "#00b4d8",
  },
  {
    slug: "adblueexpert-be",
    name: "AdBlueexpert.be",
    url: "https://adblueexpert.be/",
    domain: "adblueexpert.be",
    type: "website",
    industry: { nl: "Automotive", en: "Automotive" },
    blurb: {
      nl: "AdBlue-, EGR- en DPF-oplossingen via ECU-software. Technisch onderwerp, menselijk uitgelegd.",
      en: "AdBlue, EGR and DPF solutions through ECU software. A technical subject, explained in human terms.",
    },
    services: ["design", "development", "seo"],
    langs: ["nl"],
    accent: "#1d4ed8",
  },
  {
    slug: "tcko-be",
    name: "TCKO",
    url: "https://www.tcko.be/",
    domain: "tcko.be",
    type: "website",
    industry: { nl: "Tegels & vloeren", en: "Tiles & flooring" },
    blurb: {
      nl: "De tegelspecialist van Limburg. Een ruime collectie, overzichtelijk gepresenteerd, met de showroom als eindbestemming.",
      en: "Limburg's tile specialist. A wide collection, presented clearly, with the showroom as the final destination.",
    },
    services: ["design", "development"],
    langs: ["nl"],
    accent: "#8d99ae",
    // hero is a quiet interior photo with no headline visible
    captureQuality: "weak",
  },
  {
    slug: "vestra-armor-com",
    name: "Vestra Armor",
    url: "https://www.vestra-armor.com/",
    domain: "vestra-armor.com",
    type: "website",
    industry: { nl: "Events & executive transport", en: "Events & executive transport" },
    blurb: {
      nl: "Professionele event hosts en executive transport. Discreet, stipt en betrouwbaar, vertaald in een strakke, donkere identiteit.",
      en: "Professional event hosts and executive transport. Discreet, punctual and reliable, translated into a sharp, dark identity.",
    },
    services: ["design", "development", "branding"],
    langs: ["nl"],
    accent: "#c9a227",
  },
];

export const featuredReferences = references.filter((r) => r.featured);

export function referencesByType(type: ReferenceType) {
  return references.filter((r) => r.type === type);
}
