import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Root-hosted site: never derive base from nested HTML paths
		paths: {
			relative: false
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html'
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
				// Ignore static game paths so the build doesn't fail
				if (path.startsWith('/games/garticDraw') || path.startsWith('/games/aimTrainer')) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
