<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Frame shared by every playground toy: an index, a name, a one-line description, and the keys
	 * that play it. Also owns the toys' one button style (`toy-btn`), so six toys don't carry six
	 * copies of it.
	 */
	let {
		n,
		title,
		blurb,
		keys = [],
		wide = false,
		lead = false,
		children
	}: {
		/** Position in the set, e.g. "01". */
		n: string;
		title: string;
		blurb?: string;
		/** Keyboard keys that play the toy, shown as keycaps. */
		keys?: string[];
		/** Spans the whole grid row. */
		wide?: boolean;
		/** Spans two columns: the full row at two columns, two of three at three. */
		lead?: boolean;
		children: Snippet;
	} = $props();
</script>

<article class="toy" class:toy--wide={wide} class:toy--lead={lead}>
	<header class="toy__head">
		<span class="toy__n" aria-hidden="true">{n}</span>
		<div class="toy__titles">
			<h3 class="toy__title">{title}</h3>
			{#if blurb}<p class="toy__blurb">{blurb}</p>{/if}
		</div>
		{#if keys.length}
			<span class="toy__keys" aria-label="Keyboard: {keys.join(' ')}">
				{#each keys as k (k)}<kbd>{k}</kbd>{/each}
			</span>
		{/if}
	</header>
	<div class="toy__body">
		{@render children()}
	</div>
</article>

<style>
	.toy {
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 0;
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
	}

	.toy--wide {
		grid-column: 1 / -1;
	}

	@media (min-width: 720px) {
		.toy--lead {
			grid-column: span 2;
		}
	}

	.toy__head {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: start;
		gap: 0.25rem 0.75rem;
		padding: 0.85rem 1rem 0;
	}

	.toy__n {
		padding-top: 0.1rem;
		color: var(--muter);
		font-size: 0.7rem;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.04em;
	}

	.toy__title {
		color: var(--text);
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.01em;
	}

	.toy__blurb {
		margin-top: 0.2rem;
		color: var(--muted);
		font-size: 0.76rem;
		line-height: 1.45;
	}

	.toy__keys {
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.2rem;
		max-width: 12rem;
	}

	kbd {
		display: inline-grid;
		place-items: center;
		min-width: 1.35rem;
		height: 1.35rem;
		padding: 0 0.25rem;
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		background: var(--panel-2);
		color: var(--muted);
		font: inherit;
		font-size: 0.64rem;
		text-transform: uppercase;
	}

	.toy__body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 0.9rem 1rem 1rem;
	}

	/* ── The toys' shared button ── */
	.toy :global(.toy-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		min-height: 2.5rem;
		padding: 0 0.85rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
		color: var(--text);
		font: inherit;
		font-size: 0.78rem;
		cursor: pointer;
		transition: border-color 0.12s, color 0.12s, background-color 0.12s;
	}

	.toy :global(.toy-btn:hover) {
		border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
	}

	.toy :global(.toy-btn:active) {
		transform: translateY(1px);
	}

	.toy :global(.toy-btn[aria-pressed='true']) {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, var(--panel));
		color: var(--accent-text);
	}

	.toy :global(.toy-btn:disabled) {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.toy :global(.toy-row) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		margin-top: auto;
	}

	@media (pointer: coarse) {
		.toy :global(.toy-btn) {
			min-height: 2.75rem;
		}
	}

	@media (max-width: 480px) {
		.toy__keys {
			display: none;
		}
	}
</style>
