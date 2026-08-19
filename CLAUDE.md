# CLAUDE.md

## What this repo is

The documentation site for **Omicron** (the federated blogging platform at
`the-jk-labs/omicron`). Application code lives in that repository, not here.
Never add product code to this repo, and never edit the Omicron repo from here.

## Stack

Astro 7 (content collections + MDX) · Svelte 5 islands · Bits UI · Tailwind CSS
3.4 · Pagefind (search). Fully static output, deployed on Vercel.

## Adding or editing a page

1. `.mdx` file under `src/content/docs/`. The path is the URL.
2. Frontmatter: `title`, `description` (one line), optional `badge`.
3. **Register it in `src/lib/nav.ts`** — the single source of truth for the
   sidebar, the mobile nav, and the prev/next pager.

Callouts: `import Callout from "@/components/Callout.astro";` then
`<Callout type="note|tip|warning|danger" title="…">`.

## UI styling (STRICT)

Identical rules to the Omicron app — the docs and the product must look like one
thing.

1. **Use Bits UI for every primitive that has one** (Button, Dialog, Accordion,
   Tabs, Separator, Tooltip, …). Native HTML only where Bits UI ships no
   equivalent (text inputs, forms, headings, layout).

2. **Theme tokens only — never ad-hoc colours.**
   - Colours: `foreground`, `foreground-alt`, `muted`, `muted-foreground`,
     `background`, `background-alt`, `dark`, `dark-10`, `accent`, `destructive`,
     `border` / `border-input`.
   - Radii: `rounded-input`, `rounded-card`, `rounded-9px`, `rounded-button`.
   - Shadows: `shadow-mini`, `shadow-popover`, `shadow-btn`, `shadow-card`.

   Never `text-neutral-*`, `bg-gray-*`, `text-red-600`, raw `bg-white`.

3. **Copy the Bits UI docs' example class strings verbatim**, adapting v4 → v3
   syntax: `outline-hidden` → `outline-none`, `ring-0!` → `!ring-0`,
   `data-highlighted:` → `data-[highlighted]:`.

Tokens live in `tailwind.config.ts`; the CSS variables (ported verbatim from the
Bits UI docs `:root`) live in `src/styles/app.css`. Keep both in sync with the
Omicron app. Do not invent new design tokens.

Light and dark are both first-class — verify any UI change in both.

## Content voice

Plain, direct, technical. State what a thing does and what it costs. Prefer a
table to a paragraph when the content is a list of options. Say explicitly when
something is irreversible, when it needs a restart, and when it cannot be
undone. No marketing copy — this is documentation only.

Accuracy comes from the Omicron source, not from memory: verify routes,
environment variables, and defaults against `apps/backend/src/` and
`.env.example` before documenting them.

## Licensing (two licences)

| What | Licence |
| --- | --- |
| Site source code — layouts, components, styles, config, CI | `AGPL-3.0-or-later` |
| Documentation text — everything under `src/content/` | `CC-BY-SA-4.0` |

New **source** files carry `// SPDX-License-Identifier: AGPL-3.0-or-later`.
Content files under `src/content/` carry no per-file header — `COPYING.md` and
`LICENSE-DOCS` cover that directory. Never relicense either half, and never
copy text in from a source whose licence is incompatible with CC BY-SA 4.0.

Brand assets in `public/` (logo, favicons, og-image) are trademarks and are
covered by neither licence.

## Checks

```bash
pnpm check      # astro check — 0 errors expected
pnpm build      # includes the Pagefind index step
```

## Git workflow (STRICT)

**Never push directly to `master`.** Every change — a one-line typo fix
included — goes through a pull request. Same rule in the Omicron app repo.

```
git checkout -b docs/short-kebab-description
```

Prefixes: `docs/`, `fix/`, `feat/`, `refactor/`, `chore/`.

Run `pnpm check` and `pnpm build` before opening one. Both must be clean.

### Commits

One logical change per commit, with a conventional-commit subject
(`docs: …`, `fix: …`). Split a branch into several commits when the change has
genuinely separable parts — each one should be revertable on its own. The body
explains **why**, not what the diff already shows.

Never credit an AI assistant as author, co-author, or contributor. No
`Co-Authored-By` trailers, no "generated with" footers, in commits or PRs.

### Pull request descriptions

Write them for someone who has not seen the problem. A good one covers:

- **What was wrong or missing** — and where a reader would have hit it.
- **What changed** — separating corrections of statements that were *wrong*
  from additions that were merely absent. A doc that actively misleads is a
  different severity from one that is incomplete; say which this is.
- **Where the facts came from** — the file in the app repo each variable,
  default, route, or path was verified against. Never from memory.
- **Checks** — `pnpm check` and `pnpm build` results.
- **Ordering** — whether it must merge after a corresponding app PR, so the
  site never documents behaviour that has not shipped.

Keep it proportionate: a typo fix needs a sentence, not a template.
