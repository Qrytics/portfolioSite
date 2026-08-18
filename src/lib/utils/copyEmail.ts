import { profile } from '$lib/data/profile';
import { showToast } from './toast.svelte';

/**
 * Shared by the hero, the footer and the contact card, which had three copies of it.
 *
 * `try`/`await` rather than the previous `.then().catch()` chain for a reason beyond style: on an
 * insecure origin (and in a few embedded webviews) `navigator.clipboard` is `undefined` altogether,
 * so `navigator.clipboard.writeText(...)` throws a `TypeError` *synchronously* — before any promise
 * exists for `.catch()` to attach to. The old version let that one escape as an unhandled error with
 * no toast at all, which is precisely the case the fallback message was written for.
 */
export async function copyEmail() {
	try {
		await navigator.clipboard.writeText(profile.email);
		showToast('email copied to clipboard', 2500);
	} catch (err) {
		console.warn('Clipboard write failed:', err);
		showToast('clipboard unavailable — the address is on screen', 3500);
	}
}
