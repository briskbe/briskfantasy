#!/usr/bin/env node
/**
 * Renders every transactional email to an HTML file so it can be opened in a
 * browser, screenshotted, or pasted into a client-rendering service.
 *
 *   node scripts/preview-emails.mjs [--out .preview]
 *
 * The templates are TypeScript with extensionless imports, which Node's ESM
 * resolver will not load, so they are compiled to CommonJS in a temp directory
 * first — CommonJS resolution handles extensionless specifiers.
 */
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const outDir = resolve(args.includes("--out") ? args[args.indexOf("--out") + 1] : ".preview");

const build = mkdtempSync(join(tmpdir(), "brisk-emails-"));
execFileSync(
  "pnpm",
  ["exec", "tsc", "src/emails/shell.ts", "src/emails/lead.ts", "src/data/site.ts",
   "--outDir", build, "--module", "commonjs", "--moduleResolution", "node",
   "--target", "es2022", "--skipLibCheck", "--esModuleInterop"],
  { stdio: "inherit" },
);

const require = createRequire(import.meta.url);
const { confirmationEmail, notificationEmail } = require(join(build, "emails/lead.js"));

/** A lead with every optional field filled, so nothing goes unrendered. */
const lead = {
  name: "Sofie Vandenberghe",
  email: "sofie@vandenberghe-interieur.be",
  company: "Vandenberghe Interieur",
  service: "Website op maat, Webshop op maat",
  budget: "€ 15.000 – € 30.000",
  message:
    "Dag Brisk,\n\nWe hebben een showroom in Hasselt en verkopen op maat gemaakte keukens en dressings. Onze huidige site is zeven jaar oud, traag op mobiel en we kunnen zelf niets aanpassen.\n\nWat we zoeken: een nieuwe site die het vakmanschap toont, met een configurator waarin klanten een indicatie van de prijs krijgen. Daarnaast willen we onze offertes koppelen aan ons boekhoudpakket.\n\nIs dat iets wat jullie doen? En wat is een realistische termijn?",
  locale: "nl",
};

const cases = [
  ["confirmation-nl", confirmationEmail({ ...lead, locale: "nl" })],
  ["confirmation-en", confirmationEmail({ ...lead, locale: "en", message: "Hi Brisk,\n\nWe run a showroom in Hasselt selling bespoke kitchens. Our site is seven years old, slow on mobile, and we cannot edit anything ourselves.\n\nWe want a new site that shows the craft, with a configurator that gives customers a price indication, and our quotes connected to our accounting package.\n\nIs that something you do, and what would be a realistic timeline?" })],
  ["notification", notificationEmail(lead, new Date("2026-09-09T14:32:00Z"))],
  // The bare minimum a valid submission can carry, to prove nothing collapses.
  ["confirmation-minimal", confirmationEmail({ name: "Jan", email: "jan@example.be", message: "Graag een offerte.", locale: "nl" })],
];

mkdirSync(outDir, { recursive: true });
for (const [name, email] of cases) {
  writeFileSync(join(outDir, `${name}.html`), email.html);
  writeFileSync(join(outDir, `${name}.txt`), `Subject: ${email.subject}\n\n${email.text}`);
  console.log(`${name}  —  ${email.subject}`);
}
console.log(`\nWritten to ${outDir}`);
