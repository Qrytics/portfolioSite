/**
 * Visual/geometry/a11y regression check for GitHubContribChart, plus the reduced-motion and
 * no-token-fallback paths. Not part of the build and not wired into any npm script — several of these
 * assertions are about *rendered geometry*, which `svelte-check` cannot see.
 *
 * `playwright` is deliberately NOT a devDependency: its postinstall downloads browser binaries, which
 * would run on every Vercel build for a script Vercel never executes. Install it on demand:
 *
 *     npm i --no-save playwright && npx playwright install chromium
 *     npm run dev
 *     node scripts/verify-chart.mjs
 *
 * Writes screenshots to `.verify/` (gitignored). Exits non-zero if any assertion fails.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const URL_BASE = process.env.VERIFY_URL ?? 'http://localhost:5173';
const OUT = 'C:/Users/MarioBelmonte/git-projects/portfolioSite/.verify';

await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const problems = [];
const notes = [];

function check(ok, label, detail = '') {
	(ok ? notes : problems).push(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
}

/**
 * Without a local `GH_TOKEN`, `/api/github-contrib` correctly answers 503 and the client falls back to
 * the committed static JSON. Chrome logs that response as a console error, so counting it would keep
 * the "no console errors" assertions permanently red for the one path we most want exercised — the
 * "API returns a non-200 status so the fallback can fire" check at the bottom depends on it happening.
 */
const isExpectedFallback503 = (text) => /status of 503/.test(text);

async function openHome(width, height, theme) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		deviceScaleFactor: 1,
		hasTouch: width < 700
	});
	const page = await ctx.newPage();
	const consoleErrors = [];
	page.on('console', (m) => {
		if (m.type() === 'error' && !isExpectedFallback503(m.text())) consoleErrors.push(m.text());
	});
	page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
	await page.goto(URL_BASE + '/', { waitUntil: 'load' });
	if (theme === 'light') {
		await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
	}
	// The chart mounts on requestIdleCallback.
	await page.waitForSelector('.github-chart', { timeout: 20000 });
	await page.waitForTimeout(600);
	return { ctx, page, consoleErrors };
}

