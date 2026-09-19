import { britishMarket as market } from "@/data/markets/uk";
import { MarketPageView, resolveMarketPage, marketMetadata, type MarketRouteProps } from "@/components/pages/markets/market-page";
export const dynamicParams = false;
export function generateStaticParams() {
  return market.pages.map((page) => ({ slug: page.slug ? [page.slug] : [] }));
}
export async function generateMetadata({ params }: MarketRouteProps) {
  return marketMetadata(market, resolveMarketPage(market, (await params).slug));
}
export default async function Page({ params }: MarketRouteProps) {
  return <MarketPageView market={market} page={resolveMarketPage(market, (await params).slug)} />;
}
