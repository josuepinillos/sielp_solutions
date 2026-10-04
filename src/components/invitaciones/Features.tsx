import { BookOpen, CalendarBlank, HourglassMedium, MapPin, PaintBrush, UserCheck } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../Reveal";

/*
  What an invitation can include. Only features that Sielp's published
  invitations actually have (josueyclaudia.com, kevyndavila.com): event
  details, countdown, Google Maps location, RSVP with the guest's name, a story
  section and interactive details with sound.
*/
const features = [
  {
    title: "Diseño a la medida",
    body: "Colores, tipografías e imágenes pensados para tu celebración y su estilo.",
    icon: PaintBrush,
  },
  {
    title: "Fecha, hora y lugar",
    body: "Toda la información del evento, clara y siempre a mano.",
    icon: CalendarBlank,
  },
  {
    title: "Cuenta regresiva",
    body: "Para que tus invitados vivan la espera contigo.",
    icon: HourglassMedium,
  },
  {
    title: "Ubicación",
    body: "Un enlace directo a Google Maps para llegar sin complicaciones.",
    icon: MapPin,
  },
  {
    title: "Confirmación de asistencia",
    body: "Tus invitados confirman con su nombre desde la misma invitación.",
    icon: UserCheck,
  },
  {
    title: "Tu historia",
    body: "Secciones para contar lo que celebras y detalles interactivos, como animaciones o sonido.",
    icon: BookOpen,
  },
];

export function Features() {
  return (
    <section id="incluye" aria-labelledby="features-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="features-title" className="text-h2 max-w-[18ch]">
            Todo lo que tus invitados necesitan, en un enlace.
          </h2>
          <p className="text-lead mt-6 max-w-[38rem]">
            Cada invitación se diseña a medida. Estos son algunos de los elementos que puede incluir.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }, index) => {
            // The first tile leads in brand indigo; the rest stay light.
            const lead = index === 0;
            return (
              <Reveal
                as="li"
                key={title}
                delay={0.05 * index}
                className={`flex min-h-[15rem] flex-col justify-between gap-10 rounded-panel p-7 md:p-8 ${
                  lead
                    ? "bg-[linear-gradient(150deg,var(--color-indigo-night)_0%,var(--color-indigo-deep)_100%)] text-paper"
                    : "border border-line bg-paper"
                }`}
              >
                <span
                  className={`grid size-12 place-items-center rounded-full ${
                    lead ? "bg-paper/10 text-lavender" : "bg-lavender-mist text-indigo"
                  }`}
                >
                  <Icon aria-hidden weight="light" className="size-6" />
                </span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className={`mt-2 max-w-[34ch] ${lead ? "text-lavender-soft" : "text-ink-muted"}`}>{body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
