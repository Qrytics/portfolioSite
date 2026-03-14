<script lang="ts">
	interface TimelineEvent {
		year: number;
		month?: string;
		label: string;
		description: string;
		accent?: boolean;
	}

	const monthIndex: Record<string, number> = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12
	};

	const events: TimelineEvent[] = [
		{
			year: 2026,
			month: 'Feb',
			label: 'TartanHacks 2026',
			description: 'Built MosaicLedger — fintech budget planner with Plaid, XRPL, and d3 treemaps — in a team of 3 at Carnegie Mellon\'s largest hackathon.',
			accent: true
		},
		{
			year: 2026,
			month: 'Jan',
			label: 'Smart Home IoT Dashboard',
			description: 'Architected a full-stack smart-home platform with ESP32 firmware, FastAPI rules engine, MQTT pub/sub, and a React dashboard.'
		},
		{
			year: 2025,
			month: 'Sep',
			label: 'HackCMU 2025',
			description: 'Team lead on "To-Do or Destroy" — a gamified productivity app where tasks are bomb wires built in 24 hours.',
			accent: true
		},
		{
			year: 2025,
			month: 'Jun',
			label: 'Electrical Engineering Assistant — Smarter Integrations',
			description: 'Designed and installed AV integration and security systems; troubleshot hardware/software interfaces in production environments.'
		},
		{
			year: 2025,
			month: 'Jan',
			label: 'Child Companion Robot — CMU Build18',
			description: 'Voice-triggered robot reads books aloud using webcam capture, OCR pipeline, and text-to-speech synthesis on a Raspberry Pi.'
		},
		{
			year: 2024,
			month: 'Nov',
			label: 'Mixed Signal DAC System',
			description: 'Full-custom 8-bit R-2R DAC design in Cadence Virtuoso from schematic through layout, DRC/LVS sign-off, and parasitic simulation.'
		},
		{
			year: 2024,
			month: 'Oct',
			label: 'FPGA Breakout Game',
			description: 'Hardware-only Breakout clone in SystemVerilog on an FPGA with live VGA output and no CPU — pure digital logic.'
		},
		{
			year: 2024,
			month: 'Aug',
			label: 'Started CMU Electrical & Computer Engineering',
			description: 'Enrolled at Carnegie Mellon to study ECE, combining coursework in circuits, digital systems, and software engineering.',
			accent: true
		},
		{
			year: 2022,
			month: 'Nov',
			label: '"Don\'t Find Me" — 15-112 Term Project',
			description: 'Solo-built a complete evasion game in Python + Tkinter as a CMU 15-112 term project — game loop, collision detection, difficulty ramping.'
		}
	];

	const sortedEvents = [...events].sort((a, b) => {
		if (a.year !== b.year) return b.year - a.year;
		const am = a.month ? monthIndex[a.month] ?? 0 : 0;
		const bm = b.month ? monthIndex[b.month] ?? 0 : 0;
		return bm - am;
	});
</script>

<section class="timeline" id="timeline" aria-label="Career timeline">
	<div class="timeline__inner">
		<h2 class="section-heading">Timeline</h2>
		<div class="track">
			{#each sortedEvents as event, i}
				<div class="event" class:event--accent={event.accent}>
					<div class="event__meta">
						<span class="event__year">{event.year}</span>
						{#if event.month}
							<span class="event__month">{event.month}</span>
						{/if}
					</div>
					<div class="event__connector" aria-hidden="true">
						<div class="event__dot"></div>
						{#if i < sortedEvents.length - 1}
							<div class="event__line"></div>
						{/if}
					</div>
					<div class="event__body">
						<p class="event__label">{event.label}</p>
						<p class="event__desc">{event.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.timeline {
		padding: 2.5rem clamp(1.25rem, 4vw, 3rem);
	}

	.timeline__inner {
		max-width: 56rem;
		margin: 0 auto;
	}

	.section-heading {
		margin: 0 0 2rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.track {
		display: grid;
		gap: 0;
	}

	.event {
		display: grid;
		grid-template-columns: 4rem 1.5rem 1fr;
		gap: 0 0.75rem;
		align-items: start;
	}

	@media (min-width: 560px) {
		.event {
			grid-template-columns: 5.5rem 1.5rem 1fr;
		}
	}

	.event__meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-top: 0.1rem;
	}

	.event__year {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--muted);
		line-height: 1.2;
		font-weight: 600;
	}

	.event__month {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--muter);
		line-height: 1.2;
	}

	.event__connector {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.event__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1.5px solid var(--border);
		background: var(--panel);
		flex-shrink: 0;
		margin-top: 0.22rem;
		transition: border-color 0.18s, background 0.18s;
	}

	.event--accent .event__dot {
		border-color: var(--accent);
		background: rgba(54, 242, 194, 0.15);
	}

	.event__line {
		width: 1px;
		flex: 1;
		min-height: 1.5rem;
		background: var(--border);
		margin-top: 4px;
	}

	.event__body {
		padding-bottom: 1.5rem;
	}

	.event__label {
		margin: 0 0 0.3rem;
		font-family: var(--font-mono);
		font-size: 0.88rem;
		color: rgba(243, 246, 255, 0.9);
		line-height: 1.4;
		font-weight: 600;
	}

	.event--accent .event__label {
		color: var(--accent);
	}

	.event__desc {
		margin: 0;
		font-size: 0.88rem;
		color: var(--muted);
		line-height: 1.6;
	}
</style>
