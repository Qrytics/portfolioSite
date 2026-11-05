<script lang="ts">
	import { projects as allProjects, type Project } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	// Optional override for which project set to render (landing "top" vs full index).
	let {
		items = allProjects,
		compactBottom = false,
		balanceLead = false,
		collapsedMode = false,
		expandedSlugs = [],
		onToggleExpand
	}: {
		items?: Project[];
		compactBottom?: boolean;
		/** Home-page featured trio: lead card beside two shortened cards, all ending on one line. */
		balanceLead?: boolean;
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
		<div class="grid" class:grid--start={useColumnLayout} class:grid--lead={balanceLead}>
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
		grid-template-columns: minmax(0, 1fr);
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
		/* Featured trio (home page only; /projects keeps equal cards). The lead project is twice
		   the area of its siblings. The two cards beside the lead are shortened so the column
		   ends where the lead ends, and the lead's image absorbs whatever height is left, so
		   nothing is blank and all three bottom edges sit on one line. */
		.grid--lead > :global(article:first-child) {
			grid-column: span 2;
			grid-row: span 2;
			height: 100%;
			align-self: stretch;
			grid-template-rows: auto 1fr auto;
		}
		.grid--lead > :global(article:first-child .media) {
			display: flex;
			min-height: 0;
		}
		.grid--lead > :global(article:first-child .media__frame) {
			flex: 1;
			aspect-ratio: auto !important;
			min-height: 14rem;
		}
		/* Absolutely positioned so the image's natural size cannot prop the row open. */
		.grid--lead > :global(article:first-child .media__img) {
			position: absolute;
			inset: 0;
		}

		.grid--lead > :global(article:not(:first-child) .media__frame) {
			aspect-ratio: 383 / 120 !important;
		}
		.grid--lead > :global(article:not(:first-child) .media__img) {
			object-fit: cover;
			object-position: top center;
		}
		/* The subtitle already says what the project is; the long description is one click away
		   on the detail page. */
		.grid--lead > :global(article:not(:first-child) .card__desc) {
			display: none;
		}
		.grid--lead > :global(article:not(:first-child) .card__subtitle) {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow: hidden;
		}
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}
</style>

