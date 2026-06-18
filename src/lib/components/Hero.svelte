<script lang="ts">
	import { profile } from '$lib/data/profile';
	import WaveCheckeredBackground from './WaveCheckeredBackground.svelte';

	let toastVisible = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	const taglineWords = profile.tagline.split(' ').map((word, wordIndex) => ({
		key: `tag-word-${wordIndex}`,
		chars: Array.from(word).map((char, charIndex) => ({
			char,
			id: `${wordIndex}-${charIndex}`
		}))
	}));
	let explodedLetters = $state<Set<string>>(new Set());
	let respawnTimers: Record<string, ReturnType<typeof setTimeout>> = {};

	function handleLetterClick(index: string) {
		explodedLetters.add(index);
		explodedLetters = new Set(explodedLetters);

		if (respawnTimers[index] !== undefined) clearTimeout(respawnTimers[index]);
		respawnTimers[index] = setTimeout(() => {
			explodedLetters.delete(index);
			explodedLetters = new Set(explodedLetters);
			delete respawnTimers[index];
		}, 3000);
	}

	function handleLetterKeydown(e: KeyboardEvent, index: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleLetterClick(index);
		}
	}

	function copyEmail() {
		navigator.clipboard.writeText(profile.email).then(() => {
			if (toastTimer !== undefined) clearTimeout(toastTimer);
			toastVisible = true;
			toastTimer = setTimeout(() => (toastVisible = false), 2500);
		});
	}
</script>

