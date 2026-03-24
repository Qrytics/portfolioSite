import { base } from '$app/paths';

function toAppPath(pathname: string): string {
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return `${base}${path}`;
}

/**
 * Router-aware internal navigation. Respects `kit.paths.base`.
 */
export function assignAppLocation(pathname: string) {
	if (typeof window === 'undefined') return;
	window.location.assign(toAppPath(pathname));
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
