// Packs theme folders into installable zips in dist/ and writes dist/index.json.
//
// Zips are reproducible (fixed timestamps, sorted entries), so the same sources always give the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { zipSync } from 'fflate';
import { isAllowedFile, listFiles, readJson, themeIds, type Project } from './common.js';

const MTIME = new Date(Date.UTC(2020, 0, 1)); // DOS timestamps cannot go before 1980

function pack(p: Project, id: string): { meta: any; size: number } {
  const folder = join(p.themes, id);
  const meta = readJson(join(folder, 'theme.json'));
  const missing = ['id', 'name', 'version', 'author'].filter((k) => !meta[k]);
  if (missing.length) throw new Error(`${id}: theme.json is missing ${missing.join(', ')}`);
  if (meta.id !== id) throw new Error(`${id}: id "${meta.id}" must match the folder name`);

  const files: Record<string, [Uint8Array, { mtime: Date; level: 9 }]> = {};
  for (const rel of listFiles(folder)) {
    if (!isAllowedFile(rel)) throw new Error(`${id}/${rel}: file type not allowed in a theme package`);
    files[rel] = [readFileSync(join(folder, rel)), { mtime: MTIME, level: 9 }];
  }
  const zip = zipSync(files);
  writeFileSync(join(p.dist, `${id}.zip`), zip);
  return { meta, size: zip.length };
}

/** Packs theme folders into dist/<id>.zip (reproducible) and writes dist/index.json. */
export function zip(p: Project, only: string[] = []): void {
  const ids = only.length ? only : themeIds(p);
  if (!ids.length) throw new Error('no themes found: run "spotube-theme build" first');
  mkdirSync(p.dist, { recursive: true });
  const index: unknown[] = [];
  for (const id of ids) {
    const { meta, size } = pack(p, id);
    const sizeKb = Math.round(size / 1024);
    index.push({
      id: meta.id, name: meta.name, version: meta.version, author: meta.author, description: meta.description,
      license: meta.license, repository: meta.repository, homepage: meta.homepage, file: `${id}.zip`, sizeKb,
    });
    console.log(`${id}.zip  ${sizeKb} KB`);
  }
  writeFileSync(join(p.dist, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
}
