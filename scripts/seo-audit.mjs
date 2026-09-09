#!/usr/bin/env node
/**
 * Audits the rendered HTML of every URL in the sitemap.
 *
 * Run it against a production build (`pnpm build && pnpm start`), because the
 * things that matter here — canonical, hreflang, JSON-LD, the title — are
 * emitted server-side and are exactly what a crawler sees.
 *
 *   node scripts/seo-audit.mjs [--base http://localhost:3000] [--limit 40]
 *
 * Exits non-zero when it finds an error, so it can gate a deploy.
 */
const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const base = flag("--base", "http://localhost:3000");
const limit = Number(flag("--limit", "0")) || Infinity;

const errors = [];
const warnings = [];
const err = (url, msg) => errors.push(`${url} — ${msg}`);
const warn = (url, msg) => warnings.push(`${url} — ${msg}`);

/** The sitemap is the list of pages we are telling Google to index, so it is the list to check. */
const sitemapXml = await (await fetch(`${base}/sitemap.xml`)).text();
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!locs.length) {
  console.error("No URLs found in /sitemap.xml");
  process.exit(1);
}

// Check both language versions of every entry, not just the Dutch one.
const alternates = [...sitemapXml.matchAll(/hreflang="([^"]+)"\s+href="([^"]+)"/g)].map((m) => m[2]);
const urls = [...new Set([...locs, ...alternates])].slice(0, limit);
console.log(`Auditing ${urls.length} URLs from the sitemap…\n`);

const titles = new Map();
const descriptions = new Map();

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};
const decode = (s) =>
  s?.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

for (const url of urls) {
  const path = url.replace(base, "") || "/";
  const res = await fetch(url.startsWith("http") ? url.replace(/^https?:\/\/[^/]+/, base) : url);
  if (!res.ok) {
    err(path, `HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();

  /* --- title --- */
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  if (!title) err(path, "no <title>");
  else {
    if (title.length > 65) warn(path, `title is ${title.length} chars (Google truncates around 60)`);
    if (title.length < 15) warn(path, `title is only ${title.length} chars`);
    if (titles.has(title)) err(path, `duplicate title, same as ${titles.get(title)}`);
    else titles.set(title, path);
  }

  /* --- description --- */
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/i));
  if (!desc) err(path, "no meta description");
  else {
    if (desc.length > 165) warn(path, `description is ${desc.length} chars (truncated around 160)`);
    if (desc.length < 70) warn(path, `description is only ${desc.length} chars`);
    if (descriptions.has(desc)) err(path, `duplicate description, same as ${descriptions.get(desc)}`);
    else descriptions.set(desc, path);
  }

  /* --- canonical --- */
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/i);
  if (!canonical) err(path, "no canonical");

  /* --- hreflang --- */
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/gi)].map((m) => m[1].toLowerCase());
  for (const need of ["nl", "en", "x-default"]) {
    if (!hreflangs.includes(need)) err(path, `missing hreflang="${need}"`);
  }

  /* --- headings --- */
  const h1s = [...html.matchAll(/<h1[^>]*>/g)].length;
  if (h1s === 0) err(path, "no <h1>");
  if (h1s > 1) warn(path, `${h1s} <h1> elements`);

  /* --- structured data --- */
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) err(path, "no JSON-LD");
  const types = [];
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b.replace(/\\u003c/g, "<"));
      for (const node of parsed["@graph"] ?? [parsed]) types.push(node["@type"]);
    } catch (e) {
      err(path, `invalid JSON-LD: ${String(e).slice(0, 80)}`);
    }
  }
  if (blocks.length && !types.includes("ProfessionalService") && !types.includes("Organization")) {
    warn(path, "JSON-LD has no organisation node");
  }

  /* --- FAQ markup must match visible text --- */
  if (types.includes("FAQPage")) {
    const faq = blocks
      .flatMap((b) => {
        try {
          const p = JSON.parse(b.replace(/\\u003c/g, "<"));
          return (p["@graph"] ?? [p]).filter((n) => n["@type"] === "FAQPage");
        } catch {
          return [];
        }
      })
      .flatMap((n) => n.mainEntity ?? []);
    for (const q of faq) {
      // A question marked up but not rendered is what earns a manual action.
      const needle = q.name.slice(0, 30).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(needle).test(decode(html) ?? html)) {
        err(path, `FAQ question is in JSON-LD but not visible on the page: "${q.name.slice(0, 50)}…"`);
      }
    }
  }

  /* --- indexability --- */
  const robots = pick(html, /<meta name="robots" content="([^"]*)"/i);
  if (robots && /noindex/.test(robots)) warn(path, `noindex (${robots})`);

  /* --- Open Graph --- */
  if (!/<meta property="og:title"/i.test(html)) warn(path, "no og:title");
}

console.log(`Titles: ${titles.size} unique across ${urls.length} URLs`);
console.log(`Descriptions: ${descriptions.size} unique\n`);

if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}):`);
  for (const w of warnings) console.log("  ! " + w);
  console.log();
}
if (errors.length) {
  console.log(`ERRORS (${errors.length}):`);
  for (const e of errors) console.log("  x " + e);
  process.exit(1);
}
console.log("No SEO errors.");
