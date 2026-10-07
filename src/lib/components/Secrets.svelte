<script lang="ts">
	/**
	 * The easter eggs that aren't owned by any one component: they hang off elements several
	 * components render (tech tags, the header handle, the theme toggle), so they are wired here by
	 * event delegation on `document` rather than threaded through every component's props.
	 *
	 * Nothing here runs before the page is idle, and nothing costs anything until a real click: one
	 * `pointerdown` and one `click` listener, both passive filters on `closest()`.
	 */
	import { onMount } from 'svelte';
	import { burstCounter, discover, prefersReducedMotion } from '$lib/utils/secrets.svelte';
	import { playSound } from '$lib/utils/sound';
	import { showToast } from '$lib/utils/toast.svelte';

	// ── Tag combo ──────────────────────────────────────────────────────────────────────────────
	const COMBO_NEEDED = 5;
	const COMBO_WINDOW_MS = 2600;
	let combo = 0;
	let comboAt = 0;
	let comboLabel = $state<{ x: number; y: number; n: number; key: number } | null>(null);
	let comboTimer: ReturnType<typeof setTimeout> | undefined;

	function popTag(tag: HTMLElement, e: PointerEvent) {
		const now = performance.now();
		combo = now - comboAt < COMBO_WINDOW_MS / COMBO_NEEDED + 400 ? combo + 1 : 1;
		comboAt = now;
		if (!prefersReducedMotion()) {
			tag.classList.remove('secret-pop');
			void tag.offsetWidth; // restart the animation on a repeat tap
			tag.classList.add('secret-pop');
		}
		playSound('typing-key', 0.5 + Math.min(combo, 8) * 0.06);
		if (combo >= 2) {
			comboLabel = { x: e.clientX, y: e.clientY, n: combo, key: now };
			clearTimeout(comboTimer);
			comboTimer = setTimeout(() => (comboLabel = null), 700);
		}
		if (combo >= COMBO_NEEDED) discover('combo');
	}

	// ── Header handle: click it too many times and it crashes ─────────────────────────────────
	const handleClicks = burstCounter(5, 2500);
	let glitchTimer: ReturnType<typeof setTimeout> | undefined;

	function crashHandle(title: HTMLElement, e: Event) {
		e.preventDefault();
		title.dataset.glitch = 'segfault 💥';
		title.classList.add('secret-glitch');
		playSound('game-over', 0.6);
		clearTimeout(glitchTimer);
		glitchTimer = setTimeout(() => {
			title.classList.remove('secret-glitch');
			delete title.dataset.glitch;
		}, prefersReducedMotion() ? 1800 : 1400);
		discover('handle');
	}

	// ── Theme toggle: flip it fast enough and the accent colour goes on tour ──────────────────
	const themeFlips = burstCounter(6, 3500);
	let raveRaf = 0;

	/**
	 * Sweeps `--accent` around the hue wheel for a few seconds, then hands the real token back.
	 * A smooth hue rotation, not a flash: nothing changes in brightness fast enough to strobe. The
	 * light theme gets a darker lightness so links stay legible against white the whole way round.
	 */
	function rave() {
		const root = document.documentElement;
		cancelAnimationFrame(raveRaf);
		const start = performance.now();
		const duration = 5000;
		function frame(now: number) {
			const t = (now - start) / duration;
			if (t >= 1) {
				root.style.removeProperty('--accent');
				root.style.removeProperty('--accent-text');
				return;
			}
			const hue = (165 + t * 720) % 360;
			const light = root.dataset.theme === 'light';
			root.style.setProperty('--accent', `hsl(${hue} ${light ? '75% 38%' : '85% 60%'})`);
			root.style.setProperty('--accent-text', `hsl(${hue} ${light ? '80% 30%' : '85% 62%'})`);
			raveRaf = requestAnimationFrame(frame);
		}
		raveRaf = requestAnimationFrame(frame);
	}

	onMount(() => {
		function onPointerDown(e: PointerEvent) {
			const tag = (e.target as Element | null)?.closest<HTMLElement>('.tech-badge');
			if (tag) popTag(tag, e);
		}

		function onClick(e: MouseEvent) {
			const target = e.target as Element | null;
			const title = target?.closest<HTMLElement>('.site-header__title');
			if (title && handleClicks.hit()) {
				crashHandle(title, e);
				return;
			}
			if (target?.closest('.theme-toggle') && themeFlips.hit()) {
				if (!prefersReducedMotion()) rave();
				else showToast('the lights flicker politely (reduced motion is on)', 2500);
				discover('disco');
			}
		}

		document.addEventListener('pointerdown', onPointerDown, { passive: true });
		// Capture phase, so the handle's fifth click can cancel its own navigation.
		document.addEventListener('click', onClick, true);

		// For anyone who opens devtools. Deferred to idle so it never competes with first paint.
		const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
		const idleId = idle(() => {
			(window as unknown as { secret: () => string }).secret = () => {
				discover('console');
				return 'nice. you found the console secret — the footer has the scoreboard.';
			};
			console.log(
				'%c👀 hey, you opened devtools.%c\nThis site has secrets. One of them is right here: type secret() and press enter.',
				'color:#36f2c2;font:600 14px ui-monospace,monospace',
				'color:inherit;font:12px ui-monospace,monospace'
			);
		});

		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('click', onClick, true);
			if (window.cancelIdleCallback && typeof idleId === 'number') window.cancelIdleCallback(idleId);
			cancelAnimationFrame(raveRaf);
			document.documentElement.style.removeProperty('--accent');
			document.documentElement.style.removeProperty('--accent-text');
		};
	});
</script>

{#if comboLabel}
	{#key comboLabel.key}
		<span class="combo" aria-hidden="true" style="left: {comboLabel.x}px; top: {comboLabel.y}px">
			{comboLabel.n >= COMBO_NEEDED ? `${comboLabel.n}× COMBO!` : `${comboLabel.n}×`}
		</span>
	{/key}
{/if}

<style>
	.combo {
		position: fixed;
		z-index: 950;
		pointer-events: none;
		transform: translate(-50%, -150%);
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--accent-text);
		text-shadow: 0 1px 0 var(--bg), 0 0 6px var(--bg);
		animation: combo-rise 0.7s ease-out forwards;
		white-space: nowrap;
	}

	@keyframes combo-rise {
		to {
			transform: translate(-50%, -320%);
			opacity: 0;
		}
	}

	:global(.tech-badge) {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	:global(.tech-badge.secret-pop) {
		animation: tag-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes tag-pop {
		40% {
			transform: scale(1.25) rotate(-4deg);
		}
		100% {
			transform: none;
		}
	}

	/* The handle "crashes": the text jitters with an RGB split and "segfault" replaces it — short enough for the width-capped phone title. */
	:global(.site-header__title.secret-glitch) {
		color: transparent !important;
		position: relative;
		animation: handle-glitch 0.18s steps(2) 6;
	}

	:global(.site-header__title.secret-glitch)::after {
		content: attr(data-glitch);
		position: absolute;
		inset: 0;
		color: var(--hot);
		white-space: nowrap;
		text-shadow: 2px 0 color-mix(in srgb, var(--accent) 80%, transparent),
			-2px 0 color-mix(in srgb, var(--hot) 60%, transparent);
	}

	@keyframes handle-glitch {
		0% {
			transform: translate(0);
		}
		25% {
			transform: translate(-2px, 1px) skewX(-8deg);
		}
		50% {
			transform: translate(2px, -1px);
		}
		75% {
			transform: translate(-1px, 0) skewX(6deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.combo,
		:global(.site-header__title.secret-glitch) {
			animation: none;
		}
	}
</style>
