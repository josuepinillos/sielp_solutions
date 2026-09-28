"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { Reveal } from "../Reveal";

const steps = [
  { title: "Descubrimos", body: "Escuchamos tu idea, tus objetivos y a quién quieres llegar." },
  { title: "Diseñamos", body: "Definimos la estructura y el diseño visual antes de escribir código." },
  { title: "Desarrollamos", body: "Construimos una experiencia rápida, clara y adaptada a cualquier pantalla." },
  { title: "Lanzamos", body: "Publicamos tu proyecto y revisamos juntos cada detalle." },
];

function Step({
  index,
  title,
  body,
  active,
  onActive,
}: {
  index: number;
  title: string;
  body: string;
  active: boolean;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative py-10 pl-10 md:pl-14 lg:flex lg:min-h-[17rem] lg:flex-col lg:justify-center lg:py-12">
      <span
        aria-hidden
        className={`absolute top-[3.1rem] left-0 size-3 -translate-x-[5px] rounded-full border-2 transition-colors duration-500 lg:top-1/2 lg:-translate-y-1/2 ${
          active ? "border-indigo bg-indigo" : "border-lavender bg-canvas"
        }`}
      />
      <span className={`text-sm font-medium tabular-nums transition-colors duration-500 ${active ? "text-indigo" : "text-ink-soft"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className={`mt-2 text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[1.05] font-semibold tracking-[-0.035em] transition-colors duration-500 ${
          active ? "text-ink" : "text-ink-soft"
        }`}
      >
        {title}
      </h3>
      <p className="mt-3 max-w-[38ch] text-ink-muted">{body}</p>
    </li>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section id="proceso" aria-labelledby="process-title" className="py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 id="process-title" className="text-h2 max-w-[12ch]">
                De una idea a una experiencia.
              </h2>
              <p className="text-lead mt-6 max-w-[30rem]">
                Un proceso claro, en el que participas desde la primera conversación hasta el lanzamiento.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-indigo"
            style={{ scaleY: progress }}
          />
          <ol ref={listRef}>
            {steps.map((step, index) => (
              <Step key={step.title} index={index} active={active === index} onActive={setActive} {...step} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
