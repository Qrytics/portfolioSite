import { base } from '$app/paths';

/**
 * Client-side accessor for the slim project index prerendered by
 * `src/routes/projects-index.json/+server.ts`. See that file for why the full `projects` module is
 * no longer imported into `Search.svelte` / `Terminal.svelte`.
 */
export type ProjectIndexEntry = {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	tags: string[];
	year: number;
};

/**
 * The promise is cached, not the result: `Search` and `Terminal` both call this and are both mounted
 * inside `Nav`, so without the cache a single keystroke could start two identical requests.
 */
let inFlight: Promise<ProjectIndexEntry[]> | null = null;

export function loadProjectsIndex(): Promise<ProjectIndexEntry[]> {
	inFlight ??= fetch(`${base}/projects-index.json`, { headers: { Accept: 'application/json' } })
		.then((res) => (res.ok ? (res.json() as Promise<ProjectIndexEntry[]>) : []))
		.then((entries) => (Array.isArray(entries) ? entries : []))
		.catch(() => {
			// An unreachable index means search finds nothing, which is degraded but not broken. Clear
			// the cache so the next open retries instead of permanently remembering the failure.
			inFlight = null;
			return [];
		});

	return inFlight;
}
