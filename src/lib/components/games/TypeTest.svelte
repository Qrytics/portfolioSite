<script lang="ts">
	import { getRandomSnippet, type Snippet } from '$lib/data/typetest-snippets';
	import { tick } from 'svelte';
	import { playSound, soundManager } from '$lib/utils/sound';
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
	let inputRef = $state<HTMLTextAreaElement | undefined>(undefined);
	let scores = $state<Score[]>([]);
	let soundOn = $state(true);
	/** `date` of the score just saved, so the leaderboard can mark it. */
	let latestScoreDate = $state<string | null>(null);

	let startBtn = $state<HTMLButtonElement | undefined>(undefined);
	let countdownEl = $state<HTMLDivElement | undefined>(undefined);
	let resultsHeading = $state<HTMLHeadingElement | undefined>(undefined);

	let countdownTimer: ReturnType<typeof setInterval> | null = null;
	let focusTimer: ReturnType<typeof setTimeout> | null = null;

	function clearTimers() {
		if (countdownTimer !== null) {
			clearInterval(countdownTimer);
			countdownTimer = null;
		}
		if (focusTimer !== null) {
			clearTimeout(focusTimer);
			focusTimer = null;
		}
	}

	const isComplete = $derived(snippet && userInput.length === snippet.text.length);
	const correctChars = $derived.by(() => {
		if (!snippet) return 0;
		let correct = 0;
		for (let i = 0; i < userInput.length; i++) {
			if (userInput[i] === snippet.text[i]) correct++;
		}
		return correct;
	});

	/**
	 * Net WPM: correct characters only (5 chars = 1 word). This used to divide the *snippet* length,
	 * so a run full of uncorrected typos scored exactly the same as a clean one.
	 */
	const wpm = $derived.by(() => {
		if (!startTime || !endTime || !snippet) return 0;
		const minutes = (endTime - startTime) / 60000;
		if (minutes <= 0) return 0;
		return Math.round(correctChars / 5 / minutes);
	});

	const accuracy = $derived.by(() => {
		if (!userInput.length) return 100;
		return Math.round((correctChars / userInput.length) * 100);
	});

	const leaderboard = $derived([...scores].sort((a, b) => b.wpm - a.wpm).slice(0, 10));

	function readScores(): Score[] {
		const stored = getLocalItem('typetest-scores');
		if (!stored) return [];
		try {
			const parsed: unknown = JSON.parse(stored);
			return Array.isArray(parsed) ? (parsed as Score[]) : [];
		} catch {
			return [];
		}
	}

	/**
	 * `localStorage` is not reactive, so the old `$derived.by(() => getLocalItem(...))` computed
	 * once and never again — a fresh score only showed up after a full page reload. Read it into
	 * `$state` on mount instead; `saveScore` then writes to both the store and this array.
	 */
	$effect(() => {
		scores = readScores();
		soundOn = soundManager.isEnabled();
	});

	function toggleSound() {
		soundOn = soundManager.toggle();
	}

	/**
	 * Each state swap removes the control that had focus (Start, the input, Try Again), which dropped
	 * keyboard and screen-reader users back to `<body>`. Move focus to whatever now leads the panel.
	 */
	async function focusFor(state: GameState) {
		await tick();
		if (state === 'idle') startBtn?.focus();
		else if (state === 'countdown') countdownEl?.focus();
		else if (state === 'finished') resultsHeading?.focus();
	}

	$effect(() => {
		if (isComplete && gameState === 'playing') {
			endTime = Date.now();
			gameState = 'finished';
			playSound('typing-complete');
			saveScore();
			void focusFor('finished');
		}
	});

	// Timers outlive the component otherwise: leaving the page mid-countdown left an interval
	// ticking against a destroyed component, and the focus timeout fired into nothing.
	$effect(() => {
		return clearTimers;
	});

	function startGame() {
		// Clear first: two live intervals both decrement `countdown`, so it steps straight past 0
		// and the exit guard never matches again — the old code could leave one running forever.
		clearTimers();

		snippet = getRandomSnippet(difficulty);
		userInput = '';
		mistakes = [];
		startTime = null;
		endTime = null;
		gameState = 'countdown';
		countdown = 3;
		void focusFor('countdown');

		countdownTimer = setInterval(() => {
			countdown--;
			playSound('ui-click', 0.6);

			// `<= 0`, not `=== 0`: an overshoot must still terminate the interval.
			if (countdown <= 0) {
				clearTimers();
				gameState = 'playing';
				playSound('game-start');
				focusTimer = setTimeout(() => inputRef?.focus(), 50);
			}
		}, 1000);
	}

	/**
	 * Tab is deliberately *not* swallowed any more. No snippet contains a tab character, so trapping it
	 * bought nothing and left keyboard users stuck in the input until they finished the test. Escape
	 * is the explicit way out.
	 */
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape' && (gameState === 'playing' || gameState === 'countdown')) {
			e.preventDefault();
			reset();
		}
	}

	/** Pasting (or dropping) the snippet in would "win" instantly. */
	function blockPaste(e: Event) {
		e.preventDefault();
	}

	function handleInput(e: Event) {
		if (gameState !== 'playing' || !snippet) return;

		const target = e.target as HTMLTextAreaElement;
		const newValue = target.value;

		// The clock starts on the first character actually typed. It used to start on keydown, so
		// pressing Shift (or any modifier) to think about the first capital letter cost time.
		if (!startTime && newValue.length > 0) {
			startTime = Date.now();
		}

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

		// Re-read rather than trusting the in-memory copy, so a score set in another tab survives.
		const next = [...readScores(), newScore].sort((a, b) => b.wpm - a.wpm).slice(0, 50);

		setLocalItem('typetest-scores', JSON.stringify(next));
		scores = next;
		latestScoreDate = newScore.date;
	}

	function clearScores() {
		if (!window.confirm('Clear your local type test leaderboard?')) return;
		setLocalItem('typetest-scores', '[]');
		scores = [];
		latestScoreDate = null;
	}

	function reset() {
		clearTimers();
		gameState = 'idle';
		snippet = null;
		userInput = '';
		mistakes = [];
		startTime = null;
		endTime = null;
		void focusFor('idle');
	}
