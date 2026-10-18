import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  ariaLabel?: string;
};

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 text-sm font-medium transition-colors duration-500 ease-out-soft";

const variants = {
  // Schwarze Schrift auf Orange: Kontrast ≈ 4,8:1
  primary: "bg-accent text-ink hover:bg-paper",
  outline: "border border-current/30 text-fg hover:border-current",
};

/** Link-Button. Externe/Mail-Links werden als <a> gerendert. */
export function Button({ href, children, variant = "primary", className = "", ariaLabel }: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-out-soft group-hover/btn:translate-x-1"
      >
        →
      </span>
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
