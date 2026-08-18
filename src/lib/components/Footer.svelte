<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { copyEmail } from '$lib/utils/copyEmail';

	const year = new Date().getFullYear();

	/**
	 * `behavior: 'smooth'` is deliberately not forced here: `app.css` sets
	 * `html { scroll-behavior: smooth }` and resets it under `prefers-reduced-motion`, and passing
	 * the option explicitly overrode that reset — so the one control on the page whose entire job is
	 * a long animated scroll ignored the user's motion preference.
	 */
	function backToTop() {
		window.scrollTo({ top: 0 });
	}
</script>

<footer class="footer">
	<div class="footer__inner">
		<span>© {year} {profile.name}</span>
		<span class="footer__sep">·</span>
		<button class="email-btn footer-link" onclick={copyEmail}>{profile.email}</button>
		<span class="footer__sep">·</span>
		<a href={profile.github} target="_blank" rel="noopener noreferrer" class="footer-link">
			github
		</a>
		<span class="footer__sep">·</span>
		<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="footer-link">
			linkedin
		</a>
		<span class="footer__sep">·</span>
		<a href="https://mario-belmonte.com/tutoring" target="_blank" rel="noopener noreferrer" class="footer-link">
			tutoring
		</a>
		{#if profile.twitter}
			<span class="footer__sep">·</span>
			<a href={profile.twitter} target="_blank" rel="noopener noreferrer" class="footer-link">
				twitter
			</a>
		{/if}
	</div>
	<button class="back-to-top footer-link" type="button" onclick={backToTop}>back to top ↑</button>
</footer>

<style>
	.footer {
		margin-top: clamp(2.25rem, 5vw, 3.5rem);
		padding: 1.25rem clamp(1.25rem, 4vw, 3rem);
		border-top: 1px solid var(--border-2);
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		column-gap: 1rem;
	}

	.footer__inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
		color: var(--muted);
		font-size: 0.95rem;
		max-width: 86rem;
		margin: 0 auto;
		font-family: var(--font-mono);
	}

	.footer__sep {
		color: color-mix(in srgb, var(--text) 38%, transparent);
	}

	@media (max-width: 64rem) {
		.footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.footer__inner {
			flex-direction: column;
			gap: 0.5rem;
		}

		.footer__sep {
			display: none;
		}

		.back-to-top {
			position: static;
			transform: none;
			margin-top: 1rem;
		}
	}

	.footer-link {
		color: color-mix(in srgb, var(--accent) 92%, transparent);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.footer-link:hover {
		color: var(--accent);
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.email-btn {
		background: none;
		border: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
		padding: 0;
		font: inherit;
		cursor: pointer;
	}

	.back-to-top {
		position: static;
		transform: none;
		justify-self: end;
		white-space: nowrap;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.back-to-top:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 60%, transparent);
		outline-offset: 4px;
	}

	/* The toast panel moved to `$lib/components/Toast.svelte`, rendered once by the layout. */
</style>

