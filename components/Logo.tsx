export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="currentColor" />
      <g fill="none" stroke="var(--bg, #0e0e0e)" strokeOpacity="0.35" strokeWidth="0.6">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="8" />
      </g>
      <circle cx="16" cy="16" r="5" fill="var(--accent)" />
      <circle cx="16" cy="16" r="1.1" fill="var(--bg, #0e0e0e)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-7 transition-transform duration-700 ease-out-soft group-hover:rotate-180" />
      <span className="font-display text-[1.35rem] leading-none tracking-tight">
        ReSpin <span className="italic text-muted">Studios</span>
      </span>
    </span>
  );
}
