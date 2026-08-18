import { json } from '@sveltejs/kit';
import { getGithubUser } from '$lib/utils/githubUser';
import { env } from '$env/dynamic/private';
import {
	isRecord,
	sanitizeContributionWeeks,
	sanitizeTotal,
	type ContributionWeek
} from '$lib/utils/contribShape';

export const prerender = false;

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
/** Errors are cached briefly too. Without this, a 403 rate-limit state made every request
 *  re-hit GitHub, which is exactly what prolongs the rate limit. */
const ERROR_CACHE_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

/**
 * Two years is all the client can reach: the chart shows a rolling 365-day window plus
 * buttons for the newest two years, and two Monday-aligned year windows already cover the
 * rolling window. This used to fetch five, four of which nothing could display.
 */
const YEAR_SPAN = 2;

let cachedAtMs: number | null = null;
let cachedPayload: GithubContribResponse | null = null;
let cachedIsError = false;
/** Collapses concurrent post-TTL requests into one upstream fan-out. */
let inFlight: Promise<GithubContribResponse> | null = null;

function buildFallbackYears(currentYear: number): GithubContribData[] {
	return Array.from({ length: YEAR_SPAN }, (_, i) => ({
		year: currentYear - i,
		totalContributions: 0,
		weeks: []
	}));
}

function normalizeCalendar(calendar: unknown): {
	totalContributions: number;
	weeks: ContributionWeek[];
} {
	const record = isRecord(calendar) ? calendar : {};

	return {
		totalContributions: sanitizeTotal(record.totalContributions),
		// No `requireDaysArray` here: this validates GitHub's own GraphQL response, where a week
		// object with nothing in it is a legitimate empty week rather than a malformed payload —
		// dropping it would shorten the grid and misalign every column after it.
		weeks: sanitizeContributionWeeks(record.weeks)
	};
}

const CONTRIB_QUERY = `
	query($from: DateTime!, $to: DateTime!) {
		viewer {
			login
			contributionsCollection(from: $from, to: $to) {
				contributionCalendar {
					totalContributions
					weeks { contributionDays { date contributionCount } }
				}
			}
		}
	}
`;

/**
 * Upstream detail (undici socket errors, DNS failures, raw GitHub strings) is logged, never
 * returned — it used to reach the browser and get rendered verbatim.
 */
function safeError(context: string, detail: unknown): string {
	console.error(`[github-contrib] ${context}:`, detail);
	return 'GitHub contribution data is temporarily unavailable.';
}

async function fetchYear(year: number, token: string, githubUser: string): Promise<GithubContribData> {
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
			query: CONTRIB_QUERY,
			variables: { from: fromDate.toISOString(), to: toDate.toISOString() }
		}),
		// Without this a hung GitHub socket pins the lambda until the platform timeout.
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
	});

	const body = (await res.json()) as {
		data?: { viewer?: { login?: string; contributionsCollection?: { contributionCalendar?: unknown } } };
		errors?: { message?: string }[];
	};

	if (!res.ok || body.errors?.length) {
		throw new Error(body.errors?.[0]?.message ?? `GitHub GraphQL failed (${res.status})`);
	}

	const viewer = body.data?.viewer;
	const calendar = viewer?.contributionsCollection?.contributionCalendar;
	if (!calendar) throw new Error('Missing contribution calendar in GitHub response.');

	if (viewer?.login && viewer.login !== githubUser) {
		console.warn(
			`[github-contrib] token owner "${viewer.login}" differs from profile user "${githubUser}"; using token owner's contributions.`
		);
	}

	const normalized = normalizeCalendar(calendar);
	return { year, totalContributions: normalized.totalContributions, weeks: normalized.weeks };
}

async function buildPayload(currentYear: number): Promise<GithubContribResponse> {
	const token = env.GH_TOKEN || env.GITHUB_TOKEN;
	if (!token) {
		return {
			currentYear,
			years: buildFallbackYears(currentYear),
			error: 'Missing GH_TOKEN/GITHUB_TOKEN for live contribution fetch.'
		};
	}

	const githubUser = getGithubUser();
	const yearRange = Array.from({ length: YEAR_SPAN }, (_, i) => currentYear - i);

	try {
		// Parallel, not serial: five sequential round trips were the bulk of this route's latency.
		const years = await Promise.all(yearRange.map((year) => fetchYear(year, token, githubUser)));
		return { currentYear, years };
	} catch (e) {
		return {
			currentYear,
			years: buildFallbackYears(currentYear),
			error: safeError('fan-out failed', e)
		};
	}
}

export const GET = async ({ setHeaders }) => {
	const currentYear = new Date().getUTCFullYear();
	const ttl = cachedIsError ? ERROR_CACHE_MS : CACHE_MS;

	let payload: GithubContribResponse;
	if (cachedAtMs !== null && cachedPayload !== null && Date.now() - cachedAtMs < ttl) {
		payload = cachedPayload;
	} else {
		inFlight ??= buildPayload(currentYear).then((result) => {
			cachedAtMs = Date.now();
			cachedPayload = result;
			cachedIsError = Boolean(result.error);
			inFlight = null;
			return result;
		});
		try {
			payload = await inFlight;
		} catch (e) {
			inFlight = null;
			payload = {
				currentYear,
				years: buildFallbackYears(currentYear),
				error: safeError('unexpected failure', e)
			};
		}
	}

	if (payload.error) {
		// A real status code is what lets `+page.ts` fall through to the committed static JSON.
		// Returning 200 with an `error` field made that entire fallback path unreachable.
		setHeaders({ 'Cache-Control': 'public, s-maxage=60' });
		return json(payload, { status: 503 });
	}

	setHeaders({ 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400' });
	return json(payload);
};
