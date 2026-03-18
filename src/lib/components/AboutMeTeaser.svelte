<script lang="ts">
	import FunSection from '$lib/components/FunSection.svelte';
</script>

<section id="about-me" aria-label="About me" class="section">
	<div class="shell">
		<div class="termbar">
			<h2 class="termbar__title">about me</h2>
		</div>

		<div class="fun-wrap">
			<FunSection embedded />
		</div>

		<div class="grid">
			<a class="card" href="/about">
				<div class="card__inner">
					<h3 class="title">photos</h3>
					<p class="excerpt">
						Here's a look into my life outside the keyboard. Friends, family, and the moments that matter.
					</p>
					<div class="cta">open gallery →</div>
				</div>
			</a>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding-top: clamp(1rem, 2vw, 1.5rem);
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
		content-visibility: auto;
		contain-intrinsic-size: 0 400px;
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

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	.fun-wrap {
		margin: 1rem 0 1.2rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.2rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
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
		transition: transform 0.16s ease, border-color 0.16s ease;
	}

	.card:hover {
		transform: translateY(-2px);
		border-color: rgba(222, 232, 255, 0.22);
	}

	.card__inner {
		padding: 1.1rem 1.25rem;
		display: grid;
		gap: 0.6rem;
	}

	.title {
		margin: 0;
		font-size: 1.05rem;
		letter-spacing: 0.01em;
		color: rgba(243, 246, 255, 0.92);
	}

	.excerpt {
		margin: 0;
		color: rgba(243, 246, 255, 0.72);
		line-height: 1.65;
		max-width: 95ch;
	}

	.cta {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: rgba(54, 242, 194, 0.92);
		margin-top: 0.15rem;
	}
</style>

