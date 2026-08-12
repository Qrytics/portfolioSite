/**
 * Generates CC0 sound effect files for static/sounds/.
 * Creates short WAV files with distinct tones for each sound ID.
 * Run once: node scripts/generate-sounds.mjs
 *
 * All output is pure synthesis — no copyright, CC0 by generation.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'static', 'sounds');

const SAMPLE_RATE = 22050;

/** Write a 16-bit PCM WAV file */
function writeWav(filePath, samples) {
	const numSamples = samples.length;
	const numChannels = 1;
	const bitsPerSample = 16;
	const byteRate = (SAMPLE_RATE * numChannels * bitsPerSample) / 8;
	const blockAlign = (numChannels * bitsPerSample) / 8;
	const dataSize = numSamples * blockAlign;
	const buf = Buffer.alloc(44 + dataSize);

	buf.write('RIFF', 0);
	buf.writeUInt32LE(36 + dataSize, 4);
	buf.write('WAVE', 8);
	buf.write('fmt ', 12);
	buf.writeUInt32LE(16, 16);       // PCM chunk size
	buf.writeUInt16LE(1, 20);        // PCM format
	buf.writeUInt16LE(numChannels, 22);
	buf.writeUInt32LE(SAMPLE_RATE, 24);
	buf.writeUInt32LE(byteRate, 28);
	buf.writeUInt16LE(blockAlign, 32);
	buf.writeUInt16LE(bitsPerSample, 34);
	buf.write('data', 36);
	buf.writeUInt32LE(dataSize, 40);

	for (let i = 0; i < numSamples; i++) {
		const clamped = Math.max(-1, Math.min(1, samples[i]));
		buf.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
	}

	fs.writeFileSync(filePath, buf);
	const kb = ((44 + dataSize) / 1024).toFixed(1);
	console.log(`  wrote ${path.basename(filePath)} (${kb} KB)`);
}

/** Sine wave with linear attack/release envelope */
function sine(freq, durationMs, amplitude = 0.6, attackMs = 5, releaseMs = 20) {
	const n = Math.floor((SAMPLE_RATE * durationMs) / 1000);
	const attackSamples = Math.floor((SAMPLE_RATE * attackMs) / 1000);
	const releaseSamples = Math.floor((SAMPLE_RATE * releaseMs) / 1000);
	const samples = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		let env = amplitude;
		if (i < attackSamples) env *= i / attackSamples;
		else if (i > n - releaseSamples) env *= (n - i) / releaseSamples;
		samples[i] = env * Math.sin((2 * Math.PI * freq * i) / SAMPLE_RATE);
	}
	return samples;
}

/** Two sine tones mixed */
function chord(f1, f2, durationMs, amplitude = 0.4) {
	const n = Math.floor((SAMPLE_RATE * durationMs) / 1000);
	const releaseSamples = Math.floor((SAMPLE_RATE * 40) / 1000);
	const samples = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		let env = 1;
		if (i > n - releaseSamples) env = (n - i) / releaseSamples;
		samples[i] =
			amplitude * env * Math.sin((2 * Math.PI * f1 * i) / SAMPLE_RATE) +
			amplitude * env * Math.sin((2 * Math.PI * f2 * i) / SAMPLE_RATE);
	}
	return samples;
}

/** Exponentially decaying sine (pluck/click feel) */
function pluck(freq, durationMs, amplitude = 0.7, decay = 18) {
	const n = Math.floor((SAMPLE_RATE * durationMs) / 1000);
	const samples = new Float32Array(n);
	for (let i = 0; i < n; i++) {
		const t = i / SAMPLE_RATE;
		samples[i] = amplitude * Math.exp(-decay * t) * Math.sin(2 * Math.PI * freq * t);
	}
	return samples;
}

/** Rising tone sweep */
function sweep(freqStart, freqEnd, durationMs, amplitude = 0.5) {
	const n = Math.floor((SAMPLE_RATE * durationMs) / 1000);
	const releaseSamples = Math.floor((SAMPLE_RATE * 30) / 1000);
	const samples = new Float32Array(n);
	let phase = 0;
	for (let i = 0; i < n; i++) {
		const t = i / n;
		const freq = freqStart + (freqEnd - freqStart) * t;
		let env = amplitude;
		if (i > n - releaseSamples) env *= (n - i) / releaseSamples;
		samples[i] = env * Math.sin(phase);
		phase += (2 * Math.PI * freq) / SAMPLE_RATE;
	}
	return samples;
}

/** Concatenate multiple sample arrays */
function concat(...arrays) {
	const total = arrays.reduce((s, a) => s + a.length, 0);
	const out = new Float32Array(total);
	let offset = 0;
	for (const a of arrays) {
		out.set(a, offset);
		offset += a.length;
	}
	return out;
}

/** Short gap of silence */
function silence(ms) {
	return new Float32Array(Math.floor((SAMPLE_RATE * ms) / 1000));
}

// ── Generate each sound ────────────────────────────────────────────────────────

const sounds = {
	// tick.mp3 — short mechanical click: high-freq pluck, ~30ms
	'tick.mp3': pluck(1800, 30, 0.65, 30),

	// pop.mp3 — soft bubble pop: low pluck with slight pitch drop, ~80ms
	'pop.mp3': pluck(420, 80, 0.55, 14),

	// key.mp3 — mechanical keyboard keypress: two-layer pluck, ~35ms
	'key.mp3': (() => {
		const a = pluck(900, 20, 0.5, 40);
		const b = pluck(450, 35, 0.3, 25);
		const n = Math.max(a.length, b.length);
		const out = new Float32Array(n);
		for (let i = 0; i < n; i++) {
			out[i] = (i < a.length ? a[i] : 0) + (i < b.length ? b[i] : 0);
		}
		return out;
	})(),

	// complete.mp3 — success chime: ascending two-note chord, ~220ms
	'complete.mp3': concat(
		sine(523, 90, 0.45, 4, 30),
		silence(10),
		chord(659, 784, 130, 0.32)
	),

	// start.mp3 — game start: three rising beeps, ~180ms
	'start.mp3': concat(
		sine(440, 45, 0.5, 3, 12),
		silence(12),
		sine(554, 45, 0.5, 3, 12),
		silence(12),
		sine(659, 75, 0.55, 3, 25)
	),

	// gameover.mp3 — game over: descending tone sweep, ~320ms
	'gameover.mp3': concat(
		sweep(440, 220, 200, 0.5),
		silence(20),
		sine(165, 100, 0.45, 5, 40)
	),

	// click.mp3 — UI button click: clean pluck, ~40ms
	'click.mp3': pluck(1100, 40, 0.55, 22),
};

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [name, samples] of Object.entries(sounds)) {
	writeWav(path.join(OUT_DIR, name), samples);
}

console.log('\n✅ All sound files generated in static/sounds/');
console.log('   These are synthesized CC0 audio — no copyright, no attribution needed.');
