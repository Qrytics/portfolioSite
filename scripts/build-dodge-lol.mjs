/**
 * Downloads the latest dodgeLoL source from GitHub, builds it with
 * base='/games/dodgeLoL', then copies dist output to static/games/dodgeLoL/.
 *
 * Usage: node scripts/build-dodge-lol.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-dodge-lol');
const STATIC_OUT = join(ROOT, 'static', 'games', 'dodgeLoL');
const ZIP_URL = 'https://github.com/Qrytics/dodgeLoL/archive/refs/heads/main.zip';

function run(cmd, cwd = ROOT) {
	execSync(cmd, { cwd, stdio: 'inherit' });
}

// -- main ---------------------------------------------------------------------
if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const zipPath = join(TMP, 'dodgeLoL.zip');
console.log('Downloading dodgeLoL source...');
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

const srcDir = join(TMP, 'dodgeLoL-main');

console.log('Patching vite.config.js with base="/games/dodgeLoL"...');
const viteCfgPath = join(srcDir, 'vite.config.js');
const cfg = readFileSync(viteCfgPath, 'utf8');
writeFileSync(
	viteCfgPath,
	cfg.replace(/export default defineConfig\(\{/, "export default defineConfig({\n  base: '/games/dodgeLoL/',")
);

console.log('Installing dependencies...');
run('npm install', srcDir);

console.log('Building...');
run('npm run build', srcDir);

console.log('Copying dist to static/games/dodgeLoL/...');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'dist'), STATIC_OUT, { recursive: true });

console.log('Cleaning up...');
rmSync(TMP, { recursive: true, force: true });

console.log('Done! dodgeLoL built at static/games/dodgeLoL/');