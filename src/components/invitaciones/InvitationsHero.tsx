"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Eye } from "@phosphor-icons/react";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { demoInvitations, InvitationPreview } from "./InvitationPreview";

const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as React.CSSProperties;

/*
  Hero of the invitations line. The live demo is the visual: the visitor
  picks an event type and the sample invitation on the phone re-themes, with
  its countdown, location and RSVP. (Formerly the "Experiencias para eventos"
  section of the home.)
*/
export function InvitationsHero() {
  const [selected, setSelected] = useState(demoInvitations[0]);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="pt-4 md:pt-6">
      <div className="shell">
        <div className="relative overflow-hidden rounded-panel bg-[radial-gradient(90%_70%_at_100%_100%,var(--color-lavender-soft)_0%,rgba(226,225,246,0)_70%),linear-gradient(180deg,var(--color-lavender-mist),var(--color-canvas))] px-6 pt-12 md:px-12 md:pt-16 lg:px-16">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6 lg:pb-16">
              <h1 id="hero-title" className="rise" style={rise(0)}>
                <span className="text-eyebrow block">Invitaciones digitales</span>
                <span className="sr-only">: </span>
                <span className="text-display mt-4 block max-w-[14ch]">Tu evento comienza antes del gran día.</span>
              </h1>
              <p className="text-lead rise mt-6 max-w-[34rem]" style={rise(0.08)}>
                Creamos invitaciones digitales que no solo informan. Presentan tu historia, generan expectativa y
                convierten una invitación en una experiencia.
              </p>
              <div className="rise mt-8 flex flex-wrap gap-3" style={rise(0.16)}>
                <Button href="#contacto" arrow>
                  Cuéntanos sobre tu evento
                </Button>
                <Button href="#matrimonios" variant="secondary">
                  Ver invitaciones
                </Button>
              </div>

              <div className="rise mt-12" style={rise(0.24)}>
                <p id="event-type-label" className="text-sm font-medium text-ink-muted">
                  Prueba el ejemplo: elige un tipo de evento
                </p>
                <div role="group" aria-labelledby="event-type-label" className="mt-3 flex flex-wrap gap-2">
                  {demoInvitations.map((invite) => {
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
              </div>
            </div>

            <div className="relative flex min-h-[36rem] items-end justify-center lg:col-span-6 lg:justify-start xl:pl-6">
              <div className="rise relative z-10 mb-10 md:mb-14" style={rise(0.2)}>
                <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-ink-muted">
                  <Eye aria-hidden className="size-4 text-indigo" />
                  Vista de ejemplo, sin datos reales
                </p>
                <InvitationPreview invite={selected} />
                <p className="sr-only" aria-live="polite">
                  Vista de ejemplo: invitación de {selected.label.toLowerCase()}
                </p>
              </div>
              {/* She rises from the bottom edge, just behind the phone. Narrower
                  from 1024 to 1279 px, where the column is tight, so the phone
                  never covers her face. */}
              <div
                className="rise absolute right-0 bottom-0 z-0 hidden w-[11rem] sm:block md:w-[13rem] lg:w-[10rem] xl:w-[13rem]"
                style={rise(0.35)}
              >
                <Avatar name="events" sizes="208px" className="ml-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
