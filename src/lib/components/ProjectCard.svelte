<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import MediaSection from '$lib/components/MediaSection.svelte';

	let {
		project,
		collapsedMode = false,
		expandedInCollapsedMode = false,
		onToggleExpand = (_slug: string) => {}
	}: {
		project: Project;
		collapsedMode?: boolean;
		expandedInCollapsedMode?: boolean;
		onToggleExpand?: (slug: string) => void;
	} = $props();

	const showBody = $derived(collapsedMode ? expandedInCollapsedMode : !expandedInCollapsedMode);

	function onCollapsedBarClick() {
		onToggleExpand(project.slug);
	}

	const detailPath = $derived(`/projects/${project.slug}`);

	const typeLabelMap: Record<string, string> = {
		'open-source': 'open source',
		'closed-source': 'closed source',
		'community / ecosystem': 'community / ecosystem',
		'multi-site': 'multi-site'
	};

	function getYouTubeId(url: string): string | null {
		try {
			const u = new URL(url);
			if (u.hostname === 'youtu.be') return u.pathname.replace('/', '') || null;
			if (u.hostname.endsWith('youtube.com')) {
				if (u.pathname.startsWith('/embed/')) return u.pathname.replace('/embed/', '') || null;
				const v = u.searchParams.get('v');
				return v || null;
			}
			return null;
		} catch {
			return null;
		}
	}

	function isVideoDemo(url: string): boolean {
		if (getYouTubeId(url)) return true;
		return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
	}

	function isGitHubRepo(url: string | undefined): boolean {
		if (!url) return false;
		try {
			const u = new URL(url);
			return u.hostname === 'github.com' || u.hostname.endsWith('.github.com');
		} catch {
			return false;
		}
	}

	const languageTags = new Set([
		'javascript', 'typescript', 'python', 'rust', 'go', 'c++', 'c', 'dart', 'html', 'css', 'systemverilog'
	]);
	const frameworkTags = new Set([
		'react', 'next.js', 'fastapi', 'svelte', 'react native', 'tauri', 'flutter', 'electron'
	]);
	const apiTags = new Set([
		'spotify api', 'stripe api', 'calendly api', 'semantic scholar api', 'twitch api', 'openai api',
		'github api', 'groq api', 'windows api', 'windows ui automation api', 'lcu api'
	]);
	const serviceTags = new Set(['docker', 'postgresql', 'sqlite', 'redis', 'neo4j', 'supabase', 'pocketbase', 'duckdb']);
	const protocolTags = new Set(['mqtt', 'webrtc', 'manifest v3']);
	const toolTags = new Set([
		'discord.js', 'discord.py', 'langchain', 'litellm', 'pytorch', 'opencv', 'mediapipe', 'xgboost',
		'lightgbm', 'scikit-learn', 'optuna', 'pandas', 'ollama', 'demucs', 'ffmpeg', 'rich', 'argparse',
		'chokidar', 'xterm.js', 'node-cron', 'cadence virtuoso', 'tribe v2', 'faster-whisper', 'porcupine',
		'pyyaml', 'pyaudio', 'pyautogui', 'tokio', 'scapy', 'expo', 'ytdl-core'
	]);

	function getTagKind(tag: string): 'language' | 'framework' | 'api' | 'service' | 'protocol' | 'tool' | 'other' {
		const key = tag.toLowerCase();
		if (languageTags.has(key)) return 'language';
		if (frameworkTags.has(key)) return 'framework';
		if (apiTags.has(key)) return 'api';
		if (serviceTags.has(key)) return 'service';
		if (protocolTags.has(key)) return 'protocol';
		if (toolTags.has(key)) return 'tool';
		return 'other';
	}
</script>

<article
	class="card"
	class:card--collapsed-only={!showBody}
