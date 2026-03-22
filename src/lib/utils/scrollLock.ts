let locks = 0;

let savedScrollY = 0;
let prevOverflow = '';
let prevPosition = '';
let prevTop = '';
let prevWidth = '';

export function lockScroll() {
	locks += 1;
	if (locks > 1) return;

	savedScrollY = window.scrollY;
	prevOverflow = document.body.style.overflow;
	prevPosition = document.body.style.position;
	prevTop = document.body.style.top;
	prevWidth = document.body.style.width;

	document.body.style.overflow = 'hidden';
	document.body.style.position = 'fixed';
	document.body.style.top = `-${savedScrollY}px`;
	document.body.style.width = '100%';
}

export function unlockScroll() {
	if (locks === 0) return;
	locks -= 1;
	if (locks > 0) return;

	document.body.style.overflow = prevOverflow;
	document.body.style.position = prevPosition;
	document.body.style.top = prevTop;
	document.body.style.width = prevWidth;
	window.scrollTo(0, savedScrollY);
}

/** Clears scroll lock if it gets stuck (e.g. HMR). Fixes “top of page missing” when body stayed position:fixed. */
export function resetScrollLock() {
	locks = 0;
	prevOverflow = '';
	prevPosition = '';
	prevTop = '';
	prevWidth = '';
	savedScrollY = 0;
	if (typeof document === 'undefined') return;
	document.body.style.removeProperty('overflow');
	document.body.style.removeProperty('position');
	document.body.style.removeProperty('top');
	document.body.style.removeProperty('width');
}

