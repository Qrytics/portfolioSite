<script lang="ts">
	import { toast } from '$lib/utils/toast.svelte';
</script>

<!--
	The single toast node for the whole app; see `$lib/utils/toast.svelte.ts` for why it isn't three.
	`aria-live` lives on the always-present wrapper rather than on the message itself: a live region
	that is inserted into the DOM at the same moment as its text is frequently not announced at all,
	because the assistive tech has nothing to diff against. The wrapper is mounted from first paint
	and only its contents change.
-->
<div class="toast-region" role="status" aria-live="polite">
	{#if toast.message}
		<div class="toast">{toast.message}</div>
	{/if}
</div>

<style>
	.toast-region {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		/* The wrapper is permanent, so it must never intercept clicks or reserve layout space. */
		pointer-events: none;
		max-width: calc(100vw - 2rem);
	}

	.toast {
		background: var(--panel);
		color: var(--text);
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border);
		box-shadow: var(--shadow);
		text-align: center;
		white-space: normal;
		overflow-wrap: anywhere;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		animation: toast-in 0.2s ease-out;
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* The three copies this replaces animated `transform: translate(-50%) translateY(1rem)`, i.e. they
	   re-declared the centring inside the keyframes. Centring now lives on the wrapper, so the
	   keyframes only move the panel — and `prefers-reduced-motion` can cancel it without also
	   cancelling the horizontal centring. */
	@media (prefers-reduced-motion: reduce) {
		.toast {
			animation: none;
		}
	}
</style>
