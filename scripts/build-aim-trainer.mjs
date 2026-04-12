/**
 * Downloads the latest aimTrainer source from GitHub and copies it to
 * static/games/aimTrainer/.  No build step required — it's plain HTML/CSS/JS.
 *
 * Usage:  node scripts/build-aim-trainer.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-aim-trainer');
const STATIC_OUT = join(ROOT, 'static', 'games', 'aimTrainer');
const ZIP_URL = 'https://github.com/Qrytics/aimTrainer/archive/refs/heads/main.zip';

function run(cmd, cwd = ROOT) {
	execSync(cmd, { cwd, stdio: 'inherit' });
}

// ── main ──────────────────────────────────────────────────────────────────────
if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const zipPath = join(TMP, 'aimTrainer.zip');
console.log('⬇  Downloading aimTrainer source…');
run(`curl -sL "${ZIP_URL}" -o "${zipPath}"`, TMP);

console.log('📦  Extracting…');
if (platform() === 'win32') {
	run(
		`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${TMP}' -Force"`,
		TMP
	);
} else {
	run(`unzip -q "${zipPath}" -d "${TMP}"`, TMP);
}

const srcDir = join(TMP, 'aimTrainer-main');

console.log('🚚  Copying game files → static/games/aimTrainer/…');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
mkdirSync(STATIC_OUT, { recursive: true });

// Copy the game files (index.html, css/, js/)
cpSync(srcDir, STATIC_OUT, {
	recursive: true,
	filter: (src) => !src.includes('.github') && !src.endsWith('README.md')
});

console.log('🧹  Cleaning up…');
rmSync(TMP, { recursive: true, force: true });

console.log('✅  Done! aimTrainer copied to static/games/aimTrainer/');
