#!/usr/bin/env node
/** Crawl the production build: pnpm seo:audit --base http://localhost:3000.
 * Checks the actual server HTML, including alternate reciprocity and reachability.
 * Use --output .context/seo-audit.json for a machine-readable report.
 */
import { writeFile } from "node:fs/promises";
const args = process.argv.slice(2);
const flag = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const base = flag("--base", "http://localhost:3000").replace(/\/$/, "");
const limit = Number(flag("--limit", "0")) || Infinity;
const errors = [];
const warnings = [];
const fail = (url, message) => errors.push({ url, message });
const warn = (url, message) => warnings.push({ url, message });
const decode = (s = "") => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, num) => String.fromCodePoint(parseInt(hex || num, hex ? 16 : 10))).replace(/&apos;/g, "'");
const plain = (s) => decode(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), decode(m[2])]));
const localUrl = (url) => base + new URL(url).pathname + new URL(url).search;
const sitemapRes = await fetch(`${base}/sitemap.xml`, { redirect: "manual" });
if (sitemapRes.status !== 200) throw new Error(`Sitemap HTTP ${sitemapRes.status}`);
const xml = await sitemapRes.text();
const sitemapEntries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
  url: decode(body.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? ""),
  alternates: Object.fromEntries([...body.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => { const a = attrs(tag); return [a.hreflang?.toLowerCase(), a.href]; })),
}));
if (!sitemapEntries.length) throw new Error("No URLs in sitemap");
const allUrls = new Set(sitemapEntries.map((entry) => entry.url));
if (allUrls.size !== sitemapEntries.length) fail("/sitemap.xml", "Duplicate URL entries");
for (const entry of sitemapEntries) {
  for (const [lang, url] of Object.entries(entry.alternates)) {
    if (!allUrls.has(url)) fail(entry.url, `${lang} sitemap alternate has no own <loc>: ${url}`);
  }
}
const entries = sitemapEntries.slice(0, limit);
const records = new Map();
const titles = new Map();
const descriptions = new Map();
let next = 0;
async function audit(entry) {
  const { url } = entry;
  const res = await fetch(localUrl(url), { redirect: "manual" });
  if (res.status !== 200) { fail(url, `HTTP ${res.status}; sitemap URLs must return 200 directly`); return; }
  if (/noindex/i.test(res.headers.get("x-robots-tag") ?? "")) fail(url, "X-Robots-Tag noindex");
  const html = await res.text();
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attrs(tag));
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attrs(tag));
  const metaValue = (name) => meta.find((item) => item.name === name || item.property === name)?.content;
  const canonical = links.filter((item) => item.rel === "canonical");
  if (canonical.length !== 1 || canonical[0].href !== url) fail(url, `Expected one self-canonical; got ${canonical.map((item) => item.href).join(", ")}`);
  const alternates = Object.fromEntries(links.filter((item) => item.rel === "alternate" && item.hreflang).map((item) => [item.hreflang.toLowerCase(), item.href]));
  if (!alternates["x-default"]) fail(url, "Missing x-default alternate");
  if (!Object.values(alternates).includes(url)) fail(url, "No self-referencing hreflang");
  for (const [lang, target] of Object.entries(entry.alternates)) {
    if (alternates[lang] !== target) fail(url, `HTML/sitemap disagree for ${lang}`);
  }
  if (Object.keys(alternates).length !== Object.keys(entry.alternates).length) fail(url, "HTML/sitemap alternate sets differ");
  for (const [lang, target] of Object.entries(alternates)) {
    if (!/^(?:[a-z]{2,3}(?:-[a-z]{2})?|x-default)$/.test(lang)) fail(url, `Invalid language ${lang}`);
    if (!allUrls.has(target)) fail(url, `Alternate is not an indexable sitemap URL: ${target}`);
  }
  const title = plain(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = metaValue("description");
  for (const [label, value, seen] of [["title", title, titles], ["description", description, descriptions]]) {
    if (!value) fail(url, `Missing ${label}`);
    else if (seen.has(value)) fail(url, `Duplicate ${label}: ${seen.get(value)}`);
    else seen.set(value, url);
  }
  if (title.length > 70) warn(url, `Long title (${title.length} characters)`);
  if (description?.length > 180) warn(url, `Long description (${description.length} characters)`);
  if (!/<html\b[^>]*\blang="[^"]+"/i.test(html)) fail(url, "Missing HTML language");
  const lang = html.match(/<html\b[^>]*\blang="([^"]+)"/i)?.[1]?.toLowerCase();
  if (lang && alternates[lang] !== url) fail(url, `HTML language ${lang} does not point to this page in hreflang`);
  const h1s = [...html.matchAll(/<h1\b/gi)].length;
  if (h1s !== 1) fail(url, `Expected one H1, found ${h1s}`);
  if (/noindex/i.test(metaValue("robots") ?? "")) fail(url, "Sitemap page is noindex");
  if (metaValue("og:url") !== url) fail(url, "og:url must match canonical");
  if (!metaValue("og:image")) fail(url, "Missing Open Graph image");
  const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) fail(url, "Missing structured data");
  const nodes = [];
  for (const [, json] of blocks) {
    try { const value = JSON.parse(json); nodes.push(...(value["@graph"] ?? [value])); }
    catch { fail(url, "Invalid JSON-LD"); }
  }
  if (!nodes.some((node) => ["Organization", "ProfessionalService"].includes(node["@type"]))) fail(url, "Missing business entity");
  // Exclude scripts, styles and head: checking raw HTML would let JSON-LD verify itself.
  const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "");
  const bodyText = plain(body);
  for (const faq of nodes.filter((node) => node["@type"] === "FAQPage")) {
    for (const q of faq.mainEntity ?? []) {
      for (const text of [q.name, q.acceptedAnswer?.text]) {
        if (!text || !bodyText.includes(plain(text))) fail(url, `FAQ not present in server-rendered page: ${text?.slice(0, 70)}`);
      }
    }
  }
  const internal = new Set();
  for (const [tag] of body.matchAll(/<a\b[^>]*>/gi)) {
    const href = attrs(tag).href;
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
    const target = new URL(href, url);
    if (target.origin !== new URL(url).origin) continue;
    internal.add(target.origin + (target.pathname === "/" ? "" : target.pathname));
  }
  records.set(url, { alternates, internal, title, description, lang });
}
console.log(`Auditing ${entries.length} canonical URLs in the production sitemap…`);
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < entries.length) {
    const entry = entries[next++];
    try { await audit(entry); } catch (error) { fail(entry.url, String(error)); }
  }
}));
for (const [url, record] of records) {
  for (const [lang, target] of Object.entries(record.alternates)) {
    const other = records.get(target);
    if (!other && entries.length === sitemapEntries.length) fail(url, `${lang} alternate failed to load: ${target}`);
    if (other && JSON.stringify(Object.entries(other.alternates).sort()) !== JSON.stringify(Object.entries(record.alternates).sort())) fail(url, `Non-reciprocal alternate set with ${target}`);
  }
}
// Every indexed page must be reachable by ordinary links from the primary homepage.
if (entries.length === sitemapEntries.length) {
  const root = sitemapEntries.find((entry) => new URL(entry.url).pathname === "/")?.url;
  const reachable = new Set();
  const queue = root ? [root] : [];
  while (queue.length) {
    const url = queue.shift();
    if (reachable.has(url)) continue;
    reachable.add(url);
    for (const target of records.get(url)?.internal ?? []) if (allUrls.has(target)) queue.push(target);
  }
  for (const url of allUrls) if (!reachable.has(url)) fail(url, "Orphan: no crawlable link path from homepage");
  const unknown = new Set([...records.values()].flatMap((record) => [...record.internal]).filter((url) => !allUrls.has(url)));
  for (const url of unknown) {
    const response = await fetch(localUrl(url), { redirect: "manual" });
    if (response.status >= 400) fail(url, `Internal link returns HTTP ${response.status}`);
  }
}
const report = { checked: records.size, sitemapUrls: sitemapEntries.length, uniqueTitles: titles.size, uniqueDescriptions: descriptions.size, errors, warnings };
if (flag("--output")) await writeFile(flag("--output"), JSON.stringify(report, null, 2) + "\n");
for (const item of errors) console.error(`ERROR ${item.url}: ${item.message}`);
for (const item of warnings) console.warn(`WARN ${item.url}: ${item.message}`);
console.log(`${records.size} pages checked; ${errors.length} errors; ${warnings.length} warnings.`);
process.exitCode = errors.length ? 1 : 0;
