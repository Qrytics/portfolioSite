<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { playSound } from '$lib/utils/sound';

	type ContributionDay = {
		date: string;
		contributionCount: number;
		color?: string | null;
		outside?: boolean;
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

	const excludedYearButtons = new Set<number>([2024, 2023, 2022]);

	type Period = 'last365' | number;
	let userPeriodOverride = $state<Period | null>(null);

	const availableYears = $derived.by(() => initialYears.filter((y) => !excludedYearButtons.has(y.year)));

	const selectedPeriod = $derived.by((): Period | null => {
		if (availableYears.length === 0) return null;

		if (userPeriodOverride === 'last365') return 'last365';
		if (
			typeof userPeriodOverride === 'number' &&
			availableYears.some((e) => e.year === userPeriodOverride)
		) {
			return userPeriodOverride;
		}

		return 'last365';
	});

	const weekdayLabels = ['Mon', 'Wed', 'Fri'];
	const selectedYear = $derived.by(() => (typeof selectedPeriod === 'number' ? selectedPeriod : null));
	const selected = $derived(
		selectedYear == null ? null : availableYears.find((e) => e.year === selectedYear) ?? null
	);
	const yearOptions = $derived(availableYears.map((e) => e.year).slice(0, 5));
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

	let explodedDays = $state<Set<string>>(new Set());
	let explosionTimers: Record<string, ReturnType<typeof setTimeout>> = {};

	// Cleanup all explosion timers on unmount
	$effect(() => {
		return () => {
			Object.values(explosionTimers).forEach((timer) => clearTimeout(timer));
		};
	});

	function handleDayClick(day: ContributionDay) {
		if (day.outside) return;

		if (explosionTimers[day.date] !== undefined) clearTimeout(explosionTimers[day.date]);
		explodedDays.add(day.date);
		explodedDays = new Set(explodedDays);

		// Play sound with volume scaled by contribution count
		const volume = selectedMaxContributions > 0
			? Math.min(day.contributionCount / selectedMaxContributions, 1.0)
			: 0.5;
		playSound('confetti-pop', volume * 0.8); // 80% of max to keep subtle

		explosionTimers[day.date] = setTimeout(() => {
			explodedDays.delete(day.date);
			explodedDays = new Set(explodedDays);
			delete explosionTimers[day.date];
		}, 3000);
	}

	function clampUtcMidnight(date: Date): Date {
		const d = new Date(date);
		d.setUTCHours(0, 0, 0, 0);
		return d;
	}

	function addUtcDays(date: Date, days: number): Date {
		const d = new Date(date);
		d.setUTCDate(d.getUTCDate() + days);
		return d;
	}

	function isoDateUTC(date: Date): string {
		return date.toISOString().slice(0, 10);
	}

	function startOfWeekMondayUTC(date: Date): Date {
		const d = clampUtcMidnight(date);
		const mondayIndex = (d.getUTCDay() + 6) % 7; // Mon=0 ... Sun=6
		d.setUTCDate(d.getUTCDate() - mondayIndex);
		return d;
	}

	const contribLookup = $derived.by(() => {
		const map = new Map<string, number>();
		for (const y of availableYears) {
			for (const w of y.weeks) {
				for (const d of w.contributionDays) {
					map.set(d.date, d.contributionCount);
				}
			}
		}
		return map;
	});

	function buildRolling365(lookup: Map<string, number>) {
		const end = clampUtcMidnight(new Date());
		const start = addUtcDays(end, -364);
		const gridStart = startOfWeekMondayUTC(start);

		const weeks: ContributionWeek[] = [];
		let totalContributions = 0;
		let maxContribution = 0;

		for (let wi = 0; wi < 53; wi += 1) {
			const contributionDays: ContributionDay[] = [];
			for (let di = 0; di < 7; di += 1) {
				const date = addUtcDays(gridStart, wi * 7 + di);
				const key = isoDateUTC(date);
				const inRange = date >= start && date <= end;
				const contributionCount = inRange ? (lookup.get(key) ?? 0) : 0;
				if (inRange) {
					totalContributions += contributionCount;
					maxContribution = Math.max(maxContribution, contributionCount);
				}
				contributionDays.push({ date: key, contributionCount, color: null, outside: !inRange });
			}
			weeks.push({ contributionDays });
		}

		return { weeks, totalContributions, start, end, maxContribution };
	}

	const rolling = $derived.by(() => buildRolling365(contribLookup));

	const visibleWeeks = $derived.by(() => {
		if (selectedPeriod === 'last365') return rolling.weeks;
		return selected ? selected.weeks : [];
	});

	const weeksCount = $derived(Math.max(visibleWeeks.length, 1));

	const totalCommits = $derived.by(() => {
		if (selectedPeriod === 'last365') return rolling.totalContributions;
		return selected?.totalContributions ?? null;
	});

	const activePeriodLabel = $derived.by(() => {
		if (selectedPeriod === 'last365') return 'last 365 days';
		if (typeof selectedPeriod === 'number') return String(selectedPeriod);
		return 'selected period';
	});

	const maxContribForPeriod = $derived.by(() => {
		if (selectedPeriod === 'last365') return rolling.maxContribution;
		return selectedMaxContributions;
	});

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

		// If two month transitions land on the same week column (e.g. Dec -> Jan),
		// keep the later month so labels never overlap in the same x-position.
		const deduped: Array<{ label: string; index: number }> = [];
		for (const marker of out) {
			const last = deduped[deduped.length - 1];
			if (last?.index === marker.index) {
				deduped[deduped.length - 1] = marker;
			} else {
				deduped.push(marker);
			}
		}

		return deduped;
	}

	function monthMarkersForRange(
		weeks: ContributionWeek[],
		rangeStart: Date,
		rangeEnd: Date
	): Array<{ label: string; index: number }> {
		const out: Array<{ label: string; index: number }> = [];
		let prevKey = '';
		const start = clampUtcMidnight(rangeStart);
		const end = clampUtcMidnight(rangeEnd);

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
			if (d < start || d > end) continue;
			const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
			if (key === prevKey) continue;
			const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
			out.push({ label: month, index: entry.weekIndex });
			prevKey = key;
		}

		const deduped: Array<{ label: string; index: number }> = [];
		for (const marker of out) {
			const last = deduped[deduped.length - 1];
			if (last?.index === marker.index) {
				deduped[deduped.length - 1] = marker;
			} else {
				deduped.push(marker);
			}
		}

		return deduped;
	}

	const visibleMonthMarkers = $derived.by(() => {
		if (selectedPeriod === 'last365') {
			return monthMarkersForRange(visibleWeeks, rolling.start, rolling.end);
		}
		if (!selected) return [];
		return monthMarkers(visibleWeeks, selected.year);
	});

	function levelForDay(day: ContributionDay): 0 | 1 | 2 | 3 | 4 {
		const color = (day.color ?? '').toLowerCase();
		const byColor: Record<string, 0 | 1 | 2 | 3 | 4> = {
			'#ebedf0': 0,
			'#9be9a8': 1,
			'#40c463': 2,
			'#30a14e': 3,
			'#216e39': 4
		};

		if (day.contributionCount <= 0) return 0;
		if (color in byColor) return byColor[color];

		const max = maxContribForPeriod;
		if (max <= 0) return 0;
		const normalized = day.contributionCount / max; // 0..1
		if (normalized < 0.25) return 1;
		if (normalized < 0.5) return 2;
		if (normalized < 0.75) return 3;
		return 4;
	}

	function contributionTooltip(day: ContributionDay): string | null {
		if (day.contributionCount < 1) return null;
		return `${day.contributionCount} contributions`;
	}