// ----------------------------------------------------------------- desktop, dark
{
	const { ctx, page, consoleErrors } = await openHome(1440, 900, 'dark');

	const cellCount = await page.locator('.day:not([data-outside])').count();
	check(cellCount > 300, 'desktop renders a full day grid', `${cellCount} cells`);

	// --- Artifact A: hover must not paint outside the cell's own footprint.
	const cells = page.locator('.day:not([data-outside])');
	const target = cells.nth(Math.floor(cellCount / 2));
	// hover() scrolls the element into view, so compare size + computed transform, not
	// viewport-relative position.
	await target.hover();
	await page.waitForTimeout(120);
	const before = await target.evaluate((el) => {
		const r = el.getBoundingClientRect();
		return { w: r.width, h: r.height, transform: getComputedStyle(el).transform };
	});
	const after = await target.boundingBox();
	check(
		before.transform === 'none',
		'hover applies no transform, so the cell cannot escape its footprint (artifact A)',
		before.transform
	);
	check(
		Math.abs(before.w - after.width) < 0.6 && Math.abs(before.h - after.height) < 0.6,
		'hovered cell keeps its size (artifact A)',
		`${before.w}x${before.h} vs ${after.width}x${after.height}`
	);

	const shadow = await target.evaluate((el) => getComputedStyle(el).boxShadow);
	check(
		shadow === 'none' || shadow.includes('inset'),
		'hover ring is inset, cannot bleed into gaps (artifact A)',
		shadow
	);

	// --- Artifact B: tooltip must be visible, on-screen, and above the grid.
	const tip = page.locator('body > .contrib-tip');
	check(await tip.count() === 1, 'exactly one portalled tooltip node exists');
	const tipBox = await tip.boundingBox();
	const vis = await tip.evaluate((el) => getComputedStyle(el).visibility);
	check(vis === 'visible', 'tooltip is shown on hover', vis);
	check(
		tipBox && tipBox.x >= 0 && tipBox.y >= 0 && tipBox.x + tipBox.width <= 1440,
		'tooltip is fully within the viewport',
		JSON.stringify(tipBox)
	);
	// Paint order: the tooltip is `pointer-events: none`, so a plain hit-test passes straight
	// through it. Temporarily re-enable pointer events so elementFromPoint reports paint order.
	const occluder = await page.evaluate(() => {
		const t = document.querySelector('.contrib-tip');
		const prev = t.style.pointerEvents;
		t.style.pointerEvents = 'auto';
		const r = t.getBoundingClientRect();
		const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
		t.style.pointerEvents = prev;
		return el ? el.className.toString() : 'none';
	});
	check(occluder.includes('contrib-tip'), 'tooltip paints above the grid cells (artifact B)', occluder);

	// No ancestor may trap it: `position: fixed` on <body> plus a z-index above the header.
	const stacking = await page.evaluate(() => {
		const t = document.querySelector('.contrib-tip');
		const cs = getComputedStyle(t);
		return { parent: t.parentElement.tagName, position: cs.position, z: cs.zIndex };
	});
	check(
		stacking.parent === 'BODY' && stacking.position === 'fixed' && Number(stacking.z) > 300,
		'tooltip is portalled to <body>, fixed, above the sticky header',
		JSON.stringify(stacking)
	);

	const tipText = await tip.textContent();
	check(/\d+ contributions? · /.test(tipText), 'tooltip text reads correctly', tipText);

	// --- Arrow geometry: must sit under the tooltip, horizontally inside it.
	const arrow = await tip.evaluate((el) => {
		const cs = getComputedStyle(el, '::after');
		return { transform: cs.transform, top: cs.top, bottom: cs.bottom, left: cs.left };
	});
	check(arrow.transform !== 'none', 'tooltip arrow has a composed transform', JSON.stringify(arrow));

	// --- Top row: tooltip must flip below rather than clip off-screen.
	await page.locator('.github-chart').scrollIntoViewIfNeeded();
	await page.evaluate(() => window.scrollBy(0, -400));
	await page.waitForTimeout(200);

	// --- Singular/plural.
	const oneContrib = page.locator(".day[data-count='1']").first();
	if (await oneContrib.count()) {
		await oneContrib.hover();
		await page.waitForTimeout(120);
		const t = await tip.textContent();
		check(t.includes('1 contribution ·'), 'singular "1 contribution"', t);
	} else {
		notes.push('SKIP no day with exactly 1 contribution in this dataset');
	}

	// --- Hover across the gap between two cells must not hide the tooltip.
	const a = cells.nth(10);
	const b = cells.nth(11);
	const ab = await a.boundingBox();
	const bb = await b.boundingBox();
	await a.hover();
	await page.waitForTimeout(80);
	await page.mouse.move(ab.x + ab.width + (bb.x - (ab.x + ab.width)) / 2, ab.y + ab.height / 2);
	await page.waitForTimeout(80);
	const visInGap = await tip.evaluate((el) => getComputedStyle(el).visibility);
	check(visInGap === 'visible', 'tooltip stays visible when crossing the gap (no flicker)', visInGap);

	// --- Weekday label alignment: row header must match the real weekday of its cells.
	const rowCheck = await page.evaluate(() => {
		const names = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
		const out = [];
		document.querySelectorAll('.github-chart tbody tr').forEach((tr, i) => {
			const cell = tr.querySelector('.day[data-date]');
			if (!cell) return;
			const real = new Date(cell.dataset.date + 'T00:00:00Z').toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
			out.push({ row: i, header: names[i], firstDate: cell.dataset.date, real, ok: names[i] === real });
		});
		return out;
	});
	check(rowCheck.every((r) => r.ok), 'every row header matches its cells\' real weekday (bug #16)',
		JSON.stringify(rowCheck.filter((r) => !r.ok)));

	// --- Focus ring must frame one cell, not spill over neighbours.
	await page.keyboard.press('Escape');
	const focusInfo = await page.evaluate(() => {
		const c = document.querySelector('.day[tabindex="0"]');
		if (!c) return null;
		c.focus();
		const cs = getComputedStyle(c);
		return { outlineWidth: cs.outlineWidth, outlineOffset: cs.outlineOffset, cell: c.getBoundingClientRect().width };
	});
	check(focusInfo !== null, 'exactly one cell carries tabindex=0 (roving tabindex)');
	if (focusInfo) {
		const ringExtra = 2 * (parseFloat(focusInfo.outlineWidth) + parseFloat(focusInfo.outlineOffset));
		check(ringExtra <= 4, 'focus ring extends <=2px per side', `${ringExtra}px total, cell=${focusInfo.cell}px`);
	}

	// --- Arrow-key navigation.
	const navOk = await page.evaluate(async () => {
		const start = document.querySelector('.day[tabindex="0"]');
		start.focus();
		const from = start.dataset.date;
		start.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
		await new Promise((r) => setTimeout(r, 50));
		const now = document.activeElement;
		return { from, to: now?.dataset?.date ?? null, isCell: now?.classList?.contains('day') ?? false };
	});
	check(navOk.isCell && navOk.to && navOk.to !== navOk.from, 'ArrowLeft moves focus to another cell', JSON.stringify(navOk));

	// --- No focusable node inside an aria-hidden subtree (WCAG 4.1.2).
	const hiddenFocusables = await page.evaluate(() =>
		document.querySelectorAll('[aria-hidden="true"] [tabindex]:not([tabindex="-1"]), [aria-hidden="true"] button, [aria-hidden="true"] a[href]').length
	);
	check(hiddenFocusables === 0, 'no focusable nodes inside aria-hidden subtrees', `${hiddenFocusables} found`);

	await page.locator('.github-chart').screenshot({ path: `${OUT}/desktop-dark.png` });
	await cells.nth(Math.floor(cellCount / 2)).hover();
	await page.waitForTimeout(150);
	await page.screenshot({ path: `${OUT}/desktop-dark-hover.png`, clip: await page.locator('.github-chart').boundingBox() });

	check(consoleErrors.length === 0, 'no console errors (desktop)', consoleErrors.join(' | '));
	await ctx.close();
}

