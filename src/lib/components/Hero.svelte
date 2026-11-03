<script lang="ts">
	import { profile } from '$lib/data/profile';
	import WaveCheckeredBackground from './WaveCheckeredBackground.svelte';
	import { copyEmail } from '$lib/utils/copyEmail';
	import { discover, prefersReducedMotion } from '$lib/utils/secrets.svelte';
	import { playSound } from '$lib/utils/sound';
	import { projects } from '$lib/data/projects';

	/** Signature: a ruler of every project by start date. Real data, no invented numbers. */
	const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	const stamps = projects.map((p) => p.startYear + MONTHS.indexOf(p.startMonth) / 12);
	const first = Math.floor(Math.min(...stamps));
	const lastYear = Math.floor(Math.max(...stamps));
	const last = lastYear + 1; // scale end; the label below uses lastYear
	const span = last - first;
	const ticks = Array.from({ length: span + 1 }, (_, i) => first + i);
	const pct = (v: number) => ((v - first) / span) * 100;

	/**
	 * Secret: the headline's letters are loose. A tap blasts them away from the pointer and they
	 * spring back. Words stay `inline-block` + `nowrap` so the line breaks exactly where plain text
	 * would; the <h1>'s `aria-label` carries the name, so a screen reader reads one heading, not 50
	 * letters.
	 */
	const words = profile.tagline.split(' ').map((word) => [...word]);
	let blast = $state<Array<{ dx: number; dy: number; rot: number }> | null>(null);
	let blastTimer: ReturnType<typeof setTimeout> | undefined;
	let taglineEl = $state<HTMLElement | undefined>(undefined);

	function scatter(e: MouseEvent) {
		discover('tagline');
		if (prefersReducedMotion() || !taglineEl) return;
		playSound('confetti-pop', 0.5);
		const chars = [...taglineEl.querySelectorAll<HTMLElement>('.ch')];
		blast = chars.map((el) => {
			const r = el.getBoundingClientRect();
			const vx = r.left + r.width / 2 - e.clientX;
			const vy = r.top + r.height / 2 - e.clientY;
			const dist = Math.max(24, Math.hypot(vx, vy));
			const force = Math.min(1, 220 / dist) * (90 + Math.random() * 90);
			return {
				dx: (vx / dist) * force,
				dy: (vy / dist) * force - 20 - Math.random() * 30,
				rot: (Math.random() - 0.5) * 140
			};
		});
		clearTimeout(blastTimer);
		blastTimer = setTimeout(() => (blast = null), 520);
	}
</script>

