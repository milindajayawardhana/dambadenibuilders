import { company } from './company.js';
import { servicePages } from './seo-content.js';

export const siteUrl = 'https://dambadenibuilders.lk';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const pages = {
  '/': { name: 'Home', title: 'Construction Company in Alawwa, Kurunegala | Dambadeni Builders', description: 'Alawwa-based civil and electrical contractors, established in 2018. Building, wiring and water infrastructure enquiries welcomed across Sri Lanka.' },
  '/about': { name: 'About Us', title: 'About Our Civil & Electrical Team | Dambadeni Builders', description: 'Meet Dambadeni Builders (Pvt) Ltd: established in 2018 in Alawwa, with civil and electrical engineering personnel and a site workforce of more than 50.' },
  '/services': { name: 'Services', title: 'Civil & Electrical Construction Services | Dambadeni Builders', description: 'Explore building construction, land development, water supply, electrical works, panel board wiring and design-and-build services across Sri Lanka.' },
  '/portfolio': { name: 'Projects', title: 'Construction & Water Infrastructure Projects | Dambadeni Builders', description: 'Explore recorded project experience in Kurunegala, Kandy, Nuwara Eliya, Gampola and beyond, including buildings, staff quarters and water infrastructure.' },
  '/downloads': { name: 'Downloads', title: 'Download Our Company Profile | Dambadeni Builders', description: 'Download the Dambadeni Builders company profile: civil and electrical services, people, equipment, selected projects and contact information.' },
  '/contact': { name: 'Contact', title: 'Contact Dambadeni Builders | Alawwa, Sri Lanka', description: 'Contact Dambadeni Builders in Wennoruwa, Alawwa for civil and electrical project enquiries. Call +94 70 408 8777 or discuss your requirements with our team.' },
  '/service-areas': { name: 'Service Areas', title: 'Construction Services Across Sri Lanka | Dambadeni Builders', description: 'Based in Alawwa, welcoming projects in all 25 districts. Explore coverage in Kurunegala, Ampara, Nuwara Eliya, Kandy, Gampola and across Sri Lanka.' },
};
for (const service of servicePages) pages['/services/' + service.slug] = { name: service.name, title: service.title, description: service.description };
export const routes = Object.keys(pages);
export const normalizePath = path => path.replace(/\/+$/, '') || '/';

export function seoHead(path, { indexable = false, email = company.email } = {}) {
  const page = pages[path];
  const meta = page || { name: 'Page not found', title: 'Page Not Found | Dambadeni Builders', description: 'This page could not be found. Explore our services or contact the Dambadeni Builders team.' };
  const canonical = siteUrl + (path === '/' ? '/' : path);
  const graph = [
    { '@type': 'GeneralContractor', '@id': siteUrl + '/#company', name: company.name, url: siteUrl + '/', logo: siteUrl + '/brand-logo.svg', image: siteUrl + '/og-image.png', telephone: company.phoneHref, email, foundingDate: '2018-07-07', address: { '@type': 'PostalAddress', streetAddress: 'Jambugahamulawatta, Wennoruwa', addressLocality: 'Alawwa', addressRegion: 'North Western Province', addressCountry: 'LK' }, areaServed: { '@type': 'Country', name: 'Sri Lanka' } },
    { '@type': 'WebSite', '@id': siteUrl + '/#website', name: 'Dambadeni Builders', url: siteUrl + '/', publisher: { '@id': siteUrl + '/#company' }, inLanguage: 'en-LK' },
  ];
  if (page) {
    const crumbs = [{ name: 'Home', url: siteUrl + '/' }];
    if (path.startsWith('/services/')) crumbs.push({ name: 'Services', url: siteUrl + '/services' });
    if (path !== '/') crumbs.push({ name: page.name, url: canonical });
    graph.push({ '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: page.title, description: page.description, isPartOf: { '@id': siteUrl + '/#website' }, about: { '@id': siteUrl + '/#company' }, inLanguage: 'en-LK' });
    if (crumbs.length > 1) graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })) });
    if (path.startsWith('/services/')) graph.push({ '@type': 'Service', name: page.name, description: page.description, url: canonical, provider: { '@id': siteUrl + '/#company' }, areaServed: { '@type': 'Country', name: 'Sri Lanka' } });
  }
  return `<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta name="robots" content="${page && indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">
${page ? `<link rel="canonical" href="${canonical}">` : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dambadeni Builders">
<meta property="og:locale" content="en_LK">
<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
${page ? `<meta property="og:url" content="${canonical}">` : ''}
<meta property="og:image" content="${siteUrl}/og-image.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Dambadeni Builders — civil and electrical construction, Alawwa, Sri Lanka">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(meta.title)}">
<meta name="twitter:description" content="${escapeHtml(meta.description)}">
<meta name="twitter:image" content="${siteUrl}/og-image.png">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
}
