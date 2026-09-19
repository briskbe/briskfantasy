/**
 * Basic consent: no Google code is requested until the visitor opts in.
 * The choice is shared by all routes and tabs on this origin. If browser
 * storage is unavailable, it applies only to the current document.
 */
export const GOOGLE_ANALYTICS_ID = "G-4TBZ9KYGCS";
export const ANALYTICS_CONSENT_KEY = "brisk:analytics-consent:v1";
export const ANALYTICS_SETTINGS_EVENT = "brisk:open-analytics-settings";
const CHANGED_EVENT = "brisk:analytics-consent-changed";
const DISABLE_KEY = `ga-disable-${GOOGLE_ANALYTICS_ID}` as const;

export type AnalyticsConsent = "accepted" | "rejected" | "unset";
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    "ga-disable-G-4TBZ9KYGCS"?: boolean;
    __briskAnalyticsInitialized?: boolean;
    __briskAnalyticsGranted?: boolean;
  }
}

let inMemoryChoice: AnalyticsConsent = "unset";
let storageUnavailable = false;

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "unset";
  if (storageUnavailable) return inMemoryChoice;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    inMemoryChoice = value === "accepted" || value === "rejected" ? value : "unset";
  } catch {
    storageUnavailable = true;
  }
  return inMemoryChoice;
}

function removeAnalyticsCookies() {
  // GA cookies use path=/ here. Try host-only and each applicable domain;
  // browsers ignore domains that cannot be set by this origin.
  const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name === `_ga_${GOOGLE_ANALYTICS_ID.slice(2)}`);
  const labels = window.location.hostname.split(".");
  const domains = ["", ...labels.map((_, index) => labels.slice(index).join("."))];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

/** Disable synchronously, before React updates and before any consent command. */
export function disableAnalytics() {
  if (typeof window === "undefined") return;
  window[DISABLE_KEY] = true;
  if (window.__briskAnalyticsGranted && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.__briskAnalyticsGranted = false;
  try {
    removeAnalyticsCookies();
  } catch {
    // Browsers that block cookies must still be able to save a preference.
  }
}

/** Called after the Google script loads, or when existing consent is restored. */
export function initializeAnalytics() {
  if (readAnalyticsConsent() !== "accepted") {
    disableAnalytics();
    return;
  }
  window[DISABLE_KEY] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    // Keep Google's documented Arguments-object queue format.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  if (!window.__briskAnalyticsInitialized) {
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_ANALYTICS_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    window.__briskAnalyticsInitialized = true;
  } else if (!window.__briskAnalyticsGranted) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  window.__briskAnalyticsGranted = true;
}

export function saveAnalyticsConsent(choice: Exclude<AnalyticsConsent, "unset">) {
  inMemoryChoice = choice;
  if (choice === "rejected") disableAnalytics();
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
  } catch {
    storageUnavailable = true;
  }
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

export function subscribeToAnalyticsConsent(onChange: () => void) {
  const changed = () => {
    if (readAnalyticsConsent() !== "accepted") disableAnalytics();
    onChange();
  };
  const storageChanged = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) changed();
  };
  window.addEventListener(CHANGED_EVENT, changed);
  window.addEventListener("storage", storageChanged);
  return () => {
    window.removeEventListener(CHANGED_EVENT, changed);
    window.removeEventListener("storage", storageChanged);
  };
}
