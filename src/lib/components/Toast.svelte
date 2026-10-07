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
		<!-- Deliberately not interactive (no hover-pause, no click-to-dismiss): the panel sits over the
		     footer, so making it hit-testable swallowed clicks meant for the footer's own copy button. -->
		<div class="toast">{toast.message}</div>
	{/if}
</div>

<style>
	.toast-region {
		position: fixed;
		/* Clear the iOS home indicator rather than sitting underneath it. */
		bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		/* The wrapper is permanent, so it must never intercept clicks or reserve layout space. */
		pointer-events: none;
		/* `max-content`, capped: a fixed box at `left: 50%` otherwise shrink-wraps into the half of
		   the viewport to its right, so on a phone every toast wrapped onto three lines at ~195px. */
		width: max-content;
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
