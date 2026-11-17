#!/usr/bin/env node
import('../dist/create.js').then((m) => m.main(process.argv.slice(2))).catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
