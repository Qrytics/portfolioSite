/**
 * Tiny Web Audio synth for the playground toys: notes, drums and blips generated on the fly, so the
 * toys add no audio files to download.
 *
 * The `AudioContext` is created lazily on the first sound — which is always inside a click or key
 * handler — so nothing audio-related exists at page load, and browsers' autoplay rules are met.
 * Every call checks the same preference as `playSound` (`soundManager`), so the site-wide mute
 * silences these too. Like every sound on this site, only ever call these from genuine user input.
 */
import { soundManager } from './sound';

let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let room: GainNode | null = null;
let scope: AnalyserNode | null = null;

function audio(): { c: AudioContext; o: GainNode } | null {
	if (typeof window === 'undefined' || !soundManager.isEnabled()) return null;
	if (!ctx) {
		const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
		out = ctx.createGain();
		out.gain.value = 0.32;
		out.connect(ctx.destination);
	}
	if (ctx.state === 'suspended') void ctx.resume();
	return { c: ctx, o: out! };
}

function noise(c: AudioContext): AudioBuffer {
	if (!noiseBuf) {
		noiseBuf = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate);
		const d = noiseBuf.getChannelData(0);
		for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
	}
	return noiseBuf;
}

interface ToneOpts {
	type?: OscillatorType;
	dur?: number;
	vol?: number;
	attack?: number;
	slideTo?: number;
	vibrato?: number;
	delay?: number;
}

export function tone(freq: number, o: ToneOpts = {}) {
	const a = audio();
	if (!a) return;
	const { type = 'sine', dur = 0.16, vol = 0.5, attack = 0.005, slideTo, vibrato = 0, delay = 0 } = o;
	const t = a.c.currentTime + delay;
	const osc = a.c.createOscillator();
	const g = a.c.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, t);
	if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
	if (vibrato) {
		const lfo = a.c.createOscillator();
		const depth = a.c.createGain();
		lfo.frequency.value = 5.5;
		depth.gain.value = freq * 0.012 * vibrato;
		lfo.connect(depth).connect(osc.frequency);
		lfo.start(t);
		lfo.stop(t + dur + 0.05);
	}
	g.gain.setValueAtTime(0.0001, t);
	g.gain.exponentialRampToValueAtTime(vol, t + attack);
	g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
	osc.connect(g).connect(a.o);
	osc.start(t);
	osc.stop(t + dur + 0.05);
}

function burst(o: { dur: number; vol: number; type: BiquadFilterType; freq: number; delay?: number }) {
	const a = audio();
	if (!a) return;
	const t = a.c.currentTime + (o.delay ?? 0);
	const src = a.c.createBufferSource();
	src.buffer = noise(a.c);
	const f = a.c.createBiquadFilter();
	f.type = o.type;
	f.frequency.value = o.freq;
	const g = a.c.createGain();
	g.gain.setValueAtTime(o.vol, t);
	g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
	src.connect(f).connect(g).connect(a.o);
	src.start(t);
	src.stop(t + o.dur + 0.02);
}

/**
 * A shared hall: a convolver fed with a synthetic impulse response (decaying stereo noise), so the
 * violin rings in a room instead of a box. Built once, on the first note that asks for it.
 */
function reverb(c: AudioContext, o: GainNode): GainNode {
	if (room) return room;
	const len = Math.floor(c.sampleRate * 2.2);
	const ir = c.createBuffer(2, len, c.sampleRate);
	for (let ch = 0; ch < 2; ch++) {
		const d = ir.getChannelData(ch);
		for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
	}
	const conv = c.createConvolver();
	conv.buffer = ir;
	const tone = c.createBiquadFilter();
	tone.type = 'lowpass';
	tone.frequency.value = 5200;
	room = c.createGain();
	room.gain.value = 0.32;
	room.connect(conv).connect(tone).connect(o);
	return room;
}

/** The master bus's analyser, for drawing what is playing. Null until the first sound. */
export function analyser(): AnalyserNode | null {
	if (!ctx || !out) return null;
	if (!scope) {
		scope = ctx.createAnalyser();
		scope.fftSize = 2048;
		out.connect(scope);
	}
	return scope;
}

