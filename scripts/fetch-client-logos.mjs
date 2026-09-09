#!/usr/bin/env node
/**
 * Download client logos from Brandfetch into `public/logos`.
 *
 * The logos are fetched once and committed, so the API key never reaches the
 * browser and the logo wall needs no third-party request at runtime.
 *
 *   BRANDFETCH_API_KEY=... node scripts/fetch-client-logos.mjs
 *   BRANDFETCH_API_KEY=... node scripts/fetch-client-logos.mjs nike bmw
 *
 * Brandfetch labels each asset with the colour of the mark itself:
 *   theme "dark"  = a dark/ink mark, made for LIGHT backgrounds
 *   theme "light" = a white mark, made for DARK backgrounds
 * The logo wall lives on the site's light (paper) sections, so we want the
 * "dark" variant, falling back to whatever exists. Colour marks such as the
 * BMW roundel are kept in colour and never recoloured.
 *
 * Brands with no usable vector asset are reported at the end; those render as a
 * typographic wordmark until someone supplies the file. Ask the client for an
 * SVG, drop it at `public/logos/<slug>.svg`, and set `logo` in
 * `src/data/clients.ts`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "public/logos");
mkdirSync(outDir, { recursive: true });

const key = process.env.BRANDFETCH_API_KEY;
if (!key) {
  console.error("Set BRANDFETCH_API_KEY (see .env.example). Nothing was written.");
  process.exit(1);
}

/**
 * Brandfetch resolves brands by domain. NMBS/SNCB is one company under two
 * language names; belgiantrain.be carries the language-neutral "B" mark.
 */
const DOMAINS = {
  nmbs: "belgiantrain.be",
  dewatergroep: "dewatergroep.be",
  idewe: "idewe.be",
  bmw: "bmw.com",
  nike: "nike.com",
  openai: "openai.com",
  // No logo in Brandfetch as of this writing — both render as wordmarks:
  rbfa: "rbfa.be",
  museumpass: "museumpassmusees.be",
};

/** Adobe exports carry a <metadata> block with an invalid namespace that breaks strict SVG parsers. */
function cleanSvg(text) {
  return text
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const slugs = only.length ? only : Object.keys(DOMAINS);

const missing = [];
for (const slug of slugs) {
  const domain = DOMAINS[slug];
  if (!domain) {
    console.log(`skip ${slug} — no domain mapped`);
    continue;
  }
  try {
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const brand = await res.json();

    // Rank: a full wordmark beats a bare symbol; vector beats raster (a colour
    // mark like the BMW roundel is only offered as SVG under one theme, so
    // format has to outrank theme); then a dark mark for our light sections;
    // then the largest.
    const rank = (f) =>
      (f.type === "logo" ? 0 : f.type === "symbol" ? 10 : 20) +
      (f.format === "svg" ? 0 : 3) +
      (f.theme === "dark" ? 0 : 1);
    const ranked = (brand.logos ?? [])
      .flatMap((l) => (l.formats ?? []).map((f) => ({ ...f, type: l.type, theme: l.theme })))
      .filter((f) => f.format === "svg" || f.format === "png")
      .sort((a, b) => rank(a) - rank(b) || (b.width ?? 0) - (a.width ?? 0));

    const best = ranked[0];
    // A tiny asset is a favicon in disguise; a wordmark that small will look broken.
    if (!best || (best.format === "png" && (best.width ?? 0) < 240)) {
      missing.push(`${slug} (${domain}) — ${best ? `only a ${best.width}px ${best.format}` : "no logo in Brandfetch"}`);
      continue;
    }

    const bin = Buffer.from(await (await fetch(best.src)).arrayBuffer());
    const file = resolve(outDir, `${slug}.${best.format}`);
    if (best.format === "svg") {
      writeFileSync(file, cleanSvg(bin.toString("utf8")), "utf8");
    } else {
      writeFileSync(file, bin);
    }
    console.log(`ok   ${slug.padEnd(14)} ${best.type}/${best.theme} ${best.format} ${best.width}x${best.height}`);
  } catch (err) {
    missing.push(`${slug} (${domain}) — ${String(err).slice(0, 90)}`);
  }
}

if (missing.length) {
  console.log("\nNo usable logo for:");
  for (const m of missing) console.log("  - " + m);
  console.log(
    "\nThese render as a typographic wordmark. To use the real mark, ask the client for a\n" +
      "transparent SVG, save it as public/logos/<slug>.svg and set `logo` in src/data/clients.ts.",
  );
}

// Keep the data file honest about what actually exists on disk.
const data = await readFile(resolve(root, "src/data/clients.ts"), "utf8");
for (const [, slug, logo] of data.matchAll(/slug: "([^"]+)",\s*\n\s*name: "[^"]*",\s*\n\s*logo: (null|"[^"]+")/g)) {
  if (logo === "null") continue;
  const rel = logo.slice(1, -1);
  try {
    await readFile(resolve(root, "public", rel.replace(/^\//, "")));
  } catch {
    console.log(`WARN clients.ts points ${slug} at ${rel}, which is not on disk.`);
  }
}
