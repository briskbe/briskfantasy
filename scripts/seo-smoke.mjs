#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:3000";
const output = ".context";
await mkdir(output, { recursive: true });
const checks = [];
for (const path of ["/fr/not-a-page", "/de/website-erstellen-lassen/extra", "/en-us/missing", "/en/guides/website-seo-checklist", "/diensten/website-development-cost", "/referenties/not-a-case"]) {
  const res = await fetch(base + path, { redirect: "manual" });
  assert.equal(res.status, 404, `Invalid URL must 404: ${path}`);
  checks.push({ path, status: res.status });
}
for (const [path, destination] of [["/website-laten-maken", "/website-op-maat"], ["/webshop-laten-maken", "/webshop-op-maat"], ["/website-redesign", "/diensten/website-laten-vernieuwen"]]) {
  const res = await fetch(base + path, { redirect: "manual" });
  assert.equal(res.status, 308, `Alias must be permanent: ${path}`);
  assert.equal(new URL(res.headers.get("location"), base).pathname, destination);
  checks.push({ path, status: res.status, destination });
}
const defaultResponse = await fetch(base + "/", { redirect: "manual", headers: { "Accept-Language": "en-US,en;q=0.9" } });
assert.equal(defaultResponse.status, 200, "Belgian homepage must not auto-redirect by browser language");
assert.match(await defaultResponse.text(), /<html[^>]+lang="nl-BE"/);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [path, name, language] of [["/fr/creation-site-internet", "fr", "fr-FR"], ["/de/website-erstellen-lassen", "de", "de-DE"], ["/nl-nl", "nl", "nl-NL"], ["/en-gb/website-design", "uk", "en-GB"], ["/en-us/custom-website-design", "us", "en-US"], ["/kennisbank/website-seo-checklist", "guide", "nl-BE"], ["/referenties/city-housing-genk", "case", "nl-BE"], ["/website-op-maat", "belgium", "nl-BE"]]) {
    const response = await page.goto(base + path, { waitUntil: "load" });
    assert.equal(response.status(), 200, path);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("html").getAttribute("lang"), language);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Desktop overflow: ${path}`);
    if (["fr", "guide", "belgium"].includes(name)) await page.screenshot({ path: `${output}/seo-${name}-desktop.png` });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Mobile overflow: ${path}`);
    if (["fr", "guide"].includes(name)) await page.screenshot({ path: `${output}/seo-${name}-mobile.png` });
    checks.push({ path, language, desktop: true, mobile: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  for (const [path, target] of [["/kennisbank/website-seo-checklist", "/en/guides/website-seo-launch-checklist"], ["/diensten/website-laten-maken-kosten", "/en/services/website-development-cost"], ["/en/guides/website-seo-launch-checklist", "/kennisbank/website-seo-checklist"], ["/en/services/website-development-cost", "/diensten/website-laten-maken-kosten"]]) {
    await page.goto(base + path);
    const targetLanguage = target.startsWith("/en/") ? "en" : "nl";
    const link = page.locator(`a[hreflang="${targetLanguage}"][href="${target}"]`).first();
    assert.equal(await link.count(), 1, `Missing translated language link: ${path}`);
    await link.click();
    await page.waitForURL(base + target);
    assert.equal(await page.locator("h1").count(), 1);
    checks.push({ languageSwitch: path, target });
  }
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJs = await noJsContext.newPage();
  await noJs.goto(base + "/fr/creation-site-internet");
  assert.equal(await noJs.locator("h1").isVisible(), true);
  const question = noJs.locator("details").first();
  await question.locator("summary").click();
  assert.equal(await question.locator("p").isVisible(), true, "FAQ must work without JavaScript");
  assert.ok(await noJs.locator('a[href="/en/book-a-call"]').count(), "Contact must have a browser form route");
  await noJsContext.close();
  assert.deepEqual(errors, [], "Browser runtime errors");
  await writeFile(`${output}/seo-smoke.json`, JSON.stringify({ checks, javascriptDisabledFaq: true, runtimeErrors: errors }, null, 2) + "\n");
  console.log(`Passed ${checks.length} route, rendering and navigation checks; FAQ works without JS. Screenshots saved in .context/.`);
} finally {
  await browser.close();
}
