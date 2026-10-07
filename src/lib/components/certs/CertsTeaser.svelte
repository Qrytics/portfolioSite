<script lang="ts">
	/** Home-page slice of /certifications: the featured four, plus the count and issuers behind a link. */
	import FeaturedCerts from './FeaturedCerts.svelte';
	import { certifications, featuredCertifications, groupedCertifications } from '$lib/data/certifications';

	const rest = certifications.length - featuredCertifications.length;
</script>

<section class="certs" id="certifications" aria-labelledby="certs-title">
	<div class="certs__inner">
		<header class="certs__head">
			<h2 class="certs__title" id="certs-title">certifications</h2>
			<a class="certs__all" href="/certifications">see all {certifications.length} →</a>
		</header>
		<FeaturedCerts size={112} compact />
		<p class="certs__more">
			+ {rest} more from
			{#each groupedCertifications as g, i (g.id)}<span class="issuer" style="--tint:{g.tint}">{g.id}</span>{i < groupedCertifications.length - 2 ? ', ' : i === groupedCertifications.length - 2 ? ' & ' : ''}{/each}
		</p>
	</div>
</section>

<style>
	.certs {
		padding: 2.5rem clamp(1.25rem, 4vw, 3rem);
		scroll-margin-top: 5rem;
	}

	.certs__inner {
		max-width: 86rem;
		margin: 0 auto;
	}

	.certs__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.certs__title {
		margin: 0;
		color: var(--accent);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	:global([data-theme='light']) .certs__title {
		color: var(--accent-text);
	}

	.certs__all {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		font-size: 0.86rem;
		text-decoration: none;
	}

	.certs__all:hover {
		text-decoration: underline;
	}

	.certs__more {
		margin: 1rem 0 0;
		color: var(--muter);
		font-size: 0.82rem;
		line-height: 1.7;
	}

	.issuer {
		color: var(--muted);
		white-space: nowrap;
	}

	.issuer::before {
		content: '';
		display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		margin-right: 0.35rem;
		border-radius: 50%;
		background: var(--tint);
		vertical-align: 0.05em;
	}

	@media (max-width: 559px) {
		.certs {
			padding: 2rem 1rem;
		}
	}
</style>
