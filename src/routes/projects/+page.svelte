<script lang="ts">
	import { profile } from '$lib/data/profile';
	import ProjectList from '$lib/components/ProjectList.svelte';

	// For SEO: this route lists every project.
	import { projects } from '$lib/data/projects';
	const allProjects = projects;
</script>

<svelte:head>
	<title>{profile.name} — Projects</title>
	<meta name="description" content="All projects and case studies." />
</svelte:head>

<div class="page">
	<section id="projects" aria-label="Projects">
		<ProjectList items={allProjects} />
	</section>
</div>

<style>
	.page {
		position: relative;
	}
</style>

