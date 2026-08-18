import { profile } from './profile';
import type { Project } from './projects';

/**
 * Every page's metadata in one place, resolved once in `+layout.svelte`.
 *
 * The alternative — each route carrying its own `<svelte:head>` — is what this replaces, and it had
 * two concrete failures. Pages set a `<meta name="description">` while the layout set one too, and
 * `<svelte:head>` does not dedupe arbitrary tags: the prerendered `/games` HTML shipped *two*
 * description tags, the generic one first, so crawlers reading the first tag got the homepage blurb on
 * every route. And because only the layout emitted `og:*`, all 35 project pages told crawlers their
 * `og:url` was the homepage.
 *
 * Centralising also means a route cannot silently ship with no metadata: `resolveSeo` always returns a
 * complete set, so the worst case for a new route is the site default rather than nothing at all.
 */

/**
 * Absolute origin, needed because `og:*` and `canonical` must be absolute URLs — a relative `og:image`
 * is ignored by most scrapers. Hardcoded rather than read from the request: Vercel also serves this
 * project on `*.vercel.app` preview domains, and canonicals pointing at a preview deployment would
 * teach crawlers the wrong home for the content.
 */
export const SITE_URL = 'https://mario-belmonte.com';

/** 1200x600, 82,866 B. Named separately because its dimensions are known and can be declared. */
const DEFAULT_OG_IMAGE = '/og.jpg';

export interface SeoMeta {
	title: string;
	description: string;
	canonical: string;
	/** Absolute URL. */
	image: string;
	imageType: string;
	/** Only set for the default image, whose dimensions are known. Scrapers fetch either way. */
	imageWidth?: number;
	imageHeight?: number;
	ogType: 'website' | 'article' | 'profile';
	/** Serialised JSON-LD, or `null` for routes where a graph would be noise. */
	jsonLd: string | null;
}

const SITE_DESCRIPTION = `${profile.tagline} — ${profile.description}`;

/** Per-route overrides. Anything absent falls back to the site defaults in `resolveSeo`. */
const ROUTES: Record<string, { title: string; description: string; ogType?: SeoMeta['ogType'] }> = {
	'/': {
		title: `${profile.name} — Portfolio`,
		description: SITE_DESCRIPTION
	},
	'/about': {
		title: `${profile.name} — About`,
		description: `${profile.location}-based engineer. ${profile.bio.slice(0, 150).trim()}…`,
		ogType: 'profile'
	},
	'/projects': {
		title: `${profile.name} — Projects`,
		description:
			'Case studies for full-stack apps, IoT systems, ML pipelines and hardware projects, with architecture notes and the problems each one actually hit.'
	},
	'/games': {
		title: `${profile.name} — Games`,
		description: `Browser games and interactive demos built by ${profile.name}, playable in the page.`
	},
	'/games/typetest': {
		title: `Type Speed Test — ${profile.name}`,
		description:
			'A typing speed test built on real code snippets rather than prose, with live WPM and accuracy and a local leaderboard. Runs entirely in the browser.'
	},
	'/rhythm-games': {
		title: `${profile.name} — Rhythm Games`,
		description: 'Clips of me playing rhythm games, and the setups behind them.'
	},
	'/resume': {
		title: `${profile.name} — Resume`,
		description: `Resume for ${profile.name}: electrical and computer engineering at Carnegie Mellon, full-stack and embedded work.`
	}
};

/**
 * `/foo/` and `/foo` are both served, so canonicalise to the no-trailing-slash form (root excepted).
 * Without this, a crawler that finds both spellings treats them as duplicate pages.
 */
function canonicalPath(pathname: string): string {
	const trimmed = pathname.replace(/\/+$/, '');
	return trimmed === '' ? '/' : trimmed;
}

/**
 * Deliberately excludes `.svg`, which is the reason 8 of the 36 projects fall back to the site image:
 * their only artwork is a `/demos/*-preview.svg`, and Facebook, LinkedIn, Slack and X all refuse to
 * render an SVG `og:image`. Accepting one would trade a correct generic preview for no preview at all.
 */
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif|gif)$/i;

const MIME_BY_EXTENSION: Record<string, string> = {
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp',
	avif: 'image/avif',
	gif: 'image/gif'
};

function imageTypeOf(path: string): string {
	const ext = path.split('.').pop()?.toLowerCase() ?? '';
	return MIME_BY_EXTENSION[ext] ?? 'image/jpeg';
}

/**
 * A project's social image. `project.image` is frequently an `.mp4` (the demo video), which is not a
 * valid `og:image` — a scraper handed one renders no preview at all — so the poster is preferred and
 * anything non-image falls through to the site default.
 */
function projectImage(project: Project): string | null {
	const candidate = [project.poster, project.image, project.images?.[0]].find(
		(path): path is string => typeof path === 'string' && IMAGE_EXTENSIONS.test(path)
	);
	return candidate ?? null;
}

/**
 * JSON-LD is emitted with `{@html}`, so the one escape that matters is `<` — a `</script>` sequence
 * inside any string value would close the tag early and spill the rest of the graph into the document.
 * The data is authored in this repo rather than user-supplied, but the cost of being correct is one
 * `replaceAll`.
 */
function serializeJsonLd(graph: unknown): string {
	return JSON.stringify(graph).replaceAll('<', '\\u003c');
}

function personGraph() {
	return {
		'@type': 'Person',
		name: profile.name,
		alternateName: profile.handle,
		description: profile.bio,
		email: `mailto:${profile.email}`,
		url: SITE_URL,
		image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
		jobTitle: 'Electrical & Computer Engineering student',
		address: { '@type': 'PostalAddress', addressLocality: profile.location },
		alumniOf: { '@type': 'CollegeOrUniversity', name: 'Carnegie Mellon University' },
		knowsAbout: profile.skills.flatMap((group) => group.items),
		sameAs: [profile.github, profile.linkedin, profile.twitter].filter(Boolean)
	};
}

export function resolveSeo(pathname: string, project?: Project): SeoMeta {
	const path = canonicalPath(pathname);
	const canonical = `${SITE_URL}${path}`;

	if (project) {
		const image = projectImage(project);
		return {
			title: `${project.title} — ${profile.name}`,
			description: project.description,
			canonical,
			image: `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`,
			imageType: imageTypeOf(image ?? DEFAULT_OG_IMAGE),
			// Dimensions are only declared for the default image; guessing them for a project poster is
			// how the previous `1200x630` claim about a 2880x1800 file happened.
			imageWidth: image ? undefined : 1200,
			imageHeight: image ? undefined : 600,
			ogType: 'article',
			jsonLd: serializeJsonLd({
				'@context': 'https://schema.org',
				'@type': 'CreativeWork',
				name: project.title,
				headline: project.title,
				description: project.description,
				url: canonical,
				image: `${SITE_URL}${image ?? DEFAULT_OG_IMAGE}`,
				keywords: project.tags?.join(', '),
				author: personGraph(),
				...(project.github ? { codeRepository: project.github } : {})
			})
		};
	}

	const route = ROUTES[path];
	const isHome = path === '/';

	return {
		title: route?.title ?? `${profile.name} — Portfolio`,
		description: route?.description ?? SITE_DESCRIPTION,
		canonical,
		image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
		imageType: imageTypeOf(DEFAULT_OG_IMAGE),
		imageWidth: 1200,
		imageHeight: 600,
		ogType: route?.ogType ?? 'website',
		// Only the homepage carries the WebSite + Person graph. Repeating it on every route adds bytes
		// without adding information, and gives crawlers several competing definitions of one entity.
		jsonLd: isHome
			? serializeJsonLd({
					'@context': 'https://schema.org',
					'@graph': [
						{
							'@type': 'WebSite',
							name: `${profile.name} — Portfolio`,
							url: SITE_URL,
							description: SITE_DESCRIPTION,
							inLanguage: 'en',
							author: { '@id': `${SITE_URL}/#person` }
						},
						{ '@id': `${SITE_URL}/#person`, ...personGraph() }
					]
				})
			: null
	};
}
