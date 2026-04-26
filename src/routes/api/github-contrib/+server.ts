import { json } from '@sveltejs/kit';
import { profile } from '$lib/data/profile';
import { env } from '$env/dynamic/private';

export const prerender = false;

type ContributionDay = {
	date: string;
	contributionCount: number;
	color: string | null;
};

type ContributionWeek = {
	contributionDays: ContributionDay[];
};

type GithubContribData = {
	year: number;
	totalContributions: number;
	weeks: ContributionWeek[];
};

type GithubContribResponse = {
	currentYear: number;
	years: GithubContribData[];
	error?: string;
};

const CACHE_MS = 30 * 60 * 1000;

let cachedAtMs: number | null = null;
let cachedPayload: GithubContribResponse | null = null;

function getGithubUserFromProfile(): string {
	return new URL(profile.github).pathname.replace('/', '');
}

function buildFallbackYears(currentYear: number): GithubContribData[] {
	return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4].map((year) => ({
		year,
		totalContributions: 0,
		weeks: []
	}));
}

function normalizeCalendar(calendar: unknown): { totalContributions: number; weeks: ContributionWeek[] } {
	const record = typeof calendar === 'object' && calendar !== null ? (calendar as Record<string, unknown>) : {};
	const weeksRaw = Array.isArray(record.weeks) ? record.weeks : [];
	const weeks: ContributionWeek[] = weeksRaw.map((week) => {
		const weekRecord = typeof week === 'object' && week !== null ? (week as Record<string, unknown>) : {};
		const daysRaw = Array.isArray(weekRecord.contributionDays) ? weekRecord.contributionDays : [];

		const contributionDays = daysRaw
			.map((day) => {
				const dayRecord = typeof day === 'object' && day !== null ? (day as Record<string, unknown>) : {};
				if (typeof dayRecord.date !== 'string' || typeof dayRecord.contributionCount !== 'number') return null;
				if (!Number.isFinite(dayRecord.contributionCount) || dayRecord.contributionCount < 0) return null;
				if (!/^\d{4}-\d{2}-\d{2}$/.test(dayRecord.date)) return null;

				return {
					date: dayRecord.date,
					contributionCount: dayRecord.contributionCount,
					color: typeof dayRecord.color === 'string' ? dayRecord.color : null
				};
			})
			.filter((day): day is ContributionDay => day !== null);

		return { contributionDays };
	});

	return {
		totalContributions:
			typeof record.totalContributions === 'number' && Number.isFinite(record.totalContributions)
				? record.totalContributions
				: 0,
		weeks
	};
}

export const GET = async () => {
	const currentYear = new Date().getUTCFullYear();
	if (cachedAtMs !== null && cachedPayload !== null && Date.now() - cachedAtMs < CACHE_MS) {
		return json(cachedPayload);
	}

	const token = env.GH_TOKEN || env.GITHUB_TOKEN;
	if (!token) {
		return json({
			currentYear,
			years: buildFallbackYears(currentYear),
			error: 'Missing GH_TOKEN/GITHUB_TOKEN for live contribution fetch.'
		});
	}

	const githubUser = getGithubUserFromProfile();
	const yearRange = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

	const years: GithubContribData[] = [];
	for (const year of yearRange) {
		const jan1 = new Date(`${year}-01-01T00:00:00Z`);
		const jan1MondayIndex = (jan1.getUTCDay() + 6) % 7;
		const fromDate = new Date(jan1.getTime() - jan1MondayIndex * 86400000);
		const toDate = new Date(fromDate.getTime() + 363 * 86400000 + 86399000);

		const res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'portfolioSite',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				query: `
					query($from: DateTime!, $to: DateTime!) {
						viewer {
							login
							contributionsCollection(from: $from, to: $to) {
								contributionCalendar {
									totalContributions
									weeks {
										contributionDays {
											date
											contributionCount
											color
										}
									}
								}
							}
						}
					}
				`,
				variables: {
					from: fromDate.toISOString(),
					to: toDate.toISOString()
				}
			})
		});

		const body = (await res.json()) as {
			data?: { viewer?: { login?: string; contributionsCollection?: { contributionCalendar?: unknown } } };
			errors?: { message?: string }[];
		};

		if (!res.ok || body.errors?.length) {
			const errorMessage = body.errors?.[0]?.message ?? `GitHub GraphQL failed (${res.status})`;
			return json({
				currentYear,
				years: years.length > 0 ? years : buildFallbackYears(currentYear),
				error: errorMessage
			});
		}

		const viewer = body.data?.viewer;
		const calendar = viewer?.contributionsCollection?.contributionCalendar;
		if (!calendar) {
			return json({
				currentYear,
				years: years.length > 0 ? years : buildFallbackYears(currentYear),
				error: 'Missing contribution calendar in GitHub response.'
			});
		}

		if (viewer?.login && viewer.login !== githubUser) {
			// Continue intentionally; token owner may differ from profile owner.
		}

		const normalized = normalizeCalendar(calendar);
		years.push({
			year,
			totalContributions: normalized.totalContributions,
			weeks: normalized.weeks
		});
	}

	const payload: GithubContribResponse = { currentYear, years };
	cachedAtMs = Date.now();
	cachedPayload = payload;
	return json(payload);
};