export interface Voice {
	/** Slide to a new pitch without re-bowing — a legato shift. */
	glide(freq: number): void;
	release(): void;
}

/**
 * A bowed violin, sustained until `release()`. Two slightly detuned sawtooths (the bowed string's
 * stick-slip waveform) through a violin body — resonances near 280 Hz and 450 Hz, the 2.5–3 kHz
 * "bridge hill", a dip in the nasal band — plus bow hiss and a scratch at the start of the stroke.
 * Vibrato fades in after the note speaks, the way a player's does; the bow pressure wavers a little.
 */
export function violin(freq: number, vol = 0.5): Voice | null {
	const a = audio();
	if (!a) return null;
	const { c, o } = a;
	const t = c.currentTime;
	const nodes: AudioScheduledSourceNode[] = [];

	const hp = c.createBiquadFilter();
	hp.type = 'highpass';
	hp.frequency.value = 170;
	const body = [
		{ type: 'peaking', f: 280, q: 1.4, g: 5 },
		{ type: 'peaking', f: 460, q: 1.6, g: 3 },
		{ type: 'peaking', f: 1150, q: 1.2, g: -5 },
		{ type: 'peaking', f: 2700, q: 1.1, g: 6 },
		{ type: 'lowpass', f: 7000, q: 0.6, g: 0 }
	].map((b) => {
		const f = c.createBiquadFilter();
		f.type = b.type as BiquadFilterType;
		f.frequency.value = b.f;
		f.Q.value = b.q;
		f.gain.value = b.g;
		return f;
	});
	body.reduce<AudioNode>((prev, f) => prev.connect(f), hp);
	const tail = body[body.length - 1];

	const amp = c.createGain();
	amp.gain.setValueAtTime(0, t);
	amp.gain.setTargetAtTime(vol * 0.85, t, 0.045);
	amp.gain.setTargetAtTime(vol, t + 0.2, 0.3);
	tail.connect(amp);
	amp.connect(o);
	amp.connect(reverb(c, o));

	const strings = [0, 6].map((cents) => {
		const s = c.createOscillator();
		s.type = 'sawtooth';
		s.frequency.setValueAtTime(freq, t);
		s.detune.value = cents;
		const g = c.createGain();
		g.gain.value = 0.5;
		s.connect(g).connect(hp);
		s.start(t);
		nodes.push(s);
		return s;
	});

	const lfo = c.createOscillator();
	lfo.frequency.value = 5.7;
	const depth = c.createGain();
	depth.gain.setValueAtTime(0, t);
	depth.gain.setTargetAtTime(freq * 0.0065, t + 0.22, 0.18);
	lfo.connect(depth);
	for (const s of strings) depth.connect(s.frequency);
	lfo.start(t);
	nodes.push(lfo);

	const waver = c.createOscillator();
	waver.frequency.value = 0.9 + Math.random() * 0.6;
	const waverDepth = c.createGain();
	waverDepth.gain.value = vol * 0.06;
	waver.connect(waverDepth).connect(amp.gain);
	waver.start(t);
	nodes.push(waver);

	const hiss = c.createBufferSource();
	hiss.buffer = noise(c);
	hiss.loop = true;
	const hissF = c.createBiquadFilter();
	hissF.type = 'bandpass';
	hissF.frequency.value = Math.min(freq * 6, 6000);
	hissF.Q.value = 0.8;
	const hissG = c.createGain();
	hissG.gain.setValueAtTime(vol * 0.35, t);
	hissG.gain.setTargetAtTime(vol * 0.05, t + 0.03, 0.05);
	hiss.connect(hissF).connect(hissG).connect(amp);
	hiss.start(t);
	nodes.push(hiss);

	let done = false;
	return {
		glide(next) {
			if (done) return;
			const now = c.currentTime;
			for (const s of strings) s.frequency.setTargetAtTime(next, now, 0.03);
			depth.gain.setTargetAtTime(next * 0.0065, now, 0.1);
			hissF.frequency.setTargetAtTime(Math.min(next * 6, 6000), now, 0.03);
		},
		release() {
			if (done) return;
			done = true;
			const now = c.currentTime;
			amp.gain.cancelScheduledValues(now);
			amp.gain.setValueAtTime(amp.gain.value, now);
			amp.gain.setTargetAtTime(0, now, 0.09);
			waverDepth.gain.setTargetAtTime(0, now, 0.03);
			for (const n of nodes) n.stop(now + 0.7);
		}
	};
}

