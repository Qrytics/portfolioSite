/**
 * `new URL()` throws on a malformed string. Called inline in markup that throws during render and
 * takes the whole route to an error boundary, so every call site needs the try/catch — which is
 * why it lives here once instead of being re-written per component.
 */
export function isGitHubRepo(url: string | undefined | null): boolean {
	if (!url) return false;
	try {
		const { hostname } = new URL(url);
		return hostname === 'github.com' || hostname.endsWith('.github.com');
	} catch {
		return false;
	}
}

/**
 * The video id from a YouTube watch, short (`youtu.be`) or embed URL, or `null` for anything else —
 * including a malformed string, which is the case `new URL()` in markup used to take to the error
 * boundary. Shared by `ProjectCard` and the project detail page.
 */
export function getYouTubeId(url: string | undefined | null): string | null {
	if (!url) return null;
	try {
		const u = new URL(url);
		if (u.hostname === 'youtu.be') return u.pathname.replace('/', '') || null;
		if (u.hostname.endsWith('youtube.com')) {
			if (u.pathname.startsWith('/embed/')) return u.pathname.replace('/embed/', '') || null;
			return u.searchParams.get('v') || null;
		}
		return null;
	} catch {
		return null;
	}
}
