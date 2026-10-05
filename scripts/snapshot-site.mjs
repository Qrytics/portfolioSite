/**
 * Visual snapshot of a running copy of the site. It opens every page in `/sitemap.xml` at a phone
 * and a desktop viewport, in dark and in light mode, saves a full-page screenshot of each, and
 * records anything that went wrong on the page: console errors, uncaught exceptions, failed
 * requests, and non-2xx documents.
 *
 * It exists so "what does the live site actually look like right now" never needs a person with a
 * browser. Pointed at production it shows what visitors see; pointed at `npm run dev` it gives you
 * the after picture for a change, so you can compare it with the live one.
 *
 *     npm i --no-save playwright && npx playwright install chromium   # same as verify-ui.mjs
 *     npm run snapshot:live                  # https://mario-belmonte.com
 *     npm run snapshot:local                 # http://localhost:5173 (needs `npm run dev`)
 *     VERIFY_URL=https://x.vercel.app node scripts/snapshot-site.mjs
 *     node scripts/snapshot-site.mjs --compare   # live AND local, plus a side-by-side index.html
 *     node scripts/snapshot-site.mjs --only /,/games   # just these paths
 *
 * Output goes to `.snapshots/<host>/` (gitignored): `<route>.<viewport>.<theme>.png`, a
 * `report.json`, and an `index.html` you can open directly. The exit code is non-zero if any page
 * returned a non-2xx status or threw an uncaught exception. Console noise does not fail the run,
 * because third-party embeds (Drive, YouTube) log things this site cannot fix.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const LIVE = 'https://mario-belmonte.com';
const LOCAL = 'http://localhost:5173';
const VIEWPORTS = {
	phone: { width: 390, height: 844, isMobile: true, hasTouch: true },
	desktop: { width: 1440, height: 900 }
};
const THEMES = ['dark', 'light'];

const args = process.argv.slice(2);
const compare = args.includes('--compare');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? args[onlyIdx + 1]?.split(',').filter(Boolean) : null;
const targets = compare ? [LIVE, LOCAL] : [process.env.VERIFY_URL ?? LIVE];

const OUT_ROOT = path.resolve('.snapshots');

/** `/projects/foo` → `projects__foo`; `/` → `home`. Safe as a filename on every OS. */
const slugFor = (route) => route.replace(/^\/|\/$/g, '').replace(/[^a-zA-Z0-9-]+/g, '__') || 'home';

