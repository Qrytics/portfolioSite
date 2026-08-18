import { projects } from '$lib/data/projects';
import { SITE_URL } from '$lib/data/seo';
import type { RequestHandler } from './$types';

/**
 * Prerendered, like every other route here. A sitemap generated per request would be a serverless
 * function invocation to emit a document that only changes when this repo does.
 */
export const prerender = true;

/**
 * Static routes, newest-first by importance rather than alphabetically — `priority` is a weak signal
 * to crawlers, but the ordering also makes the file readable.
 *
 * Deliberately excludes `/games/<slug>/`: those are vendored third-party-ish builds under `static/`
 * with their own markup and no metadata from this site, and pointing crawlers at them would surface
 * pages that cannot be navigated back out of.
 */
const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/projects', priority: '0.9', changefreq: 'weekly' },
	{ path: '/about', priority: '0.7', changefreq: 'monthly' },
	{ path: '/games', priority: '0.7', changefreq: 'monthly' },
	{ path: '/resume', priority: '0.6', changefreq: 'monthly' },
	{ path: '/rhythm-games', priority: '0.4', changefreq: 'monthly' },
	{ path: '/games/typetest', priority: '0.3', changefreq: 'yearly' }
];

/**
 * `lastmod` for a project page. The projects carry an end month/year rather than a timestamp, so this
 * is the most honest date available — inventing a build-time `new Date()` would tell crawlers all 35
 * pages changed on every deploy, which is worse than a coarse but true date.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function projectLastmod(endMonth: string, endYear: number): string {
	const monthIndex = MONTHS.indexOf(endMonth);
	const month = String((monthIndex === -1 ? 0 : monthIndex) + 1).padStart(2, '0');
	return `${endYear}-${month}-01`;
}

function urlEntry(loc: string, priority: string, changefreq: string, lastmod?: string): string {
	return [
		'\t<url>',
		`\t\t<loc>${loc}</loc>`,
		lastmod ? `\t\t<lastmod>${lastmod}</lastmod>` : null,
		`\t\t<changefreq>${changefreq}</changefreq>`,
		`\t\t<priority>${priority}</priority>`,
		'\t</url>'
	]
		.filter(Boolean)
		.join('\n');
}

export const GET: RequestHandler = () => {
	const entries = [
		...STATIC_ROUTES.map((route) =>
			urlEntry(`${SITE_URL}${route.path}`, route.priority, route.changefreq)
		),
		...projects.map((project) =>
			urlEntry(
				`${SITE_URL}/projects/${project.slug}`,
				'0.8',
				'yearly',
				projectLastmod(project.endMonth, project.endYear)
			)
		)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			// Prerendered, so this header only applies if it is ever served dynamically; harmless either
			// way and it keeps the CDN from re-fetching a file that changes on deploys only.
			'cache-control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
