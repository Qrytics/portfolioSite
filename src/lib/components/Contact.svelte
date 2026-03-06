<script lang="ts">
	import { profile } from '$lib/data/profile';

	let toastVisible = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	function copyEmail() {
		navigator.clipboard.writeText(profile.email).then(() => {
			if (toastTimer !== undefined) clearTimeout(toastTimer);
			toastVisible = true;
			toastTimer = setTimeout(() => (toastVisible = false), 2500);
		});
	}
</script>

<section id="contact" class="section">
	<div class="shell">
		<div class="card">
			<div class="termbar">
				<h2 class="termbar__title">contact</h2>
				<span class="badge">links</span>
			</div>
			<div class="content">
				<div class="link-row">
					<span class="link-key">email</span>
					<button class="email-btn link" onclick={copyEmail}>
						{profile.email} (click to copy)
					</button>
				</div>
				<div class="link-row">
					<span class="link-key">github</span>
					<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link">
						{profile.github.replace('https://', '')} ↗
					</a>
				</div>
				<div class="link-row">
					<span class="link-key">linkedin</span>
					<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link">
						{profile.linkedin.replace('https://', '')} ↗
					</a>
				</div>
				{#if profile.twitter}
					<div class="link-row">
						<span class="link-key">twitter</span>
						<a href={profile.twitter} target="_blank" rel="noopener noreferrer" class="link">
							{profile.twitter.replace('https://', '')} ↗
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

{#if toastVisible}
	<div class="toast" role="status" aria-live="polite">email copied to clipboard</div>
{/if}

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
		gap: 0.5rem;
	}

	.link-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border-2);
	}

	.link-row:last-child {
		border-bottom: none;
	}

	.link-key {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: rgba(54, 242, 194, 0.6);
		min-width: 72px;
		letter-spacing: 0.04em;
	}

	.link {
		color: rgba(54, 242, 194, 0.94);
		text-decoration: none;
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
		font-size: 0.88rem;
	}

	.link:hover {
		color: var(--accent);
		border-color: rgba(54, 242, 194, 0.55);
	}

	.email-btn {
		background: none;
		border: none;
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
		padding: 0;
		font: inherit;
		cursor: pointer;
	}

	.email-btn:hover {
		text-decoration: none;
	}

	.toast {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%);
		background: var(--panel);
		color: rgba(243, 246, 255, 0.92);
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border);
		box-shadow: var(--shadow);
		z-index: 1000;
		text-align: center;
		max-width: calc(100vw - 2rem);
		white-space: nowrap;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		animation: toast-in 0.2s ease-out;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translate(-50%) translateY(1rem); }
		to   { opacity: 1; transform: translate(-50%) translateY(0); }
	}
</style>

