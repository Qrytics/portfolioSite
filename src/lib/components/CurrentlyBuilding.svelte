<script lang="ts">
	const items = [
		'USB Host Controller in SystemVerilog',
		'Smart Home IoT Dashboard (ESP32 + FastAPI + React)',
		'MosaicLedger — fintech budget visualiser (TartanHacks)'
	];
</script>

<section class="currently" id="currently-building" aria-label="Currently building">
	<div class="currently__inner">
		<div class="card">
			<div class="termbar">
				<span class="termbar__prompt">~</span>
				<span class="termbar__label">currently building</span>
			</div>
			<ul class="list">
				{#each items as item}
					<li class="list__item">
						<span class="bullet" aria-hidden="true">•</span>
						{item}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.currently {
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.currently__inner {
		max-width: 56rem;
		margin: 0 auto;
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 60%), var(--panel);
		overflow: hidden;
	}

	.termbar {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.22);
	}

	.termbar__prompt {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 700;
	}

	.termbar__label {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	.list {
		margin: 0;
		padding: 1rem 1.1rem;
		display: grid;
		gap: 0.55rem;
		list-style: none;
	}

	.list__item {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.93rem;
		color: rgba(243, 246, 255, 0.82);
		line-height: 1.5;
	}

	.bullet {
		color: var(--accent);
		flex-shrink: 0;
	}
</style>
