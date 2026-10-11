/* ============================================================
   check-images.mjs — every image the data files point to must exist
   AND be pushed.

   WHY
   .gitignore drops every .png under Resource/ (originals stay local, the site uses
   .webp — CLAUDE.md §5). A screenshot folder delivered as PNG therefore
   looks fine on this machine and 404s on the live site. Tool 21 shipped
   that way in 2026-10 and was caught only by reading the ignore rules.

   RUN IT (from the repo root, before committing new pictures)
       node scripts/check-images.mjs
   Exit code 1 when anything is missing or gitignored.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);

// The data files assign to window.*; evaluate them so computed paths
// (PIC + "...", screenshots built with .map) come out exactly as the site sees them.
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['assets/js/tools-data.js', 'assets/js/drawings-data.js', 'assets/js/articles-data.js'])
  if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });

const paths = new Set();
const walk = v => {
  if (typeof v === 'string') {
    if (/^Resource\/.+\.(webp|png|jpe?g|gif|svg)$/i.test(v)) paths.add(v);
  } else if (v && typeof v === 'object') Object.values(v).forEach(walk);
};
walk(ctx.window);

let bad = 0;
for (const p of [...paths].sort()) {
  if (!fs.existsSync(p)) { console.log('MISSING   ' + p); bad++; continue; }
  try {
    execFileSync('git', ['check-ignore', '-q', p]);   // exit 0 = ignored
    console.log('IGNORED   ' + p + '   (convert to .webp — CLAUDE.md §5)');
    bad++;
  } catch { /* exit 1 = not ignored: will be pushed */ }
}
console.log(`${paths.size} images referenced · ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
