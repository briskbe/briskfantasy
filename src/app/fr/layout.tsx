import { frenchMarket } from "@/data/markets/fr";
import { MarketLayout, marketLayoutMetadata } from "@/components/pages/markets/market-layout";
export const metadata = marketLayoutMetadata;
export const viewport = { themeColor: "#0c1619", width: "device-width", initialScale: 1 };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MarketLayout market={frenchMarket}>{children}</MarketLayout>;
}
