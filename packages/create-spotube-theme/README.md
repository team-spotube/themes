# create-spotube-theme

```bash
pnpm create spotube-theme            # asks a few questions
pnpm create spotube-theme my-themes --id sunset --name "Sunset" --author "You" --repository https://github.com/you/my-themes -y
```

Bootstraps a Spotube theme project: `@team-spotube/theme-tool` as a devDependency, a TypeScript theme in `src/`, `tsconfig.json`, scripts
(`pnpm dist` builds, checks and zips) and a README. Options: `--template <starter|metro|neon-noir|...>`, `--license`, `--tool <spec>`, `-y`.
See https://docs.spotube.cc/themes/creating-a-theme.
