// Fonts from anywhere: your own files, the fonts bundled with the tool, or any npm font package (Fontsource,
// @expo-google-fonts/*, ...). Spotube loads .ttf/.otf, so .woff and .woff2 files are converted.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { Font, woff2 } from 'fonteditor-core';
import { ASSETS, type Project } from './common.js';
import type { FontSpec } from './lib.js';

export interface ResolvedFont { outName: string; bytes: Buffer; weight: number; style?: 'normal' | 'italic' }
export interface ResolvedFamily { faces: ResolvedFont[]; license: string }

/** The folder a font spec's files are relative to. */
function baseDir(p: Project, spec: FontSpec): string {
  if ('from' in spec) {
    const from = spec.from;
    const dir = from.startsWith('.') || from.startsWith('/') ? resolve(p.root, from) : join(p.root, 'node_modules', from);
    if (!existsSync(dir)) throw new Error(`font source "${from}" not found${from.startsWith('.') ? '' : ` (pnpm add -D ${from})`}`);
    return dir;
  }
  for (const base of [p.fonts, join(ASSETS, 'fonts')]) if (existsSync(join(base, spec.dir))) return join(base, spec.dir);
  throw new Error(`font folder "${spec.dir}" not found in ./fonts or among the bundled fonts (run: spotube-theme list)`);
}

/** Finds a licence file next to a font or up to three folders above it (inside the package). */
function findLicense(file: string, stop: string): string | undefined {
  let dir = dirname(file);
  for (let i = 0; i < 4; i++) {
    const hit = existsSync(dir) && readdirSync(dir).find((f) => /^(OFL|LICEN[CS]E|COPYING)/i.test(f));
    if (hit) return readFileSync(join(dir, hit), 'utf8').trim();
    if (dir === stop || dirname(dir) === dir) break;
    dir = dirname(dir);
  }
  return undefined;
}

let woff2Ready: Promise<unknown> | undefined;

async function toTtf(bytes: Buffer, ext: string): Promise<Buffer> {
  if (ext === '.ttf' || ext === '.otf') return bytes;
  if (ext === '.woff2') await (woff2Ready ??= woff2.init());
  const type = ext === '.woff2' ? 'woff2' : ext === '.woff' ? 'woff' : null;
  if (!type) throw new Error(`unsupported font format "${ext}" (use .ttf, .otf, .woff or .woff2)`);
  return Buffer.from(Font.create(bytes, { type }).write({ type: 'ttf' }) as ArrayBuffer);
}

export async function resolveFamily(p: Project, family: string, spec: FontSpec): Promise<ResolvedFamily> {
  const dir = baseDir(p, spec);
  const faces: ResolvedFont[] = [];
  let license: string | undefined;
  for (const [file, weight, style] of spec.files) {
    const path = join(dir, file);
    if (!existsSync(path)) throw new Error(`font "${family}": ${file} not found in ${dir}`);
    const ext = extname(file).toLowerCase();
    const bytes = await toTtf(readFileSync(path), ext);
    const stem = basename(file, extname(file));
    faces.push({ outName: `${stem}${ext === '.otf' ? '.otf' : '.ttf'}`, bytes, weight, ...(style ? { style } : {}) });
    license ??= findLicense(path, dir);
  }
  return { faces, license: license ?? '(no licence file found next to the font: add one, or check the font\'s licence before publishing)' };
}
