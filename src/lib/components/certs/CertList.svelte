<script lang="ts">
	/**
	 * Every non-featured credential, grouped by issuer (Microsoft first), with filter chips. Large groups
	 * collapse to `COLLAPSED` items behind a "show all" button so IBM's two dozen don't become a wall.
	 * The button only reveals rows below the fold of the group, so nothing above it moves.
	 */
	import CertBadge from './CertBadge.svelte';
	import { certDateLabel, groupedCertifications, type CertGroup } from '$lib/data/certifications';
	import { tone } from '$lib/utils/synth';

	const COLLAPSED = 8;
	let filter = $state<CertGroup | 'all'>('all');
	let expanded = $state<Record<string, boolean>>({});

	const shown = $derived(filter === 'all' ? groupedCertifications : groupedCertifications.filter((g) => g.id === filter));

	function pick(next: CertGroup | 'all') {
		filter = next;
		tone(next === 'all' ? 660 : 880, { type: 'triangle', dur: 0.08, vol: 0.18 });
	}
</script>

<div class="filters" role="group" aria-label="Filter by issuer">
	<button type="button" class="chip" aria-pressed={filter === 'all'} onclick={() => pick('all')}>all</button>
	{#each groupedCertifications as g (g.id)}
		<button type="button" class="chip" aria-pressed={filter === g.id} onclick={() => pick(g.id)} style="--tint:{g.tint}">
			<span class="chip__dot" aria-hidden="true"></span>{g.id}<span class="chip__n">{g.items.length}</span>
		</button>
	{/each}
</div>

{#each shown as g (g.id)}
	{@const open = expanded[g.id] || filter !== 'all' || g.items.length <= COLLAPSED + 1}
	<section class="group" style="--tint:{g.tint}" aria-labelledby="cert-group-{g.id.replace(/\s/g, '-')}">
		<h3 class="group__title" id="cert-group-{g.id.replace(/\s/g, '-')}">
			<span class="group__bar" aria-hidden="true"></span>{g.id}
			<span class="group__count">{g.items.length}</span>
		</h3>
		<ul class="grid">
			{#each open ? g.items : g.items.slice(0, COLLAPSED) as cert (cert.id)}
				<li class="item">
					<CertBadge {cert} size={46} showCode={false} />
					<div class="item__text">
						{#if cert.verifyUrl}
							<a class="item__title" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">{cert.title}<span class="sr-only"> (opens in new tab)</span></a>
						{:else}
							<span class="item__title">{cert.title}</span>
						{/if}
						<span class="item__meta">{cert.issuer !== cert.group ? `${cert.issuer} · ` : ''}{certDateLabel(cert)}</span>
					</div>
				</li>
			{/each}
		</ul>
		{#if !open}
			<button type="button" class="more" onclick={() => (expanded[g.id] = true)}>
				show all {g.items.length} {g.id} credentials ↓
			</button>
		{/if}
	</section>
{/each}

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: 1.5rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 2.5rem;
		padding: 0 0.8rem;
		border: 1px solid var(--border);
		background: var(--panel);
		color: var(--muted);
		font: inherit;
		font-size: 0.8rem;
		cursor: pointer;
	}

	.chip:hover {
		border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
		color: var(--text);
	}

	.chip[aria-pressed='true'] {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, var(--panel));
		color: var(--accent-text);
	}

	.chip__dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--tint, var(--accent));
	}

	.chip__n {
		color: var(--muter);
		font-size: 0.72rem;
	}

	.group + .group {
		margin-top: 1.75rem;
	}

	.group__title {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin: 0 0 0.75rem;
		color: var(--text);
		font-size: 0.95rem;
		letter-spacing: 0.02em;
	}

	.group__bar {
		width: 0.3rem;
		height: 1.1rem;
		background: var(--tint);
	}

	.group__count {
		padding: 0.05rem 0.45rem;
		border: 1px solid var(--border-2);
		color: var(--muter);
		font-size: 0.72rem;
		font-weight: 400;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
		gap: 0.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		min-height: 4.25rem;
		padding: 0.55rem 0.8rem;
		border: 1px solid var(--border-2);
		border-left: 2px solid color-mix(in srgb, var(--tint) 70%, transparent);
		background: var(--panel);
		transition: transform 0.16s ease, border-color 0.16s ease;
	}

	@media (hover: hover) {
		.item:hover {
			transform: translateY(-2px);
			border-color: color-mix(in srgb, var(--tint) 45%, var(--border));
		}
	}

	.item__text {
		display: grid;
		gap: 0.15rem;
		min-width: 0;
	}

	.item__title {
		color: var(--text);
		font-size: 0.84rem;
		line-height: 1.35;
		text-decoration: none;
	}

	a.item__title:hover {
		color: var(--accent-text);
	}

	.item__meta {
		color: var(--muter);
		font-size: 0.72rem;
	}

	.more {
		margin-top: 0.6rem;
		min-height: 2.75rem;
		padding: 0 1rem;
		border: 1px dashed color-mix(in srgb, var(--tint) 50%, var(--border));
		background: transparent;
		color: var(--accent-text);
		font: inherit;
		font-size: 0.82rem;
		cursor: pointer;
	}

	.more:hover {
		background: color-mix(in srgb, var(--tint) 8%, transparent);
	}

	@media (max-width: 640px) {
		.filters {
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
			margin-inline: -1rem;
			padding-inline: 1rem;
			-webkit-mask-image: linear-gradient(90deg, #000 85%, transparent);
			mask-image: linear-gradient(90deg, #000 85%, transparent);
		}

		.filters::-webkit-scrollbar {
			display: none;
		}

		.chip {
			flex-shrink: 0;
		}
	}
</style>
