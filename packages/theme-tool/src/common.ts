// Shared helpers: where the tool's own assets live and where a theme project keeps its files.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Root of the @team-spotube/theme-tool package. */
export const PKG = dirname(dirname(fileURLToPath(import.meta.url)));
export const ASSETS = join(PKG, 'assets');
export const SCHEMA_FILE = join(PKG, 'schema', 'theme.schema.json');
export const readJson = (path: string): any => JSON.parse(readFileSync(path, 'utf8'));

/** The theme schema version this release of the tool writes and validates against. */
export const schemaVersion = (): string => readJson(SCHEMA_FILE)['x-schemaVersion'];

/**
 * A theme project: `src/<id>.mjs` theme modules, optional `fonts/<folder>/` of your own fonts, generated `themes/<id>/`
 * folders and `dist/*.zip` packages.
 */
export interface Project { root: string; src: string; fonts: string; themes: string; dist: string }
export function project(cwd: string = process.cwd()): Project {
  const root = resolve(cwd);
  return { root, src: join(root, 'src'), fonts: join(root, 'fonts'), themes: join(root, 'themes'), dist: join(root, 'dist') };
}

/** File types a Spotube theme package may contain (anything else makes the app reject the whole package). */
export const ALLOWED_EXT = new Set(['.json', '.ttf', '.otf', '.png', '.txt', '.md']);
export const ALLOWED_BARE = new Set(['LICENSE', 'LICENCE', 'NOTICE', 'README']);

/** Theme ids: every folder in themes/ that has a theme.json, sorted. */
export function themeIds(p: Project): string[] {
  if (!existsSync(p.themes)) return [];
  return readdirSync(p.themes, { withFileTypes: true })
    .filter((d) => d.isDirectory() && statSync(join(p.themes, d.name, 'theme.json'), { throwIfNoEntry: false })?.isFile())
    .map((d) => d.name)
    .sort();
}

/** The source file of theme module [id] (`src/<id>.ts`, or .mts/.mjs/.js). */
export function moduleFile(p: Project, id: string): string {
  for (const ext of ['ts', 'mts', 'mjs', 'js']) if (existsSync(join(p.src, `${id}.${ext}`))) return join(p.src, `${id}.${ext}`);
  throw new Error(`no theme module src/${id}.ts`);
}

/** Theme module ids: every `src/<id>.ts` (or .mts/.mjs/.js), sorted. */
export function moduleIds(p: Project): string[] {
  if (!existsSync(p.src)) return [];
  return readdirSync(p.src).filter((f: string) => /\.(ts|mts|mjs|js)$/.test(f) && !f.endsWith('.d.ts')).map((f: string) => f.replace(/\.(ts|mts|mjs|js)$/, '')).sort();
}

/** All files under [dir] as sorted `/`-separated relative paths (hidden files skipped). */
export function listFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (d: string): void => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const path = join(d, e.name);
      if (e.isDirectory()) walk(path);
      else out.push(relative(dir, path).split(sep).join('/'));
    }
  };
  walk(dir);
  return out.sort();
}

export const extOf = (name: string): string => (name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : '');
export const isAllowedFile = (rel: string): boolean => ALLOWED_EXT.has(extOf(rel)) || (!rel.includes('.') && ALLOWED_BARE.has(rel));

/** Fonts bundled with the tool (folder name -> files). Use as `fonts: { Family: { dir: '<folder>', files: [...] } }`. */
export function bundledFonts(): Record<string, string[]> {
  const dir = join(ASSETS, 'fonts');
  return Object.fromEntries(readdirSync(dir).sort().map((d: string) => [d, readdirSync(join(dir, d)).filter((f: string) => /\.(ttf|otf)$/i.test(f)).sort()]));
}

/** Icon packs bundled with the tool: id -> { label, license, roles }. */
export function iconPacks(): Record<string, { label: string; license: string; icons: number }> {
  const dir = join(ASSETS, 'iconfonts');
  return Object.fromEntries(
    readdirSync(dir).filter((f: string) => f.endsWith('.json')).sort().map((f: string) => {
      const m = readJson(join(dir, f));
      return [f.slice(0, -5), { label: m.label, license: m.license, icons: Object.keys(m.glyphs).length }];
    }),
  );
}