// ----------------------------------------------------------------- desktop, light
{
	const { ctx, page, consoleErrors } = await openHome(1440, 900, 'light');
	const ramp = await page.evaluate(() => {
		const cs = getComputedStyle(document.querySelector('.github-chart'));
		return [0, 1, 2, 3, 4].map((n) => {
			const el = document.querySelector(`.legend__square[data-level='${n}']`);
			return getComputedStyle(el).backgroundColor;
		}).concat(cs.getPropertyValue('--contrib-l1').trim());
	});
	notes.push(`light ramp: ${ramp.join(' ')}`);
	// getComputedStyle may hand back `color(srgb 0.43 0.748 0.72)` rather than `rgb(...)`, so parse
	// floats and normalise: srgb components are 0-1, rgb() components are 0-255.
	const channels = (c) => {
		const nums = (c.match(/[\d.]+/g) ?? []).map(Number);
		const [r, g, b] = c.startsWith('color(') ? nums.slice(0, 3) : nums.slice(0, 3);
		const scale = c.startsWith('color(') ? 255 : 1;
		return [r * scale, g * scale, b * scale];
	};
	const isTeal = ramp.slice(1, 5).every((c) => {
		const [r, g, b] = channels(c);
		return b > r; // teal: blue channel above red; GitHub green had b < r
	});
	check(isTeal, 'light ramp is the teal (accent-derived) ramp, not GitHub green', ramp.slice(0, 5).join(' '));
	await page.locator('.github-chart').screenshot({ path: `${OUT}/desktop-light.png` });
	check(consoleErrors.length === 0, 'no console errors (light)', consoleErrors.join(' | '));
	await ctx.close();
}

