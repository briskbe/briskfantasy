import type { ReactNode } from "react";
import type { Namespace } from "@/i18n/request";
import { getClientMessages } from "./messages";
import { ScopedMessages } from "./scoped-messages";

export async function RouteMessages({
  children,
  locale,
  namespaces,
}: {
  children: ReactNode;
  locale: string;
  namespaces: readonly Namespace[];
}) {
  const messages = await getClientMessages(locale, namespaces);
  return <ScopedMessages messages={messages}>{children}</ScopedMessages>;
}
