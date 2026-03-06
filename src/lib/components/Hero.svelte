<script lang="ts">
	import { profile } from '$lib/data/profile';

	let visible = $state(false);

	$effect(() => {
		const t = setTimeout(() => (visible = true), 100);
		return () => clearTimeout(t);
	});
</script>

<section class="hero" class:visible>
	<div class="hero-inner">
		<div class="terminal-line">
			<span class="prompt">$</span>
			<span class="command"> whoami</span>
		</div>

		<h1 class="name">{profile.name}</h1>
		<p class="title">{profile.title}</p>

		<div class="terminal-line mt">
			<span class="prompt">$</span>
			<span class="command"> cat bio.txt</span>
		</div>

		<p class="bio">{profile.bio}</p>

		<div class="cta-row">
			<a href="/#projects" class="btn btn-primary">view projects</a>
			<a href={profile.github} target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
				github ↗
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 6rem 2rem 4rem;
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
	}

	.hero.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-inner {
		max-width: 720px;
	}

	.terminal-line {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.terminal-line.mt {
		margin-top: 2rem;
	}

	.prompt {
		color: var(--accent);
	}

	.command {
		color: var(--text-dim);
	}

	.name {
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--text);
		margin: 0 0 0.25rem;
		line-height: 1.05;
	}

	.title {
		font-family: var(--font-mono);
		font-size: 1.125rem;
		color: var(--accent);
		margin: 0 0 0.5rem;
		letter-spacing: 0.03em;
	}

	.bio {
		color: var(--text-muted);
		font-size: 1.05rem;
		line-height: 1.7;
		max-width: 600px;
		margin: 0.5rem 0 0;
	}

	.cta-row {
		display: flex;
		gap: 1rem;
		margin-top: 2.5rem;
		flex-wrap: wrap;
	}

	.btn {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		padding: 0.6rem 1.4rem;
		border-radius: 4px;
		text-decoration: none;
		letter-spacing: 0.04em;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
	}

	.btn-primary {
		background: var(--accent);
		color: var(--bg);
		border: 1px solid var(--accent);
	}

	.btn-primary:hover {
		background: var(--accent-bright);
		border-color: var(--accent-bright);
	}

	.btn-ghost {
		background: transparent;
		color: var(--text-muted);
		border: 1px solid var(--border);
	}

	.btn-ghost:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
</style>
