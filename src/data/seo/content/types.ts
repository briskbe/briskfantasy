/**
 * Content contract for the SEO landing pages.
 *
 * These pages exist to rank, but they are read by people deciding whether to
 * hire Brisk. Thin, templated text loses on both counts: Google demotes it as
 * a doorway page and a visitor bounces. Every field here should read like it
 * was written for that one page.
 */
export interface Faq {
  question: string;
  answer: string;
}

export interface LocalisedPageContent {
  /** <title>. Lead with the keyword, keep under ~60 characters where possible. */
  metaTitle: string;
  /** Meta description, 140–160 characters, written to earn the click. */
  metaDescription: string;
  /** The visible H1. Close to the keyword but written as a human sentence. */
  h1: string;
  /** Opening paragraph, 2–3 sentences. */
  lead: string;
  /** 3–4 body sections. Each `body` entry is one paragraph. */
  sections: { heading: string; body: string[] }[];
  /** Optional "what you get" list. */
  checklist?: { title: string; items: string[] };
  /**
   * 4–6 questions. These are rendered visibly on the page AND emitted as
   * FAQPage structured data — so they must match the visible text exactly.
   */
  faq: Faq[];
}

export type ClusterContentMap = Record<string, { nl: LocalisedPageContent; en: LocalisedPageContent }>;

/**
 * Region pages share a skeleton (the four services, the client wall, the CTA)
 * so the differentiator is this copy. It has to say something true about doing
 * business in that province, naming its actual cities.
 */
export interface RegionCopy {
  /** <title> and meta description for the region page. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Opening paragraph, 2–3 sentences, naming the region. */
  lead: string;
  /** 2–3 paragraphs on what building for businesses in this region is actually like. */
  localAngle: string[];
  /** 3–4 questions specific to this region. */
  faq: Faq[];
}

export type RegionContentMap = Record<string, { nl: RegionCopy; en: RegionCopy }>;
