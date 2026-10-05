<script lang="ts">
	import { page } from '$app/state';

	/**
	 * Replaces SvelteKit's bare default error page, which rendered unstyled text with no way back —
	 * for an unknown URL, a `/projects/<typo>` (`error(404)` in `projects/[slug]/+page.ts`), or a
	 * render crash. Kept in the terminal style of the rest of the site and inside the normal layout,
	 * so the nav (and its search) is still there.
	 */
	const status = $derived(page.status);
	const notFound = $derived(status === 404);
	const path = $derived(page.url.pathname);

	function openSearch() {
		// Search listens for Ctrl/Cmd+K on window; dispatching it reuses that path instead of
		// threading a store through the layout just for this button.
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
	}
</script>

<svelte:head>
	<!-- Not page metadata in the `seo.ts` sense: an error response should simply never be indexed,
	     and this tag is unique, so it can't collide with anything the layout emits. -->
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="page">
	<div class="card">
		<div class="termbar">
			<span class="dot" aria-hidden="true"></span>
			<span class="termbar__title">~/{notFound ? 'not-found' : 'error'}</span>
		</div>
		<div class="body">
			<p class="prompt" aria-hidden="true">$ cd {path}</p>
			<h1 class="title">{status} — {notFound ? 'nothing lives here' : 'something broke'}</h1>
			<p class="msg">
				{#if notFound}
					<code>{path}</code> doesn't exist. It may have moved, or the link has a typo.
				{:else}
					{page.error?.message ?? 'An unexpected error occurred.'}
				{/if}
			</p>

			<ul class="links">
				<li><a href="/">~ home</a></li>
				<li><a href="/projects">projects</a></li>
				<li><a href="/games">games</a></li>
				<li><button type="button" class="link-btn" onclick={openSearch}>search the site (Ctrl+K)</button></li>
			</ul>
		</div>
	</div>
</div>

<style>
	.page {
		min-height: calc(100dvh - 260px);
		display: grid;
		place-items: center;
		padding: 3rem clamp(1.25rem, 4vw, 3rem);
	}

	.card {
		width: min(40rem, 100%);
		border: 1px solid var(--border);
		background: var(--panel);
	}

	.termbar {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: var(--panel-2);
		font-size: 0.8rem;
		color: var(--muted);
	}

	.dot {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: var(--hot);
	}

	.body {
		padding: 1.4rem 1.2rem 1.2rem;
	}

	.prompt {
		margin: 0 0 0.6rem;
		color: var(--muter);
		font-size: 0.85rem;
		overflow-wrap: anywhere;
	}

	.title {
		margin: 0 0 0.75rem;
		font-size: clamp(1.15rem, 3vw, 1.5rem);
	}

	.msg {
		margin: 0 0 1.25rem;
		color: var(--muted);
		line-height: 1.6;
	}

	.msg code {
		overflow-wrap: anywhere;
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
	}

	.links a,
	.link-btn {
		display: inline-block;
		padding: 0.55rem 0;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--accent-text);
		text-decoration: none;
	}

	.link-btn {
		border: 0;
		background: none;
		cursor: pointer;
	}

	.links a:hover,
	.link-btn:hover {
		text-decoration: underline;
	}
</style>
