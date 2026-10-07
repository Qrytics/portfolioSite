<script lang="ts">
	import FeaturedCerts from '$lib/components/certs/FeaturedCerts.svelte';
	import CertList from '$lib/components/certs/CertList.svelte';
	import { certifications, groupedCertifications } from '$lib/data/certifications';
</script>

<!-- Head metadata for this route lives in $lib/data/seo.ts, resolved once in +layout.svelte. -->

<div class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">certifications</h1>
			<p class="subtitle">
				{certifications.length} credentials across {groupedCertifications.length} issuers — AI agents, quantum computing,
				deep learning, data and cloud. The highlighted four are the ones I'm proudest of; tap one.
			</p>

			<FeaturedCerts />

			<h2 class="kicker">everything else</h2>
			<CertList />

			<p class="back"><a href="/">← back home</a></p>
		</div>
	</section>
</div>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding: clamp(1.25rem, 4vw, 3rem);
	}

	.shell {
		max-width: 76rem;
		margin: 0 auto;
	}

	.title {
		margin: 0 0 0.35rem;
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 2rem;
		max-width: 70ch;
		color: var(--muted);
		line-height: 1.7;
	}

	.kicker {
		margin: 2.75rem 0 1rem;
		color: var(--accent-text);
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.back {
		margin-top: 2.5rem;
		font-size: 0.82rem;
	}

	.back a {
		color: var(--muter);
		text-decoration: none;
	}

	.back a:hover {
		color: var(--accent-text);
	}

	@media (max-width: 640px) {
		.section {
			padding: 1.25rem 1rem 2rem;
		}

		.subtitle {
			font-size: 0.92rem;
			line-height: 1.6;
		}
	}
</style>
