// SPDX-License-Identifier: AGPL-3.0-or-later
// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.omicron.blog",
  integrations: [svelte(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Two themes so code blocks follow the site's light/dark toggle without
      // a second highlight pass — Shiki emits CSS variables for both.
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
  build: {
    // Clean URLs: /docs/self-hosting/ instead of /docs/self-hosting.html
    format: "directory",
  },
  vite: {
    resolve: {
      // `@/…` in .astro and .svelte files, mirroring tsconfig paths.
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
});
