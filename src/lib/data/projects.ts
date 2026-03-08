export type ProjectType = 'open-source' | 'closed-source' | 'community / ecosystem' | 'multi-site';
export type ProjectStatus = 'active' | 'archived' | 'wip';

export type Month =
	| 'Jan'
	| 'Feb'
	| 'Mar'
	| 'Apr'
	| 'May'
	| 'Jun'
	| 'Jul'
	| 'Aug'
	| 'Sep'
	| 'Oct'
	| 'Nov'
	| 'Dec';

export interface Project {
	slug: string;
	title: string;
	shortTitle?: string;
	subtitle: string;
	description: string;
	longDescription?: string;
	type: ProjectType;
	tags: string[];
	github?: string;
	demo?: string;
	/** Live / deployed app URL; shows "Visit Site" button when set. */
	siteUrl?: string;
	image?: string;
	/** Optional poster image (e.g. first frame); shown first, then main image/video when in view or on interaction. */
	poster?: string;
	/** Multiple images shown side-by-side in one media slot (e.g. two DAC pics). */
	images?: string[];
	/** Preset for media aspect ratio: default (383×144), schematic (383×177), auto (383×189 taller). */
	mediaAspect?: 'default' | 'schematic' | 'auto';
	/** Scale media frame (0–1) for smaller, padded layout; e.g. 0.75 = 3/4, 0.6 = 6/10. */
	mediaScale?: number;
	/** Optional inline CSS for the single video/image (e.g. { 'object-fit': 'cover', 'padding': '0' }). */
	mediaStyle?: Record<string, string>;
	status: ProjectStatus;
	startMonth: Month;
	startYear: number;
	endMonth: Month;
	endYear: number;
	year: number;
	note?: string;
	/** Google Slides presentation URL (edit or view); shown as embed below demo video. */
	slides?: string;
}

