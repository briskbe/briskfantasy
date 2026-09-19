export const analyticsCopy = {
  nl: {
    title: "Statistieken voor een betere website",
    description: "Met jouw toestemming gebruiken we Google Analytics en analytische cookies om te begrijpen hoe onze website wordt gebruikt. Je kunt weigeren en je keuze later wijzigen via de cookie-instellingen.",
    accept: "Toestaan",
    reject: "Weigeren",
    settings: "Cookie-instellingen",
    close: "Sluiten",
    enabled: "Je hebt statistieken toegestaan.",
    disabled: "Je hebt statistieken geweigerd.",
    privacy: "Privacybeleid",
    privacyHref: "/privacy#analytics",
  },
  en: {
    title: "Analytics to improve our website",
    description: "With your permission, we use Google Analytics and analytics cookies to understand how our website is used. You can decline and change your choice later in the cookie settings.",
    accept: "Allow",
    reject: "Decline",
    settings: "Cookie settings",
    close: "Close",
    enabled: "You have allowed analytics.",
    disabled: "You have declined analytics.",
    privacy: "Privacy policy",
    privacyHref: "/en/privacy#analytics",
  },
  fr: {
    title: "Des statistiques pour améliorer notre site",
    description: "Avec votre accord, nous utilisons Google Analytics et des cookies de mesure d’audience pour comprendre l’utilisation de notre site. Vous pouvez refuser et modifier votre choix dans les paramètres des cookies.",
    accept: "Autoriser",
    reject: "Refuser",
    settings: "Paramètres des cookies",
    close: "Fermer",
    enabled: "Vous avez autorisé les statistiques.",
    disabled: "Vous avez refusé les statistiques.",
    privacy: "Politique de confidentialité (en anglais)",
    privacyHref: "/en/privacy#analytics",
  },
  de: {
    title: "Statistiken zur Verbesserung unserer Website",
    description: "Mit Ihrer Zustimmung verwenden wir Google Analytics und Analyse-Cookies, um die Nutzung unserer Website zu verstehen. Sie können ablehnen und Ihre Auswahl später in den Cookie-Einstellungen ändern.",
    accept: "Zulassen",
    reject: "Ablehnen",
    settings: "Cookie-Einstellungen",
    close: "Schließen",
    enabled: "Sie haben Statistiken zugelassen.",
    disabled: "Sie haben Statistiken abgelehnt.",
    privacy: "Datenschutzerklärung (Englisch)",
    privacyHref: "/en/privacy#analytics",
  },
} as const;

export function getAnalyticsCopy(locale: string) {
  const language = locale.toLowerCase().split(/[-_]/u)[0];
  return analyticsCopy[language as keyof typeof analyticsCopy] ?? analyticsCopy.en;
}
