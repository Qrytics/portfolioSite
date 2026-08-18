<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';
	import { games } from '$lib/data/games';

	function withBase(path: string): string {
		if (path.startsWith('http://') || path.startsWith('https://')) return path;
		return `${base}${path.startsWith('/') ? path : `/${path}`}`;
	}
</script>

<!-- Head metadata for this route lives in $lib/data/seo.ts, resolved once in +layout.svelte. -->

<div class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">games</h1>
			<p class="subtitle">Browser-based games and interactive toys I've built.</p>

			<ul class="game-grid">
				{#each games as game (game.slug)}
					{@const hasPlayableUrl = game.playUrl !== '#'}
					<li class="game-card">
						{#if hasPlayableUrl}
							<!--
								A real `<a href>`, not a `<button>` calling `window.location.assign`. As a button
								it had no href at all: middle-click, Ctrl/Cmd-click and "open in new tab" all
								did nothing, the destination never appeared in the status bar on hover, and a
								crawler saw no link to any of the games.

								`tabindex="-1" aria-hidden="true"` stays deliberately. This is a *redundant*
								link to the same place as the `play` control at the bottom of the card, so
								exposing it would give every card two tab stops and announce the destination
								twice. `data-sveltekit-reload` because these are standalone builds under
								`static/games/`, not SvelteKit routes — the client router would 404 on them.
							-->
							<a
								href={withBase(game.playUrl)}
								class="game-card__preview-link"
								tabindex="-1"
								aria-hidden="true"
								data-sveltekit-reload
							>
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
						{:else}
							<div class="game-card__preview-link" aria-hidden="true">
								<div class="game-card__media">
									<img
										class="game-card__img"
										src={game.preview}
										alt="{game.title} screenshot"
										loading="lazy"
										decoding="async"
									/>
								</div>
							</div>
						{/if}

						<div class="game-card__body">
							<div class="game-card__meta">
								<h2 class="game-card__name">{game.title}</h2>
								<p class="game-card__subtitle">{game.subtitle}</p>
							</div>

							<p class="game-card__desc">{game.description}</p>

							<div class="game-card__footer">
								<ul class="tag-list" aria-label="tags">
									{#each game.tags as tag (tag)}
										<li class="tag">{tag}</li>
									{/each}
								</ul>
								{#if hasPlayableUrl}
									<!-- The keyboard and screen-reader path to the game; named so it reads
									     usefully out of context rather than just "play". -->
									<a
										href={withBase(game.playUrl)}
										class="play-btn"
										aria-label="Play {game.title}"
										data-sveltekit-reload
									>
										{game.playLabel ?? 'play →'}
									</a>
								{:else}
									<span class="play-btn play-btn--disabled">{game.playLabel ?? 'In Progress'}</span>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</div>

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

	/* `.play-btn` is an `<a>` for the playable case and a `<span>` for the in-progress one, so the
	   link resets (`text-decoration`, `display`) belong here rather than being inherited. The
	   `min-height` brings it to WCAG 2.5.5's 44px on a phone; it was ~29px. */
	.play-btn {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--accent);
		border: 1px solid var(--accent);
		padding: 0.3rem 0.75rem;
		min-height: 2.75rem;
		background: transparent;
		text-decoration: none;
		transition:
			background 0.15s ease,
			color 0.15s ease;
		cursor: pointer;
	}

	.play-btn:hover {
		background: var(--accent);
		color: var(--bg);
	}

	.play-btn--disabled {
		color: var(--muted);
		border-color: var(--border-2);
		cursor: default;
	}
</style>
