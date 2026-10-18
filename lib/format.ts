import { site } from "@/data/site";
import type { Product } from "@/data/products";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

/** 45 → "45,00 €" */
export function formatPrice(value: number) {
  return euro.format(value);
}

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** → "18. Oktober 2026" */
export function formatDate(date: Date) {
  return dateFormat.format(date);
}

export function inquiryHref(product: Product) {
  const subject = `Anfrage: ${product.name}`;
  const body = [
    "Hallo ReSpin-Team,",
    "",
    `ich interessiere mich für ${product.name} (${formatPrice(product.price)}).`,
    "Ist das Stück noch verfügbar? Und wie lange dauert der Versand?",
    "",
    "Viele Grüße",
    "",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
