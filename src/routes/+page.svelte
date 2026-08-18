<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { projects } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';
	import {
		loadContrib,
		loadRecent,
		type GithubContribData,
		type RecentRepo
	} from '$lib/utils/githubData';
	import Hero from '$lib/components/Hero.svelte';
	import AboutMeTeaser from '$lib/components/AboutMeTeaser.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import ReviewCta from '$lib/components/ReviewCta.svelte';
	import CurrentlyBuilding from '$lib/components/CurrentlyBuilding.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import GitHubContribChart from '$lib/components/GitHubContribChart.svelte';
	import { getSessionItem, removeSessionItem } from '$lib/utils/safeStorage';

	/**
	 * Fetched on the client after mount rather than in a `load` function. This page previously set
	 * `prerender = false` purely so `+page.ts` could call `/api/github-contrib` (five sequential
	 * GraphQL round trips) and `/api/github-recent` before returning a single byte of HTML — for two
	 * components that were then gated out of the server output anyway. The page is now prerendered
	 * to a static file, so the shell arrives from the CDN and these two sections fill in behind it.
	 */
	let contribYears = $state<GithubContribData[]>([]);
	let contribError = $state<string | null>(null);
	let recentRepos = $state<RecentRepo[]>([]);
	let recentReposError = $state<string | null>(null);

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
		const key = 'instant-home-hash-scroll';
		const hash = getSessionItem(key);
		if (hash) removeSessionItem(key);
		return hash;
	}

	/**
	 * Kicked off outside the hash-scroll branches below so a deep link to `#about-me` doesn't wait on
	 * the network, and started as one pair of concurrent requests rather than a serial chain.
	 */
	function loadGithubData() {
		void loadContrib().then((result) => {
			contribYears = result.contribYears;
			contribError = result.contribError;
		});
		void loadRecent().then((result) => {
			recentRepos = result.recentRepos;
			recentReposError = result.recentReposError;
		});
	}

	onMount(async () => {
		await tick();

		// Scheduled before the hash branches so both paths get it. Idle rather than immediate: the
		// two sections it feeds are below the fold, so the network and main thread belong to first
		// paint until that's done. `timeout` guarantees it still runs on a permanently busy page.
		if ('requestIdleCallback' in window) {
			(
				window as Window & {
					requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
				}
			).requestIdleCallback(() => loadGithubData(), { timeout: 900 });
		} else {
			setTimeout(loadGithubData, 180);
		}

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
		/**
		 * No pending instant-jump. This used to force `window.scrollTo({ top: 0 })` unconditionally,
		 * which broke two things:
		 *
		 * - A real deep link (`mario-belmonte.com/#about-me` pasted fresh, with no session flag) was
		 *   scrolled straight back to the top, so the anchor never worked from outside the site.
		 * - Now that internal navigation goes through the router instead of `location.assign`,
		 *   pressing Back from a project page remounts this page — and the forced scroll fought
		 *   SvelteKit's scroll restoration, dumping you at the top instead of at the card you clicked.
		 *
		 * Honour an explicit hash; otherwise leave the scroll position to the browser and the router.
		 */
		if (window.location.hash.length > 1) {
			const prevScrollBehavior = html.style.scrollBehavior;
			html.style.scrollBehavior = 'auto';
			scrollToHashTarget(window.location.hash);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					html.style.scrollBehavior = prevScrollBehavior;
				});
			});
		}
		html.classList.remove('instant-home-jump-pending');
	});

	const firstProject = projects[0];
	// Landing page shows only the projects you consider "top projects".
	// Use an explicit allow-list to make the homepage deterministic.
	const topProjectSlugs = new Set([
		'smart-home-iot-dashboard',
		'spotify-hero',
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
	<!-- Title/description/OG live in `$lib/data/seo.ts`, resolved once in `+layout.svelte`. What stays
	     here is the LCP preload, which is genuinely page-specific. -->
	{#if firstPreloadImageHref}
		<link rel="preload" href={firstPreloadImageHref} as="image" />
	{/if}
</svelte:head>

<div class="page">
	<Hero />
	<section id="top-projects" aria-label="Projects">
		<ProjectList items={topProjects} compactBottom />
	</section>
	<!--
		These used to live behind an `{#if nonCriticalReady}` gate flipped in `requestIdleCallback`,
		with a flat `60vh` spacer standing in for five sections of wildly different heights — so
		hydration snapped the whole page and cascaded scroll shifts. They are now always rendered
		(which also means they exist in the prerendered HTML, for crawlers as much as for users), and
		the expensive one carries `content-visibility: auto` so the browser skips its layout and paint
		until it scrolls close, with `contain-intrinsic-size` holding the space in the meantime.
	-->
	<div class="deferred deferred--chart">
		<GitHubContribChart years={contribYears} error={contribError} />
	</div>
	<CurrentlyBuilding repos={recentRepos} error={recentReposError} />
	<div class="deferred deferred--timeline">
		<Timeline />
	</div>
	<AboutMeTeaser />
	<ReviewCta />
</div>

<style>
	.page {
		position: relative;
		/* No isolation: isolate — it created a stacking/compositing boundary that could leave
		   centered header controls (search/terminal) unclickable on `/` in some Chromium builds. */
	}

	/* Same technique `ProjectList.svelte` already uses. `contain-intrinsic-size` is a per-section
	   estimate rather than one shared number, so the scroll height is roughly right before anything
	   is laid out and the browser can correct it once each section actually renders. */
	.deferred {
		content-visibility: auto;
	}

	/* Measured, not guessed: rendered heights are 236px/294px (chart) and 617px/1101px (timeline) at
	   1440px/390px viewports. The `auto` keyword means the browser substitutes the last-rendered real
	   size once a section has been laid out at least once, so these numbers only govern the very first
	   paint — but that is exactly the paint where a bad estimate drifts the scrollbar under the user. */
	.deferred--chart {
		contain-intrinsic-size: auto 300px;
	}

	.deferred--timeline {
		/* The timeline stacks vertically on phones, so one flat estimate is wrong on one form factor
		   by ~300px either way. Phone first, since that's the narrower default. */
		contain-intrinsic-size: auto 1100px;
	}

	@media (min-width: 901px) {
		.deferred--timeline {
			contain-intrinsic-size: auto 620px;
		}
	}
</style>
