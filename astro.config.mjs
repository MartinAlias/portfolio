// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: change to your custom domain once you add one in Vercel.
const SITE = 'https://horciak-portfolio.vercel.app';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  build: {
    // Keep CSS in external files so the Content-Security-Policy can stay strict.
    inlineStylesheets: 'never',
  },
});
