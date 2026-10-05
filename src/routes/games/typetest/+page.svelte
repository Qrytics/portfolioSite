<script lang="ts">
	import TypeTest from '$lib/components/games/TypeTest.svelte';
</script>

<!-- Head metadata for this route lives in $lib/data/seo.ts, resolved once in +layout.svelte. -->

<div class="page">
	<!-- This route used to be linked from nowhere — reachable only by typing the URL or via the
	     sitemap. It now has a card on /games, and this is the way back. -->
	<p class="back"><a href="/games">← back to games</a></p>
	<TypeTest />
</div>

<style>
	.page {
		/* `dvh`: with `vh` this reserved space for browser chrome that is retracted, so the page was
		   taller than the visible viewport on mobile Safari and scrolled for no reason. */
		min-height: calc(100dvh - 200px);
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.back {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1rem;
		font-size: 0.82rem;
	}

	.back a {
		display: inline-block;
		padding: 0.6rem 0;
		text-decoration: none;
	}
</style>
