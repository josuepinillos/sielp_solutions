"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Baby, Cake, CalendarBlank, Champagne, Check, Drop, Heart, MapPin } from "@phosphor-icons/react";

// Sample event types for the live demo (no real data).
export const demoInvitations = [
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
    icon: Drop,
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

export type DemoInvitation = (typeof demoInvitations)[number];

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

// A working miniature of an invitation (not a screenshot): switching the
// event type re-themes it and the RSVP button responds like the real one.
export function InvitationPreview({ invite }: { invite: DemoInvitation }) {
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
