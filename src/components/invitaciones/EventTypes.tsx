import { Baby, Cake, Champagne, Confetti, Drop, Heart, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../Reveal";

// Migrated from the home ("Experiencias para eventos") and the demo's event types.
const eventTypes = [
  { label: "Matrimonios", icon: Heart },
  { label: "Cumpleaños", icon: Cake },
  { label: "Baby showers", icon: Baby },
  { label: "Bautizos", icon: Drop },
  { label: "Aniversarios", icon: Champagne },
  { label: "Celebraciones", icon: Confetti },
  { label: "Eventos especiales", icon: Sparkle },
];

export function EventTypes() {
  return (
    <section id="eventos" aria-labelledby="event-types-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="event-types-title" className="text-h2 max-w-[16ch]">
            Para cada celebración.
          </h2>
          <p className="text-lead mt-6 max-w-[38rem]">
            Diseñamos invitaciones para los momentos que quieres compartir con las personas que más importan.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 sm:grid-cols-4 md:mt-20 lg:grid-cols-7 lg:gap-x-6">
          {eventTypes.map(({ label, icon: Icon }, index) => (
            <Reveal
              as="li"
              key={label}
              delay={0.04 * index}
              className={`flex items-center gap-3 border-t border-line py-5 lg:flex-col lg:items-start lg:gap-6 lg:pt-6 lg:pb-2 ${
                index === eventTypes.length - 1 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <Icon aria-hidden weight="light" className="size-7 shrink-0 text-indigo lg:size-9" />
              <span className="text-[1.0625rem] leading-snug font-medium tracking-[-0.015em] lg:text-[1.25rem]">
                {label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
