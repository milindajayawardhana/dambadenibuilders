import { createServer, loadEnv } from 'vite';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const env = { ...loadEnv('production', root, ''), ...process.env };
const indexable = env.SEO_INDEXABLE === 'true' && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production');
const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { renderPage } = await server.ssrLoadModule('/src/render.js');
  const { routes, seoHead, siteUrl } = await server.ssrLoadModule('/src/seo.js');
  const { company } = await server.ssrLoadModule('/src/company.js');
  const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  const manifest = JSON.parse(await readFile(resolve(root, 'dist/.vite/manifest.json'), 'utf8'));
  const assets = Object.entries(manifest).filter(([, item]) => item.file).map(([key, item]) => [
    '/' + (item.src || key).replace(/\?.*$/, ''), '/' + item.file,
  ]).sort((a, b) => b[0].length - a[0].length);
  if (!template.includes('<!--seo-head-->') || !template.includes('<!--page-html-->')) throw new Error('Missing prerender markers');
  for (const route of [...routes, '/404']) {
    let body = renderPage(route);
    for (const [source, built] of assets) body = body.split('"'+source+'"').join('"'+built+'"');
    const head = seoHead(route, { indexable, email: env.VITE_CONTACT_EMAIL || company.email });
    const html = template.replace('<html lang="en">', '<html lang="en-LK" data-prerendered>')
      .replace('<!--seo-head-->', head)
      .replace('<div id="app">', `<div id="app" data-route="${route}">`)
      .replace('<!--page-html-->', body);
    const file = resolve(root, 'dist', route === '/' ? 'index.html' : route.slice(1) + '.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  await copyFile(resolve(root, 'logo.svg'), resolve(root, 'dist/brand-logo.svg'));
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes.map(route => `  <url><loc>${siteUrl}${route === '/' ? '/' : route}</loc></url>`).join('\n') + '\n</urlset>\n';
  await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
  // Allow crawlers to fetch staging pages and see their noindex metadata.
  await writeFile(resolve(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Prerendered ${routes.length} public pages + 404. Indexing: ${indexable ? 'enabled' : 'disabled until SEO_INDEXABLE=true'}.`);
} finally {
  await server.close();
}
