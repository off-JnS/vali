import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LegalBlock, LegalPage } from "@/components/LegalPage";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Impressum",
  description:
    "Impressum von ReSpin Studios: Anbieterkennzeichnung und Kontaktangaben.",
  path: "/impressum/",
});

export default function ImpressumPage() {
  return (
    <LegalPage id="impressum-titel" title="Impressum" updated={formatDate(new Date(2026, 9, 18))}>
      <LegalBlock title="Angaben gemäß § 5 DDG">
        <p>
          <strong>ReSpin Studios</strong>
          <br />
          [Vor- und Nachname bzw. Firmenname, Rechtsform]
          <br />
          [Straße Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          [Land]
        </p>
      </LegalBlock>

      <LegalBlock title="Kontakt">
        <p>
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail]
        </p>
      </LegalBlock>

      <LegalBlock title="Umsatzsteuer">
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr., falls vorhanden]</p>
        <p>[Falls zutreffend: Hinweis zur Kleinunternehmerregelung]</p>
      </LegalBlock>

      <LegalBlock title="Registereintrag">
        <p>[Falls vorhanden: Registergericht und Registernummer]</p>
      </LegalBlock>

      <LegalBlock title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          [Name]
          <br />
          [Adresse]
        </p>
      </LegalBlock>

      <LegalBlock title="Verbraucherstreitbeilegung">
        <p>[Angabe, ob ihr an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilnehmt]</p>
      </LegalBlock>
    </LegalPage>
  );
}
