# Copying

This repository is under **two licences**: one for the software that renders the
site, one for the documentation it renders.

| What | Licence | Full text |
| --- | --- | --- |
| **Site source code** — layouts, components, styles, config, build and CI files | `AGPL-3.0-or-later` | [LICENSE](LICENSE) |
| **Documentation text** — everything under `src/content/`, plus `README.md` and this file | `CC-BY-SA-4.0` | [LICENSE-DOCS](LICENSE-DOCS) |

The Omicron logo and other brand assets in `public/` are **not** covered by
either licence. They are trademarks of The JK Labs; see
[Brand assets](#brand-assets) below.

## In plain language

### The code

The same licence as Omicron itself. Run it, study it, modify it, share it. If
you run a **modified** version as a public website, the AGPL's section 13
entitles your visitors to the source of your modified version.

### The text

**CC BY-SA 4.0** — a copyleft licence for the writing:

- **Share and adapt** it, including commercially.
- **Attribute** it — credit the Omicron documentation and link back to this
  repository or the published site, and note if you made changes.
- **ShareAlike** — if you remix or build on the text, distribute your version
  under CC BY-SA 4.0 too. It cannot be relicensed into a closed derivative.

Translating the docs, quoting a page in a blog post, or forking them for your
own instance's handbook are all fine. Publishing them as a proprietary manual is
not.

### Attribution example

> Based on the [Omicron documentation](https://github.com/the-jk-labs/omicron-docs)
> by The JK Labs, used under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
> Changes were made.

## Why the split

Code and prose want different things. The AGPL is written for programs and its
section 13 is the point of using it for a site people can deploy. It is a poor
fit for paragraphs of English, where CC BY-SA is the standard, is understood by
translators and reusers, and keeps the same copyleft guarantee: derivatives stay
open.

## SPDX identifiers

```
Site source code:     SPDX-License-Identifier: AGPL-3.0-or-later
Documentation text:   SPDX-License-Identifier: CC-BY-SA-4.0
```

New source files should carry the AGPL header, as in the Omicron repository:

```ts
// SPDX-License-Identifier: AGPL-3.0-or-later
```

Documentation files under `src/content/` do not carry per-file headers; this
file and [LICENSE-DOCS](LICENSE-DOCS) cover them as a directory.

## Brand assets

`public/logo.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`,
`public/icon-*.png`, and `public/og-image.png` are the Omicron logo, copied from
the application repository. Trademark rights are not granted by either licence
above: you may use the mark to refer to Omicron, and you should replace it if
you publish a fork as a distinct project.

## Contributing

By contributing you agree to license your work under the licence that governs
the files you touched — `AGPL-3.0-or-later` for code, `CC-BY-SA-4.0` for
documentation text.
