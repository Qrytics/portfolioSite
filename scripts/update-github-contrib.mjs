import fs from 'node:fs/promises';
import path from 'node:path';
import { readGithubUser } from './lib/profile-github.mjs';

/**
 * How many years to fetch. Kept equal to `YEAR_SPAN` in `src/routes/api/github-contrib/+server.ts`:
 * the chart only ever exposes two year buttons, and three of the five years this script used to emit
 * were unreachable through any UI while still being downloaded by every visitor who hit the fallback.
 */
const YEAR_SPAN = 2;

/**
 * Behavioural twin of `sanitizeContributionWeeks` in `src/lib/utils/contribShape.ts` (called with
 * `requireDaysArray: false`, matching `api/github-contrib/+server.ts`). Plain Node can't import the TS
 * module or resolve `$lib`, which is why this exists twice — the same reason documented in
 * `scripts/lib/profile-github.mjs`. Keep the two in step: this script writes the committed fallback
 * that `contribShape.ts` then re-validates in the browser, so a divergence shows up as silently
 * dropped days rather than an error.
 */
function isRecord(value) {
	return typeof value === 'object' && value !== null;
}

function buildFallbackYears(currentYear) {
	return Array.from({ length: YEAR_SPAN }, (_, i) => ({
		year: currentYear - i,
		weeks: [],
		totalContributions: 0
	}));
}

async function writeFallbackPayload(outPath, currentYear, error) {
	// No pretty-printing: this file is served verbatim to browsers as the static fallback, and the
	// indentation alone accounted for 156 KB of the 275 KB it used to ship.
	await fs.writeFile(outPath, JSON.stringify({ error, currentYear, years: buildFallbackYears(currentYear) }));
}

function normalizeCalendar(calendar) {
	if (!isRecord(calendar)) throw new Error('Missing contribution calendar data');
	const weeksRaw = Array.isArray(calendar.weeks) ? calendar.weeks : [];

	const weeks = weeksRaw.map((week) => {
		if (!isRecord(week)) return { contributionDays: [] };
		const daysRaw = Array.isArray(week.contributionDays) ? week.contributionDays : [];
		const contributionDays = daysRaw
			.map((day) => {
				if (!isRecord(day) || typeof day.date !== 'string' || typeof day.contributionCount !== 'number') {
					return null;
				}

				if (!Number.isFinite(day.contributionCount) || day.contributionCount < 0) return null;
				if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date)) return null;

				// No `color`: the chart derives its level from the count so it can theme with
				// `--accent`, and GitHub's hex was ~27% of the serialized file.
				return { date: day.date, contributionCount: day.contributionCount };
			})
			.filter(Boolean);

		return { contributionDays };
	});

	return {
		totalContributions:
			typeof calendar.totalContributions === 'number' && Number.isFinite(calendar.totalContributions)
				? calendar.totalContributions
				: 0,
		weeks
	};
}

async function main() {
	const repoRoot = process.cwd();
	const outPath = path.join(repoRoot, 'static/github-contrib.json');

	const githubUser = await readGithubUser(repoRoot);

	const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
	if (!token) {
		console.error('Missing GH_TOKEN/GITHUB_TOKEN env var. Refusing to overwrite static/github-contrib.json.');
		process.exit(1);
	}

	// Private/restricted contributions are only available to the authenticated user.
	// Using `viewer` (instead of `user(login: ...)`) ensures the token owner can see them.
	const queryAttempts = [
		{
			label: 'viewer',
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
									}
								}
							}
							hasAnyRestrictedContributions
							earliestRestrictedContributionDate
						}
					}
				}
			`
		}
	];

	// Use UTC years to keep ranges stable regardless of server time zone.
	const currentYear = new Date().getUTCFullYear();
	// Two years, matching `YEAR_SPAN` in src/routes/api/github-contrib/+server.ts and the chart's
	// two year buttons. Two Monday-aligned year windows already cover the rolling-365 default view.
	const yearRange = Array.from({ length: YEAR_SPAN }, (_, i) => currentYear - i);

	const years = [];
	for (const year of yearRange) {
		// GitHub enforces that `from`..`to` must be <= 1 year.
		// To still get the trailing "Jan" spillover columns (and keep month labels correct),
		// we query exactly 52 weeks aligned to the week containing Jan 1 (Mon..Sun).
		const jan1 = new Date(`${year}-01-01T00:00:00Z`);
		// Convert Sunday(0)..Saturday(6) -> Monday(0)..Sunday(6)
		const jan1MondayIndex = (jan1.getUTCDay() + 6) % 7;
		const fromDate = new Date(jan1.getTime() - jan1MondayIndex * 86400000);

		// 52 weeks minus 1 second (end at Sunday 23:59:59.000)
		const toDate = new Date(fromDate.getTime() + 363 * 86400000 + 86399000);

		const from = fromDate.toISOString();
		const to = toDate.toISOString();

		let json = null;
		let lastError = null;

		for (const attempt of queryAttempts) {
			const res = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					Accept: 'application/vnd.github+json',
					'User-Agent': 'portfolioSite',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					query: attempt.query,
					variables: { from, to }
				})
			});

			json = await res.json();
			if (res.ok && !json?.errors?.length) break;

			lastError = json?.errors?.[0]?.message ?? `GitHub GraphQL request failed (${res.status})`;
		}

		if (!json || json?.errors?.length) {
			const message = lastError ?? 'GitHub GraphQL request failed';
			await writeFallbackPayload(outPath, currentYear, message);
			return;
		}

		const viewer = json?.data?.viewer;
		if (!viewer) {
			await writeFallbackPayload(outPath, currentYear, 'Missing viewer data');
			return;
		}

		// If the token owner doesn't match the profile username, we can still render,
		// but it likely means the chart is being generated for the wrong account.
		if (viewer.login && viewer.login !== githubUser) {
			// Continue, but make the issue visible in the output.
			// (We don't hard-fail because users might still want token owner data.)
			console.warn(`GitHubContribChart: token viewer login (${viewer.login}) != profile github (${githubUser}).`);
		}

		const collection = viewer?.contributionsCollection;
		const calendar = collection?.contributionCalendar;
		if (!collection || !calendar) {
			await writeFallbackPayload(outPath, currentYear, 'Missing contributionsCollection data');
			return;
		}

		const normalized = normalizeCalendar(calendar);

		years.push({
			year,
			totalContributions: normalized.totalContributions,
			weeks: normalized.weeks
		});
	}

	await fs.writeFile(outPath, JSON.stringify({ currentYear, years }));
}

main().catch(async (e) => {
	const repoRoot = process.cwd();
	const outPath = path.join(repoRoot, 'static/github-contrib.json');
	const message = e instanceof Error ? e.message : 'Failed to update GitHub contributions.';
	const currentYear = new Date().getUTCFullYear();
	await writeFallbackPayload(outPath, currentYear, message);
	process.exit(1);
});

