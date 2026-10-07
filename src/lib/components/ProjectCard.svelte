<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import MediaSection from '$lib/components/MediaSection.svelte';
	import { getTagKind } from '$lib/utils/tags';
	import { getYouTubeId, isGitHubRepo } from '$lib/utils/urls';

	let {
		project,
		collapsedMode = false,
		expandedInCollapsedMode = false,
		toggleable = false,
		onToggleExpand = (_slug: string) => {}
	}: {
		project: Project;
		collapsedMode?: boolean;
		expandedInCollapsedMode?: boolean;
		/** When false the title bar navigates to the detail page instead of toggling the body. */
		toggleable?: boolean;
		onToggleExpand?: (slug: string) => void;
	} = $props();

	const showBody = $derived(collapsedMode ? expandedInCollapsedMode : !expandedInCollapsedMode);
	const bodyId = $derived(`project-body-${project.slug}`);

	function onCollapsedBarClick() {
		onToggleExpand(project.slug);
	}

	const detailPath = $derived(`/projects/${project.slug}`);

	const typeLabelMap: Record<string, string> = {
		'open-source': 'open source',
		'closed-source': 'closed source',
		'community / ecosystem': 'community / ecosystem',
		'multi-site': 'multi-site'
	};

	function isVideoDemo(url: string): boolean {
		if (getYouTubeId(url)) return true;
		return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
	}


</script>

<article
	class="card"
	class:card--collapsed-only={!showBody}
