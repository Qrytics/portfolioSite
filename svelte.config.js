import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Root-hosted site: never derive base from nested HTML paths (e.g. /projects/*.html),
		// or client-side nav breaks (e.g. /projects link resolves under wrong base → home).
		paths: {
			relative: false
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html'
		})
	}
};

export default config;
