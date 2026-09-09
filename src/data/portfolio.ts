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
  { id: "004-a001", src: "/portfolio/004-a001.webp", width: 1920, height: 944, title: { nl: "AI-codeeragent in close-up", en: "AI coding agent close-up" }, tags: ["saas", "light", "ai"], tone: "light" },
  { id: "005-a002", src: "/portfolio/005-a002.webp", width: 1920, height: 1442, title: { nl: "Dashboard van een AI-codeeragent", en: "AI coding agent dashboard" }, tags: ["saas", "dashboard", "light", "ai"], tone: "light" },
  { id: "006-a003", src: "/portfolio/006-a003.webp", width: 1920, height: 1442, title: { nl: "Instellingen voor een AI-codeertool", en: "AI coding tool settings" }, tags: ["saas", "settings", "light", "ai", "onboarding"], tone: "light" },
  { id: "007-w001", src: "/portfolio/007-w001.webp", width: 1600, height: 1202, title: { nl: "Facturatie-overzicht met detailpaneel", en: "Invoice list with detail panel" }, tags: ["saas", "dashboard", "finance", "light"], tone: "light" },
  { id: "008-w002", src: "/portfolio/008-w002.webp", width: 1600, height: 1202, title: { nl: "Sparkwave AI-headshotgenerator", en: "Sparkwave AI headshot generator" }, tags: ["saas", "light", "ai", "3d"], tone: "light" },
  { id: "009-w003", src: "/portfolio/009-w003.webp", width: 1600, height: 1202, title: { nl: "Zendingtracking in licht en donker", en: "Shipment tracking, light and dark" }, tags: ["saas", "light", "dark"], tone: "light" },
  { id: "010-w004", src: "/portfolio/010-w004.webp", width: 1600, height: 1202, title: { nl: "Onboarding van een desktop-app", en: "Desktop app onboarding" }, tags: ["onboarding", "settings", "light", "saas"], tone: "light" },
  { id: "011-w005", src: "/portfolio/011-w005.webp", width: 1600, height: 1202, title: { nl: "Communitychat met reacties", en: "Community chat with replies" }, tags: ["email", "saas", "light"], tone: "light" },
  { id: "012-w006", src: "/portfolio/012-w006.webp", width: 1600, height: 1202, title: { nl: "Filter voor laadstations", en: "EV charging station filter" }, tags: ["mobile", "device", "light"], tone: "light" },
  { id: "013-w007", src: "/portfolio/013-w007.webp", width: 1600, height: 1202, title: { nl: "Menu's van een e-mailclient", en: "Email client menus" }, tags: ["email", "settings", "light", "saas", "ai"], tone: "light" },
  { id: "014-w008", src: "/portfolio/014-w008.webp", width: 1600, height: 1202, title: { nl: "Menu's van een e-mailclient (donker)", en: "Email client menus, dark" }, tags: ["email", "settings", "dark", "saas", "ai"], tone: "dark" },
  { id: "015-w009", src: "/portfolio/015-w009.webp", width: 1600, height: 1202, title: { nl: "Beheer van gekoppelde apps", en: "Connected apps manager" }, tags: ["settings", "onboarding", "dark", "saas"], tone: "dark" },
  { id: "016-w010", src: "/portfolio/016-w010.webp", width: 1600, height: 1202, title: { nl: "Abonnementsdetail op mobiel", en: "Mobile subscription detail" }, tags: ["mobile", "device", "finance", "light", "hero"], tone: "light" },
  { id: "017-w011", src: "/portfolio/017-w011.webp", width: 1600, height: 1096, title: { nl: "Marketingpagina voor Sparkwave", en: "Sparkwave marketing page" }, tags: ["marketing", "dark", "device", "ai", "hero"], tone: "dark" },
  { id: "018-w012", src: "/portfolio/018-w012.webp", width: 1600, height: 1202, title: { nl: "Homepage van Atuino", en: "Atuino homepage" }, tags: ["marketing", "light"], tone: "light" },
  { id: "019-w013", src: "/portfolio/019-w013.webp", width: 1600, height: 1202, title: { nl: "Featuresectie van Atuino", en: "Atuino features section" }, tags: ["marketing", "light"], tone: "light" },
  { id: "020-w014", src: "/portfolio/020-w014.webp", width: 1600, height: 1202, title: { nl: "Atuino-sectie met testimonial", en: "Atuino testimonial section" }, tags: ["marketing", "light"], tone: "light" },
  { id: "021-w015", src: "/portfolio/021-w015.webp", width: 1600, height: 1202, title: { nl: "Atuino-voordelen en beloftes", en: "Atuino benefits section" }, tags: ["marketing", "light"], tone: "light" },
  { id: "022-w016", src: "/portfolio/022-w016.webp", width: 1600, height: 1202, title: { nl: "Bento-kaarten voor Atlas-facturatie", en: "Atlas invoicing bento cards" }, tags: ["saas", "light", "dark", "finance", "3d", "marketing", "ecommerce"], tone: "light" },
  { id: "023-w017", src: "/portfolio/023-w017.webp", width: 1600, height: 1202, title: { nl: "Sparkwave Professional op laptop en telefoon", en: "Sparkwave Professional on laptop and phone" }, tags: ["saas", "dashboard", "device", "mobile", "light", "hero"], tone: "light" },
  { id: "024-w018", src: "/portfolio/024-w018.webp", width: 1600, height: 1202, title: { nl: "Sparkwave inbox-weergave", en: "Sparkwave inbox view" }, tags: ["saas", "email", "light"], tone: "light" },
  { id: "025-w019", src: "/portfolio/025-w019.webp", width: 1600, height: 1202, title: { nl: "Marketingpagina voor Sparkwave", en: "Sparkwave marketing page" }, tags: ["marketing", "email", "light", "saas", "hero"], tone: "light" },
  { id: "026-w020", src: "/portfolio/026-w020.webp", width: 1600, height: 1202, title: { nl: "Schermen van een laadpaal-app", en: "EV charging app screens" }, tags: ["mobile", "light", "ecommerce", "finance"], tone: "light" },
  { id: "027-w021", src: "/portfolio/027-w021.webp", width: 1600, height: 1202, title: { nl: "App Store-instellingen van Sparkwave", en: "Sparkwave App Store settings" }, tags: ["saas", "settings", "light", "email", "ai"], tone: "light" },
  { id: "028-w022", src: "/portfolio/028-w022.webp", width: 1600, height: 1202, title: { nl: "Track-app op een iPhone", en: "Track app on an iPhone" }, tags: ["mobile", "device", "light", "finance", "hero", "settings"], tone: "light" },
  { id: "029-w023", src: "/portfolio/029-w023.webp", width: 1600, height: 1202, title: { nl: "Onboarding van integraties met 3D-vormen", en: "Integrations onboarding with 3D shapes" }, tags: ["mobile", "device", "onboarding", "3d", "light", "hero", "email"], tone: "light" },
  { id: "030-w024", src: "/portfolio/030-w024.webp", width: 1600, height: 1202, title: { nl: "E-mailaccounts beheren", en: "Manage email accounts" }, tags: ["saas", "settings", "email", "light"], tone: "light" },
  { id: "031-w025", src: "/portfolio/031-w025.webp", width: 1600, height: 1202, title: { nl: "Videokamer joinen in een leer-app", en: "Joining a video room in a learning app" }, tags: ["mobile", "device", "3d", "light", "hero"], tone: "light" },
  { id: "032-w026", src: "/portfolio/032-w026.webp", width: 1600, height: 1202, title: { nl: "E-mailtemplate-editor van Brisk", en: "Brisk email template editor" }, tags: ["saas", "email", "light"], tone: "light" },
  { id: "033-w027", src: "/portfolio/033-w027.webp", width: 1600, height: 1202, title: { nl: "Flow Builder voor e-mailautomatisering", en: "Email automation Flow Builder" }, tags: ["saas", "email", "light", "ai"], tone: "light" },
  { id: "034-w028", src: "/portfolio/034-w028.webp", width: 1600, height: 1202, title: { nl: "AI-beeldgenerator met 3D-vormen", en: "AI image generator with 3D shapes" }, tags: ["saas", "ai", "dark", "3d", "light", "hero"], tone: "light" },
  { id: "035-w029", src: "/portfolio/035-w029.webp", width: 1600, height: 1202, title: { nl: "Donker facturatie-dashboard", en: "Dark invoicing dashboard" }, tags: ["dashboard", "saas", "dark", "finance"], tone: "dark" },
  { id: "036-w030", src: "/portfolio/036-w030.webp", width: 1600, height: 1202, title: { nl: "Artikelen genereren met AI", en: "Generate articles with AI" }, tags: ["saas", "ai", "light", "dashboard"], tone: "light" },
  { id: "037-w031", src: "/portfolio/037-w031.webp", width: 1600, height: 1202, title: { nl: "Instellingen voor SEO-artikelgeneratie", en: "SEO article generation settings" }, tags: ["saas", "ai", "light", "settings"], tone: "light" },
  { id: "038-w032", src: "/portfolio/038-w032.webp", width: 1600, height: 1202, title: { nl: "Delen en rechten op mobiel", en: "Sharing and permissions on mobile" }, tags: ["mobile", "device", "settings", "3d", "light", "hero"], tone: "light" },
  { id: "039-w033", src: "/portfolio/039-w033.webp", width: 1600, height: 1202, title: { nl: "Collecties-app op een iPhone", en: "Collections app on an iPhone" }, tags: ["mobile", "device", "light", "hero"], tone: "light" },
  { id: "040-w034", src: "/portfolio/040-w034.webp", width: 1600, height: 1202, title: { nl: "E-mailtemplate-editor van Brisk", en: "Brisk email template editor" }, tags: ["saas", "light", "email", "onboarding", "3d"], tone: "light" },
  { id: "041-w035", src: "/portfolio/041-w035.webp", width: 1600, height: 1202, title: { nl: "Omzetwidget op iPhone", en: "Revenue widget on iPhone" }, tags: ["mobile", "device", "finance", "dashboard", "light", "hero"], tone: "light" },
  { id: "042-w036", src: "/portfolio/042-w036.webp", width: 1600, height: 1202, title: { nl: "Muziek-app op een schuine iPhone", en: "Music app on tilted iPhone" }, tags: ["mobile", "device", "light", "hero"], tone: "light" },
  { id: "043-w037", src: "/portfolio/043-w037.webp", width: 1600, height: 1202, title: { nl: "Automatiseringsdashboard van Lenacy", en: "Lenacy automation dashboard" }, tags: ["saas", "dashboard", "light", "onboarding", "email", "ai"], tone: "light" },
  { id: "044-w038", src: "/portfolio/044-w038.webp", width: 1600, height: 1202, title: { nl: "Instellingenscherm van een teller-app", en: "Counter app settings screen" }, tags: ["mobile", "device", "settings", "light"], tone: "light" },
  { id: "045-w039", src: "/portfolio/045-w039.webp", width: 1600, height: 1202, title: { nl: "Back-ups en lege agenda", en: "Backups and empty calendar" }, tags: ["mobile", "device", "settings", "light", "3d"], tone: "light" },
  { id: "046-w040", src: "/portfolio/046-w040.webp", width: 1600, height: 1202, title: { nl: "Domein koppelen met DNS-instellingen", en: "Connect domain with DNS settings" }, tags: ["saas", "onboarding", "settings", "light", "hero"], tone: "light" },
  { id: "047-w041", src: "/portfolio/047-w041.webp", width: 1600, height: 1202, title: { nl: "Marketplace voor softwarelicenties", en: "Software license marketplace" }, tags: ["saas", "ecommerce", "light", "dashboard"], tone: "light" },
  { id: "048-w042", src: "/portfolio/048-w042.webp", width: 1600, height: 1202, title: { nl: "Bestandsbrowser in donkere modus", en: "Dark mode file browser" }, tags: ["saas", "dark", "dashboard"], tone: "dark" },
  { id: "049-w043", src: "/portfolio/049-w043.webp", width: 1600, height: 1202, title: { nl: "Modelkeuze en agent-instellingen", en: "Model picker and agent settings" }, tags: ["saas", "ai", "settings", "light"], tone: "light" },
  { id: "050-w044", src: "/portfolio/050-w044.webp", width: 1600, height: 1202, title: { nl: "Chatinterface van een AI-assistent", en: "AI assistant chat interface" }, tags: ["saas", "ai", "light"], tone: "light" },
  { id: "051-w045", src: "/portfolio/051-w045.webp", width: 1600, height: 1202, title: { nl: "Marketingpagina voor Sparkwave", en: "Sparkwave marketing page" }, tags: ["marketing", "dark", "hero", "finance"], tone: "dark" },
  { id: "052-w046", src: "/portfolio/052-w046.webp", width: 1600, height: 1202, title: { nl: "AI-agent met repo-overzicht", en: "AI agent with repo sidebar" }, tags: ["saas", "ai", "light"], tone: "light" },
  { id: "053-w047", src: "/portfolio/053-w047.webp", width: 1600, height: 1202, title: { nl: "OpenAI koppelen, licht en donker", en: "Connect OpenAI, light and dark" }, tags: ["saas", "ai", "onboarding", "light", "dark"], tone: "light" },
  { id: "054-w048", src: "/portfolio/054-w048.webp", width: 1600, height: 1202, title: { nl: "Airwrap koppelen in de Dyson-app", en: "Pairing an Airwrap in the Dyson app" }, tags: ["mobile", "device", "onboarding", "light"], tone: "light" },
  { id: "055-w049", src: "/portfolio/055-w049.webp", width: 1600, height: 1202, title: { nl: "Schermen van de Sparkwave-app", en: "Sparkwave app screens" }, tags: ["mobile", "device", "light", "settings", "onboarding"], tone: "light" },
  { id: "056-w050", src: "/portfolio/056-w050.webp", width: 1600, height: 1202, title: { nl: "Transactiedetails van een Bitcoin-wallet", en: "Bitcoin wallet transaction details" }, tags: ["saas", "finance", "dark", "dashboard"], tone: "dark" },
];

/**
 * Motion pieces. Always render these with the matching `poster` so the tile
 * shows a real frame while the video loads (and in browsers that cannot decode
 * the file) instead of a black rectangle.
 */
export const portfolioVideos = [
  { id: "a000", src: "/portfolio/video/001-a000.mp4", poster: "/portfolio/video/001-a000-poster.webp", width: 1600, height: 1038, duration: 42, title: { nl: "Serverbeheer, stap voor stap", en: "Server management, step by step" } },
  { id: "a000b", src: "/portfolio/video/002-a000b.mp4", poster: "/portfolio/video/002-a000b-poster.webp", width: 760, height: 720, duration: 9, title: { nl: "Micro-interactie", en: "Micro-interaction" } },
  { id: "a000c", src: "/portfolio/video/003-a000c.mp4", poster: "/portfolio/video/003-a000c-poster.webp", width: 1600, height: 900, duration: 17, title: { nl: "Interface in beweging", en: "Interface in motion" } },
] as const;

export function portfolioByTag(tag: PortfolioTag, limit?: number) {
  const list = portfolio.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
}
