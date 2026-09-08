#!/usr/bin/env node
/**
 * Visual QA helper. Captures full-page screenshots of a route in both locales
 * at desktop and mobile widths, after scrolling through the page so in-view
 * animations have fired. Prints console errors and failed requests.
 *
 *   node scripts/shot.mjs <internal-path> <outDir> [--base http://localhost:3000] [--only desktop|mobile] [--locale nl|en]
 *   e.g. node scripts/shot.mjs /website-op-maat ./qa/websites
 *
 * Internal paths are the Dutch keys from src/i18n/routing.ts; the EN URL is
 * resolved from that table automatically.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const PATHNAMES = {
  "/": { nl: "/", en: "/en" },
  "/website-op-maat": { nl: "/website-op-maat", en: "/en/custom-websites" },
  "/webshop-op-maat": { nl: "/webshop-op-maat", en: "/en/custom-webshops" },
  "/software-op-maat": { nl: "/software-op-maat", en: "/en/custom-software" },
  "/mobiele-apps": { nl: "/mobiele-apps", en: "/en/mobile-apps" },
  "/referenties": { nl: "/referenties", en: "/en/work" },
  "/over-ons": { nl: "/over-ons", en: "/en/about" },
  "/gesprek-inplannen": { nl: "/gesprek-inplannen", en: "/en/book-a-call" },
  "/privacy": { nl: "/privacy", en: "/en/privacy" },
};

const args = process.argv.slice(2);
const path = args[0] ?? "/";
const outDir = resolve(args[1] ?? "./qa");
const flag = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const base = flag("--base", "http://localhost:3000");
const only = flag("--only", null);
const localeOnly = flag("--locale", null);
mkdirSync(outDir, { recursive: true });

const targets = PATHNAMES[path];
if (!targets) {
  console.error(`Unknown path ${path}. Known: ${Object.keys(PATHNAMES).join(", ")}`);
  process.exit(1);
}

const viewports = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
].filter((v) => !only || v.name === only);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium" });
const problems = [];
for (const [locale, url] of Object.entries(targets)) {
  if (localeOnly && locale !== localeOnly) continue;
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      reducedMotion: "no-preference",
      locale: locale === "nl" ? "nl-BE" : "en-US",
    });
    await ctx.addInitScript(() => {
      try {
        sessionStorage.setItem("brisk:intro-seen", "1");
      } catch {}
    });
    const page = await ctx.newPage();
    page.on("console", (m) => {
      if (m.type() === "error") problems.push(`[${locale}/${vp.name}] console.error: ${m.text().slice(0, 300)}`);
    });
    page.on("pageerror", (e) => problems.push(`[${locale}/${vp.name}] pageerror: ${String(e).slice(0, 300)}`));
    page.on("requestfailed", (r) => {
      const u = r.url();
      if (u.startsWith(base)) problems.push(`[${locale}/${vp.name}] requestfailed: ${u} ${r.failure()?.errorText ?? ""}`);
    });
    const res = await page.goto(base + url, { waitUntil: "networkidle", timeout: 90_000 });
    if (!res || res.status() >= 400) problems.push(`[${locale}/${vp.name}] HTTP ${res?.status()} for ${url}`);
    // first viewport (hero) before scrolling
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-hero.png` });
    // scroll through the page to trigger in-view reveals
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += vp.height * 0.7) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(160);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-full.png`, fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) problems.push(`[${locale}/${vp.name}] horizontal overflow detected (scrollWidth > clientWidth)`);
    console.log(`${locale}/${vp.name}: ${url} height=${h}px -> ${outDir}/${locale}-${vp.name}-{hero,full}.png`);
    await ctx.close();
  }
}
await browser.close();
if (problems.length) {
  console.log("\nPROBLEMS:");
  for (const p of problems) console.log(" - " + p);
} else {
  console.log("\nNo console errors, page errors, failed requests or horizontal overflow.");
}
