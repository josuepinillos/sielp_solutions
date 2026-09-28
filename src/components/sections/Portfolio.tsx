import Image from "next/image";
import { ArrowRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "../Reveal";

// A quiet browser window around a real screenshot of the published site.
// The frame, not the capture, sets the size: every card gets the same width
// and a fixed 16:10 viewport, and the capture fills it with object-cover
// (never stretched). On hover the card lifts a little and the capture zooms.
function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-paper shadow-[0_28px_60px_-40px_rgba(23,21,63,0.35)] transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_36px_72px_-38px_rgba(23,21,63,0.45)]">
      <div aria-hidden className="flex h-8 items-center border-b border-line px-3.5 md:h-9">
        <div className="flex w-9 shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-ink/12" />
          <span className="size-2 rounded-full bg-ink/12" />
          <span className="size-2 rounded-full bg-ink/12" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-canvas px-3 py-0.5 text-[0.75rem] text-ink-soft">
          <LockSimple className="size-3 shrink-0" />
          <span className="truncate">{project.domain}</span>
        </div>
        <div className="w-9 shrink-0" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-lavender-mist">
        <Image
          {...project.image}
          quality={85}
          sizes="(min-width: 1280px) 376px, (min-width: 768px) 340px, calc(100vw - 40px)"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group row-span-3 grid grid-rows-subgrid gap-y-4 rounded-[20px]"
    >
      <BrowserFrame project={project} />
      <div className="pt-2">
        <h3 className="text-h3">{project.domain}</h3>
        <p className="mt-1 text-[0.9375rem] font-medium text-indigo">{project.label}</p>
        <p className="mt-3 max-w-[46ch] text-ink-muted">{project.description}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 self-start font-medium text-ink transition-colors duration-300 group-hover:text-indigo">
        Ver proyecto
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </span>
    </a>
  );
}

// The section presents the latest work only; projects.ts lists newest first.
const LATEST = 3;

export function Portfolio() {
  const latest = projects.slice(0, LATEST);
  if (latest.length === 0) return null;

  const title = latest.length === 1 ? "Nuestro último proyecto." : `Nuestros ${latest.length} últimos proyectos.`;
  const oddCount = latest.length % 2 === 1;

  return (
    <section id="proyectos" aria-labelledby="portfolio-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="portfolio-title" className="text-h2 max-w-[28ch]">
            {title}
          </h2>
          <p className="text-lead mt-6 max-w-[34rem]">
            Una muestra de las experiencias digitales que hemos diseñado y desarrollado recientemente.
          </p>
        </Reveal>

        {/* Same-size collection: equal columns, and each card spans three subgrid
            rows (preview, text, link) so previews, captions and links line up.
            Tablet: two columns, with an odd last card centered at the same width. */}
        <ul className="mt-14 grid gap-x-6 gap-y-16 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {latest.map((project, index) => {
            const centered = oddCount && index === latest.length - 1;
            return (
              <Reveal
                as="li"
                key={project.domain}
                delay={0.08 * index}
                className={`row-span-3 grid grid-rows-subgrid gap-y-4 ${
                  centered
                    ? "md:col-span-2 md:w-[calc((100%-1.5rem)/2)] md:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-stretch"
                    : ""
                }`}
              >
                <ProjectCard project={project} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
