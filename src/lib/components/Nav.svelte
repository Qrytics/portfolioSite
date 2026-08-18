<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Search from '$lib/components/Search.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import { assignAppLocation } from '$lib/utils/internalNav';
	import { lockScroll, unlockScroll } from '$lib/utils/scrollLock';
	import { getLocalItem, setLocalItem, getSessionItem, setSessionItem } from '$lib/utils/safeStorage';

	const COMPACT_QUERY = '(max-width: 979px)';

	let scrolled = $state(false);
	let navOpen = $state(false);
	let searchOpen = $state(false);
	let terminalOpen = $state(false);

	/**
	 * The blocking script in `app.html` writes `data-theme` on `<html>` before first paint, so the
	 * real theme is readable synchronously here — no need for the `themeReady` gate that used to keep
	 * the toggle out of the server output and then reflow the whole header in when it appeared.
	 * SSR has no `document`, so the server renders the dark label; the glyph itself is CSS-driven off
	 * `[data-theme]` and is therefore correct in the very first paint either way.
	 */
	function initialTheme(): 'dark' | 'light' {
		if (typeof document === 'undefined') return 'dark';
		return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
	}

	let theme = $state<'dark' | 'light'>(initialTheme());
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
		setLocalItem('theme', theme);
	}

	$effect(() => {
		const savedTheme = getLocalItem('theme');
		if (savedTheme === 'dark' || savedTheme === 'light') {
			theme = savedTheme;
		} else {
			theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		applyTheme(theme);

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onPrefChange = (e: MediaQueryListEvent) => {
			if (getLocalItem('theme')) return;
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
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	/**
	 * Compact layout is now decided entirely in CSS (`@media (max-width: 979px)` below). This used to
	 * be `compact = $state(false)` set from a `resize` listener, so every phone visitor got a full
	 * paint of the *desktop* nav — all five links laid out horizontally — before hydration collapsed
	 * it to the menu button.
	 *
	 * The one thing still needing JS is closing an open menu when the viewport crosses back to
	 * desktop, where the menu button is `display: none` and would otherwise leave the dropdown
	 * stranded open with no way to dismiss it. `matchMedia` fires only at the boundary, unlike the
	 * `resize` handler that ran on every pixel of a drag.
	 */
	$effect(() => {
		const media = window.matchMedia(COMPACT_QUERY);
		const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
			if (!e.matches) navOpen = false;
		};
		onChange(media);
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
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
		{ href: '/resume', label: 'resume' },
		{ href: 'https://mario-belmonte.com/tutoring', label: 'tutoring', external: true }
	];

	function openTerminalFromMenu() {
		navOpen = false;
		terminalOpen = true;
	}

	function handleNavClick(e: MouseEvent, href: string) {
		navOpen = false;

		if (href !== '/#about-me') return;
		if (typeof window === 'undefined') return;

		// Same-page click should keep native smooth hash scrolling.
		const onHome = window.location.pathname === '/';
		if (onHome) return;

		// Cross-page click should "teleport" after navigation/hydration.
		e.preventDefault();
		setSessionItem('instant-home-hash-scroll', href.replace('/#', '#'));
		document.documentElement.classList.add('instant-home-jump-pending');
		assignAppLocation('/');
	}
</script>

<a href="#main" class="skip">Skip to content</a>

<!-- A real `<button>`, not a `<div role="button" tabindex="0">` with a hand-rolled keydown handler.
     The div gave it none of Enter/Space/form semantics for free and needed the handler to fake them. -->
{#if navOpen}
	<button
		type="button"
		class="nav-backdrop"
		aria-label="Close navigation menu"
		onclick={() => (navOpen = false)}
	></button>
{/if}

<header
	class="site-header"
	class:site-header--scrolled={scrolled}
>
	<div class="site-header__inner" class:site-header__inner--with-title={true}>
		<a href="/" class="site-header__title">{profile.handle}</a>

		<div class="site-header__tools">
			<Search bind:open={searchOpen} />
			<div class="terminal-tool">
				<Terminal bind:open={terminalOpen} />
			</div>
			<button
				type="button"
				class="theme-toggle"
				onclick={toggleTheme}
				aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
				aria-pressed={!isDarkTheme}
			>
				<!-- Glyph comes from CSS keyed on `[data-theme]`, which the blocking `app.html` script
				     has already set. Rendering it from the `theme` rune would show the dark-mode sun for
				     one paint to every light-mode visitor. -->
				<span class="theme-toggle__icon" aria-hidden="true"></span>
			</button>
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
							onclick={(e) => handleNavClick(e, link.href)}
						>
							{link.label}
						</a>
					</li>
				{/each}
				<!--
					The terminal's own trigger lives in `.site-header__tools`, which is hidden below 900px
					so the header bar doesn't wrap — so the easter egg was unreachable on every phone,
					with no fallback and no `Ctrl+\`` available either (a touch keyboard has no Ctrl).
					The dropdown is where the compact layout already puts navigation, so it goes here
					rather than back into a header that has no room for it. Shown at exactly the width
					where `.terminal-tool` disappears, so the two never both appear.
				-->
				<li class="site-nav__compact-only">
					<button type="button" class="site-nav__action" onclick={openTerminalFromMenu}>
						terminal
					</button>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.nav-backdrop {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: color-mix(in srgb, #000 55%, transparent);
		backdrop-filter: blur(4px);
		/* Button reset: this is a real <button> now, so the UA border/padding/appearance go. */
		appearance: none;
		border: 0;
		padding: 0;
		cursor: default;
	}

	/*
	 * Phones pay the full cost of `backdrop-filter` and get the least from it. The sticky header
	 * blur re-composites the entire scrolling page behind it on every frame; the menu backdrop is a
	 * second full-viewport blur layered on top of that. Both are replaced with a slightly more
	 * opaque flat fill, which reads the same at this size for none of the per-frame GPU work.
	 * Mirrors what `app.css` already does with the full-page grid overlay at the same breakpoint.
	 */
	@media (max-width: 900px) {
		.nav-backdrop {
			backdrop-filter: none;
			background: color-mix(in srgb, #000 68%, transparent);
		}
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
		/* The frosted bar is opted *into* at desktop widths below rather than opted out of on phones:
		   an override in a `max-width` query would have to come after this rule to win, and this rule
		   is early in the file. See the `min-width: 901px` block just after. */
		background: color-mix(in srgb, var(--panel) 94%, transparent);
		border-bottom: 1px solid var(--border);
		/* `backdrop-filter` is deliberately *not* transitioned. Animating a blur radius re-blurs the
		   entire scrolling page behind the header on every frame of the transition. */
		transition: background-color 0.18s, border-color 0.18s;
		position: sticky;
		top: 0;
		/* Restrict hit-testing to actual controls; prevents sticky backdrop area from stealing clicks. */
		pointer-events: none;
	}

	.site-header--scrolled {
		background: var(--panel);
		border-bottom-color: var(--border);
	}

	/*
	 * Phones pay the full cost of `backdrop-filter` and get the least from it: the sticky header
	 * spans a page that is always scrolling, so the compositor re-blurs everything behind it every
	 * single frame. The flat fill above reads the same at this size for none of that work. Mirrors
	 * what `app.css` already does with the full-page grid overlay at the same breakpoint. This block
	 * must stay after both base rules — a media query adds no specificity, so source order decides.
	 */
	@media (min-width: 901px) {
		.site-header {
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			background: color-mix(in srgb, var(--panel) 84%, transparent);
		}

		.site-header--scrolled {
			background: color-mix(in srgb, var(--panel) 92%, transparent);
		}
	}

	.site-header__inner {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
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

	/* Hide terminal trigger earlier to avoid header crowding on medium widths. The `.site-nav__action`
	   dropdown entry takes over at exactly this breakpoint so the terminal is never unreachable; its
	   own media query has to live *after* the base rules, further down. */
	@media (max-width: 900px) {
		.terminal-tool {
			display: none;
		}
	}

	/* Center tools only on wide desktop where there is guaranteed room. */
	@media (min-width: 1200px) {
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
		border-color: color-mix(in srgb, var(--accent) 50%, transparent);
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

	/* Sun in dark mode ("switch to light"), moon in light mode. Driven by the attribute the blocking
	   theme script sets, so it is correct in the first paint rather than after hydration. */
	.theme-toggle__icon::before {
		content: '☀';
	}

	:global([data-theme='light']) .theme-toggle__icon::before {
		content: '☾';
	}

	@media (max-width: 979px) {
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
		min-width: 0;
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

	/* Menu-only terminal entry: hidden until the header trigger goes away (see the `max-width: 900px`
	   block further down), and styled to sit in the same rhythm as the links above it. */
	.site-nav__compact-only {
		display: none;
	}

	.site-nav__action {
		appearance: none;
		border: 0;
		background: none;
		padding: 0.2rem 0;
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 0.95rem;
		line-height: 1.4;
		cursor: pointer;
		text-align: left;
	}

	.site-nav__action:hover,
	.site-nav__action:focus-visible {
		color: var(--text);
	}

	/* Must come after the `display: none` above — a media query adds no specificity, so source order
	   is what decides. Same breakpoint as the `.terminal-tool { display: none }` block earlier, so
	   exactly one of the two controls exists at any width. */
	@media (max-width: 900px) {
		.site-nav__compact-only {
			display: block;
		}

		.site-nav__action {
			width: 100%;
			padding: 0.45rem 0;
			display: block;
		}
	}

	/*
	 * Compact / mobile. Was `.site-header--compact <descendant>`, with the class toggled from a
	 * `resize` listener — so the desktop nav painted first on every phone load and collapsed on
	 * hydration. The breakpoint (979px) is the same number the old `window.innerWidth < 980` check
	 * used, so the layout is unchanged; it just no longer waits for JavaScript to be right.
	 */
	@media (max-width: 979px) {
		.site-header__menu {
			display: inline-block;
			position: relative;
			z-index: 3;
			flex-shrink: 0;
		}

		.site-header__title {
			max-width: clamp(8.5rem, 42vw, 13rem);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.site-header__tools {
			margin-left: auto;
			gap: 0.35rem;
		}

		.site-nav {
			/* Compact mode is phones, where the backdrop behind this panel is no longer blurred either —
			   a frosted dropdown over a flat scrim looked like two different design languages. Solid
			   `--panel` also means the links behind it can't bleed through and hurt legibility. */
			background: var(--panel);
			border: 1px solid var(--border);
			min-width: 10rem;
			display: none;
			position: absolute;
			top: calc(100% + 0.25rem);
			right: clamp(1.25rem, 4vw, 3rem);
			z-index: 10;
		}

		.site-nav--open {
			display: block;
		}

		.site-nav ul {
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
			padding: 0.5rem 0.9rem;
		}

		.site-nav li {
			width: 100%;
		}

		.site-nav a {
			width: 100%;
			padding: 0.45rem 0;
			display: block;
		}
	}

	/* Belt and braces: above the compact breakpoint the menu button is hidden, so an open dropdown
	   could otherwise be stranded with no dismiss control if JS hasn't run yet. */
	@media (min-width: 980px) {
		.nav-backdrop {
			display: none;
		}
	}

	@media (max-width: 1199px) and (min-width: 980px) {
		.site-header__inner {
			flex-wrap: wrap;
			row-gap: 0.45rem;
		}

		.site-header__tools {
			order: 2;
			margin-left: auto;
		}

		.site-nav {
			order: 3;
			width: 100%;
		}

		.site-nav ul {
			justify-content: flex-end;
			flex-wrap: wrap;
			gap: 0.8rem 1rem;
		}
	}

	@media (max-width: 640px) {
		.site-header__inner {
			padding: 0.75rem 0.9rem;
		}

		.site-header__title {
			font-size: 0.95rem;
		}

		.site-header__menu {
			font-size: 0.95rem;
		}
	}

</style>
