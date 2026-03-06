<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	const statusColor: Record<Project['status'], string> = {
		active: 'var(--accent)',
		wip: 'var(--yellow)',
		archived: 'var(--text-dim)'
	};

	const statusLabel: Record<Project['status'], string> = {
		active: 'active',
		wip: 'wip',
		archived: 'archived'
	};
</script>

<article class="card">
	<div class="card-header">
		<div class="card-title-row">
			<h3 class="card-title">
				{#if project.github}
					<a href={project.github} target="_blank" rel="noopener noreferrer">
						{project.title}
					</a>
				{:else}
					{project.title}
				{/if}
			</h3>
			<span class="status" style="color: {statusColor[project.status]}">
				● {statusLabel[project.status]}
			</span>
		</div>
		<span class="year">{project.year}</span>
	</div>

	<p class="description">{project.description}</p>

	<div class="footer">
		<div class="tags">
			{#each project.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>

		<div class="links">
			{#if project.github}
				<a href={project.github} target="_blank" rel="noopener noreferrer" class="link">
					github ↗
				</a>
			{/if}
			{#if project.demo}
				<a href={project.demo} target="_blank" rel="noopener noreferrer" class="link">
					demo ↗
				</a>
			{/if}
			<a href="/projects/{project.slug}" class="link link-detail">details →</a>
		</div>
	</div>
</article>

<style>
	.card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 6px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: border-color 0.15s;
	}

	.card:hover {
		border-color: var(--accent-dim);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.card-title-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.card-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
	}

	.card-title a {
		color: inherit;
		text-decoration: none;
	}

	.card-title a:hover {
		color: var(--accent);
	}

	.status {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		text-transform: lowercase;
	}

	.year {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		white-space: nowrap;
	}

	.description {
		color: var(--text-muted);
		font-size: 0.9rem;
		line-height: 1.65;
		margin: 0;
		flex: 1;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: auto;
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
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 3px;
		padding: 0.15rem 0.5rem;
		letter-spacing: 0.03em;
	}

	.links {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		text-decoration: none;
		transition: color 0.15s;
		letter-spacing: 0.03em;
	}

	.link:hover {
		color: var(--accent);
	}

	.link-detail {
		color: var(--accent-dim);
	}
</style>
