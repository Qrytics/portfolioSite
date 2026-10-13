<script lang="ts">
	import { onMount } from 'svelte';
	import ToyCard from './ToyCard.svelte';
	import { sfx } from '$lib/utils/synth';

	/**
	 * Rubber-duck debugging, literally. The pond is a row of coupled springs (each column pulls on its
	 * neighbours, so a splash travels and reflects off the walls); the duck floats by buoyancy —
	 * upward force proportional to how deep it sits — and tilts with the slope under it.
	 *
	 * Grab and fling it, squeeze it for advice, or tap the water to throw bread: it paddles over and
	 * eats. It blinks, watches the pointer, flaps when airborne or held, and gets dizzy if thrown hard.
	 * The loop runs only while the pond is on screen, and not at all under reduced motion — the duck
	 * then sits still and still talks.
	 */
	const QUIPS = [
		'explain it to me. line by line.',
		'is it plugged in?',
		'what did you expect to happen?',
		'console.log is a perfectly valid debugger.',
		'it works on my machine. i am a duck.',
		'read the error message. the whole thing.',
		'off by one? it is always off by one.',
		'quack. (that means "check your null case")',
		'did you save the file?',
		'have you tried turning it off and on again?'
	];

	const uid = $props.id();

	// Pond: px, tuned per 60 Hz step.
	const GAP = 6;
	const K = 0.022; // column spring
	const DAMP = 0.018;
	const SPREAD = 0.2;
	const G = 0.42;
	const BUOY = 0.034; // accel per px submerged; rests ~12 px deep
	const BOTTOM = 19; // duck's keel below its centre
	const DEPTH = 38; // fully under

	let wrap = $state<HTMLElement | undefined>();
	let W = $state(600);
	let H = $state(240);
	const waterY = $derived(Math.round(H * 0.6));

	let h: Float32Array = new Float32Array(0);
	let v: Float32Array = new Float32Array(0);

	const duck = { x: 120, y: 0, vx: 0, vy: 0, rot: 0, facing: 1, sub: 0, deepest: 0 };
	type Crumb = { x: number; y: number; vy: number; floating: boolean; born: number };
	type Drop = { x: number; y: number; vx: number; vy: number };
	let crumbs: Crumb[] = [];
	let drops: Drop[] = [];

	let dragging = false;
	let moved = false;
	let grab = { dx: 0, dy: 0 };
	let target = { x: 0, y: 0 };
	let samples: { x: number; y: number; t: number }[] = [];
	let pointer: { x: number; y: number; t: number } | null = null;
	let hovering = false;

	// Moods are deadlines on the performance clock.
	const until = { blink: 0, surprised: 0, dizzy: 0, happy: 0, beak: 0, squash: 0, flap: 0, shake: 0 };
	let nextBlink = 0;
	let wander = { dir: 0, speed: 0, until: 0 };
	let wallHits: number[] = [];

	let quip = $state<string | null>(null);
	let quipIndex = 0;
	let quipTimer: ReturnType<typeof setTimeout> | undefined;
	let squeaks = $state(0);
	let eaten = $state(0);

	type View = {
		x: number;
		y: number;
		rot: number;
		facing: number;
		sx: number;
		sy: number;
		wing: number;
		feet: number;
		eye: 'open' | 'blink' | 'happy' | 'wide' | 'dizzy';
		px: number;
		py: number;
		beak: number;
		t: number;
		alert: boolean;
		back: string;
		front: string;
		line: string;
		crumbs: { x: number; y: number; o: number }[];
		drops: { x: number; y: number }[];
	};
	let view = $state.raw<View | null>(null);

	let raf = 0;
	let last = 0;
	let acc = 0;
	let onScreen = false;
	let reduced = false;

	// ── Pond ──────────────────────────────────────────────────────────────────
	function surface(x: number, t: number): number {
		const f = Math.min(Math.max(x / GAP, 0), h.length - 1);
		const i = Math.floor(f);
		const j = Math.min(i + 1, h.length - 1);
		const d = h.length ? h[i] + (h[j] - h[i]) * (f - i) : 0;
		const ambient = reduced ? 0 : 1.4 * Math.sin(x * 0.019 + t * 1.15) + 0.8 * Math.sin(x * 0.047 - t * 1.8);
		return waterY + d + ambient;
	}

	function poke(x: number, force: number, radius = 3) {
		const c = Math.round(x / GAP);
		for (let k = -radius; k <= radius; k++) {
			const i = c + k;
			if (i < 0 || i >= v.length) continue;
			v[i] += force * (1 - Math.abs(k) / (radius + 1));
		}
	}

	function stepWater() {
		const n = h.length;
		for (let i = 0; i < n; i++) {
			v[i] += -K * h[i] - DAMP * v[i];
			h[i] += v[i];
		}
		for (let pass = 0; pass < 3; pass++) {
			for (let i = 0; i < n; i++) {
				if (i > 0) {
					const d = SPREAD * (h[i] - h[i - 1]);
					v[i - 1] += d;
				}
				if (i < n - 1) {
					const d = SPREAD * (h[i] - h[i + 1]);
					v[i + 1] += d;
				}
			}
		}
	}

	function splash(x: number, y: number, n: number, power: number) {
		for (let i = 0; i < n; i++) {
			drops.push({
				x: x + (Math.random() - 0.5) * 36,
				y: y - 2,
				vx: (Math.random() - 0.5) * 4.5,
				vy: -(1.5 + Math.random() * power)
			});
		}
		if (drops.length > 60) drops = drops.slice(-60);
	}

	// ── Duck ──────────────────────────────────────────────────────────────────
	function say() {
		quip = QUIPS[quipIndex++ % QUIPS.length];
		clearTimeout(quipTimer);
		quipTimer = setTimeout(() => (quip = null), 3400);
	}

	function squeeze() {
		const now = performance.now();
		sfx.squeak();
		squeaks++;
		until.squash = now + 140;
		until.beak = now + 160;
		say();
		if (!reduced && duck.sub > 0) {
			duck.vy = -5.5;
			until.flap = now + 450;
		}
		render(now);
	}

	function quack() {
		const now = performance.now();
		sfx.quack();
		until.beak = now + 220;
		until.flap = now + 300;
		say();
		render(now);
	}

	function throwBread(x = 40 + Math.random() * (W - 80), y = 12) {
		const now = performance.now();
		if (reduced) {
			eaten++;
			until.happy = now + 900;
			sfx.pop();
			return render(now);
		}
		crumbs.push({ x, y, vy: 0, floating: false, born: now });
		if (crumbs.length > 5) crumbs.shift();
		sfx.whoosh();
	}

	function stepDuck(now: number, t: number) {
		const d = duck;
		const s = surface(d.x, t);
		const wasSub = d.sub;
		d.sub = Math.min(Math.max(d.y + BOTTOM - s, 0), DEPTH);
		d.deepest = Math.max(d.deepest, d.sub);
		const frac = d.sub / DEPTH;

		if (dragging) {
			d.vx = (target.x - d.x) * 0.3;
			d.vy = (target.y - d.y) * 0.3;
		} else {
			const flapping = now < until.flap || (d.sub === 0 && d.vy > 0);
			d.vy += flapping && d.sub === 0 ? G * 0.6 : G;
			d.vy -= d.sub * BUOY;
			d.vy *= 1 - 0.07 * frac;
			d.vx *= d.sub > 0 ? 1 - 0.025 * frac : 0.997;

			if (d.sub > 0 && wasSub > 0 && !flapping) swim(now);
		}

		// Hitting the water: a splash sized by the speed, and ripples that run along the pond.
		if (wasSub === 0 && d.sub > 0 && d.vy > 2.2) {
			poke(d.x, d.vy * 0.85, 5);
			splash(d.x, s, Math.min(20, Math.round(d.vy * 2)), d.vy * 0.55);
			sfx.splash(d.vy / 12);
			if (d.vy > 7) until.surprised = now + 700;
		}
		// While afloat the duck pushes the column under it, so bobbing makes its own ripples.
		if (d.sub > 0) poke(d.x, d.vy * 0.05 * frac + d.vx * 0.012, 3);

		d.x += d.vx;
		d.y += d.vy;

		const hit = (speed: number) => {
			if (speed > 6 && !dragging) {
				sfx.squeak();
				squeaks++;
				until.squash = now + 120;
				wallHits = [...wallHits.filter((x) => now - x < 1400), now];
				if (speed > 11 || wallHits.length >= 3) until.dizzy = now + 1800;
				else until.surprised = now + 500;
			}
		};
		const minX = 34;
		const maxX = W - 34;
		if (d.x < minX) {
			d.x = minX;
			hit(Math.abs(d.vx));
			d.vx = Math.abs(d.vx) * 0.5;
		} else if (d.x > maxX) {
			d.x = maxX;
			hit(Math.abs(d.vx));
			d.vx = -Math.abs(d.vx) * 0.5;
		}
		if (d.y < 42) {
			d.y = 42;
			hit(Math.abs(d.vy));
			d.vy = Math.abs(d.vy) * 0.4;
		} else if (d.y + BOTTOM > H - 3) {
			d.y = H - 3 - BOTTOM;
			d.vy = -Math.abs(d.vy) * 0.35;
		}

		// Surfacing after a dive: shake the water off.
		if (d.deepest > 30 && d.sub < 18 && d.sub > 0 && Math.abs(d.vy) < 1.5) {
			d.deepest = 0;
			until.shake = now + 520;
			until.flap = now + 520;
			splash(d.x, s, 8, 2.5);
		}

		if (dragging) {
			if (Math.abs(d.vx) > 0.6) d.facing = d.vx > 0 ? 1 : -1;
		} else if (Math.abs(d.vx) > 0.25) d.facing = d.vx > 0 ? 1 : -1;

		// Tilt: ride the slope when afloat, nose into the fall when airborne.
		let aim: number;
		if (d.sub > 0 && !dragging) {
			const slope = (surface(d.x + 14, t) - surface(d.x - 14, t)) / 28;
			aim = (Math.atan(slope) * 180) / Math.PI + d.vx * 2;
		} else aim = Math.max(-28, Math.min(28, d.vy * 2.2)) * d.facing + d.vx * 1.2;
		d.rot += (aim - d.rot) * 0.15;
	}

	/** Afloat and left alone: go for bread if there is any, otherwise potter about. */
	function swim(now: number) {
		const d = duck;
		const food = crumbs.filter((c) => c.floating).sort((a, b) => Math.abs(a.x - d.x) - Math.abs(b.x - d.x))[0];
		let want = 0;
		if (food) {
			const dx = food.x - d.x;
			if (Math.abs(dx) < 20) {
				crumbs = crumbs.filter((c) => c !== food);
				eaten++;
				until.happy = now + 1000;
				until.beak = now + 140;
				sfx.pop();
				poke(d.x + d.facing * 20, 0.8, 2);
			} else want = Math.sign(dx) * Math.min(1.9, Math.abs(dx) * 0.03 + 0.7);
		} else {
			if (now > wander.until) {
				const rest = Math.random() < 0.5;
				wander = {
					dir: rest ? 0 : Math.random() < 0.5 ? -1 : 1,
					speed: 0.45 + Math.random() * 0.4,
					until: now + (rest ? 2200 : 1800) + Math.random() * 2600
				};
			}
			if (d.x < 70) wander.dir = 1;
			else if (d.x > W - 70) wander.dir = -1;
			want = wander.dir * wander.speed;
		}
		d.vx += (want - d.vx) * 0.04;
	}

	function stepCrumbs(now: number, t: number) {
		for (const c of crumbs) {
			const s = surface(c.x, t) - 2;
			if (c.floating) {
				c.y = s;
				c.x += (surface(c.x - 6, t) - surface(c.x + 6, t)) * 0.03;
			} else {
				c.vy += 0.32;
				c.y += c.vy;
				if (c.y >= s) {
					c.floating = true;
					c.y = s;
					poke(c.x, 1.6, 2);
					splash(c.x, s, 3, 1.4);
					sfx.splash(0.2);
				}
			}
		}
		crumbs = crumbs.filter((c) => now - c.born < 30000);
	}

	function stepDrops(t: number) {
		for (const p of drops) {
			p.vy += 0.3;
			p.x += p.vx;
			p.y += p.vy;
		}
		drops = drops.filter((p) => {
			if (p.vy > 0 && p.y > surface(p.x, t)) {
				poke(p.x, 0.35, 1);
				return false;
			}
			return p.x > -10 && p.x < W + 10;
		});
	}

	// ── Render ────────────────────────────────────────────────────────────────
	function pondPaths(t: number) {
		let line = '';
		let back = '';
		for (let i = 0; i < h.length; i++) {
			const x = Math.min(i * GAP, W);
			const y = surface(x, t);
			const cmd = i ? 'L' : 'M';
			line += `${cmd}${x} ${y.toFixed(1)}`;
			// The far bank of the pond: the same swell, a little higher and a little behind.
			back += `${cmd}${x} ${(waterY + (y - waterY) * 0.6 - 5).toFixed(1)}`;
		}
		const close = `L${W} ${H}L0 ${H}Z`;
		return { line, front: line + close, back: back + close };
	}

	function render(now: number) {
		const d = duck;
		const t = now / 1000;
		if (!reduced && now > nextBlink) {
			until.blink = now + 130;
			nextBlink = now + 2200 + Math.random() * 3600;
			if (Math.random() < 0.25) setTimeout(() => (until.blink = performance.now() + 120), 230);
		}

		let eye: View['eye'] = 'open';
		if (now < until.dizzy) eye = 'dizzy';
		else if (now < until.surprised || dragging) eye = 'wide';
		else if (now < until.happy || hovering) eye = 'happy';
		else if (now < until.blink) eye = 'blink';

		// Pupils follow the pointer, or the bread, or look ahead.
		let lx = d.facing;
		let ly = 0.2;
		const food = crumbs[0];
		const look = pointer && now - pointer.t < 2500 ? pointer : food ? { x: food.x, y: food.y } : null;
		if (look) {
			const ex = d.x + 17 * d.facing;
			const ey = d.y - 29;
			const len = Math.hypot(look.x - ex, look.y - ey) || 1;
			lx = (look.x - ex) / len;
			ly = (look.y - ey) / len;
		}

		const flapping = now < until.flap || dragging || (d.sub === 0 && !reduced);
		const wing = flapping ? -18 + Math.sin(t * 38) * 30 : Math.sin(t * 2.2) * 3;
		const squash = now < until.squash ? 1 : 0;
		const shake = now < until.shake ? Math.sin(t * 60) * 9 * ((until.shake - now) / 520) : 0;
		const paddling = d.sub > 0 && Math.abs(d.vx) > 0.15;

		const pond = pondPaths(t);
		view = {
			x: d.x,
			y: d.y,
			rot: d.rot + shake,
			facing: d.facing,
			sx: 1 + squash * 0.08,
			sy: 1 - squash * 0.12,
			wing,
			feet: paddling ? Math.sin(t * 11) * 28 : Math.sin(t * 1.6) * 6,
			eye,
			px: lx * d.facing * 1.3,
			py: ly * 1.1,
			beak: now < until.beak ? 22 : 0,
			t,
			alert: now < until.surprised && now >= until.dizzy,
			back: pond.back,
			front: pond.front,
			line: pond.line,
			crumbs: crumbs.map((c) => ({ x: c.x, y: c.y, o: Math.min(1, (30000 - (now - c.born)) / 2000) })),
			drops: drops.map((p) => ({ x: p.x, y: p.y }))
		};
	}

	function frame(now: number) {
		raf = 0;
		acc += Math.min(now - (last || now), 50);
		last = now;
		const t = now / 1000;
		while (acc >= 1000 / 60) {
			acc -= 1000 / 60;
			stepWater();
			stepDuck(now, t);
			stepCrumbs(now, t);
			stepDrops(t);
		}
		render(now);
		schedule();
	}

	function schedule() {
		if (raf || reduced || !onScreen || document.hidden) return;
		raf = requestAnimationFrame(frame);
	}

	function resize() {
		if (!wrap) return;
		W = Math.max(240, Math.round(wrap.clientWidth));
		H = Math.max(180, Math.round(wrap.clientHeight));
		const n = Math.ceil(W / GAP) + 1;
		h = new Float32Array(n);
		v = new Float32Array(n);
		duck.x = Math.min(Math.max(duck.x, 40), W - 40);
		duck.y = waterY - BOTTOM + 12;
		duck.vy = 0;
		render(performance.now());
	}

	// ── Input ─────────────────────────────────────────────────────────────────
	function local(e: PointerEvent) {
		const r = wrap!.getBoundingClientRect();
		return { x: e.clientX - r.left, y: e.clientY - r.top };
	}

	function onDuck(p: { x: number; y: number }) {
		const cx = duck.x + 4 * duck.facing;
		const cy = duck.y - 10;
		return Math.hypot(p.x - cx, (p.y - cy) * 1.15) < 36;
	}

	function down(e: PointerEvent) {
		if (!wrap) return;
		const p = local(e);
		pointer = { ...p, t: performance.now() };
		if (!onDuck(p)) {
			// Underwater taps throw from the surface rather than spawning bread below it.
			throwBread(p.x, Math.min(p.y, surface(p.x, performance.now() / 1000) - 4));
			return;
		}
		e.preventDefault();
		(e.currentTarget as Element).setPointerCapture(e.pointerId);
		dragging = !reduced;
		moved = false;
		grab = { dx: p.x - duck.x, dy: p.y - duck.y };
		target = { x: duck.x, y: duck.y };
		samples = [{ ...p, t: performance.now() }];
		if (reduced) squeeze();
	}

	function move(e: PointerEvent) {
		if (!wrap) return;
		const p = local(e);
		const now = performance.now();
		// A fast swipe right past the duck startles it.
		if (!dragging && pointer && !reduced) {
			const speed = Math.hypot(p.x - pointer.x, p.y - pointer.y) / Math.max(now - pointer.t, 1);
			if (speed > 2.2 && Math.hypot(p.x - duck.x, p.y - duck.y) < 90 && now > until.surprised + 800) {
				until.surprised = now + 600;
				if (duck.sub > 0) duck.vy = -3.5;
			}
		}
		pointer = { ...p, t: now };
		hovering = !dragging && onDuck(p);
		wrap.style.cursor = dragging ? 'grabbing' : hovering ? 'grab' : '';
		if (!dragging) return;
		target = { x: p.x - grab.dx, y: p.y - grab.dy };
		if (Math.hypot(p.x - samples[0].x, p.y - samples[0].y) > 5) moved = true;
		samples = [...samples.slice(-5), { ...p, t: now }];
	}

	function up() {
		if (!dragging) return;
		dragging = false;
		if (!moved) return squeeze();
		const a = samples[0];
		const b = samples[samples.length - 1];
		const dt = Math.max(16, b.t - a.t);
		const cap = (n: number) => Math.max(-24, Math.min(24, n));
		duck.vx = cap(((b.x - a.x) / dt) * 16);
		duck.vy = cap(((b.y - a.y) / dt) * 16);
		until.flap = performance.now() + 500;
	}

	function onDuckKey(e: KeyboardEvent) {
		const now = performance.now();
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			squeeze();
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			e.preventDefault();
			if (reduced) return;
			duck.vx += e.key === 'ArrowLeft' ? -2.6 : 2.6;
			until.flap = now + 250;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (reduced || duck.sub === 0) return;
			duck.vy = -8;
			until.flap = now + 600;
		}
	}

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		nextBlink = performance.now() + 1500;
		resize();
		const ro = new ResizeObserver(resize);
		if (wrap) ro.observe(wrap);
		// Pauses the simulation off screen; it never makes a sound by itself.
		const io = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			last = 0;
			schedule();
		});
		if (wrap) io.observe(wrap);
		const onVis = () => {
			last = 0;
			schedule();
		};
		document.addEventListener('visibilitychange', onVis);
		return () => {
			ro.disconnect();
			io.disconnect();
			document.removeEventListener('visibilitychange', onVis);
			cancelAnimationFrame(raf);
			clearTimeout(quipTimer);
		};
	});

	const bubbleLeft = $derived(view ? Math.min(Math.max(view.x - 30, 6), W - 236) : 0);
	// Above the duck, unless it is too high up for that — then beside-and-below, never over it.
	const bubbleTop = $derived(view ? (view.y - 92 >= 6 ? view.y - 92 : view.y + 28) : 0);
