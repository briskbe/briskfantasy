export type MarketId = "nl-NL" | "fr-FR" | "de-DE" | "en-GB" | "en-US";
export type MarketPageId = "home" | "websites" | "ecommerce" | "pricing" | "redesign" | "platforms";

export interface MarketPage {
  id: MarketPageId;
  /** Empty for the country homepage; otherwise one localized URL segment. */
  slug: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faq: { question: string; answer: string }[];
}

export interface MarketContent {
  id: MarketId;
  prefix: string;
  country: string;
  countryEnglish: string;
  language: string;
  ogLocale: string;
  labels: {
    home: string;
    navigation: string;
    contact: string;
    contactIntro: string;
    email: string;
    projects: string;
    projectsIntro: string;
    viewProject: string;
    related: string;
    faq: string;
    markets: string;
    basedIn: string;
    skipToContent: string;
    onThisPage: string;
    privacy: string;
  };
  pages: MarketPage[];
}
