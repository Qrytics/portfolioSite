<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';

	type ContributionDay = {
		date: string;
		contributionCount: number;
		color?: string | null;
	};

	type ContributionWeek = {
		contributionDays: ContributionDay[];
	};

	type GithubContribData = {
		year: number;
		totalContributions: number;
		weeks: ContributionWeek[];
	};

	let loading = true;
	let error: string | null = null;
	let data: GithubContribData | null = null;

	function levelForDay(day: ContributionDay): 0 | 1 | 2 | 3 {
		// GitHub color mapping (when available): GREEN < YELLOW < ORANGE < RED.
		// We map that to a 4-step palette where 0 uses the darkest "empty" color.
		const color = (day.color ?? '').toUpperCase();
		if (day.contributionCount <= 0) return 0;
		if (color === 'GREEN') return 0;
		if (color === 'YELLOW') return 1;
		if (color === 'ORANGE') return 2;
		if (color === 'RED') return 3;

		// Fallback: use contribution count magnitude relative to max.
		// (Keeps rendering correct even if the JSON doesn't include `color`.)
		if (!data) return 1;
		const allCounts = data.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount));
		const max = Math.max(...allCounts, 0);
		if (max <= 0) return 0;
		const normalized = day.contributionCount / max; // 0..1
		if (normalized < 0.33) return 0;
		if (normalized < 0.66) return 1;
		if (normalized < 0.9) return 2;
		return 3;
	}

	onMount(async () => {
		try {
			loading = true;
			error = null;
			const res = await fetch('/github-contrib.json', { headers: { Accept: 'application/json' } });
			const body = (await res.json()) as any;

			// Support both { data: {...} } and direct object formats.
			const parsed = body?.data ?? body;
			const hasWeeks = Array.isArray(parsed?.weeks);
			if (!res.ok || !parsed || !hasWeeks) {
				throw new Error(body?.error ?? `Failed to load GitHub contributions (${res.status})`);
			}

			data = parsed as GithubContribData;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load GitHub contributions.';
			data = null;
		} finally {
			loading = false;
		}
	});
</script>

<section class="github-chart" aria-label="GitHub commit history">
	<div class="github-chart__inner">
		<div class="card">
			<div class="termbar">
				<span class="termbar__prompt">#</span>
				<a class="termbar__label" href={profile.github} target="_blank" rel="noopener noreferrer">
					github commit history (this year) ↗
				</a>
			</div>

			{#if loading}
				<div class="chart-wrap">
					<div class="empty">Loading contributions…</div>
				</div>
			{:else if error}
				<div class="chart-wrap">
					<div class="empty">{error}</div>
				</div>
			{:else if data}
				<div class="chart-wrap">
					<div class="calendar" aria-label={`Contributions for ${data.year}`}>
						{#each data.weeks as week, wi (wi)}
							<div class="week">
								{#each week.contributionDays as day (day.date)}
									<div
										class="day"
										data-level={levelForDay(day)}
										title={`${day.date}: ${day.contributionCount} contributions`}
									></div>
								{/each}
							</div>
						{/each}
					</div>

					<div class="legend" aria-label="Contributions intensity legend">
						<span class="legend__label">Less</span>
						<div class="legend__squares" aria-hidden="true">
							<span class="legend__square" data-level="0"></span>
							<span class="legend__square" data-level="1"></span>
							<span class="legend__square" data-level="2"></span>
							<span class="legend__square" data-level="3"></span>
						</div>
						<span class="legend__label">More</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.github-chart {
		padding: 2rem clamp(1.25rem, 4vw, 3rem) 0;
		/* Contribution chart tuning */
		--cell: 10px;
		--week-gap: 3px;
		--day-gap: 2px;
		/* Match card background exactly (card has a subtle top gradient). */
		--contrib-empty: transparent;
	}

	.github-chart__inner {
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

	.chart-wrap {
		padding: 0.75rem 0.9rem 1rem;
	}

	.empty {
		border: 1px dashed rgba(243, 246, 255, 0.25);
		border-radius: 0.5rem;
		padding: 1rem;
		color: rgba(243, 246, 255, 0.72);
		font-family: var(--font-mono);
	}

	.calendar {
		display: flex;
		gap: var(--week-gap, 3px);
		align-items: flex-start;
		justify-content: flex-start;
		overflow-x: auto;
		padding-bottom: 0.75rem;
	}

	.week {
		display: grid;
		grid-template-rows: repeat(7, var(--cell));
		gap: var(--day-gap, 2px);
	}

	.day {
		width: var(--cell);
		height: var(--cell);
		background: var(--contrib-empty);
		border-radius: 1px;
		flex-shrink: 0;
	}

	.day[data-level='0'] {
		background: var(--contrib-empty);
	}
	.day[data-level='1'] {
		background: rgba(54, 242, 194, 0.22);
	}
	.day[data-level='2'] {
		background: rgba(54, 242, 194, 0.45);
	}
	.day[data-level='3'] {
		background: rgba(54, 242, 194, 0.95);
	}

	.legend {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.legend__label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: rgba(243, 246, 255, 0.65);
	}

	.legend__squares {
		display: flex;
		gap: 0.35rem;
		align-items: center;
	}

	.legend__square {
		width: 10px;
		height: 10px;
		background: var(--contrib-empty);
		border-radius: 1px;
		border: 1px solid var(--border-2);
	}
	.legend__square[data-level='0'] {
		background: var(--contrib-empty);
	}
	.legend__square[data-level='1'] {
		background: rgba(54, 242, 194, 0.22);
	}
	.legend__square[data-level='2'] {
		background: rgba(54, 242, 194, 0.45);
	}
	.legend__square[data-level='3'] {
		background: rgba(54, 242, 194, 0.95);
	}

</style>

