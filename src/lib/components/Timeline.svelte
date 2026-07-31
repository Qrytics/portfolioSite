<script lang="ts">
	import { playSound } from '$lib/utils/sound';

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
			month: 'May',
			label: 'Graduated from CMU',
			description:
				'Graduated from Carnegie Mellon University in May 2026 with a B.S. in Electrical and Computer Engineering (ECE), applying embedded + digital design fundamentals alongside software-focused projects to build real systems.',
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
			month: 'Jun',
			label: 'Electrical Engineering Assistant at Smarter Integrations',
			description: 'Designed and installed AV integration and security systems; troubleshot hardware/software interfaces in production environments.'
		},
		{
			year: 2022,
			month: 'Aug',
			label: 'Started CMU Electrical & Computer Engineering',
			description: 'Enrolled at Carnegie Mellon to study ECE, combining coursework in circuits, digital systems, and software engineering.',
			accent: true
		},
		{
			year: 2022,
			month: 'May',
			label: 'Graduated from Lamar Academy High School',
			description:
				'Graduated after leading robotics, esports, and AMC math clubs as president, building an early foundation in technical leadership and team-driven problem solving.'
		},
	];

	const sortedEvents = [...events].sort((a, b) => {
		if (a.year !== b.year) return b.year - a.year;
		const am = a.month ? monthIndex[a.month] ?? 0 : 0;
		const bm = b.month ? monthIndex[b.month] ?? 0 : 0;
		return bm - am;
	});

	let revealed = $state(new Set<string>());
	let timelineRef = $state<HTMLElement | undefined>(undefined);

	$effect(() => {
		if (!timelineRef) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			// Show all immediately if user prefers reduced motion
			sortedEvents.forEach((event) => revealed.add(event.label));
			revealed = new Set(revealed);
			return;
		}

		const eventElements = timelineRef.querySelectorAll('.event');
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const eventLabel = entry.target.getAttribute('data-event-label');
						if (eventLabel && !revealed.has(eventLabel)) {
							const index = Array.from(eventElements).indexOf(entry.target as Element);
							setTimeout(() => {
								revealed.add(eventLabel);
								revealed = new Set(revealed);
								playSound('timeline-tick', 0.5);
							}, index * 80); // 80ms stagger
						}
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		eventElements.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<section class="timeline" id="timeline" aria-label="Career timeline">
	<div class="timeline__inner">
		<h2 class="section-heading">Timeline</h2>
		<div class="track" bind:this={timelineRef}>
			{#each sortedEvents as event, i (event.label)}
				<div
					class="event"
					class:event--accent={event.accent}
					class:event--revealed={revealed.has(event.label)}
					data-event-label={event.label}
				>
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
		opacity: 0;
		transform: translateX(-20px);
		transition: opacity 0.4s ease-out, transform 0.4s ease-out;
	}

	.event--revealed {
		opacity: 1;
		transform: translateX(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.event {
			opacity: 1;
			transform: none;
			transition: none;
		}
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
		transition: border-color 0.18s, background 0.18s, transform 0.2s, box-shadow 0.2s;
	}

	.event:hover .event__dot {
		border-color: var(--accent);
		box-shadow: 0 0 8px rgba(54, 242, 194, 0.4);
		transform: scale(1.15);
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
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.35s ease-out;
	}

	.event--revealed .event__line {
		transform: scaleY(1);
	}

	@media (prefers-reduced-motion: reduce) {
		.event__line {
			transform: scaleY(1);
			transition: none;
		}
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
