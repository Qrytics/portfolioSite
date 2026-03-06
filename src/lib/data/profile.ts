export interface Profile {
	name: string;
	handle: string;
	title: string;
	bio: string;
	location: string;
	email: string;
	github: string;
	linkedin: string;
	twitter?: string;
	skills: SkillGroup[];
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export const profile: Profile = {
	name: 'Your Name',
	handle: 'yourhandle',
	title: 'Software Engineer',
	bio: "I build things for the web and beyond. Passionate about systems programming, open-source software, and finding elegant solutions to hard problems. This is a placeholder bio — replace it with your own story.",
	location: 'Your City, Country',
	email: 'you@example.com',
	github: 'https://github.com/yourhandle',
	linkedin: 'https://linkedin.com/in/yourhandle',
	skills: [
		{
			category: 'Languages',
			items: ['TypeScript', 'Python', 'Rust', 'Go', 'C++']
		},
		{
			category: 'Frontend',
			items: ['Svelte', 'React', 'CSS', 'HTML', 'WebGL']
		},
		{
			category: 'Backend',
			items: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes']
		},
		{
			category: 'Tools',
			items: ['Git', 'Linux', 'Neovim', 'GitHub Actions', 'Terraform']
		}
	]
};
