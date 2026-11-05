/**
 * Spin physics for the hero head: a slow idle turn, drag to spin it by hand, and momentum on release.
 *
 * Pure and dependency-free so it can be tested without a browser. The hero owns the pointer events
 * and the animation frame; this owns the angle and its velocity.
 *
 * `angle` is in radians and is kept wrapped to [0, 2π). Positive turns one way, negative the other.
 */

export type SpinOptions = {
	/** Resting turn speed in radians per second (the "default speed"). */
	idleSpeed: number;
	/** Fraction of the excess speed (over idle) lost per second after release. */
	friction: number;
	/** Fastest the head may spin after a flick, in radians per second. */
	maxSpeed: number;
	/** How much of a drag's pixel distance becomes rotation, in radians per pixel. */
	radiansPerPixel: number;
};

export const DEFAULT_SPIN: SpinOptions = {
	idleSpeed: 0.45,
	friction: 1.6,
	maxSpeed: 14,
	radiansPerPixel: 0.011
};

const TAU = Math.PI * 2;
const wrap = (a: number) => ((a % TAU) + TAU) % TAU;

export function createSpin(options: Partial<SpinOptions> = {}) {
	const o = { ...DEFAULT_SPIN, ...options };

	let angle = 0;
	let velocity = o.idleSpeed;
	let dragging = false;
	let lastX = 0;
	let lastT = 0;
	// Smoothed pointer velocity while dragging, in radians per second.
	let dragVelocity = 0;

	const clamp = (v: number) => Math.max(-o.maxSpeed, Math.min(o.maxSpeed, v));

	return {
		get angle() {
			return angle;
		},
		get velocity() {
			return velocity;
		},
		get dragging() {
			return dragging;
		},

		/** Pointer went down on the head. Anything already spinning is caught. */
		grab(x: number, t: number) {
			dragging = true;
			lastX = x;
			lastT = t;
			dragVelocity = 0;
			velocity = 0;
		},

		/** Pointer moved while held. `t` is in seconds. */
		drag(x: number, t: number) {
			if (!dragging) return;
			const d = (x - lastX) * o.radiansPerPixel;
			angle = wrap(angle + d);
			const dt = t - lastT;
			if (dt > 0) {
				// Low-pass the instantaneous speed so one jittery event doesn't set the throw.
				const inst = d / dt;
				dragVelocity += (inst - dragVelocity) * 0.35;
			}
			lastX = x;
			lastT = t;
		},

		/** Pointer let go. The head keeps the speed it was being dragged at. */
		release(t: number) {
			if (!dragging) return;
			dragging = false;
			// A pause before letting go means no throw: stale drag speed is dropped.
			const idleFor = t - lastT;
			const throwSpeed = idleFor > 0.08 ? 0 : dragVelocity;
			velocity = clamp(throwSpeed);
			// Stopped dead? Resume turning the way it was last moving, if it had a direction.
			if (Math.abs(velocity) < 0.05) velocity = o.idleSpeed;
		},

		/** Advance by `dt` seconds. Returns the new angle. */
		step(dt: number) {
			if (dragging) return angle;
			// Ease the speed toward idle (in whichever direction it is currently going), so a flick
			// decays smoothly back to the slow default turn instead of stopping.
			const dir = velocity < 0 ? -1 : 1;
			const target = dir * o.idleSpeed;
			velocity += (target - velocity) * Math.min(1, o.friction * dt);
			angle = wrap(angle + velocity * dt);
			return angle;
		}
	};
}

/**
 * Pick the frame for an angle from a set recorded at evenly spaced angles around the circle.
 * `count` is the number of frames in one full turn; frame 0 is the angle the recording started at.
 */
export function frameIndexForAngle(angle: number, count: number): number {
	return Math.round((wrap(angle) / TAU) * count) % count;
}
