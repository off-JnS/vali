"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { categories, products, type CategoryId } from "@/data/products";
import { ProductCard } from "./ProductCard";

type Filter = CategoryId | "alle";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductCatalog() {
  const [filter, setFilter] = useState<Filter>("alle");
  const visible = filter === "alle" ? products : products.filter((p) => p.category === filter);

  // Sprung von der Startseite (#slug): Filter zurücksetzen, damit die Karte sichtbar ist
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash) setFilter("alle");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <div
        role="group"
        aria-label="Nach Kategorie filtern"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c) => {
          const active = filter === c.id;
          const count = c.id === "alle" ? products.length : products.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c.id)}
              className={`relative flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm transition-colors duration-500 ease-out-soft ${
                active ? "border-ink text-paper" : "border-line text-fg hover:border-current"
              }`}
            >
              {active && (
                <m.span
                  layoutId="chip-bg"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.5, ease }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{c.label}</span>
              <span className={`relative text-xs tabular-nums ${active ? "text-paper/60" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "Stück" : "Stücke"} angezeigt
      </p>

      <m.ul layout className="mt-10 grid gap-x-6 gap-y-16 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product, i) => (
            <m.li
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            >
              <ProductCard product={product} priority={i < 2} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </>
  );
}
