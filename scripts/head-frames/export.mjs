// One-time export: write each step of the spin from src/lib/data/headSpin.ts to its own text file.
//
//   node scripts/head-frames/export.mjs          (refuses to run if frames/ already exists)
//   node scripts/head-frames/export.mjs --force  (overwrites frames/, discarding hand edits)
//
// After that the text files are the source of truth: edit them, then run build.mjs.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const framesDir = path.join(here, 'frames');
const dataFile = path.join(here, '..', '..', 'src', 'lib', 'data', 'headSpin.ts');

if (fs.existsSync(framesDir) && fs.readdirSync(framesDir).length && !process.argv.includes('--force')) {
	console.error('frames/ already has files. Re-exporting would overwrite your edits; pass --force if that is what you want.');
	process.exit(1);
}

const { SPIN_STEPS, spinOrder, spinFrames } = await import(url.pathToFileURL(dataFile).href);
fs.mkdirSync(framesDir, { recursive: true });
for (let k = 0; k < SPIN_STEPS; k++) {
	const name = `step-${String(k).padStart(3, '0')}.txt`;
	// Trailing spaces carry no information; dropping them keeps the files easy to edit.
	const text = spinFrames[spinOrder[k]].split('\n').map((r) => r.replace(/\s+$/, '')).join('\n') + '\n';
	fs.writeFileSync(path.join(framesDir, name), text);
}
console.log(`wrote ${SPIN_STEPS} files to scripts/head-frames/frames/ (step N shows ${'360 / ' + SPIN_STEPS} = ${(360 / SPIN_STEPS).toFixed(1)} degrees per step)`);
