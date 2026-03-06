export interface BlogPost {
	slug: string;
	title: string;
	date: string; // ISO (YYYY-MM-DD) for easy sorting/formatting later
	excerpt: string;
}

// Placeholder content — you can replace this once you wire up real posts.
export const posts: BlogPost[] = [
	{
		slug: 'on-living-with-yourself',
		title: 'On Living with Yourself',
		date: '2026-03-05',
		excerpt:
			"When I was growing up, many of my friends’ parents worked in aerospace and defense. Later, when I entered the software industry..."
	}
];

