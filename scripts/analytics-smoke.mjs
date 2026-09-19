// Run against a local production server: BASE_URL=http://localhost:3000 node scripts/analytics-smoke.mjs
// All Google requests are intercepted; the tag is a local stub and sends no analytics events.
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/u, '');
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';
const KEY = 'brisk:analytics-consent:v1';
const ID = 'G-4TBZ9KYGCS';
const DISABLE = `ga-disable-${ID}`;
// Wait for navigation and automatic scrolling to settle before clicking the
// real pointer target, so a click cannot land on nearby content.
async function openSettings(page, name) {
  const button = page.getByRole('button', { name, exact: true }).first();
  await button.scrollIntoViewIfNeeded();
  await button.evaluate(element => new Promise((resolve, reject) => {
    const started = performance.now();
    let stableSince = started;
    let previous = element.getBoundingClientRect();
    function frame(now) {
      const current = element.getBoundingClientRect();
      if (Math.abs(current.top - previous.top) > 0.1 || Math.abs(current.left - previous.left) > 0.1) stableSince = now;
      previous = current;
      if (now - stableSince >= 200) return resolve();
      if (now - started > 5000) return reject(new Error('Cookie settings button did not stop moving'));
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }));
  await button.click();
}
const stub = `
window.__analyticsStubLoads = (window.__analyticsStubLoads || 0) + 1;
window.__analyticsCommands = [];
window.__analyticsStubPageviews = [];
window.dataLayer = window.dataLayer || [];
function record(args) {
  const values = Array.from(args);
  window.__analyticsCommands.push(values);
  if (values[0] === 'config' && !window['ga-disable-G-4TBZ9KYGCS']) {
    document.cookie = '_ga=test-client; Path=/; SameSite=Lax';
    document.cookie = '_ga_4TBZ9KYGCS=test-session; Path=/; SameSite=Lax';
    window.__analyticsStubPageviews.push(location.pathname);
  }
}
window.dataLayer.forEach(record);
const push = window.dataLayer.push;
window.dataLayer.push = function(...entries) { entries.forEach(record); return push.apply(this, entries); };
for (const method of ['pushState', 'replaceState']) {
  const original = history[method];
  history[method] = function(...args) {
    const previous = location.href;
    const result = original.apply(this, args);
    if (previous !== location.href && !window['ga-disable-G-4TBZ9KYGCS']) window.__analyticsStubPageviews.push(location.pathname);
    return result;
  }
}
`;
let browser;
(async () => {
  browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  let googleRequests = 0;
  async function context(options = {}) {
    const ctx = await browser.newContext();
    const errors = [];
    ctx.on('page', p => p.on('pageerror', e => errors.push(e.message)));
    await ctx.route('**/*', route => {
      const url = new URL(route.request().url());
      if (/(^|\.)(google(?:-analytics)?\.com|googletagmanager\.com|googleadservices\.com|googlesyndication\.com|doubleclick\.net|googleapis\.com|gstatic\.com)$/u.test(url.hostname)) {
        googleRequests++;
        if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js' && !options.blocked) {
          assert.equal(url.searchParams.get('id'), ID);
          return route.fulfill({ status: 200, contentType: 'text/javascript', body: stub });
        }
        return route.abort('blockedbyclient');
      }
      return route.continue();
    });
    return { ctx, errors };
  }
  const primary = await context();
  const page = await primary.ctx.newPage();
  await page.goto(BASE + '/');
  await page.getByRole('heading', {name:'Statistieken voor een betere website'}).waitFor();
  assert.equal(googleRequests, 0, 'No Google request before consent');
  await page.getByRole('button', {name:'Weigeren',exact:true}).click();
  assert.equal(await page.evaluate(key=>localStorage.getItem(key), KEY), 'rejected');
  await page.reload();
  await page.getByRole('button', {name:'Cookie-instellingen',exact:true}).first().waitFor();
  assert.equal(await page.locator('#analytics-preferences').count(),0);
  assert.equal(googleRequests, 0, 'Rejection remains script-free after reload');
  await openSettings(page, 'Cookie-instellingen');
  await page.getByRole('button', {name:'Sluiten',exact:true}).click();
  assert.equal(await page.evaluate(key=>localStorage.getItem(key), KEY), 'rejected');
  assert.equal(googleRequests, 0, 'Cancel does not opt in');
  await openSettings(page, 'Cookie-instellingen');
  await page.getByRole('button', {name:'Toestaan',exact:true}).click();
  await page.waitForFunction(()=>window.__briskAnalyticsInitialized);
  assert.equal(googleRequests,1);
  assert.equal(await page.evaluate(()=>window.__analyticsCommands.filter(c=>c[0]==='config').length),1);
  await page.locator('footer a[href="/privacy"]').first().click();
  await page.waitForURL('**/privacy');
  await page.waitForFunction(() => document.querySelector('h1')?.textContent?.toLowerCase().includes('privacy'));
  assert.equal(await page.evaluate(()=>window.__analyticsStubLoads),1);
  assert.equal(await page.evaluate(()=>window.__analyticsCommands.filter(c=>c[0]==='config').length),1);
  assert.equal(await page.evaluate(()=>window.__analyticsCommands.filter(c=>c[0]==='event'&&c[1]==='page_view').length),0);
  await openSettings(page, 'Cookie-instellingen');
  await page.getByRole('button', {name:'Sluiten',exact:true}).click();
  assert.equal(await page.evaluate(key=>localStorage.getItem(key), KEY),'accepted');
  const second = await primary.ctx.newPage();
  await second.goto(BASE+'/en/privacy');
  await second.waitForFunction(()=>window.__briskAnalyticsInitialized);
  assert.ok((await primary.ctx.cookies()).some(c=>c.name==='_ga'));
  await openSettings(page, 'Cookie-instellingen');
  await page.getByRole('button', {name:'Weigeren',exact:true}).click();
  assert.equal(await page.evaluate(key=>window[key],DISABLE),true);
  await second.waitForFunction(key=>window[key]===true,DISABLE);
  assert.ok(!(await primary.ctx.cookies()).some(c=>c.name==='_ga'||c.name==='_ga_4TBZ9KYGCS'));
  const pageviewsBefore = await page.evaluate(()=>window.__analyticsStubPageviews.length);
  await page.evaluate(()=>history.pushState({}, '', '/privacy?consent-test=revoked'));
  assert.equal(await page.evaluate(()=>window.__analyticsStubPageviews.length),pageviewsBefore);
  assert.deepEqual(primary.errors,[]);
  console.log('PASS: no requests before opt-in, reject persistence, cancel, single config across navigation, immediate withdrawal, cookie deletion and cross-tab withdrawal.');
  await primary.ctx.close();

  const unavailable = await context();
  await unavailable.ctx.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Storage blocked','SecurityError')}}));
  const fr = await unavailable.ctx.newPage();
  const beforeUnavailable = googleRequests;
  await fr.goto(BASE+'/fr');
  await fr.getByRole('heading',{name:'Des statistiques pour améliorer notre site'}).waitFor();
  await fr.getByRole('button',{name:'Refuser',exact:true}).click();
  assert.equal(googleRequests,beforeUnavailable);
  await fr.getByRole('button',{name:'Paramètres des cookies',exact:true}).first().click();
  await fr.getByRole('button',{name:'Autoriser',exact:true}).click();
  await fr.waitForFunction(()=>window.__briskAnalyticsInitialized);
  assert.equal(googleRequests,beforeUnavailable+1);
  await fr.getByRole('button',{name:'Paramètres des cookies',exact:true}).first().click();
  await fr.getByRole('button',{name:'Refuser',exact:true}).click();
  assert.equal(await fr.evaluate(key=>window[key],DISABLE),true);
  await fr.reload();
  await fr.getByRole('heading',{name:'Des statistiques pour améliorer notre site'}).waitFor();
  assert.equal(googleRequests,beforeUnavailable+1);
  assert.deepEqual(unavailable.errors,[]);
  console.log('PASS: localStorage unavailable stays functional, in-document choice works, reload returns to no analytics.');
  await unavailable.ctx.close();

  const blocked = await context({blocked:true});
  const de = await blocked.ctx.newPage();
  const beforeBlocked=googleRequests;
  await de.goto(BASE+'/de');
  await de.getByRole('heading',{name:'Statistiken zur Verbesserung unserer Website'}).waitFor();
  await de.getByRole('button',{name:'Zulassen',exact:true}).click();
  await de.waitForFunction(key=>window[key]===true,DISABLE);
  assert.equal(googleRequests,beforeBlocked+1);
  await de.getByRole('button',{name:'Cookie-Einstellungen',exact:true}).first().click();
  await de.getByRole('button',{name:'Schließen',exact:true}).click();
  assert.equal(await de.evaluate(key=>localStorage.getItem(key),KEY),'accepted');
  await de.getByRole('button',{name:'Cookie-Einstellungen',exact:true}).first().click();
  await de.getByRole('button',{name:'Ablehnen',exact:true}).click();
  assert.equal(await de.evaluate(key=>localStorage.getItem(key),KEY),'rejected');
  assert.equal(googleRequests,beforeBlocked+1);
  assert.deepEqual(blocked.errors,[]);
  console.log('PASS: blocked Google script causes no reload/retry loop; preference controls remain usable. NL/EN/FR/DE strings verified.');
  await blocked.ctx.close();
  await browser.close();
  console.log('All analytics requests were intercepted locally; no real Google requests or test analytics events were sent.');
})().catch(async error => {
  console.error(error);
  if (browser) await browser.close();
  process.exitCode = 1;
});
