<script lang="ts">
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();
const project = $derived(data.project);

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

<svelte:head>
<title>{project.title} — Project</title>
<meta name="description" content={project.description} />
</svelte:head>

<div class="page">
<div class="shell">
<div class="breadcrumb">
<a href="/">home</a>
<span class="sep">/</span>
<a href="/#projects">projects</a>
<span class="sep">/</span>
<span class="current">{project.slug}</span>
</div>

<div class="card">
<!-- Termbar -->
<div class="termbar">
<h1 class="termbar__title">{project.title}</h1>
<span class="badge" data-type={project.type}>
{project.type === 'open-source' ? 'open source' : project.type === 'closed-source' ? 'closed source' : project.type}
</span>
</div>

<!-- Media: same logic as ProjectCard (frame, aspect, multi, placeholder) -->
{#if Array.isArray(project.images) && project.images.length > 0}
	<div class="media" aria-label="Project media">
		<div
			class="media__frame media__frame--multi {project.mediaAspect === 'schematic' ? 'media__frame--schematic' : project.mediaAspect === 'auto' ? 'media__frame--auto' : ''}"
		>
			{#each project.images as src}
				<img class="media__img media__img--multi" src={src} alt="{project.title} preview" />
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

<!-- Content -->
<div class="content">
<div class="meta-row">
<span class="year">{project.startMonth} {project.startYear} — {project.endMonth} {project.endYear}</span>
<div class="tech-badges">
{#each project.tags as tag}
<span class="tech-badge" data-tech={tag.toLowerCase()}>{tag}</span>
{/each}
</div>
</div>

<p class="subtitle">{project.subtitle}</p>
<p class="desc">{project.description}</p>

{#if project.longDescription}
<div class="long-desc">{project.longDescription}</div>
{/if}

<div class="links">
{#if project.github}
<a href={project.github} target="_blank" rel="noopener noreferrer" class="btn btn--primary">
{#if project.github && (new URL(project.github).hostname === 'github.com' || new URL(project.github).hostname.endsWith('.github.com'))}
GitHub Repo ↗
{:else}
source ↗
{/if}
</a>
{/if}
{#if project.demo}
{#if /(\.mp4|\.webm|\.ogg)(\?|#|$)/i.test(project.demo) || /youtu\.be|youtube\.com/i.test(project.demo)}
	<!-- video is embedded below -->
{:else}
<a href={project.demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
live demo ↗
</a>
{/if}

{#if project.note}
<div class="resources">
<p class="resources__title">Additional resources</p>
<p class="note">
	{@html project.note.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')}
</p>
</div>
{/if}
{/if}
</div>

{#if project.demo}
	{#if /youtu\.be|youtube\.com/i.test(project.demo)}
		<div class="video">
			<iframe
				class="video__frame"
				title="{project.title} video"
				src={`https://www.youtube-nocookie.com/embed/${project.demo.includes('youtu.be/') ? project.demo.split('youtu.be/')[1].split(/[?&#]/)[0] : new URL(project.demo).searchParams.get('v') ?? ''}`}
				loading="lazy"
				referrerpolicy="strict-origin-when-cross-origin"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
	{:else if /(\.mp4|\.webm|\.ogg)(\?|#|$)/i.test(project.demo)}
		<div class="video">
			<!-- svelte-ignore a11y_media_has_caption -->
			<video class="video__native" controls preload="metadata" src={project.demo}></video>
		</div>
	{/if}
{/if}
</div>
</div>

<div class="back-link">
<a href="/#projects">← back to projects</a>
</div>
</div>
</div>

<style>
.page {
position: relative;
z-index: 1;
padding-top: 1.5rem;
}

.shell {
max-width: 56rem;
margin: 0 auto;
padding: clamp(1.25rem, 4vw, 3rem);
}

.breadcrumb {
font-family: var(--font-mono);
font-size: 0.78rem;
color: var(--muter);
display: flex;
align-items: center;
gap: 0.4rem;
margin-bottom: 1.75rem;
letter-spacing: 0.04em;
}

.breadcrumb a {
color: var(--muter);
text-decoration: none;
transition: color 0.14s;
}

.breadcrumb a:hover {
color: var(--accent);
}

.current {
color: rgba(54, 242, 194, 0.7);
}

.sep {
color: var(--border);
}

.card {
border: 1px solid var(--border);
background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
overflow: hidden;
margin-bottom: 1.5rem;
}

.termbar {
display: flex;
align-items: center;
justify-content: space-between;
gap: 0.85rem;
padding: 0.75rem 0.9rem;
border-bottom: 1px solid var(--border-2);
background: rgba(0, 0, 0, 0.22);
}

.termbar__title {
margin: 0;
font-size: clamp(1rem, 2vw, 1.25rem);
letter-spacing: 0.02em;
color: rgba(243, 246, 255, 0.9);
font-weight: 700;
}

.badge {
font-size: 0.78rem;
color: rgba(243, 246, 255, 0.72);
border: 1px solid var(--border-2);
padding: 0.2rem 0.55rem;
background: rgba(255, 255, 255, 0.03);
text-transform: lowercase;
white-space: nowrap;
flex-shrink: 0;
}

.badge[data-type='open-source'] { border-color: rgba(54,242,194,.25); color: rgba(54,242,194,.92); background: rgba(54,242,194,.05); }
.badge[data-type='closed-source'] { border-color: rgba(246,193,119,.22); color: rgba(246,193,119,.92); background: rgba(246,193,119,.05); }

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

.media__img {
display: block;
width: 100%;
height: 100%;
object-fit: contain;
object-position: center;
border: 1px solid var(--border-2);
}

.media__img--multi {
flex: 1;
min-width: 0;
min-height: 0;
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
font-family: var(--font-mono);
}

.content {
padding: 1.25rem;
display: grid;
gap: 1rem;
}

.meta-row {
display: flex;
align-items: center;
gap: 1rem;
flex-wrap: wrap;
}

.year {
font-family: var(--font-mono);
font-size: 0.8rem;
color: var(--muter);
}

.video {
margin-top: 0.25rem;
border-top: 1px solid var(--border-2);
padding-top: 1rem;
}

.video__frame {
display: block;
width: 100%;
aspect-ratio: 16 / 9;
border: 1px solid var(--border-2);
background: rgba(0, 0, 0, 0.25);
}

.video__native {
display: block;
width: 100%;
border: 1px solid var(--border-2);
background: rgba(0, 0, 0, 0.25);
}

.resources {
margin-top: 1rem;
border-top: 1px solid var(--border-2);
padding-top: 0.75rem;
}

.resources__title {
margin: 0 0 0.35rem;
font-family: var(--font-mono);
font-size: 0.8rem;
letter-spacing: 0.08em;
text-transform: uppercase;
color: rgba(243, 246, 255, 0.7);
}

.tech-badges {
display: flex;
flex-wrap: wrap;
gap: 0.4rem;
}

.tech-badge {
font-size: 0.72rem;
font-weight: 500;
color: rgba(243, 246, 255, 0.72);
border: 1px solid var(--border-2);
padding: 0.18rem 0.45rem;
background: rgba(255, 255, 255, 0.03);
text-transform: lowercase;
letter-spacing: 0.02em;
}

.tech-badge[data-tech='rust'] { border-color: rgba(222,165,132,.35); color: rgba(222,165,132,.95); background: rgba(222,165,132,.08); }
.tech-badge[data-tech='postgres'] { border-color: rgba(51,78,131,.35); color: rgba(34,151,201,.95); background: rgba(60,74,184,.08); }
.tech-badge[data-tech='svelte'] { border-color: rgba(255,62,0,.35); color: rgba(255,98,50,.95); background: rgba(255,62,0,.08); }
.tech-badge[data-tech='kubernetes'], .tech-badge[data-tech='k8s'] { border-color: rgba(50,108,229,.35); color: rgba(80,138,255,.95); background: rgba(50,108,229,.08); }
.tech-badge[data-tech='python'] { border-color: rgba(76,127,169,.35); color: rgba(74,151,213,.95); background: rgba(43,93,134,.08); }
.tech-badge[data-tech='docker'] { border-color: rgba(0,123,255,.35); color: rgba(30,153,255,.95); background: rgba(9,117,233,.08); }
.tech-badge[data-tech='go'] { border-color: rgba(0,173,216,.35); color: rgba(30,203,246,.95); background: rgba(0,173,216,.08); }
.tech-badge[data-tech='typescript'] { border-color: rgba(49,120,198,.35); color: rgba(79,152,228,.95); background: rgba(49,120,198,.08); }
.tech-badge[data-tech='wasm'], .tech-badge[data-tech='webassembly'] { border-color: rgba(101,79,240,.35); color: rgba(131,109,255,.95); background: rgba(101,79,240,.08); }

.subtitle {
margin: 0;
color: var(--muted);
font-size: 1rem;
line-height: 1.5;
}

.desc {
margin: 0;
color: rgba(243, 246, 255, 0.78);
line-height: 1.7;
font-size: 0.97rem;
}

.long-desc {
color: rgba(243, 246, 255, 0.75);
font-size: 0.95rem;
line-height: 1.8;
white-space: pre-wrap;
padding-top: 0.5rem;
border-top: 1px solid var(--border-2);
}

.note {
margin: 0;
color: rgba(246, 193, 119, 0.88);
font-size: 0.92rem;
font-family: var(--font-mono);
}

.links {
display: flex;
flex-wrap: wrap;
gap: 0.6rem;
padding-top: 0.25rem;
}

.btn {
display: inline-flex;
align-items: center;
gap: 0.5rem;
padding: 0.55rem 0.75rem;
border: 1px solid var(--border);
text-decoration: none;
font-size: 0.9rem;
line-height: 1;
transition: transform 0.14s ease, background-color 0.14s ease, border-color 0.14s ease, color 0.14s ease;
font-family: var(--font-mono);
}

.btn:hover { transform: translateY(-1px); }

.btn--primary {
border-color: rgba(54,242,194,.32);
background: rgba(54,242,194,.09);
color: rgba(54,242,194,.95);
}

.btn--primary:hover {
background: rgba(54,242,194,.13);
border-color: rgba(54,242,194,.42);
}

.btn--ghost {
background: rgba(255,255,255,.03);
color: rgba(243,246,255,.8);
border-color: rgba(243,246,255,.14);
}

.btn--ghost:hover {
background: rgba(255,255,255,.06);
border-color: rgba(243,246,255,.2);
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
</style>
