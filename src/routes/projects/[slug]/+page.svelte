<script lang="ts">
import type { PageData } from './$types';
import MediaSection from '$lib/components/MediaSection.svelte';

let { data }: { data: PageData } = $props();
const project = $derived(data.project);

const languageTags = new Set([
	'javascript', 'typescript', 'python', 'rust', 'go', 'c++', 'c', 'dart', 'html', 'css', 'systemverilog'
]);
const frameworkTags = new Set([
	'react', 'next.js', 'fastapi', 'svelte', 'react native', 'tauri', 'flutter', 'electron'
]);
const apiTags = new Set([
	'spotify api', 'stripe api', 'calendly api', 'semantic scholar api', 'twitch api', 'openai api',
	'github api', 'groq api', 'windows api', 'windows ui automation api', 'lcu api'
]);
const serviceTags = new Set(['docker', 'postgresql', 'sqlite', 'redis', 'neo4j', 'supabase', 'pocketbase', 'duckdb']);
const protocolTags = new Set(['mqtt', 'webrtc', 'manifest v3']);
const toolTags = new Set([
	'discord.js', 'discord.py', 'langchain', 'litellm', 'pytorch', 'opencv', 'mediapipe', 'xgboost',
	'lightgbm', 'scikit-learn', 'optuna', 'pandas', 'ollama', 'demucs', 'ffmpeg', 'rich', 'argparse',
	'chokidar', 'xterm.js', 'node-cron', 'cadence virtuoso', 'tribe v2', 'faster-whisper', 'porcupine',
	'pyyaml', 'pyaudio', 'pyautogui', 'tokio', 'scapy', 'expo', 'ytdl-core'
]);

function getTagKind(tag: string): 'language' | 'framework' | 'api' | 'service' | 'protocol' | 'tool' | 'other' {
	const key = tag.toLowerCase();
	if (languageTags.has(key)) return 'language';
	if (frameworkTags.has(key)) return 'framework';
	if (apiTags.has(key)) return 'api';
	if (serviceTags.has(key)) return 'service';
	if (protocolTags.has(key)) return 'protocol';
	if (toolTags.has(key)) return 'tool';
	return 'other';
}

function escapeHtml(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function formatLongDescription(text: string): string {
	const escaped = escapeHtml(text);
	return escaped
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\n/g, '<br>');
}
</script>

<svelte:head>
<title>Mario Belmonte ({project.title})</title>
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
{#each project.tags as tag (tag)}
<span class="tech-badge" data-kind={getTagKind(tag)}>{tag}</span>
{/each}
</div>
</div>

<p class="subtitle">{project.subtitle}</p>
<p class="desc">{project.description}</p>

{#if project.longDescription}
<div class="long-desc">{@html formatLongDescription(project.longDescription)}</div>
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
{#if project.slug === 'smart-home-iot-dashboard' && project.liveDashboardUrl}
<div class="live-cta">
<a href={project.liveDashboardUrl} target="_blank" rel="noopener noreferrer" class="btn btn--warn">LIVE Dashboard ↗</a>
<p class="live-note">(Only works for in-person showcase)</p>
</div>
{/if}
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
{#if project.projectPageUrl}
<a href={project.projectPageUrl} target="_blank" rel="noopener noreferrer" class="btn btn--primary">{project.siteUrl ? 'Visit Blog ↗' : 'Visit Site ↗'}</a>
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

.tech-badge[data-kind='language'] { border-color: rgba(59,130,246,.4); color: rgba(147,197,253,.95); background: rgba(59,130,246,.12); }
.tech-badge[data-kind='framework'] { border-color: rgba(45,212,191,.44); color: rgba(153,246,228,.96); background: rgba(20,184,166,.14); }
.tech-badge[data-kind='api'] { border-color: rgba(245,158,11,.42); color: rgba(252,211,77,.95); background: rgba(245,158,11,.12); }
.tech-badge[data-kind='service'] { border-color: rgba(192,132,252,.45); color: rgba(233,213,255,.96); background: rgba(168,85,247,.14); }
.tech-badge[data-kind='protocol'] { border-color: rgba(244,114,182,.46); color: rgba(251,207,232,.96); background: rgba(236,72,153,.16); }
.tech-badge[data-kind='tool'] { border-color: rgba(132,204,22,.44); color: rgba(217,249,157,.96); background: rgba(132,204,22,.14); }
.tech-badge[data-kind='other'] { border-color: rgba(148,163,184,.35); color: rgba(203,213,225,.9); background: rgba(148,163,184,.1); }

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

:global([data-theme='light']) .btn--ghost {
	background: var(--clr-surface-tonal-a0);
	color: var(--clr-primary-a40);
	border-color: var(--clr-surface-tonal-a10);
}

:global([data-theme='light']) .btn--ghost:hover {
	background: color-mix(in srgb, var(--clr-primary-a0) 10%, var(--clr-surface-tonal-a0));
	color: var(--clr-primary-a0);
	border-color: var(--clr-primary-a30);
}

.btn--warn {
	border-color: rgba(245, 158, 11, 0.45);
	background: rgba(245, 158, 11, 0.14);
	color: rgba(252, 211, 77, 0.96);
}

.btn--warn:hover {
	border-color: rgba(245, 158, 11, 0.62);
	background: rgba(245, 158, 11, 0.22);
}

.live-note {
	margin: 0.15rem 0 0;
	width: 100%;
	color: var(--muter);
	font-size: 0.8rem;
	font-family: var(--font-mono);
}

.live-cta {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0;
	margin-bottom: 0.55rem;
}

@media (max-width: 430px) {
	.links {
		gap: 0.45rem;
	}

	.btn {
		width: 100%;
		justify-content: center;
		min-height: 2.5rem;
	}

	.live-cta {
		margin-bottom: 0.4rem;
	}
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
