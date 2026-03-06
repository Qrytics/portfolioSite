<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section id="contact" class="section">
	<div class="section-inner">
		<div class="label">
			<span class="prompt">#</span> contact
		</div>

		<div class="content">
			<p class="intro">
				Want to work together or just say hello? Reach out via email or find me online.
			</p>

			<div class="links">
				<a href="mailto:{profile.email}" class="link-row">
					<span class="link-key">email</span>
					<span class="link-val">{profile.email} ↗</span>
				</a>
				<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link-row">
					<span class="link-key">github</span>
					<span class="link-val">{profile.github.replace('https://', '')} ↗</span>
				</a>
				<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link-row">
					<span class="link-key">linkedin</span>
					<span class="link-val">{profile.linkedin.replace('https://', '')} ↗</span>
				</a>
				{#if profile.twitter}
					<a href={profile.twitter} target="_blank" rel="noopener noreferrer" class="link-row">
						<span class="link-key">twitter</span>
						<span class="link-val">{profile.twitter.replace('https://', '')} ↗</span>
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		padding: 5rem 2rem;
		border-top: 1px solid var(--border);
	}

	.section-inner {
		max-width: 960px;
		margin: 0 auto;
	}

	.label {
		font-family: var(--font-mono);
		font-size: 1.25rem;
		color: var(--text-muted);
		letter-spacing: 0.04em;
		margin-bottom: 2.5rem;
	}

	.prompt {
		color: var(--accent);
	}

	.content {
		max-width: 560px;
	}

	.intro {
		color: var(--text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
		margin: 0 0 2rem;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.link-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		transition: border-color 0.15s;
	}

	.link-row:hover .link-key,
	.link-row:hover .link-val {
		color: var(--accent);
	}

	.link-key {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
		width: 80px;
		flex-shrink: 0;
		letter-spacing: 0.04em;
	}

	.link-val {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-muted);
		letter-spacing: 0.02em;
		transition: color 0.15s;
	}
</style>
