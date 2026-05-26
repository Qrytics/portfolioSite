export type AboutPhotoPadding = { top?: number; right?: number; bottom?: number; left?: number };

export type AboutPhoto = {
	src: string;
	position?: string; // CSS object-position value, e.g. '50% 40%'
	fit?: 'cover' | 'contain'; // default cover; use contain to show full image
	tall?: boolean; // allow card to grow in height so portrait images show fully (no bottom crop)
	padding?: AboutPhotoPadding; // per-image padding in px (only these four images use it)
};

export const aboutPhotos: AboutPhoto[] = [
	{ src: '/about/IMG_1400.jpeg' },
	{ src: '/about/IMG_6212.jpeg', position: '50% 5%' },
	{ src: '/about/IMG_0984.jpeg', fit: 'contain', tall: true },
	{ src: '/about/IMG_7164.PNG', fit: 'contain', tall: true, padding: { left: 70, right: 70 } },
	{ src: '/about/IMG_5389.jpeg' },
	{ src: '/about/IMG_1342.jpeg' },
	{ src: '/about/IMG_7073.jpg' },
	{ src: '/about/IMG_0925.jpeg' },
	{ src: '/about/70e9b9f6-39d0-420a-baa1-84669c4387e5.JPG' },
	{ src: '/about/ECDF8558-EBA6-4CB7-B585-C8F7946242BE.JPG' },
	{ src: '/about/IMG_7163.PNG', position: '50% 5%', padding: { left: 45, right: 45 } },
	{ src: '/about/IMG_1469.jpeg' },
	{ src: '/about/IMG_5397.jpeg' },
	{ src: '/about/IMG_6784.jpeg' },
	{ src: '/about/IMG_6654.jpeg' },
	{ src: '/about/IMG_1206.jpeg' },
	{ src: '/about/IMG_2626.jpeg', fit: 'contain', tall: true, padding: { left: 54, right: 54 } },
	{ src: '/about/IMG_8025.JPEG' },
	{ src: '/about/IMG_5645.jpeg', position: '50% 5%' },
	{ src: '/about/61e28236-b3ed-4343-9375-61b7efb004f9.JPG' },
	{ src: '/about/IMG_7040.jpeg', padding: { top: 10, bottom: 10 } },
	{ src: '/about/IMG_4474.jpeg', fit: 'contain' },
	{ src: '/about/cc8410d4-491c-41ba-a9c0-fb52ac5cc5bd.JPG', fit: 'contain', padding: { left: 40, right: 40 } }
];
