<script lang="ts">
	import { getRandomSnippet, type Snippet } from '$lib/data/typetest-snippets';
	import { playSound } from '$lib/utils/sound';
	import { getLocalItem, setLocalItem } from '$lib/utils/safeStorage';

	type Difficulty = 'easy' | 'medium' | 'hard';
	type GameState = 'idle' | 'countdown' | 'playing' | 'finished';

	interface Score {
		wpm: number;
		accuracy: number;
		duration: number;
		snippet: string;
		difficulty: Difficulty;
		date: string;
	}

	let gameState = $state<GameState>('idle');
	let difficulty = $state<Difficulty>('medium');
	let snippet = $state<Snippet | null>(null);
	let userInput = $state('');
	let startTime = $state<number | null>(null);
	let endTime = $state<number | null>(null);
	let mistakes = $state<number[]>([]);
	let countdown = $state(3);
	let inputRef = $state<HTMLInputElement | undefined>(undefined);

	const isComplete = $derived(snippet && userInput.length === snippet.text.length);
	const correctChars = $derived.by(() => {
		if (!snippet) return 0;
		let correct = 0;
		for (let i = 0; i < userInput.length; i++) {
			if (userInput[i] === snippet.text[i]) correct++;
		}
		return correct;
	});

	const wpm = $derived.by(() => {
		if (!startTime || !endTime || !snippet) return 0;
		const seconds = (endTime - startTime) / 1000;
		const words = snippet.text.length / 5; // Standard: 5 chars = 1 word
		const minutes = seconds / 60;
		return Math.round(words / minutes);
	});

	const accuracy = $derived.by(() => {
		if (!userInput.length) return 100;
		return Math.round((correctChars / userInput.length) * 100);
	});

	const leaderboard = $derived.by(() => {
		const stored = getLocalItem('typetest-scores');
		if (!stored) return [];
		try {
			const scores: Score[] = JSON.parse(stored);
			return scores.sort((a, b) => b.wpm - a.wpm).slice(0, 10);
		} catch {
			return [];
		}
	});

	$effect(() => {
		if (isComplete && gameState === 'playing') {
			endTime = Date.now();
			gameState = 'finished';
			playSound('typing-complete');
			saveScore();
		}
	});

	function startGame() {
		snippet = getRandomSnippet(difficulty);
		userInput = '';
		mistakes = [];
		startTime = null;
		endTime = null;
		gameState = 'countdown';
		countdown = 3;

		const countdownInterval = setInterval(() => {
			countdown--;
			playSound('ui-click', 0.6);

			if (countdown === 0) {
				clearInterval(countdownInterval);
				gameState = 'playing';
				playSound('game-start');
				setTimeout(() => inputRef?.focus(), 50);
			}
		}, 1000);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (gameState !== 'playing') return;

		// Start timer on first keypress
		if (!startTime) {
			startTime = Date.now();
		}

		// Ignore special keys except Enter, Tab, Space
		if (e.key.length > 1 && !['Enter', 'Tab', ' '].includes(e.key)) {
			return;
		}

		// Prevent default for Tab and Enter
		if (e.key === 'Tab') {
			e.preventDefault();
		}
	}

	function handleInput(e: Event) {
		if (gameState !== 'playing' || !snippet) return;

		const target = e.target as HTMLInputElement;
		const newValue = target.value;

		// Check if the new character is correct
		const newCharIndex = newValue.length - 1;
		if (newCharIndex >= 0 && newCharIndex < snippet.text.length) {
			if (newValue[newCharIndex] === snippet.text[newCharIndex]) {
				playSound('typing-key', 0.4);
			} else {
				if (!mistakes.includes(newCharIndex)) {
					mistakes = [...mistakes, newCharIndex];
				}
			}
		}

		userInput = newValue;
	}

	function saveScore() {
		if (!snippet || wpm === 0) return;

		const newScore: Score = {
			wpm,
			accuracy,
			duration: endTime && startTime ? (endTime - startTime) / 1000 : 0,
			snippet: snippet.text.substring(0, 30) + '...',
			difficulty,
			date: new Date().toISOString()
		};

		const stored = getLocalItem('typetest-scores');
		let scores: Score[] = [];
		if (stored) {
			try {
				scores = JSON.parse(stored);
			} catch {}
		}

		scores.push(newScore);
		scores.sort((a, b) => b.wpm - a.wpm);
		scores = scores.slice(0, 50); // Keep top 50

		setLocalItem('typetest-scores', JSON.stringify(scores));
	}

	function reset() {
		gameState = 'idle';
		snippet = null;
		userInput = '';
		mistakes = [];
		startTime = null;
		endTime = null;
	}
