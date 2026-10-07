/**
 * Confetti-ish burst at a screen point, drawn with the Web Animations API on short-lived spans so it
 * needs no global CSS and cleans up after itself. Skipped entirely under reduced motion.
 */
const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--hot)', 'var(--warm)', 'var(--cool)'];

export function burstAt(
	x: number,
	y: number,
	opts: { count?: number; spread?: number; glyphs?: string[]; colors?: string[] } = {}
) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const { count = 14, spread = 90, glyphs, colors = COLORS } = opts;
	for (let i = 0; i < count; i++) {
		const el = document.createElement('span');
		const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
		const dist = spread * (0.55 + Math.random() * 0.6);
		const glyph = glyphs?.[i % glyphs.length];
		Object.assign(el.style, {
			position: 'fixed',
			left: `${x}px`,
			top: `${y}px`,
			zIndex: '9000',
			pointerEvents: 'none',
			width: glyph ? 'auto' : '0.45rem',
			height: glyph ? 'auto' : '0.45rem',
			fontSize: glyph ? '1.1rem' : '',
			background: glyph ? 'none' : colors[i % colors.length],
			borderRadius: i % 2 ? '50%' : '0'
		});
		if (glyph) el.textContent = glyph;
		document.body.appendChild(el);
		const anim = el.animate(
			[
				{ transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
				{
					transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist + 30}px)) rotate(${Math.random() * 360}deg) scale(0.6)`,
					opacity: 0
				}
			],
			{ duration: 700 + Math.random() * 300, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }
		);
		anim.onfinish = () => el.remove();
	}
}

/** Centre of an element, for bursts that come out of a button pressed by keyboard. */
export function centerOf(el: Element): [number, number] {
	const r = el.getBoundingClientRect();
	return [r.left + r.width / 2, r.top + r.height / 2];
}
