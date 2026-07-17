/**
 * Downloads the latest paddleBall source from GitHub, builds it with
 * basePath='/games/paddleBall', then copies output to
 * static/games/paddleBall/.
 *
 * Usage: node scripts/build-paddle-ball.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-paddle-ball');
const STATIC_OUT = join(ROOT, 'static', 'games', 'paddleBall');
const ZIP_URL = 'https://github.com/Qrytics/paddleBall/archive/refs/heads/main.zip';

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

const zipPath = join(TMP, 'paddleBall.zip');
console.log('Downloading paddleBall source...');
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

const srcDir = join(TMP, 'paddleBall-main');

console.log('Installing dependencies...');
run('npm install', srcDir);

console.log('Building static export...');
run('npm run build', srcDir, {
	NEXT_PUBLIC_BASE_PATH: '/games/paddleBall',
	STATIC_EXPORT: '1',
	NEXT_PUBLIC_PARTYKIT_HOST: 'paddleball.YOUR_USERNAME.partykit.dev'
});

console.log('Copying out to static/games/paddleBall/...');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'out'), STATIC_OUT, { recursive: true });

console.log('Cleaning up...');
rmSync(TMP, { recursive: true, force: true });

console.log('Done! paddleBall built at static/games/paddleBall/');
