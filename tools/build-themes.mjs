// Builds every theme in themes/ from the modules in tools/themes/*.mjs.
//
// A module default-exports a plain object: the theme.json content (without the boilerplate) plus
//   fonts: { "<Family>": { dir: "<folder in tools/fonts>", files: [["File.ttf", 400], ...] } }   (optional)
//   logo:  [topColor, bottomColor]                                                                  (#RRGGBB)
// The builder adds the metadata every theme shares, copies exactly the fonts a theme uses (with their licences),
// writes the LICENSE and draws logo.png.
//
// usage: pnpm build [theme-id ...]

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { makeLogo } from './make-logo.mjs';
import { PACKS } from './icons/packs.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(dirname(HERE), 'themes');
const REPO = 'https://github.com/team-spotube/themes';

const only = process.argv.slice(2);
const modules = readdirSync(join(HERE, 'themes')).filter((f) => f.endsWith('.mjs')).sort();

for (const file of modules) {
  const id = file.replace(/\.mjs$/, '');
  if (only.length && !only.includes(id)) continue;
  const { default: t } = await import(pathToFileURL(join(HERE, 'themes', file)).href);
  const { fonts = {}, logo, licenseNote = '', iconPack, ...body } = t;

  const folder = join(OUT, id);
  rmSync(folder, { recursive: true, force: true });
  mkdirSync(join(folder, 'fonts'), { recursive: true });

  const doc = {
    schema: 1,
    id,
    name: body.name,
    version: body.version ?? '1.0.0',
    author: 'Spotube Team',
    description: body.description,
    repository: REPO,
    bugs: `${REPO}/issues`,
    license: 'AGPL-3.0-or-later',
    logo: 'logo.png',
    ...body,
  };
  doc.id = id;

  const notices = [];
  if (Object.keys(fonts).length || iconPack) {
    doc.assets = { fonts: {} };
    for (const [family, spec] of Object.entries(fonts)) {
      doc.assets.fonts[family] = spec.files.map(([name, weight, style]) => {
        copyFileSync(join(HERE, 'fonts', spec.dir, name), join(folder, 'fonts', name));
        return { src: `fonts/${name}`, weight, ...(style ? { style } : {}) };
      });
      const lic = readdirSync(join(HERE, 'fonts', spec.dir)).find((f) => /^(OFL|LICENSE)/i.test(f));
      notices.push(`--- ${family} (fonts/) ---\n\n${readFileSync(join(HERE, 'fonts', spec.dir, lic), 'utf8').trim()}\n`);
    }
  }
  if (iconPack) {
    const pack = PACKS[iconPack];
    const meta = JSON.parse(readFileSync(join(HERE, 'iconfonts', `${iconPack}.json`), 'utf8'));
    copyFileSync(join(HERE, 'iconfonts', `${iconPack}.ttf`), join(folder, 'fonts', `${iconPack}.ttf`));
    doc.assets.fonts.Icons = [{ src: `fonts/${iconPack}.ttf`, weight: 400 }];
    doc.assets.iconPack = { font: 'Icons', icons: meta.glyphs };
    const pkgRoot = join(HERE, '..', 'node_modules', pack.pkg);
    const licFile = pack.licenseFile === undefined ? 'LICENSE' : pack.licenseFile;
    const text = licFile && existsSync(join(pkgRoot, licFile)) ? readFileSync(join(pkgRoot, licFile), 'utf8').trim() : `${pack.label} is licensed under ${pack.license}.`;
    notices.push(`--- ${pack.label} icons (fonts/${iconPack}.ttf, a subset of the original artwork) ---\n\n${text}\n`);
  }
  if (!existsSync(join(folder, 'fonts', 'x')) && !readdirSync(join(folder, 'fonts')).length) rmSync(join(folder, 'fonts'), { recursive: true, force: true });

  writeFileSync(join(folder, 'theme.json'), `${JSON.stringify(doc, null, 2)}\n`);
  writeFileSync(
    join(folder, 'LICENSE'),
    `${body.name} theme for Spotube\n\n` +
      'The theme definition (theme.json) and logo are licensed under the GNU Affero General Public License v3.0 or ' +
      'later, like the rest of this repository (see ../../LICENSE).\n' +
      (licenseNote ? `\n${licenseNote}\n` : '') +
      (notices.length ? `\nThe bundled fonts keep their own licences:\n\n${notices.join('\n')}` : ''),
  );
  makeLogo(join(folder, 'logo.png'), logo[0], logo[1]);
  console.log(`${id}: built`);
}
