<script lang="ts">
	import { projects as allProjects, type Project } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	// Optional override for which project set to render (landing "top" vs full index).
	let {
		items = allProjects,
		compactBottom = false,
		collapsedMode = false,
		expandedSlugs = [],
		onToggleExpand = (_slug: string) => {}
	}: {
		items?: Project[];
		compactBottom?: boolean;
		collapsedMode?: boolean;
		expandedSlugs?: string[];
		onToggleExpand?: (slug: string) => void;
	} = $props();

	// Track visible column count so collapsed columns are pre-distributed and
	// never reflow between each other when a card expands/collapses.
	let colCount = $state(1);

	$effect(() => {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

		const mq3 = window.matchMedia('(min-width: 1100px)');
		const mq2 = window.matchMedia('(min-width: 720px)');

		function update() {
			if (mq3.matches) colCount = 3;
			else if (mq2.matches) colCount = 2;
			else colCount = 1;
		}

		update();

		if (typeof mq3.addEventListener === 'function') {
			mq3.addEventListener('change', update);
			mq2.addEventListener('change', update);
		} else {
			mq3.addListener(update);
			mq2.addListener(update);
		}

		return () => {
			if (typeof mq3.removeEventListener === 'function') {
				mq3.removeEventListener('change', update);
				mq2.removeEventListener('change', update);
			} else {
				mq3.removeListener(update);
				mq2.removeListener(update);
			}
		};
	});

	// Distribute items into independent column arrays (round-robin by index).
	const columns = $derived.by(() => {
		const cols: Project[][] = Array.from({ length: colCount }, () => []);
		items.forEach((item, i) => cols[i % colCount].push(item));
		return cols;
	});
</script>

<section class="section" class:section--collapsed={collapsedMode}>
	<div class="shell">
		{#if collapsedMode}
			<!-- Each column is an isolated flex container; items never reflow between columns. -->
			<div class="columns">
				{#each columns as col}
					<div class="column">
						{#each col as project (project.slug)}
							<ProjectCard
								{project}
								{collapsedMode}
								expandedInCollapsedMode={expandedSlugs.includes(project.slug)}
								{onToggleExpand}
							/>
						{/each}
					</div>
				{/each}
			</div>
		{:else}
			<div class="grid">
				{#each items as project (project.slug)}
					<div class="grid-item">
						<ProjectCard
							{project}
							{collapsedMode}
							expandedInCollapsedMode={expandedSlugs.includes(project.slug)}
							{onToggleExpand}
						/>
					</div>
				{/each}
			</div>
		{/if}
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
		padding-bottom: clamp(1rem, 2.5vw, 2rem);
		content-visibility: auto;
		contain-intrinsic-size: 1200px;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	.grid-item {
		display: contents;
	}

	/* Collapsed masonry: each column is an independent flex column. */
	.columns {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.column {
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.2rem;
		}

		.columns {
			gap: 1.2rem;
		}

		.column {
			gap: 1.2rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.columns {
			gap: 1.25rem;
		}

		.column {
			gap: 1.25rem;
		}
	}
</style>

