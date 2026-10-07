<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { discover } from '$lib/utils/secrets.svelte';
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

	/**
	 * `SvelteSet`, not a plain `Set` in `$state`: a plain Set isn't deep-proxied, so the old code
	 * had to reassign (`revealed = new Set(revealed)`) to trigger reactivity — which re-invalidated
	 * the very effect that wrote it. For reduced-motion users that path ran inside the tracked
	 * scope and looped to `effect_update_depth_exceeded` on every home-page load.
	 */
	const revealed = new SvelteSet<string>();

	/**
	 * Secret: every dot can be poked. Each poke rings out and ticks a little higher; poke every one
	 * and the line between them lights up. A decorative toy, not a control — the dots stay out of the
	 * tab order and the accessibility tree, since a keyboard path to "make a dot ring" adds five stops
	 * to a timeline for nothing.
	 */
	const poked = new SvelteSet<string>();
	let pinging = $state<string | null>(null);
	let pingKey = $state(0);

	function poke(label: string) {
		poked.add(label);
		pinging = label;
		pingKey++;
		playSound('timeline-tick', 0.4 + 0.12 * poked.size);
		if (poked.size === sortedEvents.length) discover('timeline');
	}
	let timelineRef = $state<HTMLElement | undefined>(undefined);
	let staggerTimers: ReturnType<typeof setTimeout>[] = [];

	$effect(() => {
		const track = timelineRef;
		if (!track) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			// Reveal everything at once, and never read `revealed` while doing it.
			for (const event of sortedEvents) revealed.add(event.label);
			return;
		}

		const eventElements = Array.from(track.querySelectorAll('.event'));
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const eventLabel = entry.target.getAttribute('data-event-label');
					if (!eventLabel || revealed.has(eventLabel)) continue;
					io.unobserve(entry.target);
					const index = eventElements.indexOf(entry.target);
					staggerTimers.push(
						setTimeout(() => {
							revealed.add(eventLabel);
						}, index * 80) // 80ms stagger
					);
				}
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		eventElements.forEach((el) => io.observe(el));
		return () => {
			io.disconnect();
			staggerTimers.forEach(clearTimeout);
			staggerTimers = [];
		};
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
					class:event--poked={poked.has(event.label)}
					class:event--charged={poked.size === sortedEvents.length}
					data-event-label={event.label}
				>
					<div class="event__meta">
						<span class="event__year">{event.year}</span>
						{#if event.month}
							<span class="event__month">{event.month}</span>
						{/if}
					</div>
					<div class="event__connector" aria-hidden="true">
						<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
						<div class="event__dot" onpointerdown={() => poke(event.label)}>
							{#if pinging === event.label}
								{#key pingKey}<span class="event__ping"></span>{/key}
							{/if}
						</div>
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
		transition: opacity 0.4s ease-out, transform 0.4s ease-out;
	}

	/* Hidden-until-revealed only when script can actually reveal it. Unconditionally, a visitor
	   without JS (or a crawler's snapshot, or a browser where the observer never fires) got an
	   invisible timeline. Browsers without `scripting` support skip this and just show it. */
	@media (scripting: enabled) {
		.event:not(.event--revealed) {
			opacity: 0;
			transform: translateX(-20px);
		}
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

	/* A 32px invisible hit area around an 8px dot, so it can be found by a finger. */
	.event__dot {
		position: relative;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.event__dot::before {
		content: '';
		position: absolute;
		inset: -12px;
	}

	.event--poked .event__dot {
		border-color: var(--accent);
		background: var(--accent);
	}

	.event__ping {
		position: absolute;
		inset: -1.5px;
		border-radius: 50%;
		border: 1.5px solid var(--accent);
		pointer-events: none;
		animation: dot-ping 0.6s ease-out forwards;
	}

	@keyframes dot-ping {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}

	.event--charged .event__line {
		background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 25%, transparent));
		box-shadow: 0 0 8px color-mix(in srgb, var(--accent) 45%, transparent);
	}

	@media (prefers-reduced-motion: reduce) {
		.event__ping {
			display: none;
		}
	}

	.event:hover .event__dot {
		border-color: var(--accent);
		box-shadow: 0 0 8px color-mix(in srgb, var(--accent) 40%, transparent);
		transform: scale(1.15);
	}

	.event--accent .event__dot {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 15%, transparent);
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
		color: color-mix(in srgb, var(--text) 95%, transparent);
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

	/*
	 * Phones: the 4rem date column plus the connector left the description about 22 characters wide,
	 * so every entry ran to ten-plus lines. The date moves above the label as a small "2026 · May"
	 * kicker and the text gets the full width beside the line.
	 */
	@media (max-width: 559px) {
		.timeline {
			padding: 2rem 1rem;
		}

		.section-heading {
			margin-bottom: 1.25rem;
		}

		.event {
			grid-template-columns: 0.75rem 1fr;
			grid-template-areas:
				'dot meta'
				'dot body';
			gap: 0 0.85rem;
		}

		.event__connector {
			grid-area: dot;
			align-self: stretch;
		}

		.event__meta {
			grid-area: meta;
			flex-direction: row;
			align-items: baseline;
			gap: 0.4rem;
			padding-top: 0;
			margin-bottom: 0.2rem;
		}

		.event__month::before {
			content: '· ';
		}

		.event__dot {
			margin-top: 0.3rem;
		}

		.event__body {
			grid-area: body;
			padding-bottom: 1.35rem;
		}

		.event__desc {
			font-size: 0.85rem;
			line-height: 1.55;
		}
	}
</style>
