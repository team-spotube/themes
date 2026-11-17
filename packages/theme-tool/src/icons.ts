// Icon packs from any icon library. Spotube restyles every app icon through *roles* (Lucide names: house, search,
// trash-2...), so a pack only has to say which of its icons stands for each role. Sources:
//   - bundled font packs (`iconPack: 'phosphor'`),
//   - an Iconify set from npm (`{ iconify: '@iconify-json/tabler' }`: 200+ libraries incl. Hugeicons, Tabler, Material
//     Symbols, Heroicons, Bootstrap, Font Awesome, Fluent, Remix, Carbon...),
//   - any folder of SVG files (`{ svgDir: 'node_modules/feather-icons/dist/icons' }` or your own).
// Generic packs are rendered to PNGs (works for fill *and* stroke icons) and tinted by Spotube like the stock icons.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { ALIASES } from './aliases.js';
import { ASSETS, readJson, type Project } from './common.js';
import type { IconPackSpec } from './lib.js';

export const ICON_ROLES: string[] = readJson(join(ASSETS, 'icon-roles.json'));

export interface RenderedPack {
  /** role -> PNG bytes */
  images: Map<string, Buffer>;
  missing: string[];
  /** The text added to the theme's LICENSE. */
  notice: string;
  tint: boolean;
}

type Source = { label: string; names: Map<string, () => string>; notice: string };

function fromSvgDir(p: Project, spec: Extract<IconPackSpec, { svgDir: string }>): Source {
  const dir = resolve(p.root, spec.svgDir);
  if (!existsSync(dir)) throw new Error(`iconPack svgDir "${spec.svgDir}" not found`);
  const names = new Map<string, () => string>();
  for (const f of readdirSync(dir)) if (f.endsWith('.svg')) names.set(f.slice(0, -4), () => readFileSync(join(dir, f), 'utf8'));
  const label = spec.label ?? spec.svgDir;
  return { label, names, notice: `--- ${label} icons (rendered to PNG from ${spec.svgDir}) ---\n\n${spec.license ?? 'Check the icon library\'s licence before publishing.'}\n` };
}

function fromIconify(p: Project, spec: Extract<IconPackSpec, { iconify: string }>): Source {
  const root = join(p.root, 'node_modules', spec.iconify);
  const file = join(root, 'icons.json');
  if (!existsSync(file)) throw new Error(`iconPack "${spec.iconify}" not found (pnpm add -D ${spec.iconify})`);
  const set = readJson(file);
  const info = existsSync(join(root, 'info.json')) ? readJson(join(root, 'info.json')) : set.info ?? {};
  const names = new Map<string, () => string>();
  const body = (name: string): string => {
    let icon = set.icons[name];
    if (!icon && set.aliases?.[name]) icon = { ...set.icons[set.aliases[name].parent], ...set.aliases[name] };
    const [w, h] = [icon.width ?? set.width ?? 24, icon.height ?? set.height ?? 24];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.left ?? 0} ${icon.top ?? 0} ${w} ${h}" width="${w}" height="${h}">${icon.body}</svg>`;
  };
  for (const name of [...Object.keys(set.icons), ...Object.keys(set.aliases ?? {})]) names.set(name, () => body(name));
  const label = spec.label ?? info.name ?? spec.iconify;
  const lic = info.license ?? {};
  const licFile = ['LICENSE', 'license.txt', 'LICENSE.txt'].map((f) => join(root, f)).find(existsSync);
  const text = licFile ? readFileSync(licFile, 'utf8').trim() : [lic.title ?? spec.license, lic.url].filter(Boolean).join(' - ');
  return { label, names, notice: `--- ${label} icons (rendered to PNG from ${spec.iconify}${info.author?.name ? `, by ${info.author.name}` : ''}) ---\n\n${text || 'Check the icon library\'s licence before publishing.'}\n` };
}

/** Looks a role up by explicit name, then by the role itself and its synonyms (with the optional prefix/suffix). */
function find(source: Source, role: string, spec: { names?: Record<string, string>; prefix?: string; suffix?: string }): (() => string) | undefined {
  const explicit = spec.names?.[role];
  const candidates = explicit ? [explicit] : [role, ...(ALIASES[role] ?? [])];
  for (const c of candidates) {
    const base = `${spec.prefix ?? ''}${c}`;
    // Some libraries number their variants (Hugeicons: home-01), so the first numbered one counts too.
    for (const name of [`${base}${spec.suffix ?? ''}`, ...(spec.suffix ? [] : [base, `${base}-01`, `${base}-1`, `${base}1`])]) {
      const hit = source.names.get(name);
      if (hit) return hit;
    }
  }
  return undefined;
}

export function renderPack(p: Project, spec: Exclude<IconPackSpec, string>): RenderedPack {
  const source = 'iconify' in spec ? fromIconify(p, spec) : fromSvgDir(p, spec);
  const size = spec.size ?? 96;
  const images = new Map<string, Buffer>();
  const missing: string[] = [];
  for (const role of ICON_ROLES) {
    const svg = find(source, role, spec)?.();
    if (!svg) {
      missing.push(role);
      continue;
    }
    // Icons are recoloured by Spotube: draw them black (currentColor) on transparent.
    const black = svg.replaceAll('currentColor', '#000000');
    images.set(role, Buffer.from(new Resvg(black, { fitTo: { mode: 'width', value: size } }).render().asPng()));
  }
  return { images, missing, notice: source.notice, tint: spec.tint ?? true };
}
