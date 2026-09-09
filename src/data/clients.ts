/**
 * Organisations Brisk has worked for.
 *
 * Logos are fetched once from Brandfetch and stored in `/public/logos` by
 * `scripts/fetch-client-logos.mjs`, so no API key ever reaches the browser and
 * the wall renders instantly with no third-party request at runtime.
 *
 * The logo wall sits on the light (paper) sections, where each brand's own
 * dark or colour mark reads correctly without recolouring it. Never invert or
 * restyle a client's logo beyond the shared opacity treatment.
 *
 * A client with no `logo` falls back to its name set in the site's own
 * typography. Drop a transparent SVG at `/public/logos/<slug>.svg`, add the
 * `logo` field, and the wordmark is replaced automatically.
 */
export interface Client {
  slug: string;
  /** Display name, used for the alt text and the typographic fallback. */
  name: string;
  /** Path under /public, or null when we have no usable asset yet. */
  logo: string | null;
  /** Sector label, shown under the logo on the detailed variant. */
  sector: { nl: string; en: string };
  /** Rough category, used to group and to back the "governments, Fortune 100s, startups" claim. */
  kind: "government" | "enterprise" | "institution";
  /** Intrinsic width/height of the asset, so the wall can size optically. */
  width?: number;
  height?: number;
  /** Optical scale tweak (1 = default). Some marks need to sit larger or smaller. */
  scale?: number;
}

export const clients: Client[] = [
  {
    slug: "nmbs",
    name: "NMBS",
    logo: "/logos/nmbs.svg",
    sector: { nl: "Spoorvervoer", en: "Rail transport" },
    kind: "government",
    width: 2100,
    height: 1371,
    scale: 1.0,
  },
  {
    slug: "dewatergroep",
    name: "De Watergroep",
    logo: "/logos/dewatergroep.svg",
    sector: { nl: "Drinkwater", en: "Water utility" },
    kind: "government",
    width: 517,
    height: 492,
    scale: 1.32,
  },
  {
    slug: "idewe",
    name: "IDEWE",
    logo: "/logos/idewe.svg",
    sector: { nl: "Preventie en welzijn", en: "Occupational health" },
    kind: "institution",
    width: 796,
    height: 250,
  },
  {
    slug: "rbfa",
    name: "RBFA",
    logo: null,
    sector: { nl: "Belgische Voetbalbond", en: "Belgian FA" },
    kind: "institution",
  },
  {
    slug: "museumpass",
    name: "museumPASSmusées",
    logo: null,
    sector: { nl: "Cultuur", en: "Culture" },
    kind: "institution",
  },
  {
    slug: "bmw",
    name: "BMW",
    logo: "/logos/bmw.svg",
    sector: { nl: "Automotive", en: "Automotive" },
    kind: "enterprise",
    width: 304,
    height: 300,
    scale: 1.25,
  },
  {
    slug: "nike",
    name: "Nike",
    logo: "/logos/nike.svg",
    sector: { nl: "Sport en retail", en: "Sport and retail" },
    kind: "enterprise",
    width: 609,
    height: 213,
    scale: 0.92,
  },
  {
    slug: "openai",
    name: "OpenAI",
    logo: "/logos/openai.svg",
    sector: { nl: "Technologie", en: "Technology" },
    kind: "enterprise",
    width: 375,
    height: 102,
    scale: 0.94,
  },
];

/**
 * Years of experience, derived so the number never goes stale. The client
 * states "more than 17 years", so this stays deliberately conservative.
 */
export const FOUNDED_YEAR = 2009;
export const yearsOfExperience = () => new Date().getFullYear() - FOUNDED_YEAR;
