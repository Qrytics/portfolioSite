<script lang="ts">
	import { projects as allProjects, type Project } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	// Optional override for which project set to render (landing "top" vs full index).
	let {
		items = allProjects,
		compactBottom = false,
		collapsedMode = false,
		expandedSlugs = [],
		onToggleExpand
	}: {
		items?: Project[];
		compactBottom?: boolean;
		collapsedMode?: boolean;
		expandedSlugs?: string[];
		onToggleExpand?: (slug: string) => void;
	} = $props();

	/**
	 * Whether the card title bar toggles the body or navigates to the detail page.
	 *
	 * The home page never passed an `onToggleExpand`, so it fell through to a no-op default: the
	 * title bar rendered as a `<button>` with a pointer cursor and a focus ring that did *nothing*
	 * when clicked or activated. It now renders as a link to the project, which is what a person
	 * tapping a project title is trying to do.
	 */
	const toggleable = $derived(typeof onToggleExpand === 'function');
	const handleToggle = (slug: string) => onToggleExpand?.(slug);

	const useColumnLayout = $derived(collapsedMode || (!compactBottom && expandedSlugs.length > 0));
</script>

<section class="section" class:section--collapsed={collapsedMode}>
	<div class="shell">
		<!--
			One flat list in source order for both layouts. This used to round-robin items into
			per-column arrays (`cols[i % colCount]`), which put column 1 entirely before column 2 in the
			DOM while the eye reads across rows — so Tab and screen-reader order moved diagonally
			(1 → 4 → 7 → 2 → 5 → 8) through a visually row-ordered grid. Column count is now a CSS
			media query instead of `colCount = $state(1)` measured in an effect, which also removes the
			one-column flash desktop visitors saw before hydration corrected it.
		-->
		<div class="grid" class:grid--start={useColumnLayout}>
			{#each items as project (project.slug)}
				<ProjectCard
					{project}
					{collapsedMode}
					{toggleable}
					expandedInCollapsedMode={expandedSlugs.includes(project.slug)}
					onToggleExpand={handleToggle}
				/>
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

	/* Collapsed / mixed-expansion layout: cards keep their natural height instead of stretching to
	   the tallest in their row, so a collapsed title bar stays a title bar next to an expanded card. */
	.grid--start {
		align-items: start;
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

