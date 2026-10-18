"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Vinyl, VinylSheen } from "./Vinyl";
import { BowlBody } from "./Bowl";

const ease = [0.22, 1, 0.36, 1] as const;

const headlineLines = [["Jede", "Platte"], ["verdient", "eine"], ["zweite", "Runde."]];

/**
 * Startbereich: Die Platte kommt aus der Hülle, dreht sich langsam und kippt
 * beim Scrollen zur Schale. Scrollgeschwindigkeit „scratcht“ die Platte mit.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Bei „Bewegung reduzieren“ bleibt alles im Ausgangszustand stehen.
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduceRef.current) p.set(v);
  });

  // Drehung: Grundtempo + Scrollgeschwindigkeit, wird langsamer, sobald die Schale steht
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const spinFactor = useTransform(p, [0.35, 0.78], [1, 0.08]);
  const spin = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (reduceRef.current) return;
    const dt = Math.min(delta, 64) / 1000;
    const f = spinFactor.get();
    spin.set((spin.get() + dt * f * (22 + velocity.get() * 0.08)) % 360);
  });

  // Endgröße der Schale relativ zur Platte – auf dem Handy größer, damit sie den Screen füllt
  const [bowl, setBowl] = useState(0.62);
  const bowlRef = useRef(bowl);
  bowlRef.current = bowl;
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setBowl(mq.matches ? 0.8 : 0.62);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const tilt = useTransform(p, [0.1, 0.56], [0, 68]);
  const scale = useTransform(p, (v) => {
    const t = Math.min(Math.max((v - 0.06) / 0.5, 0), 1);
    return 1 - (1 - bowlRef.current) * t;
  });
  const stageY = useTransform(p, [0.1, 0.6], ["0%", "-7%"]);
  const reveal = useTransform(p, [0.44, 0.76], [100, 0]);
  const bowlClip = useMotionTemplate`inset(0 0 ${reveal}% 0)`;
  const bowlOpacity = useTransform(p, [0.42, 0.5], [0, 1]);
  const shadowOpacity = useTransform(p, [0.58, 0.82], [0, 1]);
  const glowScale = useTransform(p, [0, 1], [1, 1.35]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.9, 0.55, 0.8]);

  const introOpacity = useTransform(p, [0, 0.18], [1, 0]);
  const introY = useTransform(p, [0, 0.18], [0, -70]);
  const cueOpacity = useTransform(p, [0, 0.05], [1, 0]);
  const outroOpacity = useTransform(p, [0.66, 0.8], [0, 1]);
  const outroY = useTransform(p, [0.66, 0.8], [40, 0]);

  return (
    <section
      ref={ref}
      data-tone="dark"
      aria-labelledby="hero-titel"
      className="relative h-[250svh] motion-reduce:h-svh md:h-[280svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Rillen im Hintergrund */}
        <div className="grooves absolute inset-[-20%] opacity-60" aria-hidden="true" />

        {/* Bühne */}
        <div className="absolute left-1/2 top-[42%] aspect-square w-[min(86vw,54svh)] -translate-x-1/2 -translate-y-1/2 md:top-[45%] md:w-[min(72svh,640px)]">
          <motion.div className="relative size-full" style={{ y: stageY, perspective: 2600 }}>
            <motion.div
              aria-hidden="true"
              className="absolute inset-[-35%] rounded-full"
              style={{
                scale: glowScale,
                opacity: glowOpacity,
                background:
                  "radial-gradient(closest-side, rgb(217 84 30 / 0.22), rgb(217 84 30 / 0.06) 55%, transparent 75%)",
              }}
            />

            {/* Schatten unter der fertigen Schale */}
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 h-[12%] -translate-x-1/2 rounded-[50%] bg-black blur-xl"
              style={{ opacity: shadowOpacity, top: `${50 + bowl * 48.75 - 6}%`, width: `${bowl * 94}%` }}
            />

            {/* Außenwand der Schale – formt sich von oben nach unten */}
            <motion.div
              className="absolute"
              // Rand der Schale (y = 75 von 400) sitzt exakt auf der Mitte der gekippten Platte
              style={{
                clipPath: bowlClip,
                opacity: bowlOpacity,
                left: `${((1 - bowl) / 2) * 100}%`,
                top: `${50 - bowl * 18.75}%`,
                width: `${bowl * 100}%`,
              }}
            >
              <BowlBody className="block w-full" />
            </motion.div>

            {/* Die Platte */}
            <motion.div
              className="absolute inset-0"
              style={{ rotateX: tilt, scale }}
              initial={{ y: "9%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.6, ease, delay: 0.25 }}
            >
              <motion.div className="size-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" style={{ rotate: spin }}>
                <Vinyl className="size-full" />
              </motion.div>
              <VinylSheen className="pointer-events-none absolute inset-0" />
            </motion.div>

            {/* Hülle mit Loch, aus der die Platte herausgleitet */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[-3%]"
              initial={{ y: "0%", opacity: 1 }}
              animate={{ y: "110%", opacity: 0 }}
              transition={{ duration: 1.5, ease, delay: 0.5 }}
            >
              <Sleeve />
            </motion.div>
          </motion.div>
        </div>

        {/* Text, Teil 1 */}
        <motion.div
          className="absolute inset-x-0 bottom-[7svh] px-4 text-center md:bottom-[9svh]"
          style={{ opacity: introOpacity, y: introY }}
        >
          <h1
            id="hero-titel"
            className="mx-auto max-w-[14ch] text-[clamp(2.6rem,11.5vw,7.4rem)] font-light leading-[0.95] md:max-w-none"
            style={{ hyphens: "manual" }}
          >
            {headlineLines.map((line, li) => (
              <span key={li} className="block md:inline">
                {line.map((word, wi) => (
                  <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className={`inline-block ${li === 2 ? "italic text-accent" : ""}`}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.1, ease, delay: 1 + li * 0.12 + wi * 0.06 }}
                    >
                      {word}
                    </motion.span>
                    {wi < line.length - 1 || li < headlineLines.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <motion.div
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5 md:mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.6 }}
          >
            <p className="max-w-[30ch] text-sm leading-relaxed text-muted md:text-base">
              Schalen, Schachbretter, Tische und Wandkunst – von Hand geformt aus alten Schallplatten.
            </p>
          </motion.div>
        </motion.div>

        {/* Text, Teil 2 */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[9svh] px-4 text-center md:bottom-[11svh]"
          style={{ opacity: outroOpacity, y: outroY }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">Aus Rillen wird Form</p>
          <p className="font-display mx-auto mt-4 max-w-[18ch] text-[clamp(1.9rem,6.5vw,3.75rem)] font-light leading-[1.05]">
            Gestern Musik. Heute deine Schale.
          </p>
        </motion.div>

        {/* Randnotizen */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-end justify-between px-8 pb-6 text-[11px] uppercase tracking-[0.24em] text-muted md:flex"
          style={{ opacity: cueOpacity }}
          aria-hidden="true"
        >
          <span>Handgeformt aus Vinyl</span>
          <span>Seite A · 33⅓ U/min</span>
        </motion.div>
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 pb-2 text-[10px] uppercase tracking-[0.3em] text-muted motion-reduce:hidden"
          style={{ opacity: cueOpacity }}
          aria-hidden="true"
        >
          <span className="h-8 w-px overflow-hidden bg-line">
            <span className="block h-1/2 w-px animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-paper" />
          </span>
        </motion.div>

      </div>
    </section>
  );
}

/** Plattenhülle mit runder Aussparung in der Mitte */
function Sleeve() {
  return (
    <svg viewBox="0 0 400 400" className="size-full">
      <defs>
        <mask id="sleeve-hole">
          <rect width="400" height="400" fill="white" />
          <circle cx="200" cy="200" r="58" fill="black" />
        </mask>
      </defs>
      <g mask="url(#sleeve-hole)">
        <rect width="400" height="400" rx="6" fill="#1b1a18" />
        <g fill="none" stroke="rgba(242,237,228,0.06)">
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx="200" cy="200" r={74 + i * 11} />
          ))}
        </g>
        <rect x="0.5" y="0.5" width="399" height="399" rx="6" fill="none" stroke="rgba(242,237,228,0.12)" />
        <text
          x="22"
          y="42"
          fill="#f2ede4"
          fontSize="22"
          style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic" }}
        >
          ReSpin
        </text>
        <text
          x="378"
          y="380"
          textAnchor="end"
          fill="rgba(242,237,228,0.5)"
          fontSize="9"
          letterSpacing="2.5"
          style={{ fontFamily: "var(--font-inter)", textTransform: "uppercase" }}
        >
          Zweite Runde · LP
        </text>
      </g>
    </svg>
  );
}
