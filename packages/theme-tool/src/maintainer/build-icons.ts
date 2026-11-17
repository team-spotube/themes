// Maintainer-only (`pnpm --filter @team-spotube/theme-tool icons`): builds one small icon font per pack (only the icons
// Spotube uses) into assets/iconfonts/, so theme authors never need the icon libraries themselves.
//
// For every role in assets/icon-roles.json it finds the pack's icon, assigns the codepoint U+E000 + index and writes
//   assets/iconfonts/<pack>.ttf    a font with just those glyphs
//   assets/iconfonts/<pack>.json   { label, license, licenseText, glyphs: { role: "U+E0xx" }, missing: [roles] }
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateFonts } from 'fantasticon';
import { Font } from 'fonteditor-core';
import { ASSETS, PKG } from '../common.js';
import { PACKS, licenseText, resolve } from './packs.js';

const OUT = join(ASSETS, 'iconfonts');
const ROLES: string[] = JSON.parse(readFileSync(join(ASSETS, 'icon-roles.json'), 'utf8'));
const hex = (n: number): string => `U+${n.toString(16).toUpperCase()}`;

mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);

for (const [id, pack] of Object.entries(PACKS)) {
  if (only.length && !only.includes(id)) continue;
  const glyphs: Record<string, string> = {};
  const missing: string[] = [];

  if (pack.kind === 'lucide') {
    // Lucide ships a font: keep only the glyphs we need (their own codepoints), using its info.json.
    const root = join(PKG, 'node_modules', 'lucide-static', 'font');
    const info = JSON.parse(readFileSync(join(root, 'info.json'), 'utf8'));
    const keep: number[] = [];
    for (const role of ROLES) {
      const e = info[role];
      if (!e) { missing.push(role); continue; }
      const cp = parseInt(String(e.encodedCode).replace('\\', ''), 16);
      keep.push(cp);
      glyphs[role] = hex(cp);
    }
    const font = Font.create(readFileSync(join(root, 'lucide.ttf')), { type: 'ttf', subset: keep, hinting: false });
    writeFileSync(join(OUT, `${id}.ttf`), Buffer.from(font.write({ type: 'ttf' }) as ArrayBuffer));
  } else {
    const names = pack.names!();
    const work = join(tmpdir(), `icons-${id}-${process.pid}`);
    rmSync(work, { recursive: true, force: true });
    mkdirSync(join(work, 'in'), { recursive: true });
    mkdirSync(join(work, 'out'), { recursive: true });
    const codepoints: Record<string, number> = {};
    ROLES.forEach((role, i) => {
      const hit = resolve(role, names);
      if (!hit) { missing.push(role); return; }
      cpSync(hit.file, join(work, 'in', `${role}.svg`));
      codepoints[role] = 0xe000 + i;
      glyphs[role] = hex(0xe000 + i);
    });
    await generateFonts({
      inputDir: join(work, 'in'), outputDir: join(work, 'out'), name: id, fontTypes: ['ttf' as any], assetTypes: [],
      codepoints, normalize: true, fontHeight: 1000, descent: 120, round: 10e12,
    } as any);
    cpSync(join(work, 'out', `${id}.ttf`), join(OUT, `${id}.ttf`));
    rmSync(work, { recursive: true, force: true });
  }
  writeFileSync(join(OUT, `${id}.json`), `${JSON.stringify({ label: pack.label, license: pack.license, licenseText: licenseText(pack), glyphs, missing }, null, 1)}\n`);
  console.log(`${id}: ${Object.keys(glyphs).length}/${ROLES.length}${missing.length ? `  missing: ${missing.join(' ')}` : ''}`);
}
