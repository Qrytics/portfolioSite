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

	onMount(() => {
		const html = document.documentElement;
		html.classList.remove('instant-home-jump-pending');

		// Preserve native hash navigation; only force top when loading `/` without a hash.
		if (window.location.hash) return;

		const prevScrollBehavior = html.style.scrollBehavior;
		html.style.scrollBehavior = 'auto';
		window.scrollTo({ top: 0, left: 0 });
		html.style.scrollBehavior = prevScrollBehavior;
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
	<GitHubContribChart
		years={data.contribYears}
		selectedYear={data.contribSelectedYear}
		error={data.contribError}
	/>
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
</style>
