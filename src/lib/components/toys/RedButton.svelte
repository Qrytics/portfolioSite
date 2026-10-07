<script lang="ts">
	import ToyCard from './ToyCard.svelte';
	import { burstAt, centerOf } from './particles';
	import { sfx } from '$lib/utils/synth';

	/** The button everyone presses anyway. Each press gets a little more exasperated. */
	const LINES = [
		'hey. it says do not press.',
		'twice? bold.',
		'that was a warning, not a suggestion.',
		'nothing is happening. stop.',
		'seriously, there is nothing here.',
		'fine. there is a counter. happy?',
		'you are now in the top 1% of button pressers.',
		'i am telling the duck.',
		'…',
		'ok you win. 🎉'
	];

	let presses = $state(0);
	let shaking = $state(false);
	const line = $derived(presses === 0 ? 'whatever you do, do not press this.' : LINES[Math.min(presses - 1, LINES.length - 1)]);

	function press(e: MouseEvent) {
		presses++;
		const el = e.currentTarget as HTMLElement;
		if (presses === LINES.length) {
			sfx.arpeggio([392, 523.25, 659.25, 783.99, 1046.5], 0.08, 'square');
			burstAt(...centerOf(el), { count: 24, spread: 130 });
		} else if (presses > LINES.length) {
			sfx.pop();
			burstAt(...centerOf(el), { count: 8, spread: 70, glyphs: ['🎉', '✨', '💥'] });
		} else {
			sfx.buzz();
		}
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shaking = false;
			requestAnimationFrame(() => (shaking = true));
		}
	}
</script>

<ToyCard title="do_not_press.exe" cue="don't">
	<div class="wrap">
		<div class="housing" class:housing--shake={shaking} onanimationend={() => (shaking = false)}>
			<button type="button" class="big" onclick={press} aria-describedby="dnp-line">
				<span class="big__cap"></span>
				<span class="sr-only">Do not press</span>
			</button>
			<span class="plate" aria-hidden="true">DO NOT PRESS</span>
		</div>
		<p class="line" id="dnp-line" aria-live="polite">{line}</p>
		{#if presses > 0}<p class="count">presses: {presses}</p>{/if}
	</div>
</ToyCard>

<style>
	.wrap {
		flex: 1;
		display: grid;
		justify-items: center;
		align-content: center;
		gap: 0.75rem;
		text-align: center;
	}

	.housing {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		padding: 1rem 1.4rem 0.7rem;
		border: 1px solid var(--border);
		background: repeating-linear-gradient(
			-45deg,
			color-mix(in srgb, var(--warm) 85%, transparent) 0 10px,
			color-mix(in srgb, #14211f 85%, transparent) 10px 20px
		);
	}

	.housing--shake {
		animation: shake 0.3s ease;
	}

	@keyframes shake {
		25% {
			transform: translateX(-4px) rotate(-1deg);
		}
		75% {
			transform: translateX(4px) rotate(1deg);
		}
	}

	.big {
		position: relative;
		width: 6.5rem;
		height: 6.5rem;
		border: 0.45rem solid #2a2f36;
		border-radius: 50%;
		background: #1a1d22;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.big__cap {
		position: absolute;
		inset: 0.3rem;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #ff8a87, var(--hot) 45%, #a3201c);
		box-shadow: 0 0.45rem 0 #7a1512, 0 0.6rem 1rem color-mix(in srgb, #000 40%, transparent);
		transform: translateY(-0.3rem);
		transition: transform 0.06s, box-shadow 0.06s;
	}

	.big:hover .big__cap {
		filter: brightness(1.08);
	}

	.big:active .big__cap {
		transform: translateY(0.1rem);
		box-shadow: 0 0.05rem 0 #7a1512;
	}

	.plate {
		padding: 0.15rem 0.5rem;
		background: #14211f;
		color: #ffd166;
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.14em;
	}

	.line {
		min-height: 2.6em;
		max-width: 22ch;
		color: var(--text);
		font-size: 0.86rem;
	}

	.count {
		color: var(--muter);
		font-size: 0.74rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.housing--shake {
			animation: none;
		}
	}
</style>
