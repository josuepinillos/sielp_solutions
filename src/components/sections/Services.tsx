"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Browsers, ChartLineUp, CursorClick, PuzzlePiece } from "@phosphor-icons/react";
import { routes } from "@/content/site";
import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

// Business services: the main offer of Sielp Solutions (home only).
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

export function Services() {
  const [active, setActive] = useState(0);
  const current = businessServices[active];
  const ActiveIcon = current.icon;

  return (
    <section id="servicios" aria-labelledby="services-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="services-title" className="text-h2 max-w-[17ch]">
            Lo que desarrollamos para tu empresa.
          </h2>
          <p className="text-lead mt-6 max-w-[40rem]">
            Sitios, páginas y herramientas web diseñadas y desarrolladas a la medida de cada negocio.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
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
                      <h3 className="text-[1.625rem] leading-tight font-semibold tracking-[-0.025em] md:text-[2rem]">
                        {service.title}
                      </h3>
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

        {/* The secondary line, as a quiet pointer: never a second main offer. */}
        <Reveal>
          <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mt-20">
            <p className="text-ink-muted">¿Buscas una invitación digital para tu evento?</p>
            <Link
              href={routes.invitations}
              prefetch={false}
              className="group inline-flex items-center gap-2 self-start py-1 font-medium text-indigo sm:self-auto"
            >
              Conoce nuestras invitaciones digitales
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
