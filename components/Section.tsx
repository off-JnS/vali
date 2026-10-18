type Tone = "dark" | "light";

type SectionProps = {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
};

/** Seitenbereich mit Ton (dunkel/hell). Der Hintergrund blendet beim Scrollen weich um. */
export function Section({ tone, children, className = "", id, labelledBy }: SectionProps) {
  return (
    <section id={id} data-tone={tone} aria-labelledby={labelledBy} className={`relative ${className}`}>
      {children}
    </section>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.26em] text-accent-text ${className}`}>
      <span className="inline-block size-2 rounded-full border border-current" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Trennlinie mit Rillen-Motiv */
export function GrooveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-line ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-current" />
      <svg viewBox="0 0 40 40" className="size-8 text-muted">
        {[18, 14, 10, 6].map((r) => (
          <circle key={r} cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="0.75" opacity={0.25 + (18 - r) / 24} />
        ))}
        <circle cx="20" cy="20" r="2" fill="var(--accent)" />
      </svg>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
