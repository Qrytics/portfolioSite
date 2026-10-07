<script lang="ts">
	import { aboutPhotos, type AboutPhoto } from '$lib/data/about-photos';
	import { portal } from '$lib/utils/portal';
	import { focusTrap } from '$lib/utils/focusTrap';
	import { lockScroll, unlockScroll } from '$lib/utils/scrollLock';

	const altFor = (photo: AboutPhoto, i: number) =>
		photo.alt ?? `Photo ${i + 1} of ${aboutPhotos.length} from Mario's life outside work`;

	/**
	 * Lightbox. The gallery crops every photo to a square, and there was no way to see one whole or
	 * larger. Index of the open photo, or `null` when closed.
	 */
	let openIndex = $state<number | null>(null);
	const current = $derived(openIndex === null ? null : aboutPhotos[openIndex]);

	function step(delta: number) {
		if (openIndex === null) return;
		openIndex = (openIndex + delta + aboutPhotos.length) % aboutPhotos.length;
	}

	$effect(() => {
		if (openIndex === null) return;
		const lock = lockScroll();
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') openIndex = null;
			else if (e.key === 'ArrowRight') step(1);
			else if (e.key === 'ArrowLeft') step(-1);
		}
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			unlockScroll(lock);
		};
	});

	function imgStyle(photo: AboutPhoto): string {
		const pos = `object-position: ${photo.position ?? '50% 50%'}`;
		const p = photo.padding;
		if (!p) return pos;
		const parts = [pos];
		if (p.top != null) parts.push(`padding-top: ${p.top}px`);
		if (p.right != null) parts.push(`padding-right: ${p.right}px`);
		if (p.bottom != null) parts.push(`padding-bottom: ${p.bottom}px`);
		if (p.left != null) parts.push(`padding-left: ${p.left}px`);
		return parts.join('; ');
	}
</script>

<div class="page">
	<section class="section">
		<div class="shell">
			<h1 class="title">about me</h1>
			<p class="subtitle">A few snapshots with friends and family.</p>

			<div class="grid gallery" role="list">
				{#each aboutPhotos as photo, i (photo.src)}
					<div class="card grid-item" class:grid-item--tall={photo.tall} role="listitem">
						<!--
							`width`/`height` are set only on the `tall` photos, which is where they do work —
							see the comment on `AboutPhoto.width` for why the square cards don't need them.
							They are attributes rather than CSS so the browser derives the aspect ratio before
							any stylesheet applies; `.grid-item--tall .img` then overrides the used size back
							to `width: 100%; height: auto`, which preserves that ratio.
						-->
						<button type="button" class="open" onclick={() => (openIndex = i)} aria-label="View larger: {altFor(photo, i)}">
							<img
								class="img"
								class:img--contain={photo.fit === 'contain'}
								src={photo.src}
								alt=""
								loading="lazy"
								width={photo.width}
								height={photo.height}
								style={imgStyle(photo)}
							/>
						</button>
					</div>
				{/each}
			</div>

			<div class="bottom-row">
				<div class="back-link">
					<a href="/">← back home</a>
				</div>
			</div>
		</div>
	</section>
</div>

{#if current && openIndex !== null}
	<div class="lightbox-portal" use:portal>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="lightbox__scrim" aria-hidden="true" onclick={() => (openIndex = null)}></div>
		<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" use:focusTrap>
			<div class="lightbox__bar">
				<span class="lightbox__count" aria-live="polite">{openIndex + 1} / {aboutPhotos.length}</span>
				<button type="button" class="lightbox__btn" onclick={() => (openIndex = null)}>esc ✕</button>
			</div>
			<img class="lightbox__img" src={current.src} alt={altFor(current, openIndex)} />
			<div class="lightbox__nav">
				<button type="button" class="lightbox__btn" onclick={() => step(-1)}>← prev</button>
				<button type="button" class="lightbox__btn" onclick={() => step(1)}>next →</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.open {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
	}

	.lightbox-portal {
		display: contents;
	}

	.lightbox__scrim {
		position: fixed;
		inset: 0;
		z-index: 1100;
		background: color-mix(in srgb, #000 90%, transparent);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 1101;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 0.75rem;
		padding: clamp(0.75rem, 3vw, 2rem);
		pointer-events: none;
	}

	.lightbox > * {
		pointer-events: auto;
	}

	.lightbox__bar,
	.lightbox__nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		max-width: 72rem;
		width: 100%;
		margin: 0 auto;
	}

	.lightbox__count {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: #e2e8f0;
	}

	.lightbox__img {
		place-self: center;
		max-width: 100%;
		max-height: 100%;
		min-height: 0;
		object-fit: contain;
		border: 1px solid color-mix(in srgb, #fff 14%, transparent);
	}

	.lightbox__btn {
		min-height: 2.75rem;
		padding: 0 0.9rem;
		border: 1px solid color-mix(in srgb, #fff 22%, transparent);
		background: color-mix(in srgb, #0b0e12 70%, transparent);
		color: #e2e8f0;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		cursor: pointer;
	}

	.lightbox__btn:hover {
		border-color: var(--accent);
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

	.title {
		margin: 0 0 0.35rem;
		font-family: var(--font-mono);
		font-size: clamp(1.35rem, 3.2vw, 1.9rem);
		letter-spacing: 0.02em;
		color: var(--text);
		text-transform: lowercase;
	}

	.subtitle {
		margin: 0 0 1.25rem;
		color: var(--muted);
		max-width: 80ch;
		line-height: 1.7;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 0.85rem;
	}

	@media (min-width: 720px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.1rem;
		}
	}

	@media (min-width: 1100px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	.card {
		border: 1px solid var(--border);
		background: var(--panel);
		box-shadow: var(--shadow);
		overflow: hidden;
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
	}

	.grid-item--tall.card {
		aspect-ratio: auto;
		align-items: center;
	}

	.grid-item--tall .img {
		width: 100%;
		height: auto;
		max-height: 80dvh;
		object-fit: contain;
	}

	.img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 50%;
		display: block;
		transition: transform 0.3s ease;
	}

	.img--contain {
		object-fit: contain;
	}

	/* Hover-capable pointers only: on touch, :hover sticks after a tap and left one photo zoomed. */
	@media (hover: hover) {
		.grid-item:hover .img {
			transform: scale(1.05);
		}
	}

	.bottom-row {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.bottom-row .back-link {
		grid-column: 1;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--muter);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.14s;
	}

	.back-link a:hover {
		color: var(--accent);
	}

	/*
	 * Phones: one full-width photo per row made this page ~8,800px of scrolling. Every photo already
	 * opens full size in the lightbox, so here they are square thumbnails, two to a row — including
	 * the tall and `contain` ones, which only exist to avoid cropping at large sizes.
	 */
	@media (max-width: 719px) {
		.section {
			padding: 1.25rem 1rem 2rem;
		}

		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.4rem;
		}

		.card,
		.grid-item--tall.card {
			aspect-ratio: 1 / 1;
			box-shadow: none;
		}

		.grid-item--tall .img,
		.img--contain {
			height: 100%;
			max-height: none;
			object-fit: cover;
		}

		/* Per-photo `padding` (set inline by `imgStyle`) frames a photo in a large card; in a square
		   thumbnail it just letterboxes it. `!important` is the only way past an inline style. */
		.img {
			padding: 0 !important;
		}
	}

	@media (max-width: 640px) {
		.bottom-row {
			grid-template-columns: 1fr;
		}

		.bottom-row .back-link {
			grid-column: 1;
		}
	}
</style>

