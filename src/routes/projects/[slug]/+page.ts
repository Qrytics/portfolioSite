import { getProject, projects, type Project } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

type Neighbour = { slug: string; title: string } | null;

export const load: PageLoad = ({ params }): { project: Project; prev: Neighbour; next: Neighbour } => {
	const project = getProject(params.slug);
	if (!project) {
		error(404, `Project "${params.slug}" not found`);
	}
	// Prev/next in `projects.ts` order, wrapping, so a visitor can browse without bouncing back to
	// the list. Only slug + title, so this adds almost nothing to each page's serialized data.
	const i = projects.indexOf(project);
	const at = (j: number): Neighbour => {
		const p = projects[(j + projects.length) % projects.length];
		return p && p !== project ? { slug: p.slug, title: p.title } : null;
	};
	return { project, prev: at(i - 1), next: at(i + 1) };
};
