<script lang="ts">
	import { profile } from '$lib/data/profile';
	import WaveCheckeredBackground from './WaveCheckeredBackground.svelte';
	import { copyEmail } from '$lib/utils/copyEmail';
</script>

<header class="header">
	<div class="hero-background" aria-hidden="true">
		<WaveCheckeredBackground />
	</div>

	<div class="header__content">
		<h1 class="header__tagline">{profile.tagline}</h1>
		<p class="header__description">{profile.description}</p>
		{#if profile.heroCta}
			<p class="header__cta">{profile.heroCta}</p>
		{/if}
		<div class="header__actions">
			<a
				href="/tutoring"
				target="_blank"
				rel="external noopener noreferrer"
				class="hero-action"
			>
				book a tutoring session ↗<span class="sr-only"> (opens in new tab)</span>
			</a>
		</div>
		<div class="header__meta">
			<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link link__mono">
				<span class="link__full">{profile.github.replace('https://', '')}</span><span class="link__short">github ↗</span><span class="sr-only"> (opens in new tab)</span>
			</a>
			<span class="meta-sep">·</span>
			<button
				type="button"
				class="link link__mono email-copy-btn"
				onclick={copyEmail}
				aria-label="Copy email address {profile.email}"
				title="Copy email address"
			>
				<span class="link__full">{profile.email}</span><span class="link__short">copy email</span>
			</button>
			<span class="meta-sep">·</span>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link link__mono">
				<span class="link__full">{profile.linkedin.replace('https://www.', '')}</span><span class="link__short">linkedin ↗</span><span class="sr-only"> (opens in new tab)</span>
			</a>
		</div>
	</div>
</header>

<style>
	.header {
		position: relative;
		z-index: 1;
		margin-top: 0;
		margin-bottom: 0;
		min-height: 280px;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}

	.header__content {
		position: relative;
		z-index: 1;
		padding: clamp(2rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 280px;
	}

	.header__content::before {
		content: '';
		position: absolute;
		inset: 50%;
		transform: translate(-50%, -50%);
		width: min(80ch, 80%);
		height: 70%;
		background: radial-gradient(
			ellipse at center,
			color-mix(in srgb, #000000 80%, transparent) 0%,
			color-mix(in srgb, #000000 70%, transparent) 30%,
			color-mix(in srgb, #000000 50%, transparent) 60%,
			transparent 85%
		);
		filter: blur(16px);
		z-index: -1;
		pointer-events: none;
	}

	.header__tagline {
		position: relative;
		margin: 0;
		color: var(--text);
		font-size: clamp(1.4rem, 3vw, 1.85rem);
		font-weight: 700;
		max-width: 75ch;
		line-height: 1.45;
		padding-bottom: 16px;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
	}

	.header__tagline::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% + 2rem);
		height: calc(100% + 0.75rem);
		background: color-mix(in srgb, #000000 40%, transparent);
		filter: blur(12px);
		z-index: -1;
		pointer-events: none;
	}

	.header__description {
		position: relative;
		margin: 1rem 0 0;
		color: var(--text);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
	}

	.header__cta {
		position: relative;
		margin: 0.65rem 0 0;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
	}

	.header__meta {
		position: relative;
		margin: 1.25rem 0 0;
		font-size: clamp(0.95rem, 1.8vw, 1.1rem);
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.header__actions {
		position: relative;
		margin-top: 1.15rem;
		display: flex;
		justify-content: center;
	}

	.hero-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.9rem;
		border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
		background: color-mix(in srgb, var(--panel) 80%, transparent);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.88rem;
		line-height: 1.2;
		text-decoration: none;
		letter-spacing: 0.01em;
		text-transform: lowercase;
		transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease,
			transform 0.16s ease;
	}

	.hero-action:hover,
	.hero-action:focus-visible {
		border-color: color-mix(in srgb, var(--accent) 60%, transparent);
		color: var(--accent);
		background: color-mix(in srgb, var(--panel) 66%, transparent);
		transform: translateY(-1px);
	}

	.link {
		color: color-mix(in srgb, var(--accent) 94%, transparent);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.link:hover {
		color: var(--accent);
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.meta-sep {
		color: color-mix(in srgb, var(--text) 48%, transparent);
		font-family: var(--font-mono);
	}


	@media (max-width: 700px) {
		.header {
			min-height: 240px;
		}

		.header__content {
			padding: clamp(1.25rem, 6vw, 2rem) clamp(1rem, 4.5vw, 1.5rem);
			min-height: 240px;
		}

		.header__tagline {
			font-size: clamp(1.2rem, 6vw, 1.55rem);
			line-height: 1.34;
			max-width: 33ch;
			padding-bottom: 0.7rem;
		}

		.header__description,
		.header__cta {
			font-size: 0.9rem;
			line-height: 1.5;
		}

		.header__meta {
			margin-top: 1rem;
			font-size: 0.9rem;
			gap: 0.5rem 0.65rem;
		}
	}

	@media (max-width: 420px) {
		.header__tagline {
			font-size: clamp(1.05rem, 7vw, 1.3rem);
			max-width: 29ch;
		}
	}

	.link__mono {
		color: var(--text);
	}

	.email-copy-btn {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
	}

	.email-copy-btn:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
		outline-offset: 4px;
	}

	/* Short chip labels only exist for phones; the full handles are what desktop shows. */
	.link__short {
		display: none;
	}

	/*
	 * Phones: the three full URLs stacked as one centred, underlined column per link — a wall of
	 * text that pushed the first project below the fold. They become one row of equal chips with
	 * short labels, and the tutoring button spans the same width above them. Must stay after the
	 * `.link` / `.email-copy-btn` base rules above, which it overrides.
	 */
	@media (max-width: 520px) {
		.meta-sep,
		.link__full {
			display: none;
		}

		.link__short {
			display: inline;
		}

		.header__actions,
		.header__meta {
			width: 100%;
			max-width: 22rem;
		}

		.hero-action {
			width: 100%;
			min-height: 2.75rem;
			font-size: 0.9rem;
		}

		.header__meta {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 0.45rem;
			margin-top: 0.55rem;
			font-size: 0.8rem;
		}

		.header__meta .link {
			display: grid;
			place-items: center;
			min-height: 2.75rem;
			padding: 0 0.3rem;
			border: 1px solid var(--border);
			background: color-mix(in srgb, var(--panel) 80%, transparent);
			color: var(--text);
			text-shadow: none;
			white-space: nowrap;
			text-decoration: none;
		}
	}

	/*
	 * Light mode, designed rather than patched. Everything that made the dark hero legible — black
	 * text-shadows, a blurred black blob behind the copy, the canvas's black fade — is switched off
	 * here instead of being painted over with white glows (which is what used to be stacked up in
	 * `app.css` and here). The canvas now clears the tiles from behind the text itself and fades into
	 * the page, so the copy sits on plain paper and needs no help being read.
	 */
	:global([data-theme='light']) .header {
		background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 7%, var(--bg)) 0%, var(--bg) 100%);
	}

	:global([data-theme='light']) .header__content::before,
	:global([data-theme='light']) .header__tagline::before {
		display: none;
	}

	:global([data-theme='light']) .header__tagline,
	:global([data-theme='light']) .header__description,
	:global([data-theme='light']) .header__cta,
	:global([data-theme='light']) .header__meta {
		text-shadow: none;
	}

	:global([data-theme='light']) .header__tagline {
		color: var(--text);
		letter-spacing: -0.01em;
	}

	:global([data-theme='light']) .header__description {
		color: var(--muted);
	}

	:global([data-theme='light']) .header__cta {
		color: var(--text);
	}

	/* The one primary action gets the one solid fill on the page. */
	:global([data-theme='light']) .hero-action {
		border-color: var(--accent-text);
		background: var(--accent-text);
		color: #ffffff;
		box-shadow: 0 1px 2px color-mix(in srgb, var(--accent-text) 30%, transparent),
			0 6px 18px -6px color-mix(in srgb, var(--accent-text) 55%, transparent);
	}

	:global([data-theme='light']) .hero-action:hover,
	:global([data-theme='light']) .hero-action:focus-visible {
		border-color: var(--clr-primary-a30);
		background: var(--clr-primary-a30);
		color: #ffffff;
	}

	:global([data-theme='light']) .link {
		color: var(--accent-text);
		border-bottom-color: color-mix(in srgb, var(--accent-text) 35%, transparent);
	}

	:global([data-theme='light']) .link:hover {
		border-bottom-color: var(--accent-text);
	}

	:global([data-theme='light']) .meta-sep {
		color: var(--muter);
	}

	@media (max-width: 520px) {
		:global([data-theme='light']) .header__meta .link {
			background: var(--panel);
			border-color: var(--border);
			color: var(--text);
			box-shadow: var(--shadow-sm);
		}
	}

	/* The toast panel moved to `$lib/components/Toast.svelte`, rendered once by the layout. */
</style>