>
	<!--
		Terminal title bar. This was two byte-identical branches that disagreed about what
		`aria-expanded` meant — `expandedInCollapsedMode` in one, `showBody` in the other. They
		resolve to the same value (`showBody` *is* `expandedInCollapsedMode` when `collapsedMode`),
		so the branch was pure duplication hiding a contradiction.

		The chevron is new: the bar was a full-width pointer-cursor control with no affordance at all,
		so people tapped it expecting to open the project and instead collapsed the card they were
		looking at.
	-->
	{#if toggleable}
		<button
			type="button"
			class="termbar termbar--collapsible"
			onclick={onCollapsedBarClick}
			aria-expanded={showBody}
			aria-controls={showBody ? bodyId : undefined}
		>
			<span class="termbar__chevron" aria-hidden="true">{showBody ? '▾' : '▸'}</span>
			<span class="termbar__title termbar__titleText">{project.shortTitle ?? project.title}</span>
			<span class="badge" data-type={project.type}>{typeLabelMap[project.type]}</span>
		</button>
	{:else}
		<a href={detailPath} class="termbar termbar--collapsible termbar--link">
			<span class="termbar__chevron" aria-hidden="true">→</span>
			<span class="termbar__title termbar__titleText">{project.shortTitle ?? project.title}</span>
			<span class="badge" data-type={project.type}>{typeLabelMap[project.type]}</span>
		</a>
	{/if}

	{#if showBody}
		<!-- Media -->
		<MediaSection {project} />

		<!-- Content -->
		<div class="content" id={bodyId}>
			<p class="card__dates">{project.startMonth} {project.startYear} - {project.endMonth} {project.endYear}</p>
			<p class="card__subtitle">{project.subtitle}</p>
			<p class="card__desc card__desc--desktop-only">{project.description}</p>

			<div class="tech-badges">
				{#each project.tags as tag (tag)}
					<span class="tech-badge" data-kind={getTagKind(tag)}>{tag}</span>
				{/each}
			</div>

			<div class="links">
				{#if project.github}
					<a href={project.github} target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--external">
						{#if isGitHubRepo(project.github)}
							GitHub Repo ↗
						{:else}
							Source ↗
						{/if}<span class="sr-only"> for {project.title} (opens in new tab)</span>
					</a>
				{/if}
				{#if project.siteUrl || project.projectPageUrl}
					<a href={project.siteUrl ?? project.projectPageUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--external" data-sveltekit-reload>
						Visit Site ↗<span class="sr-only"> for {project.title} (opens in new tab)</span>
					</a>
				{/if}
				{#if project.demo && !isVideoDemo(project.demo)}
					<a href={project.demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
						demo ↗<span class="sr-only"> for {project.title} (opens in new tab)</span>
					</a>
				{/if}
				<a href={detailPath} class="btn btn--ghost btn--details">details<span class="sr-only"> for {project.title}</span> →</a>
			</div>
		</div>
	{/if}
</article>

<style>
	.card {
		position: relative;
		z-index: 1;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, color-mix(in srgb, #ffffff 3%, transparent), transparent 52%), var(--panel);
		box-shadow: 0 10px 26px color-mix(in srgb, #000000 40%, transparent);
		overflow: hidden;
		min-width: 0;
		height: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr;
		transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
		contain: layout style paint;
	}

	.card--collapsed-only {
		height: auto;
		grid-template-rows: auto;
		align-self: stretch;
	}

	.card:hover {
		z-index: 2;
		border-color: color-mix(in srgb, var(--accent) 25%, transparent);
		box-shadow: 0 14px 36px color-mix(in srgb, #000000 50%, transparent);
	}

	/* Termbar */
	.termbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.85rem;
		padding: 0.75rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: color-mix(in srgb, #000000 22%, transparent);
		min-width: 0;
	}

	.termbar--collapsible {
		cursor: pointer;
		width: 100%;
		border: 0;
		text-align: left;
		font: inherit;
		touch-action: manipulation;
	}

	.termbar--collapsible:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
		outline-offset: -2px;
	}

	.termbar--link {
		text-decoration: none;
		color: inherit;
	}

	.termbar__chevron {
		flex: 0 0 auto;
		font-size: 0.8rem;
		line-height: 1;
		color: var(--accent);
		transition: transform 0.14s ease;
	}

	.termbar--collapsible:hover .termbar__chevron,
	.termbar--collapsible:focus-visible .termbar__chevron {
		transform: translateX(1px);
	}

	.termbar__titleText {
		text-decoration: none;
	}

	.termbar__title {
		margin: 0;
		font-size: 0.92rem;
		letter-spacing: 0.02em;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 600;
		min-width: 0;
		flex: 1 1 auto;
	}

	/* Source badge */
	.badge {
		font-size: 0.78rem;
		color: var(--muted);
		border: 1px solid var(--border-2);
		padding: 0.2rem 0.55rem;
		background: color-mix(in srgb, #ffffff 3%, transparent);
		text-transform: lowercase;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.badge[data-type='open-source'] {
		border-color: color-mix(in srgb, var(--accent) 25%, transparent);
		color: color-mix(in srgb, var(--accent) 92%, transparent);
		background: color-mix(in srgb, var(--accent) 5%, transparent);
	}

	.badge[data-type='closed-source'] {
		border-color: color-mix(in srgb, var(--accent-2) 22%, transparent);
		color: color-mix(in srgb, var(--accent-2) 92%, transparent);
		background: color-mix(in srgb, var(--accent-2) 5%, transparent);
	}

	.badge[data-type='community / ecosystem'] {
		border-color: color-mix(in srgb, #654ff0 22%, transparent);
		color: color-mix(in srgb, #836dff 92%, transparent);
		background: color-mix(in srgb, #654ff0 5%, transparent);
	}

	.badge[data-type='multi-site'] {
		border-color: color-mix(in srgb, #ff5b57 25%, transparent);
		color: color-mix(in srgb, #ff7975 92%, transparent);
		background: color-mix(in srgb, #ff5b57 5%, transparent);
	}

	/* The dark-mode text colours above are ~2.6:1 on the light panel; same hues, darker. */
	:global([data-theme='light']) .badge[data-type='community / ecosystem'] {
		color: #4c3bc2;
		border-color: color-mix(in srgb, #4c3bc2 35%, transparent);
	}

	:global([data-theme='light']) .badge[data-type='multi-site'] {
		color: #b42318;
		border-color: color-mix(in srgb, #b42318 35%, transparent);
	}

	/* Content */
	.content {
		padding: 1rem;
		display: grid;
		gap: 0.75rem;
		align-content: start;
		min-width: 0;
	}

	.card__subtitle {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
		line-height: 1.45;
		overflow-wrap: anywhere;
	}

	.card__dates {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: color-mix(in srgb, var(--text) 65%, transparent);
		letter-spacing: 0.02em;
	}

	.card__desc {
		margin: 0;
		color: color-mix(in srgb, var(--text) 85%, transparent);
		line-height: 1.6;
		font-size: 0.97rem;
		overflow-wrap: anywhere;
	}

	/* Tech badges */
	.tech-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.25rem;
	}

	.tech-badge {
		font-size: 0.72rem;
		font-weight: 500;
		color: var(--muted);
		border: 1px solid var(--border-2);
		padding: 0.18rem 0.45rem;
		background: color-mix(in srgb, #ffffff 3%, transparent);
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	/* Badge type colors — palette tokens live in app.css. */
	.tech-badge[data-kind] {
		border-color: color-mix(in srgb, var(--tag-c) 42%, transparent);
		color: color-mix(in srgb, var(--tag-fg) 95%, transparent);
		background: color-mix(in srgb, var(--tag-c) 13%, transparent);
	}

	.tech-badge[data-kind='other'] {
		border-color: color-mix(in srgb, var(--tag-c) 35%, transparent);
		background: color-mix(in srgb, var(--tag-c) 10%, transparent);
	}

	/* Action links */
	.links {
		margin-top: 0.1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--border);
		text-decoration: none;
		font-size: 0.9rem;
		line-height: 1;
		transition: transform 0.14s ease, background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn--primary {
		border-color: color-mix(in srgb, var(--accent) 32%, transparent);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		color: color-mix(in srgb, var(--accent) 95%, transparent);
	}

	.btn--primary:hover {
		background: color-mix(in srgb, var(--accent) 13%, transparent);
		border-color: color-mix(in srgb, var(--accent) 42%, transparent);
	}

	.btn--ghost {
		background: color-mix(in srgb, #ffffff 3%, transparent);
		color: color-mix(in srgb, var(--text) 85%, transparent);
		border-color: color-mix(in srgb, var(--text) 14%, transparent);
	}

	.btn--ghost:hover {
		background: color-mix(in srgb, #ffffff 6%, transparent);
		border-color: color-mix(in srgb, var(--text) 20%, transparent);
	}

	:global([data-theme='light']) .btn--ghost {
		background: var(--clr-surface-tonal-a0);
		color: var(--clr-primary-a40);
		border-color: var(--clr-surface-tonal-a10);
	}

	:global([data-theme='light']) .btn--ghost:hover {
		background: color-mix(in srgb, var(--clr-primary-a0) 10%, var(--clr-surface-tonal-a0));
		color: var(--clr-primary-a0);
		border-color: var(--clr-primary-a30);
	}

	/*
	 * Phones. One block, and it has to stay *last*: a media query adds no specificity, so it only
	 * wins over the base rules above by coming after them. An earlier 520px block sat above the base
	 * rules and every declaration in it was silently overridden — the "mobile" card was the desktop one.
	 */
	@media (max-width: 640px) {
		.termbar {
			padding: 0.7rem 0.85rem;
			gap: 0.6rem;
			align-items: flex-start;
		}

		.termbar__chevron {
			margin-top: 0.3rem;
		}

		/* Wrap to two lines instead of truncating: the badge used to eat the width, leaving
		   "Smart Home IoT Das…" as the only clue to what a card is. */
		.termbar__title {
			font-size: 0.9rem;
			line-height: 1.35;
			white-space: normal;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}

		.badge {
			font-size: 0.68rem;
			padding: 0.15rem 0.4rem;
			margin-top: 0.1rem;
		}

		.content {
			padding: 0.9rem 0.85rem 1rem;
			gap: 0.6rem;
		}

		.card__dates {
			font-size: 0.72rem;
		}

		.card__subtitle {
			color: var(--text);
			font-size: 0.9rem;
			line-height: 1.5;
		}

		.card__desc {
			font-size: 0.84rem;
			line-height: 1.55;
			color: var(--muted);
		}

		/* Clamp rather than hide: hiding left phone visitors with only the one-line subtitle and no
		   idea what a project does. The full text is one tap away on "details". */
		.card__desc--desktop-only {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			overflow: hidden;
		}

		.tech-badges {
			gap: 0.3rem;
			margin-top: 0;
		}

		.tech-badge {
			font-size: 0.66rem;
			padding: 0.14rem 0.38rem;
		}

		/* An even two-column grid: external links pair up, and anything left over (an odd
		   "details") spans the row instead of floating at 75% width in the middle. */
		.links {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.45rem;
			margin-top: 0.2rem;
		}

		.btn {
			justify-content: center;
			min-height: 2.75rem;
			padding: 0.5rem 0.6rem;
			font-size: 0.82rem;
		}

		.btn:hover {
			transform: none;
		}

		.btn:last-child:nth-child(odd) {
			grid-column: 1 / -1;
		}
	}

</style>

