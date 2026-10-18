import { Container, Eyebrow, Section } from "../Section";
import { Reveal } from "../Reveal";

const steps = [
  {
    word: "Gesammelt",
    text: "Vom Flohmarkt, aus Nachlässen, aus Kisten im Keller. Wir holen Platten, die keiner mehr auflegt – zerkratzt, verzogen, vergessen.",
    icon: StackIcon,
  },
  {
    word: "Geformt",
    text: "Mit Wärme, Geduld und viel Handarbeit bekommt jede Platte eine neue Gestalt. Kein Stück gleicht dem anderen.",
    icon: WarpIcon,
  },
  {
    word: "Geliebt",
    text: "Bei dir dreht sie ihre zweite Runde: als Schale auf dem Tisch, als Brett für den Spieleabend, als Bild an der Wand.",
    icon: BowlIcon,
  },
];

export function Steps() {
  return (
    <Section tone="light" className="pb-28 pt-8 md:pb-40 md:pt-12" labelledBy="idee-titel">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-end">
          <Reveal>
            <Eyebrow>Die Idee</Eyebrow>
            <h2 id="idee-titel" className="mt-5 text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1]">
              Drei Schritte. <em>Eine zweite Runde.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-lg text-lg leading-relaxed text-muted md:justify-self-end">
              Unzählige Schallplatten liegen ungehört herum. Wir finden, sie haben noch etwas zu sagen – nur eben nicht
              mehr über die Nadel.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-line md:mt-24 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.word} delay={i * 0.12} className="flex flex-col bg-paper p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <span className="font-display text-sm tabular-nums text-muted">0{i + 1}</span>
                <step.icon />
              </div>
              <h3 className="mt-16 text-[clamp(2.2rem,5vw,3.25rem)] font-light italic leading-none md:mt-24">
                {step.word}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function StackIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 text-ink" aria-hidden="true">
      {[0, 7, 14].map((dy, i) => (
        <g key={dy} transform={`translate(0 ${dy})`}>
          <ellipse cx="32" cy="22" rx="24" ry="8" fill={i === 2 ? "currentColor" : "var(--paper)"} stroke="currentColor" strokeWidth="1.2" />
          {i === 2 && <ellipse cx="32" cy="22" rx="6" ry="2" fill="var(--accent)" />}
        </g>
      ))}
    </svg>
  );
}

function WarpIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 text-ink" aria-hidden="true">
      <path d="M8 34 C 14 22, 50 22, 56 34 C 50 30, 14 30, 8 34 Z" fill="currentColor" />
      <path d="M8 34 C 14 46, 50 46, 56 34" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
      <ellipse cx="32" cy="30" rx="5" ry="1.8" fill="var(--accent)" />
      <path d="M32 6 v8 M26 10 l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function BowlIcon() {
  return (
    <svg viewBox="0 0 64 64" className="size-14 text-ink" aria-hidden="true">
      <ellipse cx="32" cy="26" rx="24" ry="8" fill="currentColor" />
      <path d="M8 26 C 9 44, 22 52, 32 52 C 42 52, 55 44, 56 26" fill="currentColor" />
      <ellipse cx="32" cy="29" rx="6" ry="2" fill="var(--accent)" />
      <path d="M14 27 C 16 40, 24 46, 32 47" fill="none" stroke="var(--paper)" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  );
}
