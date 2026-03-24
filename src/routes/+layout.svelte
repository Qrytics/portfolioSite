<script lang="ts">
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resetScrollLock } from '$lib/utils/scrollLock';

	let { children } = $props();

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
</script>

<svelte:head>
	<meta name="description" content="{profile.tagline} — {profile.description}" />
	<meta property="og:title" content="{profile.name} — Portfolio" />
	<meta property="og:description" content="{profile.tagline} — {profile.description}" />
	<meta property="og:url" content="https://mario-belmonte.com/" />
	<meta property="og:image" content="https://mario-belmonte.com/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://mario-belmonte.com/og.png" />
	<meta name="theme-color" content="#0b0e12" />
	<title>{profile.name} — Portfolio</title>
</svelte:head>

<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />
