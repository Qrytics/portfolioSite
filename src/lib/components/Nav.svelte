<script lang="ts">
	import { profile } from '$lib/data/profile';

	let scrolled = $state(false);
	let navOpen = $state(false);
	let compact = $state(false);

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

	const navLinks = [
		{ href: '/#projects', label: 'projects' },
		{ href: '/#about', label: 'about' },
		{ href: '/#contact', label: 'contact' }
	];
</script>

<a href="#main" class="skip">Skip to content</a>

<header
	class="site-header"
	class:site-header--scrolled={scrolled}
	class:site-header--compact={compact}
>
	<div class="site-header__inner" class:site-header__inner--with-title={true}>
		<a href="/" class="site-header__title">{profile.handle}</a>

		<button
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
						<a href={link.href} onclick={() => (navOpen = false)}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.skip {
		position: absolute;
		left: -9999px;
		top: 0.75rem;
		padding: 0.6rem 0.85rem;
		border: 1px solid var(--border);
		background: rgba(15, 20, 27, 0.9);
		color: var(--text);
		font-family: var(--font-mono);
		z-index: 200;
		text-decoration: none;
	}
	.skip:focus {
		left: 1rem;
	}

	.site-header {
		z-index: 100;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition: background-color 0.18s, backdrop-filter 0.18s, border-color 0.18s;
		position: sticky;
		top: 0;
	}

	.site-header--scrolled {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: rgba(11, 14, 18, 0.56);
		border-bottom-color: rgba(222, 232, 255, 0.12);
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
	}

	.site-header__inner--with-title {
		justify-content: space-between;
	}

	.site-header__title {
		color: rgba(54, 242, 194, 0.8);
		font-family: var(--font-mono);
		font-size: clamp(1rem, 1.5vw, 1.15rem);
		font-weight: 600;
		line-height: 1.2;
		text-decoration: none;
		transition: color 0.18s;
	}

	.site-header__title:hover,
	.site-header__title:focus-visible {
		color: rgba(243, 246, 255, 0.98);
	}

	.site-header__menu {
		font: inherit;
		color: rgba(243, 246, 255, 0.88);
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
		color: rgba(243, 246, 255, 0.88);
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
		color: rgba(243, 246, 255, 0.98);
	}

	.site-nav a:hover::after,
	.site-nav a:focus-visible::after {
		opacity: 0.85;
		transform: translateY(0);
	}

	/* Compact / mobile */
	.site-header--compact .site-header__menu {
		display: inline-block;
	}

	.site-header--compact .site-nav {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: rgba(11, 14, 18, 0.88);
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

