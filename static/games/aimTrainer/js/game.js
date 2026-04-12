/* jshint esversion: 6 */
'use strict';

// =============================================
//  Config
// =============================================
const TARGET_SIZES = {
  small:  44,
  medium: 64,
  large:  90,
};

const TARGET_COLORS = [
  '#e74c3c',
  '#e8403f',
  '#c0392b',
  '#ff5252',
];

const COUNTDOWN_INTERVAL_MS   = 700;
const MAX_POSITION_ATTEMPTS   = 60;
const TARGET_REMOVAL_DELAY_MS = 120;
const MISS_FLASH_DURATION_MS  = 150;
const BONUS_REACTION_CUTOFF   = 1000; // reactions under this ms earn a score bonus

// =============================================
//  State
// =============================================
let settings = {
  duration:    30,
  targetCount: 1,
  targetSize:  'medium',
};

let state = {
  hits:         0,
  misses:       0,
  score:        0,
  reactions:    [],
  lastSpawnTime: null,
  timeLeft:     0,
  running:      false,
  timerId:      null,
  targets:      [],   // DOM nodes currently in arena
};

// =============================================
//  DOM refs
// =============================================
const screens     = document.querySelectorAll('.screen');
const startScreen = document.getElementById('start-screen');
const gameScreen  = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');

const arena       = document.getElementById('arena');
const missFlash   = document.getElementById('miss-flash');
const countdownOverlay = document.getElementById('countdown-overlay');
const countdownNumber  = document.getElementById('countdown-number');

const hudTimer    = document.getElementById('hud-timer');
const hudScore    = document.getElementById('hud-score');
const hudAccuracy = document.getElementById('hud-accuracy');
const hudReaction = document.getElementById('hud-reaction');

const btnStart    = document.getElementById('btn-start');
const btnQuit     = document.getElementById('btn-quit');
const btnRetry    = document.getElementById('btn-retry');
const btnMenu     = document.getElementById('btn-menu');

const resScore    = document.getElementById('res-score');
const resHits     = document.getElementById('res-hits');
const resMisses   = document.getElementById('res-misses');
const resAccuracy = document.getElementById('res-accuracy');
const resReaction = document.getElementById('res-reaction');
const resBest     = document.getElementById('res-best');
const perfFill    = document.getElementById('perf-fill');

// =============================================
//  Screen helpers
// =============================================
function showScreen(el) {
  screens.forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

// =============================================
//  Settings UI
// =============================================
function initSettingsGroup(groupId, key) {
  const group = document.getElementById(groupId);
  group.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const raw = btn.dataset.value;
      settings[key] = isNaN(Number(raw)) ? raw : Number(raw);
    });
  });
}

initSettingsGroup('duration-group',  'duration');
initSettingsGroup('count-group',     'targetCount');
initSettingsGroup('size-group',      'targetSize');

// =============================================
//  Countdown then start
// =============================================
function runCountdown(callback) {
  let n = 3;
  countdownOverlay.classList.remove('hidden');

  function tick() {
    countdownNumber.textContent = n;
    // Restart animation
    countdownNumber.style.animation = 'none';
    void countdownNumber.offsetWidth; // reflow
    countdownNumber.style.animation = '';

    if (n === 0) {
      countdownOverlay.classList.add('hidden');
      callback();
      return;
    }
    n--;
    setTimeout(tick, COUNTDOWN_INTERVAL_MS);
  }
  tick();
}

// =============================================
//  Game Start
// =============================================
function startGame() {
  // Reset state
  state.hits         = 0;
  state.misses       = 0;
  state.score        = 0;
  state.reactions    = [];
  state.timeLeft     = settings.duration;
  state.running      = false;
  state.targets      = [];
  state.lastSpawnTime = null;

  // Clear arena of leftover targets
  arena.querySelectorAll('.target').forEach(t => t.remove());

  // Reset HUD
  hudTimer.textContent    = settings.duration;
  hudScore.textContent    = '0';
  hudAccuracy.textContent = '–';
  hudReaction.textContent = '–';
  hudTimer.classList.remove('warn');

  showScreen(gameScreen);
  runCountdown(() => {
    state.running = true;
    spawnTargets();
    startTimer();
  });
}

// =============================================
//  Timer
// =============================================
function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    if (!state.running) return;
    state.timeLeft--;
    hudTimer.textContent = state.timeLeft;
    if (state.timeLeft <= 5) hudTimer.classList.add('warn');
    if (state.timeLeft <= 0) endGame();
  }, 1000);
}

// =============================================
//  Target spawning
// =============================================
function safeZone() {
  const arenaRect = arena.getBoundingClientRect();
  const size = TARGET_SIZES[settings.targetSize];
  const margin = size / 2 + 8;
  return {
    minX: margin,
    maxX: arenaRect.width  - margin,
    minY: margin,
    maxY: arenaRect.height - margin,
  };
}

function randomPos(existing) {
  const zone = safeZone();
  const size = TARGET_SIZES[settings.targetSize];
  const minDist = size * 1.5;
  let attempt = 0;

  while (attempt < MAX_POSITION_ATTEMPTS) {
    const x = zone.minX + Math.random() * (zone.maxX - zone.minX);
    const y = zone.minY + Math.random() * (zone.maxY - zone.minY);
    const ok = existing.every(pos => {
      const dx = pos.x - x, dy = pos.y - y;
      return Math.sqrt(dx*dx + dy*dy) >= minDist;
    });
    if (ok) return { x, y };
    attempt++;
  }
  // fallback – just return a random position
  return {
    x: zone.minX + Math.random() * (zone.maxX - zone.minX),
    y: zone.minY + Math.random() * (zone.maxY - zone.minY),
  };
}

