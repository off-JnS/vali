import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/home/Steps";
import { Featured } from "@/components/home/Featured";
import { Marquee } from "@/components/home/Marquee";
import { Impact } from "@/components/home/Impact";
import { Closing } from "@/components/home/Closing";
import { ToneSeam } from "@/components/ToneSeam";

export const metadata: Metadata = pageMetadata({
  title: "ReSpin Studios – Jede Platte verdient eine zweite Runde",
  description:
    "Wir formen alte Schallplatten von Hand zu Schalen, Schachbrettern, Beistelltischen und Wandkunst. Entdecke Einzelstücke mit Vorgeschichte.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <ToneSeam from="dark" to="light" />
      <Steps />
      <Featured />
      <Marquee />
      <Impact />
      <ToneSeam from="light" to="dark" />
      <Closing />
    </>
  );
}
