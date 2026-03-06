<script lang="ts">
	let canvas: HTMLCanvasElement | undefined = $state();
	let container: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		let t = 0;

		function resize() {
			if (!canvas || !container) return;
			const r = container.getBoundingClientRect();
			canvas.width = r.width * devicePixelRatio;
			canvas.height = r.height * devicePixelRatio;
			canvas.style.width = r.width + 'px';
			canvas.style.height = r.height + 'px';
		}

		function draw() {
			if (!canvas) return;
			const w = canvas.width;
			const h = canvas.height;
			ctx!.clearRect(0, 0, w, h);

			const lineCount = 5;
			for (let li = 0; li < lineCount; li++) {
				const yBase = h * (0.2 + li * 0.16);
				const opacity = 0.06 - li * 0.01;
				ctx!.strokeStyle = `rgba(54, 242, 194, ${opacity})`;
				ctx!.lineWidth = 1;
				ctx!.beginPath();

				for (let x = 0; x <= w; x += 2) {
					const nx = x / w;
					const y =
						yBase +
						Math.sin(nx * 12 + t + li * 0.8) * (h * 0.025) +
						Math.sin(nx * 28 + t * 1.3 + li * 1.4) * (h * 0.012) +
						Math.sin(nx * 5 + t * 0.7 + li * 2.1) * (h * 0.018) +
						Math.sin(nx * 50 + t * 2.2 + li * 0.5) * (h * 0.006);
					if (x === 0) ctx!.moveTo(x, y);
					else ctx!.lineTo(x, y);
				}
				ctx!.stroke();
			}

			t += 0.008;
			animId = requestAnimationFrame(draw);
		}

		resize();
		draw();

		const ro = new ResizeObserver(resize);
		ro.observe(container);

		return () => {
			cancelAnimationFrame(animId);
			ro.disconnect();
		};
	});
</script>

<div class="eeg-container" bind:this={container}>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
.eeg-container {
width: 100%;
height: 100%;
background: transparent;
overflow: hidden;
position: relative;
}

canvas {
display: block;
width: 100%;
height: 100%;
will-change: contents;
transform: translateZ(0);
}
</style>
