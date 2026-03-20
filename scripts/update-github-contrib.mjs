import fs from 'node:fs/promises';
import path from 'node:path';

function getGithubUserFromProfileTs(profileTs) {
	const match = profileTs.match(/github:\s*'https:\/\/github\.com\/([^']+)'/);
	if (!match) throw new Error('Could not extract github username from src/lib/data/profile.ts');
	return match[1];
}

async function main() {
	const repoRoot = process.cwd();
	const profilePath = path.join(repoRoot, 'src/lib/data/profile.ts');
	const outPath = path.join(repoRoot, 'static/github-contrib.json');

	const profileTs = await fs.readFile(profilePath, 'utf8');
	const githubUser = getGithubUserFromProfileTs(profileTs);

	const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
	if (!token) {
		await fs.writeFile(outPath, JSON.stringify({ error: 'Missing GH_TOKEN/GITHUB_TOKEN' }, null, 2));
		return;
	}

	const query = `
		query($login: String!, $from: DateTime!, $to: DateTime!) {
			user(login: $login) {
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
	`;

	// Use UTC years to keep ranges stable regardless of server time zone.
	const currentYear = new Date().getUTCFullYear();
	const yearRange = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

	const years = [];
	for (const year of yearRange) {
		const from = `${year}-01-01T00:00:00Z`;
		const to = `${year}-12-31T23:59:59Z`;

		const res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'portfolioSite',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				query,
				variables: { login: githubUser, from, to }
			})
		});

		const json = await res.json();
		if (!res.ok || json?.errors?.length) {
			const message = json?.errors?.[0]?.message ?? `GitHub GraphQL request failed (${res.status})`;
			await fs.writeFile(
				outPath,
				JSON.stringify({ error: message, currentYear, years: yearRange.map((y) => ({ year: y, weeks: [], totalContributions: 0 })) }, null, 2)
			);
			return;
		}

		const collection = json?.data?.user?.contributionsCollection;
		const calendar = collection?.contributionCalendar;
		if (!collection || !calendar) {
			await fs.writeFile(
				outPath,
				JSON.stringify({ error: 'Missing contributionsCollection data', currentYear, years: yearRange.map((y) => ({ year: y, weeks: [], totalContributions: 0 })) }, null, 2)
			);
			return;
		}

		const weeks = (calendar.weeks ?? []).map((w) => ({
			contributionDays: (w.contributionDays ?? []).map((d) => ({
				date: d.date,
				contributionCount: d.contributionCount ?? 0,
				color: d.color ?? null
			}))
		}));

		years.push({
			year,
			totalContributions: calendar.totalContributions ?? 0,
			weeks
		});
	}

	await fs.writeFile(outPath, JSON.stringify({ currentYear, years }, null, 2));
}

main().catch(async (e) => {
	const repoRoot = process.cwd();
	const outPath = path.join(repoRoot, 'static/github-contrib.json');
	const message = e instanceof Error ? e.message : 'Failed to update GitHub contributions.';
	const currentYear = new Date().getUTCFullYear();
	await fs.writeFile(
		outPath,
		JSON.stringify(
			{
				error: message,
				currentYear,
				years: [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4].map((year) => ({
					year,
					weeks: [],
					totalContributions: 0
				}))
			},
			null,
			2
		)
	);
	process.exit(1);
});

