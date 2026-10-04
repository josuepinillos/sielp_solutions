import Image from "next/image";
import { ArrowRight, LockSimple } from "@phosphor-icons/react/dist/ssr";
import { categoryById } from "@/content/invitaciones";
import type { Project } from "@/content/projects";
import { Reveal } from "../Reveal";

// A quiet browser window around a real screenshot of the published site.
// The frame, not the capture, sets the size: a fixed 16:10 viewport the
// capture fills with object-cover (never stretched). On hover the card lifts a
// little and the capture zooms. Shared with the invitation categories.
export function BrowserFrame({ project, sizes }: { project: Project; sizes: string }) {
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
          sizes={sizes}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
        />
      </div>
    </div>
  );
}

export function Caption({ project }: { project: Project }) {
  return (
    <div className="pt-2">
      <h3 className="text-h3">{project.domain}</h3>
      <p className="mt-1 text-[0.9375rem] font-medium text-indigo">
        {project.label}
        {project.category && <span className="text-ink-muted"> · {categoryById(project.category).singular}</span>}
      </p>
      <p className="mt-3 max-w-[46ch] text-ink-muted">{project.description}</p>
    </div>
  );
}

export function ViewLink({ label = "Ver proyecto" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 self-start font-medium text-ink transition-colors duration-300 group-hover:text-indigo">
      {label}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
      />
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </span>
  );
}

export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/*
  Real projects of one line (see src/content/projects.ts). The layout adapts to
  how many there are, so a short list never needs filler:
  - 1 project: a featured row, preview and text side by side.
  - 2-3 projects: equal columns; each card spans three subgrid rows (preview,
    text, link) so previews, captions and links line up across cards.
*/
export function Portfolio({ projects, title, lead }: { projects: Project[]; title: string; lead: string }) {
  if (projects.length === 0) return null;

  return (
    <section id="proyectos" aria-labelledby="portfolio-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <Reveal>
          <h2 id="portfolio-title" className="text-h2 max-w-[28ch]">
            {title}
          </h2>
          <p className="text-lead mt-6 max-w-[34rem]">{lead}</p>
        </Reveal>

        {projects.length === 1 ? (
          <Reveal className="mt-14 md:mt-20">
            <a
              href={projects[0].href}
              {...external}
              className="group grid items-center gap-8 rounded-[20px] md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-12 lg:gap-16"
            >
              <BrowserFrame project={projects[0]} sizes="(min-width: 1280px) 680px, (min-width: 768px) 58vw, calc(100vw - 40px)" />
              <div className="flex flex-col gap-4">
                <Caption project={projects[0]} />
                <ViewLink />
              </div>
            </a>
          </Reveal>
        ) : (
          <ul
            className={`mt-14 grid gap-x-6 gap-y-16 md:mt-20 md:grid-cols-2 lg:gap-x-8 ${
              projects.length >= 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {projects.map((project, index) => {
              // Tablet with three projects: the odd last card centered at the same width.
              const centered = projects.length === 3 && index === 2;
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
                  <a href={project.href} {...external} className="group row-span-3 grid grid-rows-subgrid gap-y-4 rounded-[20px]">
                    <BrowserFrame
                      project={project}
                      sizes={
                        projects.length >= 3
                          ? "(min-width: 1280px) 376px, (min-width: 768px) 340px, calc(100vw - 40px)"
                          : "(min-width: 1280px) 580px, (min-width: 768px) 46vw, calc(100vw - 40px)"
                      }
                    />
                    <Caption project={project} />
                    <ViewLink />
                  </a>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
