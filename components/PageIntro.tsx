import { Container, Section } from "./Section";
import { Vinyl } from "./Vinyl";
import { Reveal } from "./Reveal";

type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  id: string;
};

/** Dunkler Seitenkopf mit halb angeschnittener, drehender Platte. */
export function PageIntro({ eyebrow, title, text, id }: PageIntroProps) {
  return (
    <Section tone="dark" className="overflow-hidden pb-8 pt-36 md:pb-12 md:pt-52" labelledBy={id}>
      <div
        className="pointer-events-none absolute -right-[45vw] top-1/2 w-[95vw] max-w-[820px] -translate-y-1/2 opacity-40 sm:-right-[30vw] md:-right-[20vw] md:w-[55vw] lg:-right-[10vw]"
        aria-hidden="true"
      >
        <Vinyl className="spin-slow w-full" />
      </div>
      <Container className="relative">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
          <h1 id={id} className="mt-5 max-w-[14ch] text-[clamp(2.8rem,10vw,7rem)] font-light leading-[0.95]">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{text}</p>}
        </Reveal>
      </Container>
    </Section>
  );
}
