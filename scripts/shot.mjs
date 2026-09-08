#!/usr/bin/env node
/**
 * Visual QA helper. Captures full-page screenshots of a route in both locales
 * at desktop and mobile widths, after scrolling through the page so in-view
 * animations have fired. Prints console errors and failed requests.
 *
 *   node scripts/shot.mjs <internal-path> <outDir> [--base http://localhost:3000] [--only desktop|mobile] [--locale nl|en] [--no-frames]
 *
 * Besides the hero and full-page captures it writes <locale>-<viewport>-frames.png:
 * a contact sheet of viewport-sized frames taken while scrolling. Sticky and
 * scroll-driven sections (horizontal scrollers, pinned storytelling) show up
 * as empty space in full-page captures; the frames sheet shows what a visitor
 * actually sees, so judge those sections from the frames.
 *   e.g. node scripts/shot.mjs /website-op-maat ./qa/websites
 *
 * Internal paths are the Dutch keys from src/i18n/routing.ts; the EN URL is
 * resolved from that table automatically.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

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
const withFrames = !args.includes("--no-frames");
mkdirSync(outDir, { recursive: true });

async function contactSheet(frames, cols, scale, out) {
  if (!frames.length) return;
  const meta = await sharp(frames[0]).metadata();
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const gap = 12;
  const rows = Math.ceil(frames.length / cols);
  const composites = [];
  for (let i = 0; i < frames.length; i++) {
    const buf = await sharp(frames[i]).resize(w, h).toBuffer();
    composites.push({ input: buf, left: (i % cols) * (w + gap), top: Math.floor(i / cols) * (h + gap) });
  }
  await sharp({
    create: { width: cols * (w + gap) - gap, height: rows * (h + gap) - gap, channels: 3, background: "#3a3a3a" },
  })
    .composite(composites)
    .png()
    .toFile(out);
}

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
const externalFailures = [];
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
      const err = r.failure()?.errorText ?? "";
      if (u.startsWith(base)) {
        if (err !== "net::ERR_ABORTED") problems.push(`[${locale}/${vp.name}] requestfailed: ${u} ${err}`);
      } else {
        externalFailures.push(`[${locale}/${vp.name}] external request failed (${err}): ${u.slice(0, 120)}`);
      }
    });
    const res = await page.goto(base + url, { waitUntil: "networkidle", timeout: 90_000 });
    if (!res || res.status() >= 400) problems.push(`[${locale}/${vp.name}] HTTP ${res?.status()} for ${url}`);
    // first viewport (hero) before scrolling
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-hero.png` });
    // scroll through the page to trigger in-view reveals; optionally keep viewport frames
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const frames = [];
    const step = withFrames ? vp.height * 0.85 : vp.height * 0.7;
    for (let y = 0; y < total; y += step) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(withFrames ? 420 : 160);
      if (withFrames && frames.length < 40) {
        frames.push(await page.screenshot());
      }
    }
    if (withFrames) {
      await contactSheet(frames, vp.mobile ? 4 : 2, vp.mobile ? 0.5 : 0.45, `${outDir}/${locale}-${vp.name}-frames.png`);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outDir}/${locale}-${vp.name}-full.png`, fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (overflow) problems.push(`[${locale}/${vp.name}] horizontal overflow detected (scrollWidth > clientWidth)`);
    console.log(`${locale}/${vp.name}: ${url} height=${h}px -> ${outDir}/${locale}-${vp.name}-{hero,full${withFrames ? ",frames" : ""}}.png`);
    await ctx.close();
  }
}
await browser.close();
if (externalFailures.length) {
  console.log("\nEXTERNAL (informational — the sandbox proxy resets large third-party media; not a page bug):");
  for (const p of [...new Set(externalFailures)]) console.log(" - " + p);
}
if (problems.length) {
  console.log("\nPROBLEMS:");
  for (const p of problems) console.log(" - " + p);
} else {
  console.log("\nNo console errors, page errors, failed requests or horizontal overflow.");
}
