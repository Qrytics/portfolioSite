<script lang="ts">
	const interests = [
		'Hackathons',
		'FPGA design',
		'Hardware debugging',
		'Building weird side projects',
		'Embedded systems',
		'Full-stack from ESP32 to React'
	];

	const funFacts = [
		'I debug hardware and software in the same afternoon',
		'I once built a robot companion out of a mannequin head',
		'I find timing closure issues weirdly satisfying to fix',
		'AV systems installer by day, FPGA designer by night'
	];
</script>

<section class="fun" id="fun" aria-label="Fun facts and interests">
	<div class="fun__inner">
		<div class="grid">
			<div class="card">
				<div class="card__header">
					<span class="card__icon" aria-hidden="true">⚡</span>
					<h2 class="card__title">Things I Like</h2>
				</div>
				<ul class="list">
					{#each interests as item}
						<li class="list__item">
							<span class="bullet" aria-hidden="true">•</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div class="card">
				<div class="card__header">
					<span class="card__icon" aria-hidden="true">🔧</span>
					<h2 class="card__title">Fun Facts</h2>
				</div>
				<ul class="list">
					{#each funFacts as item}
						<li class="list__item">
							<span class="bullet" aria-hidden="true">•</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.fun {
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.fun__inner {
		max-width: 56rem;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 600px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 60%), var(--panel);
		padding: 1.1rem;
		display: grid;
		gap: 0.75rem;
	}

	.card__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.card__icon {
		font-size: 1rem;
		line-height: 1;
	}

	.card__title {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.list {
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.4rem;
		list-style: none;
	}

	.list__item {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.88rem;
		color: rgba(243, 246, 255, 0.78);
		line-height: 1.5;
	}

	.bullet {
		color: var(--accent);
		flex-shrink: 0;
	}
</style>
