import { siteConfig } from "../data/site";
import { button, c, divider, esc, escMultiline, eyebrow, font, mono, panel, renderEmail, row, serif } from "./shell";

/**
 * The two emails a form submission produces: a confirmation for the visitor in
 * their own language, and a notification for the studio.
 *
 * Every builder returns `subject`, `html` and `text`. The plain-text part is not
 * optional politeness — a multipart message lands better with spam filters, and
 * some people genuinely read mail as text.
 */

export type LeadLocale = "nl" | "en";

export interface Lead {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  locale: LeadLocale;
}

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name.trim();

const copy = {
  nl: {
    subject: "We hebben je bericht ontvangen — Brisk",
    preheader: "Je aanvraag is binnen. Je hoort binnen 24 uur van ons, meestal sneller.",
    eyebrow: "Aanvraag ontvangen",
    lead: "Je bericht staat bij ons in de inbox en wordt door een mens gelezen, niet door een ticketsysteem. Je krijgt binnen 24 uur antwoord, meestal sneller.",
    stepsTitle: "Wat er nu gebeurt",
    steps: [
      "We lezen je aanvraag en kijken naar wat je vandaag online hebt staan.",
      "Je krijgt een persoonlijk antwoord met onze eerste gedachten en vragen.",
      "Klikt het? Dan plannen we een gesprek van 30 minuten. Gratis en vrijblijvend.",
    ],
    summaryTitle: "Dit heb je ons gestuurd",
    labels: { service: "Dienst", budget: "Budget", message: "Je bericht", company: "Bedrijf" },
    cta: "Bekijk ons werk",
    urgentTitle: "Liever meteen?",
    urgentBody: "Stuur ons een bericht op WhatsApp, dan hebben we het er vandaag nog over.",
    signOff: "Tot snel,",
    signName: "Het team van Brisk",
    footerNote: "Je krijgt deze mail omdat je het contactformulier op brisk.be hebt ingevuld.",
  },
  en: {
    subject: "We've got your message — Brisk",
    preheader: "Your enquiry has arrived. You'll hear from us within 24 hours, usually sooner.",
    eyebrow: "Enquiry received",
    lead: "Your message is in our inbox and a person will read it, not a ticketing system. You'll have an answer within 24 hours, usually sooner.",
    stepsTitle: "What happens next",
    steps: [
      "We read your enquiry and look at what you have online today.",
      "You get a personal reply with our first thoughts and questions.",
      "If it fits, we book a 30-minute call. Free, no strings attached.",
    ],
    summaryTitle: "What you sent us",
    labels: { service: "Service", budget: "Budget", message: "Your message", company: "Company" },
    cta: "See our work",
    urgentTitle: "Need us sooner?",
    urgentBody: "Send us a WhatsApp message and we'll get to it today.",
    signOff: "Talk soon,",
    signName: "The Brisk team",
    footerNote: "You're receiving this because you filled in the contact form on brisk.be.",
  },
} as const;

const workPath = { nl: "/referenties", en: "/en/work" } as const;

/** Numbered steps, as a table so the numerals stay aligned in every client. */
function steps(items: readonly string[]): string {
  const rows = items
    .map(
      (item, i) => `<tr>
        <td width="34" valign="top" style="padding:0 14px 14px 0;font-family:${mono};font-size:12px;line-height:1.6;color:${c.lime};">${String(i + 1).padStart(2, "0")}</td>
        <td valign="top" style="padding:0 0 14px 0;font-family:${font};font-size:15px;line-height:1.6;color:${c.fg2};">${esc(item)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

function footerBlock(): string {
  const { url, email, whatsapp } = siteConfig;
  return `
    <a href="${url}" style="color:${c.fg2};text-decoration:none;">brisk.be</a>
    &nbsp;&middot;&nbsp;
    <a href="mailto:${email}" style="color:${c.fg2};text-decoration:none;">${email}</a>
    &nbsp;&middot;&nbsp;
    <a href="https://wa.me/${whatsapp.number}" style="color:${c.fg2};text-decoration:none;">${whatsapp.display}</a>
    <br />
    Websites, webshops, software en apps op maat &mdash; ${siteConfig.projectsDelivered}+ projecten in ruim 17 jaar.`;
}

/* ------------------------------------------------------------------ */
/* To the visitor                                                       */
/* ------------------------------------------------------------------ */

export function confirmationEmail(lead: Lead): BuiltEmail {
  const t = copy[lead.locale];
  const url = siteConfig.url;

  const summaryRows = [
    lead.service ? row(t.labels.service, esc(lead.service)) : "",
    lead.budget ? row(t.labels.budget, esc(lead.budget)) : "",
    row(t.labels.message, escMultiline(lead.message)),
  ].join("");

  const body = `
    ${eyebrow(t.eyebrow)}
    <h1 class="sm-h1" style="margin:18px 0 0 0;font-family:${font};font-size:36px;line-height:1.1;letter-spacing:-1px;font-weight:700;color:${c.fg};">
      ${lead.locale === "nl" ? "Bedankt" : "Thank you"}, <span style="font-family:${serif};font-style:italic;font-weight:400;color:${c.lime};">${esc(firstName(lead.name))}</span>.
    </h1>
    <p style="margin:20px 0 0 0;font-family:${font};font-size:16px;line-height:1.65;color:${c.fg2};">${esc(t.lead)}</p>

    <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
    ${divider()}
    <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>

    <p style="margin:0 0 18px 0;font-family:${mono};font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:${c.muted};">${esc(t.stepsTitle)}</p>
    ${steps(t.steps)}

    <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>
    ${panel(`<p style="margin:0 0 18px 0;font-family:${mono};font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:${c.muted};">${esc(t.summaryTitle)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${summaryRows}</table>`)}

    <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
    ${button(t.cta, `${url}${workPath[lead.locale]}`)}

    <div style="height:32px;line-height:32px;font-size:0;">&nbsp;</div>
    ${divider()}
    <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>

    <p style="margin:0;font-family:${font};font-size:15px;line-height:1.6;color:${c.fg};font-weight:600;">${esc(t.urgentTitle)}</p>
    <p style="margin:6px 0 0 0;font-family:${font};font-size:15px;line-height:1.6;color:${c.fg2};">
      ${esc(t.urgentBody)}
      <a href="https://wa.me/${siteConfig.whatsapp.number}" style="color:${c.lime};text-decoration:none;white-space:nowrap;">${siteConfig.whatsapp.display}</a>
    </p>

    <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>
    <p style="margin:0;font-family:${font};font-size:15px;line-height:1.6;color:${c.fg2};">
      ${esc(t.signOff)}<br /><span style="color:${c.fg};font-weight:600;">${esc(t.signName)}</span>
    </p>`;

  const text = [
    t.eyebrow.toUpperCase(),
    "",
    `${lead.locale === "nl" ? "Bedankt" : "Thank you"}, ${firstName(lead.name)}.`,
    "",
    t.lead,
    "",
    `${t.stepsTitle}:`,
    ...t.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    `${t.summaryTitle}:`,
    lead.service ? `${t.labels.service}: ${lead.service}` : "",
    lead.budget ? `${t.labels.budget}: ${lead.budget}` : "",
    `${t.labels.message}: ${lead.message}`,
    "",
    `${t.urgentTitle} ${t.urgentBody} ${siteConfig.whatsapp.display} — https://wa.me/${siteConfig.whatsapp.number}`,
    "",
    t.signOff,
    t.signName,
    "",
    `${siteConfig.url} · ${siteConfig.email}`,
    t.footerNote,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    subject: t.subject,
    text,
    html: renderEmail({
      title: t.subject,
      preheader: t.preheader,
      body,
      footer: `${footerBlock()}<br /><span style="color:${c.muted};">${esc(t.footerNote)}</span>`,
    }),
  };
}

