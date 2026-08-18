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

/** Replaces any toast already on screen; the previous timer is cancelled, not left to race. */
export function showToast(message: string, durationMs = 2500) {
	if (timer !== undefined) clearTimeout(timer);
	toast.message = message;
	timer = setTimeout(() => {
		toast.message = null;
		timer = undefined;
	}, durationMs);
}

export function dismissToast() {
	if (timer !== undefined) clearTimeout(timer);
	timer = undefined;
	toast.message = null;
}
