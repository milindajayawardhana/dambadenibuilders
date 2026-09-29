import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { routes, pages } from '../src/seo.js';

// Local static-file harness matching the clean-URL layout of the Vercel output.
const root = resolve('dist');
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (path === '/projects') { res.writeHead(308, { Location: '/portfolio' }); return res.end(); }
  const file = resolve(root, path === '/' ? 'index.html' : path.slice(1) + (extname(path) ? '' : '.html'));
  if (!file.startsWith(root + '/') && !file.startsWith(root + '\\')) { res.writeHead(403); return res.end(); }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(await readFile(resolve(root, '404.html')));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJs.newPage();
  for (const route of routes) {
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200, route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toContainText('Dambadeni');
    assert.equal(await page.title(), pages[route].title);
    assert.ok(await page.locator('main').innerText(), route);
  }
  const errors = [];
  const live = await browser.newPage();
  live.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await live.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await live.goto(base + route, { waitUntil: 'domcontentloaded' });
      await live.locator('.menu-toggle[aria-label]').waitFor({ state: 'attached' });
      assert.equal(await live.title(), pages[route].title);
      assert.equal(await live.locator('h1').count(), 1);
      assert.equal(await live.locator('link[rel=canonical]').count(), 1);
      assert.ok(await live.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), route + ' overflow at ' + width);
      if (width === 390) {
        await live.getByRole('button', { name: 'Open navigation' }).click();
        await expect(live.locator('.mobile-menu')).toBeVisible();
        await live.getByRole('button', { name: 'Close navigation' }).click();
      }
    }
  }
  await live.goto(base + '/services/electrical-contracting');
  await live.locator('.service-question summary').click();
  assert.equal(await live.locator('.service-question').getAttribute('open'), '');
  const missing = await live.goto(base + '/does-not-exist');
  assert.equal(missing.status(), 404);
  await expect(live.locator('h1')).toHaveText('Page not found');
  await expect(live.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, follow');
  await live.goto(base + '/projects');
  assert.equal(new URL(live.url()).pathname, '/portfolio');
  await live.goto(base + '/downloads');
  const href = await live.getByRole('link', { name: 'Download profile' }).getAttribute('href');
  const pdf = await live.request.get(base + href);
  assert.equal(pdf.status(), 200);
  const hash = data => createHash('sha256').update(data).digest('hex');
  assert.equal(hash(await pdf.body()), hash(await readFile('Dambadeni_Builders_Company_Profile.pdf')));
  assert.deepEqual(errors, []);
  console.log('13 no-JavaScript pages and 65 responsive page checks passed, plus FAQ, mobile navigation, 404, redirect and original PDF checks.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
