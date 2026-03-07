<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import AboutMeTeaser from '$lib/components/AboutMeTeaser.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import ReviewCta from '$lib/components/ReviewCta.svelte';
</script>

<div class="page">
	<Hero />
	<section id="projects" aria-label="Projects">
		<ProjectList />
	</section>
	<AboutMeTeaser />
	<ReviewCta />
</div>

<style>
	.page {
		position: relative;
		isolation: isolate;
	}
</style>
