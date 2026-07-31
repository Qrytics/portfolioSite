<script lang="ts">
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import MatrixOverlay from '$lib/components/MatrixOverlay.svelte';
	import { resetScrollLock } from '$lib/utils/scrollLock';
	import { playSound } from '$lib/utils/sound';
	import { setLocalItem, getLocalItem } from '$lib/utils/safeStorage';

	let { children } = $props();
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
	<meta name="description" content="{profile.tagline} — {profile.description}" />
	<meta property="og:title" content="{profile.name} — Portfolio" />
	<meta property="og:description" content="{profile.tagline} — {profile.description}" />
	<meta property="og:url" content="https://mario-belmonte.com/" />
	<meta property="og:image" content="https://mario-belmonte.com/link_photo.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://mario-belmonte.com/link_photo.png" />
	<meta name="theme-color" content="#0b0e12" />
	<title>Mario Belmonte (Portfolio)</title>
</svelte:head>

<ScrollProgress />
<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />

{#if showMatrix}
	<MatrixOverlay onclose={() => (showMatrix = false)} />
{/if}
