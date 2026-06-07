/**
 * Downloads the latest rogueSwipe source from GitHub and builds it for
 * hosting at /games/rogueSwipe/, then copies the dist output into
 * static/games/rogueSwipe/.
 *
 * Usage: node scripts/build-rogue-swipe.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-rogue-swipe');
const STATIC_OUT = join(ROOT, 'static', 'games', 'rogueSwipe');
const ZIP_URL = 'https://github.com/Qrytics/rogueSwipe/archive/refs/heads/main.zip';

function run(cmd, cwd = ROOT) {
	execSync(cmd, { cwd, stdio: 'inherit' });
}

if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const zipPath = join(TMP, 'rogueSwipe.zip');
console.log('Downloading rogueSwipe source...');
run(`curl -sL "${ZIP_URL}" -o "${zipPath}"`, TMP);

console.log('Extracting...');
if (platform() === 'win32') {
	run(
		`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${TMP}' -Force"`,
		TMP
	);
} else {
	run(`unzip -q "${zipPath}" -d "${TMP}"`, TMP);
}

const srcDir = join(TMP, 'rogueSwipe-main');

console.log('Installing dependencies...');
run('npm install', srcDir);

console.log('Building...');
run('npm run build', srcDir);

console.log('Copying dist to static/games/rogueSwipe/...');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'dist'), STATIC_OUT, { recursive: true });

console.log('Cleaning up...');
rmSync(TMP, { recursive: true, force: true });

console.log('Done! rogueSwipe built at static/games/rogueSwipe/');
