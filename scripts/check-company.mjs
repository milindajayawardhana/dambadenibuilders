import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = process.env.TEST_SITE_URL || 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 900, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/about', '/services', '/portfolio', '/downloads', '/contact']) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route} overflows at ${width}`);
      assert.equal(await page.locator('.header nav a[href="/downloads"]').count(), 0);
      assert.equal(await page.locator('.header-actions .downloads-button').count(), 1);
      assert.equal(await page.locator('footer a[href="/downloads"]').count(), 1);
      assert.equal(await page.locator('a[href="tel:+94771234567"]').count(), 0);
      if (width <= 900) {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        assert.ok(await page.locator('.mobile-menu a[href="/downloads"]').isVisible());
        await page.getByRole('button', { name: 'Close navigation' }).click();
      } else {
        assert.ok(await page.evaluate(() => {
          const brand = document.querySelector('.header .brand').getBoundingClientRect();
          const nav = document.querySelector('.header nav').getBoundingClientRect();
          return brand.right < nav.left && nav.right <= innerWidth;
        }), `Header overlap at ${width}`);
      }
    }
  }
  await page.goto(base + '/downloads');
  const link = page.getByRole('link', { name: 'Download profile' });
  const response = await page.request.get(new URL(await link.getAttribute('href'), base).href);
  assert.equal(response.status(), 200);
  const hash = value => createHash('sha256').update(value).digest('hex');
  assert.equal(hash(await response.body()), hash(await readFile('Dambadeni_Builders_Company_Profile.pdf')));
  const downloadEvent = page.waitForEvent('download');
  await link.click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'Dambadeni_Builders_Company_Profile.pdf');
  assert.equal(await download.failure(), null);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'downloads-check.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log('42 responsive route checks passed; desktop/mobile/footer navigation and original PDF download verified.');
} finally { await browser.close(); }
