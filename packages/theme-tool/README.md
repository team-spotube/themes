# @team-spotube/theme-tool

Build, validate and package [Spotube](https://github.com/team-spotube/spotube) themes. You write each theme as one small TypeScript
file; the tool turns it into a theme package (`theme.json`, logo, fonts, icon font, `LICENSE`) and a `.zip` that Spotube installs.

```bash
pnpm create spotube-theme my-themes     # bootstrap a project with this tool as a devDependency
cd my-themes && pnpm install && pnpm dist
```

## What is in the box

- **CLI** `spotube-theme`: `build`, `check`, `zip`, `dist`, `add`, `init`, `list`.
- **Typed helpers** for theme modules: `defineTheme`, `A(light, dark)`, `solid`, `choice`, `merge`, `flatComponents`, ...
- **The theme JSON Schema** (`@team-spotube/theme-tool/schema`), used by `check` (a misspelt property is an error).
- **Bundled fonts** (12 families with their licences) and **icon packs**: Lucide, Phosphor (thin, regular, bold, fill), Bootstrap Icons,
  Font Awesome Free and Fluent, each as a tiny font with just the icons Spotube uses.
- **Templates**: a `starter` and the ten official themes, to copy with `spotube-theme add <id> --template <name>`.

## A theme module

`src/<id>.ts` (the file name is the theme id):

```ts
import { A, choice, defineTheme, flatComponents, merge, solid } from '@team-spotube/theme-tool';

export default defineTheme({
  name: 'Sunset',
  description: 'Warm and rounded.',
  author: 'You',
  license: 'MIT',
  repository: 'https://github.com/you/my-themes',
  logo: ['#ff7a18', '#7a1eff'],
  iconPack: 'phosphor',
  fonts: { 'Red Hat Text': { dir: 'redhat-text', files: [['RedHatText-Regular.otf', 400], ['RedHatText-Bold.otf', 700]] } },
  parameters: { accent: choice('Accent', 'orange', [['orange', 'Orange', '#ff7a18'], ['violet', 'Violet', '#7a1eff']]) },
  vars: { key: { type: 'color', value: ['match', '{params.accent}', { orange: '#ff7a18', violet: '#7a1eff' }] } },
  tokens: { color: { accent: '{vars.key}' }, type: { family: 'Red Hat Text' } },
  components: merge(flatComponents(), {
    button: { variants: { primary: { base: { background: solid('{vars.key}'), foreground: '#ffffff', shape: 'pill' } } } },
  }),
});
```

`fonts[...].dir` is a folder in your project's `fonts/` (put the font and its licence there) or one of the bundled fonts
(`spotube-theme list`).

## Commands

| Command | |
|---|---|
| `spotube-theme build [id...]` | `src/<id>.ts` -> `themes/<id>/` |
| `spotube-theme check` | validate every `themes/<id>/` against the JSON Schema, the metadata and Spotube's package limits |
| `spotube-theme zip [id...]` | `themes/<id>/` -> `dist/<id>.zip` (reproducible) and `dist/index.json` |
| `spotube-theme dist [id...]` | build, check and zip |
| `spotube-theme add <id> [--template metro]` | add a theme module (options: `--name --author --license --repository`) |
| `spotube-theme list` | bundled fonts, icon packs and templates |

Every theme declares the theme format version (`schema`, semver) the installed tool writes; see
https://docs.spotube.cc/themes/schema-versioning. To try a theme in Spotube, install `dist/<id>.zip` from
**Settings → Look & feel → Themes → Install theme**. Publish by pushing the repository to GitHub with the topic `spotube-theme`.

## Maintaining the tool

```bash
pnpm install
pnpm --filter @team-spotube/theme-tool build      # tsc -> dist/
pnpm --filter @team-spotube/theme-tool icons      # rebuild assets/iconfonts from the icon libraries (devDependencies)
pnpm --filter @team-spotube/theme-tool templates  # copy the official themes (../../src) into templates/ (also runs on prepack)
```

`schema/theme.schema.json` is generated in the Spotube repository (`tools/gen-theme-schema.mjs`); copy it here when the theme format changes.