async function routesFrom(base) {
	if (only) return only;
	const res = await fetch(`${base}/sitemap.xml`);
	if (!res.ok) throw new Error(`${base}/sitemap.xml answered ${res.status}`);
	const xml = await res.text();
	// The sitemap holds absolute production URLs; keep only the path so the same list works on any host.
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

async function snapshot(browser, base) {
	const host = new URL(base).host.replace(/[:]/g, '_');
	const outDir = path.join(OUT_ROOT, host);
	await mkdir(outDir, { recursive: true });

	const routes = await routesFrom(base);
	const report = { base, takenAt: new Date().toISOString(), pages: [] };
	let fatal = 0;

	for (const route of routes) {
		for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
			for (const theme of THEMES) {
				const ctx = await browser.newContext({
					viewport: { width: vp.width, height: vp.height },
					isMobile: vp.isMobile ?? false,
					hasTouch: vp.hasTouch ?? false,
					colorScheme: theme,
					reducedMotion: 'reduce'
				});
				// app.html's blocking theme script reads this key before first paint, so the page renders
				// in the requested theme from the first frame instead of flashing dark first.
				await ctx.addInitScript((t) => {
					try {
						localStorage.setItem('theme', t);
					} catch {}
				}, theme);
				const page = await ctx.newPage();
				const entry = { route, viewport: vpName, theme, status: 0, console: [], pageErrors: [], failed: [] };

				page.on('console', (m) => m.type() === 'error' && entry.console.push(m.text()));
				page.on('pageerror', (e) => entry.pageErrors.push(String(e)));
				page.on('requestfailed', (r) => entry.failed.push(`${r.failure()?.errorText ?? 'failed'} ${r.url()}`));
				page.on('response', (r) => {
					if (r.status() >= 400 && r.url().startsWith(base)) entry.failed.push(`${r.status()} ${r.url()}`);
				});

				try {
					const res = await page.goto(base + route, { waitUntil: 'load', timeout: 30000 });
					entry.status = res?.status() ?? 0;
					await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
					await page.waitForTimeout(400);
					const file = `${slugFor(route)}.${vpName}.${theme}.png`;
					await page.screenshot({ path: path.join(outDir, file), fullPage: true });
					entry.file = file;
				} catch (e) {
					entry.pageErrors.push(`navigation: ${e}`);
				}

				if (entry.status < 200 || entry.status >= 300 || entry.pageErrors.length) fatal++;
				report.pages.push(entry);
				await ctx.close();
				const flag = entry.status >= 200 && entry.status < 300 && !entry.pageErrors.length ? 'ok ' : 'BAD';
				console.log(`${flag} ${entry.status} ${route} [${vpName}/${theme}]`);
			}
		}
	}

	await writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
	await writeFile(path.join(outDir, 'index.html'), galleryHtml(report));
	console.log(`\n${report.pages.length} snapshots → ${outDir}/index.html (${fatal} with problems)`);
	return { host, report, fatal };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function galleryHtml(report) {
	const rows = report.pages
		.map((p) => {
			const issues = [...p.pageErrors, ...p.failed, ...p.console];
			return `<figure><figcaption><b>${esc(p.route)}</b> ${p.viewport}/${p.theme} · ${p.status}${
				issues.length ? `<ul>${issues.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''
			}</figcaption>${p.file ? `<a href="${esc(p.file)}"><img loading="lazy" src="${esc(p.file)}"></a>` : ''}</figure>`;
		})
		.join('\n');
	return `<!doctype html><meta charset="utf-8"><title>snapshots ${esc(report.base)}</title>
<style>body{background:#111;color:#ddd;font:13px monospace;margin:16px}figure{display:inline-block;vertical-align:top;width:280px;margin:8px}
img{width:100%;border:1px solid #333}ul{color:#f88;margin:4px 0;padding-left:16px}</style>
<h1>${esc(report.base)} — ${esc(report.takenAt)}</h1>${rows}`;
}

function compareHtml(results) {
	const [a, b] = results;
	const byKey = (r) => new Map(r.report.pages.map((p) => [`${p.route}|${p.viewport}|${p.theme}`, p]));
	const ma = byKey(a);
	const mb = byKey(b);
	const keys = [...new Set([...ma.keys(), ...mb.keys()])];
	const cell = (r, p) =>
		p?.file ? `<a href="${esc(r.host)}/${esc(p.file)}"><img loading="lazy" src="${esc(r.host)}/${esc(p.file)}"></a>` : '<i>missing</i>';
	const rows = keys
		.map((k) => `<tr><th>${esc(k.replaceAll('|', ' · '))}</th><td>${cell(a, ma.get(k))}</td><td>${cell(b, mb.get(k))}</td></tr>`)
		.join('\n');
	return `<!doctype html><meta charset="utf-8"><title>live vs local</title>
<style>body{background:#111;color:#ddd;font:13px monospace;margin:16px}td{vertical-align:top;width:45%}img{width:100%;border:1px solid #333}th{text-align:left;width:10%}</style>
<table><tr><th></th><th>${esc(a.report.base)}</th><th>${esc(b.report.base)}</th></tr>${rows}</table>`;
}

const browser = await chromium.launch();
const results = [];
let failed = 0;
try {
	for (const base of targets) {
		const r = await snapshot(browser, base);
		results.push(r);
		failed += r.fatal;
	}
	if (compare) {
		await writeFile(path.join(OUT_ROOT, 'compare.html'), compareHtml(results));
		console.log(`side-by-side → ${path.join(OUT_ROOT, 'compare.html')}`);
	}
} finally {
	await browser.close();
}
process.exit(failed ? 1 : 0);
