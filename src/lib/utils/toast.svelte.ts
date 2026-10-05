/**
 * One app-wide toast, rendered once by `+layout.svelte`.
 *
 * `Hero`, `Footer` and `Contact` each carried a byte-identical copy of this timer logic *and* a
 * byte-identical `position: fixed; bottom: 2rem; left: 50%` panel. Hero and Footer are both on the
 * home page, so copying the email from the hero and then from the footer inside the 2.5 s dismiss
 * window rendered two toasts in the exact same pixels, one behind the other. Three independent
 * `aria-live` regions also meant three chances to announce, in whichever order the components
 * happened to mount.
 *
 * `.svelte.ts` rather than `.ts`: runes are only compiled in `.svelte` and `.svelte.ts` modules.
 * The state is an object rather than an exported `let`, because Svelte 5 refuses to export a reassigned
 * `$state` binding from a module — consumers read `toast.message`.
 */
export const toast = $state<{ message: string | null }>({ message: null });

let timer: ReturnType<typeof setTimeout> | undefined;

function schedule(durationMs: number) {
	if (timer !== undefined) clearTimeout(timer);
	timer = setTimeout(() => {
		toast.message = null;
		timer = undefined;
	}, durationMs);
}

/**
 * Replaces any toast already on screen; the previous timer is cancelled, not left to race.
 *
 * Showing the *same* text again (copying the email twice) used to be a no-op for screen readers:
 * the live region's content never changed, so there was nothing to announce. Clearing it for one
 * frame first makes the repeat a real change.
 */
export function showToast(message: string, durationMs = 2500) {
	if (toast.message === message && typeof requestAnimationFrame !== 'undefined') {
		toast.message = null;
		requestAnimationFrame(() => {
			toast.message = message;
			schedule(durationMs);
		});
		return;
	}
	toast.message = message;
	schedule(durationMs);
}

export function dismissToast() {
	if (timer !== undefined) clearTimeout(timer);
	timer = undefined;
	toast.message = null;
}
