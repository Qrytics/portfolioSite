export interface Game {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	/** Path to a preview screenshot under /static/games/<slug>/ */
	preview: string;
	/** URL the "Play" button links to */
	playUrl: string;
	/** Optional custom CTA text (e.g., "In Progress"). */
	playLabel?: string;
	tags: string[];
}

export const games: Game[] = [
	{
		slug: 'spotifyHero',
		title: 'spotifyHero',
		subtitle: 'Turn any Spotify track into a live rhythm challenge.',
		description:
			'A desktop rhythm game experience that maps Spotify songs to playable note charts. Jump in with keybinds mid-track, chase high scores, and share leaderboard-worthy runs.',
		preview: '/demos/spotify-hero-preview.svg',
		playUrl: '#',
		playLabel: 'In Progress',
		tags: ['rhythm', 'spotify', 'desktop']
	},
	{
		slug: 'vcKaraoke',
		title: 'vcKaraoke',
		subtitle: 'Synchronized browser karaoke with scoring and rooms.',
		description:
			'Multiplayer karaoke rooms with queueing, scoring, and low-latency in-browser voice chat designed to keep everyone in sync during virtual sing-alongs.',
		preview: '/demos/Screenshot 2026-04-28 010006.png',
		playUrl: 'https://mario-belmonte.com/games/vcKaraoke',
		tags: ['karaoke', 'multiplayer', 'voice']
	},
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
		preview: '/games/aimTrainer-preview.png',
		playUrl: '/games/aimTrainer/',
		tags: ['aim', 'reflex', 'arcade']
	},
	{
		slug: 'dodgeLoL',
		title: 'DodgeLoL',
		subtitle: 'Dodge skillshots. Survive as long as you can.',
		description:
			'A high-intensity micro-mechanics trainer inspired by loldodgegame.com. Dodge League of Legends-style skillshots and AoE explosions rendered from a top-down isometric perspective.',
		preview: '/games/dodgeLoL-preview.png',
		playUrl: 'https://mario-belmonte.com/games/dodgeLoL',
		tags: ['reflex', 'arcade', 'league of legends']
	},
	{
		slug: 'soundVisual-Avora',
		title: 'soundVisual-Avora',
		subtitle: 'Audio-reactive visual playground.',
		description:
			'An interactive sound visualizer experience that reacts in real time to audio input and transforms it into dynamic visuals.',
		preview: '/games/soundVisual-Avora-preview.png',
		playUrl: '/games/soundVisual-Avora/',
		tags: ['audio', 'visualizer', 'interactive']
	}
];
