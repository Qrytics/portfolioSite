<script lang="ts">
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/**
	 * A small combinational-logic bench: three inputs, up to six gates, one output. Each gate reads
	 * the inputs or any gate above it in the list, so the circuit is acyclic by construction and
	 * evaluates in one pass. The schematic is laid out from the netlist — a gate's column is its
	 * depth — and the truth table and expression are derived from the same netlist.
	 */
	type Kind = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'XNOR' | 'NOT';
	type In = 'A' | 'B' | 'C';
	interface Gate {
		id: string;
		kind: Kind;
		a: string;
		b: string;
	}

	const KINDS: Kind[] = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];
	const INPUTS: In[] = ['A', 'B', 'C'];
	const MAX_GATES = 6;
	const EVAL: Record<Kind, (a: boolean, b: boolean) => boolean> = {
		AND: (a, b) => a && b,
		OR: (a, b) => a || b,
		XOR: (a, b) => a !== b,
		NAND: (a, b) => !(a && b),
		NOR: (a, b) => !(a || b),
		XNOR: (a, b) => a === b,
		NOT: (a) => !a
	};

	const PRESETS: { name: string; gates: Omit<Gate, 'id'>[] }[] = [
		{ name: 'A·B + C', gates: [{ kind: 'AND', a: 'A', b: 'B' }, { kind: 'OR', a: 'g1', b: 'C' }] },
		{
			name: 'XOR from NANDs',
			gates: [
				{ kind: 'NAND', a: 'A', b: 'B' },
				{ kind: 'NAND', a: 'A', b: 'g1' },
				{ kind: 'NAND', a: 'g1', b: 'B' },
				{ kind: 'NAND', a: 'g2', b: 'g3' }
			]
		},
		{
			name: 'majority',
			gates: [
				{ kind: 'AND', a: 'A', b: 'B' },
				{ kind: 'AND', a: 'B', b: 'C' },
				{ kind: 'AND', a: 'A', b: 'C' },
				{ kind: 'OR', a: 'g1', b: 'g2' },
				{ kind: 'OR', a: 'g4', b: 'g3' }
			]
		},
		{
			name: '2:1 mux',
			gates: [
				{ kind: 'NOT', a: 'C', b: 'C' },
				{ kind: 'AND', a: 'A', b: 'g1' },
				{ kind: 'AND', a: 'B', b: 'C' },
				{ kind: 'OR', a: 'g2', b: 'g3' }
			]
		}
	];

	let inputs = $state<Record<In, boolean>>({ A: true, B: false, C: true });
	const initial = load(0);
	let gates = $state<Gate[]>(initial);
	let out = $state(initial[initial.length - 1].id);
	let preset = $state<number | null>(0);
	let nextId = initial.length + 1;

	function load(i: number): Gate[] {
		return PRESETS[i].gates.map((g, k) => ({ ...g, id: `g${k + 1}` }));
	}

	function evaluate(env: Record<In, boolean>): Map<string, boolean> {
		const v = new Map<string, boolean>(INPUTS.map((k) => [k, env[k]]));
		for (const g of gates) v.set(g.id, EVAL[g.kind](v.get(g.a) ?? false, v.get(g.b) ?? false));
		return v;
	}

	const values = $derived(evaluate(inputs));
	const q = $derived(values.get(out) ?? false);

	/** Every node the output actually depends on: the table only shows the inputs that matter. */
	const cone = $derived.by(() => {
		const byId = new Map(gates.map((g) => [g.id, g]));
		const seen = new Set<string>();
		const walk = (id: string) => {
			if (seen.has(id)) return;
			seen.add(id);
			const g = byId.get(id);
			if (!g) return;
			walk(g.a);
			if (g.kind !== 'NOT') walk(g.b);
		};
		walk(out);
		return seen;
	});
	const used = $derived(INPUTS.filter((k) => cone.has(k)));

	const table = $derived(
		Array.from({ length: 2 ** used.length }, (_, row) => {
			const env = { ...inputs };
			used.forEach((k, i) => (env[k] = Boolean((row >> (used.length - 1 - i)) & 1)));
			return { env, q: evaluate(env).get(out) ?? false, current: used.every((k) => env[k] === inputs[k]) };
		})
	);

	const expression = $derived.by(() => {
		const byId = new Map(gates.map((g) => [g.id, g]));
		const OP: Partial<Record<Kind, string>> = { AND: '·', OR: '+', XOR: '⊕', NAND: '·', NOR: '+', XNOR: '⊕' };
		const ex = (id: string, top = false): string => {
			const g = byId.get(id);
			if (!g) return id;
			if (g.kind === 'NOT') return `¬${ex(g.a)}`;
			const inner = `${ex(g.a)} ${OP[g.kind]} ${ex(g.b)}`;
			if (g.kind.startsWith('N') || g.kind === 'XNOR') return `¬(${inner})`;
			return top ? inner : `(${inner})`;
		};
		return ex(out, true);
	});

	// ── Schematic layout ──────────────────────────────────────────────────────
	const COL = 112;
	const ROW = 60;
	const PAD = 14;
	const IN_W = 38;
	const OUT_X: Record<Kind, number> = { AND: 40, OR: 42, XOR: 42, NAND: 47.5, NOR: 49.5, XNOR: 49.5, NOT: 41.5 };
	const PIN_X: Record<Kind, number> = { AND: 0, OR: 3, XOR: 3, NAND: 0, NOR: 3, XNOR: 3, NOT: 0 };

	const layout = $derived.by(() => {
		const depth = new Map<string, number>(INPUTS.map((k) => [k, 0]));
		for (const g of gates) {
			const d = Math.max(depth.get(g.a) ?? 0, g.kind === 'NOT' ? 0 : (depth.get(g.b) ?? 0)) + 1;
			depth.set(g.id, d);
		}
		const cols: string[][] = [INPUTS.slice()];
		for (const g of gates) (cols[depth.get(g.id)!] ??= []).push(g.id);
		for (let c = 0; c < cols.length; c++) cols[c] ??= [];
		const rows = Math.max(3, ...cols.map((c) => c.length));
		const h = rows * ROW + PAD * 2;
		const pos = new Map<string, { x: number; y: number; col: number }>();
		cols.forEach((ids, c) =>
			ids.forEach((id, k) => {
				const x = PAD + c * COL + (c ? 34 : 0);
				pos.set(id, { x, y: PAD + ((k + 0.5) * (h - PAD * 2)) / ids.length, col: c });
			})
		);
		const byId = new Map(gates.map((g) => [g.id, g]));
		const portOut = (id: string) => {
			const p = pos.get(id)!;
			const g = byId.get(id);
			return { x: p.x + (g ? OUT_X[g.kind] : IN_W), y: p.y };
		};

		// One wire per gate input, each given its own vertical channel in the gap before its column.
		type Wire = { from: string; tx: number; ty: number; col: number; d?: string };
		const wires: Wire[] = [];
		for (const g of gates) {
			const p = pos.get(g.id)!;
			const pins = g.kind === 'NOT' ? [[g.a, 0]] : [[g.a, -8], [g.b, 8]];
			for (const [src, dy] of pins as [string, number][]) wires.push({ from: src, tx: p.x - 8, ty: p.y + dy, col: p.col });
		}
		const lampX = PAD + cols.length * COL + 34;
		const outPos = pos.get(out) ?? pos.get(INPUTS[0])!;
		wires.push({ from: out, tx: lampX - 13, ty: outPos.y, col: cols.length });
		for (let c = 1; c <= cols.length; c++) {
			const inCol = wires.filter((w) => w.col === c).sort((a, b) => a.ty - b.ty);
			const gapL = PAD + (c - 1) * COL + (c - 1 ? 34 : 0) + 52;
			const gapR = PAD + c * COL + 34 - 12;
			inCol.forEach((w, k) => {
				const s = portOut(w.from);
				const cx = gapL + ((k + 1) * (gapR - gapL)) / (inCol.length + 1);
				w.d = Math.abs(s.y - w.ty) < 0.5 ? `M${s.x} ${s.y} H${w.tx}` : `M${s.x} ${s.y} H${cx} V${w.ty} H${w.tx}`;
			});
		}
		return { pos, wires, w: lampX + 40, h, lampX, lampY: outPos.y, portOut };
	});

	// ── Editing ───────────────────────────────────────────────────────────────
	function settle(prev: boolean) {
		if (q !== prev) sfx.blip(q);
	}

	function toggleInput(k: In) {
		const prev = q;
		inputs[k] = !inputs[k];
		sfx.toggle(inputs[k]);
		settle(prev);
	}

	function setRow(env: Record<In, boolean>) {
		const prev = q;
		inputs = { ...env };
		sfx.click();
		settle(prev);
	}

	function cycle(g: Gate) {
		const prev = q;
		g.kind = KINDS[(KINDS.indexOf(g.kind) + 1) % KINDS.length];
		preset = null;
		sfx.click();
		settle(prev);
	}

	function edit(g: Gate, field: 'kind' | 'a' | 'b', value: string) {
		const prev = q;
		if (field === 'kind') g.kind = value as Kind;
		else g[field] = value;
		preset = null;
		sfx.click();
		settle(prev);
	}

	function addGate() {
		if (gates.length >= MAX_GATES) return;
		const prev = q;
		const id = `g${nextId++}`;
		gates.push({ id, kind: 'AND', a: out, b: INPUTS.find((k) => !cone.has(k)) ?? 'C' });
		out = id;
		preset = null;
		sfx.pop();
		settle(prev);
	}

	function removeGate(id: string) {
		if (gates.length <= 1) return;
		const prev = q;
		const gone = gates.find((g) => g.id === id)!;
		gates = gates.filter((g) => g.id !== id);
		// Anything wired to the removed gate takes over its first input, so the netlist stays valid.
		for (const g of gates) {
			if (g.a === id) g.a = gone.a;
			if (g.b === id) g.b = gone.a;
		}
		if (out === id) out = gates[gates.length - 1].id;
		preset = null;
		sfx.blip(false);
		settle(prev);
	}

	function loadPreset(i: number) {
		const prev = q;
		gates = load(i);
		nextId = gates.length + 1;
		out = gates[gates.length - 1].id;
		preset = i;
		sfx.whoosh();
		settle(prev);
	}

	const sources = (g: Gate) => [...INPUTS, ...gates.slice(0, gates.indexOf(g)).map((x) => x.id)];
	const onKeyActivate = (fn: () => void) => (e: KeyboardEvent) => {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		fn();
	};
