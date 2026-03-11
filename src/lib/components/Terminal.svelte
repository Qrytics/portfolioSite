<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { projects } from '$lib/data/projects';
	import { goto } from '$app/navigation';

	let open = $state(false);
	let inputValue = $state('');
	let lines = $state<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
		{ type: 'output', text: 'Welcome to mario-belmonte terminal. Type "help" for available commands.' }
	]);

	let inputEl: HTMLInputElement = $state(undefined as unknown as HTMLInputElement);
	let containerEl: HTMLElement = $state(undefined as unknown as HTMLElement);

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
			setTimeout(() => inputEl?.focus(), 10);
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
		const cmd = raw.trim().toLowerCase();
		lines.push({ type: 'input', text: `> ${raw.trim()}` });

		if (!cmd) {
			scrollToBottom();
			return;
		}

		if (cmd === 'help') {
			lines.push({
				type: 'output',
				text: [
					'Available commands:',
					'  help        — show this message',
					'  about       — who is mario',
					'  skills      — list technical skills',
					'  projects    — list projects',
					'  resume      — open resume page',
					'  contact     — show contact info',
					'  clear       — clear the terminal',
					'  exit        — close the terminal'
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
		} else if (cmd === 'projects') {
			const list = projects
				.map((p, i) => `  ${String(i + 1).padStart(2, '0')}. ${p.title} (${p.year})`)
				.join('\n');
			lines.push({
				type: 'output',
				text:
					'Projects:\n' +
					list +
					'\n\n  Navigate to /#projects or type "project <number>" for details.'
			});
		} else if (cmd.startsWith('project ')) {
			const idx = parseInt(cmd.replace('project ', ''), 10) - 1;
			const p = projects[idx];
			if (p) {
				lines.push({ type: 'output', text: `Navigating to ${p.title}…` });
				open = false;
				goto(`/projects/${p.slug}`);
			} else {
				lines.push({ type: 'error', text: `project: no project at index ${idx + 1}` });
			}
		} else if (cmd === 'resume') {
			lines.push({ type: 'output', text: 'Opening resume…' });
			open = false;
			goto('/resume');
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
		}
	}

	// Expose open state toggle for external buttons
	export function toggle() {
		toggleOpen();
	}
</script>

<!-- Trigger button -->
<button class="trigger" aria-label="Open terminal (Ctrl+`)" onclick={toggleOpen}>
	<span class="trigger__icon" aria-hidden="true">{'>'}_</span>
	<span class="trigger__label">terminal</span>
</button>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="backdrop" onclick={() => (open = false)}></div>

	<div class="terminal" role="dialog" aria-modal="true" aria-label="Terminal">
		<div class="terminal__bar">
			<span class="terminal__title">mario-belmonte — bash</span>
			<button class="terminal__close" aria-label="Close terminal" onclick={() => (open = false)}>✕</button>
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
		font-weight: 700;
		color: var(--accent);
	}

	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 199;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
	}

	.terminal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 200;
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