function createTarget(pos) {
  const size  = TARGET_SIZES[settings.targetSize];
  const color = TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)];

  const el = document.createElement('div');
  el.className = 'target';
  el.style.cssText = `
    left: ${pos.x}px;
    top: ${pos.y}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle at 35% 35%, ${lighten(color)}, ${color});
  `;
  el.dataset.spawnTime = Date.now();

  el.addEventListener('click', e => {
    e.stopPropagation();
    onTargetHit(el);
  });

  arena.appendChild(el);
  // Trigger spawn animation next frame
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('spawned')));

  return el;
}

function lighten(hex) {
  const r = parseInt(hex.slice(1,3),16),
        g = parseInt(hex.slice(3,5),16),
        b = parseInt(hex.slice(5,7),16);
  const factor = 1.35;
  const rr = Math.min(255, Math.round(r * factor));
  const gg = Math.min(255, Math.round(g * factor));
  const bb = Math.min(255, Math.round(b * factor));
  return `rgb(${rr},${gg},${bb})`;
}

function spawnTargets() {
  if (!state.running) return;

  const existing = state.targets
    .filter(t => t && t.parentNode)
    .map(t => ({
      x: parseFloat(t.style.left),
      y: parseFloat(t.style.top),
    }));

  const needed = settings.targetCount - existing.length;
  for (let i = 0; i < needed; i++) {
    const pos = randomPos([...existing]);
    const el  = createTarget(pos);
    existing.push(pos);
    state.targets.push(el);
  }
}

// =============================================
//  Hit / Miss
// =============================================
function onTargetHit(el) {
  if (!state.running) return;
  if (!el.classList.contains('spawned') || el.classList.contains('hit')) return;

  const reaction = Date.now() - Number(el.dataset.spawnTime);
  state.reactions.push(reaction);
  state.hits++;

  // Score: base 100 points, bonus for fast reactions (under BONUS_REACTION_CUTOFF ms)
  const bonus = Math.max(0, Math.round((BONUS_REACTION_CUTOFF - reaction) / 10));
  state.score += 100 + bonus;

  updateHUD();
  showHitPopup(el, reaction);

  el.classList.add('hit');
  el.classList.remove('spawned');

  // Remove from state and DOM after animation
  setTimeout(() => {
    el.remove();
    state.targets = state.targets.filter(t => t !== el);
    spawnTargets();
  }, TARGET_REMOVAL_DELAY_MS);
}

function onArenaClick(e) {
  if (!state.running) return;
  if (e.target !== arena && e.target !== missFlash) return;
  state.misses++;
  updateHUD();
  flashMiss();
}

function flashMiss() {
  missFlash.classList.add('flash');
  setTimeout(() => missFlash.classList.remove('flash'), MISS_FLASH_DURATION_MS);
}

// =============================================
//  Hit popup
// =============================================
function showHitPopup(el, reactionMs) {
  const popup = document.createElement('div');
  popup.className = 'hit-popup';
  popup.textContent = `${reactionMs}ms`;
  popup.style.left = el.style.left;
  popup.style.top  = `calc(${el.style.top} - 30px)`;
  document.body.appendChild(popup);
  popup.addEventListener('animationend', () => popup.remove());
}

// =============================================
//  HUD update
// =============================================
function updateHUD() {
  hudScore.textContent = state.score;

  const total = state.hits + state.misses;
  if (total > 0) {
    hudAccuracy.textContent = Math.round((state.hits / total) * 100) + '%';
  }
  if (state.reactions.length > 0) {
    const avg = Math.round(state.reactions.reduce((a,b) => a+b, 0) / state.reactions.length);
    hudReaction.textContent = avg + 'ms';
  }
}

// =============================================
//  End Game
// =============================================
function endGame() {
  state.running = false;
  clearInterval(state.timerId);

  // Remove all remaining targets
  state.targets.forEach(t => { if(t) t.remove(); });
  state.targets = [];

  showResults();
}

function showResults() {
  const total    = state.hits + state.misses;
  const accuracy = total > 0 ? Math.round((state.hits / total) * 100) : 0;
  const avgMs    = state.reactions.length > 0
    ? Math.round(state.reactions.reduce((a,b) => a+b, 0) / state.reactions.length)
    : null;
  const bestMs   = state.reactions.length > 0
    ? Math.min(...state.reactions)
    : null;

  resScore.textContent    = state.score;
  resHits.textContent     = state.hits;
  resMisses.textContent   = state.misses;
  resAccuracy.textContent = accuracy + '%';
  resReaction.textContent = avgMs  !== null ? avgMs  + 'ms' : '–';
  resBest.textContent     = bestMs !== null ? bestMs + 'ms' : '–';

  showScreen(resultsScreen);

  // Animate accuracy bar after a short delay
  setTimeout(() => {
    perfFill.style.width = accuracy + '%';
  }, 100);
}

// =============================================
//  Event listeners
// =============================================
btnStart.addEventListener('click', startGame);

arena.addEventListener('click', onArenaClick);

btnQuit.addEventListener('click', () => {
  state.running = false;
  clearInterval(state.timerId);
  state.targets.forEach(t => { if(t) t.remove(); });
  state.targets = [];
  showScreen(startScreen);
});

btnRetry.addEventListener('click', startGame);
btnMenu.addEventListener('click',  () => showScreen(startScreen));

// =============================================
//  Initial state
// =============================================
showScreen(startScreen);
