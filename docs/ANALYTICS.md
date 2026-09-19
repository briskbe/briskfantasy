# Google Analytics

The site uses GA4 measurement ID `G-4TBZ9KYGCS` in both the main NL/EN layout and all five international market layouts.

The Google tag is requested only after the visitor selects **Allow / Toestaan / Autoriser / Zulassen**. Declining sends no analytics requests. The consent panel has NL, EN, FR and DE copy, and every footer provides cookie settings. Preferences persist in local storage under `brisk:analytics-consent:v1`; when storage is blocked, the choice lasts for the current document.

Withdrawing consent immediately sets Google's property disable flag, updates consent and removes the accessible `_ga` and `_ga_4TBZ9KYGCS` cookies. Changes also apply to other open tabs. Advertising storage, advertising personalization and Google signals are disabled in this integration. The NL/EN privacy pages explain these choices.

## Page views

The tag is configured once per document. GA4 enhanced measurement handles subsequent browser-history page views; the application does not send a second manual page-view event.

In the GA4 web stream, keep **Enhanced measurement → Page views → Page changes based on browser history events** enabled. This Google-account setting cannot be verified from the repository. After deployment, accept analytics and check Realtime or DebugView while navigating between pages. Do not add a second copy of this ID through Google Tag Manager or another site integration.

## Verification

Run against a production build:

```sh
pnpm build
pnpm start
# In a second terminal:
BASE_URL=http://localhost:3000 pnpm analytics:smoke
```

The smoke test intercepts Google traffic locally, so it cannot send test events to the live property. It covers initial consent, rejection persistence, acceptance, single initialization, navigation, cancellation, withdrawal, cookie deletion, cross-tab changes, blocked storage and a blocked Google script. It validates application behavior, not receipt of events by the Google account.

The integration follows Google's [basic consent approach](https://developers.google.com/tag-platform/security/concepts/consent-mode), [analytics disable flag](https://developers.google.com/tag-platform/security/guides/privacy) and [page-view guidance](https://developers.google.com/analytics/devguides/collection/ga4/views).
