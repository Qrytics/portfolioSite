<script lang="ts">
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/** Two inputs, one gate, one lamp. Tap the inputs; tap the gate to change what it is. */
	const GATES = {
		AND: (a: boolean, b: boolean) => a && b,
		OR: (a: boolean, b: boolean) => a || b,
		XOR: (a: boolean, b: boolean) => a !== b,
		NAND: (a: boolean, b: boolean) => !(a && b),
		NOR: (a: boolean, b: boolean) => !(a || b)
	} as const;
	type Gate = keyof typeof GATES;
	const names = Object.keys(GATES) as Gate[];

	let a = $state(false);
	let b = $state(true);
	let gate = $state<Gate>('AND');
	const q = $derived(GATES[gate](a, b));

	function after(prev: boolean) {
		if (q !== prev) sfx.blip(q);
		else sfx.click();
	}

	function toggle(which: 'a' | 'b') {
		const prev = q;
		if (which === 'a') a = !a;
		else b = !b;
		after(prev);
	}

	function nextGate() {
		const prev = q;
		gate = names[(names.indexOf(gate) + 1) % names.length];
		sfx.whoosh();
		if (q !== prev) sfx.blip(q);
	}
</script>

<ToyCard title="logic gate" cue="toggle inputs">
	<div class="circuit">
		<div class="inputs">
			<button type="button" class="in" aria-pressed={a} onclick={() => toggle('a')}>
				<span class="in__name">A</span><span class="in__val">{a ? 1 : 0}</span>
			</button>
			<button type="button" class="in" aria-pressed={b} onclick={() => toggle('b')}>
				<span class="in__name">B</span><span class="in__val">{b ? 1 : 0}</span>
			</button>
		</div>

		<svg class="wires" viewBox="0 0 40 100" preserveAspectRatio="none" aria-hidden="true">
			<path d="M0 25 H20 V45 H40" class:hot={a} />
			<path d="M0 75 H20 V55 H40" class:hot={b} />
		</svg>

		<button type="button" class="gate" onclick={nextGate} aria-label="Gate type {gate}. Change gate">
			<span class="gate__name">{gate}</span>
			<span class="gate__hint">tap to change</span>
		</button>

		<svg class="wires wires--out" viewBox="0 0 40 100" preserveAspectRatio="none" aria-hidden="true">
			<path d="M0 50 H40" class:hot={q} />
		</svg>

		<div class="lamp" class:lamp--on={q} role="status" aria-label="Output {q ? 1 : 0}">
			<span class="lamp__bulb"></span>
			<span class="lamp__val">Q = {q ? 1 : 0}</span>
		</div>
	</div>
	<p class="expr"><code>Q = A {gate} B = {a ? 1 : 0} {gate} {b ? 1 : 0} = {q ? 1 : 0}</code></p>
</ToyCard>

<style>
	.circuit {
		display: grid;
		grid-template-columns: auto 1.5rem minmax(0, 1fr) 1.25rem auto;
		align-items: center;
		min-height: 8rem;
	}

	.inputs {
		display: grid;
		gap: 0.75rem;
	}

	.in {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		min-width: 3.75rem;
		min-height: 2.75rem;
		padding: 0 0.6rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--muted);
		font: inherit;
		cursor: pointer;
	}

	.in[aria-pressed='true'] {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 14%, var(--panel));
		color: var(--accent-text);
	}

	.in__name {
		font-weight: 700;
	}

	.wires {
		width: 100%;
		height: 6.5rem;
		overflow: visible;
	}

	.wires path {
		fill: none;
		stroke: var(--border);
		stroke-width: 3;
		vector-effect: non-scaling-stroke;
		transition: stroke 0.12s;
	}

	.wires path.hot {
		stroke: var(--accent);
	}

	.gate {
		display: grid;
		place-items: center;
		align-content: center;
		gap: 0.15rem;
		min-height: 5rem;
		border: 2px solid var(--text);
		border-radius: 0 2.5rem 2.5rem 0;
		background: var(--panel);
		color: var(--text);
		font: inherit;
		cursor: pointer;
		transition: transform 0.1s;
	}

	.gate:hover {
		border-color: var(--accent);
	}

	.gate:active {
		transform: scale(0.97);
	}

	.gate__name {
		font-size: 1.05rem;
		font-weight: 700;
	}

	.gate__hint {
		color: var(--muter);
		font-size: 0.6rem;
	}

	.lamp {
		display: grid;
		justify-items: center;
		gap: 0.35rem;
	}

	.lamp__bulb {
		width: 2.1rem;
		height: 2.1rem;
		border-radius: 50%;
		border: 2px solid var(--border);
		background: var(--panel-2);
		transition: background-color 0.12s, box-shadow 0.12s;
	}

	.lamp--on .lamp__bulb {
		border-color: var(--warm);
		background: var(--warm);
		box-shadow: 0 0 0.6rem var(--warm), 0 0 1.6rem color-mix(in srgb, var(--warm) 55%, transparent);
	}

	.lamp__val {
		color: var(--muted);
		font-size: 0.72rem;
		white-space: nowrap;
	}

	.expr {
		margin-top: auto;
		font-size: 0.76rem;
	}

	.expr code {
		display: block;
		overflow-x: auto;
		white-space: nowrap;
	}
</style>
