// SPDX-License-Identifier: AGPL-3.0-or-later
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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
