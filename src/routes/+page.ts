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

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('/github-contrib.json', { headers: { Accept: 'application/json' } });
		const body = (await res.json()) as GithubContribPayload;
		if (!res.ok) throw new Error(body?.error ?? `Failed to load GitHub contributions (${res.status})`);
		if (body?.error) throw new Error(body.error);

		const rawYears = Array.isArray(body?.years)
			? body.years
			: body?.year && Array.isArray(body?.weeks)
				? [{ year: body.year, totalContributions: body.totalContributions ?? 0, weeks: body.weeks }]
				: [];
		const years = sanitizeYears(rawYears);
		if (years.length === 0) throw new Error('No contribution years found.');

		const requestedYear =
			typeof body.currentYear === 'number' && Number.isFinite(body.currentYear) ? body.currentYear : null;
		const selectedYear = requestedYear && years.some((year) => year.year === requestedYear) ? requestedYear : years[0].year;

		return {
			contribYears: years,
			contribSelectedYear: selectedYear,
			contribError: null
		};
	} catch (e) {
		return {
			contribYears: [],
			contribSelectedYear: null,
			contribError: e instanceof Error ? e.message : 'Failed to load GitHub contributions.'
		};
	}
};

