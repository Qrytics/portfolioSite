import { json } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { RequestHandler } from './$types';

/**
 * The search index for `Search.svelte` and `Terminal.svelte`, served as a prerendered static file.
 *
 * Both components live in `Nav`, so importing `$lib/data/projects` directly put all 72 KB of it —
 * every `longDescription`, `architecture[]`, and `challenges[]` for 35 projects — into the shared
 * layout chunk that `/resume`, `/about`, `/games`, and `/rhythm-games` download on load. Those pages
 * render none of it. Between them the two components read six fields.
 *
 * This is a `+server.ts`, so the import never reaches the client graph, and it can't drift out of
 * sync the way a hand-maintained slim copy would. `prerender = true` turns it into a static file at
 * build time, so there is no function invocation behind it either.
 */
export const prerender = true;

export type ProjectIndexEntry = {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	tags: string[];
	year: number;
};

export const GET: RequestHandler = () => {
	const index: ProjectIndexEntry[] = projects.map((project) => ({
		slug: project.slug,
		title: project.title,
		subtitle: project.subtitle,
		description: project.description,
		tags: [...project.tags],
		year: project.year
	}));

	return json(index);
};
