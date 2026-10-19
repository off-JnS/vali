import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von ReSpin Studios: welche Daten beim Besuch der Website und bei Anfragen per E-Mail verarbeitet werden.",
  path: "/datenschutz/",
});

export default function DatenschutzPage() {
  return (
    <LegalPage id="datenschutz-titel" title="Datenschutz" updated={formatDate(new Date(2026, 9, 18))}>
      <LegalBlock title="1. Verantwortliche Stelle">
        <p>
          [Name bzw. Firmenname]
          <br />
          [Straße Hausnummer], [PLZ Ort]
          <br />
          E-Mail: [E-Mail]
        </p>
      </LegalBlock>

      <LegalBlock title="2. Das Wichtigste in Kürze">
        <p>
          Diese Website setzt keine Cookies, nutzt kein Tracking und keine Analyse-Tools. Es gibt keine Formulare, kein
          Kundenkonto und keinen Warenkorb. Schriften werden von unserem eigenen Server geladen, nicht von Dritten.
        </p>
      </LegalBlock>

      <LegalBlock title="3. Hosting und Server-Logfiles">
        <p>
          Die Website wird bei Netlify, Inc. ([Anschrift ergänzen]) gehostet. Beim Aufruf der Seiten verarbeitet der Anbieter
          technisch notwendige Daten, zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browsertyp.
        </p>
        <p>
          Rechtsgrundlage: [z. B. Art. 6 Abs. 1 lit. f DSGVO]. Speicherdauer: [Angabe des Anbieters]. [Hinweis auf
          Auftragsverarbeitungsvertrag und ggf. Datenübermittlung in Drittländer]
        </p>
      </LegalBlock>

      <LegalBlock title="4. Kontakt per E-Mail">
        <p>
          Wenn du uns schreibst – etwa über einen „Anfragen“-Button –, öffnet sich dein eigenes E-Mail-Programm. Wir
          erhalten deine E-Mail-Adresse und den Inhalt deiner Nachricht und nutzen beides nur, um deine Anfrage zu
          beantworten.
        </p>
        <p>Rechtsgrundlage: [z. B. Art. 6 Abs. 1 lit. b bzw. f DSGVO]. Speicherdauer: [Angabe].</p>
      </LegalBlock>

      <LegalBlock title="5. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
          und Widerspruch (Art. 15–21 DSGVO). Schreib uns dazu einfach eine E-Mail an [E-Mail].
        </p>
        <p>
          Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei [zuständige
          Aufsichtsbehörde].
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
