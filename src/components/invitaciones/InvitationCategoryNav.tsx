import { ArrowDown, Baby, Cake, Heart } from "@phosphor-icons/react/dist/ssr";
import { invitationCategories, plans, type InvitationCategoryId } from "@/content/invitaciones";
import { Reveal } from "../Reveal";

const icons: Record<InvitationCategoryId, typeof Heart> = {
  matrimonios: Heart,
  cumpleanos: Cake,
  "baby-showers": Baby,
};

const descriptors: Record<InvitationCategoryId, string> = {
  matrimonios: `Demo del ${plans.plus.name}`,
  cumpleanos: "Ver invitaciones",
  "baby-showers": "Ver invitaciones",
};

/*
  "Elige el tipo de evento": a quick way into each category of the page.
  Matrimonios leads (wider, in indigo) because it holds the Plan Plus demo.
*/
export function InvitationCategoryNav() {
  return (
    <nav aria-labelledby="category-nav-title" className="pt-16 md:pt-20">
      <div className="shell">
        <Reveal>
          <h2 id="category-nav-title" className="text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">
            Elige el tipo de evento.
          </h2>
        </Reveal>
        <ul className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4">
          {invitationCategories.map((category, index) => {
            const Icon = icons[category.id];
            const lead = index === 0;
            return (
              <Reveal as="li" key={category.id} delay={0.05 * index}>
                <a
                  href={`#${category.anchor}`}
                  className={`group flex h-full min-h-[5.5rem] items-center gap-4 rounded-panel px-5 py-4 transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 md:px-6 ${
                    lead
                      ? "bg-[linear-gradient(135deg,var(--color-indigo-night)_0%,var(--color-indigo-deep)_100%)] text-paper shadow-[0_24px_48px_-32px_rgba(17,13,92,0.8)]"
                      : "border border-line bg-paper hover:border-indigo/30"
                  }`}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-full ${
                      lead ? "bg-paper/10 text-lavender" : "bg-lavender-mist text-indigo"
                    }`}
                  >
                    <Icon aria-hidden weight="light" className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.125rem] leading-tight font-semibold tracking-[-0.015em]">
                      {category.label}
                    </span>
                    <span className={`mt-1 block text-sm ${lead ? "text-lavender-soft" : "text-ink-muted"}`}>
                      {descriptors[category.id]}
                    </span>
                  </span>
                  <ArrowDown
                    aria-hidden
                    className={`size-5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5 ${
                      lead ? "text-lavender" : "text-ink-soft group-hover:text-indigo"
                    }`}
                  />
                </a>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-5 text-sm text-ink-muted">
          También diseñamos invitaciones para bautizos, aniversarios y otras celebraciones.
        </p>
      </div>
    </nav>
  );
}
