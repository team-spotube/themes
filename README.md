# Spotube themes

The official [Spotube](https://github.com/team-spotube/spotube) themes, and **`@team-spotube/theme-tool`**, the tool for making your own.

Each theme is a complete **application design language**, not a recolour: its own typeface, icon set, shape language, surface treatment,
hover and press behaviour, and (where it fits) an app-wide backdrop. Every theme has a light and a dark look and exposes a few
**parameters** you can change in the app (accent, corner style, glow...).

## Themes

| Theme | Idea | Fonts | Icons | Parameters |
|---|---|---|---|---|
| **Classic** (`classic95`) | A 1990s desktop. Grey bevels, navy title bars and menu highlights, square everything. | Liberation Sans | Fluent filled | highlight, row size |
| **Amp** (`amp`) | A hi-fi deck. Brushed-metal panels, round knobs, a glowing LCD for selection and inputs. | Silkscreen, Liberation Sans | Lucide | LED colour |
| **Phosphor** (`phosphor`) | A terminal. Inverse video for hover and selection. Dark is a CRT, light is paper. | VT323 | Font Awesome | phosphor colour |
| **You** (`material-you`) | Tonal surfaces tinted by the accent, big pills, stadium-shaped selection. | Red Hat Text | Fluent | colour, corners |
| **Metro** (`metro`) | Flat saturated tiles, big light type, no chrome; presses tilt the tile back. | Open Sans | Bootstrap | accent |
| **Newsprint** (`newsprint`) | The Sunday paper. Ink on cream (or a night edition), serif headlines, hairline rules. | DM Serif Display, Caladea | Phosphor Thin | ink |
| **Brutal** (`brutalist`) | Thick black outlines, loud flat colour; hover floods a control with the colour. | Archivo Black, Space Mono | Phosphor Bold | colour, outline thickness |
| **Pocket Synth** (`pocket-synth`) | A palm-sized sampler. Chunky keys on the panel, a pale LCD, one loud key colour. | Space Mono | Phosphor Fill | key colour |
| **Neon Noir** (`neon-noir`) | Synthwave after dark. Sunset-gradient backdrop, neon tubes around outlines. | Audiowide, Chakra Petch | Phosphor | neon, glow |
| **Candy Pop** (`candy-pop`) | Sweets on a pastel gradient. Fat glossy pills with a thick under-edge, bouncy presses. | Comfortaa | Phosphor Fill | flavour |

## Make your own

```bash
pnpm create spotube-theme my-themes     # bootstraps a project with @team-spotube/theme-tool as a devDependency
cd my-themes && pnpm install && pnpm dist
```

## How themes are discovered and updated

**Discovery.** Spotube's *Settings → Appearance → Discover on GitHub* lists every public, non-fork repository that has **both** GitHub topics
`spotube` and `spotube-theme`, most starred first. Opening one lists its releases and every `.zip` attached to them; picking a file downloads it
(from github.com only) and shows the usual install dialog. To be listed:

1. Push your theme project to a public GitHub repository (not a fork).
2. Add the topics **`spotube`** and **`spotube-theme`** (*About → Topics*).
3. Create a release and attach `dist/<id>.zip` (the `.zip` files `pnpm dist` builds).

**Updates.** Set `updates: true` in a theme (with `repository` pointing at the GitHub repo) to let Spotube find new versions of it:

- Release tags must be semantic versions, with or without a `v` (`v1.2.0`, `1.2.0`); other tags are ignored, as are drafts and pre-releases.
- The release must carry an archive named `<id>.zip` (what `spotube-theme zip` produces). Use `updates: { github: 'https://github.com/you/repo', asset: 'my-theme.zip' }` for another repository or archive name.
- Spotube checks the **selected theme automatically** when the app starts and whenever the selection changes (when "check for updates" is on in
  settings) and offers *Update to X* in a dialog with the release notes; *Ignore* silences that version. The refresh button on the Appearance page
  checks **every** installed theme and shows *Update to X* on the rows that have one.
- An update installs over the installed theme when the archive has the **same id** and a **newer** version; the archive is validated like any import.
- Keep the theme's `version` equal to the release tag. Themes without an explicit `version` share the `version` of your `package.json`, so one tag
  matches every theme in a multi-theme repository (this repository's release workflow checks that the tag is `v<package.json version>`).

## Install a theme

1. In Spotube open **Settings → Appearance → Discover on GitHub**, pick a repository and a release asset, or build the zips yourself (`pnpm install && pnpm dist` puts them in `dist/`).
2. Or use **Install theme** and pick a zip. You see the author, links, licence and contents before confirming.
3. Select it.

## This repository

A pnpm workspace:

| Path | What |
|---|---|
| `src/*.ts` | the ten official themes, one TypeScript file each (they are also the tool's templates) |
| `packages/theme-tool` | **`@team-spotube/theme-tool`**: CLI, typed helpers, JSON Schema, bundled fonts and icon packs |
| `packages/create-spotube-theme` | `pnpm create spotube-theme` |
| `themes/`, `dist/` | generated theme folders and zips |

All themes share the version in the root `package.json`, and a release is tagged `v<that version>` (the workflow checks it), so Spotube's update check
(release tag vs installed theme version) works for the whole collection.

```bash
pnpm install
pnpm tool        # compile the two packages
pnpm dist        # build + check + zip the official themes, with the tool
pnpm typecheck
```

To validate a theme with the real engine (zero warnings, every parameter choice in light and dark, PNG renders), run Spotube's own test from a
Spotube checkout; this is the check that matters for what the app will do:

```
THEMES_DIR=/path/to/themes/themes ./gradlew :composeApp:jvmTest --tests '*ThemeFolderValidationTest*'
```

Renders land in `composeApp/build/theme-gallery/external`; look at them, light *and* dark. `ThemeInteractionGalleryTest` renders hovered rows.

## Icon packs and fonts

Themes restyle **all** of the app's icons with an icon pack, not just the fonts. The tool bundles a tiny font per pack, built from the official
artwork with only the roughly 90 icons Spotube uses: **Lucide**, **Phosphor** (thin, regular, bold, fill), **Bootstrap Icons**, **Font Awesome Free**
(solid) and **Fluent System Icons** (regular, filled). Fonts come bundled too (12 families), or put your own in `fonts/`. Mix freely: a serif body
with a bold icon set, a pixel font with a hairline one. Heroicons (no media icons) and Hugeicons (stroke-only art) are not packaged.

## Licensing

The repository, every theme definition and logo, and the tool are licensed under the **GNU Affero General Public License v3.0 or later**
([LICENSE](LICENSE)), like Spotube. Bundled fonts and icon fonts keep their own licences (SIL Open Font License 1.1 for most fonts, Apache 2.0 for
Open Sans and Caladea; MIT/ISC for most icon sets, CC BY 4.0 for Font Awesome); every theme's `LICENSE` includes the texts of what it ships.

## Publishing the tooling to npm
`@team-spotube/theme-tool` and `create-spotube-theme` are published by `.github/workflows/publish-npm.yml`:
1. Bump `version` in `packages/theme-tool/package.json` (and `packages/create-spotube-theme/package.json` if it changed), commit and push.
2. Either push a tag `tools-v<theme-tool version>` (for example `tools-v1.1.0`; the workflow refuses a tag that doesn't match), or run **Actions → Publish npm packages** by hand (tick *dry run* first to see what would go out, set *dist tag* to `next` for a pre-release).
3. The workflow builds the tool, builds and checks every theme with it, then publishes each package with provenance. A version already on npm is skipped, so re-running is safe.

It needs one repository secret, `NPM_TOKEN` (an npm automation token with publish rights on the `@team-spotube` scope). Theme releases keep using plain `v*` tags (`release.yml`).
