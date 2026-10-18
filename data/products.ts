// Alle Produkte an einem Ort. Neues Stück? Einfach einen Eintrag ergänzen.
// Bilder liegen unter /public/images/produkte – Platzhalter-SVGs durch echte Fotos
// (gleicher Dateiname oder neuer Pfad in `image`) ersetzen.

export const categories = [
  { id: "alle", label: "Alle" },
  { id: "schalen", label: "Schalen" },
  { id: "schachbretter", label: "Schachbretter" },
  { id: "tische", label: "Tische" },
  { id: "wandkunst", label: "Wandkunst" },
] as const;

export type CategoryId = Exclude<(typeof categories)[number]["id"], "alle">;

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  /** Preis in Euro */
  price: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "schale-blue-note",
    name: "Schale „Blue Note“",
    category: "schalen",
    description: "Tiefe Schale aus einer Jazzplatte, die keiner mehr auflegen wollte.",
    price: 45,
    image: "/images/produkte/schale-blue-note.svg",
    imageAlt: "Tiefe schwarze Schale aus einer Schallplatte mit blauem Etikett am Boden",
    featured: true,
  },
  {
    slug: "schale-nachtfahrt",
    name: "Schale „Nachtfahrt“",
    category: "schalen",
    description: "Flache Obstschale mit sanft gewelltem Rand.",
    price: 39,
    image: "/images/produkte/schale-nachtfahrt.svg",
    imageAlt: "Flache, breite Schale aus Vinyl mit gewelltem Rand",
  },
  {
    slug: "schachbrett-endspiel",
    name: "Schachbrett „Endspiel“",
    category: "schachbretter",
    description: "64 Felder aus Vinyl und hellem Holz. Für lange Abende.",
    price: 189,
    image: "/images/produkte/schachbrett-endspiel.svg",
    imageAlt: "Quadratisches Schachbrett mit schwarzen Feldern aus Schallplatten-Vinyl und hellen Holzfeldern",
    featured: true,
  },
  {
    slug: "schachbrett-rillenzug",
    name: "Schachbrett „Rillenzug“",
    category: "schachbretter",
    description: "Rundes Reisebrett aus einer einzigen Platte.",
    price: 129,
    image: "/images/produkte/schachbrett-rillenzug.svg",
    imageAlt: "Rundes Schachbrett, aus einer einzelnen Schallplatte geschnitten",
  },
  {
    slug: "beistelltisch-plattenteller",
    name: "Beistelltisch „Plattenteller“",
    category: "tische",
    description: "Runde Tischplatte aus Vinyl auf drei schlanken Stahlbeinen.",
    price: 249,
    image: "/images/produkte/beistelltisch-plattenteller.svg",
    imageAlt: "Kleiner runder Beistelltisch mit Schallplatte als Tischplatte und drei dünnen Beinen",
    featured: true,
  },
  {
    slug: "beistelltisch-zugabe",
    name: "Beistelltisch „Zugabe“",
    category: "tische",
    description: "Zwei Platten übereinander, getragen von einer Säule aus Eiche.",
    price: 279,
    image: "/images/produkte/beistelltisch-zugabe.svg",
    imageAlt: "Beistelltisch mit zwei übereinanderliegenden Schallplatten und einer Holzsäule",
  },
  {
    slug: "wandkunst-seite-b",
    name: "Wandkunst „Seite B“",
    category: "wandkunst",
    description: "Eine Platte, zur Blüte geschnitten und gerahmt.",
    price: 89,
    image: "/images/produkte/wandkunst-seite-b.svg",
    imageAlt: "Gerahmte Schallplatte, deren Rand zu einer Blütenform geschnitten ist",
    featured: true,
  },
  {
    slug: "wandkunst-langspiel",
    name: "Wandkunst „Langspiel“",
    category: "wandkunst",
    description: "Triptychon aus drei Streifen derselben Platte.",
    price: 149,
    image: "/images/produkte/wandkunst-langspiel.svg",
    imageAlt: "Drei schmale Wandbilder, die zusammen eine geteilte Schallplatte zeigen",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id;
}
