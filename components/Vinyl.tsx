import { useId } from "react";

type VinylProps = {
  className?: string;
  labelColor?: string;
  labelText?: string;
};

// Rillen mit kleinen „Track-Pausen“, damit die Platte echt aussieht
const grooves = Array.from({ length: 52 }, (_, i) => 70 + i * 2.35);
const trackGaps = new Set([9, 21, 30, 42]);

/** Schallplatte als SVG. Dreht sich nicht selbst – das macht der Aufrufer. */
export function Vinyl({
  className,
  labelColor = "var(--accent)",
  labelText = "ReSpin Studios · Seite A · 33⅓ ·",
}: VinylProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`disc-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="60%" stopColor="#0f0f0f" />
          <stop offset="97%" stopColor="#151515" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <path id={`label-path-${id}`} d="M200,200 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>

      <circle cx="200" cy="200" r="198" fill={`url(#disc-${id})`} />
      <g fill="none">
        {grooves.map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke={trackGaps.has(i) ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.055)"}
            strokeWidth={trackGaps.has(i) ? 1.6 : 0.8}
          />
        ))}
        <circle cx="200" cy="200" r="196" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </g>

      {/* Etikett */}
      <circle cx="200" cy="200" r="62" fill={labelColor} />
      <circle cx="200" cy="200" r="62" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <circle cx="200" cy="200" r="34" fill="none" stroke="rgba(14,14,14,0.35)" strokeWidth="0.75" />
      <text
        fill="#0e0e0e"
        fontSize="9.5"
        letterSpacing="2.2"
        style={{ fontFamily: "var(--font-inter)", textTransform: "uppercase", fontWeight: 600 }}
      >
        <textPath href={`#label-path-${id}`}>{labelText}</textPath>
      </text>
      <circle cx="200" cy="200" r="4.5" fill="#0e0e0e" />

    </svg>
  );
}

/** Feststehender Lichtreflex über der Platte (Kegelverlauf). */
export function VinylSheen({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        borderRadius: "9999px",
        background:
          "conic-gradient(from 200deg, transparent 0deg, rgba(255,255,255,0.10) 18deg, transparent 50deg, transparent 180deg, rgba(255,255,255,0.07) 198deg, transparent 230deg)",
        WebkitMaskImage: "radial-gradient(closest-side, transparent 31%, black 32%, black 98%, transparent 100%)",
        maskImage: "radial-gradient(closest-side, transparent 31%, black 32%, black 98%, transparent 100%)",
      }}
    />
  );
}
