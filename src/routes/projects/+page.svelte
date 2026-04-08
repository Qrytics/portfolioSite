<script lang="ts">
	import { profile } from '$lib/data/profile';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import { projectLanguageBytes } from '$lib/data/projectLanguageBytes';

	// For SEO: this route lists every project.
	import { projects, type Month, type Project } from '$lib/data/projects';

	type SortKey = 'newest' | 'oldest' | 'size';

	const monthToNumber: Record<Month, number> = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12
	};

	let sortBy = $state<SortKey>('newest');
	let isCollapsed = $state(false);
	let expandedSlugs = $state<string[]>([]);

	function toggleCollapsedView() {
		if (!isCollapsed) {
			isCollapsed = true;
			expandedSlugs = [];
			return;
		}

		if (areAllVisibleExpanded) {
			expandedSlugs = [];
			return;
		}

		expandedSlugs = [...visibleProjectSlugs];
	}

	function toggleProjectExpansion(slug: string) {
		if (!isCollapsed) return;
		if (expandedSlugs.includes(slug)) {
			expandedSlugs = expandedSlugs.filter((item) => item !== slug);
			return;
		}

		expandedSlugs = [...expandedSlugs, slug];
	}

	function monthIndex(year: number, month: Month): number {
		return year * 12 + monthToNumber[month];
	}

	function endIndex(project: Project): number {
		return monthIndex(project.endYear, project.endMonth);
	}

	function startIndex(project: Project): number {
		return monthIndex(project.startYear, project.startMonth);
	}

	function durationInMonths(project: Project): number {
		return Math.max(1, endIndex(project) - startIndex(project) + 1);
	}

	function languageBytes(project: Project): number {
		return projectLanguageBytes[project.slug] ?? 0;
	}

	const sortedProjects = $derived.by(() => {
		const arr = [...projects];

		if (sortBy === 'newest') {
			return arr.sort((a, b) => endIndex(b) - endIndex(a));
		}

		if (sortBy === 'oldest') {
			return arr.sort((a, b) => startIndex(a) - startIndex(b));
		}

		return arr.sort((a, b) => {
			const byBytes = languageBytes(b) - languageBytes(a);
			if (byBytes !== 0) return byBytes;

			const byDuration = durationInMonths(b) - durationInMonths(a);
			if (byDuration !== 0) return byDuration;

			return endIndex(b) - endIndex(a);
		});
	});

	const visibleProjectSlugs = $derived(sortedProjects.map((project) => project.slug));
	const areAllVisibleExpanded = $derived(
		isCollapsed &&
			visibleProjectSlugs.length > 0 &&
			visibleProjectSlugs.every((slug) => expandedSlugs.includes(slug))
	);
	const collapseButtonLabel = $derived(!isCollapsed || areAllVisibleExpanded ? 'collapse' : 'expand');
</script>

<svelte:head>
	<title>{profile.name} — Projects</title>
	<meta name="description" content="All projects and case studies." />
</svelte:head>

<div class="page">
	<section id="projects" aria-label="Projects" class:is-collapsed={isCollapsed}>
		<div class="sort-row" aria-label="Sort projects">
			<div class="sort-row__left">
				<span class="sort-label">sort ↑↓</span>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'newest'}
					onclick={() => (sortBy = 'newest')}
				>
					newest
				</button>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'oldest'}
					onclick={() => (sortBy = 'oldest')}
				>
					oldest
				</button>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'size'}
					onclick={() => (sortBy = 'size')}
				>
					size
				</button>
			</div>

			<button
				type="button"
				class="sort-btn collapse-btn"
				class:is-active={isCollapsed && collapseButtonLabel === 'expand'}
				onclick={toggleCollapsedView}
			>
				{collapseButtonLabel}
			</button>
		</div>

		<ProjectList
			items={sortedProjects}
			collapsedMode={isCollapsed}
			expandedSlugs={expandedSlugs}
			onToggleExpand={toggleProjectExpansion}
		/>
	</section>
</div>

<style>
	.page {
		position: relative;
	}

	.sort-row {
		max-width: 86rem;
		margin: 0 auto;
		padding: clamp(0.6rem, 1.4vw, 1rem) clamp(1.25rem, 4vw, 3rem) 0;
		position: relative;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: nowrap;
		overflow-x: auto;
	}

	.sort-row__left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: max-content;
	}

	.sort-label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.03em;
		text-transform: lowercase;
		color: var(--muter);
		white-space: nowrap;
		padding-right: 0.25rem;
	}

	.sort-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		line-height: 1;
		letter-spacing: 0.03em;
		text-transform: lowercase;
		min-height: 2rem;
		padding: 0.38rem 0.72rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--muted);
		cursor: pointer;
		white-space: nowrap;
		pointer-events: auto;
		touch-action: manipulation;
		transition: border-color 0.14s ease, color 0.14s ease, background-color 0.14s ease;
	}

	.sort-btn:hover {
		border-color: var(--accent);
		color: var(--text);
	}

	.sort-btn.is-active {
		border-color: var(--accent);
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, var(--panel));
	}

	.collapse-btn {
		margin-left: auto;
	}

	@media (max-width: 720px) {
		.sort-row {
			align-items: flex-start;
			flex-wrap: wrap;
			overflow-x: visible;
			gap: 0.55rem;
		}

		.sort-row__left {
			flex-wrap: wrap;
			gap: 0.45rem;
			min-width: 0;
		}

		.sort-btn {
			min-height: 2.35rem;
			padding: 0.44rem 0.72rem;
			font-size: 0.8rem;
		}

		.collapse-btn {
			margin-left: 0;
		}
	}

</style>

