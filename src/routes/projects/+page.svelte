<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
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

	/**
	 * Text + tag filter. With ~40 projects and no way to narrow them, "show me the Svelte ones"
	 * meant scrolling the whole grid. State is mirrored into `?q=&tag=&sort=` so a filtered view can
	 * be linked and survives Back. Read on mount rather than from `page.url` during render: this
	 * route is prerendered, and SvelteKit refuses `url.searchParams` access while prerendering.
	 */
	let query = $state('');
	let activeTag = $state<string | null>(null);
	let urlReady = false;

	const SORT_KEYS: SortKey[] = ['newest', 'oldest', 'size'];

	onMount(() => {
		const params = new URL(window.location.href).searchParams;
		query = params.get('q') ?? '';
		const tag = params.get('tag');
		// Any tag a project actually carries, not only the ones with a chip, so `?tag=svelte` links work.
		const key = tag?.toLowerCase();
		activeTag = key && projects.some((p) => p.tags.some((t) => t.toLowerCase() === key)) ? key : null;
		const sort = params.get('sort');
		if (sort && (SORT_KEYS as string[]).includes(sort)) sortBy = sort as SortKey;
		urlReady = true;
	});

	$effect(() => {
		// Read every piece first so the effect tracks all three even on the early return.
		const q = query.trim();
		const tag = activeTag;
		const sort = sortBy;
		if (!urlReady) return;
		const url = new URL(window.location.href);
		const set = (k: string, v: string | null) => (v ? url.searchParams.set(k, v) : url.searchParams.delete(k));
		set('q', q || null);
		set('tag', tag);
		set('sort', sort === 'newest' ? null : sort);
		if (url.href !== window.location.href) replaceState(url, page.state);
	});

	/** The most-used tags across all projects (case-folded), as filter chips. */
	const allTags = (() => {
		const counts = new Map<string, { label: string; count: number }>();
		for (const p of projects) {
			for (const t of p.tags) {
				const key = t.toLowerCase();
				const hit = counts.get(key);
				if (hit) hit.count += 1;
				else counts.set(key, { label: t, count: 1 });
			}
		}
		return [...counts.entries()]
			.map(([key, v]) => ({ key, ...v }))
			.filter((t) => t.count > 1)
			.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
			.slice(0, 14);
	})();

	/** The chips, plus the active tag when it came from a URL and has no chip of its own. */
	const chipTags = $derived(
		activeTag && !allTags.some((t) => t.key === activeTag)
			? [{ key: activeTag, label: activeTag, count: 0 }, ...allTags]
			: allTags
	);

	function matches(p: Project): boolean {
		if (activeTag && !p.tags.some((t) => t.toLowerCase() === activeTag)) return false;
		const q = query.trim().toLowerCase();
		if (!q) return true;
		return (
			p.title.toLowerCase().includes(q) ||
			p.subtitle.toLowerCase().includes(q) ||
			p.description.toLowerCase().includes(q) ||
			p.tags.some((t) => t.toLowerCase().includes(q))
		);
	}

	function clearFilters() {
		query = '';
		activeTag = null;
	}
	let isCollapsed = $state(false);
	let expandedSlugs = $state<string[]>([]);

	// Mirrors the column-count breakpoints in ProjectList.svelte's `.grid` media queries, so a
	// "row" here always matches the row a visitor actually sees.
	let columns = $state(1);

	$effect(() => {
		const mqWide = window.matchMedia('(min-width: 1100px)');
		const mqMedium = window.matchMedia('(min-width: 720px)');

		function updateColumns() {
			columns = mqWide.matches ? 3 : mqMedium.matches ? 2 : 1;
		}

		updateColumns();
		mqWide.addEventListener('change', updateColumns);
		mqMedium.addEventListener('change', updateColumns);

		return () => {
			mqWide.removeEventListener('change', updateColumns);
			mqMedium.removeEventListener('change', updateColumns);
		};
	});

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

	// Toggling one card's membership in `expandedSlugs` flips its `showBody` the same way in either
	// mode (see ProjectCard's `showBody` derivation) — so applying that same membership change to
	// every slug in its row keeps the whole row visually in sync instead of letting one card's state
	// disagree with its neighbors.
	function toggleProjectExpansion(slug: string) {
		const row = rowForSlug(slug);

		if (expandedSlugs.includes(slug)) {
			expandedSlugs = expandedSlugs.filter((item) => !row.includes(item));
			return;
		}

		expandedSlugs = [...new Set([...expandedSlugs, ...row])];
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

	const filteredProjects = $derived(sortedProjects.filter(matches));
	const isFiltered = $derived(Boolean(query.trim() || activeTag));

	const visibleProjectSlugs = $derived(filteredProjects.map((project) => project.slug));

	const projectRows = $derived.by(() => {
		const rows: string[][] = [];
		for (let i = 0; i < visibleProjectSlugs.length; i += columns) {
			rows.push(visibleProjectSlugs.slice(i, i + columns));
		}
		return rows;
	});

	function rowForSlug(slug: string): string[] {
		return projectRows.find((row) => row.includes(slug)) ?? [slug];
	}

	function isSlugCollapsed(slug: string): boolean {
		return isCollapsed ? !expandedSlugs.includes(slug) : expandedSlugs.includes(slug);
	}

	// A resize (or a sort change) can regroup projects into different rows than the ones a
	// person's clicks last agreed on — e.g. two cards collapsed side-by-side in a 2-column row
	// land next to a third, still-expanded card once the viewport widens to 3 columns. Collapse
	// the whole row in that case rather than expanding it: collapsing is the reversible,
	// no-surprise-content resolution.
	$effect(() => {
		const rowsNeedingCollapse = projectRows.filter((row) => {
			const collapsedCount = row.filter(isSlugCollapsed).length;
			return collapsedCount > 0 && collapsedCount < row.length;
		});

		if (rowsNeedingCollapse.length === 0) return;

		const slugsToCollapse = rowsNeedingCollapse.flat();

		expandedSlugs = isCollapsed
			? expandedSlugs.filter((slug) => !slugsToCollapse.includes(slug))
			: [...new Set([...expandedSlugs, ...slugsToCollapse])];
	});

	const areAllVisibleExpanded = $derived(
		isCollapsed &&
			visibleProjectSlugs.length > 0 &&
			visibleProjectSlugs.every((slug) => expandedSlugs.includes(slug))
	);
	const collapseButtonLabel = $derived(!isCollapsed || areAllVisibleExpanded ? 'collapse' : 'expand');
</script>

<!-- Head metadata for this route lives in $lib/data/seo.ts, resolved once in +layout.svelte. -->

<div class="page">
	<section id="projects" aria-labelledby="projects-title" class:is-collapsed={isCollapsed}>
		<div class="intro">
			<h1 class="title" id="projects-title">projects</h1>

			<div class="filter-row">
				<label class="filter">
					<span class="sr-only">Filter projects</span>
					<span class="filter__prompt" aria-hidden="true">⌕</span>
					<input
						class="filter__input"
						type="search"
						placeholder="filter by name, tech, keyword…"
						spellcheck="false"
						autocomplete="off"
						bind:value={query}
					/>
				</label>
				<p class="count" role="status">
					{isFiltered ? `${filteredProjects.length} of ${projects.length}` : `${projects.length}`} projects
					{#if isFiltered}
						<button type="button" class="clear-btn" onclick={clearFilters}>clear</button>
					{/if}
				</p>
			</div>

			<div class="tag-row" role="group" aria-label="Filter by tag">
				{#each chipTags as t (t.key)}
					<button
						type="button"
						class="tag-chip"
						aria-pressed={activeTag === t.key}
						onclick={() => (activeTag = activeTag === t.key ? null : t.key)}
					>
						{t.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="sort-row" role="group" aria-label="Sort projects">
			<div class="sort-row__left">
				<span class="sort-label">sort ↑↓</span>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'newest'}
					aria-pressed={sortBy === 'newest'}
					onclick={() => (sortBy = 'newest')}
				>
					newest
				</button>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'oldest'}
					aria-pressed={sortBy === 'oldest'}
					onclick={() => (sortBy = 'oldest')}
				>
					oldest
				</button>
				<button
					type="button"
					class="sort-btn"
					class:is-active={sortBy === 'size'}
					aria-pressed={sortBy === 'size'}
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

		{#if filteredProjects.length === 0}
			<p class="no-results">
				No projects match{query.trim() ? ` "${query.trim()}"` : ''}{activeTag ? ` tagged ${activeTag}` : ''}.
				<button type="button" class="clear-btn" onclick={clearFilters}>clear filters</button>
			</p>
		{/if}

		<ProjectList
			items={filteredProjects}
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

	.intro {
		max-width: 86rem;
		margin: 0 auto;
		padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 4vw, 3rem) 0;
	}

	/* Same treatment as the /games title, so the two index pages read as a pair. */
	.title {
		margin: 0 0 0.85rem;
		font-family: var(--font-mono);
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		color: var(--text);
		text-transform: lowercase;
	}

	.filter-row {
		display: flex;
		align-items: center;
		gap: 0.75rem 1rem;
		flex-wrap: wrap;
	}

	.filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex: 1 1 18rem;
		max-width: 32rem;
		padding: 0 0.7rem;
		border: 1px solid var(--border);
		background: var(--panel);
	}

	.filter:focus-within {
		border-color: var(--accent);
	}

	.filter__prompt {
		color: var(--muter);
	}

	.filter__input {
		flex: 1;
		min-width: 0;
		min-height: 2.5rem;
		border: 0;
		background: transparent;
		color: var(--text);
		font-family: var(--font-mono);
		/* 16px floor: iOS zooms into smaller focused inputs. */
		font-size: max(16px, 0.86rem);
		outline: none;
	}

	.count {
		margin: 0;
		font-size: 0.8rem;
		color: var(--muter);
	}

	.clear-btn {
		border: 0;
		background: none;
		padding: 0.4rem 0.3rem;
		color: var(--accent-text);
		font-family: var(--font-mono);
		font-size: inherit;
		cursor: pointer;
		text-decoration: underline;
	}

	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.75rem;
	}

	/* One scrollable row on phones; wrapped, fourteen chips took four rows above the first project. */
	@media (max-width: 640px) {
		.tag-row {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin-inline: calc(-1 * clamp(1.25rem, 4vw, 3rem));
			padding-inline: clamp(1.25rem, 4vw, 3rem);
		}

		.tag-chip {
			flex: none;
		}
	}

	.tag-chip {
		font-family: var(--font-mono);
		font-size: 0.74rem;
		text-transform: lowercase;
		min-height: 2rem;
		padding: 0.3rem 0.6rem;
		border: 1px solid var(--border-2);
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		touch-action: manipulation;
	}

	.tag-chip:hover {
		border-color: color-mix(in srgb, var(--accent) 50%, transparent);
		color: var(--text);
	}

	.tag-chip[aria-pressed='true'] {
		border-color: var(--accent);
		color: var(--accent-text);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
	}

	.no-results {
		max-width: 86rem;
		margin: 1.5rem auto 0;
		padding: 0 clamp(1.25rem, 4vw, 3rem);
		color: var(--muted);
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

