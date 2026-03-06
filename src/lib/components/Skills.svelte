<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section id="skills" class="section">
	<div class="section-inner">
		<div class="label">
			<span class="prompt">#</span> skills
		</div>

		<div class="grid">
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

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
	}

	.group-title {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.skill {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		color: var(--text-muted);
		padding: 0.2rem 0;
		border-left: 2px solid var(--border);
		padding-left: 0.75rem;
		transition: border-color 0.15s, color 0.15s;
	}

	.skill:hover {
		border-color: var(--accent-dim);
		color: var(--text);
	}
</style>
