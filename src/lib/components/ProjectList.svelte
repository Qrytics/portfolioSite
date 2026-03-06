<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	let showAll = $state(false);

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	const displayed = $derived(showAll ? projects : featured);
</script>

<section id="projects" class="section">
	<div class="section-inner">
		<div class="section-header">
			<div class="label">
				<span class="prompt">#</span> projects
			</div>
		</div>

		<div class="grid">
			{#each displayed as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>

		{#if rest.length > 0}
			<div class="show-more">
				<button class="btn-text" onclick={() => (showAll = !showAll)}>
					{showAll ? '↑ show less' : `↓ show ${rest.length} more project${rest.length > 1 ? 's' : ''}`}
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.section {
		padding: 5rem 2rem;
	}

	.section-inner {
		max-width: 960px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 2.5rem;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 1.25rem;
		color: var(--text-muted);
		letter-spacing: 0.04em;
	}

	.prompt {
		color: var(--accent);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.show-more {
		margin-top: 2rem;
		text-align: center;
	}

	.btn-text {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-dim);
		background: none;
		border: none;
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: color 0.15s;
		padding: 0.5rem 1rem;
	}

	.btn-text:hover {
		color: var(--accent);
	}
</style>
