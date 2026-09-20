import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ScrollReset } from "@/components/layout/scroll-reset";
import { CmsAppearance } from "@/components/cms/appearance";
import "./cms.css";

export const metadata: Metadata = {
  title: { default: "Brisk Beheer", template: "%s · Brisk Beheer" },
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f5f5" }, { media: "(prefers-color-scheme: dark)", color: "#101012" }] };

export default function CmsRootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="nl-BE" data-theme="light" className={`${fontVariables} cms-theme`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: 'try{document.documentElement.dataset.theme=localStorage.getItem("brisk-cms-theme")==="dark"?"dark":"light"}catch{}' }} /></head><body><CmsAppearance><ScrollReset />{children}</CmsAppearance></body></html>;
}