</script>

{#snippet shape(kind: Kind)}
	{#if kind === 'AND' || kind === 'NAND'}
		<path class="body" d="M0 -16 H24 A16 16 0 0 1 24 16 H0 Z" />
	{:else if kind === 'NOT'}
		<path class="body" d="M0 -14 L34 0 L0 14 Z" />
	{:else}
		<path class="body" d="M0 -16 Q8 0 0 16 Q26 16 42 0 Q26 -16 0 -16 Z" />
		{#if kind === 'XOR' || kind === 'XNOR'}<path class="line" d="M-5 -16 Q3 0 -5 16" />{/if}
	{/if}
	{#if kind === 'NAND'}<circle class="body" cx="43.75" r="3.75" />{/if}
	{#if kind === 'NOR' || kind === 'XNOR'}<circle class="body" cx="45.75" r="3.75" />{/if}
	{#if kind === 'NOT'}<circle class="body" cx="37.75" r="3.75" />{/if}
{/snippet}

<ToyCard n="04" title="logic bench" blurb="Chain up to six gates. Click a gate to change its type, an input to flip it." lead>
	<div class="bench">
		<svg class="schematic" viewBox="0 0 {layout.w} {layout.h}" style="max-width: {layout.w * 1.35}px" role="group" aria-label="Circuit schematic">
			{#each layout.wires as w, i (i)}
				<path class="wire" class:wire--hot={values.get(w.from)} d={w.d} />
			{/each}

			{#each INPUTS as k (k)}
				{@const p = layout.pos.get(k)!}
				<g
					class="node node--in"
					class:node--hot={inputs[k]}
					class:node--unused={!cone.has(k)}
					transform="translate({p.x} {p.y})"
					role="button"
					tabindex="0"
					aria-pressed={inputs[k]}
					aria-label="Input {k}, {inputs[k] ? 1 : 0}"
					onclick={() => toggleInput(k)}
					onkeydown={onKeyActivate(() => toggleInput(k))}
				>
					<rect x="0" y="-13" width={IN_W} height="26" rx="2" />
					<text x="8" y="0.5" class="node__name">{k}</text>
					<text x="29" y="0.5" class="node__val">{inputs[k] ? 1 : 0}</text>
				</g>
			{/each}

			{#each gates as g (g.id)}
				{@const p = layout.pos.get(g.id)!}
				{@const hot = values.get(g.id)}
				<g
					class="gate"
					class:gate--hot={hot}
					class:gate--out={g.id === out}
					transform="translate({p.x} {p.y})"
					role="button"
					tabindex="0"
					aria-label="{g.id}: {g.kind}, output {hot ? 1 : 0}. Change type"
					onclick={() => cycle(g)}
					onkeydown={onKeyActivate(() => cycle(g))}
				>
					<rect class="hit" x="-10" y="-22" width="64" height="44" />
					{#if g.kind === 'NOT'}
						<path class="pin" d="M-8 0 H{PIN_X[g.kind]}" />
					{:else}
						<path class="pin" d="M-8 -8 H{PIN_X[g.kind]} M-8 8 H{PIN_X[g.kind]}" />
					{/if}
					{@render shape(g.kind)}
					<text class="gate__kind" x={g.kind === 'NOT' ? 12 : 17} y="0.5">{g.kind}</text>
					<text class="gate__id" x="0" y="-21">{g.id}</text>
				</g>
			{/each}

			<g class="lamp" class:lamp--on={q} transform="translate({layout.lampX} {layout.lampY})" aria-label="Output Q, {q ? 1 : 0}" role="img">
				<circle r="12" class="lamp__glow" />
				<circle r="9" class="lamp__bulb" />
				<text x="0" y="26" class="lamp__label">Q={q ? 1 : 0}</text>
			</g>
		</svg>

		<div class="side">
			<p class="expr" aria-live="polite"><span class="k">Q =</span> {expression}</p>
			<table class="tt">
				<caption class="sr-only">Truth table. Select a row to set the inputs.</caption>
				<thead>
					<tr>
						{#each used as k (k)}<th scope="col">{k}</th>{/each}
						<th scope="col" class="tt__q">Q</th>
					</tr>
				</thead>
				<tbody>
					{#each table as row, r (r)}
						<tr class:tt__now={row.current} onclick={() => setRow(row.env)}>
							{#each used as k (k)}<td>{row.env[k] ? 1 : 0}</td>{/each}
							<td class="tt__q" class:tt__one={row.q}>{row.q ? 1 : 0}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="netlist">
		<ol class="gates">
			{#each gates as g (g.id)}
				<li class="row">
					<span class="row__id">{g.id}</span>
					<span class="eq">=</span>
					<select aria-label="{g.id} type" value={g.kind} onchange={(e) => edit(g, 'kind', e.currentTarget.value)}>
						{#each KINDS as k (k)}<option value={k}>{k}</option>{/each}
					</select>
					<span class="paren">(</span>
					<select aria-label="{g.id} first input" value={g.a} onchange={(e) => edit(g, 'a', e.currentTarget.value)}>
						{#each sources(g) as s (s)}<option value={s}>{s}</option>{/each}
					</select>
					{#if g.kind !== 'NOT'}
						<span class="paren">,</span>
						<select aria-label="{g.id} second input" value={g.b} onchange={(e) => edit(g, 'b', e.currentTarget.value)}>
							{#each sources(g) as s (s)}<option value={s}>{s}</option>{/each}
						</select>
					{/if}
					<span class="paren">)</span>
					<button type="button" class="x" aria-label="Remove {g.id}" disabled={gates.length <= 1} onclick={() => removeGate(g.id)}>×</button>
				</li>
			{/each}
		</ol>
		<div class="toy-row">
			<button type="button" class="toy-btn" disabled={gates.length >= MAX_GATES} onclick={addGate}>+ gate</button>
			<label class="outsel">
				<span>Q from</span>
				<select value={out} onchange={(e) => ((out = e.currentTarget.value), (preset = null), sfx.click())}>
					{#each gates as g (g.id)}<option value={g.id}>{g.id}</option>{/each}
				</select>
			</label>
			<span class="presets" role="group" aria-label="Example circuits">
				{#each PRESETS as p, i (p.name)}
					<button type="button" class="toy-btn" aria-pressed={preset === i} onclick={() => loadPreset(i)}>{p.name}</button>
				{/each}
			</span>
		</div>
	</div>
</ToyCard>

<style>
	.bench {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
	}

	@media (min-width: 900px) {
		.bench {
			grid-template-columns: minmax(0, 1fr) 11.5rem;
		}
	}

	.schematic {
		display: block;
		width: 100%;
		height: auto;
		padding: 0.25rem 0;
		background-image: radial-gradient(color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px);
		background-size: 14px 14px;
		overflow: visible;
		font-family: var(--font-mono);
	}

	.wire {
		fill: none;
		stroke: color-mix(in srgb, var(--text) 28%, transparent);
		stroke-width: 1.6;
		transition: stroke 0.12s;
	}

	.wire--hot {
		stroke: var(--accent);
		stroke-width: 2;
	}

	.node,
	.gate {
		cursor: pointer;
		outline: none;
	}

	.node rect {
		fill: var(--panel-2);
		stroke: var(--border);
		stroke-width: 1.2;
	}

	.node--hot rect {
		fill: color-mix(in srgb, var(--accent) 16%, var(--panel));
		stroke: var(--accent);
	}

	.node--unused {
		opacity: 0.45;
	}

	.node text {
		dominant-baseline: middle;
		font-size: 12px;
	}

	.node__name {
		fill: var(--text);
		font-weight: 700;
	}

	.node__val {
		fill: var(--muted);
		text-anchor: middle;
	}

	.node--hot .node__val {
		fill: var(--accent-text);
	}

	.gate .hit {
		fill: transparent;
	}

	.gate .pin {
		stroke: color-mix(in srgb, var(--text) 28%, transparent);
		stroke-width: 1.6;
	}

	.gate :global(.body) {
		fill: var(--panel);
		stroke: var(--text);
		stroke-width: 1.6;
		stroke-linejoin: round;
		transition: fill 0.12s, stroke 0.12s;
	}

	.gate :global(.line) {
		fill: none;
		stroke: var(--text);
		stroke-width: 1.6;
	}

	.gate--hot :global(.body) {
		fill: color-mix(in srgb, var(--accent) 12%, var(--panel));
	}

	.gate:hover :global(.body),
	.gate:focus-visible :global(.body) {
		stroke: var(--accent);
	}

	.gate:focus-visible .hit,
	.node:focus-visible rect {
		stroke: var(--accent);
		stroke-dasharray: 3 3;
	}

	.gate__kind {
		fill: var(--text);
		font-size: 8.5px;
		font-weight: 700;
		text-anchor: middle;
		dominant-baseline: middle;
		pointer-events: none;
	}

	.gate__id {
		fill: var(--muter);
		font-size: 9px;
	}

	.gate--out .gate__id {
		fill: var(--accent-text);
	}

	.lamp__glow {
		fill: transparent;
		transition: fill 0.15s;
	}

	.lamp__bulb {
		fill: var(--panel-2);
		stroke: var(--border);
		stroke-width: 1.6;
		transition: fill 0.15s, stroke 0.15s;
	}

	.lamp--on .lamp__glow {
		fill: color-mix(in srgb, var(--warm) 30%, transparent);
	}

	.lamp--on .lamp__bulb {
		fill: var(--warm);
		stroke: var(--warm);
	}

	.lamp__label {
		fill: var(--muted);
		font-size: 10px;
		text-anchor: middle;
	}

	.side {
		display: grid;
		gap: 0.7rem;
		align-content: start;
	}

	.expr {
		color: var(--text);
		font-size: 0.76rem;
		line-height: 1.5;
		overflow-wrap: anywhere;
	}

	.expr .k {
		color: var(--muter);
	}

	.tt {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.74rem;
		font-variant-numeric: tabular-nums;
		text-align: center;
	}

	.tt th {
		padding: 0.2rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--muted);
		font-weight: 600;
	}

	.tt td {
		padding: 0.18rem 0;
		color: var(--muted);
		cursor: pointer;
	}

	.tt .tt__q {
		border-left: 1px solid var(--border);
		color: var(--text);
	}

	.tt__one {
		color: var(--warm) !important;
	}

	.tt tbody tr:hover td {
		background: color-mix(in srgb, var(--text) 5%, transparent);
	}

	.tt__now td {
		background: color-mix(in srgb, var(--accent) 14%, transparent) !important;
		color: var(--text);
	}

	.netlist {
		display: grid;
		gap: 0.6rem;
		margin-top: auto;
		padding-top: 0.8rem;
		border-top: 1px solid var(--border-2);
	}

	.gates {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
		gap: 0.35rem 1rem;
		list-style: none;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.76rem;
	}

	.row__id {
		min-width: 1.5rem;
		color: var(--accent-text);
	}

	.eq,
	.paren {
		color: var(--muter);
	}

	select {
		min-height: 1.9rem;
		padding: 0 0.3rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--text);
		font: inherit;
		font-size: 0.74rem;
		cursor: pointer;
	}

	select:hover {
		border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
	}

	.x {
		display: grid;
		place-items: center;
		width: 1.9rem;
		height: 1.9rem;
		margin-left: auto;
		border: 1px solid transparent;
		background: none;
		color: var(--muter);
		font: inherit;
		cursor: pointer;
	}

	.x:hover:not(:disabled) {
		border-color: var(--border);
		color: var(--hot);
	}

	.x:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.outsel {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--muted);
		font-size: 0.76rem;
	}

	.presets {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-left: auto;
	}

	@media (pointer: coarse) {
		select,
		.x {
			min-height: 2.75rem;
		}

		.x {
			width: 2.75rem;
		}
	}
</style>
