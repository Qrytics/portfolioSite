/**
 * The site's hidden interactions, and the "N / M found" game that ties them together.
 *
 * Every easter egg calls `discover(id)` when someone finds it. The first time, that persists the id
 * (via `safeStorage`, so private browsing degrades to "this visit only" rather than throwing), plays
 * a chime and toasts "secret found · 3/11". The footer counter and the terminal's `secrets` command
 * both read `secrets.found`, so there is one source of truth for progress.
 *
 * `discover` must only ever be called from a genuine user interaction — it plays a sound, and sounds
 * on this site never fire from scroll or an observer.
 */
import { getLocalItem, setLocalItem } from './safeStorage';
import { playSound } from './sound';
import { showToast } from './toast.svelte';

export type SecretId =
	| 'matrix'
	| 'sudo'
	| 'handle'
	| 'tagline'
	| 'disco'
	| 'timeline'
	| 'combo'
	| 'demolition'
	| 'portrait'
	| 'rocket'
	| 'console';

export interface Secret {
	id: SecretId;
	name: string;
	/** Shown by the footer hint button and `secrets` for anything not yet found. */
	hint: string;
}

/** Order is the order `secrets` lists them in; roughly easiest first. */
export const SECRETS: readonly Secret[] = [
	{ id: 'rocket', name: 'liftoff', hint: 'some buttons do more than they say. try the one at the very bottom.' },
	{ id: 'tagline', name: 'loose letters', hint: 'the big headline on the home page is not glued down.' },
	{ id: 'timeline', name: 'time traveler', hint: 'every dot on the timeline wants to be poked. all of them.' },
	{ id: 'portrait', name: 'say cheese', hint: 'keep tapping the portrait. like, a lot.' },
	{ id: 'combo', name: 'tag combo', hint: 'tech tags on project cards pop. chain five, fast.' },
	{ id: 'demolition', name: 'demolition crew', hint: 'the commit chart is fragile. break ten days of it.' },
	{ id: 'handle', name: 'segfault', hint: 'the name in the top-left corner can only take so many clicks.' },
	{ id: 'disco', name: 'light switch rave', hint: 'flip between light and dark faster than is reasonable.' },
	{ id: 'sudo', name: 'nice try', hint: 'the terminal has commands it will not tell you about. ask it for root.' },
	{ id: 'matrix', name: 'red pill', hint: '↑ ↑ ↓ ↓ ← → ← → b a  — or just ask the terminal for the matrix.' },
	{ id: 'console', name: 'view source', hint: 'developers: your browser console has a message for you.' }
];

const STORAGE_KEY = 'secrets-found';
const known = new Set<string>(SECRETS.map((s) => s.id));

export const secrets = $state<{ found: SecretId[]; ready: boolean }>({ found: [], ready: false });

/**
 * Read once, on demand, in the browser. Not at module load: the module is imported by components
 * that also render on the server, where storage does not exist.
 */
export function loadSecrets() {
	if (secrets.ready || typeof window === 'undefined') return;
	secrets.ready = true;
	try {
		const raw = JSON.parse(getLocalItem(STORAGE_KEY) ?? '[]');
		if (Array.isArray(raw)) secrets.found = raw.filter((id): id is SecretId => known.has(id));
	} catch {
		secrets.found = [];
	}
}

export function isFound(id: SecretId): boolean {
	loadSecrets();
	return secrets.found.includes(id);
}

/** Returns true only the first time `id` is found. */
export function discover(id: SecretId): boolean {
	loadSecrets();
	if (secrets.found.includes(id)) return false;
	secrets.found = [...secrets.found, id];
	setLocalItem(STORAGE_KEY, JSON.stringify(secrets.found));

	const secret = SECRETS.find((s) => s.id === id);
	const n = secrets.found.length;
	const total = SECRETS.length;
	if (n === total) {
		playSound('game-start', 0.8);
		showToast(`🏆 all ${total} secrets found. you are thorough. hire-able, even.`, 6000);
	} else {
		playSound('typing-complete', 0.7);
		showToast(`secret found: ${secret?.name ?? id} · ${n}/${total}`, 3500);
	}
	return true;
}

/** A hint for something not yet found, rotating so repeated taps don't repeat themselves. */
let hintCursor = 0;
export function nextHint(): string | null {
	loadSecrets();
	const missing = SECRETS.filter((s) => !secrets.found.includes(s.id));
	if (missing.length === 0) return null;
	const pick = missing[hintCursor % missing.length];
	hintCursor++;
	return pick.hint;
}

export function prefersReducedMotion(): boolean {
	return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Counts presses inside a sliding window: "N clicks within T ms". Every rapid-tap secret uses one,
 * so they all agree on what "fast" means.
 */
export function burstCounter(needed: number, windowMs: number) {
	let times: number[] = [];
	return {
		/** Record a press; true when this press completes a burst (and resets the count). */
		hit(): boolean {
			const now = performance.now();
			times = [...times.filter((t) => now - t < windowMs), now];
			if (times.length >= needed) {
				times = [];
				return true;
			}
			return false;
		},
		get count() {
			const now = performance.now();
			return times.filter((t) => now - t < windowMs).length;
		}
	};
}

/**
 * The Matrix overlay is owned by `+layout.svelte`, but two things open it: the Konami code (layout)
 * and the terminal's `matrix` command. One shared flag instead of an event bus.
 */
export const overlays = $state<{ matrix: boolean }>({ matrix: false });
