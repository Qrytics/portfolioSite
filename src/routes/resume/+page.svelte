<script lang="ts">
</script>

<div class="page">
	<section class="section">
		<div class="shell">
			<header class="header">
				<h1 class="title">resume</h1>
				<p class="subtitle">
					Embedded view of my current resume. If the viewer doesn’t load, you can open it directly
					<a
						href="https://drive.google.com/file/d/1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
					>
						on Google Drive ↗
					</a>.
				</p>
				<!-- The embedded viewer is cramped on a phone and has no obvious download control, so the
				     two things people actually want from a resume page get their own buttons. -->
				<div class="actions">
					<a
						class="action"
						href="https://drive.google.com/uc?export=download&id=1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0"
						rel="noopener noreferrer"
					>
						download PDF ↓
					</a>
					<a
						class="action action--ghost"
						href="https://drive.google.com/file/d/1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0/view?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
					>
						open full screen ↗<span class="sr-only"> (opens in new tab)</span>
					</a>
				</div>
			</header>

			<div class="frame">
				<iframe
					title="Mario Belmonte — Resume"
					src="https://drive.google.com/file/d/1N_JbJgcBEc2B89T1k33NA2s_UPsuVoI0/preview"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					allow="autoplay"
				>
				</iframe>
			</div>
		</div>
	</section>
</div>

<style>
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1rem;
	}

	.action {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		padding: 0 1rem;
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		color: var(--accent-text);
		font-family: var(--font-mono);
		font-size: 0.86rem;
		text-decoration: none;
	}

	.action:hover {
		background: color-mix(in srgb, var(--accent) 16%, transparent);
	}

	.action--ghost {
		border-color: var(--border);
		background: transparent;
		color: var(--text);
	}

	.page {
		position: relative;
		isolation: isolate;
	}

	.section {
		position: relative;
		z-index: 1;
		padding: clamp(1.25rem, 4vw, 3rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
	}

	.header {
		margin-bottom: 1rem;
	}

	.title {
		margin: 0 0 0.35rem;
		font-family: var(--font-mono);
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		color: var(--text);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0;
		color: var(--muted);
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.subtitle a {
		color: var(--accent);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
	}

	.subtitle a:hover {
		color: var(--accent);
		border-bottom-color: color-mix(in srgb, var(--accent) 70%, transparent);
	}

	.frame {
		margin-top: 1.25rem;
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	.frame iframe {
		display: block;
		width: 100%;
		/* `dvh` rather than `vh`. On iOS Safari `100vh` is the viewport with the browser chrome
		   *retracted*, so the bottom ~9% of the PDF sat permanently underneath the URL bar and could
		   not be scrolled into view — the iframe scrolls its own document, not the page. */
		height: min(1200px, calc(100dvh - 9rem));
		border: none;
		background: var(--panel-2);
	}

	@media (max-width: 640px) {
		.frame iframe {
			height: clamp(420px, 62dvh, 640px);
		}
	}
</style>

