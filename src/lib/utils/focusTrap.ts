/**
 * Modal focus management, shared by `Search` and `Terminal`.
 *
 * Both dialogs previously had none of this: Tab walked straight out of the panel and into the page
 * behind it — which is still scrollable-locked and visually covered by the scrim, so the focus ring
 * disappeared entirely — and closing a dialog dropped focus onto `<body>`, so the next Tab restarted
 * from the skip link at the top of the document rather than from the trigger you just used.
 *
 * `MatrixOverlay` hand-rolls the same behaviour inline, but it has exactly one focusable node so its
 * trap is a one-liner (`Tab` → refocus the close button). Anything with a real tab ring needs this.
 */

/**
 * Deliberately does not include `[contenteditable]` or `audio/video[controls]`: neither appears in
 * these dialogs, and matching them would mean also reasoning about `inert` subtrees. Add them here
 * rather than in a caller if that changes.
 */
const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(',');

function isVisible(el: HTMLElement): boolean {
	// `offsetParent` is null for `display: none` subtrees, which is the case that matters here:
	// `Search`'s clear button and its result list both come and go as you type.
	return el.offsetParent !== null || el === document.activeElement;
}

function focusableWithin(node: HTMLElement): HTMLElement[] {
	return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
		.filter((el) => el.getAttribute('aria-hidden') !== 'true')
		.filter(isVisible);
}

/**
 * Svelte action. Keeps Tab focus inside `node` for as long as it is mounted, then returns focus to
 * whatever was focused before it mounted.
 *
 * The listener is on `document` in the capture phase rather than on `node`, so focus that has
 * already escaped — a stray programmatic `blur()`, a click on the scrim, the browser's own
 * find-in-page — is pulled back on the next Tab instead of being permanently lost.
 */
export function focusTrap(node: HTMLElement) {
	const previouslyFocused = document.activeElement as HTMLElement | null;

	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Tab' || event.defaultPrevented) return;
		if (!node.isConnected) return;

		const items = focusableWithin(node);
		if (items.length === 0) {
			// Nothing to focus, but Tab still must not leak into the page behind.
			event.preventDefault();
			return;
		}

		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;
		const inside = active instanceof Node && node.contains(active);

		if (event.shiftKey) {
			if (!inside || active === first) {
				event.preventDefault();
				last.focus();
			}
		} else if (!inside || active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	document.addEventListener('keydown', onKeydown, true);

	return {
		destroy() {
			document.removeEventListener('keydown', onKeydown, true);

			// `<body>` is the activeElement when the dialog was opened by keyboard shortcut from a page
			// with nothing focused; focusing it back is meaningless, and `focus()` on a non-tabbable
			// element is a silent no-op in some browsers anyway. Also guard against the trigger having
			// been removed from the DOM by a navigation while the dialog was open.
			if (
				previouslyFocused &&
				previouslyFocused !== document.body &&
				previouslyFocused.isConnected
			) {
				previouslyFocused.focus({ preventScroll: true });
			}
		}
	};
}
