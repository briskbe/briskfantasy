import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { CmsAppearance } from "@/components/cms/appearance";
import "@/app/cms/cms.css";

export const metadata: Metadata = { title: "Uw offerte · Brisk", robots: { index: false, follow: false, nocache: true }, referrer: "no-referrer" };
export const viewport = { width: "device-width", initialScale: 1 };
export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <html lang="nl-BE" data-theme="light" className={`${fontVariables} cms-theme`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: 'try{document.documentElement.dataset.theme=localStorage.getItem("brisk-cms-theme")==="dark"?"dark":"light"}catch{}' }} /></head><body><CmsAppearance>{children}</CmsAppearance></body></html>;
}
