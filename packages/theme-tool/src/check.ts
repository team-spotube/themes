// Structural checks for every theme folder, using the same limits Spotube enforces when installing a package.
// (The full check, that every parameter choice compiles warning-free in both appearances, runs in Spotube's own
// tests: see README.) Exit code 1 when anything is wrong.
//
// usage: pnpm check

import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020Module from 'ajv/dist/2020.js';

const Ajv2020 = (Ajv2020Module as any).default ?? Ajv2020Module;
import { SCHEMA_FILE, extOf, isAllowedFile, listFiles, readJson, themeIds, type Project } from './common.js';

const LIMITS = { entries: 128, total: 16 * 1024 * 1024, json: 512 * 1024, font: 8 * 1024 * 1024, png: 256 * 1024, image: 512 };
const ID = /^[A-Za-z0-9._-]{1,48}$/;
const VERSION = /^[0-9A-Za-z.+_-]{1,32}$/;
const PARAM = /^[A-Za-z][A-Za-z0-9_]{0,31}$/;
const HTTPS = /^https?:\/\/[^\s/]+/i;

const schema = readJson(SCHEMA_FILE);
const SCHEMA_VERSION = schema['x-schemaVersion'];
const [SCHEMA_MAJOR, SCHEMA_MINOR] = SCHEMA_VERSION.split('.').map(Number);
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

let errors = 0;
let warnings = 0;

function checkTheme(p: Project, id: string): { problems: string[]; warns: string[] } {
  const problems: string[] = [];
  const warns: string[] = [];
  const folder = join(p.themes, id);
  const text = readFileSync(join(folder, 'theme.json'), 'utf8');
  let meta: any;
  try {
    meta = JSON.parse(text);
  } catch (e) {
    problems.push(`theme.json is not valid JSON: ${(e as Error).message}`);
    return { problems, warns };
  }

  // schema: the theme must declare a semver `schema` this repository's schema can validate (same major, minor not newer),
  // and match the JSON Schema exactly.
  const declared = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(meta.schema ?? ''));
  if (!declared) problems.push(`"schema" must be a semantic version such as "${SCHEMA_VERSION}"`);
  else if (Number(declared[1]) !== SCHEMA_MAJOR) problems.push(`schema ${meta.schema} is a different major than ${SCHEMA_VERSION}`);
  else if (Number(declared[2]) > SCHEMA_MINOR) problems.push(`schema ${meta.schema} is newer than the ${SCHEMA_VERSION} this repository validates against (update @team-spotube/theme-tool)`);
  if (!validate(meta)) {
    for (const e of validate.errors.slice(0, 12) as any[]) problems.push(`schema: ${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` "${e.params.additionalProperty}"` : ''}`);
    if (validate.errors.length > 12) problems.push(`schema: ...and ${validate.errors.length - 12} more`);
  }

  // metadata
  for (const k of ['id', 'name', 'version', 'author']) if (!meta[k]) problems.push(`missing "${k}"`);
  if (meta.id !== id) problems.push(`id "${meta.id}" must equal the folder name`);
  if (meta.id && !ID.test(meta.id)) problems.push('id may only use letters, digits, . _ - (max 48)');
  if (meta.version && !VERSION.test(meta.version)) problems.push(`unsupported version "${meta.version}"`);
  for (const k of ['repository', 'bugs', 'homepage']) if (meta[k] && !HTTPS.test(meta[k])) problems.push(`"${k}" must be an http(s) URL`);
  for (const k of ['repository', 'license', 'logo', 'description']) if (!meta[k]) warns.push(`no "${k}"`);

  // files
  const files = listFiles(folder);
  if (files.length > LIMITS.entries) problems.push(`more than ${LIMITS.entries} files`);
  let total = 0;
  for (const rel of files) {
    const size = statSync(join(folder, rel)).size;
    total += size;
    if (!isAllowedFile(rel)) problems.push(`${rel}: file type not allowed in a theme package`);
    const ext = extOf(rel);
    if (ext === '.json' && size > LIMITS.json) problems.push(`${rel}: over ${LIMITS.json / 1024} KB`);
    if ((ext === '.ttf' || ext === '.otf') && size > LIMITS.font) problems.push(`${rel}: font over 8 MB`);
    if (ext === '.png' && size > LIMITS.png) problems.push(`${rel}: PNG over ${LIMITS.png / 1024} KB`);
  }
  if (total > LIMITS.total) problems.push('package larger than 16 MB');
  if (!files.some((f) => f === 'LICENSE')) warns.push('no LICENSE file');

  // logo and fonts must exist and be what they claim
  if (meta.logo) {
    if (!files.includes(meta.logo)) problems.push(`logo "${meta.logo}" not found`);
    else {
      const b = readFileSync(join(folder, meta.logo));
      const isPng = b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      if (!isPng) problems.push('logo is not a PNG');
      else if (b.readUInt32BE(16) > LIMITS.image || b.readUInt32BE(20) > LIMITS.image) problems.push(`logo larger than ${LIMITS.image}px`);
    }
  }
  for (const [family, faces] of Object.entries<any>(meta.assets?.fonts ?? {})) {
    for (const f of faces as any[]) if (!files.includes(f.src)) problems.push(`font "${family}": "${f.src}" not found`);
  }

  // parameters
  for (const [name, p] of Object.entries<any>(meta.parameters ?? {})) {
    if (!PARAM.test(name)) problems.push(`parameter "${name}": invalid name`);
    if (p.default === undefined) problems.push(`parameter "${name}": needs a default`);
    if (p.value !== undefined) problems.push(`parameter "${name}": cannot be derived (use a var)`);
    if (p.type === 'enum') {
      const values = (p.options ?? []).map((o: any) => (typeof o === 'string' ? o : o.value));
      if (!values.includes(p.default)) problems.push(`parameter "${name}": default "${p.default}" is not one of its options`);
    }
    if (p.type === 'number') {
      if (p.min !== undefined && p.default < p.min) problems.push(`parameter "${name}": default below min`);
      if (p.max !== undefined && p.default > p.max) problems.push(`parameter "${name}": default above max`);
    }
  }

  // both appearances
  if (!text.includes('"light"') || !text.includes('"dark"')) warns.push('does not define light and dark values');
  return { problems, warns };
}

/** Checks every generated theme folder; returns the number of errors (warnings do not fail). */
export function check(p: Project): number {
  const ids = themeIds(p);
  if (!ids.length) {
    console.log('no themes found: run "spotube-theme build" first');
    return 1;
  }
  errors = 0;
  warnings = 0;
  for (const id of ids) {
    const { problems, warns } = checkTheme(p, id);
    errors += problems.length;
    warnings += warns.length;
    const status = problems.length ? 'FAIL' : warns.length ? 'ok (warnings)' : 'ok';
    console.log(`${id.padEnd(16)} ${status}`);
    for (const e of problems) console.log(`    error: ${e}`);
    for (const w of warns) console.log(`    warning: ${w}`);
  }
  console.log(`\n${errors} error(s), ${warnings} warning(s)`);
  return errors;
}
