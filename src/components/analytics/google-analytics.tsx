"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { getAnalyticsCopy } from "./copy";
import {
  ANALYTICS_SETTINGS_EVENT,
  GOOGLE_ANALYTICS_ID,
  disableAnalytics,
  initializeAnalytics,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeToAnalyticsConsent,
  type AnalyticsConsent,
} from "./consent";

const serverConsent = () => "pending" as const;

/**
 * Mount once in each root layout. No next-intl provider is required.
 * GA4 enhanced measurement owns history pageviews: this component deliberately
 * sends no manual route events and configures the measurement ID only once.
 */
export function GoogleAnalytics({ locale }: { locale: string }) {
  const copy = getAnalyticsCopy(locale);
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, readAnalyticsConsent, serverConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const open = (event: Event) => {
      const trigger = (event as CustomEvent<{ trigger?: HTMLElement }>).detail?.trigger;
      returnFocusRef.current = trigger instanceof HTMLElement ? trigger : null;
      setSettingsOpen(true);
    };
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, open);
    return () => window.removeEventListener(ANALYTICS_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (settingsOpen) panelRef.current?.focus();
  }, [settingsOpen]);

  useEffect(() => {
    if (consent === "accepted") {
      // A previously loaded tag can resume without injecting or configuring it
      // again. The first initialization happens only in Script's onReady.
      if (window.__briskAnalyticsInitialized) initializeAnalytics();
    } else if (consent !== "pending") {
      disableAnalytics();
    }
  }, [consent]);

  const close = () => {
    setSettingsOpen(false);
    returnFocusRef.current?.focus();
  };
  const choose = (choice: Exclude<AnalyticsConsent, "unset">) => {
    saveAnalyticsConsent(choice);
    close();
  };
  const visible = consent === "unset" || settingsOpen;
  const hasChoice = consent === "accepted" || consent === "rejected";

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="brisk-google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
          onReady={initializeAnalytics}
          onError={disableAnalytics}
        />
      )}
      {visible && (
        <section
          id="analytics-preferences"
          ref={panelRef}
          role="region"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          onKeyDown={(event) => {
            if (event.key === "Escape" && hasChoice) close();
          }}
          className="theme-light fixed inset-x-4 bottom-4 z-[110] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border border-line bg-bg p-5 text-fg shadow-lg sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-lg sm:p-6"
        >
          <div className="flex items-start justify-between gap-5">
            <h2 id={headingId} className="text-base font-medium leading-snug">{settingsOpen ? copy.settings : copy.title}</h2>
            {hasChoice && (
              <button type="button" onClick={close} className="-mt-2 -mr-2 min-h-11 shrink-0 px-2 text-sm text-fg-2 underline underline-offset-4 hover:text-fg">
                {copy.close}
              </button>
            )}
          </div>
          <p id={descriptionId} className="mt-3 text-sm leading-relaxed text-fg-2">{copy.description}</p>
          {settingsOpen && hasChoice && <p className="mt-3 text-sm text-fg-2">{consent === "accepted" ? copy.enabled : copy.disabled}</p>}
          <a href={copy.privacyHref} className="mt-3 inline-block py-1 text-sm text-fg-2 underline underline-offset-4 hover:text-fg">{copy.privacy}</a>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => choose("rejected")} className="min-h-11 rounded-lg border border-line-2 px-4 py-2 text-sm font-medium hover:bg-bg-2">
              {copy.reject}
            </button>
            <button type="button" onClick={() => choose("accepted")} className="min-h-11 rounded-lg border border-line-2 px-4 py-2 text-sm font-medium hover:bg-bg-2">
              {copy.accept}
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Place in each footer so the visitor can review or withdraw their choice. */
export function AnalyticsPreferencesButton({ locale, className }: { locale: string; className?: string }) {
  const copy = getAnalyticsCopy(locale);
  return (
    <button
      type="button"
      aria-controls="analytics-preferences"
      className={className ?? "min-h-11 py-2 text-left text-sm text-muted underline underline-offset-4 hover:text-fg"}
      onClick={(event) => window.dispatchEvent(new CustomEvent(ANALYTICS_SETTINGS_EVENT, { detail: { trigger: event.currentTarget } }))}
    >
      {copy.settings}
    </button>
  );
}
