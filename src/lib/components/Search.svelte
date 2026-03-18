<script lang="ts">
	import { projects, type Project } from '$lib/data/projects';
	import { lockScroll, unlockScroll } from '$lib/utils/scrollLock';

	let open = $state(false);
	let query = $state('');
	let inputEl: HTMLInputElement = $state(undefined as unknown as HTMLInputElement);
	let selectedIdx = $state(0);

	const results = $derived.by(() => {
		const q = query.toLowerCase().trim();
		if (!q) return [] as Project[];
		return projects.filter(
			(p) =>
				p.title.toLowerCase().includes(q) ||
				p.subtitle.toLowerCase().includes(q) ||
				p.description.toLowerCase().includes(q) ||
				p.tags.some((t) => t.toLowerCase().includes(q))
		);
	});

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
		if (open) {
			setTimeout(() => {
				(inputEl as unknown as { focus: (opts?: { preventScroll?: boolean }) => void })?.focus?.({
					preventScroll: true
				});
			}, 10);
			query = '';
			selectedIdx = 0;
		}
	});

	$effect(() => {
		// Lock page scroll while search modal is open (prevents hash-scroll race)
		if (!open) return;
		lockScroll();
		return () => unlockScroll();
	});

	$effect(() => {
		// Reset selection when results change
		selectedIdx = 0;
	});

	function toggleOpen() {
		open = !open;
	}

	function navigate(slug: string) {
		open = false;
		window.location.href = `/projects/${slug}`;
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIdx = Math.max(selectedIdx - 1, 0);
		} else if (e.key === 'Enter' && results[selectedIdx]) {
			navigate(results[selectedIdx].slug);
		}
	}

	export function toggle() {
		toggleOpen();
	}

	// Teleport node to document.body so it escapes any transformed/
	// backdrop-filter ancestor that would hijack position:fixed containment.
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}
</script>

<!-- Trigger button -->
<button class="trigger" aria-label="Search projects (Ctrl+K)" onclick={toggleOpen}>
	<span class="trigger__icon" aria-hidden="true">⌕</span>
	<span class="trigger__label">search</span>
</button>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- Portal: teleports backdrop + dialog to document.body so position:fixed
	     is correctly relative to the viewport, not the transformed header ancestor. -->
	<div use:portal>
		<!-- Backdrop -->
		<div class="backdrop" onclick={() => (open = false)}></div>

		<div class="modal" role="dialog" aria-modal="true" aria-label="Search projects">
			<div class="modal__bar">
				<span class="modal__icon" aria-hidden="true">⌕</span>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleKey}
					class="modal__input"
					type="search"
					placeholder="Search by title, tech, or keyword…"
					spellcheck="false"
					aria-label="Search projects"
				/>
				{#if query}
					<button class="modal__clear" aria-label="Clear search" onclick={() => (query = '')}>✕</button>
				{/if}
			</div>

			{#if results.length > 0}
				<ul class="results" role="listbox" aria-label="Search results">
					{#each results as project, i}
						<li
							class="result"
							class:result--selected={i === selectedIdx}
							role="option"
							aria-selected={i === selectedIdx}
						>
							<button
								class="result__btn"
								onclick={() => navigate(project.slug)}
								onmouseenter={() => (selectedIdx = i)}
							>
								<span class="result__title">{project.title}</span>
								<span class="result__year">{project.year}</span>
								<div class="result__tags">
									{#each project.tags.slice(0, 4) as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</button>
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
	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.25rem 0.55rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.03);
		color: rgba(243, 246, 255, 0.7);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		cursor: pointer;
		transition: background 0.14s, border-color 0.14s, color 0.14s;
		border-radius: 0;
	}

	.trigger:hover {
		background: rgba(54, 242, 194, 0.07);
		border-color: rgba(54, 242, 194, 0.3);
		color: var(--accent);
	}

	.trigger__icon {
		font-size: 0.9rem;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 299;
		background: rgba(0, 0, 0, 0.66);
		backdrop-filter: blur(4px);
	}

	.modal {
		position: fixed;
		top: clamp(3rem, 10vh, 6rem);
		left: 50%;
		transform: translateX(-50%);
		z-index: 300;
		width: min(640px, 94vw);
		border: 1px solid var(--border);
		background: #060a0e;
		font-family: var(--font-mono);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		max-height: 70vh;
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
		color: rgba(243, 246, 255, 0.92);
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
		color: rgba(243, 246, 255, 0.9);
	}

	.results {
		flex: 1;
		overflow-y: auto;
		margin: 0;
		padding: 0.4rem 0;
		list-style: none;
		scrollbar-width: thin;
		scrollbar-color: rgba(54, 242, 194, 0.2) transparent;
	}

	.result__btn {
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		padding: 0.55rem 0.85rem;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		gap: 0.25rem 0.5rem;
		cursor: pointer;
		font-family: var(--font-mono);
		transition: background 0.1s;
		border-radius: 0;
	}

	.result--selected .result__btn,
	.result__btn:hover {
		background: rgba(54, 242, 194, 0.06);
	}

	.result__title {
		font-size: 0.88rem;
		color: rgba(243, 246, 255, 0.9);
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
		color: rgba(243, 246, 255, 0.75);
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
