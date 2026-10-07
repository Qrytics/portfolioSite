<script lang="ts">
	import { onMount } from 'svelte';
	import LedPanel from './LedPanel.svelte';
	import LogicGate from './LogicGate.svelte';
	import DancePad from './DancePad.svelte';
	import Keys from './Keys.svelte';
	import RedButton from './RedButton.svelte';
	import Duck from './Duck.svelte';
	import { loadSoundPref, soundPref, toggleSound } from '$lib/utils/soundPref.svelte';
	import { sfx } from '$lib/utils/synth';

	onMount(loadSoundPref);

	function onToggle() {
		if (toggleSound()) sfx.blip(true);
	}
</script>

<section class="playground" id="playground" aria-labelledby="playground-title">
	<div class="shell">
		<header class="head">
			<div>
				<h2 class="title" id="playground-title"><span aria-hidden="true">~/</span>playground</h2>
				<p class="lead">Things I'd build at 2am. Everything here is pressable, and most of it makes noise.</p>
			</div>
			<button type="button" class="sound" aria-pressed={!soundPref.enabled} onclick={onToggle}>
				<span aria-hidden="true">{soundPref.enabled ? '🔊' : '🔇'}</span>
				sound {soundPref.enabled ? 'on' : 'off'}
			</button>
		</header>

		<div class="grid">
			<LedPanel />
			<RedButton />
			<DancePad />
			<LogicGate />
			<Keys />
			<Duck />
		</div>
	</div>
</section>

<style>
	.playground {
		position: relative;
		z-index: 1;
		padding: 2.5rem 0;
		scroll-margin-top: 4.5rem;
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 3rem);
	}

	.head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.title {
		font-size: clamp(1.15rem, 2.4vw, 1.45rem);
		color: var(--text);
	}

	.title span {
		color: var(--accent-text);
	}

	.lead {
		margin-top: 0.35rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.sound {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 2.75rem;
		padding: 0 0.9rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--text);
		font: inherit;
		font-size: 0.82rem;
		cursor: pointer;
	}

	.sound:hover {
		border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.head {
			flex-direction: column;
			align-items: stretch;
		}

		.sound {
			align-self: flex-start;
		}
	}
</style>
