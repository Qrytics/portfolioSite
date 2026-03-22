<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';
	import type { PageData } from './$types';
	import Hero from '$lib/components/Hero.svelte';
	import AboutMeTeaser from '$lib/components/AboutMeTeaser.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import ReviewCta from '$lib/components/ReviewCta.svelte';
	import CurrentlyBuilding from '$lib/components/CurrentlyBuilding.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import GitHubContribChart from '$lib/components/GitHubContribChart.svelte';

	let { data }: { data: PageData } = $props();

	/**
	 * Mount the contrib chart only after hydration. The chart’s SSR + client trees diverged
	 * (runes / derived state), which can break hydration and make everything above this node
	 * disappear in the DOM. SSR and the first client frame both render the placeholder below.
	 */
	let contribChartMounted = $state(false);
	onMount(() => {
		contribChartMounted = true;
	});

	const firstProject = projects[0];
	// Landing page shows only the projects you consider "top projects".
	// Use an explicit allow-list to make the homepage deterministic.
	const topProjectSlugs = new Set([
		'smart-home-iot-dashboard',
		'visual-budget-planner',
		'auto-docker'
	]);
	const topProjects = projects.filter((p) => topProjectSlugs.has(p.slug));
	const firstMediaHref = firstProject?.image ?? firstProject?.images?.[0];
	const isVideo = firstMediaHref && /\.(mp4|webm)(\?|#|$)/i.test(firstMediaHref);
</script>

<svelte:head>
	<title>{profile.name} — Portfolio</title>
	{#if firstMediaHref}
		<link rel="preload" href={firstMediaHref} as={isVideo ? 'video' : 'image'} />
	{/if}
</svelte:head>

<div class="page">
	<Hero />
	<section id="top-projects" aria-label="Projects">
		<ProjectList items={topProjects} />
	</section>
	{#if contribChartMounted}
		<GitHubContribChart
			years={data.contribYears}
			selectedYear={data.contribSelectedYear}
			error={data.contribError}
		/>
	{:else}
		<section
			class="contrib-chart-placeholder"
			aria-label="GitHub commit history"
			aria-busy="true"
		>
			<div class="contrib-chart-placeholder__inner">
				<div class="contrib-chart-placeholder__card">
					<div class="contrib-chart-placeholder__bar">
						<span class="contrib-chart-placeholder__prompt">#</span>
						<span class="contrib-chart-placeholder__label">github commit history</span>
					</div>
					<div class="contrib-chart-placeholder__body">
						<p class="contrib-chart-placeholder__status" role="status">
							Loading contribution chart…
						</p>
						<div class="contrib-chart-placeholder__months" aria-hidden="true"></div>
						<div class="contrib-chart-placeholder__skeleton" aria-hidden="true">
							{#each Array.from({ length: 7 * 18 }, (_, i) => i) as i (i)}
								<span class="contrib-chart-placeholder__cell"></span>
							{/each}
						</div>
						<noscript>
							<p class="contrib-chart-placeholder__noscript">
								Enable JavaScript to show your GitHub contribution grid.
							</p>
						</noscript>
					</div>
				</div>
			</div>
		</section>
	{/if}
	<CurrentlyBuilding repos={data.recentRepos} error={data.recentReposError} />
	<Timeline />
	<AboutMeTeaser />
	<ReviewCta />
</div>

<style>
	.page {
		position: relative;
		/* No isolation: isolate — it created a stacking/compositing boundary that could leave
		   centered header controls (search/terminal) unclickable on `/` in some Chromium builds. */
	}

	.contrib-chart-placeholder {
		padding: 2rem clamp(1.25rem, 4vw, 3rem) 0;
	}

	.contrib-chart-placeholder__inner {
		max-width: 86rem;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.contrib-chart-placeholder__card {
		width: fit-content;
		max-width: 100%;
		min-width: min(100%, 28rem);
		min-height: 14rem;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 60%), var(--panel);
		overflow: hidden;
	}

	.contrib-chart-placeholder__bar {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.22);
		font-family: var(--font-mono);
		font-size: 0.82rem;
	}

	.contrib-chart-placeholder__prompt {
		color: var(--accent);
		font-weight: 700;
	}

	.contrib-chart-placeholder__label {
		color: rgba(243, 246, 255, 0.72);
		letter-spacing: 0.04em;
	}

	.contrib-chart-placeholder__body {
		padding: 0.85rem 0.9rem 1rem;
		min-height: 10rem;
		background: rgba(0, 0, 0, 0.08);
	}

	.contrib-chart-placeholder__status {
		margin: 0 0 0.65rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--muted);
		text-align: center;
	}

	.contrib-chart-placeholder__months {
		height: 1rem;
		margin-bottom: 0.35rem;
		max-width: calc(18 * (11px + 3px));
		margin-left: auto;
		margin-right: auto;
		border-radius: 2px;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.09) 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		background-size: 200% 100%;
		animation: contrib-ph-shimmer 1.4s ease-in-out infinite;
	}

	.contrib-chart-placeholder__skeleton {
		display: grid;
		grid-template-columns: repeat(18, 11px);
		grid-template-rows: repeat(7, 11px);
		gap: 2px;
		justify-content: center;
		margin: 0 auto;
		width: fit-content;
	}

	.contrib-chart-placeholder__cell {
		width: 11px;
		height: 11px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.04);
		animation: contrib-ph-pulse 1.2s ease-in-out infinite;
	}

	.contrib-chart-placeholder__noscript {
		margin: 0.75rem 0 0;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--muted);
		text-align: center;
	}

	@keyframes contrib-ph-pulse {
		0%,
		100% {
			opacity: 0.45;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes contrib-ph-shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}
</style>
