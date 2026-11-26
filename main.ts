// Hand-in program for China by Numbers (Node 22, standard library only).
// It gathers the static site in app/ and the screenshots in screenshots/
// from beside this file, copies them into the output folder, and writes
// dossier.json there with the vendored make.fun library. The library file
// under vendor/ must stay exactly as the kit shipped it: the scorer
// rebuilds the dossier with its own copy and compares the two byte for byte.
//
// Try it locally like this:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Without MAKEFUN_OUTPUT_DIR the grader's /output is used.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const base = fileURLToPath(new URL('.', import.meta.url));
const dest = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(dest, { recursive: true });
cpSync(join(base, 'app'), join(dest, 'app'), { recursive: true });
mkdirSync(join(dest, 'screenshots'), { recursive: true });
if (existsSync(join(base, 'screenshots'))) cpSync(join(base, 'screenshots'), join(dest, 'screenshots'), { recursive: true });

// Caps from the scorer's gate: the text cap shapes the dossier bytes, and
// the others refuse an entry the scorer would refuse (too many screenshots,
// one too big, or app/ past 993 entries / 16 MiB). The copy is plain and
// deterministic, so running it twice writes identical bytes both times.
const dossierText = buildDossier(dest, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 });
writeFileSync(join(dest, 'dossier.json'), dossierText);
