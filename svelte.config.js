import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNode from '@sveltejs/adapter-node';
import { existsSync, readdirSync } from 'node:fs';

/**
 * The vendored game builds under `static/games/<slug>/index.html`.
 *
 * `/games` links to each of these as `/games/<slug>/`, and the prerenderer crawls those links but
 * resolves static assets by exact path — it has no notion of a directory index, so every one of them
 * looks like a 404 even though Vercel serves them correctly (verified against production:
 * `/games/garticDraw/` → 200). They therefore have to be excluded from `handleHttpError`.
 *
 * The same gap used to make every Play button 404 in `npm run dev`; that half is fixed properly by
 * the `serveVendoredGameIndexes` plugin in `vite.config.ts`, which rewrites the directory request to
 * its `index.html` before SvelteKit's static middleware sees it. The prerenderer runs in a separate
 * process with its own static resolution, so it still needs this list.
 *
 * Derived from the filesystem rather than hardcoded. The list used to be four literal slugs, and the
 * build broke the moment `paddleBall` was added — the failure mode being a hard build error on a
 * page nobody edited. Anything that is a directory with its own `index.html` is by definition one of
 * these sub-apps, so this stays correct as games come and go while still throwing for a genuine
 * broken link anywhere else.
 *
 * Deliberately not exported for `vite.config.ts` to reuse. This file is invisible to `npm run check`,
 * but `vite.config.ts` is checked, and `@types/node` is not installed — importing anything from here
 * would drag `node:fs` into the type-checked graph and cost a dependency to satisfy it. The dev-server
 * plugin derives its own list from `games.ts` instead, which is the right source for "links the app
 * actually renders" anyway; this one is the right source for "directories the crawler will hit".
 */
const vendoredGamePaths = existsSync('static/games')
	? readdirSync('static/games', { withFileTypes: true })
			.filter((e) => e.isDirectory() && existsSync(`static/games/${e.name}/index.html`))
			.map((e) => `/games/${e.name}`)
	: [];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Root-hosted site: never derive base from nested HTML paths
		paths: {
			relative: false
		},
		// Two adapters on purpose. The Raspberry Pi is the primary host — `ADAPTER=node` builds to
		// `build/` for a single long-lived Node process behind Caddy — and the Vercel project stays
		// deployed on its `*.vercel.app` URL as a fallback that is one DNS record away. Vercel is the
		// default so nothing about that fallback deployment has to know this variable exists.
		//
		// The long-lived process is also a real improvement for the two `/api/github-*` routes: their
		// module-level 30-minute memo actually persists, instead of being re-warmed per lambda.
		//
		// Vercel options are pinned rather than left bare. `runtime` otherwise tracks whatever Node the
		// build environment happens to be on, so a Vercel default bump silently changes production;
		// `regions` keeps the two API functions in one place instead of following the project default.
		//
		// Deliberately NOT setting `isr`. It looks like the right fit for the GitHub routes, but ISR
		// caches by URL for a fixed duration regardless of response status, so a 503 from a rate-limit
		// or a missing token would be frozen at the edge for the full expiration window. Both routes
		// already send `Cache-Control: s-maxage=...`, which Vercel's CDN honours for functions and
		// which *can* differ per status — 1800s on success, 60s on error. That's strictly better here.
		// The same trap is why no Cloudflare cache rule may cover `/api/*` on the Pi.
		adapter:
			process.env.ADAPTER === 'node'
				? adapterNode()
				: adapterVercel({
						runtime: 'nodejs22.x',
						regions: ['iad1']
					}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (vendoredGamePaths.some((prefix) => path.startsWith(prefix))) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
