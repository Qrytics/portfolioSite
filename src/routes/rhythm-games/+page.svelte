<script lang="ts">
	import { profile } from '$lib/data/profile';

	type RhythmVideo = {
		title: string;
		/** YouTube ID (e.g. `dQw4w9WgXcQ`). */
		youtubeId: string;
		kind: 'video' | 'short';
	};

	// Add your YouTube videos here by ID.
	const videos: RhythmVideo[] = [
		{
			title: 'Rhythm game video',
			youtubeId: 'IOKLSRCfqqk',
			kind: 'video'
		},
		{
			title: 'Rhythm game short',
			youtubeId: 'kaQ5OThg3mM',
			kind: 'short'
		}
	];

	const youtubeVids = videos.filter((v) => v.kind === 'video');
	const youtubeShorts = videos.filter((v) => v.kind === 'short');
</script>

<svelte:head>
	<title>{profile.name} — Rhythm Games</title>
	<meta name="description" content="YouTube clips of me playing rhythm games." />
</svelte:head>

<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">rhythm games</h1>
			<p class="subtitle">YouTube clips of me playing rhythm games.</p>

			<section class="video-section" aria-label="YouTube videos">
				<h2 class="section-title">videos</h2>
				<div class="video-grid">
					{#if youtubeVids.length === 0}
						<div class="empty">
							Add YouTube videos by setting <code>videos</code> in this file.
						</div>
					{:else}
						{#each youtubeVids as v (v.youtubeId)}
							<figure class="video">
								<iframe
									class="video__frame video__frame--vid"
									title={v.title}
									src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
									loading="lazy"
									referrerpolicy="strict-origin-when-cross-origin"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								></iframe>
							</figure>
						{/each}
					{/if}
				</div>
			</section>

			<section class="video-section" aria-label="YouTube shorts">
				<h2 class="section-title">shorts</h2>
				<div class="video-grid">
					{#if youtubeShorts.length === 0}
						<div class="empty">
							Add YouTube shorts by setting <code>videos</code> in this file.
						</div>
					{:else}
						{#each youtubeShorts as v (v.youtubeId)}
							<figure class="video">
								<iframe
									class="video__frame video__frame--short"
									title={v.title}
									src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
									loading="lazy"
									referrerpolicy="strict-origin-when-cross-origin"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowfullscreen
								></iframe>
							</figure>
						{/each}
					{/if}
				</div>
			</section>

			<div class="bottom-row">
				<div class="back-link">
					<a href="/#about-me">← back to about me</a>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.page {
		position: relative;
		isolation: isolate;
	}

	.section {
		position: relative;
		z-index: 1;
		padding: clamp(1.25rem, 4vw, 3rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
	}

	.title {
		margin: 0 0 0.35rem;
		font-family: var(--font-mono);
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		color: rgba(243, 246, 255, 0.92);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 1.25rem;
		color: rgba(243, 246, 255, 0.68);
		max-width: 80ch;
		line-height: 1.7;
	}

	.video-section {
		margin-top: 2rem;
	}

	.section-title {
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(243, 246, 255, 0.65);
	}

	.video-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 720px) {
		.video-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.video {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: var(--shadow);
		padding: 0.75rem;
		margin: 0;
	}

	.video__frame {
		display: block;
		width: 100%;
		border: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.25);
	}

	.video__frame--vid {
		aspect-ratio: 16 / 9;
	}

	.video__frame--short {
		aspect-ratio: 9 / 16;
	}

	.empty {
		border: 1px dashed rgba(243, 246, 255, 0.25);
		border-radius: 0.5rem;
		padding: 1.25rem;
		color: rgba(243, 246, 255, 0.72);
	}

	.bottom-row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.back-link {
		grid-column: 1;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: rgba(243, 246, 255, 0.65);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.14s;
	}

	.back-link a:hover {
		color: var(--accent);
	}
</style>

