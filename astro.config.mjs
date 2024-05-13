import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import lottie from "astro-integration-lottie";
import alpinejs from "@astrojs/alpinejs";

import vercelStatic from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tombrereton.dev',
  integrations: [mdx(), sitemap(), react(), tailwind(), lottie(), alpinejs()],
  output: 'static',
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    }
  }),
});