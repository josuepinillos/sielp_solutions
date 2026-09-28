"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Baby, Cake, CalendarBlank, Champagne, Check, Eye, Heart, MapPin, Sparkle } from "@phosphor-icons/react";
import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

const invitations = [
  {
    id: "matrimonio",
    label: "Matrimonio",
    icon: Heart,
    title: "Nos casamos",
    message: "Queremos compartir este día contigo.",
    cover: "linear-gradient(170deg,#2520B6 0%,#4A43CF 62%,#8C87E0 100%)",
  },
  {
    id: "cumpleanos",
    label: "Cumpleaños",
    icon: Cake,
    title: "Celebremos juntos",
    message: "Una noche para reunirnos y celebrar.",
    cover: "linear-gradient(160deg,#110D5C 0%,#2520B6 70%,#5B55D6 100%)",
  },
  {
    id: "baby-shower",
    label: "Baby shower",
    icon: Baby,
    title: "Baby shower",
    message: "Estamos esperando a alguien muy especial.",
    cover: "linear-gradient(170deg,#2446C8 0%,#3F5BD6 62%,#8C99E6 100%)",
  },
  {
    id: "bautizo",
    label: "Bautizo",
    icon: Sparkle,
    title: "Mi bautizo",
    message: "Acompáñanos en este día tan especial.",
    cover: "linear-gradient(170deg,#2F29BE 0%,#5049CF 62%,#9A96E3 100%)",
  },
  {
    id: "aniversario",
    label: "Aniversario",
    icon: Champagne,
    title: "Nuestro aniversario",
    message: "Celebremos juntos un año más de historia.",
    cover: "linear-gradient(160deg,#1F19B4 0%,#0E05B3 45%,#4B44CF 100%)",
  },
];

// A working miniature of an invitation (not a screenshot): switching the
// event type re-themes it and the RSVP button responds like the real one.
// Sample event date for the demo: the first Saturday at least ten days away,
// 7:00 p. m. local time. Computed on the client so it is always in the future.
function sampleEventDate() {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7));
  date.setHours(19, 0, 0, 0);
  return date;
}

function Countdown() {
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);

  useEffect(() => {
    const target = sampleEventDate().getTime();
    const tick = () => {
      const ms = Math.max(target - Date.now(), 0);
      setLeft({
        d: Math.floor(ms / 86_400_000),
        h: Math.floor(ms / 3_600_000) % 24,
        m: Math.floor(ms / 60_000) % 60,
      });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const cells = [
    { value: left?.d, label: "días" },
    { value: left?.h, label: "horas" },
    { value: left?.m, label: "min" },
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-2" aria-label="Cuenta regresiva de ejemplo">
      {cells.map((cell) => (
        <div key={cell.label} className="rounded-field bg-lavender-mist px-2 py-2.5 text-center">
          <span className="block text-[1.25rem] leading-none font-semibold tabular-nums">
            {cell.value === undefined ? "00" : String(cell.value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-[0.75rem] text-ink-muted">{cell.label}</span>
        </div>
      ))}
    </div>
  );
}

function InvitationPreview({ invite }: { invite: (typeof invitations)[number] }) {
  const [confirmed, setConfirmed] = useState(false);
  const Icon = invite.icon;

  return (
    <div className="relative w-[16.5rem] rounded-[2.75rem] bg-ink p-2.5 shadow-[0_40px_80px_-40px_rgba(17,13,92,0.55)] md:w-[17.5rem]">
      <div className="relative h-[33rem] overflow-hidden rounded-[2.25rem] bg-paper md:h-[35rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={invite.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col"
          >
            <div
              className="relative grid h-[34%] place-items-center text-paper"
              style={{ backgroundImage: invite.cover }}
            >
              <div className="flex flex-col items-center gap-2.5 pt-4">
                <Icon aria-hidden weight="light" className="size-12" />
                <p className="text-[0.8125rem] font-medium tracking-[0.02em] text-paper">Tienes una invitación</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
              <p className="text-[1.625rem] leading-[1.05] font-semibold tracking-[-0.03em]">{invite.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-muted">{invite.message}</p>
              <Countdown />
              <ul className="mt-4 space-y-2 text-[0.875rem] text-ink">
                <li className="flex items-center gap-2.5">
                  <CalendarBlank aria-hidden className="size-[18px] text-indigo" />
                  Sábado, 7:00 p. m.
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin aria-hidden className="size-[18px] text-indigo" />
                  Ver ubicación
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setConfirmed((value) => !value)}
                aria-pressed={confirmed}
                className={`mt-auto flex h-11 items-center justify-center gap-2 rounded-full text-[0.875rem] font-medium transition-[background-color,color,transform] duration-300 ease-out-expo active:scale-[0.97] ${
                  confirmed ? "bg-lavender-mist text-indigo" : "bg-indigo text-paper hover:bg-indigo-deep"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={confirmed ? "si" : "no"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    {confirmed && <Check aria-hidden weight="bold" className="size-4" />}
                    {confirmed ? "Asistencia confirmada" : "Confirmar asistencia"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Events() {
  const [selected, setSelected] = useState(invitations[0]);

  return (
    <section id="eventos" aria-labelledby="events-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-panel bg-[radial-gradient(90%_70%_at_100%_100%,var(--color-lavender-soft)_0%,rgba(226,225,246,0)_70%),linear-gradient(180deg,var(--color-lavender-mist),var(--color-canvas))] px-6 pt-12 md:px-12 md:pt-16 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6 lg:pb-20">
              <Reveal>
                <p className="text-eyebrow">Invitaciones digitales</p>
                <h2 id="events-title" className="text-h2 mt-4 max-w-[14ch]">
                  Tu evento comienza antes del gran día.
                </h2>
                <p className="text-lead mt-6 max-w-[34rem]">
                  Creamos invitaciones digitales que no solo informan. Presentan tu historia, generan expectativa y
                  convierten una invitación en una experiencia.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <p id="event-type-label" className="mt-10 text-sm font-medium text-ink-muted">
                  Elige un tipo de evento
                </p>
                <div role="group" aria-labelledby="event-type-label" className="mt-3 flex flex-wrap gap-2">
                  {invitations.map((invite) => {
                    const isSelected = invite.id === selected.id;
                    return (
                      <button
                        key={invite.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(invite)}
                        className={`relative h-10 rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                          isSelected ? "text-paper" : "border border-line bg-paper/80 text-ink-muted hover:text-ink"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="event-pill"
                            aria-hidden
                            className="absolute inset-0 rounded-full bg-indigo"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative">{invite.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                  También para celebraciones y eventos especiales.
                </p>
              </Reveal>
            </div>

            <div className="relative flex min-h-[36rem] items-end justify-center lg:col-span-6 lg:justify-start xl:pl-6">
              <Reveal className="relative z-10 mb-10 md:mb-14">
                <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-ink-muted">
                  <Eye aria-hidden className="size-4 text-indigo" />
                  Vista de ejemplo, sin datos reales
                </p>
                <InvitationPreview invite={selected} />
                <p className="sr-only" aria-live="polite">
                  Vista de ejemplo: invitación de {selected.label.toLowerCase()}
                </p>
              </Reveal>
              {/* She rises from the bottom edge, just behind the phone. Narrower
                  from 1024 to 1279 px, where the column is tight, so the phone
                  never covers her face. */}
              <Reveal
                delay={0.15}
                className="absolute right-0 bottom-0 z-0 hidden w-[11rem] sm:block md:w-[13rem] lg:w-[10rem] xl:w-[13rem]"
              >
                <Avatar name="events" sizes="208px" className="ml-auto w-full" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
