import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { RouteMessages } from "@/components/i18n/route-messages";

export default async function ContactLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RouteMessages locale={locale} namespaces={["Contact"]}>{children}</RouteMessages>;
}
