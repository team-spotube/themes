// Copies the official example themes (../../src/*.ts at the repository root) into templates/, so `spotube-theme add --template`
// and `create-spotube-theme` can offer them. Run by `prepack`; templates/starter.ts is hand-written and stays.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const from = join(here, '..', '..', '..', 'src');
const to = join(here, '..', 'templates');
mkdirSync(to, { recursive: true });
for (const f of readdirSync(from).filter((f) => f.endsWith('.ts'))) {
  copyFileSync(join(from, f), join(to, f));
  console.log(`template: ${f}`);
}
