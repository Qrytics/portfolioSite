<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects" class="section">
	<div class="shell">
		<div class="grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		margin-top: -10px;
		padding-top: clamp(1rem, 2vw, 1.5rem);
		scroll-margin-top: clamp(4.25rem, 9vw, 5.75rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 4vw, 3rem);
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.2rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}
</style>

