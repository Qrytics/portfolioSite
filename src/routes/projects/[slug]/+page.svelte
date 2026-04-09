<script lang="ts">
import type { PageData } from './$types';
import MediaSection from '$lib/components/MediaSection.svelte';

let { data }: { data: PageData } = $props();
const project = $derived(data.project);
</script>

<svelte:head>
<title>{project.title} — Project</title>
<meta name="description" content={project.description} />
</svelte:head>

<div class="page">
<div class="shell">
<div class="breadcrumb">
<a href="/" data-sveltekit-reload>home</a>
<span class="sep">/</span>
		<a href="/projects" data-sveltekit-reload>projects</a>
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

<!-- Media -->
<MediaSection {project} />

<!-- Content -->
<div class="content">
<div class="meta-row">
<span class="year">{project.startMonth} {project.startYear} - {project.endMonth} {project.endYear}</span>
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

{#if project.problem || project.architecture?.length || project.challenges?.length || project.tradeoffs?.length || project.outcome || project.whatYouLearned?.length}
<div class="case-study">
<h2 class="case-study__heading">Case Study</h2>

{#if project.problem}
<div class="cs-block">
<h3 class="cs-block__title">Problem</h3>
<p class="cs-block__text">{project.problem}</p>
</div>
{/if}

{#if project.architecture?.length}
<div class="cs-block">
<h3 class="cs-block__title">Architecture</h3>
<ul class="cs-list">
{#each project.architecture as item}
<li>{item}</li>
{/each}
</ul>
</div>
{/if}

{#if project.challenges?.length}
<div class="cs-block">
<h3 class="cs-block__title">Challenges</h3>
<ul class="cs-list">
{#each project.challenges as item}
<li>{item}</li>
{/each}
</ul>
</div>
{/if}

{#if project.tradeoffs?.length}
<div class="cs-block">
<h3 class="cs-block__title">Tradeoffs</h3>
<ul class="cs-list">
{#each project.tradeoffs as item}
<li>{item}</li>
{/each}
</ul>
</div>
{/if}

{#if project.outcome}
<div class="cs-block">
<h3 class="cs-block__title">Outcome</h3>
<p class="cs-block__text">{project.outcome}</p>
</div>
{/if}

{#if project.whatYouLearned?.length}
<div class="cs-block">
<h3 class="cs-block__title">What I Learned</h3>
<ul class="cs-list">
{#each project.whatYouLearned as item}
<li>{item}</li>
{/each}
</ul>
</div>
{/if}
</div>
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
{#if project.siteUrl}
<a href={project.siteUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary">Visit Site ↗</a>
{/if}
{#if project.demo}
{#if /(\.mp4|\.webm|\.ogg)(\?|#|$)/i.test(project.demo) || /youtu\.be|youtube\.com/i.test(project.demo)}
	<!-- video is embedded below -->
{:else}
<a href={project.demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
live demo ↗
</a>
{/if}

{#if project.note && !project.slides}
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

{#if project.slides}
	{@const slidesId = project.slides.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/)?.[1]}
	{#if slidesId}
		<div class="slides">
			<iframe
				class="slides__frame"
				title="{project.title} presentation"
				src="https://docs.google.com/presentation/d/{slidesId}/embed"
				loading="lazy"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>
	{/if}
{/if}
</div>
</div>

<div class="back-link">
<a href="/projects" data-sveltekit-reload>← back to projects</a>
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
color: var(--accent);
}

.sep {
color: var(--border);
}

.card {
border: 1px solid var(--border);
background: var(--panel);
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
background: var(--panel-2);
}

.termbar__title {
margin: 0;
font-size: clamp(1rem, 2vw, 1.25rem);
letter-spacing: 0.02em;
color: var(--text);
font-weight: 700;
}

.badge {
font-size: 0.78rem;
color: var(--muted);
border: 1px solid var(--border-2);
padding: 0.2rem 0.55rem;
background: var(--panel-2);
text-transform: lowercase;
white-space: nowrap;
flex-shrink: 0;
}

.badge[data-type='open-source'] { border-color: rgba(54,242,194,.25); color: rgba(54,242,194,.92); background: rgba(54,242,194,.05); }
.badge[data-type='closed-source'] { border-color: rgba(246,193,119,.22); color: rgba(246,193,119,.92); background: rgba(246,193,119,.05); }

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
background: var(--panel-2);
}

.video__native {
display: block;
width: 100%;
border: 1px solid var(--border-2);
background: var(--panel-2);
}

.slides {
margin-top: 1rem;
border-top: 1px solid var(--border-2);
padding-top: 1rem;
}

.slides__frame {
display: block;
width: 100%;
aspect-ratio: 16 / 9;
min-height: 360px;
border: 1px solid var(--border-2);
background: var(--panel-2);
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
color: var(--muted);
}

.tech-badges {
display: flex;
flex-wrap: wrap;
gap: 0.4rem;
}

.tech-badge {
font-size: 0.72rem;
font-weight: 500;
color: var(--muted);
border: 1px solid var(--border-2);
padding: 0.18rem 0.45rem;
background: var(--panel-2);
text-transform: lowercase;
letter-spacing: 0.02em;
}

.tech-badge[data-tech='rust'] { border-color: rgba(222,165,132,.35); color: rgba(222,165,132,.95); background: rgba(222,165,132,.08); }
.tech-badge[data-tech='postgres'], .tech-badge[data-tech='postgresql'] { border-color: rgba(51,78,131,.35); color: rgba(34,151,201,.95); background: rgba(60,74,184,.08); }
.tech-badge[data-tech='svelte'] { border-color: rgba(255,62,0,.35); color: rgba(255,98,50,.95); background: rgba(255,62,0,.08); }
.tech-badge[data-tech='kubernetes'], .tech-badge[data-tech='k8s'] { border-color: rgba(50,108,229,.35); color: rgba(80,138,255,.95); background: rgba(50,108,229,.08); }
.tech-badge[data-tech='python'] { border-color: rgba(76,127,169,.35); color: rgba(74,151,213,.95); background: rgba(43,93,134,.08); }
.tech-badge[data-tech='docker'] { border-color: rgba(0,123,255,.35); color: rgba(30,153,255,.95); background: rgba(9,117,233,.08); }
.tech-badge[data-tech='go'] { border-color: rgba(0,173,216,.35); color: rgba(30,203,246,.95); background: rgba(0,173,216,.08); }
.tech-badge[data-tech='typescript'] { border-color: rgba(49,120,198,.35); color: rgba(79,152,228,.95); background: rgba(49,120,198,.08); }
.tech-badge[data-tech='wasm'], .tech-badge[data-tech='webassembly'] { border-color: rgba(101,79,240,.35); color: rgba(131,109,255,.95); background: rgba(101,79,240,.08); }
.tech-badge[data-tech='c'], .tech-badge[data-tech='c/c++'] { border-color: rgba(85,85,255,.35); color: rgba(115,115,255,.95); background: rgba(85,85,255,.08); }
.tech-badge[data-tech='systemverilog'] { border-color: rgba(218,165,32,.35); color: rgba(255,215,0,.95); background: rgba(218,165,32,.08); }
.tech-badge[data-tech='react'] { border-color: rgba(97,218,251,.35); color: rgba(97,218,251,.95); background: rgba(97,218,251,.08); }
.tech-badge[data-tech='pytorch'] { border-color: rgba(238,76,44,.35); color: rgba(238,106,74,.95); background: rgba(238,76,44,.08); }
.tech-badge[data-tech='javascript'] { border-color: rgba(247,223,30,.4); color: rgba(247,233,80,.95); background: rgba(247,223,30,.1); }
.tech-badge[data-tech='html'] { border-color: rgba(227,76,34,.35); color: rgba(255,120,80,.95); background: rgba(227,76,34,.08); }
.tech-badge[data-tech='chrome extension'] { border-color: rgba(66,133,244,.35); color: rgba(100,163,255,.95); background: rgba(66,133,244,.08); }
.tech-badge[data-tech='litellm'] { border-color: rgba(139,92,246,.35); color: rgba(167,139,255,.95); background: rgba(139,92,246,.08); }
.tech-badge[data-tech='rich'] { border-color: rgba(0,191,165,.35); color: rgba(0,221,195,.95); background: rgba(0,191,165,.08); }
.tech-badge[data-tech='argparse'] { border-color: rgba(76,127,169,.35); color: rgba(74,151,213,.95); background: rgba(43,93,134,.08); }
.tech-badge[data-tech='cadence virtuoso'] { border-color: rgba(0,150,136,.35); color: rgba(0,180,166,.95); background: rgba(0,150,136,.08); }
.tech-badge[data-tech='ota'] { border-color: rgba(156,39,176,.35); color: rgba(186,104,200,.95); background: rgba(156,39,176,.08); }
.tech-badge[data-tech='analog modeling'] { border-color: rgba(255,152,0,.35); color: rgba(255,183,77,.95); background: rgba(255,152,0,.08); }
.tech-badge[data-tech='parasitic simulation'] { border-color: rgba(121,85,72,.35); color: rgba(161,136,127,.95); background: rgba(121,85,72,.08); }
.tech-badge[data-tech='ocr'] { border-color: rgba(63,81,181,.35); color: rgba(92,107,192,.95); background: rgba(63,81,181,.08); }
.tech-badge[data-tech='speech synthesis'] { border-color: rgba(233,30,99,.35); color: rgba(244,143,177,.95); background: rgba(233,30,99,.08); }
.tech-badge[data-tech='opencv'] { border-color: rgba(0,150,199,.35); color: rgba(0,180,229,.95); background: rgba(0,150,199,.08); }
.tech-badge[data-tech='api'] { border-color: rgba(76,175,80,.35); color: rgba(129,199,132,.95); background: rgba(76,175,80,.08); }
.tech-badge[data-tech='fpga'] { border-color: rgba(183,28,28,.35); color: rgba(229,115,115,.95); background: rgba(183,28,28,.08); }
.tech-badge[data-tech='vga'] { border-color: rgba(93,64,55,.35); color: rgba(141,110,99,.95); background: rgba(93,64,55,.08); }
.tech-badge[data-tech='fsm'] { border-color: rgba(218,165,32,.35); color: rgba(255,215,0,.95); background: rgba(218,165,32,.08); }
.tech-badge[data-tech='rsa-2048'] { border-color: rgba(46,125,50,.35); color: rgba(102,187,106,.95); background: rgba(46,125,50,.08); }
.tech-badge[data-tech='fastapi'] { border-color: rgba(0,191,165,.35); color: rgba(38,222,196,.95); background: rgba(0,191,165,.08); }
.tech-badge[data-tech='mqtt'] { border-color: rgba(255,121,0,.35); color: rgba(255,151,30,.95); background: rgba(255,121,0,.08); }
.tech-badge[data-tech='next.js'] { border-color: rgba(0,0,0,.5); color: rgba(243,246,255,.95); background: rgba(255,255,255,.12); }

.subtitle {
margin: 0;
color: var(--muted);
font-size: 1rem;
line-height: 1.5;
}

.desc {
margin: 0;
color: var(--muted);
line-height: 1.7;
font-size: 0.97rem;
}

.long-desc {
color: var(--muted);
font-size: 0.95rem;
line-height: 1.8;
white-space: pre-wrap;
padding-top: 0.5rem;
border-top: 1px solid var(--border-2);
}

.note {
margin: 0;
color: var(--accent-2);
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
border-color: color-mix(in srgb, var(--accent) 45%, transparent);
background: color-mix(in srgb, var(--accent) 14%, transparent);
color: var(--accent);
}

.btn--primary:hover {
background: color-mix(in srgb, var(--accent) 20%, transparent);
border-color: color-mix(in srgb, var(--accent) 58%, transparent);
}

.btn--ghost {
background: var(--panel-2);
color: var(--muted);
border-color: var(--border);
}

.btn--ghost:hover {
background: color-mix(in srgb, var(--panel-2) 84%, var(--text));
border-color: var(--border-2);
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

/* ── Case Study ── */
.case-study {
border-top: 1px solid var(--border-2);
padding-top: 1.25rem;
display: grid;
gap: 1.1rem;
}

.case-study__heading {
margin: 0 0 0.25rem;
font-size: 0.78rem;
font-family: var(--font-mono);
letter-spacing: 0.1em;
text-transform: uppercase;
color: var(--accent);
}

.cs-block {
display: grid;
gap: 0.45rem;
}

.cs-block__title {
margin: 0;
font-size: 0.78rem;
font-family: var(--font-mono);
letter-spacing: 0.08em;
text-transform: uppercase;
color: var(--muter);
}

.cs-block__text {
margin: 0;
color: var(--text);
font-size: 0.95rem;
line-height: 1.7;
}

.cs-list {
margin: 0;
padding: 0 0 0 1.1rem;
display: grid;
gap: 0.3rem;
}

.cs-list li {
color: var(--muted);
font-size: 0.93rem;
line-height: 1.6;
}
</style>