/* ------------------------------------------------------------------ */
/* To the studio                                                        */
/* ------------------------------------------------------------------ */

/** Always Dutch: this one is read internally, never by the visitor. */
export function notificationEmail(lead: Lead, receivedAt = new Date()): BuiltEmail {
  const stamp = new Intl.DateTimeFormat("nl-BE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Brussels",
  }).format(receivedAt);

  const subject = `Nieuwe aanvraag — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;

  const details = [
    row("E-mail", esc(lead.email), { href: `mailto:${lead.email}` }),
    lead.company ? row("Bedrijf", esc(lead.company)) : "",
    lead.service ? row("Dienst", esc(lead.service)) : "",
    lead.budget ? row("Budget", esc(lead.budget)) : "",
    row("Taal van het formulier", lead.locale === "nl" ? "Nederlands" : "Engels"),
    row("Ontvangen", esc(stamp)),
  ].join("");

  const body = `
    ${eyebrow("Nieuwe aanvraag via brisk.be")}
    <h1 class="sm-h1" style="margin:18px 0 0 0;font-family:${font};font-size:34px;line-height:1.12;letter-spacing:-1px;font-weight:700;color:${c.fg};">${esc(lead.name)}</h1>
    ${lead.company ? `<p style="margin:8px 0 0 0;font-family:${font};font-size:16px;line-height:1.5;color:${c.lime};">${esc(lead.company)}</p>` : ""}

    <div style="height:28px;line-height:28px;font-size:0;">&nbsp;</div>
    ${panel(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${details}</table>`)}

    <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
    <p style="margin:0 0 12px 0;font-family:${mono};font-size:11px;letter-spacing:1.8px;text-transform:uppercase;color:${c.muted};">Bericht</p>
    ${panel(`<div style="font-family:${font};font-size:15px;line-height:1.7;color:${c.fg};">${escMultiline(lead.message)}</div>`)}

    <div style="height:30px;line-height:30px;font-size:0;">&nbsp;</div>
    ${button("Beantwoorden", `mailto:${lead.email}?subject=${encodeURIComponent(`Re: je aanvraag bij Brisk`)}`)}
    <p style="margin:16px 0 0 0;font-family:${font};font-size:13px;line-height:1.6;color:${c.muted};">
      Antwoorden op deze mail gaat rechtstreeks naar ${esc(lead.email)}.
    </p>`;

  const text = [
    `NIEUWE AANVRAAG VIA BRISK.BE`,
    "",
    `Naam: ${lead.name}`,
    `E-mail: ${lead.email}`,
    lead.company ? `Bedrijf: ${lead.company}` : "",
    lead.service ? `Dienst: ${lead.service}` : "",
    lead.budget ? `Budget: ${lead.budget}` : "",
    `Taal: ${lead.locale === "nl" ? "Nederlands" : "Engels"}`,
    `Ontvangen: ${stamp}`,
    "",
    "Bericht:",
    lead.message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  return {
    subject,
    text,
    html: renderEmail({
      title: subject,
      preheader: `${lead.name}${lead.service ? ` — ${lead.service}` : ""}${lead.budget ? ` — ${lead.budget}` : ""}`,
      body,
      footer: `Verstuurd door het contactformulier op <a href="${siteConfig.url}" style="color:${c.fg2};text-decoration:none;">brisk.be</a>.`,
    }),
  };
}
