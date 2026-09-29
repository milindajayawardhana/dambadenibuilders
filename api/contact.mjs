const buckets = new Map();
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const result = (status, message) => ({ status, body: { message } });

// Extra per-instance protection. Use a hosting firewall for shared/global limits.
function allow(ip) {
  const now = Date.now();
  for (const [key, entry] of buckets) if (entry.until <= now) buckets.delete(key);
  if (!buckets.has(ip)) {
    if (buckets.size >= 10000) return false;
    buckets.set(ip, { count: 0, until: now + 15 * 60 * 1000 });
  }
  return ++buckets.get(ip).count <= 5;
}

export async function submitContact({ body, origin, ip }, env = process.env, request = fetch, limit = allow) {
  let site;
  try { site = new URL(env.CONTACT_SITE_URL); } catch { return result(503, 'Enquiries are temporarily unavailable. Please contact our team directly.'); }
  if (origin !== site.origin) return result(403, 'Please submit your enquiry from our website.');
  if (!env.RESEND_API_KEY || !emailPattern.test(env.CONTACT_TO_EMAIL || '') || !env.CONTACT_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY || !env.VITE_TURNSTILE_SITE_KEY) {
    return result(503, 'Enquiries are temporarily unavailable. Please contact our team directly.');
  }
  if (!limit(ip)) return result(429, 'Too many attempts. Please wait 15 minutes before trying again.');
  if (!body || typeof body !== 'object' || Array.isArray(body)) return result(400, 'Please check your enquiry.');
  if (body.website) return result(400, 'Your enquiry could not be verified.');
  const { name, email, phone = '', message, token } = body;
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) ||
      typeof email !== 'string' || email.length > 254 || !emailPattern.test(email) ||
      typeof phone !== 'string' || phone.length > 40 || (phone && !/^[+\d\s().-]{6,40}$/.test(phone)) ||
      typeof message !== 'string' || message.trim().length < 10 || message.length > 5000 ||
      typeof token !== 'string' || !token || token.length > 2048) {
    return result(400, 'Check your name, email and message, and complete the security check.');
  }
  try {
    const verification = await request('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(10000),
    });
    const check = await verification.json();
    if (!verification.ok || !check.success || check.hostname !== site.hostname || check.action !== 'contact') {
      return result(400, 'Security check expired or failed. Please try again.');
    }
    const sent = await request('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: email.trim(),
        subject: 'New website enquiry — Dambadeni Builders',
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || 'Not provided'}\n\nProject enquiry:\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!sent.ok || !(await sent.json()).id) throw new Error('Delivery unavailable');
    return result(200, 'Thank you — your enquiry has been submitted. Our team will get back to you.');
  } catch {
    // Never log the submission, credentials or provider response.
    return result(502, 'We could not confirm delivery. Please try again shortly or contact our team directly.');
  }
}

export default async function handler(req, res, env = process.env) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const send = ({ status, body }) => {
    if (status === 429) res.setHeader('Retry-After', '900');
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(result(405, 'Method not allowed.'));
  }
  if (!(req.headers['content-type'] || '').startsWith('application/json')) return send(result(415, 'JSON required.'));
  try {
    let body = req.body;
    if (body === undefined) {
      let raw = '';
      for await (const chunk of req) {
        raw += chunk.toString();
        if (Buffer.byteLength(raw) > 16384) return send(result(413, 'Your enquiry is too large.'));
      }
      body = JSON.parse(raw);
    } else {
      if (Buffer.byteLength(typeof body === 'string' ? body : JSON.stringify(body)) > 16384) return send(result(413, 'Your enquiry is too large.'));
      if (typeof body === 'string') body = JSON.parse(body);
    }
    // Only trust Vercel's overwritten proxy header on Vercel, not arbitrary forwarding headers.
    const ip = (env.VERCEL === '1' ? req.headers['x-vercel-forwarded-for'] : null) || req.socket?.remoteAddress || 'unknown';
    send(await submitContact({ body, origin: req.headers.origin, ip }, env));
  } catch { send(result(400, 'Unable to read your enquiry. Please try again.')); }
}
