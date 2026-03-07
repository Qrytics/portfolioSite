<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	let imageAspect = $state<number | null>(null);

	$effect(() => {
		project.image;
		imageAspect = null;
	});

	function onMediaImageLoad(e: Event) {
		const img = e.currentTarget as HTMLImageElement;
		if (img?.naturalWidth && img.naturalHeight) {
			imageAspect = img.naturalWidth / img.naturalHeight;
		}
	}
</script>

{#if project.images?.length}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame media__frame--multi {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
		>
			{#each project.images as src}
				<img
					class="media__img media__img--multi"
					src={src}
					alt="{project.title} preview"
				/>
			{/each}
		</div>
	</div>
{:else if project.image}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
			style={imageAspect != null ? `aspect-ratio: ${imageAspect}` : undefined}
		>
			<img
				class="media__img"
				src={project.image}
				alt="{project.title} preview"
				onload={onMediaImageLoad}
			/>
		</div>
	</div>
{:else}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
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
		aspect-ratio: 383 / 144;
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
</style>
