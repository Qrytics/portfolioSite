<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	let imageAspect = $state<number | null>(null);
	let videoEl = $state<HTMLVideoElement | undefined>(undefined);

	type NetworkInformation = { saveData?: boolean; effectiveType?: string };

	/**
	 * Autoplay is a data-cost decision, not a style one. The demo clips are 1-4 MB each, so a
	 * metered or slow connection gets the poster plus native controls instead — and so does anyone
	 * who asked the OS for reduced motion, since a looping clip is exactly the motion they opted out
	 * of. Evaluated at init (not in an `$effect`) so the client's first paint already has the right
	 * `controls` state; SSR returns `false`, which is the safe default.
	 */
	function autoplayAllowed(): boolean {
		if (typeof window === 'undefined') return false;
		const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
		if (connection?.saveData === true) return false;
		if (/(^|-)2g$/.test(connection?.effectiveType ?? '')) return false;
		return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	const mayAutoplay = autoplayAllowed();

	$effect(() => {
		project.image;
		imageAspect = null;
	});

	$effect(() => {
		const video = videoEl;
		// Without `autoplay` in the markup, `preload="none"` actually holds: nothing is fetched
		// until this observer calls `play()`. The old markup had both, and `autoplay` wins — the
		// browser must download in order to honour it, so the first home-page card pulled a 4 MB
		// clip before the user had scrolled to it.
		if (!video || !mayAutoplay) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					video.play().catch((err) => {
						// Expected when the browser's own autoplay policy declines; the poster stays.
						if (import.meta.env.DEV) {
							console.debug('Video autoplay failed:', err);
						}
					});
				} else {
					video.pause();
				}
			},
			{ threshold: 0.1 }
		);
		io.observe(video);
		return () => io.disconnect();
	});

	function onMediaImageLoad(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		if (img?.naturalWidth && img.naturalHeight) {
			imageAspect = img.naturalWidth / img.naturalHeight;
		}
	}

	function frameStyle(aspectRatio?: string) {
		const parts: string[] = [];
		if (aspectRatio) parts.push(`aspect-ratio: ${aspectRatio}`);
		if (project.mediaScale != null) parts.push(`width: ${project.mediaScale * 100}%; margin: 0 auto`);
		return parts.length ? parts.join('; ') : undefined;
	}

	function isVideo(src: string): boolean {
		return /\.(mp4|webm)(\?|#|$)/i.test(src);
	}

	function mediaInlineStyle(): string | undefined {
		if (!project.mediaStyle || Object.keys(project.mediaStyle).length === 0) return undefined;
		return Object.entries(project.mediaStyle)
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ');
	}
</script>

{#if project.images?.length}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame media__frame--multi {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
			style={frameStyle()}
		>
			{#each project.images as src (src)}
				<img
					class="media__img media__img--multi"
					src={src}
					alt="{project.title} preview"
					loading="lazy"
					decoding="async"
				/>
			{/each}
		</div>
	</div>
{:else if project.image}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
			style={frameStyle(imageAspect != null ? String(imageAspect) : undefined)}
		>
			{#if isVideo(project.image)}
				<video
					class="media__img"
					src={project.image}
					poster={project.poster}
					loop
					muted
					playsinline
					preload="none"
					controls={!mayAutoplay}
					aria-label="{project.title} preview"
					style={mediaInlineStyle()}
					bind:this={videoEl}
				></video>
			{:else}
				<img
					class="media__img"
					src={project.image}
					alt="{project.title} preview"
					loading="lazy"
					decoding="async"
					onload={onMediaImageLoad}
					style={mediaInlineStyle()}
				/>
			{/if}
		</div>
	</div>
{:else}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
			style={frameStyle()}
		>
			<div class="media__placeholder">
				<span class="media__placeholderText">{project.subtitle}</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.media {
		padding: 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: color-mix(in srgb, #000 12%, transparent);
	}

	.media__frame {
		width: 100%;
		overflow: hidden;
		background: color-mix(in srgb, var(--text) 3%, transparent);
		/* Reserve the box before any media resolves. Previously the frame had no intrinsic height
		   until `onload` reported `naturalWidth`, so every card grew from 0 and shoved the rest of
		   the page down. `object-fit: contain` means the default ratio mattes rather than crops. */
		aspect-ratio: 383 / 189;
	}

	.media__frame--schematic {
		aspect-ratio: 383 / 177;
	}

	.media__frame--auto {
		aspect-ratio: 383 / 189;
	}

	.media__frame--multi {
		display: flex;
		gap: 0.35rem;
	}

	.media__img--multi {
		flex: 1;
		min-width: 0;
		min-height: 0;
	}

	.media__img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border: 1px solid var(--border-2);
	}

	.media__placeholder {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		min-height: 0;
		border: 1px dashed color-mix(in srgb, var(--text) 18%, transparent);
		background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%), color-mix(in srgb, var(--text) 3%, transparent);
		color: color-mix(in srgb, var(--text) 72%, transparent);
		font-family: var(--font-mono);
	}

	.media__placeholderText {
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		text-align: center;
		padding: 0 0.75rem;
		overflow-wrap: anywhere;
	}
</style>
