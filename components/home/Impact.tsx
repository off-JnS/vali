"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Section } from "../Section";
import { Reveal } from "../Reveal";

// PLATZHALTER – echte Werte eintragen, bevor die Seite live geht.
const stats = [
  { value: 1240, suffix: "", label: "Platten, die nicht im Müll gelandet sind" },
  { value: 180, suffix: " g", label: "Vinyl pro Platte, das weiterlebt – im Schnitt" },
  { value: 0, suffix: "", label: "neue Platten, die wir dafür pressen lassen" },
];

const number = new Intl.NumberFormat("de-DE");

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(to);

  useEffect(() => {
    if (!inView || reduce || to === 0) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {number.format(display)}
      {suffix}
    </span>
  );
}

export function Impact() {
  return (
    <Section tone="light" className="overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40" labelledBy="wirkung-titel">
      <div
        className="grooves pointer-events-none absolute -right-[40vw] top-1/2 aspect-square w-[110vw] -translate-y-1/2 md:-right-[20vw] md:w-[70vw]"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <Eyebrow>Warum das zählt</Eyebrow>
          <h2 id="wirkung-titel" className="mt-5 max-w-[18ch] text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1]">
            Kein neues Material. <em>Nur neue Ideen.</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Schallplatten bestehen meist aus PVC und lassen sich kaum sinnvoll recyceln. Wir können nicht jede retten.
            Aber jede, die bei uns landet, bleibt im Umlauf.
          </p>
        </Reveal>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:mt-20 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="flex flex-col-reverse justify-end bg-paper p-7 sm:p-9">
              <dt className="mt-3 max-w-[24ch] leading-relaxed text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(3.5rem,11vw,6rem)] font-light leading-none">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className="mt-5 flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full border border-current px-2 py-0.5 font-medium uppercase tracking-wider">Platzhalter</span>
          Beispielwerte – werden durch echte Zahlen ersetzt.
        </p>
      </Container>
    </Section>
  );
}
