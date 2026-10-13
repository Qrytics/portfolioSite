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
 *     the dates and badge art read off each public credential page
 *     (`https://learn.microsoft.com/api/credentials/<credential>?locale=en-us` → `awardedOn`).
 *   - Accredible (the OpenAI Partner Network's credential.net): listed below by credential uuid; name,
 *     dates and badge art come from its public, tokenless credential-net API.
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
	'ms-az-900': {
		credential: '59CF6E9145C3D1BB',
		issued: '2026-10-12',
		art: 'https://learn.microsoft.com/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg'
	},
	'ms-gh-300': {
		credential: '91F59D11910C3DFC',
		issued: '2026-10-05',
		expires: '2028-10-05',
		art: 'https://learn.microsoft.com/media/learn/certification/badges/github-copilot.svg'
	}
};

const ACCREDIBLE = {
	'openai-consultative-solutions-practitioner': '5175b424-6bde-41aa-9bd6-8e3d4f876762',
	'openai-technical-practitioner': 'c69dee8b-1d47-4fbb-a953-1ffe06e08e7a',
	'openai-api-deployment-practitioner': '6fb4d95d-f568-4a7e-bc12-b15d62ca099a',
	'openai-chatgpt-deployment-practitioner': 'f87afd56-c5de-4ff4-ada8-0d4d9facf74c',
	'openai-chatgpt-solutions-practitioner': 'd3141f69-c0d6-473b-b25d-9ff3ad7c6d11',
	'openai-codex-deployment-practitioner': '94f11451-b96f-41e1-a20a-b42a0feab1e1',
	'openai-codex-solutions-practitioner': '8198149a-8f69-4764-a499-55db99dc10a1',
	'openai-cyber-deployment-practitioner': '63ce58f5-d682-483e-920a-4c9c6ef1b11a',
	'openai-foundational-knowledge': '83ffa8c7-f31a-4b3a-98b6-4ae645610fd3'
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
		const px = c.featured ? 340 : 110;
		/** Writes `<id>.png` from `url`, downscaled to `px` if the source is larger. */
		const savePng = async (url) => {
			const file = `${c.id}.png`;
			const out = path.join(dir, file);
			const img = await get(url, 'buf');
			fs.writeFileSync(out, img);
			// Credly ignores the size route for some templates and returns the 1080px original — 80 KB
			// for a 56px slot. Downscale those with ffmpeg (FFMPEG=/path or on PATH), else macOS's
			// built-in sips; with neither, just warn.
			const w = img.readUInt32BE(16);
			if (w > px) {
				const tmp = path.join(dir, `${c.id}.tmp.png`);
				let ok = spawnSync(FFMPEG, ['-v', 'error', '-y', '-i', out, '-vf', `scale=${px}:${px}:flags=lanczos`, tmp]).status === 0;
				if (ok) fs.renameSync(tmp, out);
				else ok = spawnSync('sips', ['-Z', String(px), out]).status === 0;
				if (!ok) oversized.push(`${file} (${w}px)`);
			}
			return `/certifications/${file}`;
		};
		if (ACCREDIBLE[c.id]) {
			const { data: a } = await get(`https://api.accredible.com/v1/credential-net/credentials/${ACCREDIBLE[c.id]}`);
			assets[c.id] = {
				image: await savePng(a.badge_image),
				verifyUrl: a.url,
				issued: a.issued_on,
				...(a.expired_on ? { expires: a.expired_on } : {})
			};
			continue;
		}
		const b = badges.find((x) => x.key === norm(c.title));
		if (!b) {
			missing.push(c.title);
			continue;
		}
		assets[c.id] = {
			image: await savePng(b.image.replace('https://images.credly.com/images/', `https://images.credly.com/size/${px}x${px}/images/`)),
			verifyUrl: `https://www.credly.com/badges/${b.id}`,
			issued: b.issued,
			...(b.expires ? { expires: b.expires } : {})
		};
	}

	const body = `// GENERATED by scripts/update-cert-assets.mjs — do not hand-edit; re-run the script instead.
// Official badge art (self-hosted under static/certifications/), verification links, and exact
// dates from Credly (${CREDLY_USER}), Microsoft Learn (${MS_USER}) and Accredible (OpenAI).
import type { Certification } from './certifications';

export const certificationAssets: Record<string, Pick<Certification, 'image' | 'verifyUrl' | 'issued' | 'expires'>> = ${JSON.stringify(assets, null, '\t')};
`;
	fs.writeFileSync(path.join(root, 'src/lib/data/certificationAssets.ts'), body);
	const kb = fs.readdirSync(dir).reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0) / 1024;
	console.log(`${root}: ${Object.keys(assets).length}/${certs.length} matched, ${kb.toFixed(0)} KB of badge art${missing.length ? `\n  UNMATCHED: ${missing.join(' | ')}` : ''}${oversized.length ? `\n  OVERSIZED (no ffmpeg): ${oversized.join(', ')}` : ''}`);
}
