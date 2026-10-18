type Tone = "dark" | "light";

const color = { dark: "#0e0e0e", light: "#f2ede4" };

/**
 * Weicher Farbverlauf zwischen einem dunklen und einem hellen Bereich.
 * Beim Scrollen wirkt das wie ein langsames Aufhellen bzw. Abdunkeln.
 * Mehrere Stopps in OKLab, damit die Mitte nicht schlammig grau wird.
 */
export function ToneSeam({ from, to, className = "h-40 md:h-64" }: { from: Tone; to: Tone; className?: string }) {
  const a = color[from];
  const b = color[to];
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: `linear-gradient(in oklab to bottom, ${a} 0%, color-mix(in oklab, ${a} 88%, ${b}) 20%, color-mix(in oklab, ${a} 60%, ${b}) 42%, color-mix(in oklab, ${a} 28%, ${b}) 66%, color-mix(in oklab, ${a} 8%, ${b}) 86%, ${b} 100%)`,
      }}
    />
  );
}
