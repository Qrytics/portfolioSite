<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section id="about" class="section">
	<div class="shell">
		<div class="card">
			<div class="termbar">
				<h2 class="termbar__title">about</h2>
				<span class="badge">readme</span>
			</div>
			<div class="content">
				<p class="bio">{profile.bio}</p>
				<div class="meta">
					<span class="meta-key">location</span>
					<span class="meta-val">{profile.location}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding: 0 clamp(1.25rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem);
		scroll-margin-top: clamp(4.25rem, 9vw, 5.75rem);
	}

	.shell {
		max-width: 86rem;
		margin: 0 auto;
	}

	.card {
		border: 1px solid var(--border);
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 52%), var(--panel);
		overflow: hidden;
	}

	.termbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.85rem;
		padding: 0.75rem 0.9rem;
		border-bottom: 1px solid var(--border-2);
		background: rgba(0, 0, 0, 0.22);
	}

	.termbar__title {
		margin: 0;
		font-size: 0.92rem;
		letter-spacing: 0.02em;
		color: rgba(243, 246, 255, 0.82);
		font-weight: 600;
	}

	.badge {
		font-size: 0.78rem;
		color: rgba(243, 246, 255, 0.72);
		border: 1px solid var(--border-2);
		padding: 0.2rem 0.55rem;
		background: rgba(255, 255, 255, 0.03);
		text-transform: lowercase;
	}

	.content {
		padding: 1rem 1.25rem;
		display: grid;
		gap: 0.75rem;
	}

	.bio {
		color: rgba(243, 246, 255, 0.78);
		line-height: 1.7;
		font-size: 0.97rem;
		max-width: 80ch;
		margin: 0;
	}

	.meta {
		display: flex;
		gap: 0.75rem;
		font-size: 0.85rem;
		align-items: center;
	}

	.meta-key {
		color: rgba(54, 242, 194, 0.7);
	}

	.meta-val {
		color: var(--muted);
	}
</style>

