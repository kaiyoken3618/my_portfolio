// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change this if you deploy under a different Netlify subdomain or a custom domain.
const SITE_URL = 'https://enamul18.netlify.app';

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap({ filter: (page) => !/\/(404|thanks)\/?$/.test(page) })],
  vite: {
    plugins: [tailwindcss()],
  },
});
