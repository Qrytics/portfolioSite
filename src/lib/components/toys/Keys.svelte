<script lang="ts">
	import { onMount } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { analyser, unlockAudio, violin, type Voice } from '$lib/utils/synth';

	/**
	 * Ten pentatonic notes from the violin's open G string up, so any run of them sounds intentional.
	 * Every note is bowed: it sustains while held, and dragging across the keys shifts pitch legato
	 * instead of re-bowing. Once the keys have focus, the home row plays them too.
	 */
	const NOTES = [
		{ name: 'G', oct: 3, f: 196.0, code: 'KeyA', key: 'a' },
		{ name: 'A', oct: 3, f: 220.0, code: 'KeyS', key: 's' },
		{ name: 'C', oct: 4, f: 261.63, code: 'KeyD', key: 'd' },
		{ name: 'D', oct: 4, f: 293.66, code: 'KeyF', key: 'f' },
		{ name: 'E', oct: 4, f: 329.63, code: 'KeyG', key: 'g' },
		{ name: 'G', oct: 4, f: 392.0, code: 'KeyH', key: 'h' },
		{ name: 'A', oct: 4, f: 440.0, code: 'KeyJ', key: 'j' },
		{ name: 'C', oct: 5, f: 523.25, code: 'KeyK', key: 'k' },
		{ name: 'D', oct: 5, f: 587.33, code: 'KeyL', key: 'l' },
		{ name: 'E', oct: 5, f: 659.25, code: 'Semicolon', key: ';' }
	];

	let board = $state<HTMLElement | undefined>();
	let canvas = $state<HTMLCanvasElement | undefined>();
	let held = $state<number[]>([]);
	let last = $state<number | null>(null);

	/** Live strokes: one per pointer (which glides) and one per held key. */
	const pointers = new Map<number, { voice: Voice; key: number; startTime: number }>();
	const keyVoices = new Map<string, { voice: Voice; key: number }>();
	let raf = 0;
	let quietSince = 0;

	function sync() {
		held = [...pointers.values(), ...keyVoices.values()].map((s) => s.key);
		if (held.length) quietSince = 0;
		else quietSince = performance.now();
		draw();
	}

	function targetKey(target: EventTarget | null): number | null {
		const el = (target as HTMLElement | null)?.closest<HTMLElement>('[data-key]');
		return el && board?.contains(el) ? Number(el.dataset.key) : null;
	}

	function keyAt(x: number, y: number): number | null {
		const el = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-key]');
		return el && board?.contains(el) ? Number(el.dataset.key) : null;
	}

	const MIN_HOLD_MS = 280;

	function onDown(e: PointerEvent) {
		unlockAudio();
		const i = targetKey(e.target) ?? keyAt(e.clientX, e.clientY);
		if (i === null) return;
		e.preventDefault();
		try {
			board?.focus({ preventScroll: true });
		} catch {}
		try {
			board?.setPointerCapture(e.pointerId);
		} catch {}
		const voice = violin(NOTES[i].f);
		last = i;
		if (voice) pointers.set(e.pointerId, { voice, key: i, startTime: performance.now() });
		sync();
	}

	function onMove(e: PointerEvent) {
		const stroke = pointers.get(e.pointerId);
		if (!stroke) return;
		const i = targetKey(e.target) ?? keyAt(e.clientX, e.clientY);
		if (i === null || i === stroke.key) return;
		stroke.voice.glide(NOTES[i].f);
		stroke.key = i;
		last = i;
		sync();
	}

	function onUp(e: PointerEvent) {
		const stroke = pointers.get(e.pointerId);
		if (!stroke) return;
		pointers.delete(e.pointerId);
		const elapsed = performance.now() - stroke.startTime;
		const remaining = Math.max(0, MIN_HOLD_MS - elapsed);
		if (remaining > 0) {
			setTimeout(() => {
				stroke.voice.release();
				sync();
			}, remaining);
		} else {
			stroke.voice.release();
			sync();
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.metaKey || e.ctrlKey || e.altKey) return;
		const codeMatch = (n: (typeof NOTES)[number]) =>
			n.code === e.code || n.key.toLowerCase() === e.key.toLowerCase();
		const i = NOTES.findIndex(codeMatch);
		if (i < 0) return;
		// Claimed even on repeat, so the pad's page-wide keys never also fire on S.
		e.preventDefault();
		if (e.repeat || keyVoices.has(e.code)) return;
		unlockAudio();
		const voice = violin(NOTES[i].f);
		last = i;
		if (voice) keyVoices.set(e.code, { voice, key: i });
		sync();
	}

	function onKeyUp(e: KeyboardEvent) {
		const stroke = keyVoices.get(e.code);
		if (!stroke) return;
		stroke.voice.release();
		keyVoices.delete(e.code);
		sync();
	}

	/** Enter/Space on a focused key: one short bow stroke. */
	function strum(i: number) {
		const voice = violin(NOTES[i].f);
		if (!voice) return;
		const code = `click-${i}`;
		keyVoices.get(code)?.voice.release();
		keyVoices.set(code, { voice, key: i });
		last = i;
		sync();
		setTimeout(() => {
			if (keyVoices.get(code)?.voice !== voice) return;
			voice.release();
			keyVoices.delete(code);
			sync();
		}, 450);
	}

	function releaseAll() {
		for (const s of [...pointers.values(), ...keyVoices.values()]) s.voice.release();
		pointers.clear();
		keyVoices.clear();
		sync();
	}

	/** The oscilloscope: runs only while a note sounds, plus a moment for the reverb tail. */
	function draw() {
		if (!raf && canvas) raf = requestAnimationFrame(frame);
	}

	let buf: Float32Array<ArrayBuffer> | null = null;

	function frame() {
		raf = 0;
		const c = canvas;
		const g = c?.getContext('2d');
		if (!c || !g) return;
		const dpr = window.devicePixelRatio || 1;
		const w = c.clientWidth;
		const h = c.clientHeight;
		if (c.width !== Math.round(w * dpr)) c.width = Math.round(w * dpr);
		if (c.height !== Math.round(h * dpr)) c.height = Math.round(h * dpr);
		g.setTransform(dpr, 0, 0, dpr, 0, 0);
		g.clearRect(0, 0, w, h);

		const styles = getComputedStyle(c);
		g.strokeStyle = styles.getPropertyValue('--text').trim() || '#ccc';
		g.globalAlpha = 0.09;
		g.lineWidth = 1;
		g.beginPath();
		for (let x = 0; x <= w; x += w / 8) {
			g.moveTo(Math.round(x) + 0.5, 0);
			g.lineTo(Math.round(x) + 0.5, h);
		}
		g.moveTo(0, Math.round(h / 2) + 0.5);
		g.lineTo(w, Math.round(h / 2) + 0.5);
		g.stroke();

		const an = analyser();
		g.globalAlpha = 1;
		g.strokeStyle = styles.getPropertyValue('--accent').trim() || '#36f2c2';
		g.lineWidth = 1.6;
		g.beginPath();
		if (an) {
			if (!buf || buf.length !== an.fftSize) buf = new Float32Array(an.fftSize);
			an.getFloatTimeDomainData(buf);
			// Trigger on a rising zero crossing so the waveform stands still instead of scrolling.
			let start = 0;
			for (let i = 1; i < buf.length / 2; i++) {
				if (buf[i - 1] < 0 && buf[i] >= 0) {
					start = i;
					break;
				}
			}
			const span = 900;
			for (let i = 0; i < span; i++) {
				const v = buf[start + i] ?? 0;
				const x = (i / (span - 1)) * w;
				const y = h / 2 - v * h * 1.4;
				if (i) g.lineTo(x, y);
				else g.moveTo(x, y);
			}
		} else {
			g.moveTo(0, h / 2);
			g.lineTo(w, h / 2);
		}
		g.stroke();

		if (held.length || performance.now() - quietSince < 2200) raf = requestAnimationFrame(frame);
	}

	onMount(() => {
		draw();
		return () => {
			cancelAnimationFrame(raf);
			releaseAll();
		};
	});

	const shown = $derived(last === null ? null : NOTES[last]);
