// Builds one small icon font per pack (only the icons the app uses) into tools/iconfonts/.
//
// For every role in icon-roles.json it finds the pack's icon, assigns the codepoint U+E000 + index, and writes
//   tools/iconfonts/<pack>.ttf       a font with just those glyphs
//   tools/iconfonts/<pack>.json      { family, license, glyphs: { role: "U+E0xx" }, missing: [roles] }
//
// usage: pnpm icons [pack ...]

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { generateFonts } from 'fantasticon';
import { Font } from 'fonteditor-core';
import { PACKS, pkgDir, resolve } from './icons/packs.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'iconfonts');
const ROLES = JSON.parse(readFileSync(join(HERE, 'icon-roles.json'), 'utf8'));
const hex = (n) => `U+${n.toString(16).toUpperCase()}`;

mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);

for (const [id, pack] of Object.entries(PACKS)) {
  if (only.length && !only.includes(id)) continue;
  const glyphs = {};
  const missing = [];

  if (pack.kind === 'lucide') {
    // Lucide ships a font: keep only the glyphs we need (their own codepoints), re-using its info.json.
    const root = join(pkgDir('lucide-static'), 'font');
    const info = JSON.parse(readFileSync(join(root, 'info.json'), 'utf8'));
    const keep = [];
    for (const role of ROLES) {
      const e = info[role];
      if (!e) { missing.push(role); continue; }
      const cp = parseInt(e.encodedCode.replace('\\', ''), 16);
      keep.push(cp);
      glyphs[role] = hex(cp);
    }
    const font = Font.create(readFileSync(join(root, 'lucide.ttf')), { type: 'ttf', subset: keep, hinting: false });
    writeFileSync(join(OUT, `${id}.ttf`), Buffer.from(font.write({ type: 'ttf' })));
  } else {
    const names = pack.names();
    const work = join(tmpdir(), `icons-${id}-${process.pid}`);
    rmSync(work, { recursive: true, force: true });
    mkdirSync(join(work, 'in'), { recursive: true });
    mkdirSync(join(work, 'out'), { recursive: true });
    const codepoints = {};
    ROLES.forEach((role, i) => {
      const hit = resolve(role, names);
      if (!hit) { missing.push(role); return; }
      cpSync(hit.file, join(work, 'in', `${role}.svg`));
      codepoints[role] = 0xe000 + i;
      glyphs[role] = hex(0xe000 + i);
    });
    await generateFonts({
      inputDir: join(work, 'in'), outputDir: join(work, 'out'), name: id, fontTypes: ['ttf'], assetTypes: [],
      codepoints, normalize: true, fontHeight: 1000, descent: 120, round: 10e12,
    });
    cpSync(join(work, 'out', `${id}.ttf`), join(OUT, `${id}.ttf`));
    rmSync(work, { recursive: true, force: true });
  }
  writeFileSync(join(OUT, `${id}.json`), `${JSON.stringify({ label: pack.label, license: pack.license, glyphs, missing }, null, 1)}\n`);
  console.log(`${id}: ${Object.keys(glyphs).length}/${ROLES.length}${missing.length ? `  missing: ${missing.join(' ')}` : ''}`);
}
