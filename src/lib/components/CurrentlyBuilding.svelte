<script lang="ts">
	import { profile } from '$lib/data/profile';

	type Repo = {
		id: number;
		name: string;
		full_name: string;
		html_url: string;
		description: string | null;
		pushed_at: string;
		private: boolean;
		fork: boolean;
	};

	type Props = {
		repos?: Repo[];
		error?: string | null;
	};

	let { repos = [], error = null }: Props = $props();
	const githubProfileUrl = profile.github;
</script>

<section class="currently" id="currently-building" aria-label="Currently building">
	<div class="currently__inner">
		<div class="card">
			<div class="termbar">
				<span class="termbar__prompt">~</span>
				<a class="termbar__label" href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
					currently building (this week) ↗
				</a>
			</div>
			<ul class="list">
				{#if error}
					<li class="list__item">
						<span class="bullet" aria-hidden="true">•</span>
						{error}
					</li>
				{:else if repos.length === 0}
					<li class="list__item">
						<span class="bullet" aria-hidden="true">•</span>
						No recent public GitHub activity found.
					</li>
				{:else}
					{#each repos as repo (repo.id)}
						<li class="item">
							<span class="bullet" aria-hidden="true">•</span>
							<div class="item__body">
								<div class="item__top">
									<a class="repo" href={repo.html_url} target="_blank" rel="noopener noreferrer">
										{repo.name}
									</a>
									<span class="repo__meta">
										{new Date(repo.pushed_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
									</span>
								</div>
								{#if repo.description}
									<div class="repo__desc">{repo.description}</div>
								{/if}
							</div>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</section>

<style>
	.currently {
		padding: 2rem clamp(1.25rem, 4vw, 3rem);
	}

	.currently__inner {
		max-width: 86rem;
		margin: 0 auto;
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 60%), var(--panel);
		overflow: hidden;
	}

	.termbar {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.22);
	}

	.termbar__prompt {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 700;
	}

	.termbar__label {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: rgba(243, 246, 255, 0.92);
		letter-spacing: 0.04em;
		text-decoration: none;
	}

	.termbar__label:hover {
		text-decoration: underline;
	}

	.list {
		margin: 0;
		padding: 1rem 1.1rem;
		display: grid;
		gap: 0.8rem;
		list-style: none;
	}

	.list__item,
	.item {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.93rem;
		color: rgba(243, 246, 255, 0.82);
		line-height: 1.5;
	}

	.item__body {
		flex: 1;
		min-width: 0;
		display: grid;
		gap: 0.25rem;
	}

	.item__top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 0;
	}

	.bullet {
		color: var(--accent);
		flex-shrink: 0;
		margin-top: 0.2rem;
	}

	.repo {
		color: rgba(243, 246, 255, 0.92);
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.repo:hover {
		text-decoration: underline;
		color: var(--accent);
	}

	.repo__meta {
		font-size: 0.78rem;
		color: rgba(243, 246, 255, 0.55);
		flex-shrink: 0;
	}

	.repo__desc {
		color: rgba(243, 246, 255, 0.68);
		font-size: 0.88rem;
		line-height: 1.55;
		overflow-wrap: anywhere;
	}

	@media (max-width: 520px) {
		.item__top {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.2rem;
		}
		.repo {
			white-space: normal;
		}
	}
</style>
