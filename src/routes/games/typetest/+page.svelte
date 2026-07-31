<script lang="ts">
	import TypeTest from '$lib/components/games/TypeTest.svelte';
</script>

<svelte:head>
	<title>Type Speed Test - Mario Belmonte</title>
	<meta name="description" content="Test your typing speed with real code snippets" />
</svelte:head>

<div class="page">
	<TypeTest />
</div>

<style>
	.page {
		min-height: calc(100vh - 200px);
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}
</style>
