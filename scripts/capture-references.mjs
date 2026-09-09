#!/usr/bin/env node
/**
 * Refresh the bundled reference screenshots in `public/references`.
 *
 * Every card on the site renders this static capture instantly and layers a
 * fresh Microlink capture on top at runtime, so these files only need to be
 * good enough to be the first paint and the offline fallback. Re-run this when
 * a client redesigns their site, or to clear a `captureQuality: "weak"` flag in
 * `src/data/references.ts`.
 *
 *   node scripts/capture-references.mjs              # only the weak ones
 *   node scripts/capture-references.mjs --all        # all 17
 *   node scripts/capture-references.mjs landelijkglas-be city-housing-be
 *
 * Microlink's free tier allows ~25 requests/minute and a daily quota; this
 * script paces itself and retries. With a paid key, set MICROLINK_API_KEY.
 */
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "public/references");
mkdirSync(outDir, { recursive: true });

// Parsed straight out of the data file so the two never drift apart.
const src = await import("node:fs").then((fs) =>
  fs.promises.readFile(resolve(root, "src/data/references.ts"), "utf8"),
);
const entries = [...src.matchAll(/slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*url:\s*"([^"]+)"/g)].map(
  ([, slug, name, url]) => ({ slug, name, url, weak: false }),
);
for (const e of entries) {
  const block = src.slice(src.indexOf(`slug: "${e.slug}"`), src.indexOf(`slug: "${e.slug}"`) + 1600);
  e.weak = /captureQuality:\s*"weak"/.test(block.split("slug:")[1] ?? block);
}

const args = process.argv.slice(2);
const named = args.filter((a) => !a.startsWith("--"));
const targets = named.length
  ? entries.filter((e) => named.includes(e.slug))
  : args.includes("--all")
    ? entries
    : entries.filter((e) => e.weak);

if (!targets.length) {
  console.log("Nothing to capture. Use --all, or pass slugs. Known slugs:");
  console.log(entries.map((e) => "  " + e.slug).join("\n"));
  process.exit(0);
}

const key = process.env.MICROLINK_API_KEY;
const endpoint = key ? "https://pro.microlink.io" : "https://api.microlink.io";

/** Give slow hero images and entrance animations time to settle. */
const WAIT_MS = 6000;

let failures = 0;
for (const [i, t] of targets.entries()) {
  const params = new URLSearchParams({
    url: t.url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1440",
    "viewport.height": "900",
    "viewport.deviceScaleFactor": "2",
    waitForTimeout: String(WAIT_MS),
  });
  // `ttl` (cache control) is a paid-plan parameter; sending it on the free tier
  // fails the whole request with HTTP 400.
  if (key) params.set("ttl", "1h");
  const api = `${endpoint}/?${params}`;
  let ok = false;
  for (let attempt = 0; attempt < 3 && !ok; attempt++) {
    try {
      const res = await fetch(api, { headers: key ? { "x-api-key": key } : {} });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status} ${body.slice(0, 160)}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 20_000) throw new Error(`suspiciously small response (${buf.length} B)`);
      const file = resolve(outDir, `${t.slug}.webp`);
      await sharp(buf).resize(1600, null, { withoutEnlargement: true }).webp({ quality: 82 }).toFile(file);
      const { width, height, size } = await sharp(file).metadata();
      console.log(`ok   ${t.slug.padEnd(28)} ${width}x${height} ${Math.round((size ?? 0) / 1024)} KB`);
      ok = true;
    } catch (err) {
      console.log(`warn ${t.slug} attempt ${attempt + 1}: ${String(err).slice(0, 180)}`);
      await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
    }
  }
  if (!ok) {
    failures++;
    console.log(`FAIL ${t.slug} — left the existing capture in place`);
  }
  // Stay under the free tier's per-minute allowance.
  if (i < targets.length - 1) await new Promise((r) => setTimeout(r, 2500));
}

console.log(
  `\n${targets.length - failures}/${targets.length} captured.` +
    (failures ? " Re-run later for the rest (the free tier has a daily quota)." : " Clear any captureQuality: \"weak\" flags you just fixed in src/data/references.ts."),
);
process.exit(failures ? 1 : 0);
