// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alwaysindev.es',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
});
