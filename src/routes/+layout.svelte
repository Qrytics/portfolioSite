<script lang="ts">
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolveSeo } from '$lib/data/seo';
	import type { Project } from '$lib/data/projects';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import MatrixOverlay from '$lib/components/MatrixOverlay.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { resetScrollLock } from '$lib/utils/scrollLock';
	import { playSound } from '$lib/utils/sound';
	import { setLocalItem, getLocalItem } from '$lib/utils/safeStorage';

	let { children } = $props();

	/**
	 * All page metadata resolves here rather than in each route's own `<svelte:head>`. `$lib/data/seo.ts`
	 * explains why; the short version is that per-page head blocks shipped duplicate `<meta
	 * name="description">` tags and left `og:url` pointing at the homepage from all 35 project pages.
	 *
	 * `page.data.project` is set only by `projects/[slug]/+page.ts`, so the cast is a lookup for "is this
	 * a project page", not an assumption that it always is.
	 */
	const seo = $derived(resolveSeo(page.url.pathname, (page.data as { project?: Project }).project));

	let showMatrix = $state(false);
	let konamiSequence = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];
	let konamiIndex = $state(0);

	beforeNavigate(() => {
		resetScrollLock();
	});

	afterNavigate(() => {
		// Defensive cleanup: never keep instant-jump or body scroll lock after route resolution.
		resetScrollLock();
		document.documentElement.classList.remove('instant-home-jump-pending');
	});

	onMount(() => {
		// Safety: never leave the app hidden if a previous instant-jump state got stuck.
		resetScrollLock();
		document.documentElement.classList.remove('instant-home-jump-pending');
	});

	$effect(() => {
		function handleKonami(e: KeyboardEvent) {
			const key = e.key.toLowerCase();

			if (
				key === konamiSequence[konamiIndex] ||
				(konamiSequence[konamiIndex].startsWith('Arrow') && e.key === konamiSequence[konamiIndex])
			) {
				konamiIndex++;

				if (konamiIndex === konamiSequence.length) {
					showMatrix = true;
					playSound('game-start');
					konamiIndex = 0;
					setLocalItem('konami-discovered', 'true');
				}
			} else {
				konamiIndex = 0;
			}

			if (e.key === 'Escape' && showMatrix) {
				showMatrix = false;
			}
		}

		window.addEventListener('keydown', handleKonami);
		return () => window.removeEventListener('keydown', handleKonami);
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<!-- Both spellings of every path are served, so say which one is the real page. -->
	<link rel="canonical" href={seo.canonical} />

	<meta property="og:type" content={seo.ogType} />
	<meta property="og:site_name" content="Mario Belmonte" />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<!-- Per-page, not the hardcoded homepage URL every route used to claim. -->
	<meta property="og:url" content={seo.canonical} />
	<!--
		The default image was `link_photo.png`: a 1,363,364 B PNG at 2880x1800, declared as 1200x630.
		Both numbers were wrong, and the size was the expensive kind of wrong — WhatsApp and several
		other scrapers refuse to fetch a preview image over ~1 MB, so link previews silently failed
		rather than showing a wrong-sized image. `og.jpg` is the same artwork at 1200x600 and 82,866 B,
		a 94% reduction, and the declared height is now the height the file actually measures.
	-->
	<meta property="og:image" content={seo.image} />
	<meta property="og:image:type" content={seo.imageType} />
	{#if seo.imageWidth && seo.imageHeight}
		<meta property="og:image:width" content={String(seo.imageWidth)} />
		<meta property="og:image:height" content={String(seo.imageHeight)} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<!-- Twitter falls back to `og:*`, but only for tags it finds; title and description were missing. -->
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.image} />

	<meta name="theme-color" content="#0b0e12" />

	{#if seo.jsonLd}
		<!-- eslint-disable-next-line svelte/no-at-html-tags — serialised in seo.ts with `<` escaped -->
		{@html `<script type="application/ld+json">${seo.jsonLd}</script>`}
	{/if}
</svelte:head>

<ScrollProgress />
<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />

<!--
	One toast for the whole app, mounted from first paint so its `aria-live` region has something to
	diff against when a message appears. Replaces the three separate `position: fixed` copies that
	`Hero`, `Footer` and `Contact` each carried — two of which are on the home page simultaneously and
	rendered in the identical pixel position.
-->
<Toast />

{#if showMatrix}
	<MatrixOverlay onclose={() => (showMatrix = false)} />
{/if}
