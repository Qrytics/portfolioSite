<script lang="ts">
	import ToyCard from './ToyCard.svelte';
	import { PENTATONIC, sfx, tone } from '$lib/utils/synth';

	/**
	 * Ten pentatonic keys, so any run of them sounds intentional. Two voices: a bowed violin (seven
	 * years of lessons) and a plucked chip tune. Drag across the keys to glide.
	 */
	const NAMES = ['C', 'D', 'E', 'G', 'A', 'C', 'D', 'E', 'G', 'A'];
	let voice = $state<'violin' | 'chip'>('violin');
	let active = $state<number | null>(null);
	let dragging = false;
	let lastKey = -1;
	let offTimer: ReturnType<typeof setTimeout> | undefined;

	function play(i: number) {
		if (voice === 'violin') sfx.violin(PENTATONIC[i]);
		else tone(PENTATONIC[i] * 2, { type: 'square', dur: 0.14, vol: 0.12 });
		active = i;
		lastKey = i;
		clearTimeout(offTimer);
		offTimer = setTimeout(() => (active = null), 180);
	}

	function keyAt(x: number, y: number): number | null {
		const el = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-key]');
		return el ? Number(el.dataset.key) : null;
	}

	function down(e: PointerEvent, i: number) {
		e.preventDefault();
		dragging = true;
		play(i);
	}

	function move(e: PointerEvent) {
		if (!dragging) return;
		const i = keyAt(e.clientX, e.clientY);
		if (i !== null && i !== lastKey) play(i);
	}

	function up() {
		dragging = false;
		lastKey = -1;
	}
</script>

<svelte:window onpointerup={up} onpointercancel={up} />

<ToyCard title="pentatonic keys" cue="drag across">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="keys" onpointermove={move}>
		{#each PENTATONIC as _, i (i)}
			<button
				type="button"
				class="key"
				class:key--on={active === i}
				data-key={i}
				aria-label="Play {NAMES[i]}{i < 5 ? 4 : 5}"
				onpointerdown={(e) => down(e, i)}
				onclick={(e) => {
					if (e.detail === 0) play(i);
				}}
			>
				<span class="key__name" aria-hidden="true">{NAMES[i]}</span>
			</button>
		{/each}
	</div>
	<div class="voices" role="radiogroup" aria-label="Instrument">
		{#each ['violin', 'chip'] as const as v (v)}
			<button
				type="button"
				role="radio"
				class="voice"
				aria-checked={voice === v}
				onclick={() => {
					voice = v;
					play(4);
				}}
			>
				{v === 'violin' ? '🎻 violin' : '👾 chip'}
			</button>
		{/each}
	</div>
</ToyCard>

<style>
	.keys {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));
		gap: 0.2rem;
		height: 8rem;
		touch-action: none;
	}

	.key {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0.4rem;
		border: 1px solid var(--border);
		border-top: 0;
		background: linear-gradient(180deg, var(--panel-2), var(--panel));
		color: var(--muter);
		font: inherit;
		font-size: 0.7rem;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		transition: background-color 0.08s, transform 0.08s;
	}

	/* Each key gets a step of the hue wheel, so a run up the keyboard is a little rainbow. */
	.key:nth-child(1) { --h: 160; }
	.key:nth-child(2) { --h: 180; }
	.key:nth-child(3) { --h: 200; }
	.key:nth-child(4) { --h: 230; }
	.key:nth-child(5) { --h: 265; }
	.key:nth-child(6) { --h: 300; }
	.key:nth-child(7) { --h: 330; }
	.key:nth-child(8) { --h: 10; }
	.key:nth-child(9) { --h: 35; }
	.key:nth-child(10) { --h: 50; }

	/* The idle cue: each key wears its note's colour as a strip along the bottom edge. */
	.key {
		box-shadow: inset 0 -0.35rem 0 hsl(var(--h) 75% 55%);
	}

	.key--on,
	.key:active {
		background: hsl(var(--h) 80% 55%);
		color: #04130f;
		transform: translateY(2px);
	}

	.voices {
		display: flex;
		gap: 0.4rem;
		margin-top: auto;
	}

	.voice {
		min-height: 2.75rem;
		padding: 0 0.85rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--muted);
		font: inherit;
		font-size: 0.82rem;
		cursor: pointer;
	}

	.voice[aria-checked='true'] {
		border-color: var(--accent);
		color: var(--accent-text);
		background: color-mix(in srgb, var(--accent) 10%, var(--panel));
	}
</style>
