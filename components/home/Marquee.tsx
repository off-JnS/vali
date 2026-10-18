const words = ["Gesammelt", "Geformt", "Geliebt", "Seite B", "Zweite Runde"];

/** Laufband in Display-Schrift – reine Dekoration, deshalb aria-hidden. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div data-tone="light" className="overflow-hidden border-y border-line py-6 md:py-8" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className={`font-display px-6 text-[clamp(2rem,6vw,4.5rem)] font-light leading-none md:px-10 ${i % 2 ? "italic text-muted" : ""}`}>
                  {w}
                </span>
                <svg viewBox="0 0 20 20" className="size-5 shrink-0 md:size-7">
                  <circle cx="10" cy="10" r="9" fill="var(--ink)" />
                  <circle cx="10" cy="10" r="6" fill="none" stroke="var(--paper)" strokeOpacity="0.2" strokeWidth="0.6" />
                  <circle cx="10" cy="10" r="3" fill="var(--accent)" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
