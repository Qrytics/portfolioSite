import { json } from '@sveltejs/kit';
import { getGithubUser } from '$lib/utils/githubUser';
import { env } from '$env/dynamic/private';

export const prerender = false;

type Repo = {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	pushed_at: string;
	private: boolean;
	fork: boolean;
};

function isWithinLastWeek(iso: string): boolean {
	const t = Date.parse(iso);
	if (!Number.isFinite(t)) return false;
	return t >= Date.now() - 7 * 24 * 60 * 60 * 1000;
}

/**
 * Nothing from GitHub's response body reaches the browser. Its messages *look* safe — they are
 * written for API consumers — but the rate-limit one reads "API rate limit exceeded for
 * <egress IP>", and on the Pi that is the home IP the Cloudflare tunnel exists to hide. This route is
 * publicly fetchable, so the message is logged and the status mapped to fixed text instead.
 * `CurrentlyBuilding.svelte` renders the returned string verbatim.
 */
function friendlyError(status: number, messageFromApi?: string): string {
	if (messageFromApi) console.error(`[github-recent] GitHub ${status}:`, messageFromApi);
	if (status === 403 || status === 429) return 'GitHub is rate-limiting requests right now.';
	if (status === 401) return 'GitHub authentication failed.';
	if (status === 404) return 'GitHub user/profile not found.';
	return 'GitHub activity is temporarily unavailable.';
}

function safeError(context: string, detail: unknown): string {
	console.error(`[github-recent] ${context}:`, detail);
	return 'GitHub activity is temporarily unavailable.';
}

const CACHE_MS = 5 * 60 * 1000;
const ERROR_CACHE_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

type Result = { repos: Repo[]; error?: string };

let cachedAtMs: number | null = null;
let cachedResult: Result | null = null;
let inFlight: Promise<Result> | null = null;
/** Last successful result, served through an error window instead of an empty list (see contrib). */
let lastGood: Result | null = null;

async function fetchRecent(): Promise<Result> {
	const githubUser = getGithubUser();
	// Everything else in the repo prefers GH_TOKEN; this route only read GITHUB_TOKEN, so with
	// only GH_TOKEN configured it ran anonymously at 60 req/hr per egress IP.
	const token = env.GH_TOKEN || env.GITHUB_TOKEN;

	try {
		const res = await fetch(
			`https://api.github.com/users/${encodeURIComponent(githubUser)}/repos?sort=pushed&per_page=100`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					// GitHub may be stricter without an explicit UA header.
					'User-Agent': 'portfolioSite',
					...(token ? { Authorization: `Bearer ${token}` } : {})
				},
				signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
			}
		);

		if (!res.ok) {
			let apiMessage: string | undefined;
			try {
				const body = (await res.json()) as { message?: string };
				apiMessage = body?.message;
			} catch {
				apiMessage = undefined;
			}
			return { repos: [], error: friendlyError(res.status, apiMessage) };
		}

		// GitHub returns an object (not an array) on some 200s; the unchecked `as Repo[]` cast
		// meant `.filter` threw a TypeError straight into the catch below.
		const data: unknown = await res.json();
		if (!Array.isArray(data)) {
			return { repos: [], error: safeError('unexpected response shape', data) };
		}

		// Project down to the fields `CurrentlyBuilding` actually reads. GitHub's `/user/repos` returns
		// 81 keys per repo — every `*_url` template, the full `owner` object, permissions, licence — and
		// this route used to forward all of it: 20,132 bytes for the same 4 repos that
		// `scripts/update-github-recent.mjs` serialises to 1,197 bytes, because that script already
		// projects and this one only filtered.
		const repos: Repo[] = (data as Repo[])
			.filter((r) => !r.private && !r.fork)
			.filter((r) => isWithinLastWeek(r.pushed_at))
			.map((r) => ({
				id: r.id,
				name: r.name,
				full_name: r.full_name,
				html_url: r.html_url,
				description: r.description ?? null,
				pushed_at: r.pushed_at,
				private: r.private,
				fork: r.fork
			}));

		return { repos };
	} catch (e) {
		return { repos: [], error: safeError('fetch failed', e) };
	}
}

export const GET = async ({ setHeaders }) => {
	const ttl = cachedResult?.error ? ERROR_CACHE_MS : CACHE_MS;

	let result: Result;
	if (cachedAtMs != null && cachedResult != null && Date.now() - cachedAtMs < ttl) {
		result = cachedResult;
	} else {
		inFlight ??= fetchRecent().then((r) => {
			cachedAtMs = Date.now();
			cachedResult = r;
			if (!r.error) lastGood = r;
			inFlight = null;
			return r;
		});
		try {
			result = await inFlight;
		} catch (e) {
			inFlight = null;
			result = { repos: [], error: safeError('unexpected failure', e) };
		}
	}

	if (result.error && lastGood) {
		// Re-filter: a repo pushed six days ago when this was cached may be past the window now.
		setHeaders({ 'Cache-Control': 'public, s-maxage=60' });
		return json({ repos: lastGood.repos.filter((r) => isWithinLastWeek(r.pushed_at)) });
	}

	if (result.error) {
		// Real status code, so `githubData.ts`'s `!res.ok` guard can fall through to the static JSON.
		setHeaders({ 'Cache-Control': 'public, s-maxage=60' });
		return json(result, { status: 503 });
	}

	setHeaders({ 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400' });
	return json(result);
};
