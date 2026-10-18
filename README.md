# ReSpin Studios

Showcase-Website für ReSpin Studios – Objekte aus alten Schallplatten.
Next.js (App Router, statischer Export), TypeScript, Tailwind CSS 4, Framer Motion.

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statischer Export nach ./out
```

`out/` lässt sich auf jedem statischen Hoster ausliefern.

## Deployment auf Netlify

`netlify.toml` ist fertig konfiguriert (Build: `npm run build`, Publish: `out`, Node 22).
Auf Netlify: *Add new site → Import an existing project → GitHub-Repo wählen → Deploy*.
Die 404-Seite (`out/404.html`) wird automatisch verwendet.

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Produkte (Name, Kategorie, Text, Preis, Bild) | `data/products.ts` |
| E-Mail-Adresse, Domain, Navigation | `data/site.ts` |
| Produktbilder | `public/images/produkte/` – Platzhalter-SVGs durch Fotos ersetzen und Pfad in `data/products.ts` anpassen |
| Werkstattfoto (Über uns) | `public/images/werkstatt-platzhalter.svg` |
| Kennzahlen Startseite (Platzhalter) | `components/home/Impact.tsx` |
| Impressum / Datenschutz | `app/impressum/page.tsx`, `app/datenschutz/page.tsx` |

Platzhalter-Bilder neu erzeugen: `node scripts/placeholders.mjs`.

## Vor dem Livegang

- Alle `[Platzhalter]` in Impressum, Datenschutz, Footer und Über uns ersetzen und rechtlich prüfen lassen.
- Echte E-Mail-Adresse und Domain in `data/site.ts` eintragen.
- Kennzahlen auf der Startseite durch echte Werte ersetzen und das Platzhalter-Label entfernen.
