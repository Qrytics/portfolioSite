import { base } from '$app/paths';
import { goto } from '$app/navigation';

function toAppPath(pathname: string): string {
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return `${base}${path}`;
}

/**
 * Router-aware internal navigation. Respects `kit.paths.base`.
 *
 * This used to call `window.location.assign`, i.e. a full document reload, from the three places that
 * navigate programmatically — `Nav`, `Search`, and `Terminal`. Every in-app navigation therefore
 * re-downloaded the entire shell instead of fetching a route's data, and it discarded the
 * `data-sveltekit-preload-data="hover"` prefetching configured in `app.html`, so a link that had
 * already been prefetched on hover still paid a cold document load on click.
 *
 * `goto` also gives SvelteKit's scroll restoration something to restore *to*, which is what makes
 * pressing Back from a project page return you to the card you clicked rather than the top of the
 * home page.
 */
export function assignAppLocation(pathname: string) {
	if (typeof window === 'undefined') return;
	void goto(toAppPath(pathname));
}

/**
 * Same UX as internal link clicks while preserving modifier-click defaults.
 */
export function navigateInternal(e: MouseEvent, pathname: string) {
	if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
	if (e.button !== 0) return;
	e.preventDefault();
	assignAppLocation(pathname);
}
