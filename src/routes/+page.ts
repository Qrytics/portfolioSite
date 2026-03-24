import { base } from '$app/paths';
import type { PageLoad } from './$types';

type ContributionDay = {
	date: string;
	contributionCount: number;
	color?: string | null;
};

type ContributionWeek = {
	contributionDays: ContributionDay[];
};

type GithubContribData = {
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

type RecentRepo = {
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

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function sanitizeYears(maybeYears: unknown): GithubContribData[] {
	if (!Array.isArray(maybeYears)) return [];

	return maybeYears
		.map((yearEntry): GithubContribData | null => {
			if (!isRecord(yearEntry) || typeof yearEntry.year !== 'number' || !Number.isFinite(yearEntry.year)) {
				return null;
			}

			const weeksRaw = Array.isArray(yearEntry.weeks) ? yearEntry.weeks : [];
			const weeks: ContributionWeek[] = weeksRaw
				.map((week): ContributionWeek | null => {
					if (!isRecord(week) || !Array.isArray(week.contributionDays)) return null;

					const contributionDays: ContributionDay[] = week.contributionDays
						.map((day): ContributionDay | null => {
							if (!isRecord(day) || typeof day.date !== 'string' || typeof day.contributionCount !== 'number') {
								return null;
							}

							if (!Number.isFinite(day.contributionCount) || day.contributionCount < 0) return null;
							if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date)) return null;

							return {
								date: day.date,
								contributionCount: day.contributionCount,
								color: typeof day.color === 'string' ? day.color : null
							};
						})
						.filter((day): day is ContributionDay => day !== null);

					return { contributionDays };
				})
				.filter((week): week is ContributionWeek => week !== null);

			return {
				year: yearEntry.year,
				totalContributions:
					typeof yearEntry.totalContributions === 'number' && Number.isFinite(yearEntry.totalContributions)
						? yearEntry.totalContributions
						: 0,
				weeks
			};
		})
		.filter((entry): entry is GithubContribData => entry !== null)
		.sort((a, b) => b.year - a.year);
}

function sanitizeRecentRepos(maybeRepos: unknown): RecentRepo[] {
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

export const load: PageLoad = async ({ fetch }) => {
	let contribYears: GithubContribData[] = [];
	let contribSelectedYear: number | null = null;
	let contribError: string | null = null;

	let recentRepos: RecentRepo[] = [];
	let recentReposError: string | null = null;

	try {
		const res = await fetch(withBase('/github-contrib.json'), { headers: { Accept: 'application/json' } });
		const body = (await res.json()) as GithubContribPayload;
		if (!res.ok) throw new Error(body?.error ?? `Failed to load GitHub contributions (${res.status})`);
		if (body?.error) throw new Error(body.error);

		const rawYears = Array.isArray(body?.years)
			? body.years
			: body?.year && Array.isArray(body?.weeks)
				? [{ year: body.year, totalContributions: body.totalContributions ?? 0, weeks: body.weeks }]
				: [];
		const sanitizedYears = sanitizeYears(rawYears);
		const years = sanitizedYears.length > 0 ? sanitizedYears : fallbackContributionYears(body);

		const requestedYear =
			typeof body.currentYear === 'number' && Number.isFinite(body.currentYear) ? body.currentYear : null;
		const selectedYear = requestedYear && years.some((year) => year.year === requestedYear) ? requestedYear : years[0].year;

		contribYears = years;
		contribSelectedYear = selectedYear;
	} catch (e) {
		contribError = e instanceof Error ? e.message : 'Failed to load GitHub contributions.';
	}

	try {
		const res = await fetch(withBase('/github-recent.json'), { headers: { Accept: 'application/json' } });
		const body = (await res.json()) as GithubRecentPayload;
		if (!res.ok) throw new Error(body?.error ?? `Failed to load recent GitHub activity (${res.status})`);
		if (body?.error) throw new Error(body.error);

		recentRepos = sanitizeRecentRepos(body?.repos);
	} catch (e) {
		recentReposError = e instanceof Error ? e.message : 'Failed to load recent GitHub activity.';
	}

	return {
		contribYears,
		contribSelectedYear,
		contribError,
		recentRepos,
		recentReposError
	};
};

