<script lang="ts">
	let { embedded = false }: { embedded?: boolean } = $props();

	const interests = [
		'Health and fitness',
		'Competitive gaming and strategic thinking',
		'Dance and self-expression',
		'Building weird side projects',
		'Continuous learning and self-improvement'
	];

	const funFacts = [
		'I played the violin and drums for 7 years',
		'I push past my comfort zone regularly',
		'I am obsessed with the rhythm dance game PUMP IT UP'
	];
</script>

{#snippet mergedContent()}
	<div class="card">
		<div class="card__header">
			<h2 class="card__title">Things I Like</h2>
		</div>
		<ul class="list">
			{#each interests as item (item)}
				<li class="list__item">
					<span class="bullet" aria-hidden="true">•</span>
					{item}
				</li>
			{/each}
		</ul>

		<div class="card__header card__header--subsection">
			<h2 class="card__title">Fun Facts</h2>
		</div>
		<ul class="list">
			{#each funFacts as item (item)}
				<li class="list__item">
					<span class="bullet" aria-hidden="true">•</span>
					{item}
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#if embedded}
	<div class="grid">
		{@render mergedContent()}
	</div>
{:else}
	<section class="fun" id="fun" aria-label="Fun facts and interests">
		<div class="fun__inner">
			<div class="grid">
				{@render mergedContent()}
			</div>
		</div>
	</section>
{/if}

<style>
	.fun {
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.fun__inner {
		max-width: 86rem;
		margin: 0 auto;
	}

	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
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

	.card__header--subsection {
		margin-top: 0.4rem;
		padding-top: 0.9rem;
		border-top: 1px solid var(--border-2);
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
