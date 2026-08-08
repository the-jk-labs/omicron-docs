// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";

// Generated rather than a static file in public/, so the sitemap URL follows
// `site` in astro.config.mjs instead of hard-coding a domain that can drift.
//
// Everything is crawlable, including by the AI crawlers, because the docs are
// CC BY-SA 4.0 and being quoted by an assistant is the point. The only closed
// paths are the ones with nothing to read: /pagefind/ holds the search index as
// fragmented JSON and _astro/ the hashed bundles, so crawling either spends
// budget on files that will never be a search result.
export const GET: APIRoute = ({ site }) => {
  const body = `# Omicron documentation — https://github.com/the-jk-labs/omicron
# Docs text is CC BY-SA 4.0; attribution and share-alike apply to reuse.

User-agent: *
Allow: /
Disallow: /pagefind/
Disallow: /_astro/

# A condensed, link-annotated index for LLMs, and the full corpus as one file.
# See https://llmstxt.org.
# ${new URL("llms.txt", site)}
# ${new URL("llms-full.txt", site)}

Sitemap: ${new URL("sitemap-index.xml", site)}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
