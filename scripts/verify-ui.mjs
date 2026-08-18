/**
 * Browser regression check for everything OUTSIDE the contribution chart: the nav, the two modals,
 * client-side routing, the shared toast, the games links, and the static assets that were renamed
 * during the media pass. `scripts/verify-chart.mjs` covers the chart; this covers the rest.
 *
 * Like that script, `playwright` is deliberately not a devDependency (its postinstall downloads
 * browsers, which Vercel would pay for on every build to run a script it never executes):
 *
 *     npm i --no-save playwright && npx playwright install chromium
 *     npm run dev
 *     node scripts/verify-ui.mjs
 *
 * Exits non-zero if any assertion fails.
 */
import { chromium } from 'playwright';

const URL_BASE = process.env.VERIFY_URL ?? 'http://localhost:5173';
const PHONE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

const browser = await chromium.launch();
const problems = [];
const notes = [];

function check(ok, label, detail = '') {
	(ok ? notes : problems).push(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
}

/** See verify-chart.mjs: with no local GH_TOKEN the contrib API answers 503 by design. */
const isExpectedFallback503 = (text) => /status of 503/.test(text);

/**
 * Two classes of request are excluded from the "no failed requests" assertions on purpose:
 *
 * - **Anything off this origin.** `/resume` embeds Google Drive's PDF viewer, and for a signed-out
 *   visitor Drive's own `accounts.google.com/ServiceLogin?...clientmodel...` probe answers 401.
 *   That is Drive's normal anonymous flow — the viewer still renders, and the page carries a plain
 *   "open it on Google Drive" link beside it as a fallback — and it is not a request this site
 *   makes or can fix. Asserting on it would mean a permanently red suite.
 * - **`/api/github*`.** With no local `GH_TOKEN` these answer 503 by design (that is the fallback
 *   path `verify-chart.mjs` covers), and they are also the requests still in flight when a
 *   navigation aborts them, which surfaces as `requestfailed` rather than a status code.
 */
const isIgnorableUrl = (url) => !url.startsWith(URL_BASE) || url.includes('/api/github');

/**
 * Hydration gate. Several assertions below click something and expect a Svelte handler to run, so
 * they have to wait for hydration — a click on server-rendered markup is silently a no-op. There is
 * no public "hydrated" signal, so this waits for the network to go quiet (the home page fires its
 * GitHub requests from `requestIdleCallback`, so quiet implies the client bundle is running) and
 * then leaves a short margin. The `catch` is because `networkidle` legitimately times out on pages
 * that keep a connection open, in which case the fixed wait alone has to do.
 */
async function settle(page) {
	await page.waitForLoadState('networkidle').catch(() => {});
	await page.waitForTimeout(500);
}

async function newPage({ viewport = DESKTOP, theme = 'dark', javaScriptEnabled = true } = {}) {
	const ctx = await browser.newContext({
		viewport,
		colorScheme: theme,
		deviceScaleFactor: 2,
		hasTouch: viewport === PHONE,
		isMobile: viewport === PHONE,
		javaScriptEnabled
	});
	const page = await ctx.newPage();
	const errors = [];
	const failedRequests = [];
	page.on('console', (m) => {
		if (m.type() !== 'error' || isExpectedFallback503(m.text())) return;
		// A network-error console message reports the failing resource as its location, so the same
		// third-party exclusion applies. Only skip when there *is* a URL: an uncaught exception in our
		// own code can report an empty location, and that must never be filtered away.
		const source = m.location()?.url ?? '';
		if (source && isIgnorableUrl(source)) return;
		errors.push(m.text());
	});
	page.on('requestfailed', (r) => {
		if (!isIgnorableUrl(r.url())) failedRequests.push(`aborted ${r.url()}`);
	});
	page.on('response', (r) => {
		if (r.status() >= 400 && !isIgnorableUrl(r.url())) {
			failedRequests.push(`${r.status()} ${r.url()}`);
		}
	});
	return { ctx, page, errors, failedRequests };
}

// ── 1. No JS-measured breakpoints: the phone nav must be correct with scripting off ──────────────
// `Nav` used to derive `compact` from a JS width measurement initialised to `false`, so a phone
// painted the *desktop* header first and collapsed it on hydration. With JS disabled, only SSR
// markup plus CSS applies — which is exactly the first paint a real phone gets.
{
	const { ctx, page } = await newPage({ viewport: PHONE, javaScriptEnabled: false });
	await page.goto(URL_BASE, { waitUntil: 'domcontentloaded' });

	const toggle = page.locator('.site-header__menu').first();
	const toggleVisible = (await toggle.count()) > 0 && (await toggle.isVisible());
	check(toggleVisible, 'phone: nav menu button is visible with JS disabled (no desktop flash)');

	// The dropdown must already be collapsed by CSS, not by a hydration-time width measurement.
	const navDisplay = await page.$eval('.site-nav', (el) => getComputedStyle(el).display);
	check(navDisplay === 'none', 'phone: nav panel is collapsed by CSS alone', `display: ${navDisplay}`);

	// The theme control must be in the SSR output, not injected on mount (which reflowed the header).
	const themeInSsr = await page.locator('.theme-toggle').count();
	check(themeInSsr > 0, 'theme control is server-rendered, not mounted client-side', `${themeInSsr} found`);

	// Its glyph comes from CSS keyed on `[data-theme]`, so it must be non-empty before any JS runs.
	const glyph = await page.$eval('.theme-toggle__icon', (el) =>
		getComputedStyle(el, '::before').content + '|' + getComputedStyle(el, '::after').content
	);
	check(/[^"|none]/.test(glyph.replace(/none|"/g, '')), 'theme glyph is painted by CSS on first paint', glyph);

	await ctx.close();
}

