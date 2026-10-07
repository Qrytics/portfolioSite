#!/usr/bin/env node
/**
 * Pulls the official badge art + verification links for every credential in
 * `src/lib/data/certifications.ts` and writes `src/lib/data/certificationAssets.ts` (generated —
 * never hand-edit) plus the images under `static/certifications/`.
 *
 *   node scripts/update-cert-assets.mjs                 # this repo
 *   node scripts/update-cert-assets.mjs --twin ../AiTutoring/apps/web   # also refresh the tutoring copy
 *
 * Sources:
 *   - Credly: the public badge feed of `CREDLY_USER` (no token needed). Images are self-hosted rather
 *     than hotlinked so the page doesn't depend on Credly being up, at the size each one is shown:
 *     340px for featured badges (128px on screen, sharp at 2×+), 110px for the list (56px, 2×).
 *   - Microsoft Learn: Credly doesn't carry these, so they are listed below by credential id, with
 *     the dates and badge art read off each public credential page.
 *
 * A credential is matched to its Credly badge by title, ignoring punctuation and case.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const CREDLY_USER = 'mario-belmonte.bf3fe15f';
const MS_USER = 'MarioBelmonte-3208';
const MS_SHARE = '8AECAE02766AB685';
const MICROSOFT = {
	'ms-ai-901': {
		credential: 'BC3090331776AE47',
		issued: '2026-09-08',
		art: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg'
	},
	'ms-dp-900': {
		credential: '4D3C439254C7EA10',
		issued: '2026-09-15',
		art: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg'
	},
	'ms-gh-300': {
		credential: '91F59D11910C3DFC',
		issued: '2026-10-05',
		expires: '2028-10-05',
		art: 'https://learn.microsoft.com/media/learn/certification/badges/github-copilot.svg'
	}
};

const args = process.argv.slice(2);
const twinIdx = args.indexOf('--twin');
const roots = [process.cwd(), ...(twinIdx >= 0 ? [path.resolve(args[twinIdx + 1])] : [])];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

async function get(url, as = 'json') {
	const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (cert-assets script)' }, signal: AbortSignal.timeout(20000) });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return as === 'json' ? res.json() : Buffer.from(await res.arrayBuffer());
}

/** Read id/title/featured out of certifications.ts without a TS toolchain. */
function readCerts(root) {
	const src = fs.readFileSync(path.join(root, 'src/lib/data/certifications.ts'), 'utf8');
	const out = [];
	// helper form:  ibm('id', 'Title', 'CODE', 'cat', { ... }, { featured: 1 })
	for (const m of src.matchAll(/ibm\(\s*'([^']+)',\s*'((?:[^'\\]|\\.)+)'([^)]*)\)/g))
		out.push({ id: m[1], title: m[2].replace(/\\'/g, "'"), featured: /featured:\s*\d/.test(m[3]) });
	// object form, one-line or multi-line:  { id: '…', title: '…', … featured: N }  (no nested braces)
	for (const m of src.matchAll(/\{\s*id:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)+)'([^{}]*?)\}(?=,?\s*\n)/g))
		out.push({ id: m[1], title: m[2].replace(/\\'/g, "'"), featured: /featured:\s*\d/.test(m[3]) });
	return out;
}

const feed = await get(`https://www.credly.com/users/${CREDLY_USER}/badges.json?page_size=100`);
const badges = feed.data.map((b) => ({
	key: norm(b.badge_template.name),
	id: b.id,
	issued: b.issued_at_date,
	expires: b.expires_at_date,
	image: b.badge_template.image_url
}));

for (const root of roots) {
	const certs = readCerts(root);
	const dir = path.join(root, 'static/certifications');
	fs.mkdirSync(dir, { recursive: true });
	const assets = {};
	const missing = [];
	const oversized = [];

	for (const c of certs) {
		if (MICROSOFT[c.id]) {
			const ms = MICROSOFT[c.id];
			const file = `${c.id}.svg`;
			const svg = (await get(ms.art, 'buf')).toString('utf8');
			if (/<script|javascript:|\son\w+=|href="https?:/i.test(svg)) throw new Error(`refusing unsafe SVG for ${c.id}`);
			fs.writeFileSync(path.join(dir, file), svg);
			assets[c.id] = {
				image: `/certifications/${file}`,
				verifyUrl: `https://learn.microsoft.com/api/credentials/share/en-us/${MS_USER}/${ms.credential}?sharingId=${MS_SHARE}`,
				issued: ms.issued,
				...(ms.expires ? { expires: ms.expires } : {})
			};
			continue;
		}
		const b = badges.find((x) => x.key === norm(c.title));
		if (!b) {
			missing.push(c.title);
			continue;
		}
		const px = c.featured ? 340 : 110;
		const file = `${c.id}.png`;
		const img = await get(b.image.replace('https://images.credly.com/images/', `https://images.credly.com/size/${px}x${px}/images/`), 'buf');
		fs.writeFileSync(path.join(dir, file), img);
		// Credly ignores the size route for some templates and returns the 1080px original — 80 KB for
		// a 56px slot. Downscale those with ffmpeg (FFMPEG=/path or on PATH); without it, just warn.
		const w = img.readUInt32BE(16);
		if (w > px) {
			const r = spawnSync(FFMPEG, ['-v', 'error', '-y', '-i', path.join(dir, file), '-vf', `scale=${px}:${px}:flags=lanczos`, path.join(dir, `${c.id}.tmp.png`)]);
			if (r.status === 0) fs.renameSync(path.join(dir, `${c.id}.tmp.png`), path.join(dir, file));
			else oversized.push(`${file} (${w}px)`);
		}
		assets[c.id] = {
			image: `/certifications/${file}`,
			verifyUrl: `https://www.credly.com/badges/${b.id}`,
			issued: b.issued,
			...(b.expires ? { expires: b.expires } : {})
		};
	}

	const body = `// GENERATED by scripts/update-cert-assets.mjs — do not hand-edit; re-run the script instead.
// Official badge art (self-hosted under static/certifications/), verification links, and exact
// dates from Credly (${CREDLY_USER}) and Microsoft Learn (${MS_USER}).
import type { Certification } from './certifications';

export const certificationAssets: Record<string, Pick<Certification, 'image' | 'verifyUrl' | 'issued' | 'expires'>> = ${JSON.stringify(assets, null, '\t')};
`;
	fs.writeFileSync(path.join(root, 'src/lib/data/certificationAssets.ts'), body);
	const kb = fs.readdirSync(dir).reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0) / 1024;
	console.log(`${root}: ${Object.keys(assets).length}/${certs.length} matched, ${kb.toFixed(0)} KB of badge art${missing.length ? `\n  UNMATCHED: ${missing.join(' | ')}` : ''}${oversized.length ? `\n  OVERSIZED (no ffmpeg): ${oversized.join(', ')}` : ''}`);
}
