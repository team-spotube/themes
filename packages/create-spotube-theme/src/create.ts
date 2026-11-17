// `pnpm create spotube-theme [dir]`: asks a few questions and bootstraps a theme project with
// @team-spotube/theme-tool as a devDependency.
import { createInterface } from 'node:readline/promises';
import { resolve } from 'node:path';
import { initProject, project, slug, templateIds } from '@team-spotube/theme-tool/scaffold';

const HELP = `create-spotube-theme [dir] [options]

  --id <id>          theme id (file name in src/)
  --name <name>      display name
  --author <you>
  --license <spdx>   default MIT
  --repository <url> where the source lives (https://github.com/you/repo)
  --template <name>  starter (default) or one of the example themes
  --tool <spec>      devDependency spec for @team-spotube/theme-tool (default: the current version)
  -y, --yes          accept defaults, no questions
`;

export async function main(argv: string[]): Promise<void> {
  const flags: Record<string, string | true> = {};
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-y') flags.yes = true;
    else if (a === '-h') flags.help = true;
    else if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=', 2);
      flags[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('-') && k !== 'yes' && k !== 'help' ? argv[++i] : true);
    } else positional.push(a);
  }
  if (flags.help) {
    console.log(HELP);
    return;
  }

  const interactive = !flags.yes && process.stdin.isTTY;
  const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;
  const ask = async (question: string, fallback: string): Promise<string> => {
    if (!rl) return fallback;
    const answer = (await rl.question(`${question} (${fallback}) `)).trim();
    return answer || fallback;
  };
  const str = (v: string | true | undefined): string | undefined => (typeof v === 'string' ? v : undefined);

  try {
    const dir = positional[0] ?? (await ask('Where should the project go?', 'my-spotube-themes'));
    const id = slug(str(flags.id) ?? (await ask('Theme id (letters, digits, dashes)', slug(dir.split('/').filter(Boolean).pop() ?? 'my-theme'))));
    const name = str(flags.name) ?? (await ask('Theme display name', id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())));
    const author = str(flags.author) ?? (await ask('Author', 'Unknown'));
    const license = str(flags.license) ?? (await ask('License (SPDX id)', 'MIT'));
    const repository = str(flags.repository) ?? (await ask('Repository URL', `https://github.com/your-name/${slug(dir.split('/').filter(Boolean).pop() ?? 'my-spotube-themes')}`));
    const templates = ['starter', ...templateIds().filter((t) => t !== 'starter')];
    const template = str(flags.template) ?? (await ask(`Start from (${templates.join(', ')})`, 'starter'));

    const root = resolve(process.cwd(), dir);
    const files = initProject(project(root), { id, name, author, license, template, repository, toolSpec: str(flags.tool), projectName: dir.split('/').filter(Boolean).pop() });
    console.log(`\nCreated ${root}\n${files.map((f) => `  ${f}`).join('\n')}\n`);
    console.log(`Next:\n  cd ${dir}\n  pnpm install\n  pnpm dist\n\nThen install dist/${id}.zip from Settings → Look & feel → Themes in Spotube.`);
  } finally {
    rl?.close();
  }
}
