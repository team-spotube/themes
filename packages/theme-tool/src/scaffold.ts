// Creating projects and theme modules: shared by `spotube-theme init`, `spotube-theme add` and `create-spotube-theme`.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { PKG, moduleIds, type Project } from './common.js';

export const TEMPLATES_DIR = join(PKG, 'templates');

export function templateIds(): string[] {
  if (!existsSync(TEMPLATES_DIR)) return [];
  return readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3)).sort();
}

export const slug = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'my-theme';

export interface ThemeOptions { id: string; name: string; author: string; license: string; template: string; repository?: string }

/** Writes `src/<id>.ts` from a template (`starter` or one of the bundled example themes). */
export function addTheme(p: Project, o: ThemeOptions): string {
  const file = join(p.src, `${o.id}.ts`);
  if (existsSync(file)) throw new Error(`src/${o.id}.ts already exists`);
  if (moduleIds(p).includes(o.id)) throw new Error(`a theme module "${o.id}" already exists in src/`);
  const source = join(TEMPLATES_DIR, `${o.template}.ts`);
  if (!existsSync(source)) throw new Error(`unknown template "${o.template}" (available: ${templateIds().join(', ')})`);
  const repo = o.repository ?? 'https://github.com/your-name/my-spotube-themes';
  let text = readFileSync(source, 'utf8');
  if (o.template === 'starter') {
    text = text.replaceAll('{{name}}', o.name.replaceAll("'", "\\'")).replaceAll('{{author}}', o.author.replaceAll("'", "\\'")).replaceAll('{{license}}', o.license).replaceAll('{{repository}}', repo);
  } else {
    // Make a bundled theme your own: new name, your author and licence.
    text = text.replace(/(\n  name: )'[^']*'/, `$1'${o.name.replaceAll("'", "\\'")}'`);
    text = text.replace(/\n  (author|license|repository|bugs): '[^']*',/g, '');
    text = text.replace(/(\n  name: '[^']*',)/, `$1\n  author: '${o.author.replaceAll("'", "\\'")}',\n  license: '${o.license}',\n  repository: '${repo}',`);
  }
  // The theme's logo: a copy of the template's artwork marked as a placeholder, so the build reminds you to replace it.
  const logoSource = join(TEMPLATES_DIR, 'logos', `${o.template}.svg`);
  text = text.replaceAll(`logos/${o.template}.svg`, `logos/${o.id}.svg`).replaceAll('logos/{{id}}.svg', `logos/${o.id}.svg`);
  if (existsSync(logoSource)) {
    mkdirSync(join(p.root, 'logos'), { recursive: true });
    let svg = readFileSync(logoSource, 'utf8');
    if (!svg.includes('spotube-theme-placeholder')) svg = svg.replace(/(<svg[^>]*>)/, '$1\n  <!-- spotube-theme-placeholder: replace this file with your own logo (a .svg or a .png up to 512x512) -->');
    writeFileSync(join(p.root, 'logos', `${o.id}.svg`), svg);
  }
  mkdirSync(p.src, { recursive: true });
  writeFileSync(file, text);
  return file;
}

export interface InitOptions extends ThemeOptions {
  /** devDependency spec for the tool (default: the version of this package). */
  toolSpec?: string;
  projectName?: string;
}

/** Bootstraps a theme project in [p.root]. */
export function initProject(p: Project, o: InitOptions): string[] {
  if (existsSync(p.root) && readdirSync(p.root).filter((f) => f !== '.git').length) throw new Error(`${p.root} is not empty`);
  mkdirSync(p.root, { recursive: true });
  const version = JSON.parse(readFileSync(join(PKG, 'package.json'), 'utf8')).version as string;
  const name = slug(o.projectName ?? basename(p.root));
  const created: string[] = [];
  const write = (rel: string, content: string): void => {
    mkdirSync(join(p.root, rel, '..'), { recursive: true });
    writeFileSync(join(p.root, rel), content);
    created.push(rel);
  };
  write('package.json', `${JSON.stringify({
    name,
    version: '1.0.0',
    private: true,
    type: 'module',
    description: 'Spotube themes',
    keywords: ['spotube-theme'],
    scripts: {
      build: 'spotube-theme build',
      check: 'spotube-theme check',
      zip: 'spotube-theme zip',
      dist: 'spotube-theme dist',
      typecheck: 'tsc --noEmit',
    },
    devDependencies: {
      '@team-spotube/theme-tool': o.toolSpec ?? `^${version}`,
      '@types/node': '^22.10.0',
      typescript: '^5.7.0',
    },
  }, null, 2)}\n`);
  write('tsconfig.json', `${JSON.stringify({
    compilerOptions: { target: 'ES2022', module: 'NodeNext', moduleResolution: 'NodeNext', strict: true, noEmit: true, skipLibCheck: true },
    include: ['src'],
  }, null, 2)}\n`);
  write('.gitignore', 'node_modules/\ndist/\n');
  write('fonts/README.md', 'Put your own fonts here, one folder per family (`fonts/my-font/MyFont-Regular.ttf` plus its licence file),\nthen use them in a theme: `fonts: { \'My Font\': { dir: \'my-font\', files: [[\'MyFont-Regular.ttf\', 400]] } }`.\nRun `pnpm exec spotube-theme list` to see the fonts bundled with the tool.\n');
  write('README.md', `# ${o.projectName ?? name}

Spotube themes, built with [@team-spotube/theme-tool](https://github.com/team-spotube/themes/tree/main/packages/theme-tool).

\`\`\`bash
pnpm install
pnpm dist          # build + check + zip into dist/
pnpm build         # just generate themes/<id>/
pnpm exec spotube-theme add <id> --template metro   # another theme from a template
pnpm exec spotube-theme list                        # bundled fonts, icon packs and templates
\`\`\`

Each theme is one file in \`src/\`; the file name is the theme id. Install \`dist/<id>.zip\` from
**Settings → Look & feel → Themes → Install theme** in Spotube. To share it, push this repository to GitHub, add the
topic **spotube-theme** and attach the zip to a release. Guides: https://docs.spotube.cc/themes
`);
  created.push(addTheme(p, o).slice(p.root.length + 1));
  return created;
}
export { project } from './common.js';
