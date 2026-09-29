export const contactForm = `
  <form id="enquiry-form">
    <h3>Send us a message</h3><p>Tell us about your project and we will be in touch.</p>
    <label>Full name<input name="name" type="text" autocomplete="name" required minlength="2" maxlength="100" placeholder="Your name" /></label>
    <label>Email address<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com" /></label>
    <label>Phone number (optional)<input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+94 77 123 4567" /></label>
    <label>Message<textarea name="message" rows="5" required minlength="10" maxlength="5000" placeholder="Tell us about your project"></textarea></label>
    <div class="enquiry-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabindex="-1" autocomplete="off" /></label></div>
    <div id="enquiry-security"></div>
    <p class="enquiry-status" role="status" aria-live="polite"></p>
    <button type="submit" disabled>Send enquiry &rarr;</button>
    <small class="enquiry-note">Your details will be used to respond to this enquiry.</small>
  </form>`;

export function initContact() {
  const publicEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim();
  document.querySelectorAll('a[href="mailto:hello@dambadenibuilders.lk"]').forEach(link => {
    const emailLabel = link.textContent.trim() === 'hello@dambadenibuilders.lk';
    if (emailLabel && publicEmail) { link.href = `mailto:${publicEmail}`; link.textContent = publicEmail; }
    else if (emailLabel) link.remove();
    else link.href = '/contact';
  });
  const cta = document.querySelector('.cta-action > span');
  if (cta) { cta.replaceChildren(); if (publicEmail) cta.append(publicEmail, document.createElement('br')); cta.append('+94 77 123 4567'); }
  const form = document.querySelector('#enquiry-form');
  if (!form) return;
  const status = form.querySelector('.enquiry-status');
  const button = form.querySelector('button[type="submit"]');
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  let token = '', widget, sending = false;
  const notice = (message, error = false) => { status.textContent = message; status.classList.toggle('is-error', error); };
  if (!sitekey) { notice('Online enquiries are not available yet. Please contact our team directly.', true); return; }
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  script.async = true;
  script.onload = () => {
    widget = window.turnstile.render('#enquiry-security', {
      sitekey, action: 'contact', size: 'flexible', theme: 'light',
      callback: value => { token = value; button.disabled = sending; },
      'expired-callback': () => { token = ''; button.disabled = true; },
      'error-callback': () => { token = ''; button.disabled = true; notice('Security check unavailable. Please refresh the page to retry.', true); },
    });
  };
  script.onerror = () => notice('Security check could not load. Check your connection and refresh the page.', true);
  document.head.append(script);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity() || !token) return;
    sending = true; button.disabled = true; button.textContent = 'Sending…'; notice('Sending your enquiry…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), token }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send. Please try again.');
      form.reset(); notice(data.message);
    } catch (error) {
      notice(error.name === 'TimeoutError' ? 'Delivery could not be confirmed. Please contact us or try again shortly.' : (error.message === 'Failed to fetch' ? 'Connection failed. Your message is still here — please try again.' : error.message), true);
    } finally {
      sending = false; token = ''; button.disabled = true; button.textContent = 'Send enquiry →';
      if (widget !== undefined) window.turnstile.reset(widget);
    }
  });
}
