<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { projects } from '$lib/data/projects';
	import { assignAppLocation } from '$lib/utils/internalNav';
	import { portal } from '$lib/utils/portal';

	let { open = $bindable(false) } = $props();
	let inputValue = $state('');
	let lines = $state<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
		{
			type: 'output',
			text: 'Welcome to mario-belmonte terminal. Type "help" for commands. Use ↑ / ↓ in the input for history.'
		}
	]);

	let inputEl: HTMLInputElement = $state(undefined as unknown as HTMLInputElement);
	let containerEl: HTMLElement = $state(undefined as unknown as HTMLElement);
	let history = $state<string[]>([]);
	let historyCursor = $state(-1);
	let draftInput = $state('');
	const commandSuggestions = ['help', 'projects', 'project <n>', 'open <slug|n>', 'history', 'home', 'resume', 'clear', 'exit'];

	$effect(() => {
		function onKey(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === '`') {
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
			// Focus input after DOM updates
			setTimeout(() => {
				// preventScroll avoids the page jumping to top on focus
				(inputEl as unknown as { focus: (opts?: { preventScroll?: boolean }) => void })?.focus?.({
					preventScroll: true
				});
			}, 10);
		}
	});

	function toggleOpen() {
		open = !open;
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (containerEl) containerEl.scrollTop = containerEl.scrollHeight;
		}, 0);
	}

	function run(raw: string) {
		const trimmed = raw.trim();
		const cmd = trimmed.toLowerCase();
		lines.push({ type: 'input', text: `> ${trimmed}` });

		if (!cmd) {
			scrollToBottom();
			return;
		}

		if (trimmed && (history.length === 0 || history[history.length - 1] !== trimmed)) {
			history = [...history, trimmed];
		}
		historyCursor = -1;
		draftInput = '';

		if (cmd === 'help') {
			lines.push({
				type: 'output',
				text: [
					'Available commands:',
					'  help        — show this message',
					'  about       — who is mario',
					'  whoami      — display handle',
					'  skills      — list technical skills',
					'  projects    — list projects',
					'  ls / dir    — short project list',
					'  pwd         — fake path (for fun)',
					'  echo <msg>  — print text',
					'  github      — open GitHub profile',
					'  resume      — open resume page',
					'  home        — go to landing page',
					'  contact     — show contact info',
					'  history     — show recent commands',
					'  clear       — clear the terminal',
					'  exit        — close the terminal',
					'',
					'  project <n> — open project by list index (see projects)',
					'  open <arg>  — open by slug or list index',
					'  ↑ / ↓       — command history in input'
				].join('\n')
			});
		} else if (cmd === 'about') {
			lines.push({
				type: 'output',
				text: profile.bio
			});
		} else if (cmd === 'skills') {
			const skillText = profile.skills
				.map((g) => `  ${g.category}:\n    ${g.items.join(', ')}`)
				.join('\n');
			lines.push({ type: 'output', text: 'Skills:\n' + skillText });
		} else if (cmd === 'whoami') {
			lines.push({ type: 'output', text: `${profile.handle} (${profile.name})` });
		} else if (cmd === 'pwd') {
			lines.push({ type: 'output', text: '~/portfolio/mario-belmonte (this site)' });
		} else if (cmd === 'ls' || cmd === 'dir') {
			const list = projects.map((p) => `  ${p.slug}`).join('\n');
			lines.push({
				type: 'output',
				text: `projects/\n${list}\n\n  Type "projects" for titles or "project <n>" to open by index.`
			});
		} else if (cmd.startsWith('echo ')) {
			lines.push({ type: 'output', text: trimmed.slice(5).trim() });
		} else if (cmd === 'github') {
			lines.push({ type: 'output', text: `Opening ${profile.github}…` });
			if (typeof window !== 'undefined') window.open(profile.github, '_blank', 'noopener,noreferrer');
		} else if (cmd === 'projects') {
			const list = projects
				.map((p, i) => `  ${String(i + 1).padStart(2, '0')}. ${p.title} (${p.year})`)
				.join('\n');
			lines.push({
				type: 'output',
				text:
					'Projects:\n' +
					list +
					'\n\n  Navigate to /projects for the full list or type "project <number>" for details.'
			});
		} else if (cmd === 'history') {
			if (history.length === 0) {
				lines.push({ type: 'output', text: 'No command history yet.' });
			} else {
				const last = history.slice(-12);
				const list = last.map((entry, i) => `  ${String(i + 1).padStart(2, '0')}. ${entry}`).join('\n');
				lines.push({ type: 'output', text: `Recent commands:\n${list}` });
			}
		} else if (cmd === 'home') {
			lines.push({ type: 'output', text: 'Returning home…' });
			open = false;
			assignAppLocation('/');
		} else if (cmd.startsWith('project ')) {
			const idx = parseInt(cmd.replace('project ', ''), 10) - 1;
			const p = projects[idx];
			if (p) {
				lines.push({ type: 'output', text: `Navigating to ${p.title}…` });
				open = false;
				assignAppLocation(`/projects/${p.slug}`);
			} else {
				lines.push({ type: 'error', text: `project: no project at index ${idx + 1}` });
			}
		} else if (cmd.startsWith('open ')) {
			const arg = trimmed.slice(5).trim().toLowerCase();
			const asIndex = Number.parseInt(arg, 10);
			const byIndex = Number.isFinite(asIndex) ? projects[asIndex - 1] : undefined;
			const bySlug = projects.find((p) => p.slug.toLowerCase() === arg);
			const target = byIndex ?? bySlug;

			if (target) {
				lines.push({ type: 'output', text: `Opening ${target.title}…` });
				open = false;
				assignAppLocation(`/projects/${target.slug}`);
			} else {
				lines.push({
					type: 'error',
					text: `open: no project found for "${arg}". Try "projects" or "open <number>".`
				});
			}
		} else if (cmd === 'resume') {
			lines.push({ type: 'output', text: 'Opening resume…' });
			open = false;
			assignAppLocation('/resume');
		} else if (cmd === 'contact') {
			lines.push({
				type: 'output',
				text: [
					'Contact:',
					`  email    ${profile.email}`,
					`  github   ${profile.github}`,
					`  linkedin ${profile.linkedin}`
				].join('\n')
			});
		} else if (cmd === 'clear') {
			lines = [{ type: 'output', text: 'Terminal cleared.' }];
			scrollToBottom();
			return;
		} else if (cmd === 'exit') {
			open = false;
			return;
		} else {
			lines.push({ type: 'error', text: `${cmd}: command not found. Type "help" for commands.` });
		}

		scrollToBottom();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			run(inputValue);
			inputValue = '';
			return;
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
			e.preventDefault();
			lines = [{ type: 'output', text: 'Terminal cleared. Use "help" for commands.' }];
			inputValue = '';
			historyCursor = -1;
			draftInput = '';
			scrollToBottom();
			return;
		}
		if (e.key === 'Tab') {
			e.preventDefault();
			const current = inputValue.trim().toLowerCase();
			if (!current) {
				lines.push({ type: 'output', text: `Suggestions: ${commandSuggestions.join(', ')}` });
				scrollToBottom();
				return;
			}
			const matches = commandSuggestions.filter((entry) => entry.startsWith(current));
			if (matches.length === 1) {
				inputValue = matches[0].replace(' <n>', '').replace(' <slug|n>', '');
			} else if (matches.length > 1) {
				lines.push({ type: 'output', text: `Matches: ${matches.join(', ')}` });
				scrollToBottom();
			}
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (history.length === 0) return;
			if (historyCursor === -1) draftInput = inputValue;
			historyCursor = Math.min(historyCursor + 1, history.length - 1);
			inputValue = history[history.length - 1 - historyCursor] ?? '';
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (history.length === 0 || historyCursor < 0) return;
			if (historyCursor === 0) {
				historyCursor = -1;
				inputValue = draftInput;
				return;
			}
			historyCursor -= 1;
			inputValue = history[history.length - 1 - historyCursor] ?? '';
		}
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
<button type="button" class="trigger" aria-label="Open terminal (Ctrl+`)" onclick={toggleOpen}>
	<span class="trigger__icon" aria-hidden="true">{'>'}_</span>
	<span class="trigger__label">terminal</span>
