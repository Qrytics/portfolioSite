<!--
	Was `<section id="resume" aria-label="Resume section">`, which was wrong twice over: nothing in the
	repo links to `#resume` (there is a real `/resume` route instead), and the label announced "Resume
	section" to a screen reader over content that is a single feedback-form link. An `aria-label` on a
	`<section>` also promotes it to a region landmark, which is more structure than one button deserves —
	so this is now a plain `<div>` and the link's own text is the accessible name.
-->
<div class="review-cta">
	<a
		href="https://forms.gle/LKXFvhHVp84chSpSA"
		target="_blank"
		rel="noopener noreferrer"
		class="review-cta__btn"
	>
		Would you like to leave a review?
	</a>
</div>

<style>
	.review-cta {
		text-align: center;
		padding: 0 clamp(1.25rem, 4vw, 3rem);
	}

	.review-cta__btn {
		display: inline-flex;
		align-items: center;
		padding: 0.6rem 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.92rem;
		color: color-mix(in srgb, var(--accent) 92%, transparent);
		text-decoration: none;
		border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		transition: background 0.14s ease, border-color 0.14s ease, color 0.14s ease;
	}

	.review-cta__btn:hover {
		background: color-mix(in srgb, var(--accent) 13%, transparent);
		border-color: color-mix(in srgb, var(--accent) 42%, transparent);
		color: var(--accent);
	}
</style>