// ── 1b. Desktop must paint the expanded nav, also without JS ─────────────────────────────────────
{
	const { ctx, page } = await newPage({ viewport: DESKTOP, javaScriptEnabled: false });
	await page.goto(URL_BASE, { waitUntil: 'domcontentloaded' });

	const navDisplay = await page.$eval('.site-nav', (el) => getComputedStyle(el).display);
	check(navDisplay !== 'none', 'desktop: nav is expanded by CSS alone', `display: ${navDisplay}`);

	const menuDisplay = await page.$eval('.site-header__menu', (el) => getComputedStyle(el).display);
	check(menuDisplay === 'none', 'desktop: menu button is hidden by CSS alone', `display: ${menuDisplay}`);

	await ctx.close();
}

// ── 2. ProjectList: DOM order must match visual order ───────────────────────────────────────────
// The list used to round-robin cards into columns by `i % colCount`, so Tab and a screen reader
// walked diagonally across the page instead of down it.
{
	const { ctx, page, errors } = await newPage({ viewport: DESKTOP });
	await page.goto(URL_BASE, { waitUntil: 'load' });
	await page.waitForTimeout(1200);

	const order = await page.$$eval('.grid .card', (els) =>
		els.map((el) => {
			const r = el.getBoundingClientRect();
			return { top: Math.round(r.top), left: Math.round(r.left) };
		})
	);
	// Reading order = sort by (column, then top). If DOM order is correct, walking the DOM within a
	// single column must produce monotonically increasing `top`.
	const byColumn = new Map();
	order.forEach((c, i) => {
		if (!byColumn.has(c.left)) byColumn.set(c.left, []);
		byColumn.get(c.left).push({ ...c, i });
	});
	let outOfOrder = 0;
	for (const col of byColumn.values()) {
		for (let k = 1; k < col.length; k++) {
			if (col[k].i < col[k - 1].i) outOfOrder++;
		}
	}
	check(order.length > 0 && outOfOrder === 0, 'project cards: DOM order matches visual column order',
		`${order.length} cards, ${byColumn.size} columns, ${outOfOrder} inversions`);

	check(errors.length === 0, 'no console errors on home (desktop)', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 3. The shared toast: one node, one message, fired from two different components ──────────────
// `Hero` and `Footer` each carried their own `position: fixed; bottom: 2rem; left: 50%` copy, so
// copying the email from both inside the dismiss window stacked two panels in identical pixels.
{
	const { ctx, page } = await newPage({ viewport: DESKTOP });
	await ctx.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto(URL_BASE, { waitUntil: 'load' });
	// The copy handler is client-side, so this has to wait for hydration or the click hits inert markup.
	await settle(page);

	const regions = await page.locator('.toast-region').count();
	check(regions === 1, 'exactly one toast live region exists in the app', `${regions} found`);

	const live = await page.locator('.toast-region').first().getAttribute('aria-live');
	check(live === 'polite', 'toast region is a polite live region mounted from first paint', String(live));

	await page.locator('.email-copy-btn').first().click();
	// `copyEmail` awaits the async clipboard write before showing the toast, so this needs more than a
	// frame — 150 ms was enough to observe zero toasts and call it a regression.
	await page.waitForTimeout(400);
	const afterHero = await page.locator('.toast').count();
	check(afterHero === 1, 'hero copy shows exactly one toast', `${afterHero} found`);

	// Immediately fire the footer's copy too — the old code rendered a second panel behind the first.
	await page.locator('footer .email-btn').first().click({ force: true });
	await page.waitForTimeout(400);
	const afterFooter = await page.locator('.toast').count();
	check(afterFooter === 1, 'footer copy replaces rather than stacks a second toast', `${afterFooter} found`);

	await page.waitForTimeout(2800);
	const afterExpiry = await page.locator('.toast').count();
	check(afterExpiry === 0, 'toast auto-dismisses', `${afterExpiry} remaining`);

	await ctx.close();
}

// ── 4. Modal focus management: trap + restore, in both dialogs ───────────────────────────────────
async function checkModal(page, { name, trigger: triggerSelector, panel }) {
	// Focus the trigger *first*, then capture the handle. Reading `document.activeElement` before
	// focusing it captures `<body>`, and "focus returned to the trigger" then fails against a target
	// that was never the trigger — a test bug that looked exactly like a product regression.
	const triggerEl = page.locator(triggerSelector).first();
	await triggerEl.focus();
	const trigger = await page.evaluateHandle(() => document.activeElement);
	await triggerEl.click();
	await page.waitForTimeout(250);

	const panelEl = page.locator(panel).first();
	check(await panelEl.isVisible(), `${name}: opens`);

	// A scrim must not be a tab stop inside an aria-modal dialog.
	const scrimTabbable = await page.locator('.backdrop[tabindex], .backdrop[role="button"]').count();
	check(scrimTabbable === 0, `${name}: scrim is decorative, not a tab stop`, `${scrimTabbable} found`);

	// Tab all the way round; focus must never leave the panel.
	let escaped = null;
	for (let i = 0; i < 14; i++) {
		await page.keyboard.press('Tab');
		const inside = await page.evaluate(
			(sel) => document.querySelector(sel)?.contains(document.activeElement) ?? false,
			panel
		);
		if (!inside) {
			escaped = await page.evaluate(
				() => document.activeElement?.tagName + '.' + (document.activeElement?.className || '')
			);
			break;
		}
	}
	check(escaped === null, `${name}: Tab stays trapped inside the dialog`, escaped ?? '14 tabs, never escaped');

	await page.keyboard.press('Escape');
	await page.waitForTimeout(250);
	check(!(await panelEl.isVisible().catch(() => false)), `${name}: Escape closes`);

	const restored = await page.evaluate((t) => document.activeElement === t, trigger);
	check(restored, `${name}: focus returns to the trigger on close`);
}

{
	const { ctx, page, errors } = await newPage({ viewport: DESKTOP });
	await page.goto(URL_BASE, { waitUntil: 'load' });
	await page.waitForTimeout(600);

	await checkModal(page, {
		name: 'search',
		panel: '.modal[role="dialog"]',
		trigger: '.site-header__tools > button.trigger'
	});

	// Search's listbox must follow the APG combobox pattern: no nested buttons, and an active
	// descendant that actually names an existing option.
	await page.locator('.site-header__tools > button.trigger').first().click();
	await page.waitForTimeout(200);
	await page.locator('.modal__input').fill('game');
	await page.waitForTimeout(300);

	const nestedButtons = await page.locator('[role="option"] button').count();
	check(nestedButtons === 0, 'search: no interactive control nested inside role="option"', `${nestedButtons} found`);

	const optionTabStops = await page.locator('[role="option"][tabindex="0"], [role="option"] a').count();
	check(optionTabStops === 0, 'search: results are not individual tab stops', `${optionTabStops} found`);

	await page.keyboard.press('ArrowDown');
	await page.waitForTimeout(120);
	const activeDescendantResolves = await page.evaluate(() => {
		const input = document.querySelector('[role="combobox"]');
		const id = input?.getAttribute('aria-activedescendant');
		if (!id) return 'no aria-activedescendant';
		const opt = document.getElementById(id);
		if (!opt) return `aria-activedescendant points at missing #${id}`;
		return opt.getAttribute('aria-selected') === 'true' ? 'ok' : 'target is not aria-selected';
	});
	check(activeDescendantResolves === 'ok', 'search: aria-activedescendant names the selected option',
		activeDescendantResolves);

	const rowHeight = await page.locator('[role="option"]').first().boundingBox();
	check(!rowHeight || rowHeight.height >= 44, 'search: result rows meet the 44px touch target',
		rowHeight ? `${Math.round(rowHeight.height)}px` : 'n/a');

	await page.keyboard.press('Escape');
	await page.waitForTimeout(200);
	check(errors.length === 0, 'no console errors during search interaction', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 5. The terminal easter egg must be reachable on a phone ─────────────────────────────────────
// Its header trigger is `display: none` below 900px, so before the dropdown entry existed there was
// no way in at all on a touch device (no Ctrl key for the Ctrl+` shortcut either).
{
	const { ctx, page, errors } = await newPage({ viewport: PHONE });
	await page.goto(URL_BASE, { waitUntil: 'load' });
	await page.waitForTimeout(600);

	const headerTrigger = page.locator('.terminal-tool').first();
	const headerVisible = (await headerTrigger.count()) > 0 && (await headerTrigger.isVisible());
	check(!headerVisible, 'phone: header terminal trigger is hidden (as designed)');

	await page.locator('.site-header__menu').first().click();
	await page.waitForTimeout(300);

	const menuEntry = page.locator('.site-nav__action').first();
	const entryVisible = (await menuEntry.count()) > 0 && (await menuEntry.isVisible());
	check(entryVisible, 'phone: dropdown exposes a terminal entry');

	if (entryVisible) {
		await menuEntry.click();
		await page.waitForTimeout(400);
		const term = page.locator('.terminal').first();
		check(await term.isVisible(), 'phone: dropdown entry opens the terminal');

		const outputRole = await page.locator('.terminal__output').first().getAttribute('role');
		const outputLive = await page.locator('.terminal__output').first().getAttribute('aria-live');
		check(outputRole === 'log' && outputLive === 'polite',
			'terminal output is a polite log live region', `role=${outputRole} aria-live=${outputLive}`);
	}

	check(errors.length === 0, 'no console errors on phone', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 6. /games: real links, not buttons calling window.location ──────────────────────────────────
{
	const { ctx, page, errors, failedRequests } = await newPage({ viewport: DESKTOP });
	await page.goto(`${URL_BASE}/games`, { waitUntil: 'load' });
	await page.waitForTimeout(800);

	const fakeButtons = await page.locator('.game-card button').count();
	check(fakeButtons === 0, 'games: no <button> stands in for a link', `${fakeButtons} found`);

	const playLinks = await page.$$eval('a.play-btn', (els) =>
		els.map((el) => ({ href: el.getAttribute('href'), reload: el.hasAttribute('data-sveltekit-reload') }))
	);
	check(playLinks.length > 0 && playLinks.every((l) => l.href && l.href !== '#'),
		'games: every play control is an <a> with a real href', `${playLinks.length} links`);
	check(playLinks.every((l) => l.reload),
		'games: play links carry data-sveltekit-reload (standalone builds under static/)');

	// The hrefs must actually resolve, not just exist. Each playable game is a vendored build at
	// `static/games/<slug>/index.html` reached as `/games/<slug>/`, which is a directory request — the
	// exact shape that silently 404s unless something maps it to the index file. Absolute hrefs are
	// skipped: two games are hosted at the production domain, which this run is not.
	for (const link of playLinks) {
		if (!link.href.startsWith('/')) continue;
		const res = await page.request.get(`${URL_BASE}${link.href}`);
		check(res.ok(), `games: ${link.href} resolves`, `${res.status()}`);
	}

	const tapHeight = await page.locator('a.play-btn').first().boundingBox();
	check(!tapHeight || tapHeight.height >= 44, 'games: play control meets the 44px touch target',
		tapHeight ? `${Math.round(tapHeight.height)}px` : 'n/a');

	check(failedRequests.length === 0, 'games: no failed asset requests', failedRequests.slice(0, 3).join(' | '));
	check(errors.length === 0, 'no console errors on /games', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 7. AboutMeTeaser: the portrait swap and the renamed assets ───────────────────────────────────
{
	const { ctx, page, errors } = await newPage({ viewport: DESKTOP });
	await page.goto(URL_BASE, { waitUntil: 'load' });
	await page.waitForTimeout(1200);
	await page.locator('#about-me').scrollIntoViewIfNeeded();
	await page.waitForTimeout(600);

	const portrait = page.locator('button.portrait-card').first();
	check((await portrait.count()) === 1, 'about: portrait swap is a real <button>');

	const before = await page.locator('.portrait').first().getAttribute('src');
	await portrait.focus();
	await page.keyboard.press('Enter');
	await page.waitForTimeout(450);
	const after = await page.locator('.portrait').first().getAttribute('src');
	check(before !== after, 'about: portrait swap is keyboard-operable', `${before} -> ${after}`);

	// The two internal CTAs must not wear the external-link glyph.
	const ctas = await page.$$eval('.card--rhythm .cta, .card--photos .cta', (els) =>
		els.map((el) => el.textContent.trim())
	);
	check(ctas.length > 0 && ctas.every((t) => !t.includes('↗')),
		'about: internal CTAs use → not ↗', ctas.join(' | '));

	// Every image in the section must actually have decoded (catches the .png -> .jpg renames).
	const broken = await page.$$eval('#about-me img', (els) =>
		els.filter((el) => el.complete && el.naturalWidth === 0).map((el) => el.getAttribute('src'))
	);
	check(broken.length === 0, 'about: no broken images after the asset renames', broken.join(' | '));

	const icon = await page.$eval('.rhythm-icon', (el) => ({
		natural: el.naturalWidth,
		rendered: Math.round(el.getBoundingClientRect().width)
	}));
	check(icon.natural === 320, 'about: rhythm icon serves the 320px file', `natural ${icon.natural}px`);
	check(icon.natural >= icon.rendered, 'about: rhythm icon is not upscaled',
		`natural ${icon.natural} vs rendered ${icon.rendered}`);

	check(errors.length === 0, 'no console errors on the about section', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 8. Client-side routing + scroll restoration ─────────────────────────────────────────────────
// `internalNav.ts` used `window.location.assign`, a full document reload, and every project link
// carried `data-sveltekit-reload` — so Back always landed at the top of the home page.
{
	const { ctx, page, errors, failedRequests } = await newPage({ viewport: DESKTOP });
	await page.goto(URL_BASE, { waitUntil: 'load' });
	await page.waitForTimeout(1200);

	// Mark the document; a full reload wipes the marker, a client-side navigation keeps it.
	await page.evaluate(() => (window.__spaMarker = 'kept'));

	// Deliberately the *last* project link (deep in the grid) and deliberately scrolled into view
	// before `scrollBefore` is read. `click()` auto-scrolls its target into view, so scrolling to an
	// arbitrary offset and then clicking a link near the top silently moves the page first — the
	// position SvelteKit stores is the post-auto-scroll one, and comparing against the pre-click
	// number reports a restoration failure that never happened.
	const projectLink = page.locator('a[href*="/projects/"]').last();
	await projectLink.scrollIntoViewIfNeeded();
	await page.waitForTimeout(400);
	const scrollBefore = await page.evaluate(() => Math.round(window.scrollY));
	check(scrollBefore > 400, 'scroll-restoration check starts from a meaningful offset', `${scrollBefore}px`);

	const reloadAttr = await projectLink.getAttribute('data-sveltekit-reload');
	check(reloadAttr === null, 'project links no longer force a full document reload');

	await projectLink.click();
	await page.waitForTimeout(900);
	check(page.url().includes('/projects/'), 'navigated to a project page', page.url().replace(URL_BASE, ''));

	const survived = await page.evaluate(() => window.__spaMarker === 'kept');
	check(survived, 'navigation was client-side (document was not reloaded)');

	// No `waitUntil: 'load'`: coming back from a client-side navigation is a popstate, so no load event
	// fires. The wait has to cover SvelteKit restoring the offset *and* `scroll-behavior: smooth`
	// animating to it.
	await page.goBack();
	await page.waitForTimeout(1500);
	const scrollAfter = await page.evaluate(() => Math.round(window.scrollY));
	check(Math.abs(scrollAfter - scrollBefore) < 200,
		'Back restores the home page scroll position', `${scrollBefore} -> ${scrollAfter}`);

	check(failedRequests.length === 0, 'routing: no failed requests', failedRequests.slice(0, 3).join(' | '));
	check(errors.length === 0, 'no console errors during routing', errors.slice(0, 2).join(' | '));
	await ctx.close();
}

// ── 9. Every route: no broken assets, no console errors, no nested <main> ────────────────────────
for (const route of ['/', '/about', '/projects', '/games', '/rhythm-games', '/resume']) {
	const { ctx, page, errors, failedRequests } = await newPage({ viewport: PHONE });
	const res = await page.goto(`${URL_BASE}${route}`, { waitUntil: 'load' }).catch(() => null);
	await page.waitForTimeout(1000);

	check(res !== null && res.ok(), `${route}: responds OK`, res ? String(res.status()) : 'no response');

	const mains = await page.locator('main').count();
	check(mains === 1, `${route}: exactly one <main> landmark`, `${mains} found`);

	const broken = await page.$$eval('img', (els) =>
		els.filter((el) => el.complete && el.naturalWidth === 0).map((el) => el.getAttribute('src'))
	);
	check(broken.length === 0, `${route}: no broken images`, broken.slice(0, 4).join(' | '));

	const assetFailures = failedRequests.filter((u) => !/favicon/.test(u));
	check(assetFailures.length === 0, `${route}: no failed asset requests`, assetFailures.slice(0, 3).join(' | '));
	check(errors.length === 0, `${route}: no console errors`, errors.slice(0, 2).join(' | '));

	await ctx.close();
}

await browser.close();

console.log('=== NOTES ===');
for (const n of notes) console.log('  ' + n);
console.log('\n=== PROBLEMS ===');
console.log(problems.length ? problems.map((p) => '  ' + p).join('\n') : '  none');
console.log(`\n${notes.length} passed, ${problems.length} failed`);
process.exit(problems.length ? 1 : 0);