</script>

<div class="typetest">
	<div class="typetest__header">
		<h2 class="typetest__title">Type Speed Test</h2>
		<p class="typetest__subtitle">Test your typing speed with code snippets</p>
	</div>

	{#if gameState === 'idle'}
		<div class="typetest__start">
			<div class="difficulty-selector">
				<label class="difficulty-label">Difficulty:</label>
				<div class="difficulty-buttons">
					<button
						class="difficulty-btn"
						class:difficulty-btn--active={difficulty === 'easy'}
						onclick={() => (difficulty = 'easy')}
					>
						Easy
					</button>
					<button
						class="difficulty-btn"
						class:difficulty-btn--active={difficulty === 'medium'}
						onclick={() => (difficulty = 'medium')}
					>
						Medium
					</button>
					<button
						class="difficulty-btn"
						class:difficulty-btn--active={difficulty === 'hard'}
						onclick={() => (difficulty = 'hard')}
					>
						Hard
					</button>
				</div>
			</div>
			<button class="btn btn--primary btn--large" onclick={startGame}>Start Test</button>
		</div>
	{/if}

	{#if gameState === 'countdown'}
		<div class="typetest__countdown">
			<div class="countdown-number">{countdown}</div>
			<div class="countdown-text">Get Ready...</div>
		</div>
	{/if}

	{#if gameState === 'playing' && snippet}
		<div class="typetest__game">
			<div class="typetest__snippet">
				{#each snippet.text as char, i}
					<span
						class="char"
						class:char--correct={i < userInput.length && userInput[i] === char}
						class:char--incorrect={i < userInput.length && userInput[i] !== char}
						class:char--current={i === userInput.length}
					>
						{char === '\n' ? '↵\n' : char === ' ' ? '·' : char}
					</span>
				{/each}
			</div>

			<input
				bind:this={inputRef}
				type="text"
				bind:value={userInput}
				onkeydown={handleKeyDown}
				oninput={handleInput}
				class="typetest__input"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				maxlength={snippet.text.length}
			/>

			<div class="typetest__stats">
				<div class="stat">
					<span class="stat__value">{Math.round((userInput.length / snippet.text.length) * 100)}%</span>
					<span class="stat__label">Progress</span>
				</div>
				<div class="stat">
					<span class="stat__value">{accuracy}%</span>
					<span class="stat__label">Accuracy</span>
				</div>
			</div>
		</div>
	{/if}

	{#if gameState === 'finished' && snippet}
		<div class="typetest__results">
			<h3 class="results__title">Test Complete!</h3>
			<div class="results__stats">
				<div class="result-stat result-stat--primary">
					<span class="result-stat__value">{wpm}</span>
					<span class="result-stat__label">WPM</span>
				</div>
				<div class="result-stat">
					<span class="result-stat__value">{accuracy}%</span>
					<span class="result-stat__label">Accuracy</span>
				</div>
				<div class="result-stat">
					<span class="result-stat__value">{endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : 0}s</span>
					<span class="result-stat__label">Time</span>
				</div>
			</div>
			<div class="results__actions">
				<button class="btn btn--primary" onclick={startGame}>Try Again</button>
				<button class="btn btn--ghost" onclick={reset}>Change Difficulty</button>
			</div>
		</div>
	{/if}

	{#if leaderboard.length > 0}
		<div class="typetest__leaderboard">
			<h3 class="leaderboard__title">Leaderboard (Top 10)</h3>
			<div class="leaderboard__list">
				{#each leaderboard as score, i}
					<div class="leaderboard__item">
						<span class="leaderboard__rank">#{i + 1}</span>
						<span class="leaderboard__wpm">{score.wpm} WPM</span>
						<span class="leaderboard__accuracy">{score.accuracy}%</span>
						<span class="leaderboard__difficulty" data-difficulty={score.difficulty}>
							{score.difficulty}
						</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.typetest {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.typetest__header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.typetest__title {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: 1.8rem;
		color: var(--accent);
		letter-spacing: 0.02em;
	}

	.typetest__subtitle {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--muted);
	}

	.typetest__start {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 3rem 1rem;
		border: 1px solid var(--border);
		background: var(--panel);
	}

	.difficulty-selector {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.difficulty-label {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.difficulty-buttons {
		display: flex;
		gap: 0.75rem;
	}

	.difficulty-btn {
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.difficulty-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.difficulty-btn--active {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
		color: var(--accent);
	}

	.btn {
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn--primary {
		border-color: color-mix(in srgb, var(--accent) 32%, transparent);
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		color: color-mix(in srgb, var(--accent) 95%, transparent);
	}

	.btn--primary:hover {
		background: color-mix(in srgb, var(--accent) 15%, transparent);
		border-color: color-mix(in srgb, var(--accent) 50%, transparent);
		transform: translateY(-1px);
	}

	.btn--ghost {
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
	}

	.btn--ghost:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.btn--large {
		padding: 1rem 2rem;
		font-size: 1rem;
	}

	.typetest__countdown {
		text-align: center;
		padding: 4rem 1rem;
	}

	.countdown-number {
		font-family: var(--font-mono);
		font-size: 6rem;
		font-weight: 700;
		color: var(--accent);
		text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 50%, transparent);
		animation: pulse 1s ease-in-out;
	}

	.countdown-text {
		margin-top: 1rem;
		font-family: var(--font-mono);
		font-size: 1.2rem;
		color: var(--muted);
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.1); opacity: 0.8; }
	}

	.typetest__game {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.typetest__snippet {
		padding: 2rem;
		border: 1px solid var(--border);
		background: var(--panel);
		font-family: var(--font-mono);
		font-size: 1.1rem;
		line-height: 1.8;
		white-space: pre-wrap;
		word-break: break-word;
		min-height: 200px;
	}

	.char {
		position: relative;
		color: var(--muted);
	}

	.char--correct {
		color: var(--text);
	}

	.char--incorrect {
		color: #ff5555;
		background: rgba(255, 85, 85, 0.1);
	}

	.char--current {
		background: color-mix(in srgb, var(--accent) 20%, transparent);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 50% { background: color-mix(in srgb, var(--accent) 20%, transparent); }
		51%, 100% { background: transparent; }
	}

	.typetest__input {
		width: 100%;
		padding: 1rem;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.3);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 1rem;
	}

	.typetest__input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.typetest__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
	}

	.stat {
		padding: 1rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.02);
		text-align: center;
	}

	.stat__value {
		display: block;
		font-family: var(--font-mono);
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--accent);
		margin-bottom: 0.25rem;
	}

	.stat__label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.typetest__results {
		text-align: center;
		padding: 3rem 1rem;
		border: 1px solid var(--border);
		background: var(--panel);
	}

	.results__title {
		margin: 0 0 2rem;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		color: var(--accent);
	}

	.results__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.result-stat {
		padding: 1.5rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.02);
	}

	.result-stat--primary {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 5%, transparent);
	}

	.result-stat__value {
		display: block;
		font-family: var(--font-mono);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.result-stat__label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.results__actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.typetest__leaderboard {
		margin-top: 3rem;
	}

	.leaderboard__title {
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.leaderboard__list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.leaderboard__item {
		display: grid;
		grid-template-columns: 3rem 1fr auto auto;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border-2);
		background: rgba(255, 255, 255, 0.02);
		align-items: center;
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}

	.leaderboard__rank {
		color: var(--muted);
	}

	.leaderboard__wpm {
		color: var(--accent);
		font-weight: 600;
	}

	.leaderboard__accuracy {
		color: var(--muted);
	}

	.leaderboard__difficulty {
		padding: 0.2rem 0.5rem;
		border: 1px solid var(--border-2);
		font-size: 0.7rem;
		text-transform: uppercase;
	}

	.leaderboard__difficulty[data-difficulty='easy'] {
		border-color: rgba(46, 213, 115, 0.3);
		color: rgba(46, 213, 115, 0.9);
		background: rgba(46, 213, 115, 0.05);
	}

	.leaderboard__difficulty[data-difficulty='medium'] {
		border-color: rgba(255, 177, 66, 0.3);
		color: rgba(255, 177, 66, 0.9);
		background: rgba(255, 177, 66, 0.05);
	}

	.leaderboard__difficulty[data-difficulty='hard'] {
		border-color: rgba(255, 56, 96, 0.3);
		color: rgba(255, 56, 96, 0.9);
		background: rgba(255, 56, 96, 0.05);
	}

	@media (max-width: 640px) {
		.typetest__snippet {
			font-size: 0.95rem;
			padding: 1.25rem;
		}

		.difficulty-buttons {
			flex-direction: column;
			width: 100%;
		}

		.difficulty-btn {
			width: 100%;
		}

		.results__stats {
			grid-template-columns: 1fr;
		}

		.leaderboard__item {
			grid-template-columns: 2.5rem 1fr auto;
			font-size: 0.8rem;
		}

		.leaderboard__accuracy {
			display: none;
		}
	}
</style>
