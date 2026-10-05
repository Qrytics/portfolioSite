/**
 * Sound Manager - Centralized audio handling for portfolio site
 *
 * Features:
 * - Preloaded audio files
 * - Volume control (default 30%)
 * - localStorage preference persistence
 * - Graceful autoplay failure handling
 * - Type-safe sound IDs
 */

import { getLocalItem, setLocalItem } from './safeStorage';

export type SoundId =
	// Not wired to anything. It must never be played from the timeline's scroll reveal (an
	// IntersectionObserver): sounds only ever answer a genuine user interaction, and there is no
	// site-wide mute.
	| 'timeline-tick'
	| 'confetti-pop' // GitHub chart explosion
	| 'typing-key' // Typing test keypress
	| 'typing-complete' // Typing test finish
	| 'game-start' // Mini-game start
	| 'game-over' // Mini-game end
	| 'ui-click'; // Optional: major UI interactions

class SoundManager {
	private sounds = new Map<SoundId, HTMLAudioElement>();
	private enabled = true;
	private initialized = false;
	private preferenceRestored = false;

	constructor() {
		// Delay initialization until first play attempt to avoid autoplay policy issues
	}

	private initialize() {
		if (this.initialized) return;
		if (typeof window === 'undefined') return;

		this.initialized = true;
		this.loadSounds();
		this.restorePreference();
	}

	private loadSounds() {
		const soundFiles: Record<SoundId, string> = {
			'timeline-tick': '/sounds/tick.mp3',
			'confetti-pop': '/sounds/pop.mp3',
			'typing-key': '/sounds/key.mp3',
			'typing-complete': '/sounds/complete.mp3',
			'game-start': '/sounds/start.mp3',
			'game-over': '/sounds/gameover.mp3',
			'ui-click': '/sounds/click.mp3'
		};

		for (const [id, src] of Object.entries(soundFiles)) {
			const audio = new Audio(src);
			audio.volume = 0.3;
			audio.preload = 'auto';
			this.sounds.set(id as SoundId, audio);
		}
	}

	/**
	 * Separate from `initialize` so reading or toggling the preference doesn't also create and
	 * preload every `Audio` element. `toggle` used to skip this entirely: toggling before the first
	 * `play()` flipped the default `true` and ignored a saved `'false'`, so "mute" un-muted.
	 */
	private restorePreference() {
		if (this.preferenceRestored) return;
		if (typeof window === 'undefined') return;
		this.preferenceRestored = true;
		const savedPref = getLocalItem('sound-enabled');
		if (savedPref !== null) {
			this.enabled = savedPref !== 'false';
		}
	}

	/**
	 * Play a sound effect
	 * @param id - Sound identifier
	 * @param volume - Volume multiplier (0-1), applied on top of base 30% volume
	 */
	play(id: SoundId, volume = 1.0) {
		if (!this.initialized) {
			this.initialize();
		}

		if (!this.enabled) return;

		const sound = this.sounds.get(id);
		if (!sound) {
			if (import.meta.env.DEV) {
				console.warn(`Sound "${id}" not found`);
			}
			return;
		}

		try {
			sound.currentTime = 0;
			sound.volume = Math.min(0.3 * volume, 1.0);
			sound.play().catch((err) => {
				// Autoplay policy errors are expected on first interaction
				if (import.meta.env.DEV) {
					console.debug(`Sound autoplay blocked for "${id}":`, err);
				}
			});
		} catch (err) {
			if (import.meta.env.DEV) {
				console.warn(`Failed to play sound "${id}":`, err);
			}
		}
	}

	/**
	 * Toggle sound on/off
	 * @returns New enabled state
	 */
	toggle(): boolean {
		this.restorePreference();
		this.enabled = !this.enabled;
		setLocalItem('sound-enabled', String(this.enabled));
		return this.enabled;
	}

	/**
	 * Check if sound is currently enabled
	 */
	isEnabled(): boolean {
		this.restorePreference();
		return this.enabled;
	}

	/**
	 * Set enabled state directly
	 */
	setEnabled(enabled: boolean) {
		this.preferenceRestored = true;
		this.enabled = enabled;
		setLocalItem('sound-enabled', String(enabled));
	}
}

// Singleton instance
export const soundManager = new SoundManager();

// Convenience function for direct play calls
export const playSound = (id: SoundId, volume?: number) => soundManager.play(id, volume);
