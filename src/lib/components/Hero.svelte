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
				href="https://mario-belmonte.com/tutoring"
				target="_blank"
				rel="noopener noreferrer"
				class="hero-action"
			>
				book a tutoring session ↗
			</a>
		</div>
		<div class="header__meta">
			<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.github.replace('https://', '')}
			</a>
			<span class="meta-sep">·</span>
			<button type="button" class="link link__mono email-copy-btn" onclick={copyEmail}>{profile.email}</button>
			<span class="meta-sep">·</span>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.linkedin.replace('https://www.', '')}
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
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.7) 30%,
			rgba(0, 0, 0, 0.5) 60%,
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
		background: rgba(0, 0, 0, 0.4);
		filter: blur(12px);
		z-index: -1;
		pointer-events: none;
	}

	/*
	 * The two light-mode glows behind the hero text. Both were doing the right thing by accident and
	 * paying a lot for it.
	 *
	 * Their stop lists used to start at `100%` and then step *backwards* (`100%, 90%, 8%, 9%, 10%`). A
	 * gradient stop smaller than the one before it is clamped up to it, so every stop collapsed to 100%
	 * and the "radial glow" rendered as a **solid white box**. What actually produced the soft halo was
	 * the `filter: blur(100px)` feathering that box's edges — which is the most expensive possible way to
	 * draw a gradient, on the largest element on the page, sitting behind the LCP text, on phones.
	 *
	 * Stops are now in ascending order, so the falloff comes from the gradient itself. That leaves the
	 * blur with nothing to do but soften banding, which needs a fraction of the radius — these are the
	 * values `app.css` already uses for the same two elements, and these rules only exist to override it.
	 */
	:global([data-theme='light']) .header__content::before {
		width: min(96ch, 94%);
		height: 82%;
		background: radial-gradient(
			ellipse at center,
			rgb(255, 255, 255) 0%,
			rgba(247, 253, 251, 0.92) 34%,
			rgba(228, 247, 243, 0.58) 58%,
			rgba(210, 240, 234, 0.22) 78%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(34px);
	}

	:global([data-theme='light']) .header__tagline::before {
		width: calc(100% + 4.25rem);
		height: calc(100% + 1.5rem);
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.98) 0%,
			rgba(240, 252, 248, 0.78) 38%,
			rgba(223, 247, 241, 0.32) 68%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(20px);
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

	:global([data-theme='light']) .hero-action {
		border-color: color-mix(in srgb, var(--accent) 38%, var(--border));
		background: color-mix(in srgb, var(--panel) 94%, white 6%);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.7) inset;
	}

	:global([data-theme='light']) .hero-action:hover,
	:global([data-theme='light']) .hero-action:focus-visible {
		border-color: color-mix(in srgb, var(--accent) 58%, var(--border));
		background: color-mix(in srgb, var(--panel) 88%, white 12%);
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

	@media (max-width: 520px) {
		.meta-sep {
			display: none;
		}

		.hero-action {
			width: min(100%, 18rem);
		}
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

	/* The toast panel moved to `$lib/components/Toast.svelte`, rendered once by the layout. */
</style>
