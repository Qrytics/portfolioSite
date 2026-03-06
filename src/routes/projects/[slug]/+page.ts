import { getProject } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) {
		error(404, `Project "${params.slug}" not found`);
	}
	return { project };
};
