"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Baby,
  Browsers,
  Buildings,
  Cake,
  ChartLineUp,
  Confetti,
  CursorClick,
  Heart,
  PuzzlePiece,
  Sparkle,
} from "@phosphor-icons/react";
import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

const businessServices = [
  {
    title: "Desarrollo web",
    body: "Sitios web modernos para empresas, marcas y negocios.",
    icon: Browsers,
    pose: "services",
  },
  {
    title: "Landing pages",
    body: "Experiencias diseñadas para comunicar y convertir.",
    icon: CursorClick,
    pose: "services",
  },
  {
    title: "Dashboards",
    body: "Interfaces digitales para visualizar y gestionar información.",
    icon: ChartLineUp,
    pose: "dashboard",
  },
  {
    title: "Soluciones digitales",
    body: "Herramientas web personalizadas según las necesidades de cada proyecto.",
    icon: PuzzlePiece,
    pose: "services",
  },
] as const;

const eventTypes = [
  { label: "Matrimonios", icon: Heart },
  { label: "Cumpleaños", icon: Cake },
  { label: "Baby showers", icon: Baby },
  { label: "Celebraciones", icon: Confetti },
  { label: "Eventos especiales", icon: Sparkle },
];

function WorldTitle({ icon: Icon, children }: { icon: typeof Heart; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper text-indigo shadow-[0_8px_24px_-14px_rgba(37,32,182,0.45)]">
        <Icon aria-hidden weight="light" className="size-6" />
      </span>
      <h3 className="text-[clamp(1.5rem,1.25rem+0.8vw,2rem)] leading-tight font-semibold tracking-[-0.03em]">
        {children}
      </h3>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const current = businessServices[active];
  const ActiveIcon = current.icon;

  return (
    <section id="servicios" aria-labelledby="services-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="services-title" className="text-h2 max-w-[17ch]">
            Para empresas y para momentos importantes.
          </h2>
          <p className="text-lead mt-6 max-w-[40rem]">
            Trabajamos en dos mundos con el mismo cuidado: soluciones digitales para empresas y marcas, y experiencias
            digitales para personas y sus celebraciones.
          </p>
        </Reveal>

        {/* World one: businesses and brands. */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <WorldTitle icon={Buildings}>Soluciones para empresas</WorldTitle>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* The mascot presents whichever service is in focus. */}
            <Reveal className="lg:col-span-4">
              <div className="relative h-[17rem] overflow-hidden rounded-panel bg-[linear-gradient(180deg,var(--color-lavender-mist),var(--color-lavender-soft))] sm:h-[19rem] lg:sticky lg:top-28 lg:h-[24rem]">
                <div className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-paper text-indigo shadow-[0_8px_24px_-12px_rgba(37,32,182,0.35)]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={current.title}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    >
                      <ActiveIcon aria-hidden className="size-6" />
                    </motion.span>
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.pose}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-[8%] w-[84%] max-w-[18rem]"
                  >
                    <Avatar name={current.pose} sizes="(min-width: 640px) 288px, 70vw" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            <ul className="lg:col-span-8">
              {businessServices.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === active;
                return (
                  <Reveal as="li" key={service.title} delay={0.05 * index}>
                    <div
                      onMouseEnter={() => setActive(index)}
                      onClick={() => setActive(index)}
                      className="group relative flex items-start gap-5 border-t border-line py-7 md:gap-8 md:py-8"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute -top-px left-0 h-[2px] w-full origin-left bg-indigo"
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <span
                        className={`pt-2 text-sm tabular-nums transition-colors ${isActive ? "text-indigo" : "text-ink-soft"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-[1.625rem] leading-tight font-semibold tracking-[-0.025em] md:text-[2rem]">
                          {service.title}
                        </h4>
                        <p className="mt-2 max-w-[44ch] text-ink-muted">{service.body}</p>
                      </div>
                      <Icon
                        aria-hidden
                        className={`mt-1.5 size-7 shrink-0 transition-[color,transform] duration-300 ease-out-expo ${
                          isActive ? "-translate-y-0.5 text-indigo" : "text-ink-soft"
                        }`}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>

        {/* World two: people and their events. Softer surface, same system. */}
        <Reveal>
          <div className="mt-20 rounded-panel bg-[linear-gradient(135deg,var(--color-lavender-mist)_0%,var(--color-lavender-soft)_100%)] p-6 sm:p-8 md:mt-28 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <WorldTitle icon={Confetti}>Experiencias para eventos</WorldTitle>
                <p className="mt-4 max-w-[46ch] text-ink-muted">
                  Invitaciones digitales personalizadas para compartir tus momentos importantes.
                </p>
              </div>
              <a
                href="#eventos"
                className="group inline-flex items-center gap-2 self-start font-medium whitespace-nowrap text-indigo md:self-end"
              >
                Ver invitaciones
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Same ruled-list language as the business services, on the softer surface. */}
            <ul className="mt-10 grid grid-cols-2 gap-x-6 lg:grid-cols-5 lg:gap-x-8">
              {eventTypes.map(({ label, icon: Icon }, index) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 border-t border-indigo/15 py-5 lg:flex-col lg:items-start lg:gap-6 lg:pt-6 lg:pb-2 ${
                    index === eventTypes.length - 1 ? "col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <Icon aria-hidden weight="light" className="size-7 shrink-0 text-indigo lg:size-8" />
                  <span className="text-[1.0625rem] leading-snug font-medium tracking-[-0.015em] lg:text-[1.25rem]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
