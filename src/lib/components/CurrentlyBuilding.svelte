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

	const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

	function pushedAtMs(iso: string): number {
		const t = Date.parse(iso);
		return Number.isFinite(t) ? t : 0;
	}

	/**
	 * "this week" is decided at *generation* time — `scripts/update-github-recent.mjs` filters to the
	 * last 7 days and commits the result as `static/github-recent.json`. Nothing re-checked it on the
	 * client, so any period where the cron was broken or the API ran unauthenticated left this section
	 * presenting months-old pushes as current work. Re-derive freshness against the real current date.
	 */
	const sorted = $derived([...repos].sort((a, b) => pushedAtMs(b.pushed_at) - pushedAtMs(a.pushed_at)));
	const fresh = $derived(sorted.filter((r) => Date.now() - pushedAtMs(r.pushed_at) <= WEEK_MS));
	const isStale = $derived(sorted.length > 0 && fresh.length === 0);

	// When the feed is stale we still show the newest few — they're real, just not recent — but under
	// an honest heading rather than silently relabelling old work as "this week".
	const shown = $derived(isStale ? sorted.slice(0, 3) : fresh);
	const heading = $derived(isStale ? 'recent activity ↗' : 'currently building (this week) ↗');

	const lastActive = $derived.by(() => {
		const newest = sorted[0];
		if (!newest) return null;
		return new Date(pushedAtMs(newest.pushed_at)).toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	});
</script>

<section class="currently" id="currently-building" aria-label="Currently building">
	<div class="currently__inner">
		<div class="card">
			<div class="termbar">
				<span class="termbar__prompt">~</span>
				<a class="termbar__label" href={githubProfileUrl} target="_blank" rel="noopener noreferrer">
					{heading}
				</a>
			</div>
			<ul class="list">
				{#if error}
					<li class="list__item">
						<span class="bullet" aria-hidden="true">•</span>
						{error}
					</li>
				{:else if sorted.length === 0}
					<li class="list__item">
						<span class="bullet" aria-hidden="true">•</span>
						No recent public GitHub activity found.
					</li>
				{:else}
					{#if isStale}
						<li class="list__item list__item--stale">
							<span class="bullet" aria-hidden="true">•</span>
							No public pushes in the last 7 days{lastActive ? ` — last active ${lastActive}` : ''}.
						</li>
					{/if}
					{#each shown as repo (repo.id)}
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
		color: var(--text);
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
		color: color-mix(in srgb, var(--text) 90%, transparent);
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

	.list__item--stale {
		color: var(--muted);
		font-size: 0.85rem;
	}

	.repo {
		color: var(--text);
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
		color: color-mix(in srgb, var(--text) 58%, transparent);
		flex-shrink: 0;
	}

	.repo__desc {
		color: var(--muted);
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
