<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	let imageAspect = $state<number | null>(null);
	let videoEl = $state<HTMLVideoElement | undefined>(undefined);
	let mediaActivated = $state(true);

	$effect(() => {
		project.image;
		imageAspect = null;
		mediaActivated = true;
	});

	$effect(() => {
		if (!videoEl) return;
		const video = videoEl;
		const io = new IntersectionObserver((entries) => {
			if (entries[0]?.isIntersecting) {
				video.play().catch((err) => console.debug('Video autoplay failed:', err));
			} else {
				video.pause();
			}
		}, { threshold: 0.1 });
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
			{#if mediaActivated}
				{#each project.images as src}
					<img
						class="media__img media__img--multi"
						src={src}
						alt="{project.title} preview"
						loading="lazy"
						decoding="async"
					/>
				{/each}
			{:else}
				<div class="media__placeholder media__placeholder--single">
					<span class="media__placeholderText">{project.title}</span>
				</div>
			{/if}
		</div>
	</div>
{:else if project.image}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
			style={frameStyle(imageAspect != null ? String(imageAspect) : undefined)}
		>
			{#if mediaActivated}
				{#if isVideo(project.image)}
					<video
						class="media__img"
						src={project.image}
						poster={project.poster}
						autoplay
						loop
						muted
						playsinline
						preload="none"
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
			{:else}
				<div class="media__placeholder media__placeholder--single">
					<span class="media__placeholderText">{project.title}</span>
				</div>
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
		background: rgba(0, 0, 0, 0.12);
	}

	.media__frame {
		width: 100%;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
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
		border: 1px dashed rgba(243, 246, 255, 0.18);
		background: linear-gradient(180deg, rgba(54, 242, 194, 0.06), transparent 70%), rgba(255, 255, 255, 0.03);
		color: rgba(243, 246, 255, 0.7);
		font-family: var(--font-mono);
	}

	.media__placeholderText {
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		text-align: center;
		padding: 0 0.75rem;
		overflow-wrap: anywhere;
	}

	.media__placeholder--single {
		min-height: 140px;
	}
</style>
