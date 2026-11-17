// The `spotube-theme` command line.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { build } from './build.js';
import { check } from './check.js';
import { PKG, bundledFonts, iconPacks, moduleIds, project, schemaVersion } from './common.js';
import { addTheme, initProject, slug, templateIds } from './scaffold.js';
import { zip } from './zip.js';

const HELP = `spotube-theme: build, check and package Spotube themes

Usage: spotube-theme <command> [options]

Commands:
  build [id...]    generate themes/<id>/ from the modules in src/
  check            validate every themes/<id>/ (JSON Schema, metadata, limits)
  zip [id...]      pack themes/<id>/ into dist/<id>.zip (+ dist/index.json)
  dist [id...]     build + check + zip
  add <id>         add a theme module to src/   [--template <name>] [--name <display name>] [--author <you>] [--license <spdx>] [--repository <url>]
  init [dir]       bootstrap a theme project    [same options]    (also: pnpm create spotube-theme)
  list             bundled fonts, icon packs and templates

Options:
  --cwd <dir>      run in another project directory
  -v, --version    print the tool version (and the theme schema it writes)
  -h, --help       this text
`;

interface Parsed { positional: string[]; flags: Record<string, string | true> }

export function parseArgs(args: string[]): Parsed {
  const positional: string[] = [];
  const flags: Record<string, string | true> = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '-h') flags.help = true;
    else if (a === '-v') flags.version = true;
    else if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=', 2);
      if (v !== undefined) flags[k] = v;
      else if (args[i + 1] && !args[i + 1].startsWith('-') && !['help', 'version'].includes(k)) flags[k] = args[++i];
      else flags[k] = true;
    } else positional.push(a);
  }
  return { positional, flags };
}

const str = (v: string | true | undefined, fallback: string): string => (typeof v === 'string' ? v : fallback);

export async function main(argv: string[]): Promise<void> {
  const { positional, flags } = parseArgs(argv);
  const [command, ...rest] = positional;
  if (flags.version) {
    const v = JSON.parse(readFileSync(join(PKG, 'package.json'), 'utf8')).version;
    console.log(`@team-spotube/theme-tool ${v} (theme schema ${schemaVersion()})`);
    return;
  }
  if (flags.help || !command || command === 'help') {
    console.log(HELP);
    return;
  }
  const p = project(str(flags.cwd, process.cwd()));
  const themeOptions = (id: string) => ({
    id,
    name: str(flags.name, id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
    author: str(flags.author, 'Unknown'),
    license: str(flags.license, 'MIT'),
    template: str(flags.template, 'starter'),
    repository: typeof flags.repository === 'string' ? flags.repository : undefined,
  });

  switch (command) {
    case 'build':
      await build(p, rest);
      break;
    case 'check':
      if (check(p) > 0) process.exitCode = 1;
      break;
    case 'zip':
      zip(p, rest);
      break;
    case 'dist':
      await build(p, rest);
      if (check(p) > 0) {
        process.exitCode = 1;
        break;
      }
      zip(p, rest);
      break;
    case 'add': {
      const id = slug(rest[0] ?? '');
      if (!rest[0]) throw new Error('usage: spotube-theme add <id> [--template <name>]');
      console.log(`created ${addTheme(p, themeOptions(id))}`);
      break;
    }
    case 'init': {
      const dir = rest[0] ?? '.';
      const target = project(join(p.root, dir));
      const id = slug(str(flags.id, dir === '.' ? 'my-theme' : dir.split('/').filter(Boolean).pop()!));
      const files = initProject(target, { ...themeOptions(id), toolSpec: typeof flags.tool === 'string' ? flags.tool : undefined });
      console.log(files.map((f) => `  ${f}`).join('\n'));
      console.log(`\nNext: cd ${dir} && pnpm install && pnpm dist`);
      break;
    }
    case 'list': {
      console.log('Templates (spotube-theme add <id> --template <name>):');
      console.log(`  ${templateIds().join(', ')}\n`);
      console.log('Icon packs (iconPack: "<id>"):');
      for (const [id, m] of Object.entries(iconPacks())) console.log(`  ${id.padEnd(15)} ${m.label} (${m.license}, ${m.icons} icons)`);
      console.log('\nBundled fonts (fonts: { Family: { dir: "<folder>", files: [[file, weight]] } }):');
      for (const [dir, files] of Object.entries(bundledFonts())) console.log(`  ${dir.padEnd(18)} ${files.join(', ')}`);
      console.log(`\nIn this project: ${moduleIds(p).length} theme module(s) in src/`);
      break;
    }
    default:
      throw new Error(`unknown command "${command}"\n\n${HELP}`);
  }
}
