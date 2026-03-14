<script lang="ts">
	const stats = [
		{ value: '10+', label: 'Projects Built' },
		{ value: '9', label: 'Languages Used' },
		{ value: '2 000+', label: 'GitHub Commits' },
		{ value: '2', label: 'Hackathons' }
	];
</script>

<section class="stats" id="stats" aria-label="Stats">
	<div class="stats__inner">
		{#each stats as stat}
			<div class="stat">
				<span class="stat__value">{stat.value}</span>
				<span class="stat__label">{stat.label}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.stats {
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.stats__inner {
		max-width: 56rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem 2rem;
	}

	@media (min-width: 480px) {
		.stats__inner {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		align-items: center;
		text-align: center;
	}

	.stat__value {
		font-family: var(--font-mono);
		font-size: clamp(1.6rem, 4vw, 2.4rem);
		font-weight: 700;
		color: var(--accent);
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.stat__label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--muted);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
</style>
