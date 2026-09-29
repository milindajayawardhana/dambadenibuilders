import { defineConfig, loadEnv } from 'vite';
import handler from './api/contact.mjs';

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const middleware = server => { server.middlewares.use('/api/contact', (req, res) => handler(req, res, env)); };
  return { build: { manifest: true, assetsInlineLimit: 0 }, plugins: [{ name: 'contact-api', configureServer: middleware, configurePreviewServer: middleware }] };
});