>
	<!-- Terminal title bar -->
	{#if collapsedMode}
		<button
			type="button"
			class="termbar termbar--collapsible"
			onclick={onCollapsedBarClick}
			aria-expanded={expandedInCollapsedMode}
		>
			<span class="termbar__title termbar__titleText">{project.shortTitle ?? project.title}</span>
			<span class="badge" data-type={project.type}>{typeLabelMap[project.type]}</span>
		</button>
	{:else}
		<button
			type="button"
			class="termbar termbar--collapsible"
			onclick={onCollapsedBarClick}
			aria-expanded={showBody}
		>
			<span class="termbar__title termbar__titleText">{project.shortTitle ?? project.title}</span>
			<span class="badge" data-type={project.type}>{typeLabelMap[project.type]}</span>
		</button>
	{/if}

	{#if showBody}
		<!-- Media -->
		<MediaSection {project} />

		<!-- Content -->
		<div class="content">
			<p class="card__dates">{project.startMonth} {project.startYear} - {project.endMonth} {project.endYear}</p>
			<p class="card__subtitle">{project.subtitle}</p>
			<p class="card__desc">{project.description}</p>

			<div class="tech-badges">
				{#each project.tags as tag (tag)}
					<span class="tech-badge" data-kind={getTagKind(tag)}>{tag}</span>
				{/each}
			</div>

			<div class="links">
				{#if project.github}
					<a href={project.github} target="_blank" rel="noopener noreferrer" class="btn btn--primary">
						{#if isGitHubRepo(project.github)}
							GitHub Repo ↗
						{:else}
							Source ↗
						{/if}
					</a>
				{/if}
				{#if project.siteUrl}
					<a href={project.siteUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary">
						Visit Site ↗
					</a>
				{:else if project.projectPageUrl}
					<a href={project.projectPageUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary">
						Visit Site ↗
					</a>
				{/if}
				{#if project.siteUrl && project.projectPageUrl}
					<a href={project.projectPageUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary">
						Visit Blog ↗
					</a>
				{/if}
				{#if project.demo && !isVideoDemo(project.demo)}
					<a href={project.demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
						demo ↗
					</a>
				{/if}
				<a href={detailPath} class="btn btn--ghost" data-sveltekit-reload
					>details →</a>
			</div>
		</div>
	{/if}
</article>

<style>
	.card {
		position: relative;
		z-index: 1;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		min-width: 0;
		height: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr;
		transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
		contain: layout style paint;
	}

	.card--collapsed-only {
		height: auto;
		grid-template-rows: auto;
		align-self: stretch;
	}

	@media (max-width: 520px) {
		.card {
			grid-template-rows: auto auto auto;
		}

		.termbar--collapsible {
			min-height: 2.7rem;
		}

		.termbar {
			padding: 0.65rem 0.75rem;
			gap: 0.55rem;
		}

		.termbar__title {
			font-size: 0.84rem;
		}

		.badge {
			font-size: 0.7rem;
			padding: 0.15rem 0.4rem;
		}

		.content {
			padding: 0.8rem;
			gap: 0.6rem;
		}

		.card__subtitle {
			font-size: 0.85rem;
		}

		.card__desc {
			font-size: 0.88rem;
			line-height: 1.5;
		}

		.tech-badges {
			gap: 0.3rem;
		}

		.tech-badge {
			font-size: 0.66rem;
			padding: 0.15rem 0.35rem;
		}

		.links {
			gap: 0.45rem;
		}

		.btn {
			font-size: 0.82rem;
			padding: 0.45rem 0.6rem;
		}
	}

	.card:hover {
		z-index: 2;
		border-color: rgba(54, 242, 194, 0.25);
		box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);
	}

	/* Termbar */
	.termbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.85rem;
		padding: 0.75rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.22);
		min-width: 0;
	}

	.termbar--collapsible {
		cursor: pointer;
		width: 100%;
		border: 0;
		text-align: left;
		font: inherit;
		touch-action: manipulation;
	}

	.termbar--collapsible:focus-visible {
		outline: 2px solid rgba(54, 242, 194, 0.6);
		outline-offset: -2px;
	}

	.termbar__titleText {
		text-decoration: none;
	}

	.termbar__title {
		margin: 0;
		font-size: 0.92rem;
		letter-spacing: 0.02em;
		color: rgba(243, 246, 255, 0.82);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 600;
		min-width: 0;
		flex: 1 1 auto;
	}

	/* Source badge */
	.badge {
		font-size: 0.78rem;
		color: rgba(243, 246, 255, 0.72);
		border: 1px solid var(--border-2);
		padding: 0.2rem 0.55rem;
		background: rgba(255, 255, 255, 0.03);
		text-transform: lowercase;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.badge[data-type='open-source'] {
		border-color: rgba(54, 242, 194, 0.25);
		color: rgba(54, 242, 194, 0.92);
		background: rgba(54, 242, 194, 0.05);
	}

	.badge[data-type='closed-source'] {
		border-color: rgba(246, 193, 119, 0.22);
		color: rgba(246, 193, 119, 0.92);
		background: rgba(246, 193, 119, 0.05);
	}

	.badge[data-type='community / ecosystem'] {
		border-color: rgba(101, 79, 240, 0.22);
		color: rgba(131, 109, 255, 0.92);
		background: rgba(101, 79, 240, 0.05);
	}

	.badge[data-type='multi-site'] {
		border-color: rgba(255, 91, 87, 0.25);
		color: rgba(255, 121, 117, 0.92);
		background: rgba(255, 91, 87, 0.05);
	}

	/* Content */
	.content {
		padding: 1rem;
		display: grid;
		gap: 0.75rem;
		align-content: start;
		min-width: 0;
	}

	.card__subtitle {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
		line-height: 1.45;
		overflow-wrap: anywhere;
	}

	.card__dates {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: rgba(243, 246, 255, 0.6);
		letter-spacing: 0.02em;
	}

	.card__desc {
		margin: 0;
		color: rgba(243, 246, 255, 0.78);
		line-height: 1.6;
		font-size: 0.97rem;
		overflow-wrap: anywhere;
	}

	/* Tech badges */
	.tech-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.25rem;
	}

	.tech-badge {
		font-size: 0.72rem;
		font-weight: 500;
		color: rgba(243, 246, 255, 0.72);
		border: 1px solid var(--border-2);
		padding: 0.18rem 0.45rem;
		background: rgba(255, 255, 255, 0.03);
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	/* Badge type colors */
	.tech-badge[data-kind='language'] {
		border-color: rgba(59, 130, 246, 0.4);
		color: rgba(147, 197, 253, 0.95);
		background: rgba(59, 130, 246, 0.12);
	}

	.tech-badge[data-kind='framework'] {
		border-color: rgba(45, 212, 191, 0.44);
		color: rgba(153, 246, 228, 0.96);
		background: rgba(20, 184, 166, 0.14);
	}

	.tech-badge[data-kind='api'] {
		border-color: rgba(245, 158, 11, 0.42);
		color: rgba(252, 211, 77, 0.95);
		background: rgba(245, 158, 11, 0.12);
	}

	.tech-badge[data-kind='service'] {
		border-color: rgba(192, 132, 252, 0.45);
		color: rgba(233, 213, 255, 0.96);
		background: rgba(168, 85, 247, 0.14);
	}

	.tech-badge[data-kind='protocol'] {
		border-color: rgba(244, 114, 182, 0.46);
		color: rgba(251, 207, 232, 0.96);
		background: rgba(236, 72, 153, 0.16);
	}

	.tech-badge[data-kind='tool'] {
		border-color: rgba(132, 204, 22, 0.44);
		color: rgba(217, 249, 157, 0.96);
		background: rgba(132, 204, 22, 0.14);
	}

	.tech-badge[data-kind='other'] {
		border-color: rgba(148, 163, 184, 0.35);
		color: rgba(203, 213, 225, 0.9);
		background: rgba(148, 163, 184, 0.1);
	}

	/* Action links */
	.links {
		margin-top: 0.1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--border);
		text-decoration: none;
		font-size: 0.9rem;
		line-height: 1;
		transition: transform 0.14s ease, background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn--primary {
		border-color: rgba(54, 242, 194, 0.32);
		background: rgba(54, 242, 194, 0.09);
		color: rgba(54, 242, 194, 0.95);
	}

	.btn--primary:hover {
		background: rgba(54, 242, 194, 0.13);
		border-color: rgba(54, 242, 194, 0.42);
	}

	.btn--ghost {
		background: rgba(255, 255, 255, 0.03);
		color: rgba(243, 246, 255, 0.8);
		border-color: rgba(243, 246, 255, 0.14);
	}

	.btn--ghost:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(243, 246, 255, 0.2);
	}

	:global([data-theme='light']) .btn--ghost {
		background: var(--clr-surface-tonal-a0);
		color: var(--clr-primary-a40);
		border-color: var(--clr-surface-tonal-a10);
	}

	:global([data-theme='light']) .btn--ghost:hover {
		background: color-mix(in srgb, var(--clr-primary-a0) 10%, var(--clr-surface-tonal-a0));
		color: var(--clr-primary-a0);
		border-color: var(--clr-primary-a30);
	}

	@media (max-width: 430px) {
		.links {
			gap: 0.45rem;
		}

		.btn {
			width: 100%;
			justify-content: center;
			min-height: 2.5rem;
		}
	}

</style>

