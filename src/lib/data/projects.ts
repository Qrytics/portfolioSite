export type ProjectType = 'open-source' | 'closed-source' | 'community / ecosystem' | 'multi-site';
export type ProjectStatus = 'active' | 'archived' | 'wip';

export interface Project {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	longDescription?: string;
	type: ProjectType;
	tags: string[];
	github?: string;
	demo?: string;
	image?: string;
	status: ProjectStatus;
	year: number;
	note?: string;
}

export const projects: Project[] = [
	{
		slug: 'project-one',
		title: 'Project One',
		subtitle: 'A short punchy subtitle line',
		description: 'A brief description of your first project. What problem does it solve? What makes it interesting? Replace this with your real project description.',
		longDescription: `A longer description of the project goes here. You can explain the motivation, technical challenges, architecture decisions, and outcomes.`,
		type: 'open-source',
		tags: ['typescript', 'svelte', 'postgres'],
		github: 'https://github.com/yourhandle/project-one',
		demo: 'https://project-one.example.com',
		status: 'active',
		year: 2024
	},
	{
		slug: 'project-two',
		title: 'Project Two',
		subtitle: 'Another punchy subtitle',
		description: 'Another great project. Replace this with a real description of what you built and why. Explain the technical depth and impact.',
		longDescription: `A longer description of the second project. Explain the architecture, the interesting problems you solved, and what you learned.`,
		type: 'open-source',
		tags: ['rust', 'wasm', 'kubernetes'],
		github: 'https://github.com/yourhandle/project-two',
		status: 'active',
		year: 2024,
		note: 'Open-source software — source available on GitHub.'
	},
	{
		slug: 'project-three',
		title: 'Project Three',
		subtitle: 'Closed-source project example',
		description: 'A third project showcase. Add your real projects here by updating src/lib/data/projects.ts.',
		type: 'closed-source',
		tags: ['python', 'docker', 'postgres'],
		status: 'archived',
		year: 2023,
		note: 'Closed-source project — media, details, and demo available on request.'
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

