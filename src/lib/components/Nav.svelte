<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Search from '$lib/components/Search.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import { assignAppLocation } from '$lib/utils/internalNav';
	import { lockScroll, unlockScroll } from '$lib/utils/scrollLock';

	let scrolled = $state(false);
	let navOpen = $state(false);
	let compact = $state(false);
	let searchOpen = $state(false);
	let terminalOpen = $state(false);
	let theme = $state<'dark' | 'light'>('dark');
	let themeReady = $state(false);
	const isOverlayOpen = $derived(searchOpen || terminalOpen);
	const isDarkTheme = $derived(theme === 'dark');

	function applyTheme(nextTheme: 'dark' | 'light') {
		document.documentElement.dataset.theme = nextTheme;
		document.documentElement.style.colorScheme = nextTheme;
		const themeColor = document.querySelector('meta[name="theme-color"]');
		themeColor?.setAttribute('content', nextTheme === 'dark' ? '#0b0e12' : '#FFFFFF');
	}

	function toggleTheme() {
		theme = isDarkTheme ? 'light' : 'dark';
		applyTheme(theme);
		window.localStorage.setItem('theme', theme);
	}

	$effect(() => {
		const savedTheme = window.localStorage.getItem('theme');
		if (savedTheme === 'dark' || savedTheme === 'light') {
			theme = savedTheme;
		} else {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		applyTheme(theme);
		themeReady = true;

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onPrefChange = (e: MediaQueryListEvent) => {
			if (window.localStorage.getItem('theme')) return;
			theme = e.matches ? 'dark' : 'light';
			applyTheme(theme);
		};
		media.addEventListener('change', onPrefChange);
		return () => media.removeEventListener('change', onPrefChange);
	});

	$effect(() => {
		function onScroll() {
			scrolled = window.scrollY > 8;
		}
		function onResize() {
			compact = window.innerWidth < 640;
			if (!compact) navOpen = false;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		onResize();
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});

	/** Only one overlay at a time so scroll-lock stays balanced and the header stays usable. */
	$effect(() => {
		if (searchOpen) terminalOpen = false;
	});
	$effect(() => {
		if (terminalOpen) searchOpen = false;
	});

	$effect(() => {
		if (!isOverlayOpen) return;
		lockScroll();
		return () => unlockScroll();
	});

	// function toggleTheme() { ... }

	/** Plain routes use SvelteKit client nav; hash links use native scroll-to-id on `/`. */
	const navLinks: Array<{ href: string; label: string; external?: boolean }> = [
		{ href: '/games', label: 'games' },
		{ href: '/projects', label: 'projects' },
		{ href: '/#about-me', label: 'about me' },
		{ href: '/resume', label: 'resume' }
	];

	function handleNavClick(e: MouseEvent, href: string) {
		navOpen = false;

		if (href !== '/#about-me') return;
		if (typeof window === 'undefined') return;

		// Same-page click should keep native smooth hash scrolling.
		const onHome = window.location.pathname === '/';
		if (onHome) return;

		// Cross-page click should "teleport" after navigation/hydration.
		e.preventDefault();
		window.sessionStorage.setItem('instant-home-hash-scroll', href.replace('/#', '#'));
		document.documentElement.classList.add('instant-home-jump-pending');
		assignAppLocation('/');
	}
</script>

<a href="#main" class="skip">Skip to content</a>

{#if navOpen && compact}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="nav-backdrop" onclick={() => (navOpen = false)}></div>
{/if}

<header
	class="site-header"
	class:site-header--scrolled={scrolled}
	class:site-header--compact={compact}
>
	<div class="site-header__inner" class:site-header__inner--with-title={true}>
		<a href="/" class="site-header__title" data-sveltekit-reload>{profile.handle}</a>

		<div class="site-header__tools">
			<Search bind:open={searchOpen} />
			<div class="terminal-tool">
				<Terminal bind:open={terminalOpen} />
			</div>
			{#if themeReady}
				<button
					type="button"
					class="theme-toggle"
					onclick={toggleTheme}
					aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
					aria-pressed={!isDarkTheme}
				>
					<span class="theme-toggle__icon" aria-hidden="true">{isDarkTheme ? '☀' : '☾'}</span>
				</button>
			{/if}
		</div>

		<button
			type="button"
			class="site-header__menu"
			aria-label="Toggle navigation"
			aria-expanded={navOpen}
			onclick={() => (navOpen = !navOpen)}
		>
			menu
		</button>

		<nav class="site-nav" class:site-nav--open={navOpen} aria-label="Main navigation">
			<ul>
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							data-sveltekit-reload={!link.href.includes('#') ? true : undefined}
							onclick={(e) => handleNavClick(e, link.href)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.nav-backdrop {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
	}

	.skip {
		position: absolute;
		left: -9999px;
		top: 0.75rem;
		padding: 0.6rem 0.85rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--text);
		font-family: var(--font-mono);
		z-index: 300;
		text-decoration: none;
	}
	.skip:focus {
		left: 1rem;
	}

	.site-header {
		/* Above in-page cards (~2); keep moderate — extreme z-index + isolation caused main content to disappear in some browsers. */
		z-index: 200;
		/* Always show the subtle frosted bar (not only after scroll). */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: color-mix(in srgb, var(--panel) 84%, transparent);
		border-bottom: 1px solid var(--border);
		transition: background-color 0.18s, backdrop-filter 0.18s, border-color 0.18s;
		position: sticky;
		top: 0;
		/* Restrict hit-testing to actual controls; prevents sticky backdrop area from stealing clicks. */
		pointer-events: none;
	}

	.site-header--scrolled {
		background: color-mix(in srgb, var(--panel) 92%, transparent);
		border-bottom-color: var(--border);
	}

	.site-header__inner {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		max-width: 86rem;
		min-height: 2rem;
		margin: 0 auto;
		padding: 0.9rem clamp(1.25rem, 4vw, 3rem);
		position: relative;
		pointer-events: auto;
	}

	.site-header__tools {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-right: 0;
		/* Keep header tools directly interactive. */
		pointer-events: auto;
		position: relative;
		z-index: 4;
	}

	.terminal-tool {
		display: inline-flex;
	}

	/* Hide terminal trigger on mobile to keep the header uncluttered. */
	@media (max-width: 639px) {
		.terminal-tool {
			display: none;
		}
	}

	/* Center tools relative to full header width (desktop). */
	@media (min-width: 720px) {
		.site-header__inner--with-title .site-header__tools {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.theme-toggle {
		display: inline-grid;
		place-items: center;
		padding: 0.25rem 0.55rem;
		min-width: 2.05rem;
		border: 1px solid var(--border-2);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.01)), var(--panel-2);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		line-height: 1.2;
		cursor: pointer;
		transition: border-color 0.14s, color 0.14s, transform 0.14s, background-color 0.14s;
	}

	.theme-toggle:hover {
		border-color: rgba(54, 242, 194, 0.5);
		color: var(--accent);
	}

	.theme-toggle:active {
		transform: translateY(1px);
	}

	.theme-toggle__icon {
		display: block;
		line-height: 1;
		font-size: 0.9rem;
		opacity: 0.9;
		transform: translateY(0);
	}

	@media (max-width: 639px) {
		.theme-toggle {
			padding: 0.25rem 0.5rem;
			min-width: 1.95rem;
		}
	}

	.site-header__inner--with-title {
		justify-content: space-between;
	}

	.site-header__title {
		position: relative;
		z-index: 2;
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		font-weight: 600;
		line-height: 1.2;
		text-decoration: none;
		transition: color 0.18s;
	}

	.site-header__title:hover,
	.site-header__title:focus-visible {
		color: var(--text);
	}

	.site-header__menu {
		font: inherit;
		color: var(--text);
		cursor: pointer;
		background: none;
		border: none;
		padding: 0.25rem 0;
		font-family: var(--font-mono);
		line-height: 1.2;
		text-decoration: none;
		display: none;
		border-radius: 0;
	}

	.site-nav {
		display: block;
		position: relative;
		z-index: 2;
	}

	.site-nav ul {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.site-nav a {
		color: var(--text);
		padding: 0.2rem 0;
		font-family: var(--font-mono);
		font-size: 0.95rem;
		line-height: 1.4;
		text-decoration: none;
		transition: color 0.18s;
		display: inline-block;
		position: relative;
	}

	.site-nav a::after {
		content: '';
		opacity: 0;
		pointer-events: none;
		background: currentColor;
		height: 1px;
		transition: opacity 0.18s, transform 0.18s;
		position: absolute;
		bottom: -0.1rem;
		left: 0;
		right: 0;
		transform: translateY(3px);
	}

	.site-nav a:hover,
	.site-nav a:focus-visible {
		color: var(--accent);
	}

	.site-nav a:hover::after,
	.site-nav a:focus-visible::after {
		opacity: 0.85;
		transform: translateY(0);
	}

	/* Compact / mobile */
	.site-header--compact .site-header__menu {
		display: inline-block;
		position: relative;
		z-index: 3;
	}

	.site-header--compact .site-nav {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: color-mix(in srgb, var(--panel) 92%, transparent);
		border: 1px solid var(--border);
		min-width: 10rem;
		display: none;
		position: absolute;
		top: calc(100% + 0.25rem);
		right: clamp(1.25rem, 4vw, 3rem);
		z-index: 10;
	}

	.site-header--compact .site-nav--open {
		display: block;
	}

	.site-header--compact .site-nav ul {
		flex-direction: column;
		align-items: flex-start;
		gap: 0;
		padding: 0.5rem 0.9rem;
	}

	.site-header--compact .site-nav li {
		width: 100%;
	}

	.site-header--compact .site-nav a {
		width: 100%;
		padding: 0.45rem 0;
		display: block;
	}

</style>