<header class="header">
	<div class="hero-background" aria-hidden="true">
		<WaveCheckeredBackground />
	</div>

	<div class="header__content">
		<h1 class="header__tagline" aria-label={profile.tagline}>
			<span class="tagline-letters" aria-hidden="true">
				{#each taglineWords as word, wordIndex (`${word.key}`)}
					<span class="tag-word">
						{#each word.chars as letter (`tag-char-${letter.id}`)}
							<span
								class={['tag-char', explodedLetters.has(letter.id) && 'tag-char--exploded'].filter(Boolean).join(' ')}
								role="button"
								tabindex="0"
								onclick={() => handleLetterClick(letter.id)}
								onkeydown={(e) => handleLetterKeydown(e, letter.id)}
							>
								{letter.char}
								{#if !explodedLetters.has(letter.id)}
									<span class="tag-char__star tag-char__star--a">✦</span>
									<span class="tag-char__star tag-char__star--b">✦</span>
									<span class="tag-char__star tag-char__star--c">✦</span>
									<span class="tag-char__star tag-char__star--d">✦</span>
								{/if}
								{#if explodedLetters.has(letter.id)}
									{#each Array(12) as _, confetti}
										<span class={`confetti confetti-${confetti}`}></span>
									{/each}
								{/if}
							</span>
						{/each}
					</span>
					{#if wordIndex < taglineWords.length - 1}
						<span class="tag-char tag-char--space" aria-hidden="true">&nbsp;</span>
					{/if}
				{/each}
			</span>
		</h1>
		<p class="header__description">{profile.description}</p>
		{#if profile.heroCta}
			<p class="header__cta">{profile.heroCta}</p>
		{/if}
		<div class="header__actions">
			<a
				href="https://mario-belmonte.com/tutoring"
				target="_blank"
				rel="noopener noreferrer"
				class="hero-action"
			>
				book a tutoring session ↗
			</a>
		</div>
		<div class="header__meta">
			<a href={profile.github} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.github.replace('https://', '')}
			</a>
			<span class="meta-sep">·</span>
			<button type="button" class="link link__mono email-copy-btn" onclick={copyEmail}>{profile.email}</button>
			<span class="meta-sep">·</span>
			<a href={profile.linkedin} target="_blank" rel="noopener noreferrer" class="link link__mono">
				{profile.linkedin.replace('https://www.', '')}
			</a>
		</div>
	</div>
</header>

{#if toastVisible}
	<div class="toast" role="status" aria-live="polite">email copied to clipboard</div>
{/if}

<style>
	.header {
		position: relative;
		z-index: 1;
		margin-top: 0;
		margin-bottom: 0;
		min-height: 280px;
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}

	.header__content {
		position: relative;
		z-index: 1;
		padding: clamp(2rem, 4vw, 3rem) clamp(2rem, 6vw, 5rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 280px;
	}

	.header__content::before {
		content: '';
		position: absolute;
		inset: 50%;
		transform: translate(-50%, -50%);
		width: min(80ch, 80%);
		height: 70%;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0.7) 30%,
			rgba(0, 0, 0, 0.5) 60%,
			transparent 85%
		);
		filter: blur(16px);
		z-index: -1;
		pointer-events: none;
	}

	.header__tagline {
		position: relative;
		margin: 0;
		color: var(--text);
		font-size: clamp(1.4rem, 3vw, 1.85rem);
		font-weight: 700;
		max-width: 75ch;
		line-height: 1.45;
		padding-bottom: 16px;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
		cursor: default;
	}

	.tagline-letters {
		display: inline;
	}

	.tag-word {
		display: inline-block;
		white-space: nowrap;
		vertical-align: baseline;
	}

	.tag-char--space {
		display: inline;
		cursor: default;
		user-select: text;
		padding: 0;
		margin: 0;
	}

	.tag-char {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		padding: 0;
		margin: 0;
		transform-origin: 50% 78%;
		cursor: pointer;
		user-select: none;
		transition: transform 0.1s ease, color 0.1s ease, text-shadow 0.1s ease, filter 0.1s ease;
		will-change: transform, filter;
	}

	.tag-char__star {
		position: absolute;
		left: 50%;
		top: 45%;
		font-size: clamp(0.38rem, 0.75vw, 0.55rem);
		line-height: 1;
		color: color-mix(in srgb, var(--accent) 78%, white);
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.3);
		pointer-events: none;
		filter: drop-shadow(0 0 3px color-mix(in srgb, var(--accent) 60%, white));
	}

	@media (hover: hover) and (pointer: fine) {
		.tag-char:not(.tag-char--space):hover {
			color: color-mix(in srgb, var(--accent) 70%, white);
			transform: translateY(-0.1em) scale(1.1);
			filter: saturate(1.14);
			text-shadow:
				0 0 0.35rem color-mix(in srgb, var(--accent) 72%, white),
				0 0 0.8rem color-mix(in srgb, var(--accent) 66%, white),
				0 0 1.4rem color-mix(in srgb, var(--accent) 44%, white);
		}

		.tag-char:hover .tag-char__star--a {
			animation: star-spray-a 0.28s ease-out;
		}

		.tag-char:hover .tag-char__star--b {
			animation: star-spray-b 0.28s ease-out;
		}

		.tag-char:hover .tag-char__star--c {
			animation: star-spray-c 0.28s ease-out;
		}

		.tag-char:hover .tag-char__star--d {
			animation: star-spray-d 0.28s ease-out;
		}
	}

	@keyframes star-spray-a {
		0% { opacity: 0; transform: translate(-50%, -52%) scale(0.25) rotate(0deg); }
		20% { opacity: 1; }
		100% { opacity: 0; transform: translate(-145%, -170%) scale(0.95) rotate(32deg); }
	}

	@keyframes star-spray-b {
		0% { opacity: 0; transform: translate(-48%, -50%) scale(0.25) rotate(0deg); }
		20% { opacity: 1; }
		100% { opacity: 0; transform: translate(18%, -190%) scale(1) rotate(-35deg); }
	}

	@keyframes star-spray-c {
		0% { opacity: 0; transform: translate(-50%, -48%) scale(0.25) rotate(0deg); }
		20% { opacity: 1; }
		100% { opacity: 0; transform: translate(-190%, -40%) scale(0.82) rotate(26deg); }
	}

	@keyframes star-spray-d {
		0% { opacity: 0; transform: translate(-50%, -52%) scale(0.25) rotate(0deg); }
		20% { opacity: 1; }
		100% { opacity: 0; transform: translate(55%, -24%) scale(0.76) rotate(-25deg); }
	}

	.tag-char--exploded {
		animation: char-explode 0.35s ease-out forwards;
	}

	.tag-char--exploded::after {
		content: '';
		position: absolute;
		inset: -20%;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--accent) 50%, white),
			color-mix(in srgb, var(--accent) 30%, white) 40%,
			transparent 70%
		);
		animation: blast-wave 0.4s ease-out;
		pointer-events: none;
	}

	@keyframes char-explode {
		0% { opacity: 1; transform: scale(1); }
		100% { opacity: 0; transform: scale(0.1); }
	}

	@keyframes blast-wave {
		0% { transform: scale(0); opacity: 0.6; }
		100% { transform: scale(2.5); opacity: 0; }
	}

	.confetti {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0.4em;
		height: 0.4em;
		background: color-mix(in srgb, var(--accent) 70%, white);
		pointer-events: none;
		box-shadow: 0 0 0.2em color-mix(in srgb, var(--accent) 60%, white);
	}

	.confetti-0 { animation: confetti-burst-0 0.6s ease-out forwards; }
	.confetti-1 { animation: confetti-burst-1 0.65s ease-out forwards; }
	.confetti-2 { animation: confetti-burst-2 0.6s ease-out forwards; }
	.confetti-3 { animation: confetti-burst-3 0.68s ease-out forwards; }
	.confetti-4 { animation: confetti-burst-4 0.62s ease-out forwards; }
	.confetti-5 { animation: confetti-burst-5 0.64s ease-out forwards; }
	.confetti-6 { animation: confetti-burst-6 0.61s ease-out forwards; }
	.confetti-7 { animation: confetti-burst-7 0.67s ease-out forwards; }
	.confetti-8 { animation: confetti-burst-8 0.63s ease-out forwards; }
	.confetti-9 { animation: confetti-burst-9 0.66s ease-out forwards; }
	.confetti-10 { animation: confetti-burst-10 0.62s ease-out forwards; }
	.confetti-11 { animation: confetti-burst-11 0.65s ease-out forwards; }

	@keyframes confetti-burst-0 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(120px, -160px) scale(0.2) rotate(720deg); }
	}
	@keyframes confetti-burst-1 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-140px, -180px) scale(0.15) rotate(-680deg); }
	}
	@keyframes confetti-burst-2 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(180px, -80px) scale(0.18) rotate(650deg); }
	}
	@keyframes confetti-burst-3 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-160px, 120px) scale(0.16) rotate(-720deg); }
	}
	@keyframes confetti-burst-4 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(150px, 100px) scale(0.19) rotate(700deg); }
	}
	@keyframes confetti-burst-5 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-120px, -140px) scale(0.17) rotate(-650deg); }
	}
	@keyframes confetti-burst-6 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(140px, 140px) scale(0.2) rotate(680deg); }
	}
	@keyframes confetti-burst-7 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-180px, 80px) scale(0.15) rotate(-700deg); }
	}
	@keyframes confetti-burst-8 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(160px, -120px) scale(0.18) rotate(720deg); }
	}
	@keyframes confetti-burst-9 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-140px, 140px) scale(0.16) rotate(-680deg); }
	}
	@keyframes confetti-burst-10 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(100px, 160px) scale(0.17) rotate(650deg); }
	}
	@keyframes confetti-burst-11 {
		0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
		100% { opacity: 0; transform: translate(-160px, -100px) scale(0.19) rotate(-720deg); }
	}

	.header__tagline::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% + 2rem);
		height: calc(100% + 0.75rem);
		background: rgba(0, 0, 0, 0.4);
		filter: blur(12px);
		z-index: -1;
		pointer-events: none;
	}

	:global([data-theme='light']) .header__content::before {
		width: min(96ch, 94%);
		height: 82%;
		background: radial-gradient(
			ellipse at center,
			rgb(255, 255, 255) 100%,
			rgba(247, 253, 251, 0.92) 90%,
			rgba(228, 247, 243, 0.58) 8%,
			rgba(210, 240, 234, 0.22) 9%,
			rgba(255, 255, 255, 0) 10%
		);
		filter: blur(100px);
	}

	:global([data-theme='light']) .header__tagline::before {
		width: calc(100% + 4.25rem);
		height: calc(100% + 1.5rem);
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.98) 100%,
			rgba(240, 252, 248, 0.78) 5%,
			rgba(223, 247, 241, 0.32) 8%,
			rgba(255, 255, 255, 0) 100%
		);
		filter: blur(100px);
	}

	.header__description {
		position: relative;
		margin: 1rem 0 0;
		color: var(--text);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
	}

	.header__cta {
		position: relative;
		margin: 0.65rem 0 0;
		color: rgba(243, 246, 255, 0.82);
		font-size: clamp(0.9rem, 1.7vw, 1rem);
		font-weight: 400;
		max-width: 70ch;
		line-height: 1.6;
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
	}

	.header__meta {
		position: relative;
		margin: 1.25rem 0 0;
		font-size: clamp(0.95rem, 1.8vw, 1.1rem);
		text-shadow: 0 0 4px #000, 0 2px 12px #000, 0 0 50px #000;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.header__actions {
		position: relative;
		margin-top: 1.15rem;
		display: flex;
		justify-content: center;
	}

	.hero-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.9rem;
		border: 1px solid rgba(54, 242, 194, 0.38);
		background: color-mix(in srgb, var(--panel) 80%, transparent);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.88rem;
		line-height: 1.2;
		text-decoration: none;
		letter-spacing: 0.01em;
		text-transform: lowercase;
		transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease,
			transform 0.16s ease;
	}

	.hero-action:hover,
	.hero-action:focus-visible {
		border-color: rgba(54, 242, 194, 0.6);
		color: var(--accent);
		background: color-mix(in srgb, var(--panel) 66%, transparent);
		transform: translateY(-1px);
	}

	:global([data-theme='light']) .hero-action {
		border-color: color-mix(in srgb, var(--accent) 38%, var(--border));
		background: color-mix(in srgb, var(--panel) 94%, white 6%);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.7) inset;
	}

	:global([data-theme='light']) .hero-action:hover,
	:global([data-theme='light']) .hero-action:focus-visible {
		border-color: color-mix(in srgb, var(--accent) 58%, var(--border));
		background: color-mix(in srgb, var(--panel) 88%, white 12%);
	}

	.link {
		color: rgba(54, 242, 194, 0.94);
		text-decoration: none;
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
		transition: border-color 0.14s ease, color 0.14s ease;
		font-family: var(--font-mono);
	}

	.link:hover {
		color: var(--accent);
		border-color: rgba(54, 242, 194, 0.55);
	}

	.meta-sep {
		color: rgba(243, 246, 255, 0.45);
		font-family: var(--font-mono);
	}

	@media (max-width: 520px) {
		.meta-sep {
			display: none;
		}

		.hero-action {
			width: min(100%, 18rem);
		}
	}

	@media (max-width: 700px) {
		.header {
			min-height: 240px;
		}

		.header__content {
			padding: clamp(1.25rem, 6vw, 2rem) clamp(1rem, 4.5vw, 1.5rem);
			min-height: 240px;
		}

		.header__tagline {
			font-size: clamp(1.2rem, 6vw, 1.55rem);
			line-height: 1.34;
			max-width: 33ch;
			padding-bottom: 0.7rem;
		}

		.header__description,
		.header__cta {
			font-size: 0.9rem;
			line-height: 1.5;
		}

		.header__meta {
			margin-top: 1rem;
			font-size: 0.9rem;
			gap: 0.5rem 0.65rem;
		}
	}

	@media (max-width: 420px) {
		.header__tagline {
			font-size: clamp(1.05rem, 7vw, 1.3rem);
			max-width: 29ch;
		}

		.tag-char {
			padding: 0.07em 0.04em 0.12em;
			margin: -0.07em -0.04em -0.12em;
		}
	}

	.link__mono {
		color: var(--text);
	}

	.email-copy-btn {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		border-bottom: 1px solid rgba(54, 242, 194, 0.3);
	}

	.email-copy-btn:focus-visible {
		outline: 2px solid rgba(54, 242, 194, 0.6);
		outline-offset: 4px;
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
		white-space: normal;
		overflow-wrap: anywhere;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		animation: toast-in 0.2s ease-out;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translate(-50%) translateY(1rem); }
		to   { opacity: 1; transform: translate(-50%) translateY(0); }
	}

</style>
