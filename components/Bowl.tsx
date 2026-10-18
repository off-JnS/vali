import { useId } from "react";

// Außenwand der Schale: zwei kubische Bézierkurven, links und rechts gespiegelt.
// Der Rand liegt bei y = 75 – genau dort, wo die gekippte Platte (rotateX 68°)
// ihre breiteste Stelle hat (cos 68° · 200 ≈ 75).
const RIM_Y = 75;
const P0 = [2, RIM_Y];
const P1 = [8, 196];
const P2 = [96, 262];
const P3 = [200, 262];

function bezier(t: number, a: number, b: number, c: number, d: number) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

const rings = Array.from({ length: 16 }, (_, i) => {
  const t = 0.06 + i * 0.058;
  const x = bezier(t, P0[0], P1[0], P2[0], P3[0]);
  const y = bezier(t, P0[1], P1[1], P2[1], P3[1]);
  const rx = 200 - x;
  return { x, y, rx, ry: rx * 0.375, gap: i % 5 === 4 };
});

const bodyPath = `M${P0} C${P1} ${P2} ${P3} C${400 - P2[0]},${P2[1]} ${400 - P1[0]},${P1[1]} ${400 - P0[0]},${P0[1]} Z`;

/** Außenwand einer Vinyl-Schale. Die Öffnung liefert die gekippte <Vinyl/>-Platte darüber. */
export function BowlBody({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 270" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`wall-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#1d1d1d" />
          <stop offset="22%" stopColor="#101010" />
          <stop offset="62%" stopColor="#0b0b0b" />
          <stop offset="88%" stopColor="#1a1816" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <path d={bodyPath} />
        </clipPath>
      </defs>
      <path d={bodyPath} fill={`url(#wall-${id})`} />
      <g clipPath={`url(#clip-${id})`} fill="none">
        {rings.map((r) => (
          <path
            key={r.y}
            d={`M${r.x},${r.y} A${r.rx},${r.ry} 0 0 0 ${400 - r.x},${r.y}`}
            stroke={r.gap ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.06)"}
            strokeWidth={r.gap ? 1.4 : 0.8}
          />
        ))}
      </g>
    </svg>
  );
}
