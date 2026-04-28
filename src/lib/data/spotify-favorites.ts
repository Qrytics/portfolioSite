export type SpotifyFavorite = {
	label: string;
	subtitle: string;
	href: string;
	image: string;
};

export type SpotifyFavorites = {
	artist: SpotifyFavorite;
	album: SpotifyFavorite;
	track: SpotifyFavorite;
};

export const spotifyFavorites: SpotifyFavorites = {
	artist: {
		label: 'Mustard Service',
		subtitle: 'Favorite artist',
		href: 'https://open.spotify.com/artist/7kAZYW5e5hQHYGQ0XHYhns',
		image: 'https://i.scdn.co/image/ab6761610000e5eb96ec2c730555ec1113594831'
	},
	album: {
		label: 'DONNA 2',
		subtitle: 'Top album',
		href: 'https://open.spotify.com/album/6XqaG0y3GCyeHg0Ri9XoXZ?si=pzeFdNOdRmSmgkR6F0FgQQ',
		image: 'https://i.scdn.co/image/ab67616d0000b2739e7ee874e28871eceb928214'
	},
	track: {
		label: "Blueberry Eyes (feat. Lil Mosey, SUGA of BTS & Olivia O'Brien)",
		subtitle: 'Favorite song',
		href: 'https://open.spotify.com/track/3v96wJDPSdTYWEOgssfipO?si=08b1e1b092184f61',
		image: 'https://i.scdn.co/image/ab67616d0000b27317c7a61796963bf6f004eb16'
	}
};

