<script lang="ts">
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
	<section id="projects" aria-label="Projects">
		<ProjectList items={topProjects} />
	</section>
	<GitHubContribChart
		years={data.contribYears}
		selectedYear={data.contribSelectedYear}
		error={data.contribError}
	/>
	<CurrentlyBuilding />
	<Timeline />
	<AboutMeTeaser />
	<ReviewCta />
</div>

<style>
	.page {
		position: relative;
		isolation: isolate;
	}
</style>
