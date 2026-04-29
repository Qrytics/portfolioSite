<script lang="ts">
	import { profile } from '$lib/data/profile';
	import WaveCheckeredBackground from './WaveCheckeredBackground.svelte';

	let toastVisible = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	function copyEmail() {
		navigator.clipboard.writeText(profile.email).then(() => {
			if (toastTimer !== undefined) clearTimeout(toastTimer);
			toastVisible = true;
			toastTimer = setTimeout(() => (toastVisible = false), 2500);
		});
	}
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
		<div class="header__meta">
			<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.github.replace('https://', '')}
			</a>
			<span class="meta-sep">·</span>
			<button type="button" class="link link__mono email-copy-btn" onclick={copyEmail}>{profile.email}</button>
			<span class="meta-sep">·</span>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.linkedin.replace('https://', '')}
			</a>
		</div>
	</div>
</header>

{#if toastVisible}
	<div class="toast" role="status" aria-live="polite">email copied to clipboard</div>
{/if}

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

	:global([data-theme='light']) .header__content::before {
		width: min(96ch, 94%);
		height: 82%;
		background: radial-gradient(
			ellipse at center,
			rgb(255, 255, 255) 100%,
			rgba(247, 253, 251, 0.92) 90%,
			rgba(228, 247, 243, 0.58) 8%,
			rgba(210, 240, 234, 0.22) 9%,
			rgba(255, 255, 255, 0) 10%
		);
		filter: blur(100px);
	}

	:global([data-theme='light']) .header__tagline::before {
		width: calc(100% + 4.25rem);
		height: calc(100% + 1.5rem);
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.98) 100%,
			rgba(240, 252, 248, 0.78) 5%,
			rgba(223, 247, 241, 0.32) 8%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(100px);
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
		color: rgba(243, 246, 255, 0.82);
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

	.link {
		color: rgba(54, 242, 194, 0.94);
		text-decoration: none;
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.link:hover {
		color: var(--accent);
		border-color: rgba(54, 242, 194, 0.55);
	}

	.meta-sep {
		color: rgba(243, 246, 255, 0.45);
		font-family: var(--font-mono);
	}

	@media (max-width: 520px) {
		.meta-sep {
			display: none;
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
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
	}

	.email-copy-btn:focus-visible {
		outline: 2px solid rgba(54, 242, 194, 0.6);
		outline-offset: 4px;
	}

	.toast {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%);
		background: var(--panel);
		color: rgba(243, 246, 255, 0.92);
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border);
		box-shadow: var(--shadow);
		z-index: 1000;
		text-align: center;
		max-width: calc(100vw - 2rem);
		white-space: normal;
		overflow-wrap: anywhere;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		animation: toast-in 0.2s ease-out;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translate(-50%) translateY(1rem); }
		to   { opacity: 1; transform: translate(-50%) translateY(0); }
	}

</style>
