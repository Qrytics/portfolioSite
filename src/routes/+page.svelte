<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Bio from '$lib/components/Bio.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<div class="page">
	<Hero />
	<section id="projects" aria-label="Projects">
		<ProjectList />
	</section>
	<section id="about" aria-label="About">
		<Bio />
		<Skills />
	</section>
	<Contact />
</div>

<style>
	.page {
		position: relative;
		isolation: isolate;
	}
</style>
