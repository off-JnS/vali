import type { Metadata } from "next";
import { site } from "@/data/site";

/** Titel, Beschreibung, Canonical und Open Graph für eine Seite in einem Rutsch. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} – ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      // Eigene openGraph-Angaben ersetzen die aus app/opengraph-image.png – daher hier explizit
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "ReSpin Studios – Neue Objekte aus alten Schallplatten" }],
    },
  };
}
