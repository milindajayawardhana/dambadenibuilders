import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
const results = [];
try {
  const page = await browser.newPage({ isMobile: true, hasTouch: true });
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 900]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ['/', '/about', '/services', '/portfolio', '/downloads', '/contact']) {
      await page.goto(`http://localhost:5173${route}`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        overflowing: [...document.querySelectorAll('main *')].filter(el => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
        }).map(el => el.className).slice(0, 8),
      }));
      assert.ok(layout.scroll <= width + 1, `${route} at ${width}: ${JSON.stringify(layout)}`);
      await page.getByRole('button', { name: 'Open navigation' }).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
      assert.ok(await page.locator('body').evaluate(el => el.classList.contains('menu-open')));
      await page.getByRole('button', { name: 'Close navigation' }).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      assert.ok(await page.locator('body').evaluate(el => !el.classList.contains('menu-open')));
      results.push(`${width}px ${route}`);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('.mobile-menu').getByRole('link', { name: 'Services', exact: true }).click();
  await page.waitForURL('**/services');
  assert.ok(!await page.locator('body').evaluate(el => el.classList.contains('menu-open')));
  await page.goto('http://localhost:5173/contact');
  assert.equal(await page.locator('input[type=email]').evaluate(el => getComputedStyle(el).fontSize), '16px');
  await page.screenshot({ path: 'mobile-contact.png', fullPage: true });
  await page.goto('http://localhost:5173/');
  await page.screenshot({ path: 'mobile-home.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`Passed ${results.length} route/viewport checks; menu navigation, input sizing, and runtime errors checked.`);
} finally {
  await browser.close();
}
