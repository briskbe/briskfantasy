import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "@/app/cms/cms.css";

export const metadata: Metadata = { title: "Your proposal · Brisk", robots: { index: false, follow: false, nocache: true }, referrer: "no-referrer" };
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#14372d" };
export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-theme="light" className={`${fontVariables} cms-theme`}><body>{children}</body></html>;
}
