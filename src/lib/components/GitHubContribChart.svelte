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

type GithubContribPayload = {
	currentYear?: number;
	years?: GithubContribData[];
	// Back-compat single-year format:
	year?: number;
	totalContributions?: number;
	weeks?: ContributionWeek[];
	error?: string;
};

	let loading = true;
	let error: string | null = null;
let dataByYear: GithubContribData[] = [];
let selectedYear: number | null = null;
	const weekdayLabels = ['Mon', 'Wed', 'Fri'];
let weeksCount = 53;

function monthMarkers(weeks: ContributionWeek[], year: number): Array<{ label: string; index: number }> {
		const out: Array<{ label: string; index: number }> = [];
		let prevMonth = '';
		for (let i = 0; i < weeks.length; i += 1) {
			const first = weeks[i]?.contributionDays?.[0]?.date;
			if (!first) continue;
			const d = new Date(`${first}T00:00:00Z`);
			// Ignore padded leading/trailing weeks outside the selected year.
			if (d.getUTCFullYear() !== year) continue;
			const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
			// Prevent duplicate labels like "JanJan" across adjacent January weeks.
			if (month !== prevMonth) {
				out.push({ label: month, index: i });
				prevMonth = month;
			}
		}
		return out;
	}

	function yearRail(currentYear: number): number[] {
		return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
	}

function getSelected(): GithubContribData | null {
	if (selectedYear == null) return null;
	return dataByYear.find((d) => d.year === selectedYear) ?? null;
}

function visibleWeeksFor(selected: GithubContribData | null): ContributionWeek[] {
	if (!selected) return [];
	const currentYear = new Date().getUTCFullYear();
	if (selected.year !== currentYear) return selected.weeks;

	const todayIso = new Date().toISOString().slice(0, 10);
	const lastVisibleIndex = selected.weeks.findLastIndex((week) =>
		week.contributionDays.some((d) => d.date <= todayIso)
	);
	return lastVisibleIndex >= 0 ? selected.weeks.slice(0, lastVisibleIndex + 1) : selected.weeks;
}

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
		const selected = getSelected();
		if (!selected) return 1;
		const allCounts = selected.weeks.flatMap((w: ContributionWeek) =>
			w.contributionDays.map((d: ContributionDay) => d.contributionCount)
		);
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
			const body = (await res.json()) as GithubContribPayload;
			if (!res.ok) throw new Error(body?.error ?? `Failed to load GitHub contributions (${res.status})`);

			const years = Array.isArray(body?.years)
				? body.years
				: body?.year && Array.isArray(body?.weeks)
					? [{ year: body.year, totalContributions: body.totalContributions ?? 0, weeks: body.weeks }]
					: [];

			if (years.length === 0) throw new Error(body?.error ?? 'No contribution years found.');

			dataByYear = years.sort((a, b) => b.year - a.year);
			selectedYear = body.currentYear ?? dataByYear[0].year;
			weeksCount = Math.max(visibleWeeksFor(getSelected()).length, 1);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load GitHub contributions.';
			dataByYear = [];
			selectedYear = null;
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
			{:else if getSelected()}
				<div class="chart-wrap">
					<div class="chart-main">
						<div class="calendar-shell">
							<div class="calendar-grid" aria-hidden="true">
								<div class="months__spacer"></div>
								<div class="weekdays" aria-hidden="true">
									{#each weekdayLabels as wd}
										<div class="weekdays__label">{wd}</div>
									{/each}
								</div>

								<div class="calendar-scroll" style={`--weeks: ${weeksCount};`}>
									<div class="months__content">
										{#each monthMarkers(visibleWeeksFor(getSelected()), getSelected()!.year) as marker (marker.index)}
											<span
												class="months__label"
												style={`left: calc(${marker.index} * (var(--cell) + var(--week-gap, 3px)));`}
												>{marker.label}</span
											>
										{/each}
									</div>

									<div class="calendar" aria-label={`Contributions for ${getSelected()!.year}`}>
										{#each visibleWeeksFor(getSelected()) as week, wi (wi)}
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
								</div>
							</div>
						</div>

						<div class="years" aria-label="Contribution years">
							{#each yearRail(dataByYear[0].year) as y}
								<button
									type="button"
									class="year"
									class:year--current={y === selectedYear}
									onclick={() => {
										selectedYear = y;
										weeksCount = Math.max(visibleWeeksFor(getSelected()).length, 1);
									}}>{y}</button
								>
							{/each}
						</div>
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
		padding-bottom: 0.35rem;
	}

	.calendar-shell {
		display: grid;
		gap: 0.35rem;
	}

	.chart-main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: start;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		gap: 0.5rem;
		grid-template-rows: auto auto;
		align-items: start;
	}

	.months__content {
		position: relative;
		height: 1rem;
		min-width: calc(var(--weeks, 53) * (var(--cell) + var(--week-gap, 3px)));
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: rgba(243, 246, 255, 0.65);
		padding-bottom: 0.15rem;
	}

	.months__label {
		position: absolute;
		top: 0;
		white-space: nowrap;
	}

	.months__spacer {
		grid-column: 1;
		grid-row: 1;
	}

	.weekdays {
		grid-column: 1;
		grid-row: 2;
	}

	.calendar-scroll {
		grid-column: 2;
		grid-row: 1 / span 2;
		overflow-x: auto;
		/* Keep cell sizing stable/readable; avoid over-compressing into tiny blocks. */
		--cell: clamp(9px, 1.05vw, 12px);
	}

	.weekdays {
		display: grid;
		grid-template-rows: repeat(7, var(--cell));
		gap: var(--day-gap, 2px);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: rgba(243, 246, 255, 0.65);
	}

	.weekdays__label {
		line-height: var(--cell);
	}

	.weekdays__label:nth-child(1) {
		grid-row: 2;
	}
	.weekdays__label:nth-child(2) {
		grid-row: 4;
	}
	.weekdays__label:nth-child(3) {
		grid-row: 6;
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
		border: 1px solid var(--border);
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

	.years {
		display: grid;
		gap: 0.45rem;
		align-content: start;
	}

	.year {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: rgba(243, 246, 255, 0.65);
		padding: 0.22rem 0.45rem;
		border: 1px solid transparent;
		background: transparent;
		line-height: 1.15;
		cursor: pointer;
	}

	.year:hover {
		color: rgba(243, 246, 255, 0.92);
		border-color: var(--border-2);
	}

	.year--current {
		color: rgba(243, 246, 255, 0.95);
		border-color: var(--border);
		background: rgba(54, 242, 194, 0.12);
	}

	@media (max-width: 780px) {
		.chart-main {
			grid-template-columns: 1fr;
		}
		.years {
			grid-auto-flow: column;
			justify-content: start;
			overflow-x: auto;
		}
	}

</style>

