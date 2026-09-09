import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on('console', m => m.type() === 'error' && errs.push(m.text()));
p.on('pageerror', e => errs.push('pageerror ' + e.message));
await p.goto('http://localhost:3000/website-op-maat', { waitUntil: 'networkidle' });

// secondary CTA -> smooth scroll to #referenties
await p.getByRole('link', { name: /Bekijk het werk/i }).click();
await p.waitForTimeout(2500);
const y1 = await p.evaluate(() => window.scrollY);
const refTop = await p.evaluate(() => document.getElementById('referenties').getBoundingClientRect().top + window.scrollY);
console.log('scrollY after jump', y1, 'refs top', Math.round(refTop), 'delta', Math.round(y1 - refTop));

// FAQ accordion
await p.evaluate(() => document.getElementById('websites-faq-title').scrollIntoView());
await p.waitForTimeout(1200);
const btns = p.locator('section[aria-labelledby="websites-faq-title"] button[aria-expanded]');
console.log('faq buttons', await btns.count());
console.log('expanded before', await btns.nth(0).getAttribute('aria-expanded'), await btns.nth(2).getAttribute('aria-expanded'));
await btns.nth(2).click();
await p.waitForTimeout(900);
console.log('expanded after', await btns.nth(0).getAttribute('aria-expanded'), await btns.nth(2).getAttribute('aria-expanded'));
await btns.nth(2).click();
await p.waitForTimeout(900);
console.log('expanded toggled off', await btns.nth(2).getAttribute('aria-expanded'));

// reference cards
const cards = p.locator('#referenties ul li a');
console.log('cards', await cards.count(), '| first aria-label:', await cards.nth(0).getAttribute('aria-label'), '| target', await cards.nth(0).getAttribute('target'));

// headings order
const hs = await p.evaluate(() => [...document.querySelectorAll('main h1,main h2,main h3')].map(h => h.tagName + ' ' + h.textContent.trim().slice(0, 40)));
console.log(hs.join('\n'));
// microlink requests
console.log('errors', errs);
await b.close();
