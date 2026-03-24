/**
 * Svelte action that moves an element to document.body,
 * breaking out of any parent stacking context (e.g. sticky headers with z-index).
 * The element is returned to its original position on destroy.
 */
export function portal(node: HTMLElement) {
	const target = document.body;
	target.appendChild(node);

	return {
		destroy() {
			if (node.parentNode === target) {
				target.removeChild(node);
			}
		}
	};
}
