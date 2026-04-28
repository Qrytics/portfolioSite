/**
 * Generate a portfolio demo SVG card in the house style.
 *
 * Usage:
 * node scripts/generate-demo-card.mjs ^
 *   --out static/demos/example-demo.svg ^
 *   --title "Example Project" ^
 *   --subtitle "Short descriptive subtitle" ^
 *   --tags "TypeScript,FastAPI,Docker" ^
 *   --repo "github.com/Qrytics/example" ^
 *   --dot "#84cc16" --accent1 "#84cc16" --accent2 "#65a30d" --textAccent "#bef264" --chipBg "#2b3d22"
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

function getArg(flag, fallback = '') {
	const idx = process.argv.indexOf(flag);
	if (idx === -1) return fallback;
	return process.argv[idx + 1] ?? fallback;
}

function esc(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

const out = getArg('--out');
const title = getArg('--title');
const subtitle = getArg('--subtitle');
const tags = getArg('--tags')
	.split(',')
	.map((t) => t.trim())
	.filter(Boolean);
const repo = getArg('--repo');

if (!out || !title || !subtitle || !repo) {
	console.error('Missing required args. Need --out --title --subtitle --repo');
	process.exit(1);
}

const dot = getArg('--dot', '#a78bfa');
const accent1 = getArg('--accent1', '#a78bfa');
const accent2 = getArg('--accent2', '#8b5cf6');
const textAccent = getArg('--textAccent', '#c4b5fd');
const chipBg = getArg('--chipBg', '#2f2443');
const bg = getArg('--bg', '#0f1528');
const titleColor = getArg('--titleColor', '#f8fafc');
const footerColor = getArg('--footerColor', textAccent);

let chipX = 64;
const chips = tags
	.slice(0, 8)
	.map((tag) => {
		const label = esc(tag);
		const width = Math.max(74, 16 + label.length * 10);
		const node = `<rect x="${chipX}" y="270" width="${width}" height="34" rx="8" fill="${chipBg}"/><text x="${
			chipX + 12
		}" y="293" fill="${textAccent}" font-size="17" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="500">${label}</text>`;
		chipX += width + 8;
		return node;
	})
	.join('\n  ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="576" viewBox="0 0 1024 576">
  <defs>
    <pattern id="dotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.25" fill="${dot}" opacity="0.46"/>
    </pattern>
  </defs>
  <rect width="1024" height="576" fill="${bg}"/>
  <rect width="1024" height="576" fill="url(#dotGrid)"/>
  <rect x="0" y="0" width="4" height="576" fill="${accent1}" opacity="0.9"/>
  <circle cx="956" cy="58" r="90" fill="${accent1}" opacity="0.9"/>
  <circle cx="960" cy="574" r="86" fill="${accent2}" opacity="0.88"/>
  <text x="64" y="166" fill="${titleColor}" font-size="62" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="600">${esc(title)}</text>
  <text x="64" y="224" fill="${textAccent}" font-size="24" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="400">${esc(
		subtitle
	)}</text>
  <line x1="64" y1="252" x2="960" y2="252" stroke="${accent1}" stroke-width="2" opacity="0.62"/>
  ${chips}
  <text x="64" y="536" fill="${footerColor}" font-size="20" font-family="Inter,Segoe UI,Arial,sans-serif" font-weight="400">${esc(
		repo
	)}</text>
</svg>
`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg, 'utf8');
console.log(`Created ${out}`);
