<script lang="ts">
	import '../app.css';
	import { profile } from '$lib/data/profile';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="{profile.title} — {profile.bio.slice(0, 120)}..." />
	<meta property="og:title" content="{profile.name} — Portfolio" />
	<meta property="og:description" content="{profile.title} — {profile.bio.slice(0, 120)}..." />
	<meta name="theme-color" content="#0a0a0a" />
	<title>{profile.name} — Portfolio</title>
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<Footer />
