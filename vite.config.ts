import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import { games } from './src/lib/data/games';

/**
 * Dev-only mirror of the proxy rewrites in `vercel.json` (and the Caddyfile on the Pi), so the
 * relative links to these separately deployed apps work in `npm run dev` instead of 404ing. Production
 * never reads this. Order matters for the same reason it does in `vercel.json`: Vite tries keys in
 * insertion order, and spotifyHero's own `/_next` must win over the karaoke app's root `/_next`.
 */
const VCKARAOKE = 'https://vckaraoke-frontend.vercel.app';
const devProxy = {
	'/games/spotifyHero': { target: 'https://spotifyhero-web.vercel.app', changeOrigin: true },
	'/games/vcKaraoke': {
		target: VCKARAOKE,
		changeOrigin: true,
		rewrite: (p: string) => p.replace(/^\/games\/vcKaraoke/, '') || '/'
	},
	'/room': { target: VCKARAOKE, changeOrigin: true },
	'/_next': { target: VCKARAOKE, changeOrigin: true },
	'/tutoring': {
		target: 'https://tutoring.mario-belmonte.com',
		changeOrigin: true,
		rewrite: (p: string) => (p === '/tutoring' ? '/tutoring/' : p)
	}
};

/**
 * The in-app game URLs, e.g. `/games/garticDraw`. Routes (`game.route`, the type test) are skipped so
 * the rewrite below never shadows a real page. A `'#'` placeholder contributes `/games/<slug>`: an
 * unlinked game can still be built under `static/games/` (rogueSwipe is), and it should be testable
 * locally by typing the URL. If nothing is built there the rewritten path simply 404s, as before.
 */
const vendoredGamePaths = games
	.filter((game) => !game.route)
	.map((game) => (game.playUrl === '#' ? `/games/${game.slug}` : game.playUrl))
	.filter((url) => url.startsWith('/games/'))
	.map((url) => url.replace(/\/+$/, ''))
	// A proxied app (vcKaraoke) is not a directory under `static/`; rewriting it to `/index.html`
	// first would make the proxy forward the wrong path.
	.filter((url) => !Object.keys(devProxy).some((prefix) => url === prefix || url.startsWith(`${prefix}/`)));

/**
 * Serve the vendored game builds under `static/games/<slug>/` in `npm run dev`.
 *
 * Each game is a standalone build whose entry point is `static/games/<slug>/index.html`, and `/games`
 * links to it as `/games/<slug>/`. Vercel resolves a directory request to its `index.html`, so those
 * links are correct in production (verified: `mario-belmonte.com/games/garticDraw/` → 200). Neither
 * Vite's nor SvelteKit's dev static handler does, so every Play button 404s locally — you could not
 * test a game without deploying, and a genuinely broken link looked identical to this.
 *
 * Dev-only by construction (`apply: 'serve'`), and driven off `games.ts` rather than a path pattern,
 * so an unknown slug still 404s and the real `/games/typetest` *route* is never shadowed — rewriting
 * that one to `typetest/index.html` would break a page that currently works.
 */
function serveVendoredGameIndexes(): Plugin {
	return {
		name: 'portfolio:serve-vendored-game-indexes',
		apply: 'serve',
		// `enforce: 'pre'` and first in the plugin list, because the rewrite has to happen *before*
		// SvelteKit's own `static/` middleware runs. That middleware is what serves the game files, and
		// it only matches an exact file path; by the time SvelteKit's final handler looks at the URL it
		// resolves against the project root rather than `static/`, so rewriting later achieves nothing.
		enforce: 'pre',
		configureServer(server) {
			server.middlewares.use((req, _res, next) => {
				// Cast rather than annotate: `@types/node` is not installed (see `svelte.config.js`), so
				// the inferred request type carries neither `url` nor connect's `originalUrl`.
				const request = req as unknown as { url?: string; originalUrl?: string };
				const match =
					request.url?.match(/^(\/games\/[^/?#]+)\/?(\?[^#]*)?$/) ??
					// Moxel is the one vendored app mounted at the root (scripts/build-moxel.mjs).
					request.url?.match(/^(\/Moxel)\/?(\?[^#]*)?$/);
				if (match && (vendoredGamePaths.includes(match[1]) || match[1] === '/Moxel')) {
					const rewritten = `${match[1]}/index.html${match[2] ?? ''}`;
					request.url = rewritten;
					// `originalUrl` too, not just `url`: connect stamps it when the stack starts, and
					// SvelteKit's dev handler reconstructs the request URL from `originalUrl ?? url`.
					request.originalUrl = rewritten;
				}
				next();
			});
		}
	};
}

export default defineConfig({
	plugins: [serveVendoredGameIndexes(), sveltekit()],
	server: { proxy: devProxy }
});
