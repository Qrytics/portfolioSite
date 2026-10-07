<script lang="ts">
	import { onDestroy } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { burstAt, centerOf } from './particles';
	import { PENTATONIC, sfx, tone } from '$lib/utils/synth';

	/** An 8-bit register you can flip by hand: switches drive LEDs, the readout decodes the byte. */
	let bits = $state([false, true, false, false, true, true, false, true]); // 0x4D, 'M'
	let show = $state<number | null>(null); // index lit by the light show
	let showTimer: ReturnType<typeof setInterval> | undefined;
	let root = $state<HTMLElement | undefined>();

	const value = $derived(bits.reduce((n, b) => (n << 1) | (b ? 1 : 0), 0));
	const binary = $derived(bits.map((b) => (b ? '1' : '0')).join(''));
	const ascii = $derived(value >= 33 && value <= 126 ? `'${String.fromCharCode(value)}'` : '—');
	const note = $derived(
		value === 0x4d ? "M — for Mario" : value === 255 ? 'all high. maximum power.' : value === 0 ? 'all low. lights out.' : value === 42 ? 'the answer.' : ''
	);

	function flip(i: number, e: MouseEvent) {
		bits[i] = !bits[i];
		sfx.toggle(bits[i]);
		if (value === 255) {
			sfx.arpeggio([523.25, 659.25, 783.99, 1046.5], 0.06, 'square');
			burstAt(...centerOf(e.currentTarget as HTMLElement));
		}
	}

	function setAll(on: boolean) {
		bits = bits.map(() => on);
		sfx.toggle(on);
	}

	function lightShow() {
		clearInterval(showTimer);
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let step = 0;
		const frames = 24;
		showTimer = setInterval(
			() => {
				// Bounce a single lit LED back and forth — a Knight Rider scanner, playing a scale.
				const pos = step % 14 < 8 ? step % 14 : 14 - (step % 14);
				show = pos;
				tone(PENTATONIC[pos + 1], { type: 'square', dur: 0.07, vol: 0.12 });
				step++;
				if (step >= frames) {
					clearInterval(showTimer);
					show = null;
					if (root) burstAt(...centerOf(root), { count: 10, spread: 70 });
				}
			},
			reduced ? 160 : 75
		);
	}

	onDestroy(() => clearInterval(showTimer));
</script>

<ToyCard title="8-bit register" cue="flip switches" lead>
	<div class="panel" bind:this={root}>
		<div class="leds" aria-hidden="true">
			{#each bits as on, i (i)}
				<span class="led" class:led--on={show === null ? on : show === i}></span>
			{/each}
		</div>
		<div class="switches" role="group" aria-label="Bit switches, most significant first">
			{#each bits as on, i (i)}
				<button
					type="button"
					class="switch"
					aria-pressed={on}
					aria-label="Bit {7 - i}"
					onclick={(e) => flip(i, e)}
				>
					<span class="switch__lever"></span>
					<span class="switch__label">{7 - i}</span>
				</button>
			{/each}
		</div>
	</div>

	<p class="readout" aria-live="polite">
		<span><span class="k">bin</span> 0b{binary}</span>
		<span><span class="k">dec</span> {value}</span>
		<span><span class="k">hex</span> 0x{value.toString(16).toUpperCase().padStart(2, '0')}</span>
		<span><span class="k">ascii</span> {ascii}</span>
	</p>
	{#if note}<p class="note">// {note}</p>{/if}

	<div class="row">
		<button type="button" class="btn" onclick={lightShow}>▶ light show</button>
		<button type="button" class="btn" onclick={() => setAll(true)}>all on</button>
		<button type="button" class="btn" onclick={() => setAll(false)}>clear</button>
	</div>
</ToyCard>

<style>
	.panel {
		display: grid;
		gap: 0.6rem;
		padding: 0.9rem;
		border: 1px solid var(--border-2);
		background: color-mix(in srgb, #0b3d2e 55%, var(--panel-2));
		background-image: radial-gradient(color-mix(in srgb, #ffffff 14%, transparent) 1px, transparent 1px);
		background-size: 12px 12px;
	}

	:global([data-theme='light']) .panel {
		background-color: #e7f3ee;
		background-image: radial-gradient(color-mix(in srgb, #14211f 16%, transparent) 1px, transparent 1px);
	}

	.leds,
	.switches {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: 0.4rem;
		justify-items: center;
	}

	.led {
		width: 1.15rem;
		height: 1.15rem;
		border-radius: 50%;
		border: 1px solid color-mix(in srgb, #000 40%, transparent);
		background: color-mix(in srgb, var(--hot) 22%, #2a0f0f);
		transition: background-color 0.08s, box-shadow 0.08s;
	}

	.led--on {
		background: var(--hot);
		box-shadow: 0 0 0.35rem var(--hot), 0 0 1rem color-mix(in srgb, var(--hot) 60%, transparent);
	}

	.switch {
		display: grid;
		justify-items: center;
		gap: 0.25rem;
		width: 100%;
		max-width: 2.75rem;
		min-height: 3.6rem;
		padding: 0.3rem 0;
		border: 1px solid color-mix(in srgb, #000 35%, var(--border));
		background: color-mix(in srgb, var(--panel) 75%, transparent);
		cursor: pointer;
	}

	.switch__lever {
		position: relative;
		width: 0.85rem;
		height: 1.8rem;
		border-radius: 0.45rem;
		background: color-mix(in srgb, var(--text) 18%, transparent);
	}

	.switch__lever::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0.15rem;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 50%;
		background: var(--muted);
		transform: translateX(-50%);
		transition: bottom 0.12s ease, background-color 0.12s;
	}

	.switch[aria-pressed='true'] .switch__lever::after {
		bottom: calc(100% - 0.8rem);
		background: var(--accent);
	}

	.switch__label {
		color: var(--muter);
		font-size: 0.62rem;
	}

	.switch:active {
		transform: translateY(1px);
	}

	.readout {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 1.2rem;
		font-size: 0.84rem;
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}

	.k {
		margin-right: 0.35rem;
		color: var(--muter);
	}

	.note {
		margin-top: -0.4rem;
		color: var(--accent-text);
		font-size: 0.8rem;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: auto;
	}

	.btn {
		min-height: 2.75rem;
		padding: 0 0.9rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--text);
		font: inherit;
		font-size: 0.82rem;
		cursor: pointer;
	}

	.btn:hover {
		border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
		color: var(--accent-text);
	}

	.btn:active {
		transform: translateY(1px);
	}
</style>
