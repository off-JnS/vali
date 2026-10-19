import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, GrooveDivider, Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { ToneSeam } from "@/components/ToneSeam";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = pageMetadata({
  title: "Über uns",
  description:
    "Warum wir alte Schallplatten nicht wegwerfen, wie aus einer Platte eine Schale wird – und was das für die Umwelt bedeutet. Die Geschichte von ReSpin Studios.",
  path: "/ueber-uns/",
});

const process = [
  { title: "Auswählen", text: "Wir prüfen jede Platte: Größe, Gewicht, Etikett. Manche sind zu schön, um sie zu formen – die bekommen ein neues Zuhause im Plattenregal." },
  { title: "Reinigen", text: "Staub, Fingerabdrücke, alte Aufkleber. Alles muss runter, damit die Rillen später wieder glänzen." },
  { title: "Erwärmen", text: "Bei niedriger Temperatur wird das Vinyl weich. Ein paar Sekunden zu viel, und die Platte ist verloren – also bleiben wir dabei." },
  { title: "Formen", text: "Von Hand, über eigene Formen aus Holz. Hier entscheidet sich, ob eine Schale, ein Brett oder ein Bild entsteht." },
  { title: "Veredeln", text: "Kanten schleifen, Füße anbringen, Holz ölen. Zum Schluss bekommt jedes Stück seine Karte mit der Herkunft der Platte." },
];

const honest = {
  sagen: [
    "Jedes Stück entsteht aus einer Platte, die es schon gab.",
    "Wir kaufen dafür keine neuen Platten ein.",
    "Wir arbeiten in kleinen Mengen, von Hand.",
  ],
  nichtSagen: [
    "Dass wir die Welt retten.",
    "Dass unsere Produkte klimaneutral sind.",
    "Dass Vinyl ein umweltfreundliches Material ist.",
  ],
};

function ChapterHead({ n, title, id }: { n: string; title: React.ReactNode; id: string }) {
  return (
    <Reveal>
      <Eyebrow>Kapitel {n}</Eyebrow>
      <h2 id={id} className="mt-5 max-w-[16ch] text-[clamp(2.4rem,7vw,4.75rem)] font-light leading-[1]">
        {title}
      </h2>
    </Reveal>
  );
}