</button>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="portal" use:portal>
		<div class="backdrop" onclick={() => (open = false)}></div>

		<div class="terminal" role="dialog" aria-modal="true" aria-label="Terminal">
			<div class="terminal__bar">
				<span class="terminal__title">mario-belmonte — bash</span>
				<button type="button" class="terminal__close" aria-label="Close terminal" onclick={() => (open = false)}>✕</button>
			</div>

			<!-- Output -->
			<div class="terminal__output" bind:this={containerEl}>
				{#each lines as line}
					<div class="line line--{line.type}" role={line.type === 'error' ? 'alert' : undefined}>
						{#each line.text.split('\n') as row}
							<span>{row}</span>
						{/each}
					</div>
				{/each}
			</div>

			<!-- Input row -->
			<div class="terminal__input-row">
				<span class="terminal__prompt" aria-hidden="true">{'>'}</span>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					bind:this={inputEl}
					bind:value={inputValue}
					onkeydown={handleKey}
					class="terminal__input"
					type="text"
					spellcheck="false"
					autocomplete="off"
					aria-label="Terminal input"
					placeholder="type a command…"
				/>
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

	@media (max-width: 639px) {
		.trigger {
			display: none;
		}
	}

	.trigger__icon {
		font-weight: 700;
		color: var(--accent);
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 7000;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
	}

	.terminal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 7010;
		width: min(720px, 94vw);
		max-height: min(480px, 80vh);
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		background: #060a0e;
		font-family: var(--font-mono);
		font-size: 0.88rem;
		overflow: hidden;
	}

	.terminal__bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.45rem 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		border-bottom: 1px solid var(--border-2);
		flex-shrink: 0;
	}

	.terminal__title {
		font-size: 0.78rem;
		color: var(--muted);
		letter-spacing: 0.04em;
	}

	.terminal__close {
		background: none;
		border: none;
		color: var(--muter);
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0.1rem 0.25rem;
		font-family: inherit;
		transition: color 0.14s;
		border-radius: 0;
	}

	.terminal__close:hover {
		color: rgba(243, 246, 255, 0.9);
	}

	.terminal__output {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		scrollbar-width: thin;
		scrollbar-color: rgba(54, 242, 194, 0.2) transparent;
	}

	.line {
		display: flex;
		flex-direction: column;
		gap: 0.05rem;
		line-height: 1.55;
	}

	.line span {
		white-space: pre;
	}

	.line--input span {
		color: rgba(243, 246, 255, 0.55);
	}

	.line--output span {
		color: rgba(243, 246, 255, 0.85);
	}

	.line--error span {
		color: rgba(255, 90, 90, 0.9);
	}

	.terminal__input-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.75rem;
		border-top: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.02);
		flex-shrink: 0;
	}

	.terminal__prompt {
		color: var(--accent);
		font-weight: 700;
		font-size: 0.92rem;
		flex-shrink: 0;
	}

	.terminal__input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-family: var(--font-mono);
		font-size: 0.88rem;
		color: rgba(243, 246, 255, 0.92);
		caret-color: var(--accent);
		min-width: 0;
	}

	.terminal__input::placeholder {
		color: var(--muter);
	}
</style>
