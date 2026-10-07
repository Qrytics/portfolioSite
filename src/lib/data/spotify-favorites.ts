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

/*
 * Spotify's smallest rendition that is still sharp in the 40px tiles on a 3× screen: 160px for the
 * artist (`…f178…`), 300px for albums (`…1e02…`). The 640px ones (`…e5eb…` / `…b273…`) cost 277KB
 * for three thumbnails; these are 76KB. Same image ids, only the size segment differs.
 */
export const spotifyFavorites: SpotifyFavorites = {
	artist: {
		label: 'Mustard Service',
		subtitle: 'Favorite artist',
		href: 'https://open.spotify.com/artist/7kAZYW5e5hQHYGQ0XHYhns',
		image: 'https://i.scdn.co/image/ab6761610000f17896ec2c730555ec1113594831'
	},
	album: {
		label: 'DONNA 2',
		subtitle: 'Top album',
		href: 'https://open.spotify.com/album/6XqaG0y3GCyeHg0Ri9XoXZ?si=pzeFdNOdRmSmgkR6F0FgQQ',
		image: 'https://i.scdn.co/image/ab67616d00001e029e7ee874e28871eceb928214'
	},
	track: {
		label: "Blueberry Eyes (feat. Lil Mosey, SUGA of BTS & Olivia O'Brien)",
		subtitle: 'Favorite song',
		href: 'https://open.spotify.com/track/3v96wJDPSdTYWEOgssfipO?si=08b1e1b092184f61',
		image: 'https://i.scdn.co/image/ab67616d00001e0217c7a61796963bf6f004eb16'
	}
};

