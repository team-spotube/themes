// `spotube-theme build [id ...]`: turns every theme module in src/ into themes/<id>/ (theme.json, logo.png, the exact
// fonts and icon font it uses, and a LICENSE carrying every font's licence).
//
// A module default-exports a `ThemeModule` (see lib.ts): the theme.json content (without the boilerplate) plus
//   fonts:     { "<Family>": { dir: "<folder>", files: [["File.ttf", 400], ["Italic.ttf", 400, "italic"]] } }
//              `dir` is a folder in your project's fonts/ or one bundled with the tool (see `spotube-theme list`)
//   iconPack:  "<pack id>"                     one of the bundled icon packs
//   logo:      [topColor, bottomColor]          #RRGGBB, drawn into logo.png
//   licenseNote: "..."                          extra text for the LICENSE (optional)
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createJiti } from 'jiti';
import { ASSETS, moduleFile, moduleIds, readJson, schemaVersion, type Project } from './common.js';
import type { ThemeModule } from './lib.js';
import { makeLogo } from './make-logo.js';

/** Finds a font folder: the project's own fonts/ first, then the fonts bundled with the tool. */
function fontDir(p: Project, dir: string): string {
  for (const base of [p.fonts, join(ASSETS, 'fonts')]) if (existsSync(join(base, dir))) return join(base, dir);
  throw new Error(`font folder "${dir}" not found in ./fonts or among the bundled fonts (run: spotube-theme list)`);
}

export async function build(p: Project, only: string[] = []): Promise<string[]> {
  const ids = moduleIds(p).filter((id) => !only.length || only.includes(id));
  if (!ids.length) throw new Error(only.length ? `no theme module in src/ matches: ${only.join(', ')}` : 'no theme modules found in src/');
  const SCHEMA = schemaVersion();
  // fresh=false: a long-running process rebuilding would otherwise keep stale modules; each CLI run is new anyway.
  const jiti = createJiti(join(p.root, 'package.json'), { moduleCache: false, fsCache: false });
  const built: string[] = [];

  for (const id of ids) {
    const t = (await jiti.import(moduleFile(p, id), { default: true })) as ThemeModule | undefined;
    if (!t || typeof t !== 'object') throw new Error(`src/${id} must default-export a theme (use defineTheme)`);
    const { fonts = {}, logo, licenseNote = '', iconPack, author, repository, bugs, ...body } = t;
    if (!logo) throw new Error(`src/${id}: "logo" ([top, bottom] colours) is required`);

    const folder = join(p.themes, id);
    rmSync(folder, { recursive: true, force: true });
    mkdirSync(join(folder, 'fonts'), { recursive: true });

    const doc: Record<string, any> = {
      $schema: `https://docs.spotube.cc/schemas/theme/${SCHEMA.split('.')[0]}.json`,
      schema: SCHEMA,
      id,
      version: '1.0.0',
      author: author ?? 'Unknown',
      ...(repository ? { repository } : {}),
      ...(bugs ? { bugs } : repository ? { bugs: `${repository.replace(/\/$/, '')}/issues` } : {}),
      logo: 'logo.png',
      ...body,
    };
    doc.id = id;
    doc.schema = SCHEMA;

    const notices: string[] = [];
    if (Object.keys(fonts).length || iconPack) doc.assets = { fonts: {} };

    for (const [family, spec] of Object.entries(fonts)) {
      const dir = fontDir(p, spec.dir);
      doc.assets.fonts[family] = spec.files.map(([name, weight, style]) => {
        copyFileSync(join(dir, name), join(folder, 'fonts', name));
        return { src: `fonts/${name}`, weight, ...(style ? { style } : {}) };
      });
      const lic = readdirSync(dir).find((f) => /^(OFL|LICEN[CS]E|COPYING)/i.test(f));
      notices.push(
        lic
          ? `--- ${family} (fonts/) ---\n\n${readFileSync(join(dir, lic), 'utf8').trim()}\n`
          : `--- ${family} (fonts/) ---\n\n(no licence file found next to the font; add one to fonts/${spec.dir}/)\n`,
      );
    }

    if (iconPack) {
      const ttf = join(ASSETS, 'iconfonts', `${iconPack}.ttf`);
      if (!existsSync(ttf)) throw new Error(`src/${id}: unknown iconPack "${iconPack}" (run: spotube-theme list)`);
      const meta = readJson(join(ASSETS, 'iconfonts', `${iconPack}.json`));
      copyFileSync(ttf, join(folder, 'fonts', `${iconPack}.ttf`));
      doc.assets.fonts.Icons = [{ src: `fonts/${iconPack}.ttf`, weight: 400 }];
      doc.assets.iconPack = { font: 'Icons', icons: meta.glyphs };
      notices.push(`--- ${meta.label} icons (fonts/${iconPack}.ttf, a subset of the original artwork) ---\n\n${meta.licenseText}\n`);
    }
    if (!readdirSync(join(folder, 'fonts')).length) rmSync(join(folder, 'fonts'), { recursive: true, force: true });

    writeFileSync(join(folder, 'theme.json'), `${JSON.stringify(doc, null, 2)}\n`);
    writeFileSync(
      join(folder, 'LICENSE'),
      `${body.name} theme for Spotube\n\n` +
        (doc.license ? `The theme definition (theme.json) and logo are licensed under ${doc.license}.\n` : '') +
        (licenseNote ? `\n${licenseNote}\n` : '') +
        (notices.length ? `\nThe bundled fonts keep their own licences:\n\n${notices.join('\n')}` : ''),
    );
    makeLogo(join(folder, 'logo.png'), logo[0], logo[1]);
    built.push(id);
    console.log(`${id}: built`);
  }
  return built;
}
