/**
 * Metadata check over the **prerendered build output**, not a running server.
 *
 * `verify-ui.mjs` and `verify-chart.mjs` drive a browser against `npm run dev`, which is the right
 * tool for behaviour but the wrong one here: the thing worth asserting is that *every* route ships
 * correct metadata, and there are 43 of them. Reading `.svelte-kit/output/prerendered/` checks all 43
 * in well under a second with no browser, and it checks the bytes crawlers actually receive rather
 * than a hydrated DOM — which matters because the bug this replaced (two `<meta name="description">`
 * tags, generic one first) was only visible in the served HTML.
 *
 *     npm run build          # prerender must have completed; the adapter step may fail on Windows
 *     npm run verify:seo
 *
 * Exits non-zero if any assertion fails.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PRERENDERED = '.svelte-kit/output/prerendered/pages';

if (!existsSync(PRERENDERED)) {
	console.error(`No prerendered output at ${PRERENDERED}. Run \`npm run build\` first.`);
	process.exit(1);
}

const problems = [];
const notes = [];

function check(ok, label, detail = '') {
	(ok ? notes : problems).push(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
}

const walk = (dir) =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
	);

const allFiles = walk(PRERENDERED);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
check(htmlFiles.length > 30, 'prerendered pages found', `${htmlFiles.length} html files`);

const first = (html, re) => html.match(re)?.[1];
const count = (html, re) => [...html.matchAll(re)].length;

/** Canonical → route, so duplicates across two different pages are detectable. */
const canonicalOwners = new Map();

