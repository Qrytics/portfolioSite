<script lang="ts">
	import { onMount } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/**
	 * A Pump It Up pad: five arrows in an X, each one a drum. Hit them in time for a combo, or let the
	 * demo beat play the pad itself. The keys follow PIU's PC layout (Q E / S / Z C, or the numpad's
	 * 7 9 / 5 / 1 3) and work page-wide while the pad is on screen — except while typing, inside a
	 * dialog, or when another toy has claimed the key.
	 */
	type PadId = 'ul' | 'ur' | 'c' | 'dl' | 'dr';
	type Drum = 'snare' | 'clap' | 'kick' | 'hat' | 'tom';
	const PADS: { id: PadId; label: string; key: string; codes: string[]; drum: Drum }[] = [
		{ id: 'ul', label: 'Up-left, snare', key: 'q', codes: ['KeyQ', 'Numpad7'], drum: 'snare' },
		{ id: 'ur', label: 'Up-right, clap', key: 'e', codes: ['KeyE', 'Numpad9'], drum: 'clap' },
		{ id: 'c', label: 'Center, kick', key: 's', codes: ['KeyS', 'Numpad5'], drum: 'kick' },
		{ id: 'dl', label: 'Down-left, hi-hat', key: 'z', codes: ['KeyZ', 'Numpad1'], drum: 'hat' },
		{ id: 'dr', label: 'Down-right, tom', key: 'c', codes: ['KeyC', 'Numpad3'], drum: 'tom' }
	];
	const ROTATE: Record<PadId, number> = { ul: 0, ur: 90, dr: 180, dl: 270, c: 0 };

	// A 16-step four-on-the-floor groove with fills.
	const PATTERN: PadId[][] = [
		['c', 'dl'], ['dl'], ['dl'], ['dl'], ['c', 'ul', 'dl'], ['dl'], ['dl'], ['c', 'dl'],
		['c', 'dl'], ['dl'], ['c'], ['dl'], ['ul', 'ur'], ['dr'], ['dr', 'ul'], ['c', 'ur']
	];

	let root = $state<HTMLElement | undefined>();
	let lit = $state<Set<PadId>>(new Set());
	let combo = $state(0);
	let best = $state(0);
	let judge = $state<{ text: string; key: number } | null>(null);
	let playing = $state(false);
	let onScreen = $state(false);
	let lastHit = 0;
	let seqTimer: ReturnType<typeof setInterval> | undefined;
	const offTimers = new Map<PadId, ReturnType<typeof setTimeout>>();

	function flash(id: PadId) {
		lit = new Set(lit).add(id);
		clearTimeout(offTimers.get(id));
		offTimers.set(
			id,
			setTimeout(() => {
				const next = new Set(lit);
				next.delete(id);
				lit = next;
			}, 110)
		);
	}

	const sound = (id: PadId) => sfx[PADS.find((p) => p.id === id)!.drum]();

	function hit(id: PadId) {
		sound(id);
		flash(id);
		const now = performance.now();
		const gap = now - lastHit;
		lastHit = now;
		combo = gap < 650 ? combo + 1 : 1;
		best = Math.max(best, combo);
		const text = gap < 220 ? 'PERFECT' : gap < 420 ? 'GREAT' : gap < 650 ? 'GOOD' : '';
		if (combo > 1 && text) judge = { text, key: now };
	}

	function typing(t: EventTarget | null): boolean {
		const el = t as HTMLElement | null;
		return !!el?.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
	}

	function onKey(e: KeyboardEvent) {
		if (!onScreen || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
		const pad = PADS.find((p) => p.codes.includes(e.code));
		if (!pad || typing(e.target) || document.querySelector('[aria-modal="true"]')) return;
		e.preventDefault();
		if (!e.repeat) hit(pad.id);
	}

	function toggleDemo() {
		if (playing) return stopDemo();
		playing = true;
		let step = 0;
		seqTimer = setInterval(() => {
			for (const id of PATTERN[step % PATTERN.length]) {
				sound(id);
				flash(id);
			}
			step++;
			if (step >= PATTERN.length * 2) stopDemo();
		}, 140);
	}

	function stopDemo() {
		clearInterval(seqTimer);
		playing = false;
	}

	onMount(() => {
		// Arms the page-wide keys; it never plays anything itself.
		const io = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.3 });
		if (root) io.observe(root);
		window.addEventListener('keydown', onKey);
		return () => {
			io.disconnect();
			window.removeEventListener('keydown', onKey);
			stopDemo();
			for (const t of offTimers.values()) clearTimeout(t);
		};
	});
</script>

