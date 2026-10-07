/**
 * The site-wide sound on/off switch, as reactive state so every toggle (header, menu, footer) shows
 * the same value. The persisted preference itself lives in `soundManager` (key `sound-enabled`),
 * which both the mp3 sounds and the `synth` module consult before making any noise.
 */
import { soundManager } from './sound';

export const soundPref = $state({ enabled: true, ready: false });

/** Read once in the browser; the server renders "on", which is the default. */
export function loadSoundPref() {
	if (soundPref.ready || typeof window === 'undefined') return;
	soundPref.ready = true;
	soundPref.enabled = soundManager.isEnabled();
}

export function setSoundOn(on: boolean) {
	soundManager.setEnabled(on);
	soundPref.enabled = on;
}

export function toggleSound(): boolean {
	loadSoundPref();
	setSoundOn(!soundPref.enabled);
	return soundPref.enabled;
}
