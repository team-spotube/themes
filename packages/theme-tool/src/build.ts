// `spotube-theme build [id ...]`: turns every theme module in src/ into themes/<id>/ (theme.json, logo.png, the exact
// fonts and icons it uses, and a LICENSE carrying their licences). See `ThemeModule` in lib.ts for what a module holds.
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createJiti } from 'jiti';
import { ASSETS, moduleFile, moduleIds, readJson, schemaVersion, type Project } from './common.js';
import { resolveFamily } from './fonts.js';
import { renderPack } from './icons.js';
import type { ThemeModule } from './lib.js';
import { writeLogo } from './logo.js';

/** Schema versions: the lowest version that contains every feature the theme uses (see docs: schema versioning). */
const BASE_SCHEMA = '1.0.0';
const ICON_IMAGES_SCHEMA = '1.1.0';

export async function build(p: Project, only: string[] = []): Promise<string[]> {
  const ids = moduleIds(p).filter((id) => !only.length || only.includes(id));
  if (!ids.length) throw new Error(only.length ? `no theme module in src/ matches: ${only.join(', ')}` : 'no theme modules found in src/');
  const latest = schemaVersion();
  const jiti = createJiti(join(p.root, 'package.json'), { moduleCache: false, fsCache: false });
  const built: string[] = [];

  for (const id of ids) {
    const t = (await jiti.import(moduleFile(p, id), { default: true })) as ThemeModule | undefined;
    if (!t || typeof t !== 'object') throw new Error(`src/${id} must default-export a theme (use defineTheme)`);
    const { fonts = {}, logo, licenseNote = '', iconPack, author, repository, bugs, ...body } = t;
    if (!logo || typeof logo !== 'string') throw new Error(`src/${id}: "logo" is required: the path of your .png or .svg logo`);

    const folder = join(p.themes, id);
    rmSync(folder, { recursive: true, force: true });
    mkdirSync(join(folder, 'fonts'), { recursive: true });

    let schema = BASE_SCHEMA;
    const doc: Record<string, any> = {
      $schema: `https://docs.spotube.cc/schemas/theme/${latest.split('.')[0]}.json`,
      schema,
      id,
      version: '1.0.0',
      author: author ?? 'Unknown',
      ...(repository ? { repository } : {}),
      ...(bugs ? { bugs } : repository ? { bugs: `${repository.replace(/\/$/, '')}/issues` } : {}),
      logo: 'logo.png',
      ...body,
    };
    doc.id = id;

    const notices: string[] = [];
    const warnings: string[] = [];
    if (Object.keys(fonts).length || iconPack) doc.assets = { fonts: {} };

    for (const [family, spec] of Object.entries(fonts)) {
      const resolved = await resolveFamily(p, family, spec);
      doc.assets.fonts[family] = resolved.faces.map((f) => {
        writeFileSync(join(folder, 'fonts', f.outName), f.bytes);
        return { src: `fonts/${f.outName}`, weight: f.weight, ...(f.style ? { style: f.style } : {}) };
      });
      notices.push(`--- ${family} (fonts/) ---\n\n${resolved.license}\n`);
    }

    if (typeof iconPack === 'string') {
      const ttf = join(ASSETS, 'iconfonts', `${iconPack}.ttf`);
      if (!existsSync(ttf)) throw new Error(`src/${id}: unknown iconPack "${iconPack}" (run: spotube-theme list; or use { iconify } / { svgDir })`);
      const meta = readJson(join(ASSETS, 'iconfonts', `${iconPack}.json`));
      copyFileSync(ttf, join(folder, 'fonts', `${iconPack}.ttf`));
      doc.assets.fonts.Icons = [{ src: `fonts/${iconPack}.ttf`, weight: 400 }];
      doc.assets.iconPack = { font: 'Icons', icons: meta.glyphs };
      notices.push(`--- ${meta.label} icons (fonts/${iconPack}.ttf, a subset of the original artwork) ---\n\n${meta.licenseText}\n`);
    } else if (iconPack) {
      const rendered = renderPack(p, iconPack);
      mkdirSync(join(folder, 'icons'), { recursive: true });
      const images: Record<string, string> = {};
      for (const [role, png] of rendered.images) {
        writeFileSync(join(folder, 'icons', `${role}.png`), png);
        images[role] = `icons/${role}.png`;
      }
      doc.assets.iconPack = { images, ...(rendered.tint ? {} : { tint: false }) };
      schema = ICON_IMAGES_SCHEMA;
      notices.push(rendered.notice);
      if (rendered.missing.length) warnings.push(`iconPack: no icon for ${rendered.missing.length} role(s), they keep the stock icon: ${rendered.missing.join(', ')} (map them with "names")`);
    }
    doc.schema = schema;
    if (!Object.keys(doc.assets?.fonts ?? {}).length && doc.assets) delete doc.assets.fonts;
    if (!readdirSync(join(folder, 'fonts')).length) rmSync(join(folder, 'fonts'), { recursive: true, force: true });

    warnings.push(...writeLogo(p, logo, folder));
    writeFileSync(join(folder, 'theme.json'), `${JSON.stringify(doc, null, 2)}\n`);
    writeFileSync(
      join(folder, 'LICENSE'),
      `${body.name} theme for Spotube\n\n` +
        (doc.license ? `The theme definition (theme.json) and logo are licensed under ${doc.license}.\n` : '') +
        (licenseNote ? `\n${licenseNote}\n` : '') +
        (notices.length ? `\nBundled fonts and icons keep their own licences:\n\n${notices.join('\n')}` : ''),
    );
    built.push(id);
    console.log(`${id}: built (schema ${schema})`);
    for (const w of warnings) console.log(`  warning: ${w}`);
  }
  return built;
}
