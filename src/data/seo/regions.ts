/**
 * Regional landing pages for Belgium and the Netherlands.
 *
 * One page per province rather than one per city and service. A page per
 * city × keyword would run into the thousands, and near-identical pages that
 * differ only by a place name are what Google's spam policy calls doorway
 * pages — they get demoted, taking the rest of the site's trust with them.
 * A province page can carry real content (the cities actually served, the
 * industries there, work delivered nearby), which is what ranks and converts.
 *
 * `cities` is not decoration: those names are the long-tail this page is
 * expected to catch, and they must appear in the copy as part of a sentence a
 * human would write.
 */
export type CountryCode = "BE" | "NL";

export interface Region {
  /** URL slug, shared by both locales — place names do not translate. */
  slug: string;
  /** Province name as people write it in Dutch. */
  name: string;
  /** English exonym where one is in common use, otherwise the same name. */
  nameEn?: string;
  country: CountryCode;
  /** Main cities and towns, most searched first. */
  cities: string[];
  /** What the local economy is known for — the hook for genuinely local copy. */
  economy: { nl: string; en: string };
  /** Reference slugs from `references.ts` delivered in or near this region. */
  nearbyReferences?: string[];
}

export const regions: Region[] = [
  /* ---------------- Belgium ---------------- */
  {
    slug: "antwerpen",
    name: "Antwerpen",
    nameEn: "Antwerp",
    country: "BE",
    cities: ["Antwerpen", "Mechelen", "Turnhout", "Lier", "Mol", "Geel", "Herentals"],
    economy: {
      nl: "haven en logistiek, diamant, chemie, mode en een dichte laag van kmo's rond de stad",
      en: "port and logistics, diamonds, chemicals, fashion and a dense layer of small businesses around the city",
    },
  },
  {
    slug: "oost-vlaanderen",
    name: "Oost-Vlaanderen",
    nameEn: "East Flanders",
    country: "BE",
    cities: ["Gent", "Aalst", "Sint-Niklaas", "Dendermonde", "Lokeren", "Oudenaarde", "Deinze"],
    economy: {
      nl: "biotech en cleantech rond Gent, textiel, voeding en maakindustrie",
      en: "biotech and cleantech around Ghent, textiles, food and manufacturing",
    },
  },
  {
    slug: "west-vlaanderen",
    name: "West-Vlaanderen",
    nameEn: "West Flanders",
    country: "BE",
    cities: ["Brugge", "Kortrijk", "Oostende", "Roeselare", "Ieper", "Waregem", "Knokke-Heist"],
    economy: {
      nl: "maakindustrie en machinebouw rond Kortrijk, voeding, toerisme aan de kust",
      en: "manufacturing and machine building around Kortrijk, food production and coastal tourism",
    },
  },
  {
    slug: "limburg",
    name: "Limburg",
    country: "BE",
    cities: ["Hasselt", "Genk", "Sint-Truiden", "Tongeren", "Beringen", "Lommel", "Maasmechelen"],
    economy: {
      nl: "automotive en logistiek rond Genk, bouw, zorg en een sterke ondernemersbasis",
      en: "automotive and logistics around Genk, construction, care and a strong base of owner-run firms",
    },
    nearbyReferences: ["city-housing-be", "ecuperformance-be", "tcko-be", "comfortsolutions-be"],
  },
  {
    slug: "vlaams-brabant",
    name: "Vlaams-Brabant",
    nameEn: "Flemish Brabant",
    country: "BE",
    cities: ["Leuven", "Vilvoorde", "Halle", "Tienen", "Diest", "Aarschot", "Zaventem"],
    economy: {
      nl: "onderzoek en technologie rond Leuven, luchthavenlogistiek en dienstverlening",
      en: "research and technology around Leuven, airport logistics and professional services",
    },
  },
  {
    slug: "brussel",
    name: "Brussel",
    nameEn: "Brussels",
    country: "BE",
    cities: ["Brussel", "Schaarbeek", "Anderlecht", "Elsene", "Ukkel", "Sint-Gillis", "Evere"],
    economy: {
      nl: "Europese instellingen, hoofdkantoren, media en een tweetalige dienstensector",
      en: "European institutions, head offices, media and a bilingual service sector",
    },
  },
  {
    slug: "waals-brabant",
    name: "Waals-Brabant",
    nameEn: "Walloon Brabant",
    country: "BE",
    cities: ["Waver", "Nijvel", "Ottignies-Louvain-la-Neuve", "Eigenbrakel", "Geldenaken"],
    economy: {
      nl: "farma en biotech, onderzoek rond Louvain-la-Neuve en dienstverlening",
      en: "pharma and biotech, research around Louvain-la-Neuve and professional services",
    },
  },
  {
    slug: "henegouwen",
    name: "Henegouwen",
    nameEn: "Hainaut",
    country: "BE",
    cities: ["Bergen", "Charleroi", "Doornik", "La Louvière", "Moeskroen", "Aat"],
    economy: {
      nl: "maakindustrie, logistiek en een economie die volop digitaliseert",
      en: "manufacturing, logistics and an economy in the middle of digitising",
    },
  },
  {
    slug: "luik",
    name: "Luik",
    nameEn: "Liège",
    country: "BE",
    cities: ["Luik", "Verviers", "Seraing", "Herstal", "Hoei", "Eupen"],
    economy: {
      nl: "logistiek rond de luchthaven, staal en techniek, ruimtevaart",
      en: "airport logistics, steel and engineering, aerospace",
    },
  },
  {
    slug: "namen",
    name: "Namen",
    nameEn: "Namur",
    country: "BE",
    cities: ["Namen", "Dinant", "Andenne", "Ciney", "Gembloers"],
    economy: {
      nl: "openbaar bestuur, agrovoeding en toerisme langs de Maas",
      en: "public administration, agri-food and tourism along the Meuse",
    },
  },
  {
    slug: "luxemburg",
    name: "Luxemburg",
    nameEn: "Luxembourg province",
    country: "BE",
    cities: ["Aarlen", "Bastenaken", "Marche-en-Famenne", "Neufchâteau", "Aarlen"],
    economy: {
      nl: "hout en bouw, toerisme in de Ardennen en grensverkeer met het Groothertogdom",
      en: "timber and construction, Ardennes tourism and cross-border trade with the Grand Duchy",
    },
  },

  /* ---------------- Netherlands ---------------- */
  {
    slug: "noord-holland",
    name: "Noord-Holland",
    nameEn: "North Holland",
    country: "NL",
    cities: ["Amsterdam", "Haarlem", "Zaanstad", "Alkmaar", "Hilversum", "Amstelveen", "Hoorn"],
    economy: {
      nl: "tech en scale-ups in Amsterdam, media in Hilversum, handel en toerisme",
      en: "tech and scale-ups in Amsterdam, media in Hilversum, trade and tourism",
    },
  },
  {
    slug: "zuid-holland",
    name: "Zuid-Holland",
    nameEn: "South Holland",
    country: "NL",
    cities: ["Rotterdam", "Den Haag", "Leiden", "Dordrecht", "Delft", "Zoetermeer", "Gouda"],
    economy: {
      nl: "haven en logistiek in Rotterdam, overheid in Den Haag, life sciences rond Leiden",
      en: "port and logistics in Rotterdam, government in The Hague, life sciences around Leiden",
    },
  },
  {
    slug: "utrecht",
    name: "Utrecht",
    country: "NL",
    cities: ["Utrecht", "Amersfoort", "Nieuwegein", "Veenendaal", "Zeist", "Houten"],
    economy: {
      nl: "zakelijke dienstverlening, zorg en ICT in het midden van het land",
      en: "professional services, healthcare and IT in the centre of the country",
    },
  },
  {
    slug: "noord-brabant",
    name: "Noord-Brabant",
    nameEn: "North Brabant",
    country: "NL",
    cities: ["Eindhoven", "Tilburg", "Breda", "'s-Hertogenbosch", "Helmond", "Oss", "Roosendaal"],
    economy: {
      nl: "hightech en maakindustrie rond Eindhoven, logistiek en agrofood",
      en: "high tech and manufacturing around Eindhoven, logistics and agri-food",
    },
  },
  {
    slug: "gelderland",
    name: "Gelderland",
    country: "NL",
    cities: ["Nijmegen", "Arnhem", "Apeldoorn", "Ede", "Doetinchem", "Zutphen", "Harderwijk"],
    economy: {
      nl: "zorg en energie, maakindustrie in de Achterhoek, food rond Wageningen",
      en: "healthcare and energy, manufacturing in the Achterhoek, food research around Wageningen",
    },
  },
  {
    slug: "overijssel",
    name: "Overijssel",
    country: "NL",
    cities: ["Enschede", "Zwolle", "Deventer", "Hengelo", "Almelo", "Kampen"],
    economy: {
      nl: "maakindustrie en techniek in Twente, zorg en logistiek rond Zwolle",
      en: "manufacturing and engineering in Twente, healthcare and logistics around Zwolle",
    },
  },
  {
    slug: "limburg-nl",
    name: "Limburg (NL)",
    nameEn: "Limburg (Netherlands)",
    country: "NL",
    cities: ["Maastricht", "Venlo", "Sittard-Geleen", "Heerlen", "Roermond", "Weert"],
    economy: {
      nl: "logistiek rond Venlo, chemie in Chemelot, zorg en grensverkeer met België en Duitsland",
      en: "logistics around Venlo, chemicals at Chemelot, healthcare and cross-border trade with Belgium and Germany",
    },
  },
  {
    slug: "groningen",
    name: "Groningen",
    country: "NL",
    cities: ["Groningen", "Hoogezand", "Veendam", "Delfzijl", "Winschoten"],
    economy: {
      nl: "energie, een grote studentenstad en een groeiende IT-sector",
      en: "energy, a large student city and a growing IT sector",
    },
  },
  {
    slug: "friesland",
    name: "Friesland",
    nameEn: "Friesland",
    country: "NL",
    cities: ["Leeuwarden", "Drachten", "Sneek", "Heerenveen", "Harlingen"],
    economy: {
      nl: "agrofood, watertechnologie en maakindustrie",
      en: "agri-food, water technology and manufacturing",
    },
  },
  {
    slug: "drenthe",
    name: "Drenthe",
    country: "NL",
    cities: ["Assen", "Emmen", "Hoogeveen", "Meppel", "Coevorden"],
    economy: {
      nl: "maakindustrie, zorg, toerisme en sensortechnologie",
      en: "manufacturing, healthcare, tourism and sensor technology",
    },
  },
  {
    slug: "flevoland",
    name: "Flevoland",
    country: "NL",
    cities: ["Almere", "Lelystad", "Emmeloord", "Dronten", "Zeewolde"],
    economy: {
      nl: "logistiek, agrarische bedrijven en snelgroeiende dienstverleners",
      en: "logistics, agriculture and fast-growing service businesses",
    },
  },
  {
    slug: "zeeland",
    name: "Zeeland",
    country: "NL",
    cities: ["Middelburg", "Vlissingen", "Goes", "Terneuzen", "Zierikzee"],
    economy: {
      nl: "haven en industrie in Terneuzen, toerisme en agrarische bedrijven",
      en: "port and industry in Terneuzen, tourism and agriculture",
    },
  },
];

export const regionsByCountry = (country: CountryCode) => regions.filter((r) => r.country === country);
export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);
export const regionSlugs = regions.map((r) => r.slug);

/** Every city named across all regions — used for the internal link index. */
export const allCities = [...new Set(regions.flatMap((r) => r.cities))].sort();
