import { testimonials } from "@/content/testimonials";
import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

// Hidden until real testimonials exist (see src/content/testimonials.ts).
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id="testimonials-title" className="text-h2">
              Experiencias reales.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Avatar name="testimonial" sizes="208px" className="mt-10 w-[11rem] md:w-[13rem]" />
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid gap-5 md:grid-cols-2">
            {testimonials.map((item, index) => (
              <Reveal
                as="li"
                key={item.name}
                delay={0.06 * index}
                className={index === 0 && testimonials.length % 2 === 1 ? "md:col-span-2" : ""}
              >
                <figure className="flex h-full flex-col justify-between rounded-panel border border-line bg-paper p-8 md:p-10">
                  <blockquote className="text-[1.375rem] leading-[1.35] font-medium tracking-[-0.02em] text-ink">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-8 text-[0.9375rem]">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="text-ink-muted">
                      {item.role}
                      {item.company ? `, ${item.company}` : ""}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
