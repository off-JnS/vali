import Image from "next/image";
import Link from "next/link";
import { categoryLabel, type Product } from "@/data/products";
import { formatPrice, inquiryHref } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  /** "katalog": mit Anfragen-Button, "teaser": ganze Karte verlinkt in den Katalog */
  variant?: "katalog" | "teaser";
  priority?: boolean;
};

export function ProductCard({ product, variant = "katalog", priority = false }: ProductCardProps) {
  const image = (
    <div className="target-ring relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-paper-2 transition-shadow duration-500">
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.04]"
      />
      <div className="groove-hover pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink backdrop-blur">
        {categoryLabel(product.category)}
      </span>
    </div>
  );

  if (variant === "teaser") {
    return (
      <article className="group">
        <Link href={`/produkte/#${product.slug}`} className="block rounded-[1.25rem]">
          {image}
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="text-xl leading-tight md:text-2xl">{product.name}</h3>
            <p className="shrink-0 text-sm tabular-nums text-muted">{formatPrice(product.price)}</p>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{product.description}</p>
        </Link>
      </article>
    );
  }

  return (
    <article id={product.slug} className="group flex scroll-mt-28 flex-col">
      {image}
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl leading-tight">{product.name}</h3>
          <p className="shrink-0 tabular-nums">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          <span className="text-xs text-muted">Einzelstück · Handarbeit</span>
          <a
            href={inquiryHref(product)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/25 px-5 text-sm font-medium transition-colors duration-500 ease-out-soft hover:border-accent hover:bg-accent hover:text-ink"
            aria-label={`${product.name} anfragen – öffnet dein E-Mail-Programm`}
          >
            Anfragen
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
