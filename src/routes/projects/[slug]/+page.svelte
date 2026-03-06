<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);

	const statusColor: Record<typeof project.status, string> = {
		active: 'var(--accent)',
		wip: 'var(--yellow)',
		archived: 'var(--text-dim)'
	};
</script>

<svelte:head>
	<title>{project.title} — Project Detail</title>
	<meta name="description" content={project.description} />
</svelte:head>

<div class="page">
	<div class="page-inner">
		<div class="breadcrumb">
			<a href="/">home</a>
			<span>/</span>
			<a href="/#projects">projects</a>
			<span>/</span>
			<span class="current">{project.slug}</span>
		</div>

		<header class="project-header">
			<div class="title-row">
				<h1 class="title">{project.title}</h1>
				<span class="status" style="color: {statusColor[project.status]}">
					● {project.status}
				</span>
			</div>
			<div class="meta-row">
				<span class="year">{project.year}</span>
				<div class="tags">
					{#each project.tags as tag}
						<span class="tag">{tag}</span>
					{/each}
				</div>
			</div>
		</header>

		<div class="links-row">
			{#if project.github}
				<a href={project.github} target="_blank" rel="noopener noreferrer" class="ext-link">
					github ↗
				</a>
			{/if}
			{#if project.demo}
				<a href={project.demo} target="_blank" rel="noopener noreferrer" class="ext-link">
					live demo ↗
				</a>
			{/if}
		</div>

		<section class="content">
			<div class="terminal-comment">// {project.description}</div>
			{#if project.longDescription}
				<div class="long-desc">
					{project.longDescription}
				</div>
			{:else}
				<p class="placeholder">Extended description coming soon.</p>
			{/if}
		</section>

		<div class="back-link">
			<a href="/#projects">← back to projects</a>
		</div>
	</div>
</div>

<style>
	.page {
		padding: 7rem 2rem 5rem;
	}

	.page-inner {
		max-width: 720px;
		margin: 0 auto;
	}

	.breadcrumb {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 2.5rem;
		letter-spacing: 0.04em;
	}

	.breadcrumb a {
		color: var(--text-dim);
		text-decoration: none;
		transition: color 0.15s;
	}

	.breadcrumb a:hover {
		color: var(--accent);
	}

	.breadcrumb .current {
		color: var(--accent-dim);
	}

	.project-header {
		margin-bottom: 1.5rem;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.75rem;
	}

	.title {
		font-size: clamp(1.8rem, 5vw, 2.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.status {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.05em;
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
		color: var(--text-dim);
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--text-dim);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 3px;
		padding: 0.15rem 0.5rem;
	}

	.links-row {
		display: flex;
		gap: 1.25rem;
		margin-bottom: 3rem;
	}

	.ext-link {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--accent);
		text-decoration: none;
		border-bottom: 1px solid var(--accent-dim);
		padding-bottom: 1px;
		transition: color 0.15s, border-color 0.15s;
	}

	.ext-link:hover {
		color: var(--accent-bright);
		border-color: var(--accent-bright);
	}

	.content {
		border-top: 1px solid var(--border);
		padding-top: 2rem;
	}

	.terminal-comment {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-dim);
		margin-bottom: 1.5rem;
		letter-spacing: 0.03em;
	}

	.long-desc {
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.8;
		white-space: pre-wrap;
	}

	.placeholder {
		color: var(--text-dim);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		font-style: italic;
	}

	.back-link {
		margin-top: 3rem;
		border-top: 1px solid var(--border);
		padding-top: 1.5rem;
	}

	.back-link a {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-dim);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.15s;
	}

	.back-link a:hover {
		color: var(--accent);
	}
</style>
