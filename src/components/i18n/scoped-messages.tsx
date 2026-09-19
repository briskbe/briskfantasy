"use client";

import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { useMemo, type ComponentProps, type ReactNode } from "react";

type Messages = NonNullable<ComponentProps<typeof NextIntlClientProvider>["messages"]>;

/**
 * next-intl replaces messages atomically. Merge in the browser so shared messages
 * remain available without serializing Common/Nav again in every nested layout.
 */
export function ScopedMessages({ children, messages }: { children: ReactNode; messages: Messages }) {
  const locale = useLocale();
  const inherited = useMessages();
  const merged = useMemo(() => ({ ...inherited, ...messages }), [inherited, messages]);

  return (
    <NextIntlClientProvider locale={locale} messages={merged}>
      {children}
    </NextIntlClientProvider>
  );
}
