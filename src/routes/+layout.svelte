<script lang="ts">
	import '../app.css';
	import { profile } from '$lib/data/profile';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="{profile.tagline} — {profile.description}" />
	<meta property="og:title" content="{profile.name} — Portfolio" />
	<meta property="og:description" content="{profile.tagline} — {profile.description}" />
	<meta name="theme-color" content="#0b0e12" />
	<title>{profile.name} — Portfolio</title>
</svelte:head>

<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />
