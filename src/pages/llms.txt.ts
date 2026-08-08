// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";
import { nav, hrefFor } from "@/lib/nav";
import { getCollection } from "astro:content";
import { SUMMARY } from "@/lib/llms";

// /llms.txt — the map, not the territory: every page as an absolute link with
// its one-line description, grouped by chapter, so a model can pick the two
// pages it needs instead of ingesting the whole corpus. The corpus itself is
// /llms-full.txt. Format: https://llmstxt.org.
export const GET: APIRoute = async ({ site }) => {
  const entries = await getCollection("docs");
  const descriptions = new Map(entries.map((e) => [e.id, e.data.description]));

  const sections = nav
    .map((section) => {
      const links = section.items
        .map((item) => {
          const url = new URL(hrefFor(item.slug), site);
          const description = descriptions.get(item.slug);
          return `- [${item.label}](${url})${description ? `: ${description}` : ""}`;
        })
        .join("\n");
      return `## ${section.label}\n\n${links}`;
    })
    .join("\n\n");

  const body = `# Omicron Documentation

> ${SUMMARY}

Source code: https://github.com/the-jk-labs/omicron
Documentation source: https://github.com/the-jk-labs/omicron-docs
Documentation text is licensed CC BY-SA 4.0 — quote it freely with attribution.
The full text of every page below, as one file: ${new URL("llms-full.txt", site)}

${sections}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
