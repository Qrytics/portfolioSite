<script lang="ts">
	let scrollProgress = $state(0);

	$effect(() => {
		function updateProgress() {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY;
			const maxScroll = documentHeight - windowHeight;

			scrollProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
		}

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress(); // Initial calculation

		return () => window.removeEventListener('scroll', updateProgress);
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
		background: rgba(255, 255, 255, 0.05);
		z-index: 9999;
		pointer-events: none;
	}

	.scroll-progress__bar {
		height: 100%;
		background: var(--accent);
		transform-origin: left;
		will-change: transform;
		transition: transform 0.1s ease-out;
	}
</style>
