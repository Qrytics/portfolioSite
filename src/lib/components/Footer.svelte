<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { copyEmail } from '$lib/utils/copyEmail';
	import { onMount } from 'svelte';
	import { SECRETS, secrets, loadSecrets, discover, nextHint, prefersReducedMotion } from '$lib/utils/secrets.svelte';
	import { showToast } from '$lib/utils/toast.svelte';
	import { playSound } from '$lib/utils/sound';
	import { getLocalItem, setLocalItem } from '$lib/utils/safeStorage';
	import { loadSoundPref, soundPref, toggleSound } from '$lib/utils/soundPref.svelte';
	import { sfx } from '$lib/utils/synth';
	import { burstAt, centerOf } from '$lib/components/toys/particles';

	const year = new Date().getFullYear();

	/**
	 * `behavior: 'smooth'` is deliberately not forced here: `app.css` sets
	 * `html { scroll-behavior: smooth }` and resets it under `prefers-reduced-motion`, and passing
	 * the option explicitly overrode that reset — so the one control on the page whose entire job is
	 * a long animated scroll ignored the user's motion preference.
	 */
	/** Secret: the back-to-top button launches an actual rocket from where you tapped it. */
	let rocket = $state<{ x: number; y: number; key: number } | null>(null);
	let rocketTimer: ReturnType<typeof setTimeout> | undefined;

	function launchRocket(button: HTMLElement) {
		if (prefersReducedMotion()) return;
		const r = button.getBoundingClientRect();
		rocket = { x: r.left + r.width / 2, y: r.top, key: Date.now() };
		clearTimeout(rocketTimer);
		rocketTimer = setTimeout(() => (rocket = null), 1300);
	}

	function backToTop(e: MouseEvent) {
		launchRocket(e.currentTarget as HTMLElement);
		playSound('game-start', 0.5);
		discover('rocket');
		window.scrollTo({ top: 0 });
		// Move focus too. Scrolling alone left keyboard focus on this button at the bottom of the
		// page, so the next Tab jumped the viewport straight back down. The site title is the first
		// real control at the top. `preventScroll` so focusing doesn't fight the scroll above.
		document.querySelector<HTMLElement>('.site-header__title')?.focus({ preventScroll: true });
	}

	// Storage is read after mount, so the server-rendered "0" and the hydrated count never disagree
	// during hydration; the counter is fixed-width so the update doesn't shift anything.
	onMount(() => {
		loadSecrets();
		loadSoundPref();
		highFives = Number(getLocalItem('high-fives')) || 0;
	});

	/** High-five counter: per-browser, like the secrets. Milestones get a bigger celebration. */
	let highFives = $state(0);

	function highFive(e: MouseEvent) {
		highFives++;
		setLocalItem('high-fives', String(highFives));
		const milestone = highFives % 10 === 0;
		sfx.clap();
		if (milestone) sfx.arpeggio([523.25, 659.25, 783.99, 1046.5], 0.06);
		burstAt(...centerOf(e.currentTarget as HTMLElement), {
			count: milestone ? 18 : 7,
			spread: milestone ? 120 : 60,
			glyphs: milestone ? ['🙌', '✋', '✨', '🎉'] : ['✋', '✨']
		});
		if (milestone) showToast(`${highFives} high fives. we're basically best friends now.`, 3500);
	}

	function onSoundToggle() {
		if (toggleSound()) sfx.blip(true);
	}

	const total = SECRETS.length;
	const foundCount = $derived(secrets.found.length);

	function showHint() {
		playSound('ui-click', 0.5);
		const hint = nextHint();
		showToast(hint ? `hint: ${hint}` : `all ${total} found. there is nothing left to find. probably.`, 5000);
	}
</script>

