import { profile } from '$lib/data/profile';

/**
 * Single source of truth for the GitHub username derived from `profile.github`.
 *
 * The previous per-route copies used `new URL(...).pathname.replace('/', '')`, which only
 * strips the *first* slash — so a trailing slash in `profile.github` yielded `"Qrytics/"`
 * and a malformed API URL.
 */
export function getGithubUser(): string {
	try {
		const segments = new URL(profile.github).pathname.split('/').filter(Boolean);
		if (segments.length > 0) return segments[0];
	} catch {
		// fall through to the error below
	}
	throw new Error(
		`Could not derive a GitHub username from profile.github ("${profile.github}"). It must be a full URL like https://github.com/<user>.`
	);
}