<header class="header">
	<div class="hero-background" aria-hidden="true">
		<WaveCheckeredBackground />
	</div>

	<div class="header__content">
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
		<!-- The name comes from `aria-label` rather than an sr-only copy: a second copy put the tagline in
		     the served <h1> twice, so crawlers and text extraction read it doubled. The letter spans
		     have no whitespace between them, so they still read as whole words. -->
		<h1
			class="header__tagline"
			class:header__tagline--blast={blast}
			bind:this={taglineEl}
			onclick={scatter}
			aria-label={profile.tagline}
		>
			<span>
				{#each words as word, w (w)}
					{@const offset = words.slice(0, w).reduce((n, x) => n + x.length, 0)}
					<span class="word">{#each word as ch, c (c)}{@const b = blast?.[offset + c]}<span
								class="ch"
								style={b ? `--dx:${b.dx.toFixed(1)}px;--dy:${b.dy.toFixed(1)}px;--rot:${b.rot.toFixed(0)}deg` : undefined}
								>{ch}</span
							>{/each}</span
					>{w < words.length - 1 ? ' ' : ''}
				{/each}
			</span>
		</h1>
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
		<figure class="ruler" aria-label="{projects.length} projects by start date, {first} to {lastYear}">
			<div class="ruler__read">
				<span class="ruler__figure">{projects.length}</span>
				<span class="ruler__unit">projects, {first}–{lastYear}</span>
			</div>
			<div class="ruler__scale" aria-hidden="true">
				{#each stamps as v, i (i)}<span class="ruler__mark" style="left:{pct(v)}%"></span>{/each}
				{#each ticks as t (t)}<span class="ruler__tick" style="left:{pct(t)}%"><i>{t}</i></span>{/each}
			</div>
		</figure>
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
		align-items: flex-start;
		text-align: left;
		min-height: 280px;
		max-width: 86rem;
		margin: 0 auto;
		gap: 0;
	}

	.header__tagline {
		position: relative;
		margin: 0;
		color: var(--text);
		font-size: clamp(1.5rem, 4vw, 3.125rem);
		font-weight: 700;
		text-wrap: balance;
		letter-spacing: -0.02em;
		max-width: 26ch;
		line-height: 1.1;
		padding-bottom: 16px;
	}

	/* Loose letters (see `scatter`). The return trip uses an overshooting curve so they land with a
	   small bounce; the outbound trip is a fast ease-out. */
	.header__tagline {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	.word {
		display: inline-block;
		white-space: nowrap;
	}

	.ch {
		display: inline-block;
		transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.header__tagline--blast .ch {
		transform: translate(var(--dx, 0), var(--dy, 0)) rotate(var(--rot, 0));
		transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.header__description {
		position: relative;
		margin: 1rem 0 0;
		color: var(--text);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
	}

	.header__cta {
		position: relative;
		margin: 0.65rem 0 0;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
	}

	.header__meta {
		position: relative;
		margin: 1.25rem 0 0;
		font-size: clamp(0.95rem, 1.8vw, 1.1rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		gap: 0.75rem;
	}

	.header__actions {
		position: relative;
		margin-top: 1.15rem;
		display: flex;
		justify-content: flex-start;
	}

	.hero-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.9rem;
		border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
		background: var(--accent);
		color: var(--panel);
		font-family: var(--font-mono);
		font-size: 0.875rem;
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
		color: var(--panel);
		background: var(--accent-2);
		transform: translateY(-1px);
	}

	.link {
		color: var(--accent-text);
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
		display: none;
		color: var(--muter);
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
			font-size: 0.875rem;
			line-height: 1.5;
		}

		.header__meta {
			margin-top: 1rem;
			font-size: 0.875rem;
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
			font-size: 0.875rem;
		}

		.header__meta {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 0.45rem;
			margin-top: 0.55rem;
			font-size: 0.75rem;
		}

		.header__meta .link {
			display: grid;
			place-items: center;
			min-height: 2.75rem;
			padding: 0 0.3rem;
			border: 1px solid var(--border);
			background: color-mix(in srgb, var(--panel) 80%, transparent);
			color: var(--text);
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

	:global([data-theme='light']) .header__tagline {
		color: var(--text);
		letter-spacing: -0.02em;
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
		color: var(--paper-white);
		box-shadow: 0 1px 2px color-mix(in srgb, var(--accent-text) 30%, transparent),
			0 6px 18px -6px color-mix(in srgb, var(--accent-text) 55%, transparent);
	}

	:global([data-theme='light']) .hero-action:hover,
	:global([data-theme='light']) .hero-action:focus-visible {
		border-color: var(--clr-primary-a30);
		background: var(--clr-primary-a30);
		color: var(--paper-white);
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

	.ruler {
		align-self: stretch;
		margin: 2rem 0 0;
		padding-top: 1rem;
		border-top: 1px solid var(--text);
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem 2rem;
		align-items: end;
	}
	.ruler__read { display: flex; flex-direction: column; }
	.ruler__figure {
		font-size: 3.125rem;
		line-height: 1;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}
	.ruler__unit { font-size: 0.75rem; color: var(--muted); }
	.ruler__scale {
		position: relative;
		height: 3.25rem;
		margin: 0 1.5rem 0 0.5rem;
		border-bottom: 1px solid var(--text);
	}
	.ruler__mark {
		position: absolute;
		bottom: 0;
		width: 2px;
		height: 1.25rem;
		margin-left: -1px;
		background: var(--accent-2);
	}
	.ruler__tick {
		position: absolute;
		bottom: -1.5rem;
		height: 0.75rem;
		border-left: 1px solid var(--text);
	}
	.ruler__tick i {
		position: absolute;
		top: 0.875rem;
		left: -1.2rem;
		font-style: normal;
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		color: var(--muted);
	}
	.ruler { padding-bottom: 1.5rem; }
	@media (max-width: 700px) {
		.ruler { grid-template-columns: minmax(0, 1fr); }
		.header__tagline { max-width: 100%; }
	}
</style>
