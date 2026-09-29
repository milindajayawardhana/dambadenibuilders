// Optional local asset-generation tool, not part of the production build.
import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
const mark = await readFile('logo-white.svg', 'utf8');
await mkdir('public', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<html><head><style>
    *{box-sizing:border-box}body{margin:0;background:#102823;color:#f5f2eb;font-family:Arial,sans-serif}
    main{width:1200px;height:630px;padding:64px 72px;border-top:12px solid #e5a12d;position:relative}
    header{display:flex;align-items:center;gap:22px;font-size:30px;font-weight:600}
    svg{width:48px;height:72px}h1{font-size:76px;font-weight:500;letter-spacing:-2px;line-height:1.1;margin:48px 0 20px}
    h1 span{color:#e5a12d}p{font-size:25px;color:#c4d3ca;line-height:1.5;margin:0}
    footer{position:absolute;bottom:46px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:18px;color:#c4d3ca;border-top:1px solid #ffffff33;padding-top:22px}
  </style></head><body><main><header>${mark.replace(/<\?xml[^>]*>/, '')} Dambadeni Builders</header><h1>Built right.<br/><span>Built for life.</span></h1><p>Civil &amp; electrical construction across Sri Lanka.</p><footer><span>Alawwa, Sri Lanka · Established 2018</span><span>dambadenibuilders.lk</span></footer></main></body></html>`);
  await page.screenshot({ path: 'public/og-image.png' });
} finally { await browser.close(); }
