<script lang="ts">
	import { lockScroll, unlockScroll } from '$lib/utils/scrollLock';

	let { onclose }: { onclose: () => void } = $props();
	let canvasRef = $state<HTMLCanvasElement | undefined>(undefined);
	let closeRef = $state<HTMLButtonElement | undefined>(undefined);

	const CHARS = '01{}<>[]()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
	const FONT_SIZE = 14;
	const TARGET_FRAME_MS = 1000 / 20;

	$effect(() => {
		if (!canvasRef) return;

		const canvas = canvasRef;
		const context = canvas.getContext('2d');
		if (!context) return;
		// Re-declared with an explicit non-nullable type: `svelte-check` does not carry the null
		// narrowing on `context` into the nested draw functions below.
		const ctx: CanvasRenderingContext2D = context;

		let raf = 0;
		let lastFrame = 0;
		let dpr = 1;
		let drops: number[] = [];

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		/**
		 * Columns and drop offsets are rebuilt on every resize. They used to be computed once from
		 * the initial width, so rotating a phone left the rain covering the wrong fraction of the
		 * screen — too few columns in landscape, characters drawn off-canvas in portrait.
		 */
		function resize() {
			// Clamp DPR: a full-screen canvas at a phone's native 3× is 9× the fill rate for an
			// effect nobody inspects closely. 1.5 matches WaveCheckeredBackground.
			dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			const cssWidth = window.innerWidth;
			const cssHeight = window.innerHeight;

			canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
			canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
			canvas.style.width = `${cssWidth}px`;
			canvas.style.height = `${cssHeight}px`;

			const columns = Math.max(1, Math.floor(cssWidth / FONT_SIZE));
			// Preserve existing drop positions so a resize doesn't restart the whole effect.
			drops = Array.from({ length: columns }, (_, i) => drops[i] ?? Math.random() * -20);

			lastFrame = 0;
			// Repaint the backdrop so the previous frame's trails don't stretch across new pixels.
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		function paint(now: number) {
			if (lastFrame !== 0 && now - lastFrame < TARGET_FRAME_MS) {
				raf = requestAnimationFrame(paint);
				return;
			}
			lastFrame = now;

			const cssWidth = canvas.width / dpr;
			const cssHeight = canvas.height / dpr;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Low-alpha black over the previous frame is what produces the fading trails.
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, cssWidth, cssHeight);

			ctx.fillStyle = '#36f2c2';
			ctx.font = `${FONT_SIZE}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = CHARS[Math.floor(Math.random() * CHARS.length)];
				const y = drops[i] * FONT_SIZE;
				ctx.fillText(char, i * FONT_SIZE, y);

				if (y > cssHeight && Math.random() > 0.975) drops[i] = 0;
				drops[i]++;
			}

			raf = requestAnimationFrame(paint);
		}

		/**
		 * A full-screen flickering effect is a photosensitivity concern, not a taste one — under
		 * reduced motion it renders a single still frame and never animates. The old code had no
		 * guard at all, and used `setInterval(draw, 50)` rather than `rAF`, so it kept painting
		 * while the tab was in the background.
		 */
		function start() {
			cancelAnimationFrame(raf);
			raf = 0;
			if (reducedMotion.matches) {
				// One frame, densely seeded, so there is still something to look at.
				drops = drops.map(() => Math.random() * (window.innerHeight / FONT_SIZE));
				lastFrame = 0;
				paintOnce();
				return;
			}
			raf = requestAnimationFrame(paint);
		}

		function paintOnce() {
			const cssHeight = canvas.height / dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = '#36f2c2';
			ctx.font = `${FONT_SIZE}px monospace`;
			for (let i = 0; i < drops.length; i++) {
				const char = CHARS[Math.floor(Math.random() * CHARS.length)];
				ctx.fillText(char, i * FONT_SIZE, Math.min(drops[i] * FONT_SIZE, cssHeight));
			}
		}

		function onResize() {
			resize();
			start();
		}

		resize();
		start();

		window.addEventListener('resize', onResize);
		reducedMotion.addEventListener('change', start);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', onResize);
			reducedMotion.removeEventListener('change', start);
		};
	});

	// The button said "Press ESC or Click to Close" while neither handler existed. Both do now.
	$effect(() => {
		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				event.preventDefault();
				onclose();
				return;
			}
			// Minimal focus trap. The close button is the only focusable node in here, so cycling is
			// just "stay put" — but without this, Tab walks straight into the page the overlay covers.
			if (event.key === 'Tab' && closeRef) {
				event.preventDefault();
				closeRef.focus();
			}
		}
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});

	// The page behind a full-screen overlay must not scroll, and focus has to land somewhere inside
	// it — otherwise Tab walks straight into content the user can no longer see.
	$effect(() => {
		const previouslyFocused = document.activeElement as HTMLElement | null;
		lockScroll();
		closeRef?.focus({ preventScroll: true });
		return () => {
			unlockScroll();
			previouslyFocused?.focus?.({ preventScroll: true });
		};
	});
</script>

<div class="matrix-overlay" role="dialog" aria-modal="true" aria-label="Matrix effect">
	<canvas bind:this={canvasRef} class="matrix-canvas" aria-hidden="true"></canvas>
	<!--
		A real <button> rather than the `<div role="button" tabindex="0">` pattern used elsewhere in
		this repo: that injects a bogus tab stop inside the dialog. This one is hidden from the
		accessibility tree and unfocusable — it exists purely so a pointer tap anywhere closes the
		overlay, which is what the button copy has always claimed. The visible button below is the
		keyboard and screen-reader path.
	-->
	<button
		type="button"
		class="matrix-backdrop"
		tabindex="-1"
		aria-hidden="true"
		onclick={onclose}
	></button>
	<div class="matrix-content">
		<h2 class="matrix-title">Konami Code Activated</h2>
		<p class="matrix-subtitle">You've discovered the hidden feature!</p>
		<button bind:this={closeRef} type="button" class="matrix-close" onclick={onclose}>
			Press ESC or Click to Close
		</button>
	</div>
</div>

<style>
	.matrix-overlay {
		position: fixed;
		inset: 0;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
	}

	.matrix-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.matrix-backdrop {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
	}

	.matrix-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem;
		background: color-mix(in srgb, #000 80%, transparent);
		border: 2px solid var(--accent);
		box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 50%, transparent);
		max-width: 500px;
	}

	.matrix-title {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		color: var(--accent);
		text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 80%, transparent);
	}

	.matrix-subtitle {
		margin: 0 0 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: color-mix(in srgb, var(--text) 85%, transparent);
	}

	.matrix-close {
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.matrix-close:hover {
		background: color-mix(in srgb, var(--accent) 20%, transparent);
		box-shadow: 0 0 15px color-mix(in srgb, var(--accent) 50%, transparent);
		transform: translateY(-1px);
	}

	.matrix-close:active {
		transform: translateY(0);
	}
</style>