<ToyCard n="02" title="pump it up pad" blurb="Five pads, five drums. The keys work while it is on screen." keys={['q', 'e', 's', 'z', 'c']}>
	<div class="stage" bind:this={root}>
		<div class="pad" role="group" aria-label="Dance pad. Keys Q, E, S, Z and C, or numpad 7, 9, 5, 1 and 3, play the pads.">
			{#each PADS as p (p.id)}
				<button
					type="button"
					class="arrow arrow--{p.id}"
					class:arrow--lit={lit.has(p.id)}
					aria-label={p.label}
					onpointerdown={(e) => {
						e.preventDefault();
						hit(p.id);
					}}
					onclick={(e) => {
						// Keyboard activation (Enter/Space) — pointer presses already played on pointerdown.
						if (e.detail === 0) hit(p.id);
					}}
				>
					<svg viewBox="0 0 40 40" aria-hidden="true">
						{#if p.id === 'c'}
							<rect x="7" y="7" width="26" height="26" rx="3" />
							<rect x="14" y="14" width="12" height="12" rx="1.5" class="inner" />
						{:else}
							<path transform="rotate({ROTATE[p.id]} 20 20)" d="M6 6 H29 L21.5 13.5 L34 26 L26 34 L13.5 21.5 L6 29 Z" />
						{/if}
					</svg>
					<kbd class="arrow__key" aria-hidden="true">{p.key}</kbd>
				</button>
			{/each}
		</div>
		<div class="hud" aria-live="off">
			<div class="judge-slot">
				{#if judge}
					{#key judge.key}<span class="judge judge--{judge.text.toLowerCase()}">{judge.text}</span>{/key}
				{/if}
			</div>
			<span class="combo"><b>{combo > 1 ? combo : 0}</b> combo</span>
			<span class="best">best {best}</span>
			<span class="live" class:live--on={onScreen}><i aria-hidden="true"></i>keys {onScreen ? 'live' : 'idle'}</span>
		</div>
	</div>
	<div class="toy-row">
		<button type="button" class="toy-btn" aria-pressed={playing} onclick={toggleDemo}>
			{playing ? 'stop' : 'play a beat'}
		</button>
	</div>
</ToyCard>

<style>
	.stage {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: 1.25rem;
	}

	.pad {
		display: grid;
		grid-template-columns: repeat(3, 3.6rem);
		grid-template-rows: repeat(3, 3.6rem);
		gap: 0.3rem;
		padding: 0.45rem;
		border: 1px solid var(--border);
		background:
			linear-gradient(135deg, transparent 48.5%, color-mix(in srgb, var(--text) 8%, transparent) 49.5% 50.5%, transparent 51.5%),
			linear-gradient(45deg, transparent 48.5%, color-mix(in srgb, var(--text) 8%, transparent) 49.5% 50.5%, transparent 51.5%),
			color-mix(in srgb, #000 30%, var(--panel-2));
	}

	:global([data-theme='light']) .pad {
		background-color: color-mix(in srgb, #14211f 10%, var(--panel-2));
	}

	.arrow {
		--c: #ef4444;
		position: relative;
		display: grid;
		place-items: center;
		padding: 0;
		border: 1px solid color-mix(in srgb, var(--c) 40%, var(--border));
		background: color-mix(in srgb, var(--c) 8%, var(--panel));
		cursor: pointer;
		touch-action: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.06s, background-color 0.06s, box-shadow 0.06s;
	}

	.arrow--ul { grid-area: 1 / 1; }
	.arrow--ur { grid-area: 1 / 3; }
	.arrow--c { grid-area: 2 / 2; --c: #eab308; }
	.arrow--dl { grid-area: 3 / 1; --c: #3b82f6; }
	.arrow--dr { grid-area: 3 / 3; --c: #3b82f6; }

	.arrow svg {
		width: 76%;
		height: 76%;
	}

	.arrow svg :is(path, rect) {
		fill: color-mix(in srgb, var(--c) 30%, transparent);
		stroke: var(--c);
		stroke-width: 2;
		stroke-linejoin: round;
		transition: fill 0.06s;
	}

	.arrow svg .inner {
		fill: color-mix(in srgb, var(--c) 55%, transparent);
		stroke: none;
	}

	.arrow__key {
		position: absolute;
		right: 0.2rem;
		bottom: 0.1rem;
		color: var(--muter);
		font: inherit;
		font-size: 0.55rem;
		text-transform: uppercase;
	}

	.arrow:hover {
		background: color-mix(in srgb, var(--c) 14%, var(--panel));
	}

	.arrow--lit,
	.arrow:active {
		background: color-mix(in srgb, var(--c) 30%, var(--panel));
		transform: scale(0.94);
		box-shadow: 0 0 1.1rem color-mix(in srgb, var(--c) 55%, transparent);
	}

	.arrow--lit svg :is(path, rect),
	.arrow:active svg :is(path, rect) {
		fill: var(--c);
	}

	.hud {
		display: grid;
		justify-items: start;
		gap: 0.3rem;
	}

	.judge-slot {
		height: 1.6rem;
	}

	.judge {
		display: inline-block;
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		animation: judge 0.45s ease-out both;
	}

	.judge--perfect { color: var(--accent-text); }
	.judge--great { color: #3b82f6; }
	.judge--good { color: var(--muted); }

	@keyframes judge {
		0% {
			transform: translateY(4px);
			opacity: 0;
		}
		35% {
			transform: none;
			opacity: 1;
		}
		100% {
			opacity: 0.7;
		}
	}

	.combo {
		color: var(--muted);
		font-size: 0.78rem;
	}

	.combo b {
		color: var(--text);
		font-size: 1.5rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		margin-right: 0.3rem;
	}

	.best {
		color: var(--muter);
		font-size: 0.72rem;
		font-variant-numeric: tabular-nums;
	}

	.live {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		margin-top: 0.35rem;
		color: var(--muter);
		font-size: 0.68rem;
	}

	.live i {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--border);
	}

	.live--on {
		color: var(--muted);
	}

	.live--on i {
		background: var(--accent);
	}

	@media (max-width: 380px) {
		.pad {
			grid-template-columns: repeat(3, 3.1rem);
			grid-template-rows: repeat(3, 3.1rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.judge {
			animation: none;
		}
	}
</style>
