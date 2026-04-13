import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site =
  process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.thesky49.com';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site,
  output: 'static',
  integrations: [
    preact({ compat: true }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': { target: 'http://localhost:3002', changeOrigin: true },
      },
    },
  },
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  compressHTML: true,
});