for (const file of htmlFiles) {
	const route = file.slice(PRERENDERED.length).replaceAll('\\', '/');
	const html = readFileSync(file, 'utf8');

	// The original defect: a page-level `<svelte:head>` description alongside the layout's. Svelte
	// dedupes `<title>` but not arbitrary meta tags, so this is the assertion that would have caught it.
	const descriptions = count(html, /<meta name="description"/g);
	check(descriptions === 1, `${route}: exactly one description tag`, `${descriptions} found`);

	const titles = count(html, /<title>/g);
	check(titles === 1, `${route}: exactly one title`, `${titles} found`);

	const description = first(html, /<meta name="description" content="([^"]*)"/);
	check((description?.length ?? 0) > 50, `${route}: description is substantive`, `${description?.length ?? 0} chars`);

	const canonical = first(html, /<link rel="canonical" href="([^"]+)"/);
	check(canonical?.startsWith('https://') ?? false, `${route}: canonical is absolute`, canonical ?? 'missing');
	// A trailing slash would make `/foo/` and `/foo` two pages again, which is the whole point of the
	// tag. The homepage is the one exception: its canonical is the bare origin, which necessarily ends
	// in the slash that separates origin from path.
	const isHomeCanonical = /^https:\/\/[^/]+\/$/.test(canonical ?? '');
	check(
		isHomeCanonical || !canonical?.endsWith('/'),
		`${route}: canonical has no trailing slash`,
		canonical ?? ''
	);

	const previousOwner = canonicalOwners.get(canonical);
	check(previousOwner === undefined, `${route}: canonical is unique`, previousOwner ? `also claimed by ${previousOwner}` : '');
	canonicalOwners.set(canonical, route);

	// The bug here was `og:url` hardcoded to the homepage, so all 36 project pages claimed to *be* the
	// homepage. Equality with the canonical is the invariant, not merely "present".
	const ogUrl = first(html, /property="og:url" content="([^"]+)"/);
	check(ogUrl === canonical, `${route}: og:url matches canonical`, ogUrl ?? 'missing');

	for (const [property, pattern] of [
		['og:type', /property="og:type" content="([^"]+)"/],
		['og:site_name', /property="og:site_name" content="([^"]+)"/],
		['og:title', /property="og:title" content="([^"]+)"/],
		['og:description', /property="og:description" content="([^"]+)"/],
		['twitter:card', /name="twitter:card" content="([^"]+)"/],
		['twitter:title', /name="twitter:title" content="([^"]+)"/],
		['twitter:description', /name="twitter:description" content="([^"]+)"/]
	]) {
		check(Boolean(first(html, pattern)), `${route}: has ${property}`);
	}

	// A relative `og:image` is silently ignored by most scrapers, and an SVG is rejected outright — the
	// two ways to ship a link preview that renders as nothing at all.
	const ogImage = first(html, /property="og:image" content="([^"]+)"/);
	check(ogImage?.startsWith('https://') ?? false, `${route}: og:image is absolute`, ogImage ?? 'missing');
	check(!/\.svg(\?|#|$)/i.test(ogImage ?? ''), `${route}: og:image is a raster format`, ogImage ?? '');

	// Declared dimensions must come in pairs, and only when they are actually known. The previous head
	// block declared 1200x630 for a 2880x1800 file.
	const hasWidth = /property="og:image:width"/.test(html);
	const hasHeight = /property="og:image:height"/.test(html);
	check(hasWidth === hasHeight, `${route}: og:image dimensions are paired`, `w=${hasWidth} h=${hasHeight}`);

	const ldBlocks = count(html, /application\/ld\+json/g);
	check(ldBlocks <= 1, `${route}: at most one JSON-LD block`, `${ldBlocks} found`);
	const ldBody = first(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
	if (ldBody) {
		let parsed = null;
		try {
			parsed = JSON.parse(ldBody);
		} catch (error) {
			check(false, `${route}: JSON-LD parses`, error.message);
		}
		if (parsed) {
			check(parsed['@context'] === 'https://schema.org', `${route}: JSON-LD declares schema.org context`);
			check(
				Boolean(parsed['@type'] || parsed['@graph']),
				`${route}: JSON-LD has a type or graph`
			);
		}
		// `{@html}` writes this into the document unescaped, so an unescaped `<` is how the tag closes
		// early and spills the rest of the graph into the page as text.
		check(!ldBody.includes('<'), `${route}: JSON-LD contains no raw '<'`);
	}
}

// ── Sitemap ──────────────────────────────────────────────────────────────────────────────────────
const sitemapPath = join(PRERENDERED, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
	check(false, 'sitemap.xml was prerendered', `not found at ${sitemapPath}`);
} else {
	const sitemap = readFileSync(sitemapPath, 'utf8');
	const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

	check(locs.length > 0, 'sitemap.xml lists URLs', `${locs.length} entries`);
	check(new Set(locs).size === locs.length, 'sitemap.xml has no duplicate URLs');
	check(
		locs.every((loc) => loc.startsWith('https://')),
		'sitemap.xml URLs are absolute'
	);

	// The two directions are different failures: a page missing from the sitemap is a page a crawler
	// may never reach, and a sitemap URL with no page behind it is a 404 reported to Search Console.
	const canonicals = new Set(canonicalOwners.keys());
	const unlisted = [...canonicals].filter((url) => !locs.includes(url));
	check(unlisted.length === 0, 'every prerendered page is in the sitemap', unlisted.slice(0, 5).join(' | '));

	const dangling = locs.filter((loc) => !canonicals.has(loc));
	check(dangling.length === 0, 'every sitemap URL has a prerendered page', dangling.slice(0, 5).join(' | '));
}

// ── robots.txt ───────────────────────────────────────────────────────────────────────────────────
const robots = existsSync('static/robots.txt') ? readFileSync('static/robots.txt', 'utf8') : '';
const sitemapDirective = robots.match(/^Sitemap:\s*(\S+)/m)?.[1];
check(Boolean(sitemapDirective), 'robots.txt declares a Sitemap');
if (sitemapDirective) {
	// Points at the file this build actually emitted, not a path that used to exist.
	check(
		sitemapDirective.endsWith('/sitemap.xml') && existsSync(sitemapPath),
		'robots.txt Sitemap points at the emitted file',
		sitemapDirective
	);
}

console.log('=== PROBLEMS ===');
console.log(problems.length ? problems.map((p) => '  ' + p).join('\n') : '  none');
console.log(`\n${notes.length} passed, ${problems.length} failed`);
process.exit(problems.length ? 1 : 0);
