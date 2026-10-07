<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Frame shared by every playground toy: a terminal-style title bar with a "press me" cue. */
	let {
		title,
		cue = 'tap',
		wide = false,
		lead = false,
		children
	}: {
		title: string;
		cue?: string;
		/** Spans the whole grid row. */
		wide?: boolean;
		/** Spans two columns: the full row at two columns, two of three at three. */
		lead?: boolean;
		children: Snippet;
	} = $props();
</script>

<article class="toy" class:toy--wide={wide} class:toy--lead={lead}>
	<header class="toy__bar">
		<h3 class="toy__title"><span class="toy__prompt" aria-hidden="true">$</span> {title}</h3>
		<span class="toy__cue" aria-hidden="true"><span class="toy__cue-dot"></span>{cue}</span>
	</header>
	<div class="toy__body">
		{@render children()}
	</div>
</article>

<style>
	.toy {
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

	.toy__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: var(--panel-2);
	}

	.toy__title {
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--text);
	}

	.toy__prompt {
		color: var(--accent-text);
	}

	.toy__cue {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--accent-text);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* The "this is live, press it" pulse — the one idle animation every toy shares. */
	.toy__cue-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: var(--accent);
		animation: cue 1.8s ease-in-out infinite;
	}

	@keyframes cue {
		50% {
			opacity: 0.25;
			transform: scale(0.7);
		}
	}

	.toy__body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 1rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.toy__cue-dot {
			animation: none;
		}
	}
</style>
