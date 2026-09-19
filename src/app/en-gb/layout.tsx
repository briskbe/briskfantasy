import { britishMarket } from "@/data/markets/uk";
import { MarketLayout, marketLayoutMetadata } from "@/components/pages/markets/market-layout";
export const metadata = marketLayoutMetadata;
export const viewport = { themeColor: "#0c1619", width: "device-width", initialScale: 1 };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MarketLayout market={britishMarket}>{children}</MarketLayout>;
}
