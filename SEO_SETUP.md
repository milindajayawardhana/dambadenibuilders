# Search launch checklist

## What is implemented

The production build emits full HTML for 13 public pages and a 404 page. Each public page has its own title, description, canonical URL, social sharing metadata and factual structured data. Service pages explain the actual scope and reference the company profile. The service-area page covers all 25 districts, highlights six priority towns/areas, and makes clear that these are not branch offices.

SEO titles, descriptions and the canonical domain are in src/seo.js. Service copy is in src/seo-content.js. Update those alongside the company profile as services or projects change.

## Before allowing indexing

1. Purchase and connect **dambadenibuilders.lk** and **www.dambadenibuilders.lk** to this Vercel project; wait for HTTPS to work.
2. Set **SEO_INDEXABLE=true** in Vercel's **Production** environment and redeploy. Until then, all generated pages use noindex, follow. Preview builds remain noindex even when the setting is true.
3. Confirm the apex domain serves the site, www redirects to the apex, /projects redirects to /portfolio, unknown URLs return HTTP 404, and the profile PDF downloads correctly.
4. Check the HTML source on the final domain: title, canonical, complete content and indexable robots directive must be present without running JavaScript.
5. Verify a Domain property in Google Search Console via DNS. Submit https://dambadenibuilders.lk/sitemap.xml and inspect the homepage, services and service-area URLs. This needs access to your own Google account and DNS; it has not been done automatically.
6. Test business and breadcrumb markup using Google's Rich Results Test. Eligibility does not guarantee display or ranking.
7. Complete or claim your Google Business Profile with the real Alawwa location/contact details, eligible service areas, actual operating hours and authentic project photographs. Do not list invented district offices.
8. Set the email/Turnstile production keys described in EMAIL_SETUP.md. SEO does not enable the form. Update CONTACT_SITE_URL and the allowed Turnstile hostname for the final domain.

Canonical URLs intentionally use the future custom domain, not the temporary Vercel hostname. No DNS, Vercel-domain or Google-account changes were performed here. Keep previews protected/noindex; decide on redirects for any old public deployment URLs after the custom domain is live.

## Content and measurement

- Priorities: Alawwa and Kurunegala, followed by Ampara, Nuwara Eliya, Kandy and Gampola; islandwide enquiries are welcomed.
- Keyword targets are based on service relevance, not measured search volumes. Use Search Console query and conversion data after launch to refine them.
- Publish deeper case studies once genuine project photos, dates, roles and permissions are available. The site does not invent project values, testimonials, CIDA grades or Ampara project history.
- Use genuine reviews and consistent business contact information. Do not create near-identical pages for all districts.
- Use Search Console and field Core Web Vitals data to track indexing and performance. Analytics/conversion tracking is not installed by this work; select the provider and privacy requirements before adding it.
- Existing stock photographs remain illustrative. Supply original project images for future image optimization and case studies.

## Build and verify

Run npm run build, then npm run test:seo. The production build does not require a browser or a running server. No new production dependencies are required.

For local browser regression checks, run npm run test:seo:browser with Chrome installed. This checks built pages with and without JavaScript and emulates clean-URL static serving; final Vercel HTTP status codes and domain redirects should still be checked after deployment.

Implementation references: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google Local Business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Vite server rendering](https://vite.dev/guide/ssr), [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json).

Vercel now serves static page files with clean URLs. The old catch-all SPA rewrite was removed so unknown URLs can return real 404s. The /api/contact server function is unchanged. Configure Vercel to use **npm run build**, not a custom vite build override: skipping the second step skips prerendering and metadata.

The built-in Vite dev server still renders in the browser for development. Validate SEO against the generated dist HTML or a production deployment, not the development HTML source.
