<script lang="ts">
	import TypeTest from '$lib/components/games/TypeTest.svelte';
</script>

<!-- Head metadata for this route lives in $lib/data/seo.ts, resolved once in +layout.svelte. -->

<div class="page">
	<TypeTest />
</div>

<style>
	.page {
		/* `dvh`: with `vh` this reserved space for browser chrome that is retracted, so the page was
		   taller than the visible viewport on mobile Safari and scrolled for no reason. */
		min-height: calc(100dvh - 200px);
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}
</style>
