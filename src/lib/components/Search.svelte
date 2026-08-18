<script lang="ts">
	import { assignAppLocation } from '$lib/utils/internalNav';
	import { portal } from '$lib/utils/portal';
	import { focusTrap } from '$lib/utils/focusTrap';
	import { loadProjectsIndex, type ProjectIndexEntry } from '$lib/utils/projectsIndex';

	let { open = $bindable(false) } = $props();
	let query = $state('');
	let inputEl: HTMLInputElement = $state(undefined as unknown as HTMLInputElement);
	let listEl = $state<HTMLUListElement | undefined>(undefined);
	let selectedRaw = $state(0);

	/**
	 * ARIA combobox wiring. The list used to be a bare `role="listbox"` whose `role="option"` items
	 * each wrapped a `<button>` — an interactive control inside an option, which is invalid, and no
	 * `aria-activedescendant` at all, so arrowing through results moved a purely visual highlight
	 * that a screen reader never announced. This follows the APG combobox pattern instead: DOM focus
	 * stays on the input, the options are plain non-focusable elements, and the active one is named.
	 */
	const LISTBOX_ID = 'search-results-listbox';
	const optionId = (i: number) => `search-option-${i}`;

	/**
	 * Six fields per project, fetched on first open, instead of importing `$lib/data/projects`. That
	 * import pulled the whole 72 KB module into the shared layout chunk — this component lives in
	 * `Nav`, so every route paid for it, including the four that render no projects at all.
	 */
	let index = $state<ProjectIndexEntry[]>([]);

	const results = $derived.by(() => {
		const q = query.toLowerCase().trim();
		if (!q) return [] as ProjectIndexEntry[];
		return index.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				p.subtitle.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q) ||
				p.tags.some((t) => t.toLowerCase().includes(q))
		);
	});

	/**
	 * Clamped against the *current* results rather than stored raw. The old code reset the index
	 * from a dependency-free `$effect`, which ran exactly once — so arrowing down to result 5,
	 * refining the query, then pressing Enter opened whatever now sat at index 5, or nothing.
	 */
	const selectedIdx = $derived(results.length === 0 ? 0 : Math.min(selectedRaw, results.length - 1));

	$effect(() => {
		function onKey(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				toggleOpen();
			}
			if (e.key === 'Escape' && open) {
				open = false;
			}
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	$effect(() => {
		if (!open) return;

		// `loadProjectsIndex` caches its promise, so re-opening doesn't re-request.
		void loadProjectsIndex().then((entries) => (index = entries));

		const focusTimer = setTimeout(() => {
			(inputEl as unknown as { focus: (opts?: { preventScroll?: boolean }) => void })?.focus?.({
				preventScroll: true
			});
		}, 10);
		query = '';
		selectedRaw = 0;

		// The timeout was previously never cleared: closing within 10 ms left it to fire and pull
		// focus into a dialog that no longer existed.
		return () => clearTimeout(focusTimer);
	});

	/**
	 * Keeps the arrow-selected result on screen. `.results` is the scroll container, and under
	 * `aria-activedescendant` DOM focus never leaves the input — so the browser does no scrolling of
	 * its own and arrowing past the fold moved a highlight the user couldn't see.
	 */
	$effect(() => {
		if (!open || !listEl || results.length === 0) return;
		listEl
			.querySelector(`#${optionId(selectedIdx)}`)
			?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
	});

	function toggleOpen() {
		open = !open;
	}

	function navigate(slug: string) {
		open = false;
		assignAppLocation(`/projects/${slug}`);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedRaw = Math.min(selectedIdx + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedRaw = Math.max(selectedIdx - 1, 0);
		} else if (e.key === 'Enter' && results[selectedIdx]) {
			e.preventDefault();
			navigate(results[selectedIdx].slug);
		}
	}

</script>

<!-- Trigger button -->
<button type="button" class="trigger" aria-label="Search projects (Ctrl+K)" onclick={toggleOpen}>
	<span class="trigger__icon" aria-hidden="true">⌕</span>
	<span class="trigger__label">search</span>
</button>

{#if open}
	<div class="portal" use:portal>
		<!--
			Decorative scrim: a pointer-only convenience, redundant with the `esc` button inside the
			dialog. It used to be `<div role="button" tabindex="0" aria-label="Close search">`, which
			put a tab stop *inside* an `aria-modal` dialog — so the first thing a screen-reader user
			met on opening the search was a button, not the search field. `aria-hidden` plus no
			tabindex is the correct shape for a scrim; the real control lives in the title bar.
		-->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="backdrop" aria-hidden="true" onclick={() => (open = false)}></div>

		<div class="modal" role="dialog" aria-modal="true" aria-label="Search projects" use:focusTrap>
			<div class="modal__bar">
				<span class="modal__icon" aria-hidden="true">⌕</span>
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleKey}
					oninput={() => (selectedRaw = 0)}
					class="modal__input"
					type="search"
					placeholder="Search by title, tech, or keyword…"
					spellcheck="false"
					aria-label="Search projects"
					role="combobox"
					aria-controls={LISTBOX_ID}
					aria-expanded={results.length > 0}
					aria-autocomplete="list"
					aria-activedescendant={results.length > 0 ? optionId(selectedIdx) : undefined}
				/>
				{#if query}
					<button type="button" class="modal__clear" aria-label="Clear search" onclick={() => (query = '')}>✕</button>
				{/if}
				<!--
					Escape and a click on the scrim were the only ways out of here. Neither is available
					to someone on a phone using a screen reader, where the scrim is deliberately hidden.
					Labelled `esc` rather than a second `✕` so it can't be mistaken for the clear button
					beside it.
				-->
				<button type="button" class="modal__close" aria-label="Close search" onclick={() => (open = false)}>esc</button>
			</div>

			{#if results.length > 0}
				<!--
					Options are plain elements with no nested control and no tab stop: keyboard users
					drive the list from the input via `aria-activedescendant` (see `handleKey`), and a
					pointer user clicks the row. Putting a `<button>` inside `role="option"` — as this
					did — is invalid ARIA and made every result its own tab stop.
				-->
				<ul class="results" role="listbox" id={LISTBOX_ID} aria-label="Search results" bind:this={listEl}>
					{#each results as project, i (project.slug)}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<li
							class="result"
							class:result--selected={i === selectedIdx}
							id={optionId(i)}
							role="option"
							aria-selected={i === selectedIdx}
							onclick={() => navigate(project.slug)}
							onmouseenter={() => (selectedRaw = i)}
						>
							<span class="result__title">{project.title}</span>
							<span class="result__year">{project.year}</span>
							<div class="result__tags">
								{#each project.tags.slice(0, 4) as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						</li>
					{/each}
				</ul>
			{:else if query.trim()}
				<div class="empty">No results for "<strong>{query}</strong>"</div>
			{:else}
				<div class="hint">Start typing to search projects…</div>
			{/if}

			<div class="modal__footer">
				<span><kbd>↑↓</kbd> navigate</span>
				<span><kbd>↵</kbd> open</span>
				<span><kbd>Esc</kbd> close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.portal {
		display: contents;
	}

	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.25rem 0.55rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.03);
		color: color-mix(in srgb, var(--text) 72%, transparent);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		cursor: pointer;
		transition: background 0.14s, border-color 0.14s, color 0.14s;
		border-radius: 0;
	}

	.trigger:hover {
		background: color-mix(in srgb, var(--accent) 7%, transparent);
		border-color: color-mix(in srgb, var(--accent) 30%, transparent);
		color: var(--accent);
	}

	.trigger__icon {
		font-size: 0.9rem;
	}

	@media (max-width: 560px) {
		.trigger {
			padding-inline: 0.45rem;
		}

		.trigger__label {
			display: none;
		}
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 7000;
		/* A darker scrim instead of a full-viewport blur. `backdrop-filter` over the whole page is the
		   single most expensive thing a phone GPU can be asked to composite, and at 66% opacity the
		   blur was barely perceptible anyway. Re-enabled at desktop widths below. */
		background: color-mix(in srgb, #000 74%, transparent);
	}

	@media (min-width: 901px) {
		.backdrop {
			background: color-mix(in srgb, #000 66%, transparent);
			backdrop-filter: blur(4px);
			-webkit-backdrop-filter: blur(4px);
		}
	}

	.modal {
		position: fixed;
		/* `dvh`, not `vh`: on iOS Safari `vh` is the *largest* viewport, so with the URL bar expanded
		   the panel was offset further down than intended and its bottom ran under the chrome. */
		top: clamp(3rem, 10dvh, 6rem);
		left: 50%;
		transform: translateX(-50%);
		z-index: 7010;
		width: min(640px, 94vw);
		border: 1px solid var(--border);
		background: #060a0e;
		font-family: var(--font-mono);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		max-height: 70dvh;
	}

	.modal__bar {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.7rem 0.85rem;
		border-bottom: 1px solid var(--border-2);
		flex-shrink: 0;
	}

	.modal__icon {
		color: var(--muted);
		font-size: 1rem;
		flex-shrink: 0;
	}

	.modal__input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-family: var(--font-mono);
		font-size: 0.92rem;
		color: var(--text);
		caret-color: var(--accent);
		min-width: 0;
	}

	.modal__input::placeholder {
		color: var(--muter);
	}

	/* hide browser search clear btn */
	.modal__input::-webkit-search-cancel-button {
		display: none;
	}

	.modal__clear {
		background: none;
		border: none;
		color: var(--muter);
		font-size: 0.82rem;
		cursor: pointer;
		padding: 0.1rem 0.2rem;
		font-family: inherit;
		transition: color 0.14s;
		border-radius: 0;
	}

	.modal__clear:hover {
		color: color-mix(in srgb, var(--text) 95%, transparent);
	}

	/* Styled like the `<kbd>` chips in the footer, since that is what it names. */
	.modal__close {
		flex-shrink: 0;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.04);
		color: var(--muter);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		line-height: 1;
		padding: 0.3rem 0.4rem;
		cursor: pointer;
		transition: color 0.14s, border-color 0.14s;
	}

	.modal__close:hover {
		color: var(--accent);
		border-color: color-mix(in srgb, var(--accent) 40%, transparent);
	}

	.results {
		flex: 1;
		overflow-y: auto;
		margin: 0;
		padding: 0.4rem 0;
		list-style: none;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--accent) 20%, transparent) transparent;
	}

	/* Was `.result__btn` on a nested `<button>`; the grid now lives on the `role="option"` row itself.
	   `min-height` is new: these rows are the primary tap target on a phone, and at 0.55rem padding
	   a single-tag result came out around 40px — under WCAG 2.5.5's 44px. */
	.result {
		width: 100%;
		text-align: left;
		padding: 0.55rem 0.85rem;
		min-height: 2.75rem;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		align-content: center;
		gap: 0.25rem 0.5rem;
		cursor: pointer;
		font-family: var(--font-mono);
		transition: background 0.1s;
	}

	.result--selected,
	.result:hover {
		background: color-mix(in srgb, var(--accent) 6%, transparent);
	}

	.result__title {
		font-size: 0.88rem;
		color: color-mix(in srgb, var(--text) 95%, transparent);
		font-weight: 600;
		grid-column: 1;
		grid-row: 1;
	}

	.result__year {
		font-size: 0.75rem;
		color: var(--muter);
		grid-column: 2;
		grid-row: 1;
		align-self: center;
	}

	.result__tags {
		grid-column: 1 / -1;
		grid-row: 2;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.tag {
		font-size: 0.7rem;
		color: var(--muted);
		border: 1px solid var(--border-2);
		padding: 0.1rem 0.35rem;
		background: rgba(255, 255, 255, 0.03);
	}

	.empty,
	.hint {
		padding: 1.25rem 0.85rem;
		font-size: 0.88rem;
		color: var(--muted);
		text-align: center;
	}

	.empty strong {
		color: color-mix(in srgb, var(--text) 80%, transparent);
	}

	.modal__footer {
		display: flex;
		gap: 1rem;
		padding: 0.5rem 0.85rem;
		border-top: 1px solid var(--border-2);
		font-size: 0.72rem;
		color: var(--muter);
		background: rgba(255, 255, 255, 0.02);
		flex-shrink: 0;
	}

	kbd {
		font-family: var(--font-mono);
		padding: 0.1rem 0.3rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.04);
		font-size: 0.7rem;
	}

</style>
