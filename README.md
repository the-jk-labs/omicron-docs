<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Omicron documentation

The documentation site for [Omicron](https://github.com/the-jk-labs/omicron), a
federated blogging platform.

Built with **Astro** (content collections + MDX), **Svelte 5** islands using
**Bits UI**, and **Tailwind CSS 3.4**. The theme tokens are ported from the
Bits UI docs theme, identical to the ones the Omicron app uses, so the docs and
the product look like one thing.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/`, then generates the Pagefind index |
| `npm run preview` | Serve the built site locally |
| `npm run check` | `astro check` — types and template diagnostics |

Search uses [Pagefind](https://pagefind.app), whose index only exists after a
build. In dev the search dialog falls back to matching page titles and
descriptions, so it still works.

## Writing a page

1. Add an `.mdx` file under `src/content/docs/`. The path becomes the URL:
   `src/content/docs/self-hosting/backups.mdx` → `/docs/self-hosting/backups/`.
2. Give it frontmatter:

   ```yaml
   ---
   title: Backups and restore
   description: One line, shown under the title and in search results.
   badge: Admin only   # optional
   ---
   ```

3. Register it in `src/lib/nav.ts`. That file is the single source of truth for
   the sidebar, the mobile navigation, and the previous/next pager — a page that
   is not listed there is reachable by URL but appears nowhere.

### Callouts

```mdx
import Callout from "@/components/Callout.astro";

<Callout type="warning" title="Optional title">
Body text, Markdown allowed.
</Callout>
```

Types: `note`, `tip`, `warning`, `danger`.

## Structure

```
src/
  content/docs/        the documentation itself (MDX)
  content.config.ts    collection schema
  lib/nav.ts           table of contents — edit this when adding a page
  layouts/
    BaseLayout.astro   <head>, theme bootstrap, header, footer
    DocsLayout.astro   sidebar + article + table of contents
  components/
    Sidebar.svelte     Bits UI Accordion
    SearchDialog.svelte Bits UI Dialog + Pagefind (Ctrl/Cmd K)
    MobileNav.svelte   Bits UI Dialog as a slide-over
    ThemeToggle.svelte Bits UI Button, light/dark
    TableOfContents.astro, Pager.astro, Callout.astro, Header.astro, Footer.astro
  styles/app.css       Bits UI theme tokens + prose styling
  pages/
    index.astro        documentation home
    docs/[...slug].astro
    404.astro
```

## Styling rules

The same rules the Omicron app follows:

- **Bits UI for every primitive that has one.** Native HTML only where Bits UI
  ships no equivalent.
- **Theme tokens only** — `foreground`, `muted`, `background`, `accent`,
  `destructive`, `border`, and the matching radii and shadows. Never
  `text-neutral-*`, `bg-gray-*`, or raw `bg-white`.
- **Copy the Bits UI docs' class strings verbatim**, adapting for Tailwind v3:
  `outline-hidden` → `outline-none`, `ring-0!` → `!ring-0`,
  `data-highlighted:` → `data-[highlighted]:`.

Both light and dark themes are first-class. Check any UI change in both.

## Deploying

The site is fully static. On Vercel, the framework preset is Astro:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

`npm run build` runs Pagefind after Astro, so the search index ships with the
site.

### The canonical domain

Canonical tags, `og:url`, the sitemap, and `robots.txt` all derive from one
value, resolved at build time in this order:

1. **`SITE_URL`** — set it as an environment variable to pin a domain.
2. **`VERCEL_PROJECT_PRODUCTION_URL`** — set by Vercel automatically. It is the
   project's production domain, and becomes your custom domain as soon as one
   is attached, so nothing needs changing when you move to `docs.example.com`.
3. **`http://localhost:4321`** — for local builds.

So a fresh Vercel import is correct straight away, and stays correct after the
domain swap. Set `SITE_URL` only if you need to override that.

## License

Two licences, because code and prose want different things:

| What | Licence |
| --- | --- |
| **Site source code** (layouts, components, styles, config) | [AGPL-3.0-or-later](LICENSE) — the same as Omicron |
| **Documentation text** (everything under `src/content/`) | [CC BY-SA 4.0](LICENSE-DOCS) |

CC BY-SA is copyleft too: share and adapt the text, including commercially, as
long as you credit the Omicron documentation, note your changes, and license
your version under CC BY-SA 4.0 as well.

The Omicron logo and the other brand assets in `public/` are trademarks and are
not covered by either licence.

Full detail, including an attribution example, is in [COPYING.md](COPYING.md).
