import { getMessages } from "next-intl/server";
import type { Namespace } from "@/i18n/request";

/** Keep server-only copy out of the client payload; explicit locales preserve static rendering. */
export async function getClientMessages(locale: string, namespaces: readonly Namespace[]) {
  const messages = await getMessages({ locale });
  return Object.fromEntries(namespaces.map((namespace) => [namespace, messages[namespace]]));
}
