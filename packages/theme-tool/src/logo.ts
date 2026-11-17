// The theme logo: your own artwork, as a PNG or an SVG (rendered to a 512 px PNG). Never generated.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import type { Project } from './common.js';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
export const PLACEHOLDER_MARKER = 'spotube-theme-placeholder';

/** Writes `<folder>/logo.png` from [path] (relative to the project). Returns warnings. */
export function writeLogo(p: Project, path: string, folder: string): string[] {
  const warnings: string[] = [];
  const file = resolve(p.root, path);
  let data: Buffer;
  try {
    data = readFileSync(file);
  } catch {
    throw new Error(`logo "${path}" not found (a .png or .svg, relative to the project)`);
  }
  if (data.includes(PLACEHOLDER_MARKER)) warnings.push(`logo "${path}" is still the placeholder: replace it with your own artwork`);

  let png: Buffer;
  if (path.toLowerCase().endsWith('.svg')) {
    // Text in an SVG would need fonts at render time: convert text to paths in your editor first.
    png = Buffer.from(new Resvg(data, { fitTo: { mode: 'width', value: 512 } }).render().asPng());
  } else if (data.subarray(0, 8).equals(PNG_SIGNATURE)) {
    png = data;
    const [w, h] = [data.readUInt32BE(16), data.readUInt32BE(20)];
    if (w > 512 || h > 512) throw new Error(`logo "${path}" is ${w}x${h}; Spotube accepts at most 512x512`);
  } else {
    throw new Error(`logo "${path}" must be a .png or .svg`);
  }
  if (png.length > 256 * 1024) throw new Error(`logo "${path}" is ${Math.round(png.length / 1024)} KB; the limit is 256 KB`);
  writeFileSync(join(folder, 'logo.png'), png);
  return warnings;
}
