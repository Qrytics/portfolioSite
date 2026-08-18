<script lang="ts">
	let scrollProgress = $state(0);

	$effect(() => {
		/**
		 * `maxScroll` is cached rather than recomputed per scroll event. Reading
		 * `documentElement.scrollHeight` forces a synchronous layout, and the old handler did it on
		 * every single scroll tick — the most expensive thing that could run during a phone flick.
		 * A `ResizeObserver` on the document element refreshes it only when the page actually
		 * changes height (image loads, card expansion, orientation change).
		 */
		let maxScroll = 0;
		let frame = 0;

		function measure() {
			maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			paint();
		}

		function paint() {
			frame = 0;
			scrollProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
		}

		// Coalesce to one write per frame: scroll can fire several times between paints.
		function onScroll() {
			if (frame !== 0) return;
			frame = requestAnimationFrame(paint);
		}

		const ro = new ResizeObserver(measure);
		ro.observe(document.documentElement);

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', measure, { passive: true });
		measure();

		return () => {
			ro.disconnect();
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', measure);
			if (frame !== 0) cancelAnimationFrame(frame);
		};
	});
</script>

<div class="scroll-progress" aria-hidden="true">
	<div class="scroll-progress__bar" style="transform: scaleX({scrollProgress / 100})"></div>
</div>

<style>
	.scroll-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: color-mix(in srgb, var(--text) 5%, transparent);
		z-index: 9999;
		pointer-events: none;
	}

	.scroll-progress__bar {
		height: 100%;
		background: var(--accent);
		transform-origin: left;
		will-change: transform;
		/* No transition: the value is already updated once per frame, so easing it only makes the
		   bar lag behind the finger. */
	}
</style>
