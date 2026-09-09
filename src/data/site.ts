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
  googleRating: { score: 5, reviews: 49, url: "" },
  /**
   * WhatsApp number in the format wa.me expects: country code first, digits
   * only, no `+`, no spaces and no leading zero. `display` is the same number
   * written for people. Empty `number` hides the chat widget entirely.
   */
  whatsapp: { number: "32470070981", display: "+32 470 07 09 81" },
} as const;
