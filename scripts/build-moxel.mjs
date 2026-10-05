/**
 * Downloads the latest Moxel source from GitHub, builds it for the /Moxel/ base path, then copies:
 *   dist/        → static/Moxel/            (the app; served as static files)
 *   signaling/   → services/moxel-signal/   (the live-session relay; built by docker-compose)
 *
 * Usage:
 *   node scripts/build-moxel.mjs                     # from GitHub main
 *   node scripts/build-moxel.mjs --local ../Moxel    # from a local checkout (for testing changes)
 *
 * Unlike the games this mounts at the site root, not under /games/: Moxel is an application and its
 * URL (https://www.mario-belmonte.com/Moxel) is the public one. The build is a single index.html with
 * hash routing, so no SPA fallback is needed on either host.
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-moxel');
const STATIC_OUT = join(ROOT, 'static', 'Moxel');
const SIGNAL_OUT = join(ROOT, 'services', 'moxel-signal');
const ZIP_URL = 'https://github.com/Qrytics/Moxel/archive/refs/heads/main.zip';
const BASE = '/Moxel/';

function run(cmd, cwd = ROOT, env = {}) {
	execSync(cmd, {
		cwd,
		stdio: 'inherit',
		env: { ...process.env, ...env }
	});
}

// -- main ---------------------------------------------------------------------
if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const localIdx = process.argv.indexOf('--local');
let srcDir;
if (localIdx !== -1) {
	const from = resolve(process.argv[localIdx + 1] ?? '');
	console.log(`Copying local Moxel source from ${from}...`);
	srcDir = join(TMP, 'Moxel-local');
	cpSync(from, srcDir, {
		recursive: true,
		filter: (src) => !/[\\/](node_modules|dist|\.git|\.tmp-[^\\/]*)([\\/]|$)/.test(src.slice(from.length))
	});
} else {
	const zipPath = join(TMP, 'Moxel.zip');
	console.log('Downloading Moxel source...');
	run(`curl -sfL "${ZIP_URL}" -o "${zipPath}"`, TMP);

	console.log('Extracting...');
	if (platform() === 'win32') {
		run(`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${TMP}' -Force"`, TMP);
	} else {
		run(`unzip -q "${zipPath}" -d "${TMP}"`, TMP);
	}
	srcDir = join(TMP, 'Moxel-main');
}

console.log('Installing dependencies...');
run('npm ci --no-audit --no-fund', srcDir);

console.log(`Building with base ${BASE}...`);
run('npm run build', srcDir, { MOXEL_BASE: BASE });

console.log('Copying dist → static/Moxel/...');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'dist'), STATIC_OUT, { recursive: true });

console.log('Copying signaling relay → services/moxel-signal/...');
if (existsSync(SIGNAL_OUT)) rmSync(SIGNAL_OUT, { recursive: true, force: true });
mkdirSync(SIGNAL_OUT, { recursive: true });
for (const f of ['server.mjs', 'package.json', 'Dockerfile']) cpSync(join(srcDir, 'signaling', f), join(SIGNAL_OUT, f));

console.log('Cleaning up...');
rmSync(TMP, { recursive: true, force: true });

console.log('Done! Moxel built at static/Moxel/ (relay at services/moxel-signal/)');
