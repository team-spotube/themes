// Shared helpers for the packaging scripts.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const THEMES = join(ROOT, 'themes');
export const DIST = join(ROOT, 'dist');

/** File types a Spotube theme package may contain (anything else makes the app reject the whole package). */
export const ALLOWED_EXT = new Set(['.json', '.ttf', '.otf', '.png', '.txt', '.md']);
export const ALLOWED_BARE = new Set(['LICENSE', 'LICENCE', 'NOTICE', 'README']);

/** Theme ids: every folder in themes/ that has a theme.json, sorted. */
export function themeIds() {
  return readdirSync(THEMES, { withFileTypes: true })
    .filter((d) => d.isDirectory() && statSync(join(THEMES, d.name, 'theme.json'), { throwIfNoEntry: false })?.isFile())
    .map((d) => d.name)
    .sort();
}

/** All files under [dir] as sorted `/`-separated relative paths (hidden files skipped). */
export function listFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(relative(dir, p).split(sep).join('/'));
    }
  };
  walk(dir);
  return out.sort();
}

export const extOf = (name) => (name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : '');
export const isAllowedFile = (rel) => ALLOWED_EXT.has(extOf(rel)) || (!rel.includes('.') && ALLOWED_BARE.has(rel));
export const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
