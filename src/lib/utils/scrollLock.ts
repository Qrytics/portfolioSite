let locks = 0;

let prevOverflow = '';
let prevOverflowY = '';

export function lockScroll() {
	locks += 1;
	if (locks > 1) return;

	prevOverflow = document.body.style.overflow;
	prevOverflowY = document.body.style.overflowY;

	// Keep this simple and robust: avoid fixed/top offset locking, which can get
	// stuck and shift the whole page out of view after route/hash transitions.
	document.body.style.overflow = 'hidden';
	document.body.style.overflowY = 'hidden';
}

export function unlockScroll() {
	if (locks === 0) return;
	locks -= 1;
	if (locks > 0) return;

	document.body.style.overflow = prevOverflow;
	document.body.style.overflowY = prevOverflowY;
}

/** Clears scroll lock if it gets stuck (e.g. HMR or interrupted route transitions). */
export function resetScrollLock() {
	locks = 0;
	prevOverflow = '';
	prevOverflowY = '';
	if (typeof document === 'undefined') return;
	document.body.style.removeProperty('overflow');
	document.body.style.removeProperty('overflow-y');
}

