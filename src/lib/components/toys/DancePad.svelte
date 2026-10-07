<script lang="ts">
	import { onDestroy } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/**
	 * A Pump It Up pad: five arrows in an X, each one a drum. Hit them in a row for a combo, or let
	 * the demo beat play the pad itself. Keys follow PIU's keyboard layout (Q E / S / Z C).
	 */
	type PadId = 'ul' | 'ur' | 'c' | 'dl' | 'dr';
	const PADS: { id: PadId; label: string; key: string; glyph: string; drum: keyof typeof sfx }[] = [
		{ id: 'ul', label: 'Up-left, snare', key: 'q', glyph: '◤', drum: 'snare' },
		{ id: 'ur', label: 'Up-right, clap', key: 'e', glyph: '◥', drum: 'clap' },
		{ id: 'c', label: 'Center, kick', key: 's', glyph: '■', drum: 'kick' },
		{ id: 'dl', label: 'Down-left, hi-hat', key: 'z', glyph: '◣', drum: 'hat' },
		{ id: 'dr', label: 'Down-right, tom', key: 'c', glyph: '◢', drum: 'tom' }
	];

	// A 16-step four-on-the-floor groove with fills.
	const PATTERN: PadId[][] = [
		['c', 'dl'], ['dl'], ['dl'], ['dl'], ['c', 'ul', 'dl'], ['dl'], ['dl'], ['c', 'dl'],
		['c', 'dl'], ['dl'], ['c'], ['dl'], ['ul', 'ur'], ['dr'], ['dr', 'ul'], ['c', 'ur']
	];

	let lit = $state<Set<PadId>>(new Set());
	let combo = $state(0);
	let judge = $state<{ text: string; key: number } | null>(null);
	let playing = $state(false);
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

	function sound(id: PadId) {
		const pad = PADS.find((p) => p.id === id)!;
		(sfx[pad.drum] as () => void)();
	}

	function hit(id: PadId) {
		sound(id);
		flash(id);
		const now = performance.now();
		const gap = now - lastHit;
		lastHit = now;
		combo = gap < 650 ? combo + 1 : 1;
		const text = gap < 220 ? 'PERFECT' : gap < 420 ? 'GREAT' : gap < 650 ? 'GOOD' : '';
		if (combo > 1 && text) judge = { text, key: now };
	}

	function onKey(e: KeyboardEvent) {
		if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
		const pad = PADS.find((p) => p.key === e.key.toLowerCase());
		if (!pad) return;
		e.preventDefault();
		hit(pad.id);
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

	onDestroy(() => {
		stopDemo();
		for (const t of offTimers.values()) clearTimeout(t);
	});
</script>

<ToyCard title="pump it up pad" cue="play the drums">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div class="stage" role="group" aria-label="Dance pad. Keys Q, E, S, Z and C play the pads." onkeydown={onKey}>
		<div class="pad">
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
					<span class="arrow__glyph" aria-hidden="true">{p.glyph}</span>
					<span class="arrow__key" aria-hidden="true">{p.key}</span>
				</button>
			{/each}
		</div>
		<div class="hud" aria-live="off">
			{#if judge}
				{#key judge.key}<span class="judge judge--{judge.text.toLowerCase()}">{judge.text}</span>{/key}
			{/if}
			<span class="combo">{combo > 1 ? `${combo} combo` : 'hit a pad'}</span>
		</div>
	</div>
	<button type="button" class="btn" aria-pressed={playing} onclick={toggleDemo}>
		{playing ? '■ stop' : '▶ play a beat'}
	</button>
</ToyCard>

<style>
	.stage {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: center;
		gap: 1rem;
	}

	.pad {
		display: grid;
		grid-template-columns: repeat(3, 3.4rem);
		grid-template-rows: repeat(3, 3.4rem);
		gap: 0.3rem;
		padding: 0.4rem;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--text) 6%, var(--panel-2));
	}

	.arrow {
		--c: var(--hot);
		position: relative;
		display: grid;
		place-items: center;
		border: 1px solid color-mix(in srgb, var(--c) 55%, var(--border));
		background: color-mix(in srgb, var(--c) 14%, var(--panel));
		color: var(--c);
		font: inherit;
		cursor: pointer;
		touch-action: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.06s, background-color 0.06s, box-shadow 0.06s;
	}

	.arrow--ul {
		grid-area: 1 / 1;
	}
	.arrow--ur {
		grid-area: 1 / 3;
	}
	.arrow--c {
		grid-area: 2 / 2;
		--c: var(--warm);
	}
	.arrow--dl {
		grid-area: 3 / 1;
		--c: #3b82f6;
	}
	.arrow--dr {
		grid-area: 3 / 3;
		--c: #3b82f6;
	}

	.arrow__glyph {
		font-size: 1.5rem;
		line-height: 1;
	}

	.arrow__key {
		position: absolute;
		right: 0.2rem;
		bottom: 0.05rem;
		color: var(--muter);
		font-size: 0.55rem;
		text-transform: uppercase;
	}

	.arrow--lit,
	.arrow:active {
		background: var(--c);
		color: var(--bg);
		transform: scale(0.93);
		box-shadow: 0 0 1rem color-mix(in srgb, var(--c) 70%, transparent);
	}

	.hud {
		display: grid;
		justify-items: center;
		gap: 0.3rem;
		min-height: 4rem;
		text-align: center;
	}

	.judge {
		font-size: 1.2rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		animation: judge 0.5s ease-out both;
	}

	.judge--perfect {
		color: var(--accent-text);
	}
	.judge--great {
		color: #3b82f6;
	}
	.judge--good {
		color: var(--accent-2);
	}

	@keyframes judge {
		0% {
			transform: scale(1.5);
			opacity: 0;
		}
		30% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			opacity: 0.85;
		}
	}

	.combo {
		color: var(--muted);
		font-size: 0.8rem;
		font-variant-numeric: tabular-nums;
	}

	.btn {
		align-self: flex-start;
		min-height: 2.75rem;
		padding: 0 0.9rem;
		margin-top: auto;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--text);
		font: inherit;
		font-size: 0.82rem;
		cursor: pointer;
	}

	.btn[aria-pressed='true'],
	.btn:hover {
		border-color: var(--accent);
		color: var(--accent-text);
	}

	@media (max-width: 380px) {
		.pad {
			grid-template-columns: repeat(3, 3rem);
			grid-template-rows: repeat(3, 3rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.judge {
			animation: none;
		}
	}
</style>
