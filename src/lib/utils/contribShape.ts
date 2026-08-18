/**
 * Shared shape validation for GitHub contribution calendars.
 *
 * The same day-level checks — string `date` matching `YYYY-MM-DD`, finite non-negative
 * `contributionCount` — were hand-written three times: once in `api/github-contrib/+server.ts`
 * (validating GitHub's GraphQL response), once in `githubData.ts` (validating the JSON the client
 * fetched), and once in `scripts/update-github-contrib.mjs`. The two TypeScript copies had already
 * diverged in style while staying identical in behaviour, which is the state right before they
 * diverge in behaviour too.
 *
 * `src/lib/types/github.ts` used to hold `zod` schemas for exactly this, but nothing imported it and
 * its `GraphQLContributionResponseSchema` expected `data.user` while both callers query `viewer`. It
 * and the `zod` dependency are gone: `githubData.ts` runs in the browser, so validating there with a
 * schema library would have put a validator in the client bundle to check a shape these ~20 lines
 * already cover.
 *
 * Deliberately free of `$app/*` and `$env/*` imports so both the server route and the client module
 * can import it.
 */

export type ContributionDay = {
	date: string;
	contributionCount: number;
};

export type ContributionWeek = {
	contributionDays: ContributionDay[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Returns null for anything that isn't a usable day, so callers can `.filter(Boolean)`. */
export function sanitizeContributionDay(day: unknown): ContributionDay | null {
	if (!isRecord(day)) return null;
	if (typeof day.date !== 'string' || !ISO_DATE.test(day.date)) return null;

	const count = day.contributionCount;
	if (typeof count !== 'number' || !Number.isFinite(count) || count < 0) return null;

	// `color` is deliberately dropped: levels are derived from the count so the ramp can theme with
	// `--accent`, and GitHub's hex was ~27% of the serialized payload.
	return { date: day.date, contributionCount: count };
}

/**
 * `weeksRaw` is whatever was in the `weeks` field. `requireDaysArray` distinguishes the two callers:
 * the client drops a week whose `contributionDays` isn't an array (the payload is malformed), while
 * the API route keeps it as an empty week (GitHub returned a week with nothing in it).
 */
export function sanitizeContributionWeeks(
	weeksRaw: unknown,
	{ requireDaysArray = false }: { requireDaysArray?: boolean } = {}
): ContributionWeek[] {
	if (!Array.isArray(weeksRaw)) return [];

	return weeksRaw
		.map((week): ContributionWeek | null => {
			if (!isRecord(week)) return requireDaysArray ? null : { contributionDays: [] };
			if (!Array.isArray(week.contributionDays)) {
				return requireDaysArray ? null : { contributionDays: [] };
			}

			return {
				contributionDays: week.contributionDays
					.map(sanitizeContributionDay)
					.filter((day): day is ContributionDay => day !== null)
			};
		})
		.filter((week): week is ContributionWeek => week !== null);
}

/** Coerces a `totalContributions` field to a finite non-negative number. */
export function sanitizeTotal(value: unknown): number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;
}
