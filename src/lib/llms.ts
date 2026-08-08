// SPDX-License-Identifier: AGPL-3.0-or-later
// Shared plumbing for /llms.txt and /llms-full.txt — the two plain-text views
// of the docs that language models and agents read instead of scraping the
// rendered HTML. Format: https://llmstxt.org.
import { getCollection, type CollectionEntry } from "astro:content";
import { nav } from "@/lib/nav";

/** One line, used as the blockquote summary at the top of both files. */
export const SUMMARY =
  "Omicron is a minimal, self-hostable, federated blogging platform built on ActivityPub. These are its official documentation pages, covering self-hosting, day-to-day use, federation behaviour, development, and the API and configuration reference.";

/**
 * Every docs page in nav order — the order a human would read them, which is
 * also the order that gives a model the most context per page. nav.ts is the
 * table of contents, so anything it omits is appended rather than dropped.
 */
export async function orderedDocs(): Promise<CollectionEntry<"docs">[]> {
  const entries = await getCollection("docs");
  const bySlug = new Map(entries.map((e) => [e.id, e]));
  const ordered: CollectionEntry<"docs">[] = [];

  for (const section of nav) {
    for (const item of section.items) {
      const entry = bySlug.get(item.slug);
      if (entry) {
        ordered.push(entry);
        bySlug.delete(item.slug);
      }
    }
  }
  // Unregistered pages still belong in the corpus, even though a page missing
  // from nav.ts is a bug in its own right.
  return [...ordered, ...bySlug.values()];
}

/**
 * MDX source → portable Markdown.
 *
 * The content uses exactly one component, `<Callout>`, and imports nothing
 * else, so this is a complete transform rather than a best-effort one: the
 * import line goes, and each callout becomes a blockquote that keeps its type
 * and title. Anything left is CommonMark that any model can read.
 */
export function mdxToMarkdown(body: string): string {
  const out: string[] = [];
  let inCallout = false;

  for (const line of body.split("\n")) {
    if (/^import\s.+from\s+["'][^"']+["'];?\s*$/.test(line)) continue;

    const open = line.match(/^<Callout\b([^>]*)>\s*$/);
    if (open) {
      const attrs = open[1];
      const type = attrs.match(/type=["']([^"']+)["']/)?.[1] ?? "note";
      const title = attrs.match(/title=["']([^"']+)["']/)?.[1];
      const label = type.charAt(0).toUpperCase() + type.slice(1);
      out.push(`> **${title ? `${label} — ${title}` : label}**`, ">");
      inCallout = true;
      continue;
    }

    if (/^<\/Callout>\s*$/.test(line)) {
      inCallout = false;
      out.push("");
      continue;
    }

    out.push(inCallout ? (line.trim() ? `> ${line}` : ">") : line);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** The section heading a slug sits under, for grouping in llms.txt. */
export function sectionFor(slug: string): string | undefined {
  return nav.find((s) => s.items.some((i) => i.slug === slug))?.label;
}
