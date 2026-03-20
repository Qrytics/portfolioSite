import fs from 'node:fs/promises';
import path from 'node:path';

function getGithubUserFromProfileTs(profileTs) {
	// profile.ts contains: github: 'https://github.com/<username>',
	const match = profileTs.match(/github:\s*'https:\/\/github\.com\/([^']+)'/);
	if (!match) throw new Error('Could not extract github username from src/lib/data/profile.ts');
	return match[1];
}

function isWithinLastWeek(iso) {
	const t = Date.parse(iso);
	if (!Number.isFinite(t)) return false;
	return t >= Date.now() - 7 * 24 * 60 * 60 * 1000;
}

async function main() {
	const repoRoot = process.cwd();
	const profilePath = path.join(repoRoot, 'src/lib/data/profile.ts');
	const outPath = path.join(repoRoot, 'static/github-recent.json');

	const profileTs = await fs.readFile(profilePath, 'utf8');
	const githubUser = getGithubUserFromProfileTs(profileTs);

	// Prefer the classic PAT you added as GH_TOKEN over the default Actions token.
	// This avoids rate limiting / 403s when GitHub's default token is constrained.
	const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

	const res = await fetch(
		`https://api.github.com/users/${githubUser}/repos?sort=pushed&per_page=100`,
		{
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'portfolioSite',
				...(token ? { Authorization: `Bearer ${token}` } : {})
			}
		}
	);

	if (!res.ok) {
		let apiMessage;
		try {
			const body = await res.json();
			apiMessage = body?.message;
		} catch {
			apiMessage = undefined;
		}

		const error = `GitHub request failed (${res.status})${apiMessage ? `: ${apiMessage}` : ''}`;
		await fs.writeFile(outPath, JSON.stringify({ repos: [], error }, null, 2));
		return;
	}

	const data = await res.json();
	const repos = (Array.isArray(data) ? data : [])
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

	await fs.writeFile(outPath, JSON.stringify({ repos }, null, 2));
}

main().catch(async (e) => {
	const repoRoot = process.cwd();
	const outPath = path.join(repoRoot, 'static/github-recent.json');
	const message = e instanceof Error ? e.message : 'Failed to update GitHub activity.';
	await fs.writeFile(outPath, JSON.stringify({ repos: [], error: message }, null, 2));
	process.exit(1);
});

