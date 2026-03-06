<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section id="skills" class="section">
	<div class="shell">
		<div class="card">
			<div class="termbar">
				<h2 class="termbar__title">skills</h2>
				<span class="badge">stack</span>
			</div>
			<div class="content">
				{#each profile.skills as group}
					<div class="group">
						<div class="group-title">{group.category}</div>
						<ul class="skill-list">
							{#each group.items as skill}
								<li class="skill">{skill}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		z-index: 1;
		padding: 0 clamp(1.25rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem);
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
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1.5rem;
	}

	.group-title {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin-bottom: 0.6rem;
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.skill {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--muted);
		padding: 0.2rem 0 0.2rem 0.75rem;
		border-left: 2px solid var(--border-2);
		transition: border-color 0.15s, color 0.15s;
	}

	.skill:hover {
		border-color: rgba(54, 242, 194, 0.3);
		color: var(--text);
	}
</style>

