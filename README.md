# Spotube themes

Installable themes for [Spotube](https://github.com/team-spotube/spotube): popular palettes plus a couple of showpieces. Each theme is a
folder in [`themes/`](themes) that is packed into a `.zip` and installed from **Settings → Look & feel → Themes → Install theme**.

Every theme ships a **light and a dark** variant and works with the app's Light / Dark / System setting. Open a theme's details in the app and use
**Customize** to change its **accent color**, **corner radius** and (for most) **density**; your choices are saved per theme.

## Themes

| Theme | About | Accents |
|---|---|---|
| **Candy Pop** (`candy-pop`) | Soft pastel gloss with fully rounded shapes and the friendly Comfortaa typeface. | pink, peach, mint, lavender |
| **Catppuccin** (`catppuccin`) | Soothing pastels: Latte by day, Mocha by night, with your pick of accent. | mauve, blue, pink, green, peach, red, teal, lavender |
| **Dracula** (`dracula`) | The classic dark theme with vivid purple and pink, and its light sibling Alucard. | purple, pink, cyan, green, orange, yellow |
| **GitHub** (`github`) | GitHub Primer colours: familiar, neutral and quietly blue. | blue, green, purple, orange, red, yellow |
| **Gruvbox** (`gruvbox`) | Retro groove: warm, earthy, low-contrast colours that are easy on the eyes. | orange, yellow, green, aqua, blue, purple |
| **Neon Noir** (`neon-noir`) | A glowing synthwave look: gradient buttons, pill shapes and neon accents, dark and light. | pink, cyan, lime, amber |
| **Nord** (`nord`) | An arctic, north-bluish palette: calm polar-night greys and cool frost accents. | frost, blue, teal, green, orange, purple |
| **One** (`one`) | Atom's One Dark and One Light: the balanced editor classics. | blue, purple, cyan, green, yellow, orange |
| **Rosé Pine** (`rose-pine`) | All natural pine, faux fur and a bit of soho vibes: soft and low-contrast. | iris, rose, love, gold, pine, foam |
| **Solarized** (`solarized`) | Precision colours for machines and people: the original dark and light pair. | blue, cyan, green, yellow, orange, violet |
| **Tokyo Night** (`tokyo-night`) | A clean dark theme inspired by the lights of downtown Tokyo, with a Day variant. | blue, purple, cyan, green, orange, red |

*Neon Noir* and *Candy Pop* are glossy showpieces (gradients, glow, a bundled font for Candy Pop); the rest are flat, palette-faithful themes.

## Install

1. Get the `.zip`: download it from a release, or build them yourself (below).
2. In Spotube open **Settings → Look & feel → Themes → Install theme** and pick the zip. You'll see who made it, its links, license and contents before
   confirming.
3. Select it. Open its details to **Customize**.

Build every package into `dist/` (plus an `index.json` listing them). You need Node 22.2+ and [pnpm](https://pnpm.io):

```
pnpm install
pnpm zip                         # all themes (reproducible zips)
pnpm zip dracula nord            # or just some
pnpm dist                        # build + check + zip in one go
```

## How the themes are made

The nine palette themes (`dracula`, `nord`, `catppuccin`, `gruvbox`, `solarized`, `tokyo-night`, `rose-pine`, `one`, `github`) are **generated**
from the palette data in [`tools/palettes.mjs`](tools/palettes.mjs) and the structure in [`tools/template.json`](tools/template.json), which is
Spotube's flat *Modern* theme. The generator ([`tools/build-themes.mjs`](tools/build-themes.mjs)) picks readable text for every accent by contrast (white
on saturated colors, dark ink on pastels). To change a palette, edit `tools/palettes.mjs` and run the build; don't hand-edit the generated `theme.json`
files:

```
pnpm build                       # regenerate all
pnpm build nord                  # or one
```

`neon-noir` and `candy-pop` are hand-written; edit their `theme.json` directly.

The theme format (tokens, component styling, parameters, brushes, fonts) is documented in Spotube's
[`composeApp/themes/README.md`](https://github.com/team-spotube/spotube/blob/dev/composeApp/themes/README.md).

## Adding a theme

1. Create `themes/<id>/` containing `theme.json` (with `id` equal to the folder name, plus `name`, `version`, `author`; `repository`, `bugs`,
   `license` and `logo` are expected), a `logo.png` (max 512 x 512) and a `LICENSE`. Fonts (`.ttf`/`.otf`) and icon PNGs are allowed; nothing else is.
2. Give it a light **and** a dark look (`{"light": ..., "dark": ...}` values) and expose the basics as `parameters` (accent, radius, density).
3. Run `pnpm check` (structure, metadata, file types and size limits, parameter sanity), then validate it with Spotube's own checks. From a Spotube
   checkout:

   ```
   THEMES_DIR=/path/to/themes/themes ./gradlew :composeApp:jvmTest --tests '*ThemeFolderValidationTest*'
   ```

   Every theme must load with **zero warnings**, and every accent / radius / density choice must compile warning-free in light and dark. The test
   also renders each theme to `composeApp/build/theme-gallery/external` (PNG files; look at them: text readable on every fill, light *and* dark), and,
   after `pnpm zip`, runs every built zip in `dist/` through the app's strict package reader.

## Licensing

The repository, and every `theme.json`, is licensed under the **GNU Affero General Public License v3.0 or later** ([LICENSE](LICENSE)), like Spotube.
The color palettes of the popular themes belong to their authors and are used under the MIT License (see each theme's `LICENSE`). Candy Pop bundles the
Comfortaa typeface under the SIL Open Font License 1.1 (see its `LICENSE`). "Dracula", "Nord", "Catppuccin" and the other palette names are used only
to identify the palettes and imply no endorsement.
