// SPDX-License-Identifier: AGPL-3.0-or-later
// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// The canonical origin. docs.omicron.blog is the official domain, so it is the
// default rather than something derived from the environment: a local or
// preview build then emits the same absolute URLs production does, which is
// what canonicals, og:url, the sitemap, robots.txt and llms.txt all want. A
// preview that advertised its own deployment URL would compete with production
// in the index. Override with SITE_URL only to serve the site somewhere else.
const site = process.env.SITE_URL ?? "https://docs.omicron.blog";

// https://astro.build/config
export default defineConfig({
  site,
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
