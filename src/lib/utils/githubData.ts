import { base } from '$app/paths';
import {
	isRecord,
	sanitizeContributionWeeks,
	sanitizeTotal,
	type ContributionDay,
	type ContributionWeek
} from '$lib/utils/contribShape';

/**
 * GitHub data loading for the home page, moved out of `+page.ts`.
 *
 * It used to run inside `load` with `prerender = false`, so every home-page request blocked its
 * first byte on `/api/github-contrib` — which is itself five GraphQL round trips — plus
 * `/api/github-recent`, plus a static-JSON fallback fetch for each on failure. None of that work
 * reached the server-rendered HTML: both consumers sat behind a `requestIdleCallback` gate, so the
 * markup shipped without them regardless. The page now prerenders to a static file and calls these
 * from the client after mount, which removes the fetches from the critical path entirely.
 */

// Re-exported so the chart and `+page.svelte` keep importing their day/week types from one place.
export type { ContributionDay, ContributionWeek };

export type GithubContribData = {
	year: number;
	totalContributions: number;
	weeks: ContributionWeek[];
};

type GithubContribPayload = {
	currentYear?: number;
	years?: GithubContribData[];
	year?: number;
	totalContributions?: number;
	weeks?: ContributionWeek[];
	error?: string;
};

export type RecentRepo = {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	pushed_at: string;
	private: boolean;
	fork: boolean;
};

type GithubRecentPayload = {
	repos?: RecentRepo[];
	error?: string;
};

export function sanitizeYears(maybeYears: unknown): GithubContribData[] {
	if (!Array.isArray(maybeYears)) return [];

	return maybeYears
		.map((yearEntry): GithubContribData | null => {
			if (!isRecord(yearEntry) || typeof yearEntry.year !== 'number' || !Number.isFinite(yearEntry.year)) {
				return null;
			}

			return {
				year: yearEntry.year,
				totalContributions: sanitizeTotal(yearEntry.totalContributions),
				// `requireDaysArray`: this validates a *fetched payload*, so a week without a
				// `contributionDays` array means the file is malformed and the week is dropped.
				weeks: sanitizeContributionWeeks(yearEntry.weeks, { requireDaysArray: true })
			};
		})
		.filter((entry): entry is GithubContribData => entry !== null)
		.sort((a, b) => b.year - a.year);
}

export function sanitizeRecentRepos(maybeRepos: unknown): RecentRepo[] {
	if (!Array.isArray(maybeRepos)) return [];

	return maybeRepos
		.map((repo): RecentRepo | null => {
			if (!isRecord(repo)) return null;
			if (typeof repo.id !== 'number' || !Number.isFinite(repo.id)) return null;
			if (typeof repo.name !== 'string' || repo.name.length === 0) return null;
			if (typeof repo.full_name !== 'string' || repo.full_name.length === 0) return null;
			if (typeof repo.html_url !== 'string' || !repo.html_url.startsWith('http')) return null;
			if (typeof repo.pushed_at !== 'string' || Number.isNaN(Date.parse(repo.pushed_at))) return null;

			return {
				id: repo.id,
				name: repo.name,
				full_name: repo.full_name,
				html_url: repo.html_url,
				description: typeof repo.description === 'string' ? repo.description : null,
				pushed_at: repo.pushed_at,
				private: Boolean(repo.private),
				fork: Boolean(repo.fork)
			};
		})
		.filter((repo): repo is RecentRepo => repo !== null);
}

