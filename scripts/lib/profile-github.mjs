import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Script-side counterpart to `src/lib/utils/githubUser.ts`.
 *
 * These are plain Node scripts, so they can't import the TS module or resolve the `$lib` alias —
 * they read `profile.ts` as text. That's why the logic exists twice in the repo rather than once.
 * It should not exist a *third* and *fourth* time, which is what prompted this file: each generator
 * carried its own copy, and they had drifted. `update-github-recent.mjs`'s copy matched
 * `([^']+)`, capturing everything up to the closing quote — so a trailing slash in `profile.github`
 * produced `"Qrytics/"` and a `…/users/Qrytics%2F/repos` request that 404s.
 */
export function getGithubUserFromProfileTs(profileTs) {
	const match = profileTs.match(
		/github:\s*['"](?:https?:\/\/)?(?:www\.)?github\.com\/([^'"/\s]+)\/?['"]/i
	);
	if (!match) {
		throw new Error(
			'Could not extract a github username from src/lib/data/profile.ts. Expected a line like: github: \'https://github.com/<user>\''
		);
	}
	return match[1];
}

/** Reads `src/lib/data/profile.ts` relative to the repo root and returns the username. */
export async function readGithubUser(repoRoot) {
	const profilePath = path.join(repoRoot, 'src/lib/data/profile.ts');
	return getGithubUserFromProfileTs(await fs.readFile(profilePath, 'utf8'));
}
