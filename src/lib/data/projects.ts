export interface Project {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	tags: string[];
	github?: string;
	demo?: string;
	status: 'active' | 'archived' | 'wip';
	year: number;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'project-one',
		title: 'Project One',
		description: 'A brief description of your first project. What problem does it solve? What makes it interesting?',
		longDescription: `A longer description of the project goes here. You can explain the motivation, technical challenges, architecture decisions, and outcomes. Markdown-style content can go here once you wire up a renderer.`,
		tags: ['TypeScript', 'SvelteKit', 'PostgreSQL'],
		github: 'https://github.com/yourhandle/project-one',
		demo: 'https://project-one.example.com',
		status: 'active',
		year: 2024,
		featured: true
	},
	{
		slug: 'project-two',
		title: 'Project Two',
		description: 'Another great project. Replace this with a real description of what you built and why.',
		longDescription: `A longer description of the second project. Explain the architecture, the interesting problems you solved, and what you learned.`,
		tags: ['Rust', 'WebAssembly', 'Performance'],
		github: 'https://github.com/yourhandle/project-two',
		status: 'active',
		year: 2024,
		featured: true
	},
	{
		slug: 'project-three',
		title: 'Project Three',
		description: 'A third project showcase. Add your real projects here by updating src/lib/data/projects.ts.',
		tags: ['Python', 'Machine Learning', 'API'],
		github: 'https://github.com/yourhandle/project-three',
		status: 'archived',
		year: 2023,
		featured: false
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
	return projects.filter((p) => p.featured);
}
