export interface Game {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	/** Path to a preview screenshot under /static/games/<slug>/ */
	preview: string;
	/** URL the "Play" button links to */
	playUrl: string;
	tags: string[];
}

export const games: Game[] = [
	{
		slug: 'garticDraw',
		title: 'GarticDraw',
		subtitle: 'Draw fast. Keep it messy.',
		description:
			'A feature-rich drawing canvas inspired by Gartic Phone. Supports freehand brushes, shapes, filters (neon, glitch, pixelated, …), undo/redo, and GIF animation export — all running locally in the browser.',
		preview: '/games/garticDraw-preview.png',
		playUrl: '/games/garticDraw/',
		tags: ['canvas', 'animation', 'drawing']
	},
	{
		slug: 'aimTrainer',
		title: 'Aim Trainer',
		subtitle: 'Click targets as fast as you can.',
		description:
			'A browser-based aim training game. Choose your duration, target count, and target size, then click as many targets as possible. Tracks your score, accuracy, average reaction time, and best reaction time.',
		preview: 'https://github.com/user-attachments/assets/26513b99-1763-4751-84d9-46c6d2a27be3',
		playUrl: '/games/aimTrainer/',
		tags: ['aim', 'reflex', 'arcade']
	}
];
