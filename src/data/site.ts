export const siteConfig = {
  name: "Brisk",
  legalName: "Brisk",
  url: "https://www.brisk.be",
  email: "info@brisk.be",
  phone: "",
  location: { nl: "Herenstraat 15, 3600 Genk, België", en: "Herenstraat 15, 3600 Genk, Belgium" },
  address: { streetAddress: "Herenstraat 15", postalCode: "3600", addressLocality: "Genk", addressRegion: "Limburg", addressCountry: "BE" },
  googleBusinessUrl: "https://share.google/Tkmzs3bYo20H0FaJP",
  heroVideo: "/hero-video.mp4",
  heroPoster: "/hero-poster.jpg",
  /**
   * Real profiles only. These are also emitted as `sameAs` in the organisation
   * structured data, where a link to a platform's home page instead of the
   * actual account is worse than no link at all.
   */
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/brisk.be/" },
    { label: "TikTok", href: "https://www.tiktok.com/@brisk.be" },
  ],
  /** Optional external booking link (Cal.com / Calendly). Empty = hidden, form is used instead. */
  bookingUrl: "",
  /**
   * Websites, webshops and custom software delivered to date. Everything shown
   * on the site is a selection out of this, not the whole body of work, so copy
   * should always frame the visible references as examples.
   * Stated as "150+" — keep it a round floor, never an exact count.
   */
  projectsDelivered: 150,
  /**
   * Google Business rating shown in the homepage hero. `score` is out of 5 and
   * may be fractional — the stars fill proportionally. Set `url` to the public
   * reviews page and the badge becomes a link; leave it empty and it renders as
   * plain text. Update both numbers together when the profile changes.
   */
  googleRating: { score: 5, reviews: 49, url: "https://share.google/Tkmzs3bYo20H0FaJP" },
  /**
   * WhatsApp number in the format wa.me expects: country code first, digits
   * only, no `+`, no spaces and no leading zero. `display` is the same number
   * written for people. Empty `number` hides the chat widget entirely.
   */
  whatsapp: { number: "31645045527", display: "+31 6 45045527" },
} as const;