export const projects: Project[] = [
	{
		slug: 'smart-home-iot-dashboard',
		title: 'Smart Home IoT Dashboard',
		subtitle: 'Full-stack IoT system with ESP32, FastAPI, React, and real-time MQTT',
		image: '/gifs/smart-home-iot-demo.mp4',
		poster: '/gifs/smart-home-iot-demo-poster.png',
		description:
			'Architected a full-stack IoT system for a smart home model meant to give full lighting, temperature, and security control through a React dashboard; built with ESP32 firmware in C/C++. Implemented a rules engine with configurable threshold triggers and MQTT pub/sub for real-time sensor data (temperature, occupancy, light, door lock) with sub-second actuation latency.',
		longDescription: `Full-stack smart home platform spanning embedded firmware to web UI.

• Firmware: ESP32 in C/C++ for sensors (temperature, occupancy, light, door lock) and actuators, with MQTT pub/sub for real-time data.
• Backend: FastAPI with JWT auth, SQLite persistence, and a rules engine with configurable threshold triggers.
• Frontend: React dashboard for monitoring and control, deployed via Docker Compose.
• DevOps: GitHub Actions CI/CD, Pytest (backend) and Jest (frontend) test suites.
• Real-time: MQTT messaging across the stack for sub-second actuation latency.`,
		type: 'open-source',
		tags: ['JavaScript', 'Python', 'React', 'FastAPI', 'Docker', 'MQTT'],
		github: 'https://github.com/Qrytics/smartHome',
		status: 'active',
		startMonth: 'Jan',
		startYear: 2026,
		endMonth: 'May',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'visual-budget-planner',
		title: 'Visual Budget Planner (MosaicLedger)',
		shortTitle: 'Visual Budget Planner',
		subtitle: 'TartanHacks fintech app with Plaid, XRPL round-ups, and d3 treemaps',
		image: '/gifs/mosaic-ledger-demo.mp4',
		poster: '/gifs/mosaic-ledger-demo-poster.png',
		mediaStyle: {
			'object-fit': 'cover',
			'width': '100%',
			'height': '100%',
			'margin': '0',
			'padding': '0',
			'display': 'block',
		},
		description:
			'Engineered a fintech budget planner in a team of 3 at TartanHacks using with Vitest fuzz testing and Playwright E2E tests via CI/CD. Built a deterministic analysis pipeline with recurring charge detection, explorable d3-hierarchy treemap with PNG/SVG export, Plaid Link and Capital One Nessie API for real bank data, and XRPL round-up micro-savings with Testnet payments.',
		longDescription: `TartanHacks 2026 project: budget visualization and round-up savings.

• Stack: pnpm monorepo (8 packages), Next.js, React, TypeScript, Supabase auth/PostgreSQL; Vitest fuzz testing and Playwright E2E in CI/CD.
• Analysis: Deterministic pipeline with recurring charge detection using MAD-based confidence scoring.
• Visualization: Explorable d3-hierarchy treemap with nested drill-down, glassmorphic SVG rendering, PNG/SVG export.
• Banking: Plaid Link and Capital One Nessie API for real transaction ingestion.
• Crypto: XRPL blockchain round-up micro-savings with real Testnet payments via xrpl SDK and hex-encoded memo anchoring.`,
		type: 'open-source',
		tags: ['TypeScript', 'React', 'Next.js', 'PostgreSQL'],
		github: 'https://github.com/rilical/MosaicLedger',
		demo: 'https://www.youtube.com/watch?v=5Ug0nv0nYEA',
		siteUrl: 'https://mosaic-ledger-web.vercel.app/',
		status: 'active',
		startMonth: 'Feb',
		startYear: 2026,
		endMonth: 'Feb',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'auto-docker',
		title: 'Automated Docker Configuration Generator',
		shortTitle: 'Auto Docker Config Gen',
		subtitle: 'Python CLI for intelligent Dockerfile generation with self-healing builds',
		image: '/gifs/autodocker-pic-demo.png',
		description:
			'Architected a containerization automation CLI in Python using LiteLLM for intelligent Dockerfile generation with a self-healing algorithm that auto-diagnoses and retries Docker API builds based on project-specific context. Logic-driven CLI using Rich and Argparse with real-time build status tracking, automated runtime stability testing, and support for distroless/Alpine multi-stage builds to minimize attack surface.',
		longDescription: `CLI that generates and validates Dockerfiles using LLM reasoning and self-healing builds.

• Intelligence: LiteLLM for context-aware Dockerfile generation from project structure and config.
• Self-healing: Auto-diagnoses build failures and retries with corrected context.
• UX: Rich and Argparse CLI with real-time build status and runtime stability testing.
• Security: Support for distroless and Alpine multi-stage builds to minimize attack surface.`,
		type: 'open-source',
		tags: ['Python', 'Docker', 'LiteLLM', 'Rich', 'Argparse'],
		github: 'https://github.com/Qrytics/autoDocker',
		status: 'active',
		startMonth: 'Jan',
		startYear: 2026,
		endMonth: 'Jan',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'deep-live-cam',
		title: 'Deep-Live-Cam: AI Content Authentication System',
		shortTitle: 'Deep-Live-Cam Auth Sys',
		subtitle: 'AI video/img LSB watermarking security layer using RSA-2048 and stenography',
		image: '/gifs/deep-live-cam-demo.mp4',
		poster: '/gifs/deep-live-cam-demo-poster.png',
		description:
			'Built a dual-layer security system for a deepfake application using invisible LSB watermarking, RSA-2048 digital signatures, and a stenography module to embed cryptographic metadata into image pixels surviving JPEG compression. Developed PKI infrastructure with automated key generation, AES-256 encrypted private keys, and signature verification tools; containerized the ML pipeline with Docker for cross-platform use.',
		longDescription: `Content authentication for deepfake detection via watermarking and PKI.

• Watermarking: Invisible LSB embedding and stenography module so metadata survives JPEG compression.
• PKI: RSA-2048 digital signatures; automated key generation; AES-256 encrypted private keys; verification tools using Python's cryptography library.
• ML: ONNX Runtime, InsightFace, OpenCV, PyTorch; pipeline containerized with Docker for cross-platform use.`,
		type: 'closed-source',
		tags: ['Python', 'OpenCV', 'PyTorch', 'Docker', 'RSA-2048'],
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2025,
		endMonth: 'Dec',
		endYear: 2025,
		year: 2025,
		demo: 'https://www.youtube.com/watch?v=ch_LXkpjnIM',
		slides: 'https://docs.google.com/presentation/d/1Son_yn0dr5vEIMwTeSbLOCbJg8lxHvQf/edit?usp=sharing'
	},
	{
		slug: 'mono-pix-scout',
		title: 'monoPix-scout: Tracking Pixel Chrome Extension',
		shortTitle: 'Tracking Pixel Extension',
		subtitle: 'Manifest V3 extension to detect, classify, and optionally block covert tracking',
		image: '/gifs/tracking-pixel-demo.mp4',
		poster: '/gifs/tracking-pixel-demo-poster.png',
		description:
			'Architected and built a Chrome Manifest V3 extension to detect, classify, and optionally block multiple covert tracking mechanisms (1×1 pixels, navigator.sendBeacon, scripted network calls).',
		longDescription: `Browser security project focused on identifying and reducing passive tracking.

• Extension: Chrome Manifest V3.
• Detection: 1×1 image pixels, navigator.sendBeacon usage, scripted network calls.
• Controls: classify and optionally block tracking behavior in real browsing sessions.`,
		type: 'open-source',
		tags: ['TypeScript', 'Chrome Extension', 'HTML'],
		github: 'https://github.com/Qrytics/monoPix-scout',
		demo: 'https://www.youtube.com/watch?v=6szwvvma1QQ',
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2025,
		endMonth: 'Dec',
		endYear: 2025,
		year: 2025,
		slides: 'https://docs.google.com/presentation/d/18sVJu53sH0PjY2BkNtnu0TbnXKawLipJ0ArC-TDxM8I/edit?usp=sharing'
	},
	{
		slug: 'to-do-or-destroy',
		title: 'To-Do or Destroy (HackCMU)',
		subtitle: 'Gamified productivity web app built in a 24-hour hackathon',
		image: '/gifs/todo-destroy-demo.mp4',
		poster: '/gifs/todo-destroy-demo-poster.png',
		description:
			'Team lead on a 24-hour hackathon project: a gamified productivity web app where tasks are “bomb wires” that must be cut before detonation to reinforce accountability through task verification.',
		type: 'open-source',
		tags: ['JavaScript', 'Python', 'HTML'],
		github: 'https://github.com/EatPotatoes/hackcmu25-bomb-todo',
		status: 'archived',
		startMonth: 'Sep',
		startYear: 2025,
		endMonth: 'Sep',
		endYear: 2025,
		year: 2025
	},
	{
		slug: 'child-companion-robot-build18',
		title: 'Child Companion Robot (CMU Build18)',
		shortTitle: 'Child Companion Robot',
		subtitle: 'Webcam + voice triggers mannequin robot, OCR pipeline, and text-to-speech',
		image: '/gifs/companion-robot-pic-demo.png',
		mediaScale: 0.75,
		description:
			'Designed a mannequin "robot" that used a webcam and voice-command triggers to capture images of books, convert them to text via an API-based OCR pipeline, and generate human-like speech from the extracted text.',
		type: 'closed-source',
		tags: ['Python', 'OCR', 'Speech Synthesis', 'OpenCV', 'API'],
		demo: 'https://www.youtube.com/watch?v=-XVi3JBbilk',
		status: 'archived',
		startMonth: 'Jan',
		startYear: 2025,
		endMonth: 'Feb',
		endYear: 2025,
		year: 2025,
		note: 'Additional demo clips are attached on LinkedIn (Prepped-up Demo / Prepped-up Demo 2).'
	},
	{
		slug: 'mixed-signal-dac-system',
		title: 'Mixed Signal DAC System',
		subtitle: 'Full-custom 8-bit R-2R DAC with layout-level optimization',
		images: ['/gifs/mixed-signal-dac-pic.png', '/gifs/mixed-signal-dac-pic2.png'],
		description:
			'Full custom design of an 8-bit R-2R Digital-to-Analog Converter (DAC) with control over gate placement, routing, and layout-level optimization; designed and sized an Operational Transconductance Amplifier (OTA).',
		type: 'closed-source',
		tags: ['Cadence Virtuoso', 'OTA', 'Analog Modeling', 'Parasitic Simulation'],
		status: 'archived',
		startMonth: 'Nov',
		startYear: 2024,
		endMonth: 'Dec',
		endYear: 2024,
		year: 2024
	},
	{
		slug: 'fpga-breakout-game',
		title: 'FPGA Breakout Game',
		subtitle: 'SystemVerilog game on FPGA with VGA output',
		image: '/gifs/breakout-example-demo.mp4',
		poster: '/gifs/breakout-example-demo-poster.png',
		mediaScale: 0.6,
		description:
			'Developed a hardware-accelerated Breakout-style game in SystemVerilog, deployed to an FPGA with VGA output. Designed paddle/ball movement, brick collision detection, and screen refresh logic.',
		type: 'closed-source',
		tags: ['SystemVerilog', 'FPGA', 'VGA', 'FSM'],
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2024,
		endMonth: 'Nov',
		endYear: 2024,
		year: 2024
	},
	{
		slug: 'dont-find-me-pytinker',
		title: '"Don\'t Find Me" (PyTinker Game)',
		subtitle: 'Minimalist evasion game built with Python + Tkinter',
		image: '/gifs/pytinker-game-demo.mp4',
		poster: '/gifs/pytinker-game-demo-poster.png',
		description:
			'Solo-built a minimalist evasion game in Python with Tkinter, implementing the main loop, keyboard controls, on-canvas rendering, collision checks, and clean state transitions.',
		type: 'open-source',
		tags: ['JavaScript', 'Chrome Extension', 'HTML'],
		github: 'https://github.com/Qrytics/15-112-Term-Project',
		demo: 'https://www.youtube.com/watch?v=I-haGKxNNX0',
		status: 'archived',
		startMonth: 'Nov',
		startYear: 2022,
		endMonth: 'Dec',
		endYear: 2022,
		year: 2022,
		note: 'Game showcase & breakdown video (LinkedIn media): https://www.youtube.com/watch?v=I-haGKxNNX0'
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
