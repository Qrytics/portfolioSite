<script lang="ts">
	import FunSection from '$lib/components/FunSection.svelte';
	import { spotifyFavorites } from '$lib/data/spotify-favorites';
</script>

<section id="about-me" aria-label="About me" class="section">
	<div class="shell">
		<div class="termbar">
			<h2 class="termbar__title">about me</h2>
		</div>

		<div class="bio-row">
			<div class="portrait-card">
				<img
					class="portrait"
					src="/about/IMG_7164.PNG"
					alt="Portrait of Mario Belmonte in a blue suit and tie"
					loading="lazy"
				/>
			</div>

			<div class="card card--bio">
				<div class="card__inner">
					<h3 class="bio-heading">Mario Belmonte</h3>
					<p class="excerpt">
						<span class="highlight">Electrical and Computer Engineering</span> student at <span class="highlight">Carnegie Mellon</span> with a transition focus into <span class="highlight">Software Engineering</span>. Experienced in building complex systems from the ground up ranging from FPGA-based game development in SystemVerilog to <span class="highlight">full-stack</span> logic design.
					</p>
					<p class="excerpt">
						I enjoy solving algorithmic challenges and building scalable software that bridges the gap between low-level hardware and high-level applications. My background in digital design and embedded systems has given me a deep understanding of memory management, concurrency, and performance optimization. Passionate about systems programming, backend development, and building software that demands a high degree of technical precision.
					</p>
				</div>
			</div>
		</div>

		<div class="about-lower">
			<div class="fun-wrap">
				<FunSection embedded />
			</div>

			<div class="side-grid">
				<a class="card card--rhythm" href="/rhythm-games">
					<div class="card__inner card__inner--media">
						<div class="media-copy">
							<div class="title-row">
								<h3 class="title">rhythm games</h3>
								<div class="cta">videos ↗</div>
							</div>
							<p class="excerpt">A few clips from my favorite rhythm games.</p>
						</div>

						<img
							class="rhythm-icon"
							src="/icons/rhythm-arrows.png"
							alt="Rhythm game arrow symbols"
							loading="lazy"
						/>
					</div>
				</a>

				<a class="card card--photos" href="/about">
					<div class="card__inner card__inner--media">
						<div class="media-copy">
							<div class="title-row">
								<h3 class="title">photos</h3>
								<div class="cta">gallery ↗</div>
							</div>
							<p class="excerpt">
								A look into my life outside the keyboard. Friends, family, the moments that matter.
							</p>
						</div>

						<img
							class="card-icon"
							src="/icons/camera-pixel.png"
							alt="Pixel art camera"
							loading="lazy"
						/>
					</div>
				</a>

				<div class="card card--spotify" aria-label="Spotify favorites">
					<div class="card__inner">
						<div class="title-row">
							<h3 class="title">spotify</h3>
						</div>

						<div class="spotify-grid" aria-label="Spotify favorites">
							<a
								class="spotify-tile spotify-tile--compact"
								href={spotifyFavorites.artist.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open ${spotifyFavorites.artist.label} on Spotify`}
							>
								<img
									class="spotify-shape spotify-shape--circle"
									src={spotifyFavorites.artist.image}
									alt={`${spotifyFavorites.artist.label} artist image`}
									loading="lazy"
								/>
								<div class="spotify-tile__meta">
									<div class="spotify-tile__label">{spotifyFavorites.artist.label}</div>
									<div class="spotify-tile__sub">{spotifyFavorites.artist.subtitle}</div>
								</div>
							</a>

							<a
								class="spotify-tile spotify-tile--compact"
								href={spotifyFavorites.album.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open ${spotifyFavorites.album.label} on Spotify`}
							>
								<img
									class="spotify-shape spotify-shape--square"
									src={spotifyFavorites.album.image}
									alt={`${spotifyFavorites.album.label} album cover`}
									loading="lazy"
								/>
								<div class="spotify-tile__meta">
									<div class="spotify-tile__label">{spotifyFavorites.album.label}</div>
									<div class="spotify-tile__sub">{spotifyFavorites.album.subtitle}</div>
								</div>
							</a>

							<a
								class="spotify-tile spotify-tile--track"
								href={spotifyFavorites.track.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open ${spotifyFavorites.track.label} on Spotify`}
							>
								<img
									class="spotify-shape spotify-shape--square"
									src={spotifyFavorites.track.image}
									alt={`${spotifyFavorites.track.label} cover art`}
									loading="lazy"
								/>
								<div class="spotify-tile__meta">
									<div class="spotify-tile__label">{spotifyFavorites.track.label}</div>
									<div class="spotify-tile__sub">{spotifyFavorites.track.subtitle}</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding-top: clamp(1rem, 2vw, 1.5rem);
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 4vw, 3rem);
	}

	.termbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.85rem;
		padding: 0 0 0.75rem;
		border-bottom: 1px solid var(--border-2);
		margin-bottom: 0.9rem;
	}

	.termbar__title {
		margin: 0;
		font-size: 0.92rem;
		letter-spacing: 0.02em;
		color: rgba(243, 246, 255, 0.82);
		font-weight: 600;
		font-family: var(--font-mono);
		text-transform: lowercase;
	}

	.bio-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	.about-lower {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	.fun-wrap {
		margin: 1rem 0 0;
		width: 100%;
		max-width: 29rem;
		justify-self: start;
	}

	.side-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 1rem;
	}

	@media (min-width: 720px) {
		.bio-row {
			grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
			gap: 1.25rem;
		}

		.about-lower {
			grid-template-columns: minmax(0, 29rem) minmax(0, 1fr);
			gap: 1rem;
			align-items: stretch;
		}

		.side-grid {
			grid-template-rows: auto auto;
			align-self: start;
		}
	}

	.card {
		display: block;
		grid-column: 1 / -1;
		width: 100%;
		text-decoration: none;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: var(--shadow);
		transition: border-color 0.16s ease;
	}

	.card:hover {
		border-color: rgba(222, 232, 255, 0.22);
	}

	.card--bio:hover {
		transform: none;
		border-color: var(--border);
	}

	.card--bio {
		grid-column: auto;
	}

	.card--bio .excerpt {
		max-width: none;
	}

	.portrait-card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.portrait {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}

	.card__inner {
		padding: 1.1rem 1.25rem;
		display: grid;
		gap: 0.6rem;
	}

	.card__inner--media {
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 1.5rem;
	}

	.media-copy {
		display: grid;
		gap: 0.6rem;
		min-width: 0;
	}

	.card-icon {
		width: clamp(44px, 5.2vw, 76px);
		height: auto;
		justify-self: end;
		align-self: center;
		image-rendering: pixelated;
		filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.28));
	}

	.rhythm-icon {
		width: clamp(82px, 14vw, 160px);
		height: auto;
		justify-self: end;
		align-self: center;
		filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.26));
	}

	.title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		letter-spacing: 0.04em;
		line-height: 1.1;
		color: rgba(243, 246, 255, 0.92);
		font-weight: 600;
		text-transform: uppercase;
	}

	.bio-heading {
		margin: 0;
		font-size: clamp(1.25rem, 2.5vw, 1.7rem);
		line-height: 1.2;
		letter-spacing: 0.01em;
		color: #fff;
		margin-bottom: 0.95rem;
	}

	.title-row {
		display: flex;
		align-items: baseline;
		justify-content: flex-start;
		gap: 0.55rem;
	}

	.title-row .cta {
		margin-top: 0;
	}

	.excerpt {
		margin: 0;
		font-size: 14.08px;
		color: rgba(243, 246, 255, 0.72);
		line-height: 1.65;
		max-width: 95ch;
	}

	.cta {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		font-weight: 400;
		color: rgba(54, 242, 194, 0.92);
		margin-top: 0;
		line-height: 1.1;
	}

	.spotify-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.55rem;
	}

	.card--spotify .card__inner {
		padding: 0.9rem 1rem;
		gap: 0.9rem;
		height: 100%;
		align-content: start;
	}

	.spotify-tile {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 0.65rem;
		padding: 0.55rem 0.7rem;
		border: 1px solid var(--border-2);
		background: color-mix(in srgb, var(--panel) 72%, var(--bg) 28%);
		text-decoration: none;
		color: inherit;
		min-width: 0;
	}

	.spotify-tile--compact {
		justify-self: start;
	}

	.spotify-tile:hover {
		border-color: var(--border);
	}

	.spotify-shape {
		width: 40px;
		height: 40px;
		display: block;
		object-fit: cover;
		border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
		background: color-mix(in srgb, var(--panel) 82%, var(--bg) 18%);
	}

	.spotify-shape--circle {
		border-radius: 999px;
	}

	.spotify-shape--square {
		border-radius: 10px;
	}

	.spotify-tile__meta {
		min-width: 0;
	}

	.spotify-tile__label {
		font-family: var(--font-mono);
		font-size: 0.84rem;
		color: var(--text);
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.spotify-tile__sub {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		color: var(--muted);
		line-height: 1.2;
	}

	@media (min-width: 900px) {
		.card--spotify {
			min-height: calc(8rem);
		}

		.spotify-grid {
			grid-template-columns: max-content max-content minmax(0, 1fr);
		}

		.spotify-tile--compact {
			width: fit-content;
			max-width: 100%;
		}
	}

	.highlight {
		color: rgba(54, 242, 194, 0.95);
	}

	@media (max-width: 640px) {
		.section {
			padding-bottom: 2.2rem;
		}

		.shell {
			padding: 0 clamp(0.85rem, 3.5vw, 1.1rem);
		}

		.bio-row {
			gap: 0.85rem;
		}

		.about-lower,
		.side-grid {
			gap: 0.85rem;
		}

		.portrait-card {
			max-width: 240px;
			width: 100%;
			justify-self: center;
		}

		.card__inner {
			padding: 0.95rem 1rem;
		}

		.card__inner--media {
			grid-template-columns: 1fr;
			row-gap: 0.7rem;
		}

		.title-row {
			flex-wrap: wrap;
			gap: 0.4rem 0.65rem;
		}

		.card-icon {
			justify-self: end;
			width: clamp(34px, 12vw, 54px);
		}

		.rhythm-icon {
			width: clamp(62px, 30vw, 112px);
			justify-self: end;
		}
	}
</style>

