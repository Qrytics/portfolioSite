<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { profile } from '$lib/data/profile';
	import { playSound } from '$lib/utils/sound';
	import { portal } from '$lib/utils/portal';

	import type { ContributionDay as BaseDay } from '$lib/utils/githubData';

	/**
	 * The wire shape plus one render-only flag. `buildRolling365` pads the first and last columns
	 * out to whole Monday-aligned weeks, and those padding cells are real days that fall outside the
	 * window — they occupy grid space but are not interactive and are excluded from every total.
	 *
	 * The base shape is imported rather than restated: it used to carry a `color?: string | null`
	 * field too, which nothing read (levels are derived from the count so the ramp can theme with
	 * `--accent`) and which the generator and both API routes have since stopped emitting.
	 */
	type ContributionDay = BaseDay & { outside?: boolean };

	type ContributionWeek = {
		contributionDays: ContributionDay[];
	};

	/** Local rather than imported from `githubData` so `weeks` carries the `outside` flag above.
	 *  Payloads without it are still assignable, since the flag is optional. */
	type GithubContribData = {
		year: number;
		totalContributions: number;
		weeks: ContributionWeek[];
	};

	type ChartProps = {
		years?: GithubContribData[];
		error?: string | null;
	};

	let { years: initialYears = [], error: initialError = null }: ChartProps = $props();

	/** How many of the most recent years get their own button. Computed, not hardcoded,
	 *  so the list ages correctly instead of silently gaining a year every January. */
	const YEAR_BUTTON_COUNT = 2;

	const PHONE_QUERY = '(max-width: 640px)';

	/** Rows run Monday (0) -> Sunday (6); labels only on Mon/Wed/Fri like GitHub. */
	const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const weekdayShort = ['Mon', '', 'Wed', '', 'Fri', '', ''];

	type Period = 'last365' | number;
	let userPeriodOverride = $state<Period | null>(null);

	/** Only show the chart's error state when there is genuinely nothing to draw.
	 *  `+page.ts` can hand us good fallback data *and* an error string at the same time. */
	const hasData = $derived(initialYears.some((y) => y.weeks.length > 0));

	/** Newest N years, descending. */
	const yearOptions = $derived.by(() =>
		[...initialYears]
			.map((y) => y.year)
			.sort((a, b) => b - a)
			.slice(0, YEAR_BUTTON_COUNT)
	);

	const selectedPeriod = $derived.by((): Period | null => {
		if (!hasData) return null;
		if (typeof userPeriodOverride === 'number' && yearOptions.includes(userPeriodOverride)) {
			return userPeriodOverride;
		}
		return 'last365';
	});

	const selectedYear = $derived(typeof selectedPeriod === 'number' ? selectedPeriod : null);
	const selected = $derived(
		selectedYear == null ? null : (initialYears.find((e) => e.year === selectedYear) ?? null)
	);

	// ---------------------------------------------------------------- date helpers

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

	/** Monday=0 ... Sunday=6 for an ISO `YYYY-MM-DD` string. */
	function weekdayRow(dateStr: string): number {
		const d = new Date(`${dateStr}T00:00:00Z`);
		return (d.getUTCDay() + 6) % 7;
	}

	function plural(n: number): string {
		return n === 1 ? 'contribution' : 'contributions';
	}

	function longDate(dateStr: string): string {
		const d = new Date(`${dateStr}T00:00:00Z`);
		return d.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			timeZone: 'UTC'
		});
	}

	// ---------------------------------------------------------------- data shaping

	/** Indexed over *every* loaded year, not just the ones with buttons — otherwise
	 *  hiding a year's button also deletes its days from the rolling-365 window. */
	const contribLookup = $derived.by(() => {
		const map = new Map<string, number>();
		for (const y of initialYears) {
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
				contributionDays.push({ date: key, contributionCount, outside: !inRange });
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

	/**
	 * Row-major grid: 7 rows (Mon..Sun) x N week columns, each day placed by its *actual*
	 * weekday. This is what fixes the first-column-shifted-up-one-row bug — GitHub's first
	 * calendar week of a year is partial, and CSS grid auto-placement used to pack those days
	 * from row 1 instead of from their real weekday.
	 */
	const calendarRows = $derived.by(() => {
		const weeks = visibleWeeks;
		const rows: (ContributionDay | null)[][] = Array.from({ length: 7 }, () =>
			new Array<ContributionDay | null>(weeks.length).fill(null)
		);
		for (let wi = 0; wi < weeks.length; wi += 1) {
			for (const day of weeks[wi]?.contributionDays ?? []) {
				if (!day?.date) continue;
				rows[weekdayRow(day.date)][wi] = day;
			}
		}
		return rows;
	});

	const weeksCount = $derived(visibleWeeks.length);

	const totalCommits = $derived.by(() => {
		if (selectedPeriod === 'last365') return rolling.totalContributions;
		return selected?.totalContributions ?? null;
	});

	const activePeriodLabel = $derived.by(() => {
		if (selectedPeriod === 'last365') return 'the last 365 days';
		if (typeof selectedPeriod === 'number') return String(selectedPeriod);
		return 'the selected period';
	});

	const maxContribForPeriod = $derived.by(() => {
		if (selectedPeriod === 'last365') return rolling.maxContribution;
		if (!selected) return 0;
		return Math.max(
			0,
			...selected.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount))
		);
	});

	function levelForDay(day: ContributionDay): 0 | 1 | 2 | 3 | 4 {
		if (day.contributionCount <= 0) return 0;
		const max = maxContribForPeriod;
		if (max <= 0) return 0;
		const normalized = day.contributionCount / max; // 0..1
		if (normalized < 0.25) return 1;
		if (normalized < 0.5) return 2;
		if (normalized < 0.75) return 3;
		return 4;
	}

	// ---------------------------------------------------------------- month header

	function monthMarkers(weeks: ContributionWeek[]): Array<{ label: string; index: number }> {
		const out: Array<{ label: string; index: number }> = [];
		let prevKey = '';

		const dayEntries: Array<{ weekIndex: number; dateStr: string }> = [];
		for (let wi = 0; wi < weeks.length; wi += 1) {
			for (const day of weeks[wi]?.contributionDays ?? []) {
				if (!day?.date || day.outside) continue;
				dayEntries.push({ weekIndex: wi, dateStr: day.date });
			}
		}
		dayEntries.sort((a, b) => a.dateStr.localeCompare(b.dateStr));

		for (const entry of dayEntries) {
			const d = new Date(`${entry.dateStr}T00:00:00Z`);
			const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
			if (key === prevKey) continue;
			out.push({
				label: d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }),
				index: entry.weekIndex
			});
			prevKey = key;
		}

		// Two transitions landing on the same column (Dec -> Jan) would overlap; keep the later.
		const deduped: Array<{ label: string; index: number }> = [];
		for (const marker of out) {
			const last = deduped[deduped.length - 1];
			if (last?.index === marker.index) deduped[deduped.length - 1] = marker;
			else deduped.push(marker);
		}
		return deduped;
	}

	/**
	 * Month labels as real `<td colspan>` cells in a `<thead>` row, the way GitHub does it.
	 * Column alignment is then a property of the table, not of hand-tuned absolute offsets.
	 */
	const monthSpans = $derived.by(() => {
		const markers = monthMarkers(visibleWeeks);
		const total = weeksCount;
		if (total === 0) return [];
		if (markers.length === 0) return [{ key: 'all', label: '', span: total }];

		const out: Array<{ key: string; label: string; span: number }> = [];
		if (markers[0].index > 0) {
			out.push({ key: 'lead', label: '', span: markers[0].index });
		}
		for (let i = 0; i < markers.length; i += 1) {
			const start = markers[i].index;
			const end = i + 1 < markers.length ? markers[i + 1].index : total;
			out.push({
				key: `${markers[i].label}-${start}`,
				label: markers[i].label,
				span: Math.max(end - start, 1)
			});
		}
		return out;
	});

	// ---------------------------------------------------------------- monthly bars (phone)

	const monthlyTotals = $derived.by(() => {
		const buckets = new Map<string, { key: string; label: string; short: string; total: number }>();
		for (const week of visibleWeeks) {
			for (const day of week.contributionDays) {
				if (day.outside) continue;
				const d = new Date(`${day.date}T00:00:00Z`);
				const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
				const existing = buckets.get(key);
				if (existing) {
					existing.total += day.contributionCount;
				} else {
					buckets.set(key, {
						key,
						label: d.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
						short: d.toLocaleString('en-US', { month: 'narrow', timeZone: 'UTC' }),
						total: day.contributionCount
					});
				}
			}
		}
		return [...buckets.values()].sort((a, b) => a.key.localeCompare(b.key));
	});

	const monthlyMax = $derived(Math.max(1, ...monthlyTotals.map((m) => m.total)));

	let activeMonthKey = $state<string | null>(null);
	const activeMonth = $derived(monthlyTotals.find((m) => m.key === activeMonthKey) ?? null);

	// ---------------------------------------------------------------- viewport gate

	/** The chart is client-only (the home page mounts it on an idle callback), so reading
	 *  matchMedia during init is safe and avoids a desktop-layout flash on phones. */
	let isPhone = $state(
		typeof window !== 'undefined' ? window.matchMedia(PHONE_QUERY).matches : false
	);
	let showPhoneGrid = $state(false);

	$effect(() => {
		const mq = window.matchMedia(PHONE_QUERY);
		const onChange = (event: MediaQueryListEvent) => {
			isPhone = event.matches;
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	// ---------------------------------------------------------------- explosions

	const EXPLOSION_MS = 640; // longest confetti animation is 0.62s
	const explodedDays = new SvelteSet<string>();
	let explosionTimers: Record<string, ReturnType<typeof setTimeout>> = {};

	$effect(() => {
		return () => {
			Object.values(explosionTimers).forEach((timer) => clearTimeout(timer));
			explosionTimers = {};
		};
	});

	function explode(date: string, count: number) {
		if (explosionTimers[date] !== undefined) clearTimeout(explosionTimers[date]);
		explodedDays.add(date);

		const max = maxContribForPeriod;
		const volume = max > 0 ? Math.min(count / max, 1) : 0.5;
		playSound('confetti-pop', volume * 0.8);

		explosionTimers[date] = setTimeout(() => {
			explodedDays.delete(date);
			delete explosionTimers[date];
		}, EXPLOSION_MS);
	}

	// ---------------------------------------------------------------- tooltip

	/**
	 * One portalled tooltip for the whole grid instead of ~371 `::after` pseudo-elements.
	 * Being `position: fixed` on `<body>` it escapes `.card { overflow: hidden }` and
	 * `.chart-wrap { overflow-x: auto }`, and it can't be painted over by later cells the
	 * way a z-indexed child of a transformed cell could.
	 */
	let tipEl = $state<HTMLDivElement | undefined>(undefined);
	let tipVisible = $state(false);
	let tipBelow = $state(false);

	/**
	 * The grid is wider than a phone at any usable cell size, so open it at the *recent* end —
	 * the newest week is what people came to see, and it's the far right of the scroller.
	 */
	function scrollToLatest(node: HTMLElement) {
		const settle = () => {
			node.scrollLeft = node.scrollWidth;
		};
		settle();
		// One more pass after layout settles (fonts/`clamp()` cell sizing can change the width).
		const raf = requestAnimationFrame(settle);
		return { destroy: () => cancelAnimationFrame(raf) };
	}

	function cellFromEvent(event: Event): HTMLElement | null {
		const target = event.target;
		if (!(target instanceof Element)) return null;
		const cell = target.closest<HTMLElement>('.day');
		return cell && cell.dataset.outside !== 'true' ? cell : null;
	}

	function showTip(cell: HTMLElement) {
		const el = tipEl;
		if (!el) return;
		const count = Number(cell.dataset.count ?? '0');
		const date = cell.dataset.date ?? '';
		// Text and position are written imperatively: this runs on every pointer move across
		// the grid, and measuring needs the new text in the DOM *now*, not after a flush.
		el.textContent = `${count} ${plural(count)} · ${longDate(date)}`;

		const rect = cell.getBoundingClientRect();
		// `visibility: hidden` (rather than `display: none`) keeps the node measurable.
		const width = el.offsetWidth;
		const height = el.offsetHeight;
		const edge = 8;
		const gap = 8;

		const centre = rect.left + rect.width / 2;
		const x = Math.max(edge, Math.min(centre - width / 2, window.innerWidth - width - edge));
		let y = rect.top - height - gap;
		let below = false;
		if (y < edge) {
			// Top row would be clipped off-screen — flip under the cell instead.
			y = rect.bottom + gap;
			below = true;
		}

		el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
		el.style.setProperty('--arrow-x', `${Math.round(centre - x)}px`);
		tipBelow = below;
		tipVisible = true;
	}

	function hideTip() {
		tipVisible = false;
	}

	// ---------------------------------------------------------------- grid interaction
	// All of these are delegated on the table, so 371 cells cost 5 listeners and zero
	// per-cell closures rather than ~1500 listeners.

	function onGridPointerOver(event: PointerEvent) {
		const cell = cellFromEvent(event);
		// Deliberately *not* hiding when the pointer is between cells: `border-spacing` belongs
		// to the table, so every cell-to-cell move crosses it. Hiding there would flicker the
		// tooltip on every traverse. `pointerleave` on the table is what dismisses it.
		if (cell) showTip(cell);
	}

	function onGridFocusIn(event: FocusEvent) {
		const cell = cellFromEvent(event);
		if (!cell) return;
		focusPos = { row: Number(cell.dataset.row ?? '0'), col: Number(cell.dataset.col ?? '0') };
		showTip(cell);
	}

	function onGridClick(event: MouseEvent) {
		const cell = cellFromEvent(event);
		if (!cell) return;
		showTip(cell);
		explode(cell.dataset.date ?? '', Number(cell.dataset.count ?? '0'));
	}

	let focusPos = $state<{ row: number; col: number } | null>(null);

	/** Most recent real day, so keyboard entry lands on "today" rather than a year ago. */
	const defaultFocus = $derived.by(() => {
		const rows = calendarRows;
		for (let col = weeksCount - 1; col >= 0; col -= 1) {
			for (let row = 6; row >= 0; row -= 1) {
				const day = rows[row]?.[col];
				if (day && !day.outside) return { row, col };
			}
		}
		return { row: 0, col: 0 };
	});

	function isFocusable(row: number, col: number): boolean {
		const day = calendarRows[row]?.[col];
		return !!day && !day.outside;
	}

	/** Revalidated rather than stored: switching period changes the grid's dimensions, and a
	 *  stale `focusPos` would leave no cell with `tabindex="0"` — i.e. an unreachable grid. */
	const activeFocus = $derived.by(() => {
		const pos = focusPos;
		return pos && isFocusable(pos.row, pos.col) ? pos : defaultFocus;
	});

	/** Step until we land on a real day, so arrow keys never stall on padding cells. */
	function seek(row: number, col: number, dRow: number, dCol: number) {
		let r = row;
		let c = col;
		for (let i = 0; i < 400; i += 1) {
			r += dRow;
			c += dCol;
			if (r < 0 || r > 6 || c < 0 || c >= weeksCount) return null;
			if (isFocusable(r, c)) return { row: r, col: c };
		}
		return null;
	}

	function focusCell(pos: { row: number; col: number }, grid: HTMLElement) {
		focusPos = pos;
		const next = grid.querySelector<HTMLElement>(
			`.day[data-row='${pos.row}'][data-col='${pos.col}']`
		);
		next?.focus();
	}

	function onGridKeydown(event: KeyboardEvent) {
		const cell = cellFromEvent(event);
		if (!cell) return;
		const grid = event.currentTarget as HTMLElement;
		const row = Number(cell.dataset.row ?? '0');
		const col = Number(cell.dataset.col ?? '0');

		let next: { row: number; col: number } | null = null;
		switch (event.key) {
			case 'ArrowRight':
				next = seek(row, col, 0, 1);
				break;
			case 'ArrowLeft':
				next = seek(row, col, 0, -1);
				break;
			case 'ArrowDown':
				next = seek(row, col, 1, 0);
				break;
			case 'ArrowUp':
				next = seek(row, col, -1, 0);
				break;
			case 'Home':
				next = isFocusable(row, 0) ? { row, col: 0 } : seek(row, 0, 0, 1);
				break;
			case 'End':
				next = isFocusable(row, weeksCount - 1)
					? { row, col: weeksCount - 1 }
					: seek(row, weeksCount - 1, 0, -1);
				break;
			case 'PageDown':
				next = seek(row, Math.min(col + 3, weeksCount - 1), 0, 1) ?? seek(row, col, 0, 1);
				break;
			case 'PageUp':
				next = seek(row, Math.max(col - 3, 0), 0, -1) ?? seek(row, col, 0, -1);
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				explode(cell.dataset.date ?? '', Number(cell.dataset.count ?? '0'));
				return;
			case 'Escape':
				hideTip();
				return;
			default:
				return;
		}

		if (next) {
			event.preventDefault();
			focusCell(next, grid);
		}
	}
</script>

<!-- Portalled to <body> so no ancestor's overflow or stacking context can clip it. -->
<div
	class="contrib-tip"
	class:contrib-tip--visible={tipVisible}
	class:contrib-tip--below={tipBelow}
	role="tooltip"
	aria-hidden="true"
	bind:this={tipEl}
	use:portal
></div>

{#snippet calendarTable()}
	<table
		class="calendar"
		role="grid"
		aria-label={`Contributions for ${activePeriodLabel}`}
		onpointerover={onGridPointerOver}
		onpointerleave={hideTip}
		onfocusin={onGridFocusIn}
		onfocusout={hideTip}
		onclick={onGridClick}
		onkeydown={onGridKeydown}
	>
		<!-- `table-layout: fixed` takes column widths from the first row, and the first row is
		     the `colspan`'d month header — so without an explicit colgroup a long month label
		     would dictate cell size. These <col>s pin the geometry instead. -->
		<colgroup>
			<col class="col-labels" />
			{#each { length: weeksCount } as _, weekCol (weekCol)}
				<col class="col-week" />
			{/each}
		</colgroup>
		<thead>
			<tr>
				<td class="corner"></td>
				{#each monthSpans as month (month.key)}
					<td class="months__label" colspan={month.span}>
						{month.span >= 3 ? month.label : ''}
					</td>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each calendarRows as row, rowIndex (rowIndex)}
				<tr>
					<th class="weekdays__label" scope="row" role="rowheader">
						<span class="sr-only">{weekdayNames[rowIndex]}</span>
						<span aria-hidden="true">{weekdayShort[rowIndex]}</span>
					</th>
					{#each row as day, colIndex (day?.date ?? `pad-${rowIndex}-${colIndex}`)}
						{#if day && !day.outside}
							<td
								class="day"
								class:day--exploded={explodedDays.has(day.date)}
								role="gridcell"
								tabindex={activeFocus.row === rowIndex && activeFocus.col === colIndex ? 0 : -1}
								data-level={levelForDay(day)}
								data-date={day.date}
								data-count={day.contributionCount}
								data-row={rowIndex}
								data-col={colIndex}
								aria-label={`${day.contributionCount} ${plural(day.contributionCount)} on ${longDate(day.date)}`}
							>
								{#if explodedDays.has(day.date)}
									{#each Array.from({ length: 12 }) as _, confetti (confetti)}
										<span class={`confetti confetti-${confetti}`}></span>
									{/each}
								{/if}
							</td>
						{:else}
							<!-- Padding for partial first/last weeks. Kept as a real gridcell so every
							     row reports the same cell count to assistive tech. -->
							<td class="day" role="gridcell" data-outside="true"></td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

{#snippet monthBars()}
	<div class="bars">
		<div class="bars__row" role="group" aria-label={`Monthly contributions for ${activePeriodLabel}`}>
			{#each monthlyTotals as month (month.key)}
				<button
					type="button"
					class="bar"
					class:bar--active={month.key === activeMonthKey}
					aria-pressed={month.key === activeMonthKey}
					aria-label={`${month.label}: ${month.total} ${plural(month.total)}`}
					onclick={() => {
						activeMonthKey = activeMonthKey === month.key ? null : month.key;
					}}
				>
					<span
						class="bar__fill"
						style={`height: ${Math.max(4, Math.round((month.total / monthlyMax) * 100))}%;`}
					></span>
					<span class="bar__tick" aria-hidden="true">{month.short}</span>
				</button>
			{/each}
		</div>
		<p class="bars__readout" aria-live="polite">
			{#if activeMonth}
				<strong>{activeMonth.label}</strong> — {activeMonth.total} {plural(activeMonth.total)}
			{:else}
				Tap a month for its total.
			{/if}
		</p>
	</div>
{/snippet}

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

			{#if !hasData}
				<div class="chart-wrap">
					<div class="empty">
						{initialError ?? 'No contribution data available for the selected period.'}
					</div>
				</div>
			{:else}
				<div class="chart-wrap">
					<div class="chart-main">
						{#if isPhone}
							<div class="phone">
								{@render monthBars()}
								<button
									type="button"
									class="disclose"
									aria-expanded={showPhoneGrid}
									onclick={() => {
										showPhoneGrid = !showPhoneGrid;
										if (!showPhoneGrid) hideTip();
									}}
								>
									{showPhoneGrid ? 'hide full day grid ↑' : 'show full day grid ↓'}
								</button>
								{#if showPhoneGrid}
									<div class="phone__scroll" use:scrollToLatest>
										{@render calendarTable()}
									</div>
								{/if}
							</div>
						{:else}
							<div class="calendar-scroll" use:scrollToLatest>
								{@render calendarTable()}
							</div>
						{/if}

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

					<div class="legend">
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
			{/if}
		</div>
	</div>
</section>

<style>
	.github-chart {
		padding: 0 clamp(1.25rem, 4vw, 3rem) 0;
		--cell: 11px;
		--week-gap: 3px;
		--day-gap: 2px;

		/* Contribution ramp. Measured for contrast: level 1 now sits at 1.75:1 against an
		   empty day (was 1.50:1), which is the "did I commit that day?" comparison. */
		--contrib-empty: color-mix(in srgb, var(--text) 10%, transparent);
		--contrib-l1: color-mix(in srgb, var(--accent) 30%, transparent);
		--contrib-l2: color-mix(in srgb, var(--accent) 52%, transparent);
		--contrib-l3: color-mix(in srgb, var(--accent) 74%, transparent);
		--contrib-l4: color-mix(in srgb, var(--accent) 97%, transparent);
		--contrib-border: color-mix(in srgb, var(--text) 5%, transparent);
	}

	/* Light mode previously hardcoded GitHub's greens, so `--accent` didn't retheme the
	   chart at all — and empty vs. one contribution differed by *hue only* (gray vs green),
	   which is 1.13:1 and a deutan/protan confusion pair. This ramp is a single hue with
	   monotone lightness derived from `--accent`: every step is a lightness step, empty->L1
	   measures 1.71:1, and it survives colourblind simulation. */
	:global([data-theme='light']) .github-chart {
		--contrib-empty: var(--clr-surface-tonal-a10);
		--contrib-l1: color-mix(in srgb, var(--accent) 60%, white);
		--contrib-l2: color-mix(in srgb, var(--accent) 80%, white);
		--contrib-l3: var(--accent);
		--contrib-l4: color-mix(in srgb, var(--accent) 78%, black);
		--contrib-border: color-mix(in srgb, var(--text) 12%, transparent);
	}

	.github-chart__inner {
		max-width: 86rem;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.card {
		border: 1px solid var(--border);
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--text) 3%, transparent), transparent 60%),
			var(--panel);
		overflow: hidden;
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
		background: color-mix(in srgb, black 22%, transparent);
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
		color: var(--text);
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
		max-width: 100%;
	}

	.empty {
		border: 1px dashed color-mix(in srgb, var(--text) 25%, transparent);
		padding: 1rem;
		color: var(--muted);
		font-family: var(--font-mono);
	}

	.chart-main {
		display: grid;
		grid-template-columns: max-content auto;
		gap: 1rem;
		align-items: start;
		width: max-content;
		max-width: 100%;
	}

	.calendar-scroll {
		overflow-x: auto;
		overscroll-behavior-x: contain;
		max-width: 100%;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	/* ---------------------------------------------------------------- calendar table */

	.calendar {
		border-collapse: separate;
		border-spacing: var(--week-gap) var(--day-gap);
		table-layout: fixed;
		font-family: var(--font-mono);
	}

	.col-labels {
		width: 2rem;
	}

	.col-week {
		width: var(--cell);
	}

	.months__label {
		height: 1rem;
		font-size: 0.72rem;
		color: color-mix(in srgb, var(--text) 68%, transparent);
		text-align: left;
		vertical-align: bottom;
		font-weight: 400;
		overflow: hidden;
		white-space: nowrap;
	}

	.weekdays__label {
		width: 2rem;
		font-size: 0.72rem;
		font-weight: 400;
		color: color-mix(in srgb, var(--text) 68%, transparent);
		text-align: left;
		vertical-align: middle;
		white-space: nowrap;
	}

	.day {
		width: var(--cell);
		height: var(--cell);
		min-width: var(--cell);
		padding: 0;
		background: var(--contrib-empty);
		border: 1px solid var(--contrib-border);
		border-radius: 2px;
		position: relative;
		cursor: pointer;
		box-sizing: border-box;
		/* confetti needs to escape the cell */
		overflow: visible;
	}

	.day[data-level='1'] {
		background: var(--contrib-l1);
	}
	.day[data-level='2'] {
		background: var(--contrib-l2);
	}
	.day[data-level='3'] {
		background: var(--contrib-l3);
	}
	.day[data-level='4'] {
		background: var(--contrib-l4);
	}

	.day[data-outside='true'] {
		background: transparent;
		border-color: transparent;
		pointer-events: none;
		cursor: default;
	}

	/* Hover feedback stays *inside* the cell. The old rule used
	   `box-shadow: 0 0 0 1px …white` plus `scale(1.08)`, which drew a pale rounded square
	   larger than the cell and lifted 1px — reading as a stray outline straddling two cells. */
	.day:not([data-outside='true']):hover {
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text) 60%, transparent);
	}

	.day:focus-visible {
		outline: 1px solid var(--text);
		outline-offset: 1px;
		box-shadow: inset 0 0 0 1px var(--panel);
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

	/* ---------------------------------------------------------------- tooltip */

	.contrib-tip {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 900;
		pointer-events: none;
		visibility: hidden;
		opacity: 0;
		padding: 0.28rem 0.45rem;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		line-height: 1.2;
		white-space: nowrap;
		color: var(--text);
		background: var(--panel-2);
		border: 1px solid var(--border);
		box-shadow: 0 8px 20px color-mix(in srgb, black 35%, transparent);
		transition: opacity 0.12s ease-out;
	}

	.contrib-tip--visible {
		visibility: visible;
		opacity: 1;
	}

	.contrib-tip::after {
		content: '';
		position: absolute;
		left: var(--arrow-x, 50%);
		bottom: -4px;
		width: 6px;
		height: 6px;
		background: var(--panel-2);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		/* One declaration — a separate `rotate` property composes after `transform` and
		   about the untranslated centre, which is what displaced the old arrow. */
		transform: translateX(-50%) rotate(45deg);
	}

	.contrib-tip--below::after {
		bottom: auto;
		top: -4px;
		border-right: 0;
		border-bottom: 0;
		border-left: 1px solid var(--border);
		border-top: 1px solid var(--border);
	}

	@media (prefers-reduced-motion: reduce) {
		.contrib-tip {
			transition: none;
		}
	}

	/* ---------------------------------------------------------------- phone view */

	.phone {
		display: grid;
		gap: 0.6rem;
		min-width: 0;
	}

	.bars {
		display: grid;
		gap: 0.4rem;
		min-width: 0;
	}

	.bars__row {
		display: grid;
		grid-auto-flow: column;
		/* A rolling 365-day window spans 13 calendar months, so at 390px the 1fr columns came
		   out 21.3px — under WCAG 2.5.8's 24px floor. The minmax holds the floor and lets the
		   row scroll on very narrow phones rather than shrinking below it. */
		grid-auto-columns: minmax(24px, 1fr);
		gap: 2px;
		align-items: end;
		height: 4.5rem;
		overflow-x: auto;
		overscroll-behavior-x: contain;
	}

	.bar {
		display: grid;
		grid-template-rows: 1fr auto;
		align-items: end;
		gap: 0.2rem;
		height: 100%;
		min-width: 0;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		touch-action: manipulation;
	}

	.bar__fill {
		display: block;
		width: 100%;
		align-self: end;
		background: var(--contrib-l3);
		border-radius: 2px 2px 0 0;
		transition: background 0.15s ease-out;
	}

	.bar--active .bar__fill {
		background: var(--contrib-l4);
	}

	.bar:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.bar__tick {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		color: color-mix(in srgb, var(--text) 60%, transparent);
	}

	.bar--active .bar__tick {
		color: var(--text);
	}

	.bars__readout {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--muted);
		min-height: 1.1em;
	}

	.bars__readout strong {
		color: var(--text);
		font-weight: 600;
	}

	.disclose {
		justify-self: start;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--muted);
		background: transparent;
		border: 1px solid var(--border-2);
		padding: 0.4rem 0.6rem;
		min-height: 2.25rem;
		cursor: pointer;
		touch-action: manipulation;
	}

	.disclose:hover,
	.disclose:focus-visible {
		color: var(--text);
		border-color: color-mix(in srgb, var(--accent) 40%, var(--border-2));
	}

	.phone__scroll {
		overflow-x: auto;
		/* Keep a sideways swipe inside the grid instead of scrolling the page or
		   triggering back-navigation. */
		overscroll-behavior-x: contain;
		max-width: 100%;
		--cell: clamp(7px, 2.2vw, 11px);
		--week-gap: 2px;
	}

	/* ---------------------------------------------------------------- legend + years */

	.legend {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding-top: 0.5rem;
	}

	.legend__label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: color-mix(in srgb, var(--text) 68%, transparent);
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
		border: 1px solid var(--contrib-border);
	}
	.legend__square[data-level='1'] {
		background: var(--contrib-l1);
	}
	.legend__square[data-level='2'] {
		background: var(--contrib-l2);
	}
	.legend__square[data-level='3'] {
		background: var(--contrib-l3);
	}
	.legend__square[data-level='4'] {
		background: var(--contrib-l4);
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
		color: color-mix(in srgb, var(--text) 68%, transparent);
		padding: 0.22rem 0.45rem;
		border: 1px solid var(--border-2);
		background: transparent;
		line-height: 1.15;
		cursor: pointer;
		text-align: right;
		width: 3.7rem;
		touch-action: manipulation;
	}

	.year--wide {
		width: auto;
		text-align: left;
	}

	.year:hover {
		color: var(--text);
		border-color: color-mix(in srgb, var(--accent) 28%, var(--border-2));
	}

	.year--current {
		color: var(--text);
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}

	@media (max-width: 640px) {
		/* Reclaim ~30px of horizontal room so the 13 month bars clear 24px each. */
		.github-chart {
			padding-inline: 0.75rem;
		}
		.chart-wrap {
			padding-inline: 0.5rem;
		}
	}

	@media (max-width: 780px) {
		.chart-main {
			grid-template-columns: minmax(0, 1fr);
			width: 100%;
		}
		.years {
			grid-auto-flow: column;
			justify-content: start;
			justify-items: start;
			overflow-x: auto;
			overscroll-behavior-x: contain;
		}
		.year {
			min-height: 2.25rem;
		}
	}

	/* ---------------------------------------------------------------- animations */

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

	@media (prefers-reduced-motion: reduce) {
		.day--exploded,
		.day--exploded::after,
		.confetti {
			animation: none;
		}
		.day--exploded {
			opacity: 0.35;
		}
		.confetti {
			display: none;
		}
	}
</style>
