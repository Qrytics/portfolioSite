<script lang="ts">
	let { onclose }: { onclose: () => void } = $props();
	let canvasRef = $state<HTMLCanvasElement | undefined>(undefined);

	$effect(() => {
		if (!canvasRef) return;

		const canvas = canvasRef;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Matrix characters: binary, programming symbols, katakana
		const chars = '01{}<>[]()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
		const fontSize = 14;
		const columns = Math.floor(canvas.width / fontSize);
		const drops: number[] = Array(columns).fill(0);

		// Matrix animation
		function draw() {
			if (!ctx || !canvas) return;

			// Semi-transparent black to create trail effect
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw characters
			ctx.fillStyle = '#36f2c2'; // Terminal green
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const char = chars[Math.floor(Math.random() * chars.length)];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				ctx.fillText(char, x, y);

				// Reset to top randomly
				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}
		}

		const interval = setInterval(draw, 50);

		// Handle resize
		function handleResize() {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		window.addEventListener('resize', handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="matrix-overlay" role="dialog" aria-modal="true" aria-label="Matrix effect">
	<canvas bind:this={canvasRef} class="matrix-canvas"></canvas>
	<div class="matrix-content">
		<h2 class="matrix-title">Konami Code Activated</h2>
		<p class="matrix-subtitle">You've discovered the hidden feature!</p>
		<button class="matrix-close" onclick={onclose}>Press ESC or Click to Close</button>
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

	.matrix-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem;
		background: rgba(0, 0, 0, 0.8);
		border: 2px solid var(--accent);
		box-shadow: 0 0 20px rgba(54, 242, 194, 0.5);
		max-width: 500px;
	}

	.matrix-title {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		color: var(--accent);
		text-shadow: 0 0 10px rgba(54, 242, 194, 0.8);
	}

	.matrix-subtitle {
		margin: 0 0 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: rgba(243, 246, 255, 0.8);
	}

	.matrix-close {
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--accent);
		background: rgba(54, 242, 194, 0.1);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.matrix-close:hover {
		background: rgba(54, 242, 194, 0.2);
		box-shadow: 0 0 15px rgba(54, 242, 194, 0.5);
		transform: translateY(-1px);
	}

	.matrix-close:active {
		transform: translateY(0);
	}
</style>
