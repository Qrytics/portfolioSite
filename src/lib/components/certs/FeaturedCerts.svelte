<script lang="ts">
	/**
	 * The featured credentials: large gold badges, in the order set by `featured` in the data file.
	 * Each is a button — tapping it replays a light sweep across the medallion with a soft chime
	 * (synth, so it honours the site-wide mute and only ever plays on a real tap).
	 */
	import CertBadge from './CertBadge.svelte';
	import { certDateLabel, featuredCertifications } from '$lib/data/certifications';
	import { tone } from '$lib/utils/synth';

	let { size = 128, compact = false }: { size?: number; compact?: boolean } = $props();

	let shines = $state<Record<string, number>>({});

	function polish(id: string, i: number) {
		shines[id] = (shines[id] ?? 0) + 1;
		// A small major arpeggio, a step higher for each badge along the row.
		const base = [784, 880, 988, 1047][i % 4];
		[1, 1.25, 1.5, 2].forEach((m, k) => tone(base * m, { type: 'sine', dur: 0.32, vol: 0.18, delay: k * 0.055 }));
	}
</script>

<ol class="featured" class:featured--compact={compact} aria-label="Featured credentials">
	{#each featuredCertifications as cert, i (cert.id)}
		<li class="feat">
			<button type="button" class="feat__badge" onclick={() => polish(cert.id, i)} aria-label="Polish the {cert.title} badge">
				<CertBadge {cert} {size} featured shine={shines[cert.id] ?? 0} />
			</button>
			<span class="feat__ribbon">★ featured</span>
			<h3 class="feat__title">
				{#if cert.verifyUrl}
					<a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">{cert.title}<span class="sr-only"> (opens in new tab)</span></a>
				{:else}
					{cert.title}
				{/if}
			</h3>
			<p class="feat__meta">{cert.issuer} · {certDateLabel(cert)}</p>
		</li>
	{/each}
</ol>

<style>
	.featured {
		--gold: #f2c46d;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:global([data-theme='light']) .featured {
		--gold: #a8741a;
	}

	.feat {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.35rem;
		padding: 1.6rem 1rem 1.25rem;
		border: 1px solid color-mix(in srgb, var(--gold) 38%, var(--border));
		background:
			radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, var(--gold) 12%, transparent), transparent 70%),
			var(--panel);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--gold) 10%, transparent), 0 18px 40px -26px color-mix(in srgb, var(--gold) 55%, transparent);
		transition: transform 0.18s ease, border-color 0.18s ease;
	}

	@media (hover: hover) {
		.feat:hover {
			transform: translateY(-3px);
			border-color: color-mix(in srgb, var(--gold) 70%, var(--border));
		}
	}

	.feat__badge {
		display: grid;
		place-items: center;
		margin: 0.4rem 0 0.75rem;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.feat__badge:active {
		transform: scale(0.94);
	}

	.feat__badge:focus-visible {
		outline: 2px solid var(--focus-ring);
		outline-offset: 6px;
	}

	.feat__ribbon {
		color: var(--gold);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.feat__title {
		margin: 0;
		color: var(--text);
		font-size: 0.92rem;
		line-height: 1.35;
	}

	.feat__title a {
		color: inherit;
		text-decoration: none;
	}

	.feat__title a:hover {
		color: var(--accent-text);
	}

	.feat__meta {
		margin: 0;
		color: var(--muter);
		font-size: 0.74rem;
	}

	.featured--compact .feat {
		padding: 1.25rem 0.85rem 1rem;
	}

	@media (max-width: 980px) {
		.featured {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.feat__badge {
			--cert-badge-size: 92px;
		}
	}

	@media (max-width: 420px) {
		.featured {
			gap: 0.6rem;
		}

		.feat {
			padding: 1.1rem 0.6rem 0.9rem;
		}

		.feat__title {
			font-size: 0.8rem;
		}

		.feat__meta {
			font-size: 0.68rem;
		}
	}
</style>
