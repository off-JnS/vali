import { featuredProducts } from "@/data/products";
import { Button } from "../Button";
import { ProductCard } from "../ProductCard";
import { Reveal } from "../Reveal";
import { Container, Eyebrow, Section } from "../Section";

export function Featured() {
  return (
    <Section tone="light" className="pb-28 md:pb-40" labelledBy="auswahl-titel">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Aus der Werkstatt</Eyebrow>
            <h2 id="auswahl-titel" className="mt-5 text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1]">
              Stücke mit <em>Vorgeschichte</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block">
            <Button href="/produkte/" variant="outline">
              Alle Stücke ansehen
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={(i % 4) * 0.08} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <ProductCard product={product} variant="teaser" />
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 md:hidden">
          <Button href="/produkte/" variant="outline" className="w-full">
            Alle Stücke ansehen
          </Button>
        </div>
      </Container>
    </Section>
  );
}
