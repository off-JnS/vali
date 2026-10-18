import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "./Section";
import { Logo } from "./Logo";

const legal = [
  { href: "/impressum/", label: "Impressum" },
  { href: "/datenschutz/", label: "Datenschutz" },
];

const pages = [
  { href: "/", label: "Start" },
  { href: "/produkte/", label: "Produkte" },
  { href: "/ueber-uns/", label: "Über uns" },
];

export function Footer() {
  return (
    <footer id="kontakt" data-tone="dark" className="relative overflow-hidden pt-24 md:pt-32" aria-labelledby="kontakt-titel">
      <div
        className="grooves pointer-events-none absolute -bottom-[40vw] left-1/2 aspect-square w-[140vw] -translate-x-1/2 opacity-70 md:-bottom-[30vw] md:w-[90vw]"
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Kontakt</p>
        <h2 id="kontakt-titel" className="mt-5 max-w-[16ch] text-[clamp(2.4rem,8vw,5.5rem)] font-light leading-[0.98]">
          Schreib uns. Wir hören <em className="text-accent">gern</em> zu.
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          Fragen zu einem Stück, eine Platte mit Geschichte oder einfach Hallo – wir antworten persönlich.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="group mt-8 inline-flex max-w-full items-center gap-3 border-b border-line pb-2 font-display text-[clamp(1.35rem,5.4vw,2.5rem)] transition-colors duration-500 hover:border-accent"
          style={{ hyphens: "none", overflowWrap: "anywhere" }}
        >
          {site.email}
          <span className="text-accent transition-transform duration-500 ease-out-soft group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </a>

        <div className="mt-24 grid gap-10 border-t border-line py-10 text-sm md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
          <div>
            <Link href="/" className="group inline-block" aria-label="ReSpin Studios – zur Startseite">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              Jedes Stück entsteht aus einer Platte, die es schon gab.
            </p>
          </div>
          <nav aria-label="Seiten">
            <ul className="grid gap-1">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Rechtliches">
            <ul className="grid gap-1">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1.5 text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="border-t border-line py-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.name} · Handgeformt in [Ort]
        </p>
      </Container>
    </footer>
  );
}
