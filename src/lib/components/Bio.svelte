<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section id="about" class="section">
	<div class="section-inner">
		<div class="label">
			<span class="prompt">#</span> about
		</div>

		<div class="content">
			<div class="bio-block">
				<div class="terminal-comment">// {profile.name} — {profile.title}</div>
				<p class="bio-text">{profile.bio}</p>
				<div class="meta">
					<span class="meta-item">
						<span class="meta-key">location</span>
						<span class="meta-val">{profile.location}</span>
					</span>
				</div>
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
		max-width: 680px;
	}

	.terminal-comment {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-dim);
		margin-bottom: 1rem;
		letter-spacing: 0.03em;
	}

	.bio-text {
		color: var(--text-muted);
		font-size: 1rem;
		line-height: 1.75;
		margin: 0 0 1.5rem;
	}

	.meta {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.meta-item {
		display: flex;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.meta-key {
		color: var(--accent-dim);
	}

	.meta-val {
		color: var(--text-dim);
	}
</style>
