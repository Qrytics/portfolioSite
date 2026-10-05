let locks = 0;
/**
 * Bumped by `resetScrollLock`. A lock taken before a reset must not be able to release one taken
 * after it: the layout resets on every navigation, so an overlay that unmounted *after* the reset
 * (and after a new overlay locked) used to decrement the new holder's count to zero and unlock the
 * page behind it.
 */
let generation = 0;

let prevOverflow = '';
let prevOverflowY = '';

/** Returns a token; pass it back to `unlockScroll` so a stale release is ignored. */
export function lockScroll(): number {
	locks += 1;
	if (locks > 1) return generation;

	prevOverflow = document.body.style.overflow;
	prevOverflowY = document.body.style.overflowY;

	// Keep this simple and robust: avoid fixed/top offset locking, which can get
	// stuck and shift the whole page out of view after route/hash transitions.
	document.body.style.overflow = 'hidden';
	document.body.style.overflowY = 'hidden';
	return generation;
}

export function unlockScroll(token: number = generation) {
	if (token !== generation) return;
	if (locks === 0) return;
	locks -= 1;
	if (locks > 0) return;

	document.body.style.overflow = prevOverflow;
	document.body.style.overflowY = prevOverflowY;
}

/** Clears scroll lock if it gets stuck (e.g. HMR or interrupted route transitions). */
export function resetScrollLock() {
	generation += 1;
	locks = 0;
	prevOverflow = '';
	prevOverflowY = '';
	if (typeof document === 'undefined') return;
	document.body.style.removeProperty('overflow');
	document.body.style.removeProperty('overflow-y');
}

