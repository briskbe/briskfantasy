import { dutchMarket } from "./nl";
import { frenchMarket } from "./fr";
import { germanMarket } from "./de";
import { britishMarket } from "./uk";
import { americanMarket } from "./us";
import type { MarketContent, MarketPageId } from "./types";
import { siteConfig } from "@/data/site";

export const markets: MarketContent[] = [dutchMarket, frenchMarket, germanMarket, britishMarket, americanMarket];

export function marketPath(market: MarketContent, pageId: MarketPageId = "home") {
  const page = market.pages.find((item) => item.id === pageId);
  if (!page) throw new Error(`Missing ${pageId} in ${market.id}`);
  return market.prefix + (page.slug ? `/${page.slug}` : "");
}

// Only equivalent intent pages belong in the same alternate set.
export const legacyMarketPaths: Partial<Record<MarketPageId, { nl: string; en: string }>> = {
  home: { nl: "/", en: "/en" },
  websites: { nl: "/website-op-maat", en: "/en/custom-websites" },
  ecommerce: { nl: "/webshop-op-maat", en: "/en/custom-webshops" },
  pricing: { nl: "/diensten/website-laten-maken-kosten", en: "/en/services/website-development-cost" },
  redesign: { nl: "/diensten/website-laten-vernieuwen", en: "/en/services/website-redesign" },
};

export function marketPageForLegacyPath(path: string): MarketPageId | undefined {
  return (Object.keys(legacyMarketPaths) as MarketPageId[]).find((id) => {
    const paths = legacyMarketPaths[id];
    return paths?.nl === path || paths?.en === path;
  });
}

export function marketAlternates(pageId: MarketPageId): Record<string, string> {
  const legacy = legacyMarketPaths[pageId];
  const languages: Record<string, string> = {};
  if (legacy) {
    languages.nl = siteConfig.url + (legacy.nl === "/" ? "" : legacy.nl);
    languages["nl-BE"] = languages.nl;
    languages.en = siteConfig.url + legacy.en;
  }
  for (const market of markets) languages[market.id] = siteConfig.url + marketPath(market, pageId);
  languages["x-default"] = languages.nl ?? siteConfig.url + marketPath(dutchMarket, pageId);
  return languages;
}
