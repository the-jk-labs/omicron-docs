// SPDX-License-Identifier: AGPL-3.0-or-later
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
// Astro 7 deprecates the `z` re-export from astro:content — import zod directly.
import { z } from "zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    /** One-line summary — used for the page description and search results. */
    description: z.string(),
    /** Optional badge shown next to the page title (e.g. "Advanced"). */
    badge: z.string().optional(),
  }),
});

export const collections = { docs };
