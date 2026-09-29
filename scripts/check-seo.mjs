import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { routes, pages, siteUrl, seoHead } from '../src/seo.js';
import { districts } from '../src/seo-content.js';

const root = resolve('dist');
const titles = new Set(), descriptions = new Set();
for (const route of routes) {
  const html = await readFile(resolve(root, route === '/' ? 'index.html' : route.slice(1) + '.html'), 'utf8');
  assert.equal((html.match(/<title>/g) || []).length, 1, route);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
  assert.ok(html.includes('href="' + siteUrl + (route === '/' ? '/' : route) + '"'), route);
  assert.ok(html.includes('data-prerendered'), route);
  assert.ok(!html.includes('<!--page-html-->') && !html.includes('hello@dambadenibuilders.lk'), route);
  titles.add(pages[route].title); descriptions.add(pages[route].description);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(json, route);
  const graph = JSON.parse(json[1])['@graph'];
  assert.ok(graph.some(item => item['@type'] === 'GeneralContractor'), route);
  if (route !== '/') assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList'), route);
  if (route.startsWith('/services/')) assert.ok(graph.some(item => item['@type'] === 'Service'), route);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const pathname = decodeURIComponent(match[1].split(/[?#]/)[0]);
    if (!pathname || pathname === '/') continue;
    const candidate = resolve(root, pathname.slice(1) + (pathname.includes('.') ? '' : '.html'));
    assert.ok(candidate.startsWith(root), pathname);
    await access(candidate).catch(() => assert.fail(route + ' has broken local asset/link: ' + pathname));
  }
}
assert.equal(titles.size, routes.length);
assert.equal(descriptions.size, routes.length);
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
assert.ok(!sitemap.includes('/news') && !sitemap.includes('/projects') && !sitemap.includes('/404'));
const missing = await readFile(resolve(root, '404.html'), 'utf8');
assert.ok(missing.includes('noindex, follow') && !missing.includes('rel="canonical"'));
assert.ok(seoHead('/', { indexable: true }).includes('index, follow, max-image-preview:large'));
assert.ok(seoHead('/').includes('noindex, follow'));
assert.equal(new Set(districts).size, 25);
const areaHtml = await readFile(resolve(root, 'service-areas.html'), 'utf8');
for (const district of districts) assert.ok(areaHtml.includes(district), district);
const image = await readFile(resolve(root, 'og-image.png'));
assert.equal(image.readUInt32BE(16), 1200); assert.equal(image.readUInt32BE(20), 630);
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.equal(config.cleanUrls, true);
assert.ok(!config.rewrites);
assert.ok(config.redirects.some(item => item.source === '/projects' && item.destination === '/portfolio'));
console.log(`SEO checks passed for ${routes.length} pages: unique metadata, complete HTML, schema, local links/assets, sitemap, 404, indexing switch, 25 districts and social image.`);
