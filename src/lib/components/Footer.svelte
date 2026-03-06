<script lang="ts">
	import { profile } from '$lib/data/profile';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="inner">
		<span class="copy">© {year} {profile.name}</span>
		<div class="foot-links">
			<a href={profile.github} target="_blank" rel="noopener noreferrer">github</a>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
			{#if profile.twitter}
				<a href={profile.twitter} target="_blank" rel="noopener noreferrer">twitter</a>
			{/if}
		</div>
		<span class="built-with">built with sveltekit</span>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--border);
		padding: 2rem;
	}

	.inner {
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.copy,
	.built-with {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		letter-spacing: 0.03em;
	}

	.foot-links {
		display: flex;
		gap: 1.5rem;
	}

	.foot-links a {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color 0.15s;
	}

	.foot-links a:hover {
		color: var(--accent);
	}
</style>