</script>

<div class="typetest">
	<div class="typetest__header">
		<h1 class="typetest__title">Type Speed Test</h1>
		<p class="typetest__subtitle">Test your typing speed with code snippets</p>
		<button
			type="button"
			class="sound-toggle"
			aria-pressed={!soundOn}
			onclick={toggleSound}
			title={soundOn ? 'Mute typing sounds' : 'Unmute typing sounds'}
		>
			<span aria-hidden="true">{soundOn ? '♪' : '♪̸'}</span> mute
		</button>
	</div>

	{#if gameState === 'idle'}
		<div class="typetest__start">
			<!-- A `<label>` with no control is invisible to assistive tech. These are three mutually
			     exclusive toggles, so the group gets the accessible name and each button reports its
			     own pressed state. -->
			<div class="difficulty-selector" role="group" aria-labelledby="difficulty-label">
				<span class="difficulty-label" id="difficulty-label">Difficulty:</span>
				<div class="difficulty-buttons">
					{#each ['easy', 'medium', 'hard'] as const as level (level)}
						<button
							type="button"
							class="difficulty-btn"
							class:difficulty-btn--active={difficulty === level}
							aria-pressed={difficulty === level}
							onclick={() => (difficulty = level)}
						>
							{level[0].toUpperCase() + level.slice(1)}
						</button>
					{/each}
				</div>
			</div>
			<button bind:this={startBtn} type="button" class="btn btn--primary btn--large" onclick={startGame}>
				Start Test
			</button>
		</div>
	{/if}

	{#if gameState === 'countdown'}
		<div class="typetest__countdown" bind:this={countdownEl} tabindex="-1" aria-live="assertive">
			<div class="countdown-number">{countdown}</div>
			<div class="countdown-text">Get Ready... <span class="hint">(Esc to cancel)</span></div>
		</div>
	{/if}

	{#if gameState === 'playing' && snippet}
		<div class="typetest__game">
			<!-- Per-character spans are read one letter at a time by a screen reader, so they are hidden
			     and the snippet is exposed once as plain text instead. -->
			<p class="sr-only" id="typetest-snippet-text">Type this: {snippet.text}</p>
			<div class="typetest__snippet" aria-hidden="true">
				{#each snippet.text as char, i (i)}
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

			<!-- A textarea, not `<input type="text">`: several snippets span lines, and a text input
			     strips line breaks from its value, so the newline in those snippets could never be typed
			     and every multi-line run finished with forced mistakes. -->
			<textarea
				bind:this={inputRef}
				rows="3"
				bind:value={userInput}
				onkeydown={handleKeyDown}
				oninput={handleInput}
				onpaste={blockPaste}
				ondrop={blockPaste}
				aria-label="Type the snippet"
				aria-describedby="typetest-snippet-text"
				class="typetest__input"
				autocomplete="off"
				{...{ autocorrect: 'off' } /* Safari-only; not in Svelte's textarea typings */}
				autocapitalize="off"
				spellcheck="false"
				maxlength={snippet.text.length}
			></textarea>

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
			<div class="typetest__quit">
				<button type="button" class="btn btn--ghost" onclick={reset}>quit <span class="hint">(Esc)</span></button>
			</div>
		</div>
	{/if}

	{#if gameState === 'finished' && snippet}
		<div class="typetest__results" aria-live="polite">
			<h2 class="results__title" bind:this={resultsHeading} tabindex="-1">Test Complete!</h2>
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
				<div class="result-stat">
					<span class="result-stat__value">{mistakes.length}</span>
					<span class="result-stat__label">{mistakes.length === 1 ? 'Mistake' : 'Mistakes'}</span>
				</div>
			</div>
			<div class="results__actions">
				<button type="button" class="btn btn--primary" onclick={startGame}>Try Again</button>
				<button type="button" class="btn btn--ghost" onclick={reset}>Change Difficulty</button>
			</div>
		</div>
	{/if}

	{#if leaderboard.length > 0}
		<div class="typetest__leaderboard">
			<div class="leaderboard__head">
				<h2 class="leaderboard__title">Leaderboard (Top 10)</h2>
				<button type="button" class="leaderboard__clear" onclick={clearScores}>clear</button>
			</div>
			<div class="leaderboard__list">
				{#each leaderboard as score, i (score.date + score.wpm)}
					<div class="leaderboard__item" class:leaderboard__item--new={score.date === latestScoreDate}>
						<span class="leaderboard__rank">#{i + 1}</span>
						<span class="leaderboard__wpm">{score.wpm} WPM</span>
						<span class="leaderboard__accuracy">{score.accuracy}%</span>
						<span class="leaderboard__difficulty" data-difficulty={score.difficulty}>
							{score.difficulty}
						</span>
						{#if score.date === latestScoreDate}<span class="sr-only">(your latest run)</span>{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.typetest {
		/* Local palette, overridden for light mode below. The dark values are the originals. */
		--tt-wrong: #ff5555;
		--tt-easy: #2ed573;
		--tt-medium: #ffb142;
		--tt-hard: #ff3860;
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
		background: color-mix(in srgb, var(--text) 3%, transparent);
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
		background: color-mix(in srgb, var(--text) 3%, transparent);
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
		background: color-mix(in srgb, var(--text) 3%, transparent);
		color: var(--text);
	}

	.btn--ghost:hover {
		background: color-mix(in srgb, var(--text) 6%, transparent);
		border-color: color-mix(in srgb, var(--text) 20%, transparent);
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
		color: var(--tt-wrong);
		background: color-mix(in srgb, var(--tt-wrong) 12%, transparent);
		text-decoration: underline wavy;
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
		display: block;
		box-sizing: border-box;
		resize: none;
		white-space: pre;
		overflow-x: auto;
		width: 100%;
		padding: 1rem;
		border: 1px solid var(--border);
		background: var(--panel-2);
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
		background: color-mix(in srgb, var(--text) 2%, transparent);
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
		background: color-mix(in srgb, var(--text) 2%, transparent);
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
		background: color-mix(in srgb, var(--text) 2%, transparent);
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
		--diff: var(--muted);
		padding: 0.2rem 0.5rem;
		border: 1px solid color-mix(in srgb, var(--diff) 30%, transparent);
		color: var(--diff);
		background: color-mix(in srgb, var(--diff) 6%, transparent);
		font-size: 0.7rem;
		text-transform: uppercase;
	}

	.leaderboard__item--new {
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
	}

	.leaderboard__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.leaderboard__clear {
		border: 0;
		background: none;
		color: var(--muter);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		cursor: pointer;
		padding: 0.5rem 0;
	}

	.leaderboard__clear:hover {
		color: var(--accent-text);
	}

	.typetest__quit {
		display: flex;
		justify-content: flex-end;
	}

	.hint {
		color: var(--muter);
		font-size: 0.8em;
	}

	.sound-toggle {
		margin-top: 0.75rem;
		border: 1px solid var(--border-2);
		background: transparent;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		padding: 0.35rem 0.7rem;
		cursor: pointer;
	}

	.sound-toggle[aria-pressed='true'] {
		color: var(--accent-text);
		border-color: color-mix(in srgb, var(--accent) 40%, transparent);
	}

	.typetest__countdown:focus,
	.results__title:focus {
		outline: none;
	}

	.leaderboard__difficulty[data-difficulty='easy'] {
		--diff: var(--tt-easy);
	}

	.leaderboard__difficulty[data-difficulty='medium'] {
		--diff: var(--tt-medium);
	}

	.leaderboard__difficulty[data-difficulty='hard'] {
		--diff: var(--tt-hard);
	}

	@media (max-width: 640px) {
		.typetest__snippet {
			font-size: 0.95rem;
			padding: 1.25rem;
		}

		.typetest {
			padding: 1.25rem 1rem 2rem;
		}

		.typetest__header {
			margin-bottom: 1.25rem;
		}

		.typetest__title {
			font-size: 1.5rem;
		}

		.typetest__start {
			align-items: stretch;
			gap: 1.5rem;
			padding: 1.5rem 1rem;
		}

		/* Three equal segments in one row, not a narrow column of three stacked buttons. */
		.difficulty-selector {
			align-items: stretch;
			gap: 0.75rem;
		}

		.difficulty-label {
			text-align: center;
		}

		.difficulty-buttons {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 0.4rem;
		}

		.difficulty-btn {
			min-height: 2.75rem;
			padding-inline: 0.5rem;
		}

		.btn--large {
			min-height: 3rem;
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

	/* Darker variants so wrong characters and difficulty pills keep ≥4.5:1 on the light panel. */
	:global([data-theme='light']) .typetest {
		--tt-wrong: #b91c1c;
		--tt-easy: #15803d;
		--tt-medium: #b45309;
		--tt-hard: #be123c;
	}

	:global([data-theme='light']) .typetest__title,
	:global([data-theme='light']) .stat__value,
	:global([data-theme='light']) .result-stat__value,
	:global([data-theme='light']) .leaderboard__wpm,
	:global([data-theme='light']) .leaderboard__title,
	:global([data-theme='light']) .results__title,
	:global([data-theme='light']) .typetest .btn--primary,
	:global([data-theme='light']) .difficulty-btn--active {
		color: var(--accent-text);
	}

	:global([data-theme='light']) .typetest__input {
		background: var(--bg);
	}
</style>
