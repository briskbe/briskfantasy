export const siteConfig = {
  name: "Brisk",
  legalName: "Brisk",
  url: "https://www.brisk.be",
  email: "info@brisk.be",
  phone: "",
  location: { nl: "Limburg, België", en: "Limburg, Belgium" },
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4",
  heroPoster: "/hero-poster.jpg",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
  /** Optional external booking link (Cal.com / Calendly). Empty = hidden, form is used instead. */
  bookingUrl: "",
} as const;
