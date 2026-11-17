// The icon packs: where each one's SVGs live (inside node_modules) and how a role maps to a file.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALIASES } from './aliases.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'node_modules');
const pkgDir = (name) => join(ROOT, name);

const dirOf = (d) => (existsSync(d) ? readdirSync(d) : []);

/** Builds {name -> path} for a folder of `<name><suffix>.svg` files. */
function index(dir, suffix = '', prefix = '') {
  const out = new Map();
  for (const f of dirOf(dir)) {
    if (!f.endsWith(`${suffix}.svg`)) continue;
    const name = f.slice(0, -`${suffix}.svg`.length);
    if (prefix && !name.startsWith(prefix)) continue;
    out.set(name.slice(prefix.length), join(dir, f));
  }
  return out;
}

const fluent = (kind) => {
  const dir = join(pkgDir('@fluentui/svg-icons'), 'icons');
  const out = new Map();
  for (const f of dirOf(dir)) {
    const m = f.match(new RegExp(`^(.+)_24_${kind}\\.svg$`));
    if (m) out.set(m[1].replaceAll('_', '-'), join(dir, f));
  }
  return out;
};

const phosphor = (weight) => {
  const dir = join(pkgDir('@phosphor-icons/core'), 'assets', weight);
  return index(dir, weight === 'regular' ? '' : `-${weight}`);
};

/**
 * id -> { label, kind: 'svg' | 'font', license, licenseFile, names(): Map, ... }
 * Variants of one family share licences but are separate fonts (Phosphor Regular, Bold, Fill...).
 */
export const PACKS = {
  'lucide': { label: 'Lucide', license: 'ISC', pkg: 'lucide-static', kind: 'lucide' },
  'phosphor': { label: 'Phosphor', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('regular') },
  'phosphor-bold': { label: 'Phosphor Bold', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('bold') },
  'phosphor-fill': { label: 'Phosphor Fill', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('fill') },
  'phosphor-thin': { label: 'Phosphor Thin', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('thin') },
  'bootstrap': { label: 'Bootstrap Icons', license: 'MIT', pkg: 'bootstrap-icons', names: () => index(join(pkgDir('bootstrap-icons'), 'icons')) },
  'fontawesome': { label: 'Font Awesome Free (Solid)', license: 'CC BY 4.0', pkg: '@fortawesome/fontawesome-free', licenseFile: 'LICENSE.txt', names: () => index(join(pkgDir('@fortawesome/fontawesome-free'), 'svgs', 'solid')) },
  'fluent': { label: 'Fluent System Icons', license: 'MIT', pkg: '@fluentui/svg-icons', licenseFile: null, names: () => fluent('regular') },
  'fluent-filled': { label: 'Fluent System Icons (Filled)', license: 'MIT', pkg: '@fluentui/svg-icons', licenseFile: null, names: () => fluent('filled') },
};

/** The file in [names] that stands for [role] (the role itself first, then its synonyms), or null. */
export function resolve(role, names) {
  for (const cand of [role, ...(ALIASES[role] ?? [])]) if (names.has(cand)) return { name: cand, file: names.get(cand) };
  return null;
}

export { pkgDir };