</script>

<svelte:window onblur={releaseAll} />

<ToyCard n="05" title="violin" blurb="Bowed, not beeped. Hold a key to sustain; drag across for a legato slide." keys={['a', '…', ';']} wide>
	<div class="layout">
		<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
		<div
			class="board"
			role="group"
			aria-label="Violin keys. With focus here, keys A through semicolon play G3 to E5."
			tabindex="0"
			bind:this={board}
			onpointerdown={onDown}
			onpointermove={onMove}
			onpointerup={onUp}
			onpointercancel={onUp}
			onkeydown={onKeyDown}
			onkeyup={onKeyUp}
			onblur={(e) => {
				if (!board?.contains(e.relatedTarget as Node)) releaseAll();
			}}
		>
			{#each NOTES as note, i (i)}
				<button
					type="button"
					class="key"
					class:key--on={held.includes(i)}
					data-key={i}
					tabindex="-1"
					aria-label="{note.name}{note.oct}"
					onclick={() => {
						if (!held.includes(i)) strum(i);
					}}
				>
					<span class="key__led" aria-hidden="true"></span>
					<span class="key__name" aria-hidden="true">{note.name}<sub>{note.oct}</sub></span>
					<kbd class="key__kbd" aria-hidden="true">{note.key}</kbd>
				</button>
			{/each}
		</div>

		<div class="readout">
			<div class="note" aria-live="polite">
				{#if shown}
					<span class="note__name">{shown.name}<sub>{shown.oct}</sub></span>
					<span class="note__hz">{shown.f.toFixed(2)} Hz</span>
				{:else}
					<span class="note__name note__name--idle">—</span>
					<span class="note__hz">press a key</span>
				{/if}
			</div>
			<div class="scope"><canvas bind:this={canvas} aria-hidden="true"></canvas></div>
		</div>
	</div>
</ToyCard>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
	}

	@media (min-width: 900px) {
		.layout {
			grid-template-columns: minmax(0, 1.7fr) minmax(16rem, 1fr);
		}
	}

	.board {
		display: grid;
		grid-template-columns: repeat(10, minmax(0, 1fr));
		gap: 3px;
		height: 10.5rem;
		padding: 3px;
		border: 1px solid var(--border);
		background: color-mix(in srgb, #000 35%, var(--panel-2));
		touch-action: none;
		user-select: none;
		outline-offset: 3px;
	}

	:global([data-theme='light']) .board {
		background: color-mix(in srgb, #14211f 12%, var(--panel-2));
	}

	.key {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr auto;
		justify-items: center;
		padding: 0.45rem 0 0.4rem;
		border: 0;
		background: linear-gradient(180deg, color-mix(in srgb, var(--text) 4%, var(--panel)), var(--panel));
		color: var(--muted);
		font: inherit;
		cursor: pointer;
		touch-action: none;
		-webkit-tap-highlight-color: transparent;
		transition: background-color 0.1s;
	}

	.key:hover {
		background: color-mix(in srgb, var(--text) 7%, var(--panel));
	}

	.key__led {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--border);
		transition: background-color 0.08s, box-shadow 0.08s;
	}

	.key__name {
		align-self: end;
		color: var(--text);
		font-size: 0.82rem;
		font-weight: 600;
	}

	.key__name sub {
		color: var(--muter);
		font-size: 0.6rem;
		font-weight: 400;
	}

	.key__kbd {
		margin-top: 0.35rem;
		color: var(--muter);
		font: inherit;
		font-size: 0.6rem;
		text-transform: uppercase;
	}

	.key--on {
		background: color-mix(in srgb, var(--accent) 16%, var(--panel));
	}

	.key--on .key__led {
		background: var(--accent);
		box-shadow: 0 0 0.5rem var(--accent);
	}

	.readout {
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
		gap: 0.6rem;
		height: 10.5rem;
	}

	.note {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.note__name {
		color: var(--text);
		font-size: 1.7rem;
		font-weight: 600;
		line-height: 1;
	}

	.note__name sub {
		color: var(--muted);
		font-size: 0.85rem;
	}

	.note__name--idle {
		color: var(--muter);
	}

	.note__hz {
		color: var(--muted);
		font-size: 0.76rem;
		font-variant-numeric: tabular-nums;
	}

	/* The canvas is sized from its box every frame, so it must not be able to size the box: it sits
	   absolutely inside a wrapper whose height the grid fixes. */
	.scope {
		position: relative;
		min-height: 0;
		border: 1px solid var(--border);
		background: color-mix(in srgb, #000 30%, var(--panel-2));
	}

	.scope canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	:global([data-theme='light']) .scope {
		background: var(--panel-2);
	}

	@media (max-width: 480px) {
		.key__kbd {
			display: none;
		}
	}
</style>
