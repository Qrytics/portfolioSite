<script lang="ts">
	import { profile } from '$lib/data/profile';
	import WaveCheckeredBackground from './WaveCheckeredBackground.svelte';
	import { copyEmail } from '$lib/utils/copyEmail';
	import { discover, prefersReducedMotion } from '$lib/utils/secrets.svelte';
	import { playSound } from '$lib/utils/sound';
	import { projects, type Project } from '$lib/data/projects';
	import { headRest } from '$lib/data/headRest';
	import { createSpin, frameIndexForAngle } from '$lib/utils/spin';

	// The head is a set of real ASCII frames cut from a video of it turning a full circle. The
	// facing-the-viewer frame is inlined (so it renders on the server and on first paint); the rest
	// loads after mount. It turns slowly by itself, can be dragged around, and keeps spinning with
	// momentum when let go, easing back down to the slow turn.
	let portrait = $state(headRest);
	let portraitEl = $state<HTMLElement | undefined>(undefined);
	let grabbing = $state(false);

	$effect(() => {
		const el = portraitEl;
		if (!el) return;

		const reduced = prefersReducedMotion();
		const spin = createSpin(reduced ? { idleSpeed: 0 } : {});
		let frames: string[] = [];
		let order: number[] = [];
		let steps = 1;
		// Not `portrait`: reading that state here would make this effect depend on what it writes, and
		// every frame change would tear it down and reset the head.
		let shown = headRest;
		let raf = 0;
		let last = 0;
		let dead = false;
		let visible = true;

		const show = () => {
			if (!frames.length) return;
			const next = frames[order[frameIndexForAngle(spin.angle, steps)]];
			if (next !== shown) {
				shown = next;
				portrait = next;
			}
		};

		const tick = (now: number) => {
			raf = 0;
			const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
			last = now;
			spin.step(dt);
			show();
			if (!dead && visible) raf = requestAnimationFrame(tick);
		};
		const start = () => {
			if (!raf && frames.length) {
				last = 0;
				raf = requestAnimationFrame(tick);
			}
		};

		const onDown = (e: PointerEvent) => {
			if (!frames.length || (e.pointerType === 'mouse' && e.button !== 0)) return;
			el.setPointerCapture(e.pointerId);
			grabbing = true;
			spin.grab(e.clientX, e.timeStamp / 1000);
			start();
		};
		const onMove = (e: PointerEvent) => {
			if (spin.dragging) spin.drag(e.clientX, e.timeStamp / 1000);
		};
		const onUp = (e: PointerEvent) => {
			if (!spin.dragging) return;
			grabbing = false;
			spin.release(e.timeStamp / 1000);
			if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
		};

		// No point animating while it's scrolled out of view.
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
		});
		io.observe(el);

		import('$lib/data/headSpin').then(({ spinFrames, spinOrder, SPIN_STEPS }) => {
			if (dead) return;
			frames = spinFrames;
			order = spinOrder;
			steps = SPIN_STEPS;
			start();
		});

		el.addEventListener('pointerdown', onDown);
		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerup', onUp);
		el.addEventListener('pointercancel', onUp);
		return () => {
			dead = true;
			io.disconnect();
			el.removeEventListener('pointerdown', onDown);
			el.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerup', onUp);
			el.removeEventListener('pointercancel', onUp);
			cancelAnimationFrame(raf);
		};
	});

	/**
	 * Signature: a ruler of every project by start date. Real data, no invented numbers.
	 *
	 * One tick per month that has projects (18 started in a single month, so a tick per project would
	 * be a smear). Hovering a tick names the month; clicking zooms the ruler into that month, where
	 * each project gets its own tick, named on hover and linking to its page. Projects only record a
	 * start *month*, so inside a zoomed month the ticks are evenly spaced, not placed by day.
	 */
	const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	type Group = { key: number; year: number; month: number; v: number; items: Project[] };
	const groups: Group[] = (() => {
		const byMonth = new Map<number, Group>();
		for (const p of projects) {
			const month = MONTHS.indexOf(p.startMonth);
			const key = p.startYear * 12 + month;
			let g = byMonth.get(key);
			if (!g) byMonth.set(key, (g = { key, year: p.startYear, month, v: p.startYear + month / 12, items: [] }));
			g.items.unshift(p); // the list is newest-first; the ruler reads oldest-first
		}
		return [...byMonth.values()].sort((a, b) => a.key - b.key);
	})();
	const first = Math.floor(groups[0].v);
	const lastYear = Math.floor(groups[groups.length - 1].v);
	const last = lastYear + 1; // scale end; the label below uses lastYear
	const span = last - first;
	const ticks = Array.from({ length: span + 1 }, (_, i) => first + i);

	// ---- Zoom. `t` runs 0 (all years) to 1 (one month fills the ruler).
	const ONE_MONTH = 1 / 12;
	const ZOOM_MS = 700;
	let focus = $state<Group | null>(null);
	let zoomed = $state(false);
	let t = $state(0);
	let zoomRaf = 0;
	let backBtn = $state<HTMLButtonElement | undefined>(undefined);
	let rulerEl = $state<HTMLElement | undefined>(undefined);
	let markEls = $state<Record<number, HTMLElement | undefined>>({});

	// Zoom about a fixed point at constant speed: the visible width shrinks geometrically, and the
	// left edge moves so that at t = 1 it sits exactly on the chosen month.
	const width = $derived(focus ? span * Math.pow(ONE_MONTH / span, t) : span);
	const lo = $derived(focus ? first + (focus.v - first) * ((span - width) / (span - ONE_MONTH)) : first);
	const hi = $derived(lo + width);
	const pos = (v: number) => ((v - lo) / (hi - lo)) * 100;
	const smooth = (x: number, a: number, b: number) => {
		const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
		return k * k * (3 - 2 * k);
	};
	const overviewOpacity = $derived(1 - smooth(t, 0, 0.45));
	const zoomOpacity = $derived(smooth(t, 0.5, 1));
	// A tick's clickable column is never wider than the gap to its nearest neighbour, or neighbouring
	// columns overlap and the later one swallows clicks meant for the earlier (adjacent months are
	// only ~17px apart at the full-width scale).
	const hitPct = (i: number) => {
		const g = groups[i];
		const gap = Math.min(groups[i - 1] ? g.v - groups[i - 1].v : Infinity, groups[i + 1] ? groups[i + 1].v - g.v : Infinity);
		return Math.min(100, (gap / span) * 100);
	};
	const monthTitle = (g: Group) => `${MONTH_NAMES[g.month]} ${g.year}`;
	const countLabel = (n: number) => `${n} project${n === 1 ? '' : 's'}`;
	const nextMonth = (g: Group) => (g.month === 11 ? `${MONTHS[0]} ${g.year + 1}` : `${MONTHS[g.month + 1]} ${g.year}`);

	function animateTo(target: number, done?: () => void) {
		cancelAnimationFrame(zoomRaf);
		if (prefersReducedMotion()) {
			t = target;
			done?.();
			return;
		}
		const from = t;
		const began = performance.now();
		const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
		const tick = (now: number) => {
			const k = Math.min(1, (now - began) / (ZOOM_MS * Math.abs(target - from)));
			t = from + (target - from) * ease(k);
			if (k < 1) zoomRaf = requestAnimationFrame(tick);
			else {
				t = target;
				done?.();
			}
		};
		zoomRaf = requestAnimationFrame(tick);
	}

	// Keyboard users keep their place: focus follows the zoom instead of vanishing with the control.
	const keepFocus = () => !document.activeElement || document.activeElement === document.body || !!rulerEl?.contains(document.activeElement);
	function zoomIn(g: Group) {
		hideTip();
		focus = g;
		zoomed = true;
		animateTo(1, () => {
			if (keepFocus()) backBtn?.focus({ preventScroll: true });
		});
	}
	function zoomOut() {
		const g = focus;
		hideTip();
		zoomed = false;
		animateTo(0, () => {
			const refocus = keepFocus();
			focus = null;
			if (g && refocus) markEls[g.key]?.focus({ preventScroll: true });
		});
	}

	// ---- The small label that fades in above a hovered tick.
	let tipOn = $state(false);
	let tipText = $state('');
	let tipX = $state(50);
	let selectedSlug = $state<string | null>(null);
	function showTip(text: string, x: number) {
		tipText = text;
		tipX = x;
		tipOn = true;
	}
	function hideTip() {
		tipOn = false;
	}
	const hoverTip = (text: string, x: number) => (e: PointerEvent) => {
		if (e.pointerType !== 'touch') showTip(text, x);
	};
	// Touch has no hover: the first tap on a project tick names it, the second opens it.
	function onProjectClick(e: MouseEvent, p: Project, x: number) {
		if (!matchMedia('(hover: none)').matches || selectedSlug === p.slug) return;
		e.preventDefault();
		selectedSlug = p.slug;
		showTip(p.title, x);
	}

	/**
	 * Secret: the headline's letters are loose. A tap blasts them away from the pointer and they
	 * spring back. Words stay `inline-block` + `nowrap` so the line breaks exactly where plain text
	 * would; the <h1>'s `aria-label` carries the name, so a screen reader reads one heading, not 50
	 * letters.
	 */
	const words = profile.tagline.split(' ').map((word) => [...word]);
	let blast = $state<Array<{ dx: number; dy: number; rot: number }> | null>(null);
	let blastTimer: ReturnType<typeof setTimeout> | undefined;
	let taglineEl = $state<HTMLElement | undefined>(undefined);

	function scatter(e: MouseEvent) {
		discover('tagline');
		if (prefersReducedMotion() || !taglineEl) return;
		playSound('confetti-pop', 0.5);
		const chars = [...taglineEl.querySelectorAll<HTMLElement>('.ch')];
		blast = chars.map((el) => {
			const r = el.getBoundingClientRect();
			const vx = r.left + r.width / 2 - e.clientX;
			const vy = r.top + r.height / 2 - e.clientY;
			const dist = Math.max(24, Math.hypot(vx, vy));
			const force = Math.min(1, 220 / dist) * (90 + Math.random() * 90);
			return {
				dx: (vx / dist) * force,
				dy: (vy / dist) * force - 20 - Math.random() * 30,
				rot: (Math.random() - 0.5) * 140
			};
		});
		clearTimeout(blastTimer);
		blastTimer = setTimeout(() => (blast = null), 520);
	}
