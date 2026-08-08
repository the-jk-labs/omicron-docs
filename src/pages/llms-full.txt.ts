// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";
import { hrefFor } from "@/lib/nav";
import { SUMMARY, mdxToMarkdown, orderedDocs, sectionFor } from "@/lib/llms";

// /llms-full.txt — every page's full text as one Markdown file, in reading
// order. An agent answering a question about Omicron can fetch this once
// instead of crawling 38 HTML pages and stripping the chrome out of each.
export const GET: APIRoute = async ({ site }) => {
  const docs = await orderedDocs();

  const pages = docs
    .map((entry) => {
      const url = new URL(hrefFor(entry.id), site);
      const section = sectionFor(entry.id);
      // The per-page header repeats the URL so a model quoting a passage can
      // cite the page it came from rather than the file as a whole.
      const header = [
        `# ${entry.data.title}`,
        "",
        `Source: ${url}`,
        section ? `Section: ${section}` : undefined,
        `Summary: ${entry.data.description}`,
      ]
        .filter(Boolean)
        .join("\n");

      return `${header}\n\n${mdxToMarkdown(entry.body ?? "")}`;
    })
    .join("\n\n---\n\n");

  const body = `# Omicron Documentation — full text

> ${SUMMARY}

This file is the complete documentation, ${docs.length} pages, in reading order.
Canonical HTML: ${new URL("/", site)}
Page index: ${new URL("llms.txt", site)}
Licence: CC BY-SA 4.0 (documentation text) — attribution and share-alike apply.
Generated at build time from https://github.com/the-jk-labs/omicron-docs

---

${pages}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