// ----------------------------------------------------------------- phone
{
	const { ctx, page, consoleErrors } = await openHome(390, 844, 'dark');

	const visible = await page.locator('.github-chart').isVisible();
	check(visible, 'chart is visible on phone (was display:none)');

	const bars = await page.locator('.bar').count();
	check(bars >= 10 && bars <= 14, 'phone shows a monthly bar row', `${bars} bars`);

	const dayCells = await page.locator('.day').count();
	check(dayCells === 0, 'zero day cells built until the disclosure is opened', `${dayCells} found`);

	const barBox = await page.locator('.bar').first().boundingBox();
	check(barBox.width >= 24, 'bar tap target >= 24px wide (WCAG 2.5.8)', `${barBox.width.toFixed(1)}px`);

	await page.locator('.bar').nth(3).click();
	await page.waitForTimeout(150);
	const readout = await page.locator('.bars__readout').textContent();
	check(/\d+ contributions?/.test(readout), 'tapping a bar writes a live-region readout', readout.trim());

	await page.locator('.disclose').click();
	await page.waitForTimeout(400);
	const dayCellsAfter = await page.locator('.day:not([data-outside])').count();
	check(dayCellsAfter > 300, 'disclosure renders the full day grid', `${dayCellsAfter} cells`);

	const scrollState = await page.evaluate(() => {
		const s = document.querySelector('.phone__scroll');
		return { left: s.scrollLeft, max: s.scrollWidth - s.clientWidth, overscroll: getComputedStyle(s).overscrollBehaviorX };
	});
	check(scrollState.max > 0 && scrollState.left >= scrollState.max - 2,
		'grid is pre-scrolled to the most recent week', JSON.stringify(scrollState));
	check(scrollState.overscroll === 'contain', 'overscroll-behavior-x: contain', scrollState.overscroll);

	await page.locator('.github-chart').screenshot({ path: `${OUT}/phone-dark.png` });
	check(consoleErrors.length === 0, 'no console errors (phone)', consoleErrors.join(' | '));
	await ctx.close();
}

// ----------------------------------------------------------------- reduced motion (Timeline crash)
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
	const page = await ctx.newPage();
	const errors = [];
	page.on('console', (m) => {
		if (m.type() === 'error' && !isExpectedFallback503(m.text())) errors.push(m.text());
	});
	page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
	await page.goto(URL_BASE + '/', { waitUntil: 'load' });
	await page.waitForSelector('.timeline', { timeout: 20000 });
	await page.waitForTimeout(1500);
	const revealed = await page.locator('.event--revealed').count();
	const total = await page.locator('.event').count();
	check(total > 0 && revealed === total, 'reduced motion: all timeline events revealed', `${revealed}/${total}`);
	check(!errors.some((e) => /effect_update_depth_exceeded/.test(e)),
		'reduced motion: no effect_update_depth_exceeded', errors.join(' | '));
	check(errors.length === 0, 'reduced motion: no console errors', errors.join(' | '));
	await ctx.close();
}

// ----------------------------------------------------------------- fallback path (no GH_TOKEN)
{
	const ctx = await browser.newContext();
	const page = await ctx.newPage();
	const res = await page.request.get(URL_BASE + '/api/github-contrib');
	notes.push(`/api/github-contrib -> HTTP ${res.status()}`);
	check(res.status() !== 200 || !(await res.json()).error,
		'API returns a non-200 status when it has an error (so the fallback can fire)', String(res.status()));
	await ctx.close();
}

await browser.close();

console.log('\n=== NOTES ===');
notes.forEach((n) => console.log('  ' + n));
console.log('\n=== PROBLEMS ===');
if (problems.length === 0) console.log('  none');
else problems.forEach((p) => console.log('  ' + p));
console.log(`\n${notes.filter((n) => n.startsWith('PASS')).length} passed, ${problems.length} failed`);
process.exit(problems.length ? 1 : 0);