</script>

<svelte:window
	onkeydown={(e) => { if (e.key === 'Escape' && zoomed) zoomOut(); }}
	onclick={(e) => {
		// Zoomed in: a click anywhere that is not a tick (or the "all years" button, which zooms out
		// itself) zooms back out. The click that zoomed in lands on a tick, so it is ignored too.
		if (!zoomed) return;
		if ((e.target as Element | null)?.closest?.('.ruler__hit, .ruler__back')) return;
		zoomOut();
	}}
/>

<header class="header">
	<div class="hero-background" aria-hidden="true">
		<WaveCheckeredBackground />
	</div>

	<div class="header__content">
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
		<!-- The name comes from `aria-label` rather than an sr-only copy: a second copy put the tagline in
		     the served <h1> twice, so crawlers and text extraction read it doubled. The letter spans
		     have no whitespace between them, so they still read as whole words. -->
		<h1
			class="header__tagline"
			class:header__tagline--blast={blast}
			bind:this={taglineEl}
			onclick={scatter}
			aria-label={profile.tagline}
		>
			<span>
				{#each words as word, w (w)}
					{@const offset = words.slice(0, w).reduce((n, x) => n + x.length, 0)}
					<span class="word">{#each word as ch, c (c)}{@const b = blast?.[offset + c]}<span
								class="ch"
								style={b ? `--dx:${b.dx.toFixed(1)}px;--dy:${b.dy.toFixed(1)}px;--rot:${b.rot.toFixed(0)}deg` : undefined}
								>{ch}</span
							>{/each}</span
					>{w < words.length - 1 ? ' ' : ''}
				{/each}
			</span>
		</h1>
		<p class="header__description">{profile.description}</p>
		{#if profile.heroCta}
			<p class="header__cta">{profile.heroCta}</p>
		{/if}
		<div class="header__actions">
			<a
				href="/tutoring"
				target="_blank"
				rel="external noopener noreferrer"
				class="hero-action"
			>
				book a tutoring session ↗<span class="sr-only"> (opens in new tab)</span>
			</a>
		</div>
		<div class="header__meta">
			<a
				href={profile.github}
				target="_blank"
				rel="noopener noreferrer"
				class="contact"
				aria-label="GitHub, {profile.github.replace('https://', '')} (opens in new tab)"
				title={profile.github.replace('https://', '')}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
			</a>
			<button
				type="button"
				class="contact email-copy-btn"
				onclick={copyEmail}
				aria-label="Copy email address {profile.email}"
				title="Copy {profile.email}"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
			</button>
			<a
				href={profile.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="contact"
				aria-label="LinkedIn, {profile.linkedin.replace('https://www.', '')} (opens in new tab)"
				title={profile.linkedin.replace('https://www.', '')}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
			</a>
		</div>
		<figure class="ruler" aria-label="{projects.length} projects by start date, {first} to {lastYear}" bind:this={rulerEl}>
			<div class="ruler__read">
				<span class="ruler__figure">{zoomed && focus ? focus.items.length : projects.length}</span>
				<span class="ruler__unit">projects, {zoomed && focus ? monthTitle(focus) : `${first}–${lastYear}`}</span>
				<button type="button" class="ruler__back" onclick={zoomOut} disabled={!zoomed} bind:this={backBtn}>← all years</button>
			</div>
			<div class="ruler__scale">
				<div class="ruler__layer">
					{#each ticks as y (y)}
						<span class="ruler__tick" aria-hidden="true" style="left:{pos(y)}%; opacity:{overviewOpacity}"><i>{y}</i></span>
					{/each}
					{#if focus}
						<span class="ruler__tick ruler__tick--edge" aria-hidden="true" style="left:0%; opacity:{zoomOpacity}"><i>{MONTHS[focus.month]} {focus.year}</i></span>
						<span class="ruler__tick ruler__tick--edge" aria-hidden="true" style="left:100%; opacity:{zoomOpacity}"><i>{nextMonth(focus)}</i></span>
					{/if}

					<div class="ruler__marks" inert={t > 0.2} style="opacity:{overviewOpacity}">
						{#each groups as g, gi (g.key)}
							<button
								type="button"
								class="ruler__hit"
								style="left:{pos(g.v)}%; width:min(32px, {hitPct(gi)}%)"
								aria-label="{monthTitle(g)}, {countLabel(g.items.length)}. Zoom in."
								bind:this={markEls[g.key]}
								onclick={() => zoomIn(g)}
								onpointerenter={hoverTip(`${monthTitle(g)} · ${countLabel(g.items.length)}`, pos(g.v))}
								onfocus={() => showTip(`${monthTitle(g)} · ${countLabel(g.items.length)}`, pos(g.v))}
								onpointerleave={hideTip}
								onblur={hideTip}
							></button>
						{/each}
					</div>

					{#if focus}
						{@const n = focus.items.length}
						<div class="ruler__marks" inert={t < 0.9} style="opacity:{zoomOpacity}">
							{#each focus.items as p, i (p.slug)}
								{@const x = pos(focus.v + ((i + 0.5) / n) * ONE_MONTH)}
								<a
									class="ruler__hit"
									href="/projects/{p.slug}"
									style="left:{x}%; --fit:{100 / n}%"
									aria-label="{p.title}, started {monthTitle(focus)}"
									onclick={(e) => onProjectClick(e, p, x)}
									onpointerenter={hoverTip(p.title, x)}
									onfocus={() => showTip(p.title, x)}
									onpointerleave={hideTip}
									onblur={hideTip}
								></a>
							{/each}
						</div>
					{/if}
				</div>
				<div
					class="ruler__tip"
					class:ruler__tip--on={tipOn}
					class:ruler__tip--left={tipX < 22}
					class:ruler__tip--right={tipX > 78}
					style="left:{tipX}%"
					aria-hidden="true"
				>{tipText}</div>
			</div>
			<span class="sr-only" aria-live="polite">{zoomed && focus ? `Showing ${countLabel(focus.items.length)} from ${monthTitle(focus)}` : 'Showing all years'}</span>
		</figure>


		<div
			class="hero-head"
			class:hero-head--grabbing={grabbing}
			role="img"
			aria-label="ASCII art portrait of Mario, slowly turning. Drag to spin it."
			bind:this={portraitEl}
		>{portrait}</div>
	</div>
</header>

<style>
	.header {
		position: relative;
		z-index: 1;
		margin-top: 0;
		margin-bottom: 0;
		min-height: 280px;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}

	.header__content {
		position: relative;
		z-index: 1;
		padding: clamp(2rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		text-align: left;
		min-height: 280px;
		max-width: 86rem;
		margin: 0 auto;
		gap: 0;
	}

	.header__tagline {
		position: relative;
		margin: 0;
		color: var(--text);
		font-size: clamp(1.5rem, 4vw, 3.125rem);
		font-weight: 700;
		text-wrap: balance;
		letter-spacing: -0.02em;
		max-width: 26ch;
		line-height: 1.1;
		padding-bottom: 16px;
	}

	/* Loose letters (see `scatter`). The return trip uses an overshooting curve so they land with a
	   small bounce; the outbound trip is a fast ease-out. */
	.header__tagline {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	.word {
		display: inline-block;
		white-space: nowrap;
	}

	.ch {
		display: inline-block;
		transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.header__tagline--blast .ch {
		transform: translate(var(--dx, 0), var(--dy, 0)) rotate(var(--rot, 0));
		transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.header__description {
		position: relative;
		margin: 1rem 0 0;
		color: var(--text);
		font-family: var(--font-text);
		font-size: clamp(0.95rem, 1.6vw, 1.05rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
	}

	.header__cta {
		position: relative;
		margin: 0.65rem 0 0;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		font-family: var(--font-text);
		font-size: clamp(0.95rem, 1.6vw, 1.05rem);
		font-weight: 500;
		max-width: 70ch;
		line-height: 1.6;
	}

	.header__meta {
		position: relative;
		margin: 1.25rem 0 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.6rem;
	}

	.header__actions {
		position: relative;
		margin-top: 1.15rem;
		display: flex;
		justify-content: flex-start;
	}

	.hero-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.9rem;
		border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
		background: var(--accent);
		color: var(--panel);
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.2;
		text-decoration: none;
		letter-spacing: 0.01em;
		text-transform: lowercase;
		transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease,
			transform 0.16s ease;
	}

	.hero-action:hover,
	.hero-action:focus-visible {
		border-color: color-mix(in srgb, var(--accent) 60%, transparent);
		color: var(--panel);
		background: var(--accent-2);
		transform: translateY(-1px);
	}

	/* Contact icons: square 44px targets (the touch minimum), outlined like the site's other
	   controls, filling with the accent on hover so they read as pressable. */
	.contact {
		display: inline-grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--panel) 80%, transparent);
		color: var(--text);
		cursor: pointer;
		text-decoration: none;
		transition: border-color 0.14s ease, color 0.14s ease, background-color 0.14s ease,
			transform 0.14s ease;
	}

	.contact svg {
		width: 1.35rem;
		height: 1.35rem;
		display: block;
	}

	.contact:hover,
	.contact:focus-visible {
		border-color: var(--accent);
		color: var(--accent-text);
		background: color-mix(in srgb, var(--accent) 10%, var(--panel));
		transform: translateY(-1px);
	}

	@media (max-width: 700px) {
		.header {
			min-height: 240px;
		}

		.header__content {
			padding: clamp(1.25rem, 6vw, 2rem) clamp(1rem, 4.5vw, 1.5rem);
			min-height: 240px;
		}

		.header__tagline {
			font-size: clamp(1.2rem, 6vw, 1.55rem);
			line-height: 1.34;
			max-width: 33ch;
			padding-bottom: 0.7rem;
		}

		.header__description,
		.header__cta {
			font-size: 0.9375rem;
			line-height: 1.55;
		}

		.header__meta {
			margin-top: 1rem;
			font-size: 0.875rem;
			gap: 0.5rem 0.65rem;
		}
	}

	@media (max-width: 420px) {
		.header__tagline {
			font-size: clamp(1.05rem, 7vw, 1.3rem);
			max-width: 29ch;
		}
	}

	/* Phones: the tutoring button spans the same width as the row of icons below it. */
	@media (max-width: 520px) {
		.header__actions {
			width: 100%;
			max-width: 22rem;
		}

		.hero-action {
			width: 100%;
			min-height: 2.75rem;
			font-size: 0.875rem;
		}

		.header__meta {
			margin-top: 0.55rem;
		}
	}

	/*
	 * Light mode, designed rather than patched. Everything that made the dark hero legible — black
	 * text-shadows, a blurred black blob behind the copy, the canvas's black fade — is switched off
	 * here instead of being painted over with white glows (which is what used to be stacked up in
	 * `app.css` and here). The canvas now clears the tiles from behind the text itself and fades into
	 * the page, so the copy sits on plain paper and needs no help being read.
	 */
	:global([data-theme='light']) .header {
		background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 7%, var(--bg)) 0%, var(--bg) 100%);
	}

	:global([data-theme='light']) .header__content::before,
	:global([data-theme='light']) .header__tagline::before {
		display: none;
	}

	:global([data-theme='light']) .header__tagline {
		color: var(--text);
		letter-spacing: -0.02em;
	}

	:global([data-theme='light']) .header__description {
		color: var(--muted);
	}

	:global([data-theme='light']) .header__cta {
		color: var(--text);
	}

	/* The one primary action gets the one solid fill on the page. */
	:global([data-theme='light']) .hero-action {
		border-color: var(--accent-text);
		background: var(--accent-text);
		color: var(--paper-white);
		box-shadow: 0 1px 2px color-mix(in srgb, var(--accent-text) 30%, transparent),
			0 6px 18px -6px color-mix(in srgb, var(--accent-text) 55%, transparent);
	}

	:global([data-theme='light']) .hero-action:hover,
	:global([data-theme='light']) .hero-action:focus-visible {
		border-color: var(--clr-primary-a30);
		background: var(--clr-primary-a30);
		color: var(--paper-white);
	}

	:global([data-theme='light']) .contact {
		background: var(--panel);
		box-shadow: var(--shadow-sm);
	}

	/* The toast panel moved to `$lib/components/Toast.svelte`, rendered once by the layout. */

	/* The empty right side of the hero. Sits above the ruler (which spans the full width), so it
	   is sized to the space between the top padding and the ruler and fades out at the bottom
	   rather than ending on a hard cut across the shoulders. Hidden where the left column needs
	   the room. A div, not a <pre>: app.css gives every <pre> a dark code-well background. */
	.hero-head {
		display: none;
		position: absolute;
		top: clamp(2rem, 4vw, 3rem);
		right: clamp(2rem, 6vw, 5rem);
		margin: 0;
		font-family: var(--font-mono);
		font-size: clamp(4.6px, 0.42vw, 6.4px);
		line-height: 1.05;
		/* Monospace glyphs are about twice as tall as they are wide, which squeezes a portrait
		   horizontally; extra tracking restores its proportions. */
		letter-spacing: 0.22em;
		white-space: pre;
		color: color-mix(in srgb, var(--accent) 85%, transparent);
		cursor: grab;
		touch-action: pan-y;
		user-select: none;
		-webkit-user-select: none;
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%);
		mask-image: linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%);
	}

	/* The text column is ~700px wide and the head is ~390px: below this they would touch. */
	.hero-head--grabbing {
		cursor: grabbing;
	}

	@media (min-width: 1280px) {
		.hero-head {
			display: block;
		}
	}

	:global([data-theme='light']) .hero-head {
		color: color-mix(in srgb, var(--accent-text) 80%, transparent);
	}

	.ruler {
		align-self: stretch;
		margin: 2rem 0 0;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem 2rem;
		align-items: start;
	}
	.ruler__read { display: flex; flex-direction: column; }
	.ruler__figure {
		font-size: 3.125rem;
		line-height: 1;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}
	.ruler__unit { font-size: 0.75rem; color: var(--muted); }
	.ruler__scale {
		position: relative;
		height: 3.125rem; /* = .ruler__figure, so the axis line sits on the digits' baseline */
		margin: 0 1.5rem 0 0.5rem;
		border-bottom: 1px solid var(--text);
	}
	.ruler__layer {
		position: absolute;
		inset: 0;
	}
	/* Year labels and the month edges while zoomed. */
	.ruler__tick {
		position: absolute;
		bottom: -1.5rem;
		height: 0.75rem;
		border-left: 1px solid var(--text);
		pointer-events: none;
	}
	.ruler__tick i {
		position: absolute;
		top: 0.875rem;
		left: -1.2rem;
		font-style: normal;
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		color: var(--muted);
		white-space: nowrap;
	}
	.ruler__tick--edge i {
		left: 0;
		transform: translateX(-50%);
	}
	.ruler__marks {
		position: absolute;
		inset: 0;
	}
	/* The red lines. Each is a wide, invisible target with a thin line drawn inside it: a 2px line is
	   nearly impossible to hit, but a ~16px column around it is easy and does not change how it looks. */
	.ruler__hit {
		position: absolute;
		bottom: 0;
		width: 32px; /* overridden inline per tick, see hitPct() */
		height: 100%;
		transform: translateX(-50%);
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	/* Project ticks inside a zoomed month. A finger needs the full 44px column; a mouse does not, and
	   a column that wide would make "click anywhere that is not a tick" open a project instead of
	   zooming out whenever the click lands within ~20px of a stick. */
	a.ruler__hit {
		width: min(44px, var(--fit, 44px));
	}
	@media (hover: hover) and (pointer: fine) {
		a.ruler__hit {
			width: min(22px, var(--fit, 22px));
		}
	}
	.ruler__hit::before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 2px;
		height: 1.25rem;
		margin-left: -1px;
		background: var(--accent-2);
		transition: height 0.16s ease, background-color 0.16s ease, box-shadow 0.16s ease;
	}
	.ruler__hit:hover::before,
	.ruler__hit:focus-visible::before {
		height: 2rem;
		background: color-mix(in srgb, var(--accent-2) 55%, #fff);
		box-shadow: 0 0 6px 1px color-mix(in srgb, var(--accent-2) 70%, transparent);
	}
	.ruler__hit:focus-visible {
		outline: 2px solid var(--focus-ring);
		outline-offset: -2px;
	}
	/* The small label that fades in above the line. */
	.ruler__tip {
		position: absolute;
		bottom: calc(100% + 0.5rem);
		transform: translateX(-50%) translateY(4px);
		padding: 0.15rem 0.4rem;
		background: var(--panel);
		border: 1px solid var(--border);
		color: var(--text);
		font-size: 0.75rem;
		line-height: 1.3;
		white-space: nowrap;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.16s ease, transform 0.16s ease;
		z-index: 3;
	}
	.ruler__tip--left { transform: translateX(0) translateY(4px); }
	.ruler__tip--right { transform: translateX(-100%) translateY(4px); }
	.ruler__tip--on { opacity: 1; transform: translateX(-50%) translateY(0); }
	.ruler__tip--left.ruler__tip--on { transform: translateX(0) translateY(0); }
	.ruler__tip--right.ruler__tip--on { transform: translateX(-100%) translateY(0); }
	.ruler__back {
		margin-top: 0.35rem;
		padding: 0;
		border: 0;
		background: none;
		color: var(--accent-text);
		font: inherit;
		font-size: 0.75rem;
		cursor: pointer;
		text-align: left;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s ease;
	}
	.ruler__back:not(:disabled) { opacity: 1; visibility: visible; }
	.ruler__back:hover { text-decoration: underline; }
	@media (prefers-reduced-motion: reduce) {
		.ruler__tip, .ruler__hit::before, .ruler__back { transition: none; }
	}
	.ruler { padding-bottom: 1.5rem; }
	@media (max-width: 700px) {
		.ruler { grid-template-columns: minmax(0, 1fr); }
		.header__tagline { max-width: 100%; }
	}
</style>
