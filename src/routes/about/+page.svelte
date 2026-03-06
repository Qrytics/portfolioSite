<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">about me</h1>
			<p class="subtitle">
				A few snapshots with friends and family. Replace the placeholder images in
				<code>static/about/</code> with your real photos whenever you’re ready.
			</p>

			<div class="grid" role="list">
				{#each Array.from({ length: 9 }, (_, i) => i + 1) as n (n)}
					<div class="card" role="listitem">
						<img class="img" src="/about/placeholder.svg" alt={`About me photo ${n}`} loading="lazy" />
					</div>
				{/each}
			</div>

			<div class="back-link">
				<a href="/">← back home</a>
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

	code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		color: rgba(54, 242, 194, 0.9);
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
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
		aspect-ratio: 4 / 3;
		display: grid;
		place-items: center;
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.back-link {
		margin-top: 1.5rem;
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