function withBase(path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalized}`;
}

function fallbackContributionYears(payload: GithubContribPayload): GithubContribData[] {
	const fallbackYear =
		typeof payload.currentYear === 'number' && Number.isFinite(payload.currentYear)
			? payload.currentYear
			: typeof payload.year === 'number' && Number.isFinite(payload.year)
				? payload.year
				: new Date().getUTCFullYear();

	const fallbackTotal =
		typeof payload.totalContributions === 'number' && Number.isFinite(payload.totalContributions)
			? payload.totalContributions
			: 0;

	return [
		{
			year: fallbackYear,
			totalContributions: fallbackTotal,
			weeks: []
		}
	];
}

function yearsFromPayload(payload: GithubContribPayload): GithubContribData[] {
	// The route can answer with either the multi-year shape or a single flattened year.
	if (Array.isArray(payload?.years)) return payload.years;
	if (payload?.year && Array.isArray(payload?.weeks)) {
		return [{ year: payload.year, totalContributions: payload.totalContributions ?? 0, weeks: payload.weeks }];
	}
	return [];
}

export type ContribResult = { contribYears: GithubContribData[]; contribError: string | null };
export type RecentResult = { recentRepos: RecentRepo[]; recentReposError: string | null };

export async function loadContrib(fetchImpl: typeof globalThis.fetch = fetch): Promise<ContribResult> {
	let contribYears: GithubContribData[] = [];
	let contribError: string | null = null;

	try {
		// Prefer live API-backed data; fall back to static JSON if unavailable.
		const res = await fetchImpl(withBase('/api/github-contrib'), { headers: { Accept: 'application/json' } });
		const body = (await res.json()) as GithubContribPayload;
		if (!res.ok) throw new Error(body?.error ?? `Failed to load GitHub contributions (${res.status})`);

		const sanitizedYears = sanitizeYears(yearsFromPayload(body));
		contribYears = sanitizedYears.length > 0 ? sanitizedYears : fallbackContributionYears(body);
		contribError = body?.error ?? null;
	} catch (e) {
		try {
			const fallbackRes = await fetchImpl(withBase('/github-contrib.json'), {
				headers: { Accept: 'application/json' }
			});
			const fallbackBody = (await fallbackRes.json()) as GithubContribPayload;
			if (!fallbackRes.ok) {
				throw new Error(
					fallbackBody?.error ?? `Failed to load fallback GitHub contributions (${fallbackRes.status})`
				);
			}

			const sanitizedYears = sanitizeYears(yearsFromPayload(fallbackBody));
			contribYears = sanitizedYears.length > 0 ? sanitizedYears : fallbackContributionYears(fallbackBody);
			// The static file is a complete, valid dataset — just possibly a little stale. Surfacing
			// the live-fetch failure on top of it would render an error box over good data.
			contribError = fallbackBody?.error ?? null;
			if (import.meta.env.DEV) {
				console.debug('GitHub contributions: served static fallback.', e);
			}
		} catch (fallbackError) {
			contribError =
				fallbackError instanceof Error ? fallbackError.message : 'Failed to load GitHub contributions.';
		}
	}

	return { contribYears, contribError };
}

export async function loadRecent(fetchImpl: typeof globalThis.fetch = fetch): Promise<RecentResult> {
	let recentRepos: RecentRepo[] = [];
	let recentReposError: string | null = null;

	try {
		// Prefer API endpoint (fresh data + token-aware), fallback to static JSON.
		const res = await fetchImpl(withBase('/api/github-recent'), { headers: { Accept: 'application/json' } });
		const body = (await res.json()) as GithubRecentPayload;
		if (!res.ok) throw new Error(body?.error ?? `Failed to load recent GitHub activity (${res.status})`);

		recentRepos = sanitizeRecentRepos(body?.repos);
		recentReposError = body?.error ?? null;
	} catch (e) {
		try {
			const fallbackRes = await fetchImpl(withBase('/github-recent.json'), {
				headers: { Accept: 'application/json' }
			});
			const fallbackBody = (await fallbackRes.json()) as GithubRecentPayload;
			if (!fallbackRes.ok) {
				throw new Error(
					fallbackBody?.error ?? `Failed to load fallback recent GitHub activity (${fallbackRes.status})`
				);
			}

			recentRepos = sanitizeRecentRepos(fallbackBody?.repos);
			recentReposError = fallbackBody?.error ?? null;
			if (import.meta.env.DEV) {
				console.debug('GitHub recent activity: served static fallback.', e);
			}
		} catch (fallbackError) {
			recentReposError =
				fallbackError instanceof Error ? fallbackError.message : 'Failed to load recent GitHub activity.';
		}
	}

	return { recentRepos, recentReposError };
}
