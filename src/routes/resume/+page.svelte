<script lang="ts">
	import ReviewCta from '$lib/components/ReviewCta.svelte';
</script>

<main class="page">
	<section class="section">
		<div class="shell">
			<header class="header">
				<h1 class="title">resume</h1>
				<p class="subtitle">
					Embedded view of my current resume. If the viewer doesn’t load, you can open it directly
					<a
						href="https://drive.google.com/file/d/1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
					>
						on Google Drive ↗
					</a>.
				</p>
			</header>

			<div class="frame">
				<iframe
					title="Mario Belmonte — Resume"
					src="https://drive.google.com/file/d/1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0/preview"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					allow="autoplay"
				>
				</iframe>
			</div>

			<div class="review-cta-wrap">
				<ReviewCta />
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

	.header {
		margin-bottom: 1rem;
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
		margin: 0;
		color: rgba(243, 246, 255, 0.7);
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.subtitle a {
		color: rgba(54, 242, 194, 0.92);
		text-decoration: none;
		border-bottom: 1px solid rgba(54, 242, 194, 0.35);
	}

	.subtitle a:hover {
		color: var(--accent);
		border-bottom-color: rgba(54, 242, 194, 0.55);
	}

	.frame {
		margin-top: 1.25rem;
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.frame iframe {
		display: block;
		width: 100%;
		height: min(1200px, calc(100vh - 9rem));
		border: none;
		background: #111319;
	}

	.review-cta-wrap {
		margin-top: 1.5rem;
	}

	@media (max-width: 640px) {
		.frame iframe {
			height: calc(100vh - 8rem);
		}
	}
</style>

