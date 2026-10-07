<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { games } from '$lib/data/games';
	import { assignDocumentLocation } from '$lib/utils/internalNav';
	import { sfx } from '$lib/utils/synth';
	import { burstAt, centerOf } from './particles';

	/**
	 * An arcade cabinet for the games page: drop coins in, then START sends you to a random game.
	 * Credits are just for show — and for the coin sound, which is the actual point.
	 */
	const playable = games.filter((g) => g.playUrl !== '#');
	let credits = $state(0);
	let picking = $state<string | null>(null);

	function coin(e: MouseEvent) {
		credits = Math.min(credits + 1, 99);
		sfx.coin();
		burstAt(...centerOf(e.currentTarget as HTMLElement), { count: 8, spread: 55, colors: ['#fbbf24', '#f59e0b', '#fde68a'] });
	}

	async function start() {
		if (!credits || !playable.length || picking) return;
		credits--;
		sfx.arpeggio([392, 523.25, 659.25, 783.99], 0.07, 'square');
		const game = playable[Math.floor(Math.random() * playable.length)];
		picking = game.title;
		await new Promise((r) => setTimeout(r, 900));
		picking = null;
		// Real routes use the client router; vendored and proxied games are not SvelteKit routes.
		if (game.route) await goto(`${base}${game.playUrl}`);
		else assignDocumentLocation(game.playUrl);
	}
</script>

<div class="cab" role="group" aria-label="Arcade: insert coins and press start for a random game">
	<div class="screen" aria-live="polite">
		{#if picking}
			<span class="screen__big">▶ {picking}</span>
		{:else if credits === 0}
			<span class="screen__big screen__blink">INSERT COIN</span>
		{:else}
			<span class="screen__big">PRESS START</span>
		{/if}
		<span class="screen__credits">CREDITS {String(credits).padStart(2, '0')}</span>
	</div>
	<div class="controls">
		<button type="button" class="slot" onclick={coin}>
			<span class="slot__mouth" aria-hidden="true"></span>
			insert coin
		</button>
		<button type="button" class="start" onclick={start} disabled={!credits || !!picking}>
			start · random game
		</button>
	</div>
</div>

<style>
	.cab {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: stretch;
		gap: 0.75rem;
		margin: 0 0 1.75rem;
		padding: 0.75rem;
		border: 1px solid var(--border);
		background: linear-gradient(180deg, color-mix(in srgb, #a855f7 12%, var(--panel)), var(--panel));
		box-shadow: var(--shadow);
	}

	.screen {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 3.5rem;
		padding: 0 1rem;
		border: 2px solid #1e293b;
		background: #05070b;
		color: #36f2c2;
		text-shadow: 0 0 6px color-mix(in srgb, #36f2c2 70%, transparent);
		font-weight: 700;
		letter-spacing: 0.12em;
		background-image: repeating-linear-gradient(0deg, color-mix(in srgb, #ffffff 4%, transparent) 0 1px, transparent 1px 3px);
	}

	.screen__big {
		font-size: 0.95rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.screen__blink {
		animation: blink 1.1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0.2;
		}
	}

	.screen__credits {
		flex-shrink: 0;
		color: #f6c177;
		font-size: 0.72rem;
		text-shadow: none;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	.slot,
	.start {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 3.5rem;
		padding: 0 1rem;
		font: inherit;
		font-size: 0.8rem;
		font-weight: 700;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		transition: transform 0.06s, filter 0.1s;
	}

	.slot {
		border: 1px solid #b45309;
		background: linear-gradient(180deg, #fbbf24, #d97706);
		color: #1c1003;
	}

	.slot__mouth {
		width: 0.25rem;
		height: 1.3rem;
		border-radius: 2px;
		background: #1c1003;
	}

	.start {
		border: 1px solid #b91c1c;
		background: linear-gradient(180deg, #f87171, #dc2626);
		color: #fff;
	}

	.slot:active,
	.start:active:not(:disabled) {
		transform: translateY(2px);
		filter: brightness(0.92);
	}

	.start:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		.cab {
			grid-template-columns: 1fr;
		}

		.controls > * {
			flex: 1;
		}

		.slot,
		.start {
			min-height: 3rem;
			padding: 0 0.6rem;
			font-size: 0.74rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.screen__blink {
			animation: none;
		}
	}
</style>
