import Image from "next/image";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { plans } from "@/content/invitaciones";
import { projectsInCategory, type Project } from "@/content/projects";
import { buttonClass } from "../Button";
import { Reveal } from "../Reveal";
import { BrowserFrame, external } from "../sections/Portfolio";

// Side buttons of the iPhone mockup, as % of the device (left: action and
// volume; right: power). Drawn just outside the titanium band.
const sideButtons = [
  { side: "left", top: "17%", height: "3.5%" },
  { side: "left", top: "24%", height: "6.5%" },
  { side: "left", top: "32.5%", height: "6.5%" },
  { side: "right", top: "26%", height: "10.5%" },
] as const;

/*
  An iPhone (Pro proportions) around a real mobile capture of the published
  invitation: titanium band, thin bezel, continuous corners and Dynamic Island.
  Sizes are percentages, so it scales with its container.
*/
function PhoneFrame({ image }: { image: NonNullable<Project["mobileImage"]> }) {
  return (
    <div className="relative">
      {sideButtons.map(({ side, top, height }) => (
        <span
          key={`${side}-${top}`}
          aria-hidden
          className={`absolute w-[1.6%] bg-[linear-gradient(90deg,#2a2a2f,#4a4a52)] ${
            side === "left" ? "-left-[1.1%] rounded-l-full" : "-right-[1.1%] rounded-r-full"
          }`}
          style={{ top, height }}
        />
      ))}
      {/* Titanium band with a soft highlight, then the black bezel. */}
      <div className="relative rounded-[16%/7.4%] bg-[linear-gradient(145deg,#56565e_0%,#2b2b31_22%,#1c1c21_55%,#3b3b42_100%)] p-[1.4%] shadow-[0_40px_70px_-28px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="rounded-[15%/6.9%] bg-black p-[2.4%]">
          <div className="relative aspect-[390/844] overflow-hidden rounded-[12.5%/5.8%] bg-black">
            <Image
              {...image}
              quality={85}
              sizes="(min-width: 1024px) 216px, 36vw"
              className="h-full w-full object-cover object-top"
            />
            {/* Dynamic Island */}
            <span
              aria-hidden
              className="absolute top-[1.5%] left-1/2 h-[3.9%] w-[31%] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  The Plan Plus, shown through its demo. The demo is a Sielp project (not a
  client's): the card says "Demo" and opens the real, public invitation in a
  new tab. Nothing from the demo is embedded; only real captures are shown, so
  the external site never loads until the visitor asks for it.

  Mobile order: intro, preview, what it includes, call to action.
*/
function PlanShowcase({ project }: { project: Project }) {
  const plan = project.plan ? plans[project.plan] : null;

  return (
    <div className="grid gap-10 overflow-hidden rounded-panel bg-[radial-gradient(60%_70%_at_85%_20%,rgba(106,97,220,0.45)_0%,rgba(106,97,220,0)_70%),linear-gradient(140deg,var(--color-indigo-night)_0%,var(--color-indigo-deep)_100%)] px-6 py-10 text-paper sm:px-10 md:py-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8 lg:px-12 lg:py-16">
      <div className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2">
          {plan && (
            <span className="rounded-full bg-lavender px-3 py-1 text-[0.8125rem] font-semibold text-indigo-night">
              {plan.name}
            </span>
          )}
          {project.demo && (
            <span className="rounded-full border border-lavender/40 px-3 py-1 text-[0.8125rem] font-medium text-lavender-soft">
              Demo
            </span>
          )}
        </div>
        <h3 className="mt-6 text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
          {project.name}
        </h3>
        {project.title && <p className="mt-2 text-[1.25rem] text-lavender">{project.title}</p>}
        <p className="mt-5 max-w-[38ch] text-[1.0625rem] leading-relaxed text-lavender-soft">{project.description}</p>
      </div>

      {/* The preview is a doorway to the real invitation (the button below is
          the accessible way in, so this link is skipped by keyboard and readers). */}
      <a
        href={project.href}
        {...external}
        tabIndex={-1}
        aria-hidden
        className="group relative -mx-2 block pb-[22%] pl-[12%] sm:mx-0 sm:pb-[16%] lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1 lg:self-center lg:pb-[14%] lg:pl-[9%]"
      >
        <BrowserFrame project={project} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 90vw" />
        {project.mobileImage && (
          // Larger on phones, where invitations are actually opened.
          <div className="absolute bottom-0 left-0 w-[36%] max-w-[13.5rem] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1.5 sm:w-[30%] lg:w-[29%]">
            <PhoneFrame image={project.mobileImage} />
          </div>
        )}
      </a>

      {project.highlights && (
        <div className="lg:col-span-5">
          <h4 className="text-[0.9375rem] font-semibold text-lavender">Incluye esta demo</h4>
          {/* One column on desktop; on tablet, flowing columns (not a grid), so
              a two-line item never stretches the row next to it. */}
          <ul className="mt-4 gap-x-8 sm:columns-2 lg:columns-1">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="mb-2.5 flex break-inside-avoid gap-2.5 text-[0.9375rem] leading-snug text-lavender-soft last:mb-0"
              >
                <Check aria-hidden weight="bold" className="mt-0.5 size-4 shrink-0 text-lavender" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="lg:col-span-5">
        <a href={project.href} {...external} className={buttonClass("inverse", "group")}>
          Ver invitación
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only">
            : demo del {plan?.name ?? "plan"} de {project.name} (se abre en una pestaña nueva)
          </span>
        </a>
        {project.demo && (
          <p className="mt-4 max-w-[40ch] text-sm text-lavender-soft/80">
            Proyecto propio de Sielp, creado como demostración del {plan?.name ?? "plan"}.
          </p>
        )}
      </div>
    </div>
  );
}

export function WeddingSection() {
  const featured = projectsInCategory("matrimonios");
  if (featured.length === 0) return null;

  return (
    <section id="matrimonios" aria-labelledby="weddings-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="weddings-title" className="text-h2 max-w-[16ch]">
            Invitaciones de matrimonio
          </h2>
          <p className="text-lead mt-6 max-w-[38rem]">
            Experiencias digitales diseñadas para contar su historia y acompañar cada momento de su gran día.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:mt-16">
          {featured.map((project) => (
            <Reveal key={project.href}>
              <PlanShowcase project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
