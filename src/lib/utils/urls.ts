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
