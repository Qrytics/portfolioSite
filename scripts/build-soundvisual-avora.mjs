/**
 * Downloads the latest soundVisual-Avora source from GitHub, builds it with
 * basePath='/games/soundVisual-Avora', then copies output to
 * static/games/soundVisual-Avora/.
 *
 * Usage: node scripts/build-soundvisual-avora.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-soundvisual-avora');
const STATIC_OUT = join(ROOT, 'static', 'games', 'soundVisual-Avora');
const ZIP_URL = 'https://github.com/Qrytics/soundVisual-Avora/archive/refs/heads/main.zip';

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

const zipPath = join(TMP, 'soundVisual-Avora.zip');
console.log('Downloading soundVisual-Avora source...');
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

const srcDir = join(TMP, 'soundVisual-Avora-main');

console.log('Installing dependencies...');
run('npm install', srcDir);

console.log('Building static export...');
run('npm run build', srcDir, {
	NEXT_PUBLIC_BASE_PATH: '/games/soundVisual-Avora',
	STATIC_EXPORT: '1'
});

console.log('Copying out to static/games/soundVisual-Avora/...');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'out'), STATIC_OUT, { recursive: true });

console.log('Cleaning up...');
rmSync(TMP, { recursive: true, force: true });

console.log('Done! soundVisual-Avora built at static/games/soundVisual-Avora/');
