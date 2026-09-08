/**
 * Product-design work by Brisk (dashboards, mobile apps, marketing sites).
 * Files live in `/public/portfolio`. Tags are curated; use them to pick the
 * right pieces for a page (e.g. `mobile` for the Apps page, `dashboard` for Software).
 */
export type PortfolioTag =
  | "mobile"
  | "dashboard"
  | "saas"
  | "marketing"
  | "dark"
  | "light"
  | "3d"
  | "ecommerce"
  | "settings"
  | "onboarding"
  | "email"
  | "finance"
  | "ai"
  | "device"
  | "hero";

export interface PortfolioItem {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Short descriptive title, NL + EN */
  title: { nl: string; en: string };
  tags: PortfolioTag[];
  /** Dominant background: helps pick items for dark or light sections */
  tone: "dark" | "light";
}

export const portfolio: PortfolioItem[] = [
  { id: "004-a001", src: "/portfolio/004-a001.webp", width: 1920, height: 944, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "005-a002", src: "/portfolio/005-a002.webp", width: 1920, height: 1442, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "006-a003", src: "/portfolio/006-a003.webp", width: 1920, height: 1442, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "007-w001", src: "/portfolio/007-w001.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "008-w002", src: "/portfolio/008-w002.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "009-w003", src: "/portfolio/009-w003.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "010-w004", src: "/portfolio/010-w004.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "011-w005", src: "/portfolio/011-w005.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "012-w006", src: "/portfolio/012-w006.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "013-w007", src: "/portfolio/013-w007.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "014-w008", src: "/portfolio/014-w008.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "015-w009", src: "/portfolio/015-w009.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "016-w010", src: "/portfolio/016-w010.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "017-w011", src: "/portfolio/017-w011.webp", width: 1600, height: 1096, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "018-w012", src: "/portfolio/018-w012.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "019-w013", src: "/portfolio/019-w013.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "020-w014", src: "/portfolio/020-w014.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "021-w015", src: "/portfolio/021-w015.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "022-w016", src: "/portfolio/022-w016.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "023-w017", src: "/portfolio/023-w017.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "024-w018", src: "/portfolio/024-w018.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "025-w019", src: "/portfolio/025-w019.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "026-w020", src: "/portfolio/026-w020.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "027-w021", src: "/portfolio/027-w021.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "028-w022", src: "/portfolio/028-w022.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "029-w023", src: "/portfolio/029-w023.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "030-w024", src: "/portfolio/030-w024.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "031-w025", src: "/portfolio/031-w025.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "032-w026", src: "/portfolio/032-w026.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "033-w027", src: "/portfolio/033-w027.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "034-w028", src: "/portfolio/034-w028.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "035-w029", src: "/portfolio/035-w029.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "036-w030", src: "/portfolio/036-w030.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "037-w031", src: "/portfolio/037-w031.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "038-w032", src: "/portfolio/038-w032.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "039-w033", src: "/portfolio/039-w033.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "040-w034", src: "/portfolio/040-w034.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "041-w035", src: "/portfolio/041-w035.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "042-w036", src: "/portfolio/042-w036.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "043-w037", src: "/portfolio/043-w037.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "044-w038", src: "/portfolio/044-w038.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "045-w039", src: "/portfolio/045-w039.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "046-w040", src: "/portfolio/046-w040.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "047-w041", src: "/portfolio/047-w041.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "048-w042", src: "/portfolio/048-w042.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "049-w043", src: "/portfolio/049-w043.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "050-w044", src: "/portfolio/050-w044.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "051-w045", src: "/portfolio/051-w045.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "052-w046", src: "/portfolio/052-w046.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "053-w047", src: "/portfolio/053-w047.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "054-w048", src: "/portfolio/054-w048.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "055-w049", src: "/portfolio/055-w049.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
  { id: "056-w050", src: "/portfolio/056-w050.webp", width: 1600, height: 1202, title: { nl: "", en: "" }, tags: [], tone: "light" },
];

export const portfolioVideos = [
  { id: "a000", src: "/portfolio/video/001-a000.mp4", width: 1600, height: 1038, duration: 42, title: { nl: "Serverbeheer, stap voor stap", en: "Server management, step by step" } },
  { id: "a000b", src: "/portfolio/video/002-a000b.mp4", width: 760, height: 720, duration: 9, title: { nl: "Micro-interactie", en: "Micro-interaction" } },
  { id: "a000c", src: "/portfolio/video/003-a000c.mp4", width: 1600, height: 900, duration: 17, title: { nl: "Interface in beweging", en: "Interface in motion" } },
] as const;

export function portfolioByTag(tag: PortfolioTag, limit?: number) {
  const list = portfolio.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
}
