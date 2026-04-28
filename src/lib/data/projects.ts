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
	// Case study fields
	/** Short problem statement for the case study. */
	problem?: string;
	/** Key architectural components/decisions (shown as a bullet list). */
	architecture?: string[];
	/** Technical challenges encountered (shown as a bullet list). */
	challenges?: string[];
	/** Tradeoffs made during design or implementation (shown as a bullet list). */
	tradeoffs?: string[];
	/** Outcome / result summary. */
	outcome?: string;
	/** Key learnings from the project (shown as a bullet list). */
	whatYouLearned?: string[];
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
		year: 2026,
		problem: 'Build a full-stack smart-home platform that gives homeowners real-time visibility and control over lighting, temperature, occupancy, and door-lock status, all from a single web dashboard.',
		architecture: [
			'ESP32 firmware (C/C++) with sensors + actuators communicating over MQTT',
			'MQTT broker bridging firmware to backend',
			'FastAPI backend with JWT auth, SQLite persistence, and configurable rules engine',
			'React dashboard for real-time monitoring and control',
			'Docker Compose deployment with GitHub Actions CI/CD'
		],
		challenges: [
			'Achieving sub-second actuation latency end-to-end across MQTT and HTTP layers',
			'Reliably detecting occupancy with a PIR sensor and debouncing false positives',
			'Keeping JWT session management consistent between ESP32 and the web client',
			'Writing cross-platform Docker Compose configs that work on both ARM and x86 hosts'
		],
		tradeoffs: [
			'Chose SQLite over PostgreSQL for simplicity; acceptable for a single-home deployment',
			'Used polling on the frontend for some metrics instead of WebSockets to reduce complexity',
			'Stored JWT secrets in environment variables rather than a secrets manager to avoid cloud dependency'
		],
		outcome: 'End-to-end smart home platform running on real hardware, with sub-second sensor-to-dashboard latency and a passing Pytest + Jest CI suite.',
		whatYouLearned: [
			'Embedded MQTT pub/sub patterns and their tradeoffs vs HTTP polling',
			'FastAPI dependency injection and JWT middleware design',
			'How Docker networking affects service discovery between containers',
			'Debouncing and hardware noise mitigation for PIR sensors'
		]
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
		year: 2026,
		problem: 'Give users an intuitive way to visualise their bank spending, automatically detect recurring charges, and micro-save into cryptocurrency, all within a 24-hour hackathon.',
		architecture: [
			'pnpm monorepo with 8 packages (Next.js web app, shared UI, API layer, analytics, etc.)',
			'Plaid Link + Capital One Nessie API for real transaction ingestion',
			'Deterministic recurring-charge detector using MAD-based confidence scoring',
			'Explorable d3-hierarchy treemap with drill-down, glassmorphic SVG rendering, PNG/SVG export',
			'XRPL blockchain round-up micro-savings with hex-encoded memo anchoring on Testnet',
			'Supabase auth + PostgreSQL; Vitest fuzz testing + Playwright E2E in CI/CD'
		],
		challenges: [
			'Integrating Plaid Link inside a 24-hour hackathon time constraint',
			'Normalising transaction data across two different banking APIs',
			'Making d3 treemap drill-down feel responsive on mobile screens',
			'Submitting real XRPL Testnet payments reliably without hitting rate limits'
		],
		tradeoffs: [
			'Chose Next.js App Router over a lighter framework for its built-in SSR and API routes',
			'Used Supabase instead of a self-hosted database to ship faster during the hackathon',
			'MAD-based recurring detection trades some precision for determinism and zero ML dependencies'
		],
		outcome: 'Shipped a working fintech app at TartanHacks 2026 with live bank data, interactive treemap, and on-chain round-ups, and a full CI pipeline.',
		whatYouLearned: [
			'pnpm monorepo workspace conventions and shared package boundaries',
			'How Plaid Link OAuth flows differ from standard OAuth',
			'XRPL transaction structure and hex-encoded memo fields',
			'd3 hierarchy and treemap layouts with interactive drill-down'
		]
	},
	{
		slug: 'spotify-hero',
		title: 'Spotify Hero',
		shortTitle: 'spotifyHero',
		subtitle: "Desktop rhythm game that transforms Spotify songs into playable note charts",
		image: '/demos/spotify-hero-preview.svg',
		description:
			"Built a desktop rhythm experience that converts live Spotify playback into Guitar Hero-style note lanes in real time. Players can jump in instantly via keybinds, chase higher scores, and share challenge runs with friends.",
		longDescription: `Desktop rhythm companion for Spotify-based play sessions.

• Parses Spotify playback into playable chart patterns and timing windows.
• Supports quick drop-in sessions through global keybind activation.
• Tracks score performance and supports challenge-style sharing with friends.
• Designed as a lightweight desktop app with low setup friction and fast launch.`,
		type: 'open-source',
		tags: ['TypeScript', 'Spotify API'],
		github: 'https://github.com/Qrytics/spotifyHero',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'ai-tutoring',
		title: 'AiTutoring',
		subtitle: 'Monorepo tutoring platform with a modern frontend and serverless backend integrations',
		image: '/demos/ai-tutoring-preview.svg',
		description:
			'Built a high-performance monorepo tutoring platform with a modern frontend and serverless backend primitives. Integrated Stripe for secure checkout and Calendly scheduling flows for streamlined booking and payment.',
		type: 'open-source',
		tags: ['TypeScript', 'Svelte', 'Stripe API', 'Calendly API'],
		github: 'https://github.com/Qrytics/AiTutoring',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'watchlist-tracker',
		title: 'watchlistTracker',
		subtitle: 'Media tracking app for release alerts, franchise updates, and nearby theater discovery',
		image: '/demos/watchlist-tracker-preview.svg',
		description:
			'Created a watchlist platform that tracks shows and movies with alerts for episode drops, release dates, and nearby theater availability. Aggregates ecosystem updates (news, social posts, and franchise chatter) so users can follow everything from one place.',
		type: 'open-source',
		tags: ['TypeScript'],
		github: 'https://github.com/Qrytics/watchlistTracker',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'sound-visual-avora',
		title: 'soundVisual-Avora',
		subtitle: 'Real-time audio-reactive visual experience built for Avora take-home evaluation',
		image: '/demos/sound-visual-avora-project-preview.svg',
		description:
			'Engineered an interactive sound-visualization project that transforms audio features (frequency, energy, and speech signals) into dynamic visual motion. Focused on responsiveness, visual polish, and clean interaction design.',
		type: 'open-source',
		tags: ['TypeScript', 'WebGL'],
		github: 'https://github.com/Qrytics/soundVisual-Avora',
		siteUrl: 'https://sound-visual-avora.vercel.app',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'dungeon-agents-prove-ai',
		title: 'dungeonAgents-ProveAI',
		subtitle: '8x8 AI-agent dungeon simulation prioritizing interpretable traces over opaque autonomy',
		image: '/demos/dungeon-agents-prove-ai-preview.svg',
		description:
			'Built an AI-agent simulation sandbox where agents navigate an 8x8 dungeon while producing structured execution traces. Integrated Langfuse observability to capture tool calls and model state, enabling rapid diagnosis of stale-context and decision-failure patterns.',
		type: 'open-source',
		tags: ['Python', 'Langfuse'],
		github: 'https://github.com/Qrytics/dungeonAgents-ProveAI',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
		endYear: 2026,
		year: 2026
	},
	{
		slug: 'brain-feels',
		title: 'brainFeels',
		subtitle: 'Chrome extension that estimates emotional intent of thumbnails and web imagery',
		image: '/demos/brain-feels-preview.svg',
		description:
			'Developed a TRIBE v2-powered Chrome extension that analyzes YouTube thumbnails and web images for emotional signaling. Interprets visual cues and presents a compact "emotion mosaic" summary to help users quickly understand persuasive framing.',
		type: 'open-source',
		tags: ['JavaScript', 'TRIBE v2'],
		github: 'https://github.com/Qrytics/brainFeels',
		status: 'active',
		startMonth: 'Apr',
		startYear: 2026,
		endMonth: 'Apr',
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
		year: 2026,
		problem: 'Eliminate the manual, error-prone process of writing Dockerfiles by generating, building, and self-healing them automatically from project context using an LLM.',
		architecture: [
			'Python CLI built with Rich + Argparse for UX and progress feedback',
			'LiteLLM abstraction layer for pluggable LLM backends (OpenAI, local, etc.)',
			'Project-context extractor that reads directory structure and config files',
			'Self-healing loop: build → diagnose failure via LLM → patch → retry',
			'Runtime stability tester (container smoke test after successful build)',
			'Distroless and Alpine multi-stage build templates to minimise attack surface'
		],
		challenges: [
			'Prompting the LLM to produce deterministic, valid Dockerfile syntax reliably',
			'Distinguishing transient Docker daemon errors from structural Dockerfile errors',
			'Avoiding infinite retry loops without hard-coding a fixed number of attempts',
			'Supporting diverse project structures (Node, Python, Go, etc.) with one prompt strategy'
		],
		tradeoffs: [
			'Chose LiteLLM over a direct OpenAI SDK call to stay provider-agnostic',
			'Accepted non-determinism in LLM output in exchange for higher-quality Dockerfiles',
			'Self-healing loop is bounded by a configurable max-retries flag rather than time limit'
		],
		outcome: 'CLI successfully generates and validates Dockerfiles for Node, Python, and Go projects with auto-remediation of common build errors.',
		whatYouLearned: [
			'Prompt engineering patterns for structured code generation',
			'Docker SDK for Python and programmatic image build APIs',
			'How to design resilient retry loops with exponential back-off',
			'Multi-stage Dockerfile optimisation for security and image size'
		]
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
		slides: 'https://docs.google.com/presentation/d/1Son_yn0dr5vEIMwTeSbLOCbJg8lxHvQf/edit?usp=sharing',
		problem: 'Deep-fake video tools generate convincing synthetic content with no built-in provenance. Add an authentication layer that lets anyone verify whether a frame was produced by a specific model instance.',
		architecture: [
			'LSB steganography module embedding cryptographic metadata invisibly into pixel channels',
			'Compression-resistant payload design (survives JPEG re-encode up to ~85% quality)',
			'RSA-2048 digital signature generation and verification using Python cryptography library',
			'AES-256-CBC encrypted private key storage for PKI key material',
			'CLI tools for key generation, signing, and verification',
			'ONNX Runtime + InsightFace + OpenCV + PyTorch ML pipeline; Docker-containerised for portability'
		],
		challenges: [
			'Ensuring LSB payload survived JPEG compression (chose bit planes 0–1 and channel weighting)',
			'Keeping RSA signature generation below 40 ms per frame at 30 fps',
			'Designing a key-derivation scheme that is reproducible yet resistant to brute force',
			'Cross-platform Docker image for both CPU (x86) and GPU (CUDA) inference'
		],
		tradeoffs: [
			'LSB steganography is invisible but fragile against aggressive re-encoding; balanced by targeting bit planes least affected by DCT',
			'RSA-2048 chosen over ECDSA for wider tooling compatibility despite larger key size',
			'Closed-source to protect proprietary watermarking algorithm design'
		],
		outcome: 'Dual-layer security system passed all synthetic test cases; watermark survived JPEG compression at 85% quality and signatures verified end-to-end.',
		whatYouLearned: [
			'How LSB steganography interacts with DCT-based compression codecs',
			'Python cryptography library internals: RSA, AES key derivation, padding schemes',
			'ONNX Runtime inference optimisation for real-time video pipelines',
			'PKI design patterns: certificate chains, key revocation, and secure storage'
		]
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
		tags: ['TypeScript', 'HTML', 'Manifest V3'],
		github: 'https://github.com/Qrytics/monoPix-scout',
		demo: 'https://www.youtube.com/watch?v=6szwvvma1QQ',
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2025,
		endMonth: 'Dec',
		endYear: 2025,
		year: 2025,
		slides: 'https://docs.google.com/presentation/d/18sVJu53sH0PjY2BkNtnu0TbnXKawLipJ0ArC-TDxM8I/edit?usp=sharing',
		problem: 'Most browsers expose no visibility into tracking pixels hidden on web pages. Build an extension that surfaces them in real time without breaking normal browsing.',
		architecture: [
			'Chrome Manifest V3 service worker with declarativeNetRequest rule engine',
			'Content script scanning DOM for 1×1 image elements and suspicious attribute patterns',
			'Background listener intercepting navigator.sendBeacon and XHR/fetch calls to known tracker domains',
			'Popup UI summarising detected trackers per domain with block toggle'
		],
		challenges: [
			'MV3 service-worker lifecycle limitations made stateful blocking harder than MV2 background pages',
			'Avoiding false positives on legitimate 1×1 spacer images used for layout',
			'Keeping CPU overhead below 1% on real browsing sessions with many DOM mutations'
		],
		tradeoffs: [
			'Chose Manifest V3 for future-proofing despite its reduced background-script capabilities',
			'Blocklist sourced from public tracker lists; trades recall for low false-positive rate',
			'Popup built in vanilla TS without a framework to minimise extension bundle size'
		],
		outcome: 'Extension correctly identified tracking pixels and sendBeacon calls on test sites, with near-zero impact on page load times.',
		whatYouLearned: [
			'Chrome Manifest V3 API constraints vs MV2 background pages',
			'Browser network interception via declarativeNetRequest vs webRequest',
			'Performance profiling of content scripts with Chrome DevTools',
			'Heuristic design to reduce false positives in ad-hoc pixel detection'
		]
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
		year: 2025,
		problem: 'Standard to-do apps are boring and easy to ignore. Make task completion emotionally high-stakes by framing each task as a bomb wire that must be cut before a timer detonates.',
		architecture: [
			'Vanilla JavaScript frontend with canvas-based "bomb wire" rendering',
			'Python Flask backend for task persistence and timer management',
			'WebSocket channel for real-time countdown synchronisation across clients',
			'Task verification modal before "wire cut" to prevent accidental completion'
		],
		challenges: [
			'Implementing convincing bomb-timer UX in under 24 hours with a team',
			'Coordinating timer state between clients via WebSockets without a full backend framework',
			'Balancing game tension with usability (timers that are too short frustrate rather than motivate)'
		],
		tradeoffs: [
			'Chose Flask + vanilla JS over a heavier stack to move faster during the hackathon',
			'Persisted tasks in memory (no DB) to avoid setup overhead; acceptable for a demo'
		],
		outcome: 'Functional gamified to-do app demoed at HackCMU 2025; drew consistent crowd engagement during judging.',
		whatYouLearned: [
			'WebSocket state synchronisation patterns for real-time collaborative UIs',
			'Rapid prototyping under hackathon time pressure and team coordination',
			'How gamification mechanics change user motivation vs traditional UI patterns'
		]
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
		tags: ['Python', 'OpenCV'],
		demo: 'https://www.youtube.com/watch?v=-XVi3JBbilk',
		status: 'archived',
		startMonth: 'Jan',
		startYear: 2025,
		endMonth: 'Feb',
		endYear: 2025,
		year: 2025,
		note: 'Additional demo clips are attached on LinkedIn (Prepped-up Demo / Prepped-up Demo 2).',
		problem: 'Children with reading difficulties or visual impairments need a low-cost, engaging companion that reads physical books aloud when asked, without requiring a screen or complex interaction.',
		architecture: [
			'Raspberry Pi with USB webcam for image capture triggered by voice command',
			'Voice-command listener using a lightweight keyword-spotting library',
			'OCR API pipeline for extracting text from captured book-page images',
			'Text-to-speech engine converting extracted text to natural speech audio',
			'Mannequin form factor for friendly physical presence'
		],
		challenges: [
			'Achieving acceptable OCR accuracy on curved or partially shadowed book pages',
			'Reducing voice-command latency to feel responsive during child interaction',
			'Fitting all processing on a Raspberry Pi 4 without offloading to a cloud server'
		],
		tradeoffs: [
			'Chose a cloud OCR API over on-device OCR to maximise accuracy on the Pi',
			'Keyword spotting instead of full ASR reduces power draw and false triggers',
			'Closed-source given the CMU Build18 project nature'
		],
		outcome: 'Robot successfully captured book pages, extracted text via OCR, and read them aloud with natural-sounding TTS in live demos at CMU Build18.',
		whatYouLearned: [
			'Raspberry Pi GPIO and camera module integration in Python',
			'Practical limits and tuning of cloud OCR APIs for physical document scans',
			'Audio output pipeline on embedded Linux (ALSA/Pulse audio routing)',
			'Designing user experiences for non-technical, young end-users'
		]
	},
	{
		slug: 'mixed-signal-dac-system',
		title: 'Mixed Signal DAC System',
		subtitle: 'Full-custom 8-bit R-2R DAC with layout-level optimization',
		images: ['/gifs/mixed-signal-dac-pic.png', '/gifs/mixed-signal-dac-pic2.png'],
		description:
			'Full custom design of an 8-bit R-2R Digital-to-Analog Converter (DAC) with control over gate placement, routing, and layout-level optimization; designed and sized an Operational Transconductance Amplifier (OTA).',
		type: 'closed-source',
		tags: ['Cadence Virtuoso'],
		status: 'archived',
		startMonth: 'Nov',
		startYear: 2024,
		endMonth: 'Dec',
		endYear: 2024,
		year: 2024,
		problem: 'Design an 8-bit Digital-to-Analog Converter from the transistor level, meeting specs for linearity, bandwidth, and noise in a real 180 nm process.',
		architecture: [
			'R-2R resistor ladder network for binary-weighted current summation',
			'Custom Operational Transconductance Amplifier (OTA) for output buffering',
			'Full Cadence Virtuoso schematic with manual gate placement and routing',
			'Parasitic extraction and post-layout simulation to verify AC/DC specs',
			'DRC and LVS sign-off for physical design rule compliance'
		],
		challenges: [
			'Meeting gain-bandwidth requirements with the OTA across PVT corners',
			'Minimising layout-induced mismatch in the R-2R ladder for DNL/INL targets',
			'Routing high-density analog layout without introducing parasitic coupling',
			'Iterating schematic ↔ layout ↔ simulation without breaking convergence'
		],
		tradeoffs: [
			'Chose R-2R topology over current-steering DAC for simpler layout at 8-bit resolution',
			'Sized OTA for 70 dB gain over 1 MHz bandwidth; narrower than some alternatives but sufficient for audio range',
			'Manual routing prioritised matching over density to protect linearity'
		],
		outcome: 'Passing DRC/LVS; post-layout simulation met DNL < 0.5 LSB and INL < 1 LSB across nominal and SS process corners.',
		whatYouLearned: [
			'Full-custom analog IC design flow from schematic to layout sign-off',
			'OTA topology selection and sizing methodology (gm/ID approach)',
			'How parasitic extraction changes AC response vs schematic simulation',
			'Cadence Virtuoso layout techniques for matching-sensitive analog circuits'
		]
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
		tags: ['SystemVerilog'],
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2024,
		endMonth: 'Nov',
		endYear: 2024,
		year: 2024,
		problem: 'Implement a fully playable Breakout clone in hardware with no CPU or OS, where all game logic runs as synchronous digital circuits on an FPGA outputting a live VGA signal.',
		architecture: [
			'Top-level SystemVerilog module wiring VGA timing, game FSM, and input controller',
			'VGA sync generator producing 640×480 @ 60 Hz H/V sync and pixel clock',
			'Parameterised ball physics module with fixed-point velocity and collision detection',
			'Paddle controller driven by on-board push buttons with debounce logic',
			'Brick grid ROM with hit-tracking registers cleared on collision',
			'Score/lives display using on-screen 7-segment font rendered in logic'
		],
		challenges: [
			'Fitting all logic within FPGA LUT budget while meeting 25.175 MHz pixel-clock timing',
			'Implementing collision detection between a moving ball and a grid of bricks without a CPU',
			'Handling edge-case ball corner collisions without introducing visual glitches',
			'Synchronising button input debounce with the VGA frame clock domain'
		],
		tradeoffs: [
			'Used fixed-point arithmetic (Q4.4) instead of floating-point to stay within FPGA DSP blocks',
			'Brick grid stored in registers rather than block RAM for simpler combinatorial hit logic',
			'Single-speed ball velocity (no acceleration) to keep FSM states manageable'
		],
		outcome: 'Fully playable Breakout game running on FPGA hardware with stable 60 Hz VGA output, correct collision physics, and score tracking.',
		whatYouLearned: [
			'VGA timing specification and how to derive sync signals in hardware',
			'Fixed-point arithmetic design patterns in SystemVerilog',
			'FSM decomposition for game state (idle, playing, ball lost, win)',
			'Timing closure techniques: pipeline stages and register retiming in Quartus'
		]
	},
	{
		slug: 'wifi-scan',
		title: 'Wifi Scan',
		subtitle: 'Privacy-first occupancy tracking via ARP scanning with a React dashboard, React Native app, and FastAPI backend',
		description:
			'Full-stack presence-sensing platform that turns any local Wi-Fi network into an occupancy engine with no extra hardware required. The Python backend performs ARP sweeps every 30 s with Scapy (nmap fallback), records devices in PostgreSQL, and exposes a FastAPI REST API consumed by both a React + Vite admin dashboard (deployed to GitHub Pages) and a React Native + Expo mobile app with background geofencing.',
		longDescription: `Privacy-first occupancy tracker powered entirely by existing Wi-Fi infrastructure.

• Backend: FastAPI + Uvicorn; SQLAlchemy ORM against PostgreSQL; background ARP scanner using Scapy with nmap fallback.
• Detection: devices not seen in 5 minutes are marked offline; round-trip variance (pseudo-CSI) estimates physical movement.
• Admin Dashboard: React + Vite + Tailwind deployed to GitHub Pages; 7-day heatmap, muster report, energy recommendations.
• Mobile App: React Native via Expo with Tailwind/NativeWind; background geofencing task sends heartbeat within 100 m radius.
• Features: Ghost Mode, guest alerts, real-time headcount, 7-day day×hour occupancy heatmap.
• CI/CD: GitHub Actions builds and deploys admin dashboard to GitHub Pages on every push to main.`,
		image: '/demos/wifi-scan-demo.png',
		type: 'open-source',
		tags: ['TypeScript', 'Python', 'React', 'React Native', 'FastAPI', 'PostgreSQL', 'Scapy', 'Expo', 'Tailwind CSS'],
		github: 'https://github.com/Qrytics/wifiScan',
		siteUrl: 'https://qrytics.github.io/wifiScan/',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'clear-cites',
		title: 'Clear Cites',
		subtitle: 'Visual academic citation graph (ScholarGraph) built on Neo4j, FastAPI, React Flow, and LangChain',
		description:
			'clearCites / ScholarGraph is an open-source visual discovery tool that maps academic research as an interactive knowledge graph. Papers are Neo4j nodes; citations, author overlaps, and funding relationships are edges. LangChain + OpenAI generates plain-English summaries and evaluates paper relationships (validates / builds_on / challenges). Users can navigate the full citation pedigree of any paper and identify publicly-funded research by funding-source tags.',
		longDescription: `Open-source academic knowledge graph for navigating the "lineage of ideas."

• Graph DB: Neo4j with Cypher DDL; nodes for Paper, Author, Keyword, Funder; edges for CITES, VALIDATES, BUILDS_ON, CHALLENGES, FUNDED_BY.
• Data Pipeline: Python ingestors for Semantic Scholar & CrossRef APIs; parser extracts keywords, authors, and funding sources; graph_pusher converts to Neo4j Nodes/Edges.
• Backend: FastAPI (async) with endpoints for citation chains, pedigree traversal, keyword search, author overlap, and AI relationship evaluation.
• AI: LangChain + OpenAI generates 3-sentence plain-English abstracts and returns structured relationship JSON: { relationship, correlation_value }.
• Frontend: React Flow interactive canvas (GraphCanvas) with drag, click, and zoom; PaperDetail sidebar; metric-based node scaling by impact_score.
• Infra: Docker Compose (Neo4j + FastAPI + React); fully containerised for one-command startup.`,
		image: '/demos/clear-cites-demo.png',
		type: 'open-source',
		tags: ['Python', 'FastAPI', 'Neo4j', 'TypeScript', 'React', 'LangChain', 'OpenAI', 'Docker', 'Semantic Scholar API'],
		github: 'https://github.com/Qrytics/clearCites',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'streamer-stalker',
		title: 'Streamer Stalker',
		subtitle: 'Discord bot that polls Twitch, Twitter/X (Nitter RSS), and vtuber Reddit news on a schedule with optional OpenAI summaries',
		description:
			'streamerStalker is a TypeScript Discord bot that keeps communities in sync across three platforms without leaving Discord. node-cron jobs poll the Twitch Helix API every minute for live-stream transitions, Nitter RSS feeds every 3 minutes for tweets, and Reddit RSS every 30 minutes for vtuber news. All tracking is per-guild and per-channel; an optional OpenAI gpt-3.5-turbo integration generates 2–3 sentence summaries of news updates.',
		longDescription: `Per-guild Discord notification bot for Twitch, Twitter/X, and VTuber news.

• Stack: TypeScript / Node.js 18+, discord.js v14, PostgreSQL 15 via pg, node-cron, axios, dotenv; Docker Compose for local Postgres.
• Twitch: OAuth Client Credentials flow to the Helix API; offline→live transition detection prevents duplicate pings.
• Twitter/X: Nitter RSS polling with multi-instance fallback; tweet_cache table deduplicates by post ID.
• VTuber News: Reddit RSS (r/VirtualYoutubers, r/Hololive); news_articles deduplication by URL; optional GPT summary.
• Commands: /track and /untrack for twitch, twitter, vtuber; /list to view all subscriptions per server.
• Architecture: cron scheduler → tracker services → EmbedBuilder notifications posted to stored channel IDs.`,
		image: '/demos/streamer-stalker-demo.png',
		type: 'open-source',
		tags: ['TypeScript', 'Node.js', 'discord.js', 'PostgreSQL', 'Twitch API', 'OpenAI', 'node-cron', 'Docker'],
		github: 'https://github.com/Qrytics/streamerStalker',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'shorts-blocker',
		title: 'Shorts Blocker',
		subtitle: 'Manifest V3 Chrome & Safari extension that removes YouTube Shorts and recommendations via MutationObserver',
		description:
			'A cross-browser Manifest V3 extension (Chrome and Safari) that keeps YouTube focused by blocking the Shorts shelf, navigation entry, and individual Short items, and hiding sidebar recommendations, end-screen cards, and homepage rows. A MutationObserver and YouTube\'s yt-navigate-finish event keep blocking active during SPA navigations. A popup toggle lets users enable or disable blocking without reinstalling.',
		longDescription: `Lightweight YouTube distraction-removal extension built for MV3.

• Blocking: CSS selector–based display:none on Shorts shelves, reel renderers, end-screen cards, related sidebar, and homepage recommendation rows.
• SPA support: MutationObserver watches for dynamically added nodes; yt-navigate-finish listener re-applies selectors after client-side navigation.
• Toggle: popup.html + popup.js reads/writes enabled flag via chrome.storage.local and sends SET_ENABLED message to the active tab's content script.
• Cross-browser shim: unified browser / chrome namespace works on Chrome and Safari without separate builds.
• Safari: convertible via xcrun safari-web-extension-converter for macOS/iOS 15.4+.`,
		image: '/demos/shorts-blocker-demo.png',
		type: 'open-source',
		tags: ['JavaScript', 'Manifest V3', 'HTML', 'CSS'],
		github: 'https://github.com/Qrytics/shortsBlocker',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'cmu-march-madness-ml',
		title: 'CMU March Madness ML',
		subtitle: 'Ensemble ML system (XGBoost + LightGBM + LR, 103 features) predicting NCAA tournament winners with a live GitHub Pages dashboard',
		description:
			'An ML system built for the CMU Second Annual March Madness Machine Learning Competition. A weighted ensemble of XGBoost (40%), LightGBM (40%), and Logistic Regression (20%) trained on 103 differential features per matchup, including KenPom, Barttorvik T-Rank, NET rankings, and seed history. Achieved 72.3% CV accuracy (Men) and 75.1% (Women) on real Kaggle NCAA data using walk-forward CV. A GitHub Actions pipeline retrains and deploys a live bracket dashboard to GitHub Pages.',
		longDescription: `NCAA March Madness bracket prediction via walk-forward CV ensemble ML.

• Models: XGBoost (40%) + LightGBM (40%) + Logistic Regression (20%); isotonic regression calibration; optional Optuna Bayesian hyperparameter tuning.
• Features: 103 differential features per matchup: box-score stats, KenPom AdjEM/AdjO/AdjD, Barttorvik T-Rank, NET ranking, Massey ordinals (30+ systems), SOS, coaching tenure, conference strength, and tournament seed history.
• Data: Kaggle March Machine Learning Mania 2026 dataset (124k+ real games); external enrichment from KenPom and Barttorvik.
• Validation: walk-forward CV (train on years ≤N, validate on N+1); no data leakage; 72.3% Men's / 75.1% Women's AUC accuracy.
• Pipeline: run_bracket.py simulates full round-by-round brackets; export_site_data.py publishes model outputs to the live dashboard.
• CI/CD: GitHub Actions for CI tests, weekly model retraining with Kaggle secrets, and GitHub Pages deployment.`,
		image: '/demos/cmu-march-madness-ml-demo.png',
		type: 'open-source',
		tags: ['Python', 'XGBoost', 'LightGBM', 'scikit-learn', 'Optuna', 'pandas', 'GitHub Actions'],
		github: 'https://github.com/Qrytics/cmuMarchMadness-ML',
		siteUrl: 'https://qrytics.github.io/cmuMarchMadness-ML/',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'smart-desktop',
		title: 'Smart Desktop',
		subtitle: 'Offline voice automation assistant using Porcupine wake-word detection and Faster-Whisper STT for developer workflow control',
		description:
		'A fully offline, always-on voice assistant for power users and developers, similar to Siri or Alexa but running entirely on local hardware. Porcupine listens for a wake word ("Jarvis") with ultra-low CPU usage, Faster-Whisper transcribes the command without internet, and a YAML-configured command dispatcher opens apps, manages windows, runs terminal commands (git, npm, pytest), and navigates project directories.',
		longDescription: `Offline voice-controlled developer assistant with zero cloud and zero latency overhead.

• Pipeline: microphone → Porcupine wake-word detection → Faster-Whisper offline STT → CommandParser dispatch → OS action.
• Actions: app launcher (Chrome, VS Code, Spotify, Discord), window management (snap, maximise, swap monitors), terminal automation (git status, npm run dev, pytest), project directory navigation.
• Config: all commands and shortcuts defined in config.yaml; no code changes needed to add new apps or macros.
• Stack: Python 3.9+, Porcupine (Picovoice), Faster-Whisper, PyAudio/PortAudio, PyAutoGUI, pygetwindow, PyYAML, subprocess.
		• Cross-platform: Windows, macOS, Linux.`,
		image: '/demos/smart-desktop-demo.png',
		type: 'open-source',
		tags: ['Python', 'Porcupine', 'Faster-Whisper', 'PyAutoGUI', 'PyAudio', 'PyYAML'],
		github: 'https://github.com/Qrytics/smartDesktop',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'rune-lo-ldb',
		title: 'Rune LO LDB',
		subtitle: 'Electron + FastAPI desktop overlay with a 3-layer rune recommendation engine (player history → defaults → high-elo data)',
		description:
		'A League of Legends desktop companion that detects champion select via the LCU API and automatically recommends and imports the best rune page with one click. The recommendation engine checks the player\'s own win history first, falls back to curated champion/role defaults, and finally to aggregated Master+ statistics. An always-on-top Electron overlay shows the recommendation instantly without disrupting gameplay.',
		longDescription: `LoL desktop overlay with a learning rune recommendation engine.

• Detection: Electron main process polls the League Client Update (LCU) API to detect champion select sessions.
• Recommendation engine (3 layers): Layer 1: player rune history with win/loss outcomes; Layer 2: curated default pages per champion/role; Layer 3: high-elo (Master+) aggregated rune statistics.
• One-click import: recommended rune page is imported directly into the LoL client via the LCU proxy endpoint.
• Stack: Electron + TypeScript frontend; Python + FastAPI backend; PostgreSQL via SQLAlchemy; Jest (frontend) + pytest (backend).
		• Infra: Docker Compose (Postgres + FastAPI); Alembic migrations; .env-based config.`,
		image: '/demos/rune-lo-ldb-demo.png',
		type: 'open-source',
		tags: ['TypeScript', 'Python', 'Electron', 'FastAPI', 'PostgreSQL', 'League of Legends LCU API', 'Docker'],
		github: 'https://github.com/Qrytics/runeLoLDB',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'phone-ctrl',
		title: 'Phone Ctrl',
		subtitle: 'C++ Windows host + Flutter mobile client for live screen streaming and touch-to-input control over WebRTC/H.264',
		description:
		'phoneCtrl turns your phone into a pocket TeamViewer. The C++ host on Windows captures the display via DXGI, encodes it with FFmpeg/libx264 at up to 60 fps, and streams it over a WebRTC/H.264 data channel to a Flutter mobile client. Touch gestures on the phone are translated to Windows SendInput mouse and keyboard events, giving full remote control with DTLS-SRTP encrypted traffic.',
		longDescription: `Low-latency remote desktop from laptop to phone over WebRTC.

• Laptop host (C++/Windows): DXGI GPU screen capture → FFmpeg libx264 H.264 encoder → Boost.Beast WebSocket server → Windows SendInput for mouse/keyboard injection.
• Phone client (Flutter/Dart): Android & iOS; RTCVideoView full-screen H.264 decode; touch overlay translates gestures to JSON input events over WebRTC data channel.
• Signaling: Node.js WebSocket server for SDP/ICE exchange.
• Security: all WebRTC media and data channel traffic is DTLS-SRTP encrypted; designed for trusted local networks.
• Gestures: single tap = left click, long press = right click, drag = mouse move, two-finger scroll, double-tap = toolbar.
		• Build: CMake + vcpkg (FFmpeg[x264] + Boost); Flutter SDK ≥ 3.0.`,
		image: '/demos/phone-ctrl-demo.png',
		type: 'open-source',
		tags: ['C++', 'Flutter', 'Dart', 'WebRTC', 'Node.js', 'FFmpeg', 'CMake', 'Windows API'],
		github: 'https://github.com/Qrytics/phoneCtrl',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'song-recs',
		title: 'Song Recs',
		subtitle: 'Discord music intelligence bot using Spotify audio feature vectors for cosine-similarity recommendations and Music DNA profiles',
		description:
		'A TypeScript Discord bot that turns a server into a music ecosystem. Users import Spotify playlists and the bot stores 8 audio feature vectors (energy, danceability, valence, tempo, etc.) per track. A recommendation engine computes each user\'s taste vector and surfaces songs from others\' playlists via cosine similarity and collaborative filtering. Commands surface Music DNA archetypes, music twins, taste distance scores, and a daily randomly-picked song.',
		longDescription: `Spotify-powered Discord music intelligence bot with cosine similarity recommendations.

• Stack: TypeScript / Node.js 20+, discord.js v14, PostgreSQL via pg, Spotify Web API, node-cron, Docker Compose.
• Data model: users, songs (with 8 audio features), playlists, taste_vectors (precomputed per user), user_similarity (pairwise cosine cache), daily_history.
• Recommendation: Layer 1: content-based cosine similarity on taste vectors; Layer 2: collaborative filtering via users with similar vectors.
• Music DNA: per-user archetype (Party Starter, Chill Wanderer, Indie Explorer, etc.) from energy, mood, danceability, acousticness averages; obscurity = 100 − average Spotify popularity.
• Commands: /addplaylist, /recommend, /musicdna, /musictwin, /tastedistance, /compatibility, /discover, /tasteleaderboard, /tasteprofile.
		• Automation: daily-song cron job posts a random user's track to a configured channel.`,
		image: '/demos/song-recs-demo.png',
		type: 'open-source',
		tags: ['TypeScript', 'Node.js', 'Spotify API', 'PostgreSQL', 'Docker', 'discord.js'],
		github: 'https://github.com/Qrytics/songRecs',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'tech-stack-analyzer',
		title: 'Tech Stack Analyzer',
		subtitle: 'CLI that deep-scans any public GitHub repo and generates a rich terminal report, narrated audio, and optional explainer video',
		description:
		'A pip-installable Python CLI that accepts any public GitHub repo URL (or auto-detects from the current git remote) and performs a deep tech-stack analysis: languages, frameworks, databases, CI/CD, containers, auth, messaging, and cloud SDKs. Output is a Rich terminal table and a JSON report by default. Add --audio to get TTS narration via edge-tts, and --video to get PIL-rendered slides exported to MP4. Optional Ollama LLM rewrites narration into conversational prose.',
		longDescription: `Deep GitHub repo tech-stack analyzer with optional AI narration and video export.

• Detection: GitHub API scanning + pattern matching across 8 categories (languages, package managers, databases, CI/CD, containers, auth, messaging, cloud SDKs).
• Output: Rich terminal summary table + stack_report.json; per-section MP3 narration with edge-tts (gTTS fallback); PIL slide renderer → moviepy MP4 export.
• AI: optional Ollama (llama3, mistral, etc.) rewrites narration sections into engaging prose; falls back to template narration gracefully.
• CLI flags: --audio, --video, --use-ollama, --ollama-model, --voice, --token, --output.
• Auto-detection: when run inside a git clone, derives the GitHub URL from the origin remote; no URL argument needed.
		• Logo pipeline: Devicon CDN → SimpleIcons → Clearbit → placeholder; parallel image downloads.`,
		image: '/demos/tech-stack-analyzer-demo.png',
		type: 'open-source',
		tags: ['Python', 'GitHub API', 'Ollama', 'edge-tts', 'PIL', 'FFmpeg', 'Rich'],
		github: 'https://github.com/Qrytics/techStackAnalyzer',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'file-port',
		title: 'File Port',
		subtitle: 'Local-first shadow file system with a Node.js + Chokidar agent, PocketBase sync layer, Xterm.js web terminal, and React Native mobile client',
		description:
		'A hybrid between git, Syncthing, and a headless CMS. filePort runs a Node.js agent that watches local folders with Chokidar, syncing changes into a PocketBase SQLite database in real time. An Xterm.js web terminal UI lets users browse and edit files from any browser (including mobile via Tailscale). Edits set a needs_sync flag and the reconciler loop applies them back to the laptop. A separate React Native component and Python Supabase poller provide an alternative mobile-to-desktop sync path.',
		longDescription: `Local-first offline-friendly file system synced to mobile via a lightweight database.

• Agent: Node.js + Chokidar watches configured folders; scans on startup, upserts records, runs a reconcile loop every 10 s for mobile edits.
• Sync DB: PocketBase (single-file SQLite) with fields: path, content, needs_sync, pending_sync, last_modified_local/mobile.
• Web UI: Xterm.js + Express.js terminal SPA; ls, cd, cat, edit, pwd, clear, help commands; Save sets pending_sync = true.
• React Native component: TerminalCLI + FileEditor backed by Supabase; Jest + @testing-library/react-native test suite.
• Python sync poller: polls Supabase every 60 s for pending_sync rows, writes content to local filesystem, clears flag.
		• Remote access: Tailscale zero-config VPN; point phone browser at PC's Tailscale IP.`,
		image: '/demos/file-port-demo.png',
		type: 'open-source',
		tags: ['JavaScript', 'Node.js', 'React Native', 'PocketBase', 'Supabase', 'Python', 'SQLite', 'Chokidar', 'Xterm.js'],
		github: 'https://github.com/Qrytics/filePort',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'repo-nav-touch',
		title: 'Repo NAV Touch',
		subtitle: 'Webcam-driven hand-gesture file navigator using MediaPipe 21-point landmarks and PyAutoGUI OS actions',
		description:
		'Hook up a webcam and navigate your file system entirely with hand gestures. repoNavTouch runs a See → Think → Act pipeline: OpenCV captures frames, MediaPipe detects 21 3-D hand landmarks per frame, a GestureRecogniser state machine classifies them into a Gesture enum (pinch, swipe-left/right, open-palm-up/down, two-fingers-up), and a FileNavigator maps each gesture to OS-level directory navigation actions via PyAutoGUI.',
		longDescription: `Gesture-based file navigation using real-time hand tracking.

• See: OpenCV webcam loop at configurable device index; MediaPipe Hands model detects 21 3-D landmarks per frame.
• Think: gestures.py geometry helpers + GestureRecogniser state machine; normalised landmark positions; configurable pinch threshold.
• Act: file_navigator.py maps gestures to OS keyboard/mouse events via PyAutoGUI; supports both file explorer and terminal navigation.
• Gestures: pinch = enter/open, swipe-left = back, swipe-right = forward, open-palm-up/down = scroll, two-fingers-up = cd ..
• HUD overlay: OpenCV window with live landmark visualisation and current gesture label.
		• Tests: pytest unit tests for gesture classification and file navigation logic.`,
		image: '/demos/repo-nav-touch-demo.png',
		type: 'open-source',
		tags: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Pynput'],
		github: 'https://github.com/Qrytics/repoNavTouch',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'idea-db',
		title: 'Idea DB',
		subtitle: 'Discord bot that algorithmically indexes server messages and uses Groq LLM (llama-3.1-8b-instant) to synthesise startup/project ideas',
		description:
		'IdeaDB silently observes Discord conversations and runs a zero-LLM, zero-external-API metadata extraction pipeline over every message: keyword frequency analysis, tech-term regex matching, file attachment classification, URL platform recognition, and embed scraping. All data is stored in SQLite. When you run !ideas, it builds a structured context prompt from aggregated keywords and sends it to Groq\'s llama-3.1-8b-instant to generate actionable startup/project ideas with name, pitch, problem, audience, and tech stack.',
		longDescription: `Passive Discord idea-harvesting bot with algorithmic parsing and Groq LLM generation.

• Collection: listens on configured channels; parses text (stopword-filtered keyword frequency, tech-term regex), file attachments (MIME type, filename tokens, media class), URLs (known-platform table, path tokenisation, query keys), and Discord embeds.
• Storage: SQLite with guild-scoped entries table; indices on guild_id and content_type; survives restarts.
• Idea generation: Groq API (llama-3.1-8b-instant); context = top-30 keywords + content breakdown + tech terms + recent snippets; returns structured ideas with name, pitch, problem, audience, tech stack.
• Commands: !ideas [count], !keywords, !stats, !clear (admin).
• Auto-timer: generates 3 ideas every N minutes (configurable) only if new messages have arrived since last run.
		• Stack: Python 3.11+, discord.py ≥ 2.3, groq-python, aiohttp, python-dotenv, SQLite (stdlib).`,
		image: '/demos/idea-db-demo.png',
		type: 'open-source',
		tags: ['Python', 'SQLite', 'Groq', 'discord.py'],
		github: 'https://github.com/Qrytics/ideaDB',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'sheet-music-gen',
		title: 'Sheet Music GEN',
		subtitle: 'Freemium SaaS converting audio to sheet music via Demucs stem separation, MT3 transcription, and async RQ workers, Next.js + FastAPI monorepo',
		description:
		'A B2C freemium web app (similar to Moises.ai / Chordify) where users drag-and-drop an MP3/WAV file and get back downloadable MIDI and MusicXML sheet music for every instrument. A Next.js 15 dashboard posts uploads to a FastAPI backend that validates credits, queues an RQ job to Redis, and runs a Demucs stem separator + MT3-style transcriber in a Python worker. Real-time progress is polled by a JobTracker component that animates a status bar.',
		longDescription: `Audio-to-sheet-music SaaS built on a Pants monorepo with async ML workers.

• Monorepo: Pants-managed; apps/web (Next.js 15+ App Router), apps/api (FastAPI), apps/workers (RQ over Redis), libs/db (SQLAlchemy async + Alembic), libs/ml-core (Demucs + MT3 wrappers).
• ML pipeline: DemucsSeparator.separate_stems() → 4 stems; MT3Transcriber.transcribe_stem() per stem; results aggregated into TranscriptionJob.result_data (JSONB).
• API: POST /api/v1/jobs/upload (credit check, rate limit, RQ enqueue), GET /api/v1/jobs/{id} (status polling), GET download/{format} (MIDI via mido / MusicXML via music21).
• DB: PostgreSQL + pgvector; User (tier, credits_remaining), TranscriptionJob (status enum, result_data, audio_file_path); async SQLAlchemy sessions.
• Frontend: drag-and-drop FileUpload, animated JobTracker with stage-based progress bar, status pill, and collapsible JSON preview.
		• Infra: Docker Compose (pgvector/pg16 + redis:7-alpine); Alembic migrations.`,
		image: '/demos/sheet-music-gen-demo.png',
		type: 'open-source',
		tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'TypeScript', 'PyTorch', 'Demucs', 'Docker'],
		github: 'https://github.com/Qrytics/sheetMusicGen',
		status: 'wip',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'little-guy',
		title: 'Little GUY',
		subtitle: 'Always-on-top Tauri v2 + Rust desktop companion that watches your coding/typing/idle state and reacts with pixel-art animations',
		description:
		'A tiny pixel-art companion that floats over your desktop and reacts in real time to what you\'re doing. Built with Rust + Tokio for the systems core and Tauri v2 for a lightweight overlay (90% less RAM than Electron). The activity monitor detects the focused window every 2 s via Windows UIA / DBus, classifying it as idle, active, typing, coding, or sleeping. Sessions are logged to SQLite (WAL) and queried by DuckDB for end-of-day habit analytics. Features 10 mini-games, multiple companion types, dialogue bubbles, petting, and a full system-tray menu.',
		longDescription: `Rust + Tauri always-on-top pixel-art desktop companion with activity tracking and mini-games.

• Systems core: Rust + Tokio; Tauri v2 native Webviews; Unix socket / named pipe IPC bridge between daemon and overlay.
• Activity detection: Windows UIA / DBus APIs poll the focused window every 2 s; states: idle, active, typing, coding (VS Code, JetBrains, Vim, coding sites), sleeping (idle ≥ 2 min).
• Persistence: SQLite WAL for high-frequency session writes; DuckDB for analytical queries powering the daily recap dashboard.
• Animation: Vello/ThorVG GPU-accelerated vector rendering; idle sub-animations cycle (wave, look around, stretch, excited); walking mode bounces across the screen.
• Social: multiple companions with buddy interactions (wave when within 200 px); rename, 5 colour themes, drag-to-reposition.
• Mini-games: Whack-a-Guy (right-click); Petting (left-click) with floating heart.
		• Frontend: React + TypeScript (Overlay, Recap, Minigame windows); Vite bundler.`,
		image: '/demos/little-guy-demo.png',
		type: 'open-source',
		tags: ['Rust', 'Tauri', 'TypeScript', 'React', 'SQLite', 'DuckDB', 'Tokio', 'Windows UIA'],
		github: 'https://github.com/Qrytics/littleGuy',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'discord-music-bot',
		title: 'Discord Music BOT',
		subtitle: 'Callable JavaScript Discord bot for playing music in voice channels',
		description:
		'A Discord bot that joins voice channels on command and streams music. Built in JavaScript with discord.js, it supports standard music-bot commands for play, pause, skip, and queue management.',
		image: '/demos/discord-music-bot-demo.png',
		type: 'open-source',
		tags: ['JavaScript', 'Node.js', 'discord.js'],
		github: 'https://github.com/Qrytics/discordMusicBot',
		status: 'archived',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'yt-to-mp3',
		title: 'YT TO MP3',
		subtitle: 'Lightweight Node.js module that downloads a YouTube video and converts it to MP3 via ffmpeg-static, no system FFmpeg required',
		description:
		'A lightweight Node.js utility module (no UI) that downloads the audio stream from any YouTube URL using @distube/ytdl-core and converts it to an MP3 file via fluent-ffmpeg backed by a bundled ffmpeg-static binary. Exported as convertToMp3(url, options) returning a Promise<string> with the absolute output path. Configurable output directory, filename, and bitrate.',
		longDescription: `Zero-dependency-install YouTube-to-MP3 Node.js module.

• API: convertToMp3(url, { outputDir, filename, bitrate }) → Promise<string>; isValidYouTubeUrl(url) → boolean.
• Audio download: @distube/ytdl-core streams audio-only from YouTube.
• Encoding: fluent-ffmpeg pipes the stream through libmp3lame; bitrate defaults to 128 kbps.
• FFmpeg: bundled via ffmpeg-static; no system-level installation required.
• Error handling: throws typed errors for invalid URLs, failed video info fetch, download failure, and conversion failure.
		• Tests: Jest suite covering valid/invalid URL handling and conversion.`,
		image: '/demos/yt-to-mp3-demo.png',
		type: 'open-source',
		tags: ['JavaScript', 'Node.js', 'FFmpeg', 'ytdl-core'],
		github: 'https://github.com/Qrytics/yt-to-mp3',
		status: 'archived',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'job-apply',
		title: 'JOB Apply',
		subtitle: 'Chrome Manifest V3 extension that auto-fills job application forms with smart field detection and custom keyword-matching rules',
		description:
		'jobApply is a privacy-first Chrome extension that saves your profile once (locally, never sent to any server) and auto-fills job application forms on any website with one click. Smart field detection matches inputs using labels, placeholders, aria-label attributes, IDs, and surrounding text. A custom rules engine lets you define keyword-to-value rules with contains / exact / starts-with matching for edge-case fields like work authorization or salary expectations.',
		longDescription: `One-click job application auto-fill Chrome extension, fully local, no server.

• Storage: Chrome Storage API (local); all profile data stays in the browser.
• Smart detection: content script injected via scripting API; matches fields by label text, placeholder, aria-label, name, ID, and surrounding DOM text.
• Profile fields: First/Last Name, Email, Phone, Address, City, State, ZIP, Job Title, Company, Experience, Salary, LinkedIn, GitHub, Portfolio, Cover Letter.
• Custom rules: keyword + value + match type (contains/exact/starts with); stored and managed via the popup Rules tab.
• Manifest V3: uses scripting, activeTab, and storage permissions only; no broad host permissions.
		• UX: tabbed popup (Profile / Rules); Save Profile button; Fill Fields on This Page trigger.`,
		image: '/demos/job-apply-demo.png',
		type: 'open-source',
		tags: ['JavaScript', 'Manifest V3', 'HTML', 'CSS'],
		github: 'https://github.com/Qrytics/jobApply',
		status: 'active',
		startMonth: 'Mar',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'mini-gamba',
		title: 'Mini Gamba',
		subtitle: 'Electron desktop companion combining League of Legends live stats via the LCU API with a 10-game mini-casino coin economy',
		description:
		'miniGamba is a two-mode desktop app with a full dashboard and an always-on-top overlay. The dashboard provides LoL summoner lookup, live in-game scoreboard (KDA, CS, gold, objectives), and champion-select detection powered by the League Client Update (LCU) API and the Live Client Data API. The overlay adds a 10-game mini-casino (slots, blackjack, coin flip, minesweeper, scratch cards, higher-or-lower, wheel, derby, dice, poker) with a coin economy driven by in-game events, daily tasks, hourly bonuses, and passive activity detection.',
		longDescription: `Two-mode Electron desktop app: LoL companion + mini-casino overlay.

• Data: LCU API (lockfile-based, dynamic port) for summoner profiles, ranked stats, mastery, match history, champion select; Live Client Data API (port 2999) for real-time KDA, gold, HP, objectives.
• Dashboard: Summoner lookup, live game scoreboard, champion select panel, settings, leaderboard, achievements, coin wallet, game history.
• Overlay: always-on-top transparent window launched from dashboard; 🎰 Games tab + 🎮 Live Stats tab; repositionable, resizable, opacity-adjustable; hotkey toggle (Ctrl+Shift+G).
• Casino games: Slot Machine, Blackjack, Coin Flip, Higher or Lower, Mine Sweeper, Scratch Cards, Wheel of Fortune, Mini Derby, Dice Roll, Mini Poker, each with a unique mini-feature.
• Coin economy: in-game kill/win/objective rewards, passive watch-time detection, daily tasks, hourly bonus, coin milestones, idle investment system.
		• Stack: TypeScript + Electron; React; SQLite via better-sqlite3 (WAL); Node.js 20+.`,
		image: '/demos/mini-gamba-demo.png',
		type: 'open-source',
		tags: ['TypeScript', 'Electron', 'React', 'SQLite', 'League of Legends LCU API', 'Node.js'],
		github: 'https://github.com/Qrytics/miniGamba',
		status: 'active',
		startMonth: 'Feb',
		startYear: 2026,
		endMonth: 'Mar',
		endYear: 2026,
		year: 2026,
	},
	{
		slug: 'min-gpt-copy',
		title: 'MIN GPT Copy',
		subtitle: 'Educational PyTorch re-implementation of GPT training and inference (fork of Karpathy\'s minGPT)',
		description:
		'A clean, readable PyTorch re-implementation of GPT (training and inference) based on Andrej Karpathy\'s minGPT. The core model is ~300 lines of code: a standard Transformer decoder (masked self-attention, feed-forward, layer norm) with a BPE tokeniser matching OpenAI\'s GPT encoding. Includes demo notebooks for a sorting task and GPT-2 text generation, a character-level language model project, and an addition task trained from scratch.',
		longDescription: `~300-line educational PyTorch GPT implementation for learning Transformer internals.

• Model (mingpt/model.py): decoder-only Transformer with masked self-attention heads, feed-forward layers, layer norm, and configurable depth/width. Supports gpt2, gpt2-medium, gpt2-large, gpt2-xl presets.
• BPE tokeniser (mingpt/bpe.py): byte-pair encoding matching OpenAI's GPT-2 vocabulary (50,257 merges).
• Trainer (mingpt/trainer.py): generic PyTorch training loop; AdamW optimiser; configurable learning rate, batch size, max_iters.
• Projects: adder (trains GPT to add numbers), chargpt (character-level LM on arbitrary text), demo.ipynb (sorting example), generate.ipynb (GPT-2 text generation from prompt).
		• Installation: pip install -e . for use as an importable mingpt library.`,
		image: '/demos/min-gpt-copy-demo.png',
		type: 'open-source',
		tags: ['Python', 'PyTorch'],
		github: 'https://github.com/Qrytics/minGPT_copy',
		status: 'archived',
		startMonth: 'Jan',
		startYear: 2026,
		endMonth: 'Jan',
		endYear: 2026,
		year: 2026,
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
				tags: ['Python', 'Tkinter'],
				github: 'https://github.com/Qrytics/15-112-Term-Project',
				demo: 'https://www.youtube.com/watch?v=I-haGKxNNX0',
				status: 'archived',
				startMonth: 'Nov',
				startYear: 2022,
				endMonth: 'Dec',
				endYear: 2022,
				year: 2022,
				note: 'Game showcase & breakdown video (LinkedIn media): https://www.youtube.com/watch?v=I-haGKxNNX0',
				problem: 'Build a complete, polished 2D game from scratch in Python with no game engine, as a term project demonstrating object-oriented design and a custom game loop.',
				architecture: [
					'Tkinter Canvas as the rendering surface with manual dirty-rect invalidation',
					'Custom game loop using after() scheduling for frame-rate control',
					'Player entity with keyboard-driven velocity and boundary clamping',
					'Obstacle spawner with configurable difficulty ramping over time',
					'Collision detection using axis-aligned bounding boxes (AABB)',
					'State machine managing menu, playing, paused, and game-over screens'
				],
				challenges: [
					'Achieving smooth animation in Tkinter without a dedicated rendering engine',
					'Implementing progressive difficulty without making the game feel unfair',
					'Managing game state transitions cleanly without global mutable state'
				],
				tradeoffs: [
					'Tkinter chosen for zero-dependency portability; traded rendering performance for simplicity',
					'AABB collision is less precise than pixel-perfect but sufficient at game scale',
					'No sound effects to keep the project scope achievable as a first solo game'
				],
				outcome: 'Fully playable evasion game submitted and demoed as CMU 15-112 term project, earning high marks for code quality and gameplay feel.',
				whatYouLearned: [
					'Game loop architecture and frame timing without a framework',
					'Tkinter event model and canvas coordinate system',
					'Object-oriented design for independent, testable game entities',
					'The value of iterative playtesting for difficulty tuning'
				]
			}
		];

		export function getProject(slug: string): Project | undefined {
			return projects.find((p) => p.slug === slug);
	}
