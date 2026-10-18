import { Container, Section } from "./Section";
import { ToneSeam } from "./ToneSeam";

type LegalPageProps = {
  id: string;
  title: string;
  updated: string;
  children: React.ReactNode;
};

/** Ruhiges Layout für Impressum und Datenschutz. */
export function LegalPage({ id, title, updated, children }: LegalPageProps) {
  return (
    <>
      <Section tone="light" className="pb-16 pt-32 md:pb-24 md:pt-48" labelledBy={id}>
        <Container className="grid gap-12 md:grid-cols-12">
          <header className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent-text">Rechtliches</p>
              <h1 id={id} className="mt-5 text-[clamp(2.6rem,8vw,4.5rem)] font-light leading-[1]">
                {title}
              </h1>
              <p className="mt-4 text-sm text-muted">Stand: {updated}</p>
            </div>
          </header>
          <div className="md:col-span-8 lg:col-span-7">
            <p className="mb-12 rounded-2xl border border-accent-deep/40 bg-paper-2 p-5 text-sm leading-relaxed">
              <strong className="font-semibold">Hinweis:</strong> Diese Seite ist eine Vorlage. Alle Angaben in eckigen
              Klammern sind Platzhalter und müssen vor der Veröffentlichung ersetzt und rechtlich geprüft werden.
            </p>
            <div className="space-y-12">{children}</div>
          </div>
        </Container>
      </Section>
      <ToneSeam from="light" to="dark" />
    </>
  );
}

export function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-2xl font-light md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted [&_strong]:font-medium [&_strong]:text-fg">{children}</div>
    </section>
  );
}
