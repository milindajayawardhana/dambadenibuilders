import test from 'node:test';
import assert from 'node:assert/strict';
import { submitContact } from '../api/contact.mjs';

const env = { CONTACT_SITE_URL: 'https://example.com', RESEND_API_KEY: 'secret', CONTACT_TO_EMAIL: 'owner@example.com', CONTACT_FROM_EMAIL: 'Site <site@example.com>', TURNSTILE_SECRET_KEY: 'private', VITE_TURNSTILE_SITE_KEY: 'public' };
const body = { name: 'Test Client', email: 'client@example.com', phone: '+94 77 123 4567', message: 'Please quote for a new home.', token: 'valid', website: '' };
const input = { body, origin: 'https://example.com', ip: '127.0.0.1' };
const ok = value => ({ ok: true, json: async () => value });
test('verified enquiry reaches only configured recipient with visitor reply-to', async () => {
  const calls = [];
  const out = await submitContact(input, env, async (url, options) => {
    calls.push(JSON.parse(options.body));
    return ok(calls.length === 1 ? { success: true, hostname: 'example.com', action: 'contact' } : { id: 'email-id' });
  }, () => true);
  assert.equal(out.status, 200);
  assert.deepEqual(calls[1].to, ['owner@example.com']);
  assert.equal(calls[1].reply_to, body.email);
  assert.equal(calls[1].html, undefined);
});
for (const [label, changes, settings, expected] of [
  ['missing config', {}, {}, 503],
  ['foreign origin', { origin: 'https://evil.example' }, env, 403],
  ['honeypot', { body: { ...body, website: 'spam' } }, env, 400],
  ['invalid email', { body: { ...body, email: 'bad\r\nBcc: other' } }, env, 400],
  ['oversized message', { body: { ...body, message: 'x'.repeat(5001) } }, env, 400],
  ['missing token', { body: { ...body, token: '' } }, env, 400],
]) test(label, async () => {
  const out = await submitContact({ ...input, ...changes }, settings, () => { throw new Error('Must not call provider'); }, () => true);
  assert.equal(out.status, expected);
});
for (const check of [{ success: false }, { success: true, hostname: 'evil.example', action: 'contact' }, { success: true, hostname: 'example.com', action: 'login' }]) {
  test(`reject challenge ${JSON.stringify(check)}`, async () => {
    let calls = 0;
    const out = await submitContact(input, env, async () => { calls++; return ok(check); }, () => true);
    assert.equal(out.status, 400); assert.equal(calls, 1);
  });
}
test('rate limited before contacting providers', async () => {
  assert.equal((await submitContact(input, env, () => assert.fail(), () => false)).status, 429);
});
test('provider failure is not reported as success', async () => {
  const out = await submitContact(input, env, async url => url.includes('siteverify') ? ok({ success: true, hostname: 'example.com', action: 'contact' }) : { ok: false }, () => true);
  assert.equal(out.status, 502);
});