</script>

<section class="github-chart" aria-label="GitHub commit history">
	<div class="github-chart__inner">
		<div class="card">
			<div class="termbar">
				<span class="termbar__prompt">#</span>
				<a class="termbar__label" href={profile.github} target="_blank" rel="noopener noreferrer">
					github commit history ↗
				</a>
				<span class="termbar__meta">Total commits: {totalCommits ?? '--'}</span>
			</div>

			{#if initialError}
				<div class="chart-wrap">
					<div class="empty">{initialError}</div>
				</div>
			{:else if selectedPeriod != null}
				<div class="chart-wrap">
					{#if visibleWeeks.length > 0}
						<div class="chart-main">
							<div class="calendar-shell">
								<div class="calendar-grid" aria-hidden="true">
									<div class="months__spacer"></div>
									<div class="weekdays" aria-hidden="true">
										{#each weekdayLabels as wd (wd)}
											<div class="weekdays__label">{wd}</div>
										{/each}
									</div>

									<div class="calendar-scroll" style={`--weeks: ${weeksCount};`}>
										<div class="months__content">
											{#each visibleMonthMarkers as marker, markerIdx (`${marker.index}-${marker.label}-${markerIdx}`)}
												<span
													class="months__label"
													style={`left: calc(${marker.index} * (var(--cell) + var(--week-gap, 3px)));`}
													>{marker.label}</span
												>
											{/each}
										</div>

										<div class="calendar" aria-label={`Contributions for ${activePeriodLabel}`}>
											{#each visibleWeeks as week, wi (wi)}
												<div class="week">
													{#each week.contributionDays as day (day.date)}
														<button
															type="button"
															class={['day', explodedDays.has(day.date) && 'day--exploded'].filter(Boolean).join(' ')}
															data-level={levelForDay(day)}
															data-outside={day.outside ? 'true' : undefined}
															data-tooltip={contributionTooltip(day) ?? undefined}
															disabled={day.outside}
															onclick={() => handleDayClick(day)}
															aria-label={`${day.date}: ${day.contributionCount} contributions`}
														>
															{#if explodedDays.has(day.date)}
																{#each Array.from({ length: 12 }) as _, confetti}
																	<span class={`confetti confetti-${confetti}`}></span>
																{/each}
															{/if}
														</button>
													{/each}
												</div>
											{/each}
										</div>
									</div>
								</div>
							</div>

							<div class="years" aria-label="Contribution years">
								<button
									type="button"
									class="year year--wide"
									class:year--current={selectedPeriod === 'last365'}
									onclick={() => {
										userPeriodOverride = 'last365';
									}}
								>
									Last 365d
								</button>
								{#each yearOptions as y (y)}
									<button
										type="button"
										class="year"
										class:year--current={y === selectedPeriod}
										onclick={() => {
											userPeriodOverride = y;
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
							<span class="legend__square" data-level="4"></span>
						</div>
						<span class="legend__label">More</span>
					</div>
				</div>
			{:else}
				<div class="chart-wrap">
					<div class="empty">No contribution data available for the selected period.</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.github-chart {
		padding: 0 clamp(1.25rem, 4vw, 3rem) 0;
		/* Default; calendar-scroll overrides for the grid */
		--cell: 11px;
		--week-gap: 3px;
		--day-gap: 2px;
		/* GitHub-like faint squares for zero-contribution days */
		--contrib-empty: rgba(255, 255, 255, 0.06);
	}

	/* Hide on mobile - chart is too complex for small screens */
	@media (max-width: 640px) {
		.github-chart {
			display: none;
		}
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
		min-width: 0;
	}

	.termbar__prompt {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 700;
		flex-shrink: 0;
	}

	.termbar__label {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: rgba(243, 246, 255, 0.92);
		letter-spacing: 0.04em;
		text-decoration: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1 1 auto;
		text-transform: lowercase;
	}

	.termbar__label:hover {
		text-decoration: underline;
	}

	.termbar__meta {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--muted);
		flex-shrink: 0;
		white-space: nowrap;
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
		grid-row: 1;
	}
	.weekdays__label:nth-child(2) {
		grid-row: 3;
	}
	.weekdays__label:nth-child(3) {
		grid-row: 5;
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
		position: relative;
		padding: 0;
		appearance: none;
		-webkit-appearance: none;
		overflow: visible;
		cursor: pointer;
	}

	/* Expand clickable area to cover gaps */
	.day::before {
		content: '';
		position: absolute;
		inset: calc(var(--day-gap, 2px) / -2);
		z-index: -1;
	}

	.day:disabled {
		cursor: default;
	}

	.day[data-level='0'] {
		background: var(--contrib-empty);
	}
	.day[data-outside='true'] {
		background: transparent;
		border-color: transparent;
		pointer-events: none;
	}
	.day[data-level='1'] {
		background: rgba(54, 242, 194, 0.22);
	}
	.day[data-level='2'] {
		background: rgba(54, 242, 194, 0.45);
	}
	.day[data-level='3'] {
		background: rgba(54, 242, 194, 0.7);
	}
	.day[data-level='4'] {
		background: rgba(54, 242, 194, 0.95);
	}

	.day:not([data-outside='true']):hover {
		transform: translateY(-1px) scale(1.08);
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 24%, white),
			0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
	}

	.day--exploded {
		animation: day-explode 0.26s ease-out forwards;
	}

	.day--exploded::after {
		content: '';
		position: absolute;
		inset: -30%;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--accent) 45%, white),
			color-mix(in srgb, var(--accent) 20%, white) 35%,
			transparent 72%
		);
		animation: day-blast 0.34s ease-out;
		pointer-events: none;
	}

	.confetti {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0.18rem;
		height: 0.18rem;
		border-radius: 1px;
		background: color-mix(in srgb, var(--accent) 72%, white);
		box-shadow: 0 0 0.18rem color-mix(in srgb, var(--accent) 58%, white);
		pointer-events: none;
	}

	.confetti-0 {
		animation: confetti-burst-0 0.55s ease-out forwards;
	}
	.confetti-1 {
		animation: confetti-burst-1 0.6s ease-out forwards;
	}
	.confetti-2 {
		animation: confetti-burst-2 0.58s ease-out forwards;
	}
	.confetti-3 {
		animation: confetti-burst-3 0.62s ease-out forwards;
	}
	.confetti-4 {
		animation: confetti-burst-4 0.56s ease-out forwards;
	}
	.confetti-5 {
		animation: confetti-burst-5 0.6s ease-out forwards;
	}
	.confetti-6 {
		animation: confetti-burst-6 0.57s ease-out forwards;
	}
	.confetti-7 {
		animation: confetti-burst-7 0.61s ease-out forwards;
	}
	.confetti-8 {
		animation: confetti-burst-8 0.55s ease-out forwards;
	}
	.confetti-9 {
		animation: confetti-burst-9 0.6s ease-out forwards;
	}
	.confetti-10 {
		animation: confetti-burst-10 0.58s ease-out forwards;
	}
	.confetti-11 {
		animation: confetti-burst-11 0.61s ease-out forwards;
	}

	@keyframes day-explode {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(0.12);
			opacity: 0;
		}
	}

	@keyframes day-blast {
		0% {
			transform: scale(0);
			opacity: 0.75;
		}
		100% {
			transform: scale(2.6);
			opacity: 0;
		}
	}

	@keyframes confetti-burst-0 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(120px, -150px) scale(0.2) rotate(720deg); }
	}
	@keyframes confetti-burst-1 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-135px, -165px) scale(0.16) rotate(-680deg); }
	}
	@keyframes confetti-burst-2 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(165px, -90px) scale(0.18) rotate(650deg); }
	}
	@keyframes confetti-burst-3 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-155px, 125px) scale(0.17) rotate(-720deg); }
	}
	@keyframes confetti-burst-4 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(150px, 105px) scale(0.19) rotate(700deg); }
	}
	@keyframes confetti-burst-5 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-120px, -135px) scale(0.17) rotate(-650deg); }
	}
	@keyframes confetti-burst-6 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(135px, 145px) scale(0.2) rotate(680deg); }
	}
	@keyframes confetti-burst-7 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-175px, 85px) scale(0.15) rotate(-700deg); }
	}
	@keyframes confetti-burst-8 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(160px, -115px) scale(0.18) rotate(720deg); }
	}
	@keyframes confetti-burst-9 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-140px, 140px) scale(0.16) rotate(-680deg); }
	}
	@keyframes confetti-burst-10 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(100px, 155px) scale(0.17) rotate(650deg); }
	}
	@keyframes confetti-burst-11 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-155px, -100px) scale(0.19) rotate(-720deg); }
	}

	@media (hover: hover) and (pointer: fine) {
		.day[data-tooltip] {
			cursor: pointer;
		}

		.day[data-tooltip]:hover::after {
			content: attr(data-tooltip);
			position: absolute;
			left: 50%;
			bottom: calc(100% + 8px);
			transform: translateX(-50%);
			padding: 0.28rem 0.45rem;
			border-radius: 0.35rem;
			font-family: var(--font-mono);
			font-size: 0.68rem;
			line-height: 1.2;
			white-space: nowrap;
			color: rgba(243, 246, 255, 0.96);
			background: rgba(8, 11, 17, 0.96);
			border: 1px solid var(--border-2);
			box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
			z-index: 3;
			pointer-events: none;
		}

		.day[data-tooltip]:hover::before {
			content: '';
			position: absolute;
			left: 50%;
			bottom: calc(100% + 3px);
			transform: translateX(-50%);
			width: 6px;
			height: 6px;
			background: rgba(8, 11, 17, 0.96);
			border-bottom: 1px solid var(--border-2);
			border-right: 1px solid var(--border-2);
			rotate: 45deg;
			z-index: 3;
			pointer-events: none;
		}
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
		background: rgba(54, 242, 194, 0.7);
	}
	.legend__square[data-level='4'] {
		background: rgba(54, 242, 194, 0.95);
	}

	.years {
		display: grid;
		gap: 0.45rem;
		align-content: start;
		justify-items: end;
	}

	.year {
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: rgba(243, 246, 255, 0.65);
		padding: 0.22rem 0.45rem;
		border: 1px solid var(--border-2);
		background: transparent;
		line-height: 1.15;
		cursor: pointer;
		text-align: right;
		width: 3.7rem;
	}

	.year--wide {
		width: auto;
		text-align: left;
	}

	.year:hover {
		color: rgba(243, 246, 255, 0.92);
		border-color: color-mix(in srgb, var(--accent) 28%, var(--border-2));
	}

	.year--current {
		color: rgba(243, 246, 255, 0.98);
		border-color: var(--accent);
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

