import { site } from "@/data/site";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { Container, Section } from "../Section";
import { Vinyl } from "../Vinyl";

export function Closing() {
  return (
    <Section tone="dark" className="overflow-hidden pb-8 pt-12 md:pt-20" labelledBy="schluss-titel">
      <div
        className="pointer-events-none absolute left-1/2 top-16 w-[130vw] max-w-[1100px] -translate-x-1/2 opacity-[0.22] md:top-10 md:w-[80vw]"
        aria-hidden="true"
      >
        <Vinyl className="spin-slow w-full" labelColor="#3a2a22" labelText="Danke fürs Zuhören · ReSpin Studios ·" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent,var(--ink)_95%)]"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 id="schluss-titel" className="mx-auto max-w-[15ch] text-[clamp(2.6rem,9vw,6.5rem)] font-light leading-[0.98]">
            Hast du eine Platte, die zu schade für den <em className="text-accent">Keller</em> ist?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
            Erzähl uns ihre Geschichte. Vielleicht wird daraus dein nächstes Lieblingsstück.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/produkte/" className="w-full sm:w-auto">
            Kollektion ansehen
          </Button>
          <Button
            href={`mailto:${site.email}?subject=${encodeURIComponent("Meine Platte hat eine Geschichte")}`}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Platte vorschlagen
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
