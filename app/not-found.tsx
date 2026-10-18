import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container, Section } from "@/components/Section";
import { Vinyl } from "@/components/Vinyl";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Diese Seite gibt es nicht (mehr). Zurück zum Start von ReSpin Studios.",
};

export default function NotFound() {
  return (
    <Section tone="dark" className="flex min-h-svh items-center overflow-hidden py-32" labelledBy="fehler-titel">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[120vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-30 md:w-[60vw]" aria-hidden="true">
        <Vinyl className="w-full rotate-[-12deg]" labelColor="#3a2a22" labelText="404 · Hier springt die Nadel · 404 ·" />
        {/* Kratzer */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
          <path d="M70 250 C 140 200, 230 230, 330 140" fill="none" stroke="#f2ede4" strokeOpacity="0.5" strokeWidth="1.5" />
        </svg>
      </div>
      <Container className="relative text-center">
        <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Fehler 404</p>
        <h1 id="fehler-titel" className="mx-auto mt-5 max-w-[12ch] text-[clamp(2.8rem,10vw,6.5rem)] font-light leading-[0.95]">
          Hier springt die <em className="text-accent">Nadel</em>.
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-lg leading-relaxed text-muted">
          Diese Seite gibt es nicht – oder nicht mehr. Leg einfach eine andere auf.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Zurück zum Start</Button>
          <Button href="/produkte/" variant="outline">
            Zur Kollektion
          </Button>
        </div>
      </Container>
    </Section>
  );
}
