// SPDX-License-Identifier: AGPL-3.0-or-later
// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// The canonical origin, in order of precedence:
//   1. SITE_URL — set this to pin a domain explicitly.
//   2. VERCEL_PROJECT_PRODUCTION_URL — the project's production domain, which
//      Vercel sets to the custom domain once one is attached. Canonicals,
//      og:url, the sitemap, and robots.txt then follow it with no code change.
//   3. localhost, for a local build.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:4321");

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
