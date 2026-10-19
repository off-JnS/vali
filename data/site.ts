// Zentrale Angaben zur Marke. Platzhalter vor dem Livegang ersetzen.
export const site = {
  name: "ReSpin Studios",
  url: "https://respin-studios.netlify.app", // bei eigener Domain hier ändern
  // ACHTUNG Platzhalter: respin-studios.de ist nicht registriert – Mails kommen nicht an!
  email: "hallo@respin-studios.de",
  description:
    "ReSpin Studios formt alte Schallplatten von Hand zu Schalen, Schachbrettern, Beistelltischen und Wandkunst. Jedes Stück entsteht aus einer Platte, die es schon gab.",
} as const;

export const navigation = [
  { href: "/", label: "Start" },
  { href: "/produkte/", label: "Produkte" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
