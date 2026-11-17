# Spotube themes

Installable themes for [Spotube](https://github.com/team-spotube/spotube). Each one is a complete **application design language**, not a recolour:
its own typeface, shape language, surface treatment, hover and press behaviour, and (where it fits) an app-wide backdrop. Every theme has a light
and a dark look and exposes a few **parameters** you can change in the app (accent, corner style, glow...).

Install from **Settings → Look & feel → Themes → Install theme**, then open the theme's details and use **Customize**.

## Themes

| Theme | Idea | Parameters |
|---|---|---|
| **Classic** (`classic95`) | A 1990s desktop. Grey bevels, navy title bars and menu highlights, square everything. | highlight (navy, teal, maroon, olive), row size |
| **Amp** (`amp`) | A hi-fi deck. Brushed-metal panels, round knobs, a glowing LCD for the selection and inputs, pixel-font labels. | LED colour (green, amber, cyan, red) |
| **Phosphor** (`phosphor`) | A terminal. VT323 type, one-pixel outlines, inverse video for hover and selection. Dark is a CRT, light is paper. | phosphor (green, amber, ice, white) |
| **You** (`material-you`) | Tonal surfaces tinted by the accent, big pills, stadium-shaped selection, roomy layout. | colour (violet, blue, green, rose, amber), corners |
| **Metro** (`metro`) | Flat saturated tiles, big light type, no chrome; presses tilt the tile back. | accent (cobalt, magenta, lime, orange, teal, crimson) |
| **Newsprint** (`newsprint`) | The Sunday paper. Ink on cream (or a night edition), serif headlines, hairline rules. | ink (black, red, blue, green) |
| **Brutal** (`brutalist`) | Thick black outlines, loud flat colour, heavy type; hover floods a control with the colour. | colour (yellow, pink, blue, lime, red), outline thickness |
| **Pocket Synth** (`pocket-synth`) | A palm-sized sampler. Chunky keys sitting on the panel, a pale LCD, one loud key colour. | key colour (orange, blue, green, pink) |
| **Neon Noir** (`neon-noir`) | Synthwave after dark. Sunset-gradient backdrop, neon tubes around outlines, glowing headings. | neon (pink, cyan, lime, amber), glow |
| **Candy Pop** (`candy-pop`) | Sweets on a pastel gradient. Fat glossy pills with a thick under-edge, bouncy presses. | flavour (bubblegum, mint, grape, lemon, berry) |

## Install

1. Build the zips (below) or take them from a release.
2. In Spotube open **Settings → Look & feel → Themes → Install theme** and pick a zip. You see the author, links, licence and contents before confirming.
3. Select it.

You need Node 22.2+ and [pnpm](https://pnpm.io):

```
pnpm install
pnpm dist                         # build + check + zip into dist/ (with an index.json)
pnpm zip neon-noir amp            # or just some
```

## How the themes are made

Each theme is one module in [`tools/themes/`](tools/themes): a plain object holding the `theme.json` content, plus the fonts it uses and its logo
colours. `pnpm build` ([`tools/build-themes.mjs`](tools/build-themes.mjs)) turns every module into `themes/<id>/` (theme.json, logo.png, the exact fonts
it uses, and a LICENSE that carries every font's licence). **Edit the modules, not the generated `themes/` folders.**

[`tools/lib.mjs`](tools/lib.mjs) has the helpers: `A(light, dark)`, `choice(...)` for swatch parameters, `solid(color)` and `flatComponents()`, which
switches off all of Millennium's built-in gloss (shadows, rims, glows, scaling) so a theme only has the effects it asks for. Fonts live in
[`tools/fonts/`](tools/fonts) with their licences.

```
pnpm build                        # regenerate all
pnpm build amp                    # or one
```

What a theme can do is documented in Spotube's
[`composeApp/themes/README.md`](https://github.com/team-spotube/spotube/blob/dev/composeApp/themes/README.md). The levers these themes lean on: per-component
`variants`/`states`, gradient brushes, `bottomRimColor` + `innerGlowColor` for bevels, text-style `shadow` for glow, `tokens.app.background` for an
app-wide backdrop, `tokens.type.styles` for per-role fonts, `tokens.interaction`/`tokens.surface` to flatten.

## Adding a theme

1. Create `tools/themes/<id>.mjs` (see an existing one; `id` is the filename). Give it light **and** dark values (`A(light, dark)`) and expose the
   basics as `parameters`.
2. `pnpm build <id>`, then `pnpm check` (structure, metadata, file types, size limits).
3. Validate with Spotube's own checks and **look at the renders**, light and dark:

   ```
   THEMES_DIR=/path/to/themes/themes ./gradlew :composeApp:jvmTest --tests '*ThemeFolderValidationTest*'
   ```

   Zero warnings are required, every parameter choice must compile in light and dark, and PNGs land in `composeApp/build/theme-gallery/external`.
   `ThemeInteractionGalleryTest` renders hovered rows if you want to judge hover states.

## Licensing

The repository, every `theme.json` and logo are licensed under the **GNU Affero General Public License v3.0 or later** ([LICENSE](LICENSE)), like
Spotube. The bundled fonts keep their own licences (SIL Open Font License 1.1 for Archivo Black, Audiowide, Chakra Petch, Comfortaa, DM Serif Display,
Red Hat Text, Silkscreen, Space Mono and VT323; the Liberation Sans licence for Liberation Sans, Apache 2.0 for Open Sans and Caladea); each theme's
`LICENSE` includes the texts of the fonts it ships.
