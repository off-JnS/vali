// Logo als Maske: Die Form kommt aus dem PNG, die Farbe aus `currentColor`.
// So passt es sich automatisch an dunkle und helle Bereiche an.
// Quelle: assets/ReSpin-Studios-Logo.jpeg
const LOGO_SRC = "/images/logo/respin-studios-logo.png";

/** Die Platte aus dem „p“ des Logos – für kleine Stellen wie Favicon oder Zitat. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <g fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.45">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="10.5" />
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="7.5" />
      </g>
      <circle cx="16" cy="16" r="5.2" fill="currentColor" />
      <circle cx="16" cy="16" r="1.4" fill="var(--bg, #0e0e0e)" />
    </svg>
  );
}

/** Wortmarke „ReSpin Studios“. Höhe per className setzen, Breite folgt dem Seitenverhältnis. */
export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block aspect-[1701/900] bg-current ${className}`}
      style={{
        maskImage: `url(${LOGO_SRC})`,
        WebkitMaskImage: `url(${LOGO_SRC})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
