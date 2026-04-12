/**
 * Downloads the latest garticDraw source from GitHub, builds it with
 * base='/garticDraw', then copies the output to static/garticDraw/.
 *
 * Usage:  node scripts/build-gartic-draw.mjs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TMP = join(ROOT, '.tmp-gartic-draw');
const STATIC_OUT = join(ROOT, 'static', 'garticDraw');
const ZIP_URL = 'https://github.com/Qrytics/garticDraw/archive/refs/heads/main.zip';

function run(cmd, cwd = ROOT) {
	execSync(cmd, { cwd, stdio: 'inherit' });
}

// ── main ──────────────────────────────────────────────────────────────────────
if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

const zipPath = join(TMP, 'garticDraw.zip');
console.log('⬇  Downloading garticDraw source…');
run(`curl -sL "${ZIP_URL}" -o "${zipPath}"`, TMP);

console.log('📦  Extracting…');
run(`unzip -q "${zipPath}" -d "${TMP}"`, TMP);

const srcDir = join(TMP, 'garticDraw-main');

console.log('🔧  Patching vite.config.js with base="/garticDraw"…');
const viteCfgPath = join(srcDir, 'vite.config.js');
const cfg = readFileSync(viteCfgPath, 'utf8');
writeFileSync(
	viteCfgPath,
	cfg.replace(
		/export default defineConfig\(\{/,
		"export default defineConfig({\n  base: '/garticDraw',"
	)
);

console.log('📥  Installing dependencies…');
run('npm install', srcDir);

console.log('🏗   Building…');
run('npm run build', srcDir);

console.log('🚚  Copying dist → static/garticDraw/…');
if (existsSync(STATIC_OUT)) rmSync(STATIC_OUT, { recursive: true, force: true });
cpSync(join(srcDir, 'dist'), STATIC_OUT, { recursive: true });

console.log('🧹  Cleaning up…');
rmSync(TMP, { recursive: true, force: true });

console.log('✅  Done! garticDraw built at static/garticDraw/');