/** C major pentatonic, two octaves — any sequence of these sounds fine. */
export const PENTATONIC = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];

export const sfx = {
	click: () => tone(1800, { type: 'square', dur: 0.03, vol: 0.12 }),
	toggle: (on: boolean) => tone(on ? 880 : 520, { type: 'square', dur: 0.05, vol: 0.12, slideTo: on ? 1320 : 340 }),
	blip: (up = true) => tone(up ? 660 : 440, { type: 'triangle', dur: 0.12, vol: 0.35, slideTo: up ? 990 : 300 }),
	pop: () => tone(420, { type: 'sine', dur: 0.09, vol: 0.45, slideTo: 1100 }),
	kick: () => tone(150, { type: 'sine', dur: 0.32, vol: 0.9, slideTo: 42 }),
	snare: () => {
		burst({ dur: 0.16, vol: 0.5, type: 'highpass', freq: 1400 });
		tone(210, { type: 'triangle', dur: 0.08, vol: 0.3 });
	},
	hat: () => burst({ dur: 0.05, vol: 0.32, type: 'highpass', freq: 7000 }),
	clap: () => {
		for (let i = 0; i < 3; i++) burst({ dur: 0.05, vol: 0.38, type: 'bandpass', freq: 1500, delay: i * 0.012 });
	},
	tom: () => tone(220, { type: 'sine', dur: 0.24, vol: 0.7, slideTo: 110 }),
	violin: (freq: number) => {
		const v = violin(freq);
		setTimeout(() => v?.release(), 420);
	},
	quack: () => {
		const a = audio();
		if (!a) return;
		const t = a.c.currentTime;
		const f = a.c.createBiquadFilter();
		f.type = 'bandpass';
		f.Q.value = 3.5;
		f.frequency.setValueAtTime(1300, t);
		f.frequency.exponentialRampToValueAtTime(800, t + 0.18);
		const g = a.c.createGain();
		g.gain.setValueAtTime(0.0001, t);
		g.gain.exponentialRampToValueAtTime(0.9, t + 0.015);
		g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
		f.connect(g).connect(a.o);
		for (const d of [0, 7]) {
			const o = a.c.createOscillator();
			o.type = 'sawtooth';
			o.detune.value = d;
			o.frequency.setValueAtTime(520, t);
			o.frequency.exponentialRampToValueAtTime(330, t + 0.18);
			o.connect(f);
			o.start(t);
			o.stop(t + 0.22);
		}
	},
	splash: (size = 1) => {
		const s = Math.min(1, Math.max(0.2, size));
		burst({ dur: 0.12 + 0.25 * s, vol: 0.35 * s, type: 'lowpass', freq: 1800 });
		burst({ dur: 0.08 + 0.12 * s, vol: 0.2 * s, type: 'bandpass', freq: 3200, delay: 0.02 });
		tone(700, { type: 'sine', dur: 0.09, vol: 0.12 * s, slideTo: 1500, delay: 0.05 });
	},
	squeak: () => tone(1250, { type: 'square', dur: 0.12, vol: 0.12, slideTo: 1900 }),
	boing: () => tone(180, { type: 'sine', dur: 0.25, vol: 0.4, slideTo: 520 }),
	coin: () => {
		tone(988, { type: 'square', dur: 0.08, vol: 0.14 });
		tone(1319, { type: 'square', dur: 0.3, vol: 0.14, delay: 0.08 });
	},
	buzz: () => tone(110, { type: 'sawtooth', dur: 0.35, vol: 0.22 }),
	whoosh: () => burst({ dur: 0.18, vol: 0.22, type: 'bandpass', freq: 900 }),
	arpeggio: (freqs: number[], step = 0.07, type: OscillatorType = 'triangle') =>
		freqs.forEach((f, i) => tone(f, { type, dur: 0.18, vol: 0.3, delay: i * step }))
};
