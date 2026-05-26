<script lang="ts">
	import { aboutPhotos, type AboutPhoto } from '$lib/data/about-photos';

	function imgStyle(photo: AboutPhoto): string {
		const pos = `object-position: ${photo.position ?? '50% 50%'}`;
		const p = photo.padding;
		if (!p) return pos;
		const parts = [pos];
		if (p.top != null) parts.push(`padding-top: ${p.top}px`);
		if (p.right != null) parts.push(`padding-right: ${p.right}px`);
		if (p.bottom != null) parts.push(`padding-bottom: ${p.bottom}px`);
		if (p.left != null) parts.push(`padding-left: ${p.left}px`);
		return parts.join('; ');
	}
</script>

<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">about me</h1>
			<p class="subtitle">A few snapshots with friends and family.</p>

			<div class="grid gallery" role="list">
				{#each aboutPhotos as photo, i (photo.src)}
					<div class="card grid-item" class:grid-item--tall={photo.tall} role="listitem">
						<img
							class="img"
							class:img--contain={photo.fit === 'contain'}
							src={photo.src}
							alt={`About me photo ${i + 1}`}
							loading="lazy"
							style={imgStyle(photo)}
						/>
					</div>
				{/each}
			</div>

			<div class="bottom-row">
				<div class="back-link">
					<a href="/">← back home</a>
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
		color: var(--text);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 1.25rem;
		color: var(--muted);
		max-width: 80ch;
		line-height: 1.7;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.85rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.1rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	.card {
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
	}

	.grid-item--tall.card {
		aspect-ratio: auto;
		align-items: center;
	}

	.grid-item--tall .img {
		width: 100%;
		height: auto;
		max-height: 80vh;
		object-fit: contain;
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
		display: block;
		transition: transform 0.3s ease;
	}

	.img--contain {
		object-fit: contain;
	}

	.grid-item:hover .img {
		transform: scale(1.05);
	}

	.bottom-row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.bottom-row .back-link {
		grid-column: 1;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--muter);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.14s;
	}

	.back-link a:hover {
		color: var(--accent);
	}

	@media (max-width: 640px) {
		.bottom-row {
			grid-template-columns: 1fr;
		}

		.bottom-row .back-link {
			grid-column: 1;
		}
	}
</style>

