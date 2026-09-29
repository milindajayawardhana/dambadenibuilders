# Enquiry email setup

The contact form sends an email only when a visitor submits their enquiry, not when they simply visit the website. Delivery uses Resend; bot verification uses Cloudflare Turnstile. No account passwords belong in the browser.

## Configure

1. Copy `.env.example` to `.env.local` in the project root.
2. Create a Resend account, verify a domain you control, and create a sending API key. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (e.g. `Dambadeni Builders <enquiries@your-domain.lk>`) and `CONTACT_TO_EMAIL` (your receiving inbox).
3. Create a Cloudflare Turnstile Managed widget. Allow your website hostname (and localhost for local testing). Set its public key as `VITE_TURNSTILE_SITE_KEY` and its private key as `TURNSTILE_SECRET_KEY`.
4. Set `CONTACT_SITE_URL` to the exact website origin, e.g. `https://your-domain.lk`. Local development defaults to `http://localhost:5173`; update if Vite uses a different port. Redirect alternate domains to this canonical origin.
5. Optionally set `VITE_CONTACT_EMAIL` to override the public email from the company profile (`info@dambadenibuilders.lk`). This is separate from the private recipient inbox. Blank keeps the profile address; it does not configure email delivery.
6. Restart `npm run dev`. Submit a real enquiry and check your receiving inbox and Resend delivery logs.

Change `CONTACT_TO_EMAIL` whenever you want enquiries delivered elsewhere. On hosted deployments, change environment settings and redeploy. Values starting with `VITE_` are public and require a rebuild. Never give secret values a `VITE_` prefix or commit `.env.local`.

## Deployment

Vercel: import this Vite project, set all the above environment variables in project settings and deploy. `api/contact.mjs` supplies the server function; `vercel.json` preserves page routing. No deployment has been performed by this change.

For local built-site testing use `npm run build` then `npm run preview -- --port 5173` (stop the dev server first). Both Vite dev and preview include the API middleware. Vite preview is not a production hosting server. Uploading only `dist/` to static hosting will NOT send email; other hosts need a Node/serverless adapter for the API.

## Protection and limitations

- Server-verified Turnstile tokens with expected hostname and action; missing/invalid verification never sends email.
- Hidden honeypot, server-side field validation, 16 KB body limit, same-origin checks, and five attempts per IP per 15 minutes per running server instance.
- Sender and recipient come only from server configuration. Visitor email is Reply-To, so you can reply directly. No automatic replies to arbitrary visitor addresses. Messages are plain text, not executable HTML.
- Rate counters are in memory: they reset on restart and are NOT shared between serverless instances. Configure a hosting firewall rate-limit rule for POST `/api/contact` before a public launch; use a shared limiter if you need an exact global quota.
- No spam protection guarantees zero spam. Monitor provider usage/delivery logs, configure provider limits and keep domain DNS authentication correct. Provider acceptance is not a guarantee of inbox delivery.
- No submissions or credentials are logged by this app. Resend/Cloudflare process submitted data; review your privacy notice and their retention settings.

Tests use mocked provider responses and do not send real emails. After entering your keys, test one real submission on your deployed domain (including Reply-To), an expired challenge, and mobile submission. Live delivery cannot be verified without your configuration.

Provider references: [Resend sending API](https://resend.com/docs/api-reference/emails/send-email), [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
