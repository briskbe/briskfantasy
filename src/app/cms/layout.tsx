import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { ScrollReset } from "@/components/layout/scroll-reset";
import "./cms.css";

export const metadata: Metadata = {
  title: { default: "Brisk Workspace", template: "%s · Brisk Workspace" },
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#14352c" };

export default function CmsRootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-theme="light" className={`${fontVariables} cms-theme`}><body><ScrollReset />{children}</body></html>;
}
