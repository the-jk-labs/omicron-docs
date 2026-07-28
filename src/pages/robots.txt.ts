// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";

// Generated rather than a static file in public/, so the sitemap URL follows
// `site` in astro.config.mjs instead of hard-coding a domain that can drift.
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", site)}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