</script>

<ToyCard n="06" title="debug duck" blurb="Squeeze for advice. Grab and fling it, or tap the water to throw bread." wide>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="pond"
		bind:this={wrap}
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={up}
		onpointerleave={() => {
			if (!dragging) {
				pointer = null;
				hovering = false;
			}
		}}
	>
		<svg class="scene" viewBox="0 0 {W} {H}" width={W} height={H} aria-hidden="true">
			<defs>
				<radialGradient id="{uid}-body" cx="0.4" cy="0.3" r="0.8">
					<stop offset="0" stop-color="#fff6b8" />
					<stop offset="0.5" stop-color="#ffd23f" />
					<stop offset="1" stop-color="#f0a800" />
				</radialGradient>
				<linearGradient id="{uid}-water" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" class="water-top" />
					<stop offset="1" class="water-deep" />
				</linearGradient>
			</defs>

			{#if view}
				<path class="water water--back" d={view.back} />

				{#each view.crumbs as c, i (i)}
					<g transform="translate({c.x} {c.y})" opacity={c.o}>
						<path class="crumb" d="M-4 -1.5 Q-3 -4 1 -3.5 Q4.5 -3 4 0 Q3.5 2.5 -1 2.2 Q-4.5 2 -4 -1.5 Z" />
					</g>
				{/each}

				<g transform="translate({view.x} {view.y}) rotate({view.rot}) scale({view.facing} 1)">
					<g transform="translate(0 {BOTTOM}) scale({view.sx} {view.sy}) translate(0 {-BOTTOM})">
						<!-- feet (behind the body, mostly under water) -->
						<g class="foot">
							<path transform="rotate({view.feet} -6 13)" d="M-6 13 L-13 22 L-8 20.5 L-5.5 23.5 L-2.5 19.5 L1.5 21 Z" />
							<path transform="rotate({-view.feet} 6 13)" d="M6 13 L-1 22 L4 20.5 L6.5 23.5 L9.5 19.5 L13.5 21 Z" />
						</g>
						<path class="duck" fill="url(#{uid}-body)" d="M-27 -6 C-33 -11 -36 -20 -31 -24 C-29 -16 -24 -12 -20 -11 Z" />
						<path
							class="duck"
							fill="url(#{uid}-body)"
							d="M-30 -2 C-30 -14 -20 -19 -6 -17 C4 -16 10 -12 17 -11 C28 -10 33 -2 31 6 C28 16 16 19 0 19 C-16 19 -28 15 -31 6 C-32 3 -31 0 -30 -2 Z"
						/>
						<path class="wing" transform="rotate({view.wing} 4 -7)" d="M-17 -5 C-11 -13 3 -13 9 -5 C7 3 -5 7 -15 3 C-18 1 -19 -2 -17 -5 Z" />
						<circle class="duck" fill="url(#{uid}-body)" cx="12" cy="-25" r="14" />
						<path class="beak" transform="rotate({view.beak} 24 -23)" d="M24 -23.5 C29 -23 35 -23 37.5 -22 C34 -18.5 28 -18.5 24 -20 Z" />
						<path class="beak" d="M23 -28 C31 -31 39 -28 39 -24.5 C34 -23 28 -23 24 -23.5 Z" />
						<ellipse class="cheek" cx="20" cy="-20.5" rx="3.2" ry="1.9" />
						{#if view.eye === 'blink'}
							<path class="lid" d="M14 -29 Q17 -27 20 -29" />
						{:else if view.eye === 'happy'}
							<path class="lid" d="M14 -28 Q17 -31.5 20 -28" />
						{:else if view.eye === 'dizzy'}
							<path class="lid" transform="rotate({view.t * 400} 17 -29)" d="M17 -29 m-3 0 a3 3 0 1 1 3 3 a2 2 0 1 1 -2 -2 a1 1 0 1 1 1 1" />
						{:else if view.eye === 'wide'}
							<circle class="sclera" cx="17" cy="-29.5" r="4.2" />
							<circle class="pupil" cx={17 + view.px} cy={-29.5 + view.py} r="1.9" />
						{:else}
							<circle class="pupil" cx={17 + view.px * 0.6} cy={-29 + view.py * 0.6} r="2.7" />
							<circle class="glint" cx={17.9 + view.px * 0.6} cy={-30 + view.py * 0.6} r="0.85" />
						{/if}
					</g>
				</g>

				{#if view.eye === 'dizzy'}
					{#each [0, 1, 2] as k (k)}
						<path
							class="star"
							transform="translate({view.x + 12 * view.facing + Math.cos(view.t * 5 + k * 2.1) * 15} {view.y - 46 + Math.sin(view.t * 5 + k * 2.1) * 4})"
							d="M0 -4 L1.1 -1.1 L4 0 L1.1 1.1 L0 4 L-1.1 1.1 L-4 0 L-1.1 -1.1 Z"
						/>
					{/each}
				{:else if view.alert}
					<text class="alert" x={view.x + 10 * view.facing} y={view.y - 46}>!</text>
				{/if}

				<path class="water water--front" fill="url(#{uid}-water)" d={view.front} />
				<path class="surface" d={view.line} />

				{#each view.drops as p, i (i)}
					<circle class="drop" cx={p.x} cy={p.y} r="1.8" />
				{/each}
			{/if}
		</svg>

		{#if quip}
			<p class="bubble" style="left: {bubbleLeft}px; top: {bubbleTop}px" aria-live="polite">{quip}</p>
		{/if}

		<!-- The duck's keyboard handle: an invisible button over it, so it is focusable and named. -->
		{#if view}
			<button
				type="button"
				class="handle"
				style="left: {view.x - 34}px; top: {view.y - 44}px"
				aria-label="Rubber duck. Enter to squeeze, arrow keys to paddle and hop."
				onkeydown={onDuckKey}
				onclick={(e) => {
					if (e.detail === 0) squeeze();
				}}
				tabindex="0"
			></button>
		{/if}
	</div>

	<div class="toy-row">
		<button type="button" class="toy-btn" onclick={quack}>quack</button>
		<button type="button" class="toy-btn" onclick={() => throwBread()}>throw bread</button>
		<span class="stats"><b>{squeaks}</b> squeak{squeaks === 1 ? '' : 's'} · <b>{eaten}</b> crumb{eaten === 1 ? '' : 's'} eaten</span>
	</div>
</ToyCard>

<style>
	.pond {
		position: relative;
		height: 15rem;
		overflow: hidden;
		border: 1px solid var(--border);
		background:
			radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, var(--accent) 7%, transparent), transparent 70%),
			color-mix(in srgb, #000 22%, var(--panel-2));
		touch-action: none;
		user-select: none;
		cursor: crosshair;
	}

	:global([data-theme='light']) .pond {
		background:
			radial-gradient(120% 90% at 50% 0%, color-mix(in srgb, #ffffff 70%, transparent), transparent 70%),
			color-mix(in srgb, #9fd3ff 25%, var(--panel-2));
	}

	.scene {
		position: absolute;
		inset: 0;
		display: block;
	}

	.water--back {
		fill: color-mix(in srgb, #2563eb 32%, var(--panel-2));
	}

	/* The front sheet is a tint over the duck's submerged half, not paint: the colour comes mostly
	   from the back sheet behind it. */
	.water-top {
		stop-color: color-mix(in srgb, #3b82f6 26%, transparent);
	}

	.water-deep {
		stop-color: color-mix(in srgb, #1e3a8a 62%, transparent);
	}

	:global([data-theme='light']) .water--back {
		fill: color-mix(in srgb, #3b82f6 35%, #ffffff);
	}

	:global([data-theme='light']) .water-top {
		stop-color: color-mix(in srgb, #60a5fa 30%, transparent);
	}

	:global([data-theme='light']) .water-deep {
		stop-color: color-mix(in srgb, #1d4ed8 55%, transparent);
	}

	.surface {
		fill: none;
		stroke: color-mix(in srgb, #bfdbfe 70%, transparent);
		stroke-width: 1.5;
	}

	.duck {
		stroke: #d08a00;
		stroke-width: 0.9;
	}

	.wing {
		fill: #f2b200;
		stroke: #c98400;
		stroke-width: 0.9;
	}

	.beak {
		fill: #ff8a1f;
		stroke: #d9650a;
		stroke-width: 0.8;
	}

	.foot path {
		fill: #ff8a1f;
		stroke: #d9650a;
		stroke-width: 0.8;
	}

	.cheek {
		fill: #ff8f7a;
		opacity: 0.5;
	}

	.pupil {
		fill: #141a1f;
	}

	.glint {
		fill: #ffffff;
	}

	.sclera {
		fill: #ffffff;
		stroke: #141a1f;
		stroke-width: 1;
	}

	.lid {
		fill: none;
		stroke: #141a1f;
		stroke-width: 1.6;
		stroke-linecap: round;
	}

	.crumb {
		fill: #d9a35b;
		stroke: #a8732f;
		stroke-width: 0.8;
	}

	.drop {
		fill: color-mix(in srgb, #bfdbfe 85%, transparent);
	}

	.star {
		fill: var(--warm);
	}

	.alert {
		fill: var(--hot);
		font-family: var(--font-mono);
		font-size: 18px;
		font-weight: 800;
		text-anchor: middle;
	}

	.bubble {
		position: absolute;
		z-index: 2;
		width: max-content;
		max-width: 14rem;
		padding: 0.45rem 0.65rem;
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		color: var(--text);
		font-size: 0.72rem;
		line-height: 1.4;
		pointer-events: none;
	}

	.handle {
		position: absolute;
		width: 68px;
		height: 66px;
		padding: 0;
		border: 0;
		background: none;
		opacity: 0;
		pointer-events: none;
	}

	.handle:focus-visible {
		opacity: 1;
		outline: 2px dashed var(--accent);
		outline-offset: 2px;
	}

	.stats {
		margin-left: auto;
		color: var(--muter);
		font-size: 0.74rem;
	}

	.stats b {
		color: var(--muted);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
</style>
