<script lang="ts">
	import { sfx } from '$lib/utils/synth';

	let { embedded = false }: { embedded?: boolean } = $props();

	/** Fun facts are flip cards: the fact is on the back. Its text is in the DOM either way. */
	let flipped = $state<boolean[]>([]);
	let flipCount = $state(0);

	function flip(i: number) {
		flipped[i] = !flipped[i];
		sfx.whoosh();
		if (flipped[i]) {
			flipCount++;
			sfx.blip(true);
		}
	}

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
		<p class="flip-hint">tap a card to flip it{flipCount >= funFacts.length ? ' — you know everything now' : ''}</p>
		<ul class="flips">
			{#each funFacts as item, i (item)}
				<li>
					<button
						type="button"
						class="flip"
						class:flip--on={flipped[i]}
						aria-pressed={!!flipped[i]}
						aria-label={flipped[i] ? item : `Reveal fun fact ${i + 1}`}
						onclick={() => flip(i)}
					>
						<span class="flip__inner">
							<span class="flip__face flip__front" aria-hidden="true">
								<span class="flip__num">#{String(i + 1).padStart(2, '0')}</span>
								<span class="flip__q">?</span>
							</span>
							<span class="flip__face flip__back" aria-hidden="true">{item}</span>
						</span>
					</button>
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
		background: linear-gradient(180deg, color-mix(in srgb, #ffffff 2.5%, transparent), transparent 60%), var(--panel);
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
		color: color-mix(in srgb, var(--text) 85%, transparent);
		line-height: 1.5;
	}

	.bullet {
		color: var(--accent);
		flex-shrink: 0;
	}

	.flip-hint {
		margin-top: -0.35rem;
		color: var(--muter);
		font-size: 0.74rem;
	}

	.flips {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.5rem;
		list-style: none;
	}

	.flip {
		width: 100%;
		height: 7.5rem;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		cursor: pointer;
		perspective: 600px;
		-webkit-tap-highlight-color: transparent;
	}

	.flip__inner {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.45s cubic-bezier(0.3, 1.4, 0.5, 1);
	}

	.flip--on .flip__inner {
		transform: rotateY(180deg);
	}

	.flip__face {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 0.55rem;
		border: 1px solid var(--border);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.flip__front {
		align-content: center;
		gap: 0.2rem;
		background: color-mix(in srgb, var(--accent) 9%, var(--panel-2));
		border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
	}

	.flip:hover .flip__front {
		border-color: var(--accent);
	}

	.flip__num {
		color: var(--muter);
		font-size: 0.7rem;
	}

	.flip__q {
		color: var(--accent-text);
		font-size: 1.8rem;
		font-weight: 700;
		line-height: 1;
	}

	.flip__back {
		transform: rotateY(180deg);
		background: var(--panel);
		color: var(--text);
		font-size: 0.74rem;
		line-height: 1.45;
		text-align: center;
	}

	@media (max-width: 420px) {
		.flip {
			height: 8.5rem;
		}

		.flip__back {
			font-size: 0.7rem;
		}
	}

	/* No spin: the faces just swap. */
	@media (prefers-reduced-motion: reduce) {
		.flip__inner {
			transition: none;
		}
	}
</style>
