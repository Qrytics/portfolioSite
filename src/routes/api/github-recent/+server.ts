import { json } from '@sveltejs/kit';
import { profile } from '$lib/data/profile';
import { env } from '$env/dynamic/private';

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

function getGithubUserFromProfile(): string {
	return new URL(profile.github).pathname.replace('/', '');
}

function isWithinLastWeek(iso: string): boolean {
	const t = Date.parse(iso);
	if (!Number.isFinite(t)) return false;
	return t >= Date.now() - 7 * 24 * 60 * 60 * 1000;
}

function friendlyError(status: number, messageFromApi?: string): string {
	if (messageFromApi) {
		// GitHub typically includes helpful strings like "API rate limit exceeded..."
		return `GitHub: ${messageFromApi}`;
	}
	if (status === 403) return 'GitHub is blocking requests right now (403).';
	if (status === 401) return 'GitHub authentication failed (401).';
	if (status === 404) return 'GitHub user/profile not found.';
	return `GitHub request failed (${status}).`;
}

// Simple in-memory cache to avoid hammering the GitHub API.
let cachedAtMs: number | null = null;
let cachedRepos: Repo[] | null = null;
const CACHE_MS = 5 * 60 * 1000; // 5 minutes

export const GET = async () => {
	const githubUser = getGithubUserFromProfile();

	if (cachedAtMs != null && cachedRepos != null && Date.now() - cachedAtMs < CACHE_MS) {
		return json({ repos: cachedRepos });
	}

	try {
		const token = env.GITHUB_TOKEN;

		const res = await fetch(
			`https://api.github.com/users/${githubUser}/repos?sort=pushed&per_page=100`,
			{
				headers: {
					Accept: 'application/vnd.github+json',
					// GitHub may be stricter without an explicit UA header.
					'User-Agent': 'portfolioSite',
					...(token ? { Authorization: `Bearer ${token}` } : {})
				}
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

			return json({
				repos: [],
				error: friendlyError(res.status, apiMessage)
			});
		}

		const data = (await res.json()) as Repo[];
		const repos = data
			.filter((r) => !r.private && !r.fork)
			.filter((r) => isWithinLastWeek(r.pushed_at));

		cachedAtMs = Date.now();
		cachedRepos = repos;

		return json({ repos });
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Failed to load GitHub activity.';
		return json({ repos: [], error: message });
	}
};

