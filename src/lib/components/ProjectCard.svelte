<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import MediaSection from '$lib/components/MediaSection.svelte';

	let { project }: { project: Project } = $props();

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
</script>

<article class="card">
	<!-- Terminal title bar -->
	<div class="termbar">
		<h3 class="termbar__title">
			<a href="/projects/{project.slug}" class="termbar__titleLink">
				{project.shortTitle ?? project.title}
			</a>
		</h3>
		<span class="badge" data-type={project.type}>{typeLabelMap[project.type]}</span>
	</div>

	<!-- Media -->
	<MediaSection {project} />

	<!-- Content -->
	<div class="content">
		<p class="card__dates">{project.startMonth} {project.startYear} — {project.endMonth} {project.endYear}</p>
		<p class="card__subtitle">{project.subtitle}</p>
		<p class="card__desc">{project.description}</p>

		<div class="tech-badges">
			{#each project.tags as tag}
				<span class="tech-badge" data-tech={tag.toLowerCase()}>{tag}</span>
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
			{/if}
			{#if project.demo && !isVideoDemo(project.demo)}
				<a href={project.demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
					demo ↗
				</a>
			{/if}
			<a href="/projects/{project.slug}" class="btn btn--ghost">details →</a>
		</div>
	</div>
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
		display: grid;
		grid-template-rows: auto auto 1fr;
		transition: border-color 0.16s ease, box-shadow 0.16s ease;
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

	.termbar__titleLink {
		color: inherit;
		text-decoration: none;
		cursor: pointer;
	}

	.termbar__titleLink:hover {
		text-decoration: underline;
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

	/* Per-tech colors */
	.tech-badge[data-tech='rust'] { border-color: rgba(222, 165, 132, 0.35); color: rgba(222, 165, 132, 0.95); background: rgba(222, 165, 132, 0.08); }
	.tech-badge[data-tech='postgres'] { border-color: rgba(51, 78, 131, 0.35); color: rgba(34, 151, 201, 0.95); background: rgba(60, 74, 184, 0.08); }
	.tech-badge[data-tech='kafka'] { border-color: rgba(255, 121, 0, 0.35); color: rgba(255, 151, 30, 0.95); background: rgba(255, 121, 0, 0.08); }
	.tech-badge[data-tech='nats'], .tech-badge[data-tech='nats jetstream'] { border-color: rgba(0, 173, 216, 0.35); color: rgba(0, 203, 246, 0.95); background: rgba(0, 173, 216, 0.08); }
	.tech-badge[data-tech='flutter'] { border-color: rgba(69, 209, 253, 0.35); color: rgba(69, 209, 253, 0.95); background: rgba(69, 209, 253, 0.08); }
	.tech-badge[data-tech='svelte'] { border-color: rgba(255, 62, 0, 0.35); color: rgba(255, 98, 50, 0.95); background: rgba(255, 62, 0, 0.08); }
	.tech-badge[data-tech='kubernetes'], .tech-badge[data-tech='k8s'] { border-color: rgba(50, 108, 229, 0.35); color: rgba(80, 138, 255, 0.95); background: rgba(50, 108, 229, 0.08); }
	.tech-badge[data-tech='zig'] { border-color: rgba(247, 164, 29, 0.35); color: rgba(247, 184, 69, 0.95); background: rgba(247, 164, 29, 0.08); }
	.tech-badge[data-tech='c'],
	.tech-badge[data-tech='c/c++'] { border-color: rgba(85, 85, 255, 0.35); color: rgba(115, 115, 255, 0.95); background: rgba(85, 85, 255, 0.08); }
	.tech-badge[data-tech='systemverilog'] { border-color: rgba(218, 165, 32, 0.35); color: rgba(255, 215, 0, 0.95); background: rgba(218, 165, 32, 0.08); }
	.tech-badge[data-tech='wasm'], .tech-badge[data-tech='webassembly'] { border-color: rgba(101, 79, 240, 0.35); color: rgba(131, 109, 255, 0.95); background: rgba(101, 79, 240, 0.08); }
	.tech-badge[data-tech='python'] { border-color: rgba(76, 127, 169, 0.35); color: rgba(74, 151, 213, 0.95); background: rgba(43, 93, 134, 0.08); }
	.tech-badge[data-tech='docker'] { border-color: rgba(0, 123, 255, 0.35); color: rgba(30, 153, 255, 0.95); background: rgba(9, 117, 233, 0.08); }
	.tech-badge[data-tech='go'] { border-color: rgba(0, 173, 216, 0.35); color: rgba(30, 203, 246, 0.95); background: rgba(0, 173, 216, 0.08); }
	.tech-badge[data-tech='typescript'] { border-color: rgba(49, 120, 198, 0.35); color: rgba(79, 152, 228, 0.95); background: rgba(49, 120, 198, 0.08); }
	.tech-badge[data-tech='sveltekit'] { border-color: rgba(255, 62, 0, 0.35); color: rgba(255, 98, 50, 0.95); background: rgba(255, 62, 0, 0.08); }
	.tech-badge[data-tech='react'] { border-color: rgba(97, 218, 251, 0.35); color: rgba(97, 218, 251, 0.95); background: rgba(97, 218, 251, 0.08); }
	.tech-badge[data-tech='webrtc'] { border-color: rgba(255, 152, 0, 0.35); color: rgba(255, 172, 50, 0.95); background: rgba(255, 152, 0, 0.08); }
	.tech-badge[data-tech='pytorch'] { border-color: rgba(238, 76, 44, 0.35); color: rgba(238, 106, 74, 0.95); background: rgba(238, 76, 44, 0.08); }
	.tech-badge[data-tech='javascript'] { border-color: rgba(247, 223, 30, 0.4); color: rgba(247, 233, 80, 0.95); background: rgba(247, 223, 30, 0.1); }
	.tech-badge[data-tech='html'] { border-color: rgba(227, 76, 34, 0.35); color: rgba(255, 120, 80, 0.95); background: rgba(227, 76, 34, 0.08); }
	.tech-badge[data-tech='chrome extension'] { border-color: rgba(66, 133, 244, 0.35); color: rgba(100, 163, 255, 0.95); background: rgba(66, 133, 244, 0.08); }
	.tech-badge[data-tech='litellm'] { border-color: rgba(139, 92, 246, 0.35); color: rgba(167, 139, 255, 0.95); background: rgba(139, 92, 246, 0.08); }
	.tech-badge[data-tech='rich'] { border-color: rgba(0, 191, 165, 0.35); color: rgba(0, 221, 195, 0.95); background: rgba(0, 191, 165, 0.08); }
	.tech-badge[data-tech='argparse'] { border-color: rgba(76, 127, 169, 0.35); color: rgba(74, 151, 213, 0.95); background: rgba(43, 93, 134, 0.08); }
	.tech-badge[data-tech='cadence virtuoso'] { border-color: rgba(0, 150, 136, 0.35); color: rgba(0, 180, 166, 0.95); background: rgba(0, 150, 136, 0.08); }
	.tech-badge[data-tech='ota'] { border-color: rgba(156, 39, 176, 0.35); color: rgba(186, 104, 200, 0.95); background: rgba(156, 39, 176, 0.08); }
	.tech-badge[data-tech='analog modeling'] { border-color: rgba(255, 152, 0, 0.35); color: rgba(255, 183, 77, 0.95); background: rgba(255, 152, 0, 0.08); }
	.tech-badge[data-tech='parasitic simulation'] { border-color: rgba(121, 85, 72, 0.35); color: rgba(161, 136, 127, 0.95); background: rgba(121, 85, 72, 0.08); }
	.tech-badge[data-tech='ocr'] { border-color: rgba(63, 81, 181, 0.35); color: rgba(92, 107, 192, 0.95); background: rgba(63, 81, 181, 0.08); }
	.tech-badge[data-tech='speech synthesis'] { border-color: rgba(233, 30, 99, 0.35); color: rgba(244, 143, 177, 0.95); background: rgba(233, 30, 99, 0.08); }
	.tech-badge[data-tech='opencv'] { border-color: rgba(0, 150, 199, 0.35); color: rgba(0, 180, 229, 0.95); background: rgba(0, 150, 199, 0.08); }
	.tech-badge[data-tech='api'] { border-color: rgba(76, 175, 80, 0.35); color: rgba(129, 199, 132, 0.95); background: rgba(76, 175, 80, 0.08); }
	.tech-badge[data-tech='fpga'] { border-color: rgba(183, 28, 28, 0.35); color: rgba(229, 115, 115, 0.95); background: rgba(183, 28, 28, 0.08); }
	.tech-badge[data-tech='vga'] { border-color: rgba(93, 64, 55, 0.35); color: rgba(141, 110, 99, 0.95); background: rgba(93, 64, 55, 0.08); }
	.tech-badge[data-tech='fsm'] { border-color: rgba(218, 165, 32, 0.35); color: rgba(255, 215, 0, 0.95); background: rgba(218, 165, 32, 0.08); }
	.tech-badge[data-tech='rsa-2048'] { border-color: rgba(46, 125, 50, 0.35); color: rgba(102, 187, 106, 0.95); background: rgba(46, 125, 50, 0.08); }
	.tech-badge[data-tech='fastapi'] { border-color: rgba(0, 191, 165, 0.35); color: rgba(38, 222, 196, 0.95); background: rgba(0, 191, 165, 0.08); }
	.tech-badge[data-tech='mqtt'] { border-color: rgba(255, 121, 0, 0.35); color: rgba(255, 151, 30, 0.95); background: rgba(255, 121, 0, 0.08); }
	.tech-badge[data-tech='next.js'] { border-color: rgba(0, 0, 0, 0.5); color: rgba(243, 246, 255, 0.95); background: rgba(255, 255, 255, 0.12); }
	.tech-badge[data-tech='postgresql'] { border-color: rgba(51, 78, 131, 0.35); color: rgba(34, 151, 201, 0.95); background: rgba(60, 74, 184, 0.08); }

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
</style>

