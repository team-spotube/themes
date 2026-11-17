// Copies the theme JSON Schema from a Spotube checkout (its source of truth) into schema/.
//
// usage: pnpm schema:sync [path/to/spotube]     (default ../spotube)
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './common.mjs';

const spotube = process.argv[2] ?? join(ROOT, '..', 'spotube');
copyFileSync(join(spotube, 'composeApp', 'themes', 'schema', 'theme.schema.json'), join(ROOT, 'schema', 'theme.schema.json'));
console.log('schema synced from', spotube);
