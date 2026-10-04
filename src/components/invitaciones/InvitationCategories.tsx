import { Baby, Cake } from "@phosphor-icons/react/dist/ssr";
import { categoryById, type InvitationCategoryId } from "@/content/invitaciones";
import { projectsInCategory } from "@/content/projects";
import { Reveal } from "../Reveal";
import { BrowserFrame, Caption, external, ViewLink } from "../sections/Portfolio";

// Catalog categories: same hierarchy as each other, below Matrimonios.
const catalog: { id: Exclude<InvitationCategoryId, "matrimonios">; title: string; lead: string; icon: typeof Cake; tone: string }[] = [
  {
    id: "cumpleanos",
    title: "Invitaciones de cumpleaños",
    lead: "Para celebrar un año más con una invitación a tu estilo, con cuenta regresiva, ubicación y confirmación de asistencia.",
    icon: Cake,
    tone: "border border-line bg-paper",
  },
  {
    id: "baby-showers",
    title: "Invitaciones para baby showers",
    lead: "Para anunciar una llegada muy esperada: la historia de la espera, la cuenta regresiva y la confirmación de tus invitados.",
    icon: Baby,
    tone: "bg-[linear-gradient(180deg,var(--color-lavender-mist)_0%,var(--color-lavender-soft)_100%)]",
  },
];

/*
  Cumpleaños and Baby showers, side by side on wide screens (in that order,
  stacked on mobile). Each is its own section with its own anchor and shows
  the real projects of its category with the shared portfolio card pieces.
*/
export function InvitationCategories() {
  const categories = catalog
    .map((entry) => ({ ...entry, projects: projectsInCategory(entry.id), anchor: categoryById(entry.id).anchor }))
    .filter((entry) => entry.projects.length > 0);
  if (categories.length === 0) return null;

  return (
    <div className="pb-24 md:pb-32">
      <div className="shell grid gap-6 md:grid-cols-2 md:gap-8">
        {categories.map(({ id, anchor, title, lead, icon: Icon, tone, projects }, index) => (
          // The section (anchor target) is never transformed: the reveal
          // animation runs on its children, so in-page links land exactly.
          <section
            key={id}
            id={anchor}
            aria-labelledby={`${anchor}-title`}
            className={`row-span-2 grid grid-rows-subgrid gap-y-8 rounded-panel p-6 sm:p-8 lg:p-10 ${tone}`}
          >
            <Reveal delay={0.06 * index}>
              <span className="grid size-12 place-items-center rounded-full bg-paper text-indigo shadow-[0_8px_24px_-14px_rgba(37,32,182,0.45)]">
                <Icon aria-hidden weight="light" className="size-6" />
              </span>
              <h2
                id={`${anchor}-title`}
                className="mt-6 text-[clamp(1.75rem,1.4rem+1.1vw,2.375rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
              >
                {title}
              </h2>
              <p className="mt-4 max-w-[44ch] text-ink-muted">{lead}</p>
            </Reveal>
            <ul className="grid gap-10">
              {projects.map((project) => (
                <Reveal as="li" key={project.href} delay={0.06 * index + 0.06}>
                  <a href={project.href} {...external} className="group grid gap-4 rounded-[20px]">
                    <BrowserFrame
                      project={project}
                      sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, calc(100vw - 88px)"
                    />
                    <Caption project={project} />
                    <ViewLink label="Ver invitación" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
