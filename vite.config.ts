import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import { games } from './src/lib/data/games';

/**
 * The in-app game URLs, e.g. `/games/garticDraw/`. Two games are hosted at the production domain and
 * two are still `#` placeholders, so this is the subset with a same-origin path.
 */
const vendoredGamePaths = games
	.map((game) => game.playUrl)
	.filter((url) => url.startsWith('/games/'))
	.map((url) => url.replace(/\/+$/, ''));

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
				const match = request.url?.match(/^(\/games\/[^/?#]+)\/?(\?[^#]*)?$/);
				if (match && vendoredGamePaths.includes(match[1])) {
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
	plugins: [serveVendoredGameIndexes(), sveltekit()]
});
