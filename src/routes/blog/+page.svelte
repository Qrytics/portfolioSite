<script lang="ts">
	import { posts } from '$lib/data/blog';
</script>

<main class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">blog</h1>
			<p class="subtitle">This page is a placeholder — you can wire up real posts later.</p>

			<div class="list">
				{#each posts as post}
					<a class="post" href={`/blog/${post.slug}`}>
						<div class="post__title">{post.title}</div>
						<div class="post__meta">{post.date}</div>
						<div class="post__excerpt">{post.excerpt}</div>
					</a>
				{/each}
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
		padding: 0 clamp(1.25rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem);
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
	}

	.list {
		display: grid;
		gap: 0.75rem;
	}

	.post {
		display: block;
		text-decoration: none;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		transition: border-color 0.16s ease, transform 0.16s ease;
		padding: 1rem 1.1rem;
	}

	.post:hover {
		transform: translateY(-2px);
		border-color: rgba(222, 232, 255, 0.22);
	}

	.post__title {
		font-size: 1rem;
		color: rgba(243, 246, 255, 0.92);
		margin-bottom: 0.25rem;
	}

	.post__meta {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: rgba(243, 246, 255, 0.6);
		margin-bottom: 0.5rem;
	}

	.post__excerpt {
		color: rgba(243, 246, 255, 0.72);
		line-height: 1.6;
	}
</style>

