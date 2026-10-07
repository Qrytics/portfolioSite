<script lang="ts">
	import { onMount } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/**
	 * Rubber-duck debugging, literally. Drag and fling the duck around its tank (gravity, bounces,
	 * squeaks on hard landings); tap it and it offers the only debugging advice a duck can give.
	 * The physics loop only runs while the duck is moving, and not at all under reduced motion.
	 */
	const QUIPS = [
		'have you tried explaining it to me line by line?',
		'is it plugged in?',
		'what did you expect to happen?',
		'console.log is a perfectly valid debugger.',
		'it works on my machine. i am a duck.',
		'read the error message. the whole thing.',
		'off by one? it is always off by one.',
		'quack. (that means "check your null case")'
	];
	const SIZE = 64;

	let tank = $state<HTMLElement | undefined>();
	let x = $state(40);
	let y = $state(0);
	let rot = $state(0);
	let facing = $state(1);
	let quip = $state<string | null>(null);
	let squeaks = $state(0);

	let vx = 0;
	let vy = 0;
	let raf = 0;
	let dragging = false;
	let moved = false;
	let grab = { dx: 0, dy: 0 };
	let samples: { x: number; y: number; t: number }[] = [];
	let quipIndex = 0;
	let quipTimer: ReturnType<typeof setTimeout> | undefined;

	const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function bounds() {
		const r = tank!.getBoundingClientRect();
		return { w: r.width - SIZE, h: r.height - SIZE, left: r.left, top: r.top };
	}

	function squeak() {
		sfx.squeak();
		squeaks++;
	}

	function say() {
		quip = QUIPS[quipIndex++ % QUIPS.length];
		clearTimeout(quipTimer);
		quipTimer = setTimeout(() => (quip = null), 3200);
	}

	function step() {
		const b = bounds();
		vy += 0.6; // gravity
		vx *= 0.995;
		x += vx;
		y += vy;
		rot += vx * 1.5;
		let impact = 0;
		if (x < 0) {
			x = 0;
			impact = Math.abs(vx);
			vx = -vx * 0.7;
		} else if (x > b.w) {
			x = b.w;
			impact = Math.abs(vx);
			vx = -vx * 0.7;
		}
		if (y > b.h) {
			y = b.h;
			impact = Math.max(impact, Math.abs(vy));
			vy = -vy * 0.55;
			vx *= 0.85;
			rot *= 0.6;
		} else if (y < 0) {
			y = 0;
			impact = Math.max(impact, Math.abs(vy));
			vy = -vy * 0.6;
		}
		if (impact > 6) squeak();
		if (Math.abs(vx) > 0.3) facing = vx > 0 ? 1 : -1;

		const resting = y >= b.h - 0.5 && Math.abs(vy) < 1 && Math.abs(vx) < 0.15;
		if (resting) {
			vx = vy = 0;
			rot = 0;
			raf = 0;
			return;
		}
		raf = requestAnimationFrame(step);
	}

	function kick() {
		if (!raf && !reduced()) raf = requestAnimationFrame(step);
	}

	function down(e: PointerEvent) {
		if (!tank) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		cancelAnimationFrame(raf);
		raf = 0;
		dragging = true;
		moved = false;
		const b = bounds();
		grab = { dx: e.clientX - b.left - x, dy: e.clientY - b.top - y };
		samples = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
	}

	function move(e: PointerEvent) {
		if (!dragging || reduced()) return;
		const b = bounds();
		const nx = Math.min(Math.max(e.clientX - b.left - grab.dx, 0), b.w);
		const ny = Math.min(Math.max(e.clientY - b.top - grab.dy, 0), b.h);
		if (Math.abs(nx - x) + Math.abs(ny - y) > 2) moved = true;
		if (nx !== x) facing = nx > x ? 1 : -1;
		x = nx;
		y = ny;
		samples = [...samples.slice(-4), { x: e.clientX, y: e.clientY, t: performance.now() }];
	}

	function up() {
		if (!dragging) return;
		dragging = false;
		if (!moved) {
			// A tap: squeak, hop and talk.
			squeak();
			say();
			vy = -9;
			vx = (Math.random() - 0.5) * 6;
			kick();
			return;
		}
		const a = samples[0];
		const b = samples[samples.length - 1];
		const dt = Math.max(16, b.t - a.t);
		vx = ((b.x - a.x) / dt) * 16;
		vy = ((b.y - a.y) / dt) * 16;
		kick();
	}

	function keyboardSqueak() {
		squeak();
		say();
		vy = -9;
		vx = (Math.random() - 0.5) * 8;
		kick();
	}

	$effect(() => {
		// Start resting on the floor once the tank has a size.
		if (tank) y = bounds().h;
	});

	// Cleanup via `onMount`'s return, not `onDestroy`: that also runs during SSR, where
	// `cancelAnimationFrame` doesn't exist.
	onMount(() => () => {
		cancelAnimationFrame(raf);
		clearTimeout(quipTimer);
	});
</script>

<ToyCard title="debug duck" cue="drag & fling" wide>
	<div class="tank" bind:this={tank}>
		<span class="water" aria-hidden="true"></span>
		{#if quip}
			<p class="bubble" style="left: clamp(4px, {x - 40}px, calc(100% - 13.5rem)); top: {Math.max(y - 54, 4)}px" aria-live="polite">{quip}</p>
		{/if}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="duck"
			style="transform: translate({x}px, {y}px) rotate({rot}deg) scaleX({facing})"
			onpointerdown={down}
			onpointermove={move}
			onpointerup={up}
			onpointercancel={up}
		>
			<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
				<ellipse cx="30" cy="42" rx="24" ry="15" fill="#ffd23f" />
				<path d="M8 38 Q2 30 10 32 Z" fill="#ffc300" />
				<circle cx="40" cy="22" r="13" fill="#ffd23f" />
				<path d="M51 22 Q62 24 52 29 Z" fill="#ff8c1a" />
				<circle cx="44" cy="19" r="2.4" fill="#14211f" />
				<path d="M20 42 Q30 50 40 42" fill="none" stroke="#e6b400" stroke-width="2" />
			</svg>
		</div>
	</div>
	<div class="foot">
		<button type="button" class="btn" onclick={keyboardSqueak}>🦆 squeak</button>
		<span class="tally">{squeaks} squeak{squeaks === 1 ? '' : 's'}</span>
	</div>
</ToyCard>

<style>
	.tank {
		position: relative;
		height: 10rem;
		overflow: hidden;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, color-mix(in srgb, #3b82f6 10%, var(--panel-2)), color-mix(in srgb, #3b82f6 22%, var(--panel-2)));
		touch-action: none;
	}

	.water {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1.6rem;
		background: color-mix(in srgb, #3b82f6 30%, transparent);
		border-top: 2px solid color-mix(in srgb, #3b82f6 55%, transparent);
	}

	.duck {
		position: absolute;
		top: 0;
		left: 0;
		width: 64px;
		height: 64px;
		cursor: grab;
		touch-action: none;
		user-select: none;
		will-change: transform;
		filter: drop-shadow(0 4px 6px color-mix(in srgb, #000 25%, transparent));
	}

	.duck:active {
		cursor: grabbing;
	}

	.bubble {
		position: absolute;
		z-index: 2;
		max-width: 13rem;
		padding: 0.4rem 0.6rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--text);
		font-size: 0.72rem;
		line-height: 1.4;
		pointer-events: none;
	}

	.foot {
		display: flex;
		align-items: center;
		gap: 0.75rem;
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
	}

	.tally {
		color: var(--muter);
		font-size: 0.76rem;
	}
</style>
