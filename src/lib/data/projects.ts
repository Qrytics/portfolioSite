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
		problem: 'Build a full-stack smart-home platform that gives homeowners real-time visibility and control over lighting, temperature, occupancy, and door-lock status—all from a single web dashboard.',
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
		problem: 'Give users an intuitive way to visualise their bank spending, automatically detect recurring charges, and micro-save into cryptocurrency—all within a 24-hour hackathon.',
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
		outcome: 'Shipped a working fintech app at TartanHacks 2026—live bank data, interactive treemap, and on-chain round-ups—with a full CI pipeline.',
		whatYouLearned: [
			'pnpm monorepo workspace conventions and shared package boundaries',
			'How Plaid Link OAuth flows differ from standard OAuth',
			'XRPL transaction structure and hex-encoded memo fields',
			'd3 hierarchy and treemap layouts with interactive drill-down'
		]
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
		tags: ['TypeScript', 'Chrome Extension', 'HTML'],
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
		tags: ['Python', 'OCR', 'Speech Synthesis', 'OpenCV', 'API'],
		demo: 'https://www.youtube.com/watch?v=-XVi3JBbilk',
		status: 'archived',
		startMonth: 'Jan',
		startYear: 2025,
		endMonth: 'Feb',
		endYear: 2025,
		year: 2025,
		note: 'Additional demo clips are attached on LinkedIn (Prepped-up Demo / Prepped-up Demo 2).',
		problem: 'Children with reading difficulties or visual impairments need a low-cost, engaging companion that reads physical books aloud when asked—without requiring a screen or complex interaction.',
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
		tags: ['Cadence Virtuoso', 'OTA', 'Analog Modeling', 'Parasitic Simulation'],
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
		tags: ['SystemVerilog', 'FPGA', 'VGA', 'FSM'],
		status: 'archived',
		startMonth: 'Oct',
		startYear: 2024,
		endMonth: 'Nov',
		endYear: 2024,
		year: 2024,
		problem: 'Implement a fully playable Breakout clone in hardware—no CPU, no OS—where all game logic runs as synchronous digital circuits on an FPGA outputting a live VGA signal.',
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
			'Single-speed ball velocity—no acceleration—to keep FSM states manageable'
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
		problem: 'Build a complete, polished 2D game from scratch in Python—no game engine—as a term project demonstrating object-oriented design and a custom game loop.',
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
