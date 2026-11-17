// Maintainer-only: the icon packs' source SVGs (devDependencies, inside node_modules) and how a role maps to a file.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PKG } from '../common.js';
import { ALIASES } from '../aliases.js';

const pkgDir = (name: string): string => join(PKG, 'node_modules', name);
const dirOf = (d: string): string[] => (existsSync(d) ? readdirSync(d) : []);

/** Builds {name -> path} for a folder of `<name><suffix>.svg` files. */
function index(dir: string, suffix = ''): Map<string, string> {
  const out = new Map<string, string>();
  for (const f of dirOf(dir)) if (f.endsWith(`${suffix}.svg`)) out.set(f.slice(0, -`${suffix}.svg`.length), join(dir, f));
  return out;
}

const fluent = (kind: 'regular' | 'filled'): Map<string, string> => {
  const dir = join(pkgDir('@fluentui/svg-icons'), 'icons');
  const out = new Map<string, string>();
  for (const f of dirOf(dir)) {
    const m = f.match(new RegExp(`^(.+)_24_${kind}\\.svg$`));
    if (m) out.set(m[1].replaceAll('_', '-'), join(dir, f));
  }
  return out;
};

const phosphor = (weight: string): Map<string, string> =>
  index(join(pkgDir('@phosphor-icons/core'), 'assets', weight), weight === 'regular' ? '' : `-${weight}`);

export interface Pack { label: string; license: string; pkg: string; licenseFile?: string | null; kind?: 'lucide'; names?: () => Map<string, string> }

/** Variants of one family share a licence but are separate fonts (Phosphor Regular, Bold, Fill...). */
export const PACKS: Record<string, Pack> = {
  lucide: { label: 'Lucide', license: 'ISC', pkg: 'lucide-static', kind: 'lucide' },
  phosphor: { label: 'Phosphor', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('regular') },
  'phosphor-bold': { label: 'Phosphor Bold', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('bold') },
  'phosphor-fill': { label: 'Phosphor Fill', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('fill') },
  'phosphor-thin': { label: 'Phosphor Thin', license: 'MIT', pkg: '@phosphor-icons/core', names: () => phosphor('thin') },
  bootstrap: { label: 'Bootstrap Icons', license: 'MIT', pkg: 'bootstrap-icons', names: () => index(join(pkgDir('bootstrap-icons'), 'icons')) },
  fontawesome: { label: 'Font Awesome Free (Solid)', license: 'CC BY 4.0', pkg: '@fortawesome/fontawesome-free', licenseFile: 'LICENSE.txt', names: () => index(join(pkgDir('@fortawesome/fontawesome-free'), 'svgs', 'solid')) },
  fluent: { label: 'Fluent System Icons', license: 'MIT', pkg: '@fluentui/svg-icons', licenseFile: null, names: () => fluent('regular') },
  'fluent-filled': { label: 'Fluent System Icons (Filled)', license: 'MIT', pkg: '@fluentui/svg-icons', licenseFile: null, names: () => fluent('filled') },
};

/** The file in [names] that stands for [role] (the role itself first, then its synonyms), or null. */
export function resolve(role: string, names: Map<string, string>): { name: string; file: string } | null {
  for (const cand of [role, ...(ALIASES[role] ?? [])]) if (names.has(cand)) return { name: cand, file: names.get(cand)! };
  return null;
}

/** The licence text shipped with a pack's artwork. */
export function licenseText(pack: Pack): string {
  const file = pack.licenseFile === undefined ? 'LICENSE' : pack.licenseFile;
  const path = file && join(pkgDir(pack.pkg), file);
  return path && existsSync(path) ? readFileSyncUtf8(path).trim() : `${pack.label} is licensed under ${pack.license}.`;
}
import { readFileSync } from 'node:fs';
const readFileSyncUtf8 = (p: string): string => readFileSync(p, 'utf8');
