<script lang="ts">
	import { onMount, tick } from 'svelte';
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

	function scrollToHashTarget(hash: string) {
		if (typeof window === 'undefined') return;
		const id = hash.startsWith('#') ? hash.slice(1) : hash;
		if (!id) return;

		let attempts = 0;
		const maxAttempts = 20;
		const tryScroll = () => {
			const target = document.getElementById(id);
			if (target) {
				target.scrollIntoView({ behavior: 'auto', block: 'start' });
				return;
			}
			attempts += 1;
			if (attempts < maxAttempts) {
				requestAnimationFrame(tryScroll);
			}
		};

		requestAnimationFrame(tryScroll);
	}

	function consumeInstantHomeHashScroll(): string | null {
		if (typeof window === 'undefined') return null;
		const key = 'instant-home-hash-scroll';
		const hash = window.sessionStorage.getItem(key);
		if (hash) window.sessionStorage.removeItem(key);
		return hash;
	}

	onMount(async () => {
		await tick();
		const targetHash = consumeInstantHomeHashScroll();
		const html = document.documentElement;
		if (targetHash) {
			const prevScrollBehavior = html.style.scrollBehavior;
			html.style.scrollBehavior = 'auto';
			scrollToHashTarget(targetHash);
			// Keep URL semantics without triggering native hash smooth scroll.
			window.history.replaceState(window.history.state, '', `${window.location.pathname}${targetHash}`);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					html.style.scrollBehavior = prevScrollBehavior;
					html.classList.remove('instant-home-jump-pending');
				});
			});
			return;
		}
		// No pending instant-jump: make sure home starts from the top (override CSS smooth scroll).
		const prevScrollBehavior = html.style.scrollBehavior;
		html.style.scrollBehavior = 'auto';
		window.scrollTo({ top: 0, left: 0 });
		html.style.scrollBehavior = prevScrollBehavior;
		html.classList.remove('instant-home-jump-pending');
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
	const firstPreloadImageHref =
		firstProject?.poster ??
		(firstProject?.image && !/\.(mp4|webm)(\?|#|$)/i.test(firstProject.image)
			? firstProject.image
			: firstProject?.images?.[0]);
</script>

<svelte:head>
	<title>{profile.name} — Portfolio</title>
	{#if firstPreloadImageHref}
		<link rel="preload" href={firstPreloadImageHref} as="image" />
	{/if}
</svelte:head>

<div class="page">
	<Hero />
	<section id="top-projects" aria-label="Projects">
		<ProjectList items={topProjects} compactBottom />
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
