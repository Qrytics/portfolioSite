<script lang="ts">
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

	type ChartProps = {
		years?: GithubContribData[];
		selectedYear?: number | null;
		error?: string | null;
	};

	let {
		years: initialYears = [],
		selectedYear: initialSelectedYear = null,
		error: initialError = null
	}: ChartProps = $props();

	/** Sync with props on first run (SSR has no $effect — must not start as null when years exist). */
	function pickYearFromProps(): number | null {
		if (
			initialSelectedYear != null &&
			initialYears.some((e) => e.year === initialSelectedYear)
		) {
			return initialSelectedYear;
		}
		return initialYears[0]?.year ?? null;
	}

	/** User-picked year only; display year is derived so SSR + first client frame always match props. */
	let userYearOverride = $state<number | null>(null);

	$effect(() => {
		if (userYearOverride != null && !initialYears.some((e) => e.year === userYearOverride)) {
			userYearOverride = null;
		}
	});

	const selectedYear = $derived.by(() => {
		if (userYearOverride != null && initialYears.some((e) => e.year === userYearOverride)) {
			return userYearOverride;
		}
		return pickYearFromProps();
	});

	const weekdayLabels = ['Mon', 'Wed', 'Fri'];
	const selected = $derived(
		selectedYear == null ? null : initialYears.find((e) => e.year === selectedYear) ?? null
	);
	const visibleWeeks = $derived(selected ? selected.weeks : []);
	const weeksCount = $derived(Math.max(visibleWeeks.length, 1));
	const yearOptions = $derived(initialYears.map((e) => e.year).slice(0, 5));
	const selectedMaxContributions = $derived(
		selected
			? Math.max(
					...selected.weeks.flatMap((w) =>
						w.contributionDays.map((d) => d.contributionCount)
					),
					0
				)
			: 0
	);

function monthMarkers(weeks: ContributionWeek[], year: number): Array<{ label: string; index: number }> {
		const out: Array<{ label: string; index: number }> = [];
		let prevKey = '';

		// GitHub's month labels are based on where the first day of each month
		// appears in the 53-week strip. When a week spans Dec -> Jan, the label
		// at the top should jump to Jan even though the week column starts in Dec.
		// So we scan individual days (not just the week's first day) and place the
		// marker at that day's week index.
		const dayEntries: Array<{ weekIndex: number; dateStr: string }> = [];
		for (let wi = 0; wi < weeks.length; wi += 1) {
			for (const day of weeks[wi]?.contributionDays ?? []) {
				if (!day?.date) continue;
				dayEntries.push({ weekIndex: wi, dateStr: day.date });
			}
		}

		dayEntries.sort((a, b) => a.dateStr.localeCompare(b.dateStr));

		for (const entry of dayEntries) {
			const d = new Date(`${entry.dateStr}T00:00:00Z`);
			const y = d.getUTCFullYear();
			const m = d.getUTCMonth();

			// Same as GitHub: show months in the selected year, plus:
			// - Dec of previous year (leading padding)
			// - Jan of next year (repeat "Jan" at the end for spillover columns)
			const inRange = y === year || (y === year + 1 && m === 0) || (y === year - 1 && m === 11);
			if (!inRange) continue;

			const key = `${y}-${m}`;
			if (key === prevKey) continue;

			const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
			out.push({ label: month, index: entry.weekIndex });
			prevKey = key;
		}

		return out;
	}

	function levelForDay(day: ContributionDay): 0 | 1 | 2 | 3 {
		const color = (day.color ?? '').toLowerCase();
		const byColor: Record<string, 0 | 1 | 2 | 3> = {
			'#ebedf0': 0,
			'#9be9a8': 1,
			'#40c463': 2,
			'#30a14e': 3,
			'#216e39': 3
		};

		if (day.contributionCount <= 0) return 0;
		if (color in byColor) return byColor[color];

		const max = selectedMaxContributions;
		if (max <= 0) return 0;
		const normalized = day.contributionCount / max; // 0..1
		if (normalized < 0.34) return 1;
		if (normalized < 0.67) return 2;
		return 3;
	}

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

			{#if initialError}
				<div class="chart-wrap">
					<div class="empty">{initialError}</div>
				</div>
			{:else if selected}
				<div class="chart-wrap">
					{#if visibleWeeks.length > 0}
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
											{#each monthMarkers(visibleWeeks, selected.year) as marker (marker.index)}
												<span
													class="months__label"
													style={`left: calc(${marker.index} * (var(--cell) + var(--week-gap, 3px)));`}
													>{marker.label}</span
												>
											{/each}
										</div>

										<div class="calendar" aria-label={`Contributions for ${selected.year}`}>
											{#each visibleWeeks as week, wi (wi)}
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
								{#each yearOptions as y}
									<button
										type="button"
										class="year"
										class:year--current={y === selectedYear}
										onclick={() => {
											userYearOverride = y;
										}}>{y}</button
									>
								{/each}
							</div>
						</div>
					{:else}
						<div class="empty">Contribution totals are available, but no day-level grid data was returned.</div>
					{/if}

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
			{:else}
				<div class="chart-wrap">
					<div class="empty">No contribution data available for the selected year.</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.github-chart {
		padding: 2rem clamp(1.25rem, 4vw, 3rem) 0;
		/* Default; calendar-scroll overrides for the grid */
		--cell: 11px;
		--week-gap: 3px;
		--day-gap: 2px;
		/* GitHub-like faint squares for zero-contribution days */
		--contrib-empty: rgba(255, 255, 255, 0.06);
	}

	.github-chart__inner {
		max-width: 86rem;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 60%), var(--panel);
		overflow: hidden;
		/* Intrinsic width = full chart; no stretching past content on wide screens */
		width: fit-content;
		max-width: 100%;
		margin-inline: auto;
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
		/* Only narrow viewports scroll; wide screens fit without horizontal scrollbar */
		overflow-x: auto;
		max-width: 100%;
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
		grid-template-columns: max-content auto;
		gap: 1rem;
		align-items: start;
		width: max-content;
		max-width: 100%;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: 2rem max-content;
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
		/* Same vertical band as months row so weekday labels align with calendar rows */
		height: 1rem;
		padding-bottom: 0.15rem;
	}

	.calendar-scroll {
		grid-column: 2;
		grid-row: 1 / span 2;
		overflow-x: visible;
		width: max-content;
		/* Fixed cell size so chart width is predictable; card stops growing once content fits */
		--cell: 11px;
	}

	.weekdays {
		grid-column: 1;
		grid-row: 2;
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
		border-radius: 2px;
		flex-shrink: 0;
		border: 1px solid rgba(255, 255, 255, 0.04);
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
		border-radius: 2px;
		border: 1px solid rgba(255, 255, 255, 0.04);
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