<footer class="footer">
	<div class="footer__inner">
		<span class="footer__copy">© {year} {profile.name}</span>
		<span class="footer__sep">·</span>
		<button
			type="button"
			class="email-btn footer-link"
			onclick={copyEmail}
			aria-label="Copy email address {profile.email}"
			title="Copy email address"
		>
			{profile.email}
		</button>
		<span class="footer__sep">·</span>
		<a href={profile.github} target="_blank" rel="noopener noreferrer" class="footer-link">
			github<span class="sr-only"> (opens in new tab)</span>
		</a>
		<span class="footer__sep">·</span>
		<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="footer-link">
			linkedin<span class="sr-only"> (opens in new tab)</span>
		</a>
		<span class="footer__sep">·</span>
		<!-- `rel="external"`: /tutoring is a proxy rewrite, not a route — it tells the prerender crawler
		     not to follow it (it would 404 the build) and the client router not to handle it. -->
		<a href="/tutoring" target="_blank" rel="external noopener noreferrer" class="footer-link">
			tutoring<span class="sr-only"> (opens in new tab)</span>
		</a>
		{#if profile.twitter}
			<span class="footer__sep">·</span>
			<a href={profile.twitter} target="_blank" rel="noopener noreferrer" class="footer-link">
				twitter<span class="sr-only"> (opens in new tab)</span>
			</a>
		{/if}
	</div>
	<button class="back-to-top footer-link" type="button" onclick={backToTop}>back to top ↑</button>
	<!-- The one visible clue that the site has secrets at all. Each tap gives a hint for one not yet
	     found; the count is the whole game's scoreboard. -->
	<div class="footer__toys">
		<button type="button" class="high-five" onclick={highFive} aria-label="High five. {highFives} so far">
			<span class="high-five__hand" aria-hidden="true">✋</span> high five{highFives ? ` · ${highFives}` : ''}
		</button>
		<button type="button" class="secrets-btn" onclick={showHint} aria-label="Secrets found: {foundCount} of {total}. Get a hint.">
			<span aria-hidden="true">{foundCount === total ? '🏆' : '✦'}</span>
			{foundCount === 0 ? `psst — this site has ${total} secrets` : `secrets found ${foundCount}/${total}`}
			<span class="secrets-btn__hint" aria-hidden="true">· hint?</span>
		</button>
		<button type="button" class="sound-btn" aria-pressed={!soundPref.enabled} onclick={onSoundToggle}>
			<span aria-hidden="true">{soundPref.enabled ? '🔊' : '🔇'}</span> sound {soundPref.enabled ? 'on' : 'off'}
		</button>
	</div>
</footer>

{#if rocket}
	{#key rocket.key}
		<span class="rocket" aria-hidden="true" style="left: {rocket.x}px; top: {rocket.y}px">🚀</span>
	{/key}
{/if}

<style>
	.footer {
		margin-top: clamp(2.25rem, 5vw, 3.5rem);
		padding: 1.25rem clamp(1.25rem, 4vw, 3rem);
		border-top: 1px solid var(--border-2);
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 1rem;
	}

	.footer__inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
		color: var(--muted);
		font-size: 0.95rem;
		max-width: 86rem;
		margin: 0 auto;
		font-family: var(--font-mono);
	}

	.footer__sep {
		color: color-mix(in srgb, var(--text) 38%, transparent);
	}

	@media (max-width: 64rem) {
		.footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		/* Copyright and email each get a line; the short links share one row instead of stacking
		   into a five-line column. */
		.footer__inner {
			display: grid;
			grid-template-columns: repeat(3, auto);
			justify-content: center;
			justify-items: center;
			gap: 0.5rem 1.4rem;
			font-size: 0.9rem;
		}

		.footer__copy,
		.email-btn {
			grid-column: 1 / -1;
		}

		.footer__copy {
			color: var(--muter);
			font-size: 0.82rem;
		}

		.email-btn {
			margin-bottom: 0.35rem;
		}

		.footer__sep {
			display: none;
		}

		.back-to-top {
			position: static;
			transform: none;
			margin-top: 1rem;
		}
	}

	.footer-link {
		color: color-mix(in srgb, var(--accent) 92%, transparent);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.footer-link:hover {
		color: var(--accent);
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.email-btn {
		background: none;
		border: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		padding: 0;
		font: inherit;
		cursor: pointer;
	}

	.back-to-top {
		position: static;
		transform: none;
		justify-self: end;
		white-space: nowrap;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.back-to-top:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
		outline-offset: 4px;
	}

	.footer__toys {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 0.9rem;
	}

	.high-five,
	.sound-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.25rem;
		padding: 0.4rem 0.7rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		cursor: pointer;
		font-variant-numeric: tabular-nums;
	}

	.high-five:hover,
	.sound-btn:hover {
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.high-five__hand {
		display: inline-block;
		transform-origin: 70% 90%;
		animation: wave 2.4s ease-in-out infinite;
	}

	.high-five:active .high-five__hand {
		transform: scale(1.3);
	}

	@keyframes wave {
		0%, 70%, 100% { transform: rotate(0); }
		78% { transform: rotate(-14deg); }
		86% { transform: rotate(10deg); }
		94% { transform: rotate(-6deg); }
	}

	.sound-btn[aria-pressed='true'] {
		color: var(--muter);
	}

	@media (pointer: coarse) {
		.high-five,
		.sound-btn,
		.secrets-btn {
			min-height: 2.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.high-five__hand {
			animation: none;
		}
	}

	.secrets-btn {
		padding: 0.4rem 0.7rem;
		min-height: 2.25rem;
		border: 1px dashed var(--border);
		background: none;
		color: var(--muter);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		letter-spacing: 0.02em;
		cursor: pointer;
		font-variant-numeric: tabular-nums;
	}

	.secrets-btn:hover,
	.secrets-btn:focus-visible {
		color: var(--accent-text);
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.secrets-btn__hint {
		opacity: 0.7;
	}

	.rocket {
		position: fixed;
		z-index: 900;
		font-size: 1.6rem;
		pointer-events: none;
		transform: translate(-50%, 0) rotate(-45deg);
		animation: rocket-launch 1.2s cubic-bezier(0.55, 0, 0.85, 0.35) forwards;
	}

	@keyframes rocket-launch {
		0% {
			transform: translate(-50%, 0) rotate(-45deg) scale(0.8);
			opacity: 0;
		}
		12% {
			transform: translate(-50%, -10px) rotate(-45deg) scale(1.1);
			opacity: 1;
		}
		20% {
			transform: translate(calc(-50% - 3px), -14px) rotate(-45deg);
		}
		28% {
			transform: translate(calc(-50% + 3px), -18px) rotate(-45deg);
		}
		100% {
			transform: translate(-50%, -110vh) rotate(-45deg) scale(1.3);
			opacity: 1;
		}
	}

	/* The toast panel moved to `$lib/components/Toast.svelte`, rendered once by the layout. */
</style>

