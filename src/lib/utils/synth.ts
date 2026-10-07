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
	violin: (freq: number) => tone(freq, { type: 'sawtooth', dur: 0.55, vol: 0.18, attack: 0.06, vibrato: 1 }),
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
