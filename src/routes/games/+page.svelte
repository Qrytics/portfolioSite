<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { games } from '$lib/data/games';
</script>

<svelte:head>
	<title>{profile.name} — Games</title>
	<meta name="description" content="Browser games and interactive demos built by {profile.name}." />
</svelte:head>

<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">games</h1>
			<p class="subtitle">Browser-based games and interactive toys I've built.</p>

			<ul class="game-grid">
				{#each games as game (game.slug)}
					<li class="game-card">
						<a href={game.playUrl} class="game-card__preview-link" tabindex="-1" aria-hidden="true">
							<div class="game-card__media">
								<img
									class="game-card__img"
									src={game.preview}
									alt="{game.title} screenshot"
									loading="lazy"
									decoding="async"
								/>
							</div>
						</a>

						<div class="game-card__body">
							<div class="game-card__meta">
								<h2 class="game-card__name">{game.title}</h2>
								<p class="game-card__subtitle">{game.subtitle}</p>
							</div>

							<p class="game-card__desc">{game.description}</p>

							<div class="game-card__footer">
								<ul class="tag-list" aria-label="tags">
									{#each game.tags as tag}
										<li class="tag">{tag}</li>
									{/each}
								</ul>
								<a href={game.playUrl} class="play-btn">play →</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
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
		color: var(--text);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 2rem;
		color: var(--muted);
		max-width: 80ch;
		line-height: 1.7;
	}

	/* ── Grid ────────────────────────────────────────────────── */
	.game-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 720px) {
		.game-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1100px) {
		.game-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	/* ── Card ────────────────────────────────────────────────── */
	.game-card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		transition: border-color 0.15s ease;
	}

	.game-card:hover {
		border-color: var(--accent);
	}

	/* ── Preview image ───────────────────────────────────────── */
	.game-card__preview-link {
		display: block;
		overflow: hidden;
	}

	.game-card__media {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--panel-2);
	}

	.game-card__img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.25s ease;
	}

	.game-card:hover .game-card__img {
		transform: scale(1.03);
	}

	/* ── Body ────────────────────────────────────────────────── */
	.game-card__body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1rem 1.1rem 1.1rem;
		gap: 0.6rem;
	}

	.game-card__name {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--text);
	}

	.game-card__subtitle {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
	}

	.game-card__desc {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.65;
	}

	/* ── Footer row ──────────────────────────────────────────── */
	.game-card__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--muter);
		border: 1px solid var(--border-2);
		padding: 0.15rem 0.45rem;
	}

	.play-btn {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--accent);
		text-decoration: none;
		border: 1px solid var(--accent);
		padding: 0.3rem 0.75rem;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.play-btn:hover {
		background: var(--accent);
		color: var(--bg);
	}
</style>
