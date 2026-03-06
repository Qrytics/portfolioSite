<script lang="ts">
	import { profile } from '$lib/data/profile';

	let { currentPath = '/' } = $props<{ currentPath?: string }>();

	const navLinks = [
		{ href: '/', label: 'home' },
		{ href: '/#projects', label: 'projects' },
		{ href: '/#about', label: 'about' },
		{ href: '/#contact', label: 'contact' }
	];

	let menuOpen = $state(false);
</script>

<nav class="nav">
	<a href="/" class="nav-brand">
		<span class="prompt">~</span><span class="handle">/{profile.handle}</span>
	</a>

	<button
		class="nav-toggle"
		aria-label="Toggle menu"
		aria-expanded={menuOpen}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>

	<ul class="nav-links" class:open={menuOpen}>
		{#each navLinks as link}
			<li>
				<a href={link.href} onclick={() => (menuOpen = false)}>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
	}

	.nav-brand {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--text);
		text-decoration: none;
		letter-spacing: 0.02em;
	}

	.prompt {
		color: var(--accent);
		margin-right: 0.1em;
	}

	.handle {
		color: var(--text-muted);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-links a {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.15s;
		letter-spacing: 0.05em;
	}

	.nav-links a:hover {
		color: var(--accent);
	}

	.nav-toggle {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}

	.nav-toggle span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text-muted);
		transition: background 0.15s;
	}

	.nav-toggle:hover span {
		background: var(--accent);
	}

	@media (max-width: 640px) {
		.nav-toggle {
			display: flex;
		}

		.nav-links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			gap: 0;
			background: var(--bg);
			border-bottom: 1px solid var(--border);
		}

		.nav-links.open {
			display: flex;
		}

		.nav-links li {
			border-top: 1px solid var(--border);
		}

		.nav-links a {
			display: block;
			padding: 0.875rem 2rem;
		}
	}
</style>
