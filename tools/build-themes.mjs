// Generates the palette-based themes in themes/ from tools/palettes.mjs and tools/template.json.
//
// The template is Spotube's flat "Modern" theme (solid surfaces, hairline borders, no gloss). Each palette supplies
// light and dark colours and a list of accent choices, exposed to users as the "Accent color" parameter. The text on
// every accent is picked by contrast, so a pastel accent never gets white text.
//
// Neon Noir and Candy Pop are hand-written and not produced here.
//
// usage: pnpm build [palette-id ...]

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeLogo } from './make-logo.mjs';
import { PALETTES } from './palettes.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(dirname(HERE), 'themes');
const REPO = 'https://github.com/team-spotube/themes';

// ---- colour maths ----------------------------------------------------------------------------------
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function luminance(hex) {
  const [r, g, b] = rgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Readable text for a filled [color]: white on saturated mid-tones (3:1 or better), else the palette's dark ink.
 * Pastel accents (where white would be unreadable) get the ink; anything white can carry stays white, which is what
 * people expect on a primary button.
 */
const on = (color, darkInk) => (contrast('#ffffff', color) >= 3 ? '#ffffff' : darkInk);

const appearance = (light, dark) => ({ light, dark });
const colorVar = (value) => ({ type: 'color', value });

const MIT = (holder) => `MIT License

Copyright (c) ${holder}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
`;

const title = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function build(id, p) {
  const doc = JSON.parse(readFileSync(join(HERE, 'template.json'), 'utf8'));
  const { light: L, dark: D } = p;
  const ink = D.bg; // dark text used on light accents, in both modes

  Object.assign(doc, {
    id,
    name: p.name,
    version: '1.0.0',
    author: 'Spotube Team',
    description: p.blurb,
    repository: REPO,
    bugs: `${REPO}/issues`,
    homepage: p.upstream,
    license: `AGPL-3.0 (theme), MIT (${p.name} palette)`,
    logo: 'logo.png',
  });

  // User parameters: accent choices (swatch = dark-mode colour) and the theme's signature corner radius.
  const names = Object.keys(D.accents);
  doc.parameters.accent = {
    type: 'enum',
    label: 'Accent color',
    default: p.default,
    options: names.map((n) => ({ value: n, label: title(n), color: D.accents[n] })),
  };
  doc.parameters.radius.default = p.radius;

  const byAccent = (fn) => Object.fromEntries(names.map((n) => [n, fn(n)]));
  const v = doc.vars;
  v.bg = colorVar(appearance(L.bg, D.bg));
  v.card = colorVar(appearance(L.surface, D.surface));
  v.fg = colorVar(appearance(L.text, D.text));
  v.muted = colorVar(appearance(L.muted, D.muted));
  v.mutedFg = colorVar(appearance(L.subtext, D.subtext));
  v.border = colorVar(appearance(L.border, D.border));
  v.ring = colorVar(['match', '{params.accent}', byAccent((n) => appearance(L.accents[n], D.accents[n]))]);
  v.primary = colorVar(['match', '{params.accent}', byAccent((n) => appearance(L.accents[n], D.accents[n]))]);
  v.primaryFg = colorVar(['match', '{params.accent}', byAccent((n) => appearance(on(L.accents[n], ink), on(D.accents[n], ink)))]);
  v.destructive = colorVar(appearance(L.danger, D.danger));
  v.destructiveFg = colorVar(appearance(on(L.danger, ink), on(D.danger, ink)));
  v.wash = colorVar(appearance('#0000000d', '#ffffff14'));
  v.shadow = colorVar(appearance('#0000001a', '#00000080'));

  const t = doc.tokens.color;
  t.surface = '{vars.card}';
  t.raised = appearance(L.raised, D.raised);
  t.success = appearance(L.success, D.success);
  t.danger = appearance(L.danger, D.danger);
  t.scrim = appearance('#00000066', '#00000099');

  // Panels read the card colour, the page and bars read the background (cards then sit one step off the page).
  for (const name of ['card', 'dialog', 'dropdownMenu', 'snackbar', 'sidebar']) {
    doc.components[name] = JSON.parse(JSON.stringify(doc.components[name]).replaceAll('{vars.bg}', '{vars.card}'));
  }

  const folder = join(OUT, id);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'theme.json'), `${JSON.stringify(doc, null, 2)}\n`);
  writeFileSync(
    join(folder, 'LICENSE'),
    `${p.name} theme for Spotube\n\n` +
      'The theme definition (theme.json) is licensed under the GNU Affero General Public License v3.0 or later, ' +
      'like the rest of this repository (see ../../LICENSE).\n\n' +
      `The ${p.name} colour palette comes from ${p.upstream} and is used under the MIT License:\n\n` +
      MIT(p.holder),
  );
  makeLogo(join(folder, 'logo.png'), D.accents[p.default], D.bg);
  console.log(`${id}: ${names.length} accents, default ${p.default}`);
}

const only = process.argv.slice(2);
for (const [id, palette] of Object.entries(PALETTES)) {
  if (only.length === 0 || only.includes(id)) build(id, palette);
}