export default function UeberUnsPage() {
  return (
    <>
      <PageIntro
        id="ueber-titel"
        eyebrow="Über uns"
        title={
          <>
            Wir hören <em className="text-accent">anders</em> hin.
          </>
        }
        text="ReSpin Studios ist eine kleine Werkstatt mit einer großen Kiste voller Platten. Das ist unsere Geschichte – in drei Kapiteln."
      />

      <ToneSeam from="dark" to="light" />

      {/* Kapitel 1 */}
      <Section tone="light" className="pb-16 pt-6 md:pb-24 md:pt-10" labelledBy="kapitel-1">
        <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6 lg:col-span-5">
            <ChapterHead n="01" id="kapitel-1" title={<>Warum wir <em>angefangen</em> haben</>} />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Es begann mit einem Umzugskarton. Darin: siebzig Schallplatten, die niemand mehr wollte. Zu zerkratzt zum
                Verkaufen, zu schade zum Wegwerfen.
              </p>
              <p>
                Also haben wir ausprobiert, was man mit ihnen noch machen kann. Die erste Schale war schief. Die zehnte
                stand auf unserem Küchentisch. Die hundertste ging an Freunde von Freunden.
              </p>
              <p>Heute ist daraus eine Werkstatt geworden. Die Frage ist dieselbe geblieben: Was kann diese Platte noch?</p>
            </Reveal>
          </div>
          <Reveal as="figure" delay={0.15} className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink">
              {/* Platzhalter: echtes Foto unter /public/images ablegen und src ändern */}
              <Image
                src="/images/werkstatt-platzhalter.svg"
                alt="Platzhalter für ein Foto der Gründerin oder des Gründers in der Werkstatt"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">[Name] in der Werkstatt in [Ort]</figcaption>
          </Reveal>
        </Container>
      </Section>

      <ToneSeam from="light" to="dark" />

      {/* Zitat */}
      <Section tone="dark" className="overflow-hidden py-16 md:py-24" labelledBy="zitat">
        <div className="grooves pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160vw] -translate-x-1/2 -translate-y-1/2 md:w-[90vw]" aria-hidden="true" />
        <Container className="relative">
          <Reveal as="figure" className="mx-auto max-w-4xl text-center">
            <h2 id="zitat" className="sr-only">
              Zitat
            </h2>
            <LogoMark className="mx-auto mb-8 size-10 text-paper" />
            <blockquote className="font-display text-[clamp(1.9rem,5.5vw,3.75rem)] font-light italic leading-[1.1]">
              <span className="text-accent">„</span>Ich konnte keine Platte wegwerfen. Also habe ich angefangen, ihnen eine
              neue Aufgabe zu geben.<span className="text-accent">“</span>
            </blockquote>
            <figcaption className="mt-8 text-sm uppercase tracking-[0.22em] text-muted">
              [Name], Gründer:in von ReSpin Studios
            </figcaption>
          </Reveal>
        </Container>
      </Section>

      <ToneSeam from="dark" to="light" />

      {/* Kapitel 2 */}
      <Section tone="light" className="pb-24 pt-6 md:pb-36 md:pt-10" labelledBy="kapitel-2">
        <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:sticky md:top-32 md:col-span-5 md:self-start">
            <ChapterHead n="02" id="kapitel-2" title={<>Wie ein Stück <em>entsteht</em></>} />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                Fünf Schritte, viele Stunden. Und ein bisschen Mut, denn jede Platte reagiert anders auf Wärme.
              </p>
            </Reveal>
          </div>
          <ol className="relative md:col-span-7 md:col-start-6">
            <span className="absolute bottom-4 left-[11px] top-4 w-px bg-line" aria-hidden="true" />
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06} className="relative pb-12 pl-14 last:pb-0">
                <span className="absolute left-0 top-1 grid size-6 place-items-center rounded-full border border-line bg-paper" aria-hidden="true">
                  <span className={`size-2 rounded-full ${i === process.length - 1 ? "bg-accent" : "bg-ink"}`} />
                </span>
                <p className="text-sm tabular-nums text-muted">Schritt {i + 1}</p>
                <h3 className="mt-1 text-3xl font-light leading-tight md:text-4xl">{step.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Kapitel 3 */}
      <Section tone="light" className="pb-16 md:pb-24" labelledBy="kapitel-3">
        <Container>
          <GrooveDivider className="mb-24 md:mb-36" />
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <ChapterHead n="03" id="kapitel-3" title={<>Was das für die <em>Umwelt</em> bedeutet</>} />
            </div>
            <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted md:col-span-6 md:pt-16">
              <p>
                Schallplatten bestehen meist aus PVC. Sie lassen sich kaum sinnvoll recyceln und landen deshalb oft im
                Restmüll.
              </p>
              <p>
                Wir können das nicht im großen Stil ändern. Aber wir können dafür sorgen, dass jede Platte, die bei uns
                ankommt, weiter benutzt wird – statt neues Material zu verbrauchen.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:mt-24 md:grid-cols-2">
            <Reveal className="bg-paper p-7 sm:p-10">
              <h3 className="text-2xl font-light md:text-3xl">Was wir sagen</h3>
              <ul className="mt-6 space-y-4">
                {honest.sagen.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="bg-paper-2 p-7 sm:p-10">
              <h3 className="text-2xl font-light md:text-3xl">Was wir nicht sagen</h3>
              <ul className="mt-6 space-y-4 text-muted">
                {honest.nichtSagen.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full border border-current" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href="/produkte/">Zur Kollektion</Button>
            <Button href="#kontakt" variant="outline">
              Kontakt aufnehmen
            </Button>
          </Reveal>
        </Container>
      </Section>
      <ToneSeam from="light" to="dark" />
    </>
  );
}
