import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/PageIntro";
import { ProductCatalog } from "@/components/ProductCatalog";
import { Container, Section } from "@/components/Section";
import { site } from "@/data/site";
import { ToneSeam } from "@/components/ToneSeam";

export const metadata: Metadata = pageMetadata({
  title: "Produkte",
  description:
    "Schalen, Schachbretter, Beistelltische und Wandkunst aus alten Schallplatten. Jedes Stück ein handgeformtes Einzelstück – frag dein Lieblingsstück direkt per E-Mail an.",
  path: "/produkte/",
});

export default function ProduktePage() {
  return (
    <>
      <PageIntro
        id="produkte-titel"
        eyebrow="Kollektion"
        title={
          <>
            Alles, was <em className="text-accent">weiterspielt</em>.
          </>
        }
        text="Jedes Stück ist ein Unikat aus genau einer Platte. Gefällt dir etwas? Frag es einfach an – wir melden uns persönlich."
      />
      <ToneSeam from="dark" to="light" />
      <Section tone="light" className="pb-16 pt-2 md:pb-24 md:pt-4" labelledBy="katalog-titel">
        <Container>
          <h2 id="katalog-titel" className="sr-only">
            Alle Stücke
          </h2>
          <ProductCatalog />
          <div className="mt-24 grid gap-6 rounded-[1.5rem] border border-line p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-light leading-tight">
                So funktioniert eine Anfrage
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                Kein Warenkorb, keine Kasse. Du klickst auf „Anfragen“, dein E-Mail-Programm öffnet sich mit einer
                vorbereiteten Nachricht. Wir antworten dir mit Verfügbarkeit, Versand und allem, was du wissen willst.
              </p>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg"
              style={{ hyphens: "none" }}
            >
              {site.email}
            </a>
          </div>
        </Container>
      </Section>
      <ToneSeam from="light" to="dark" />
    </>
  );
}
