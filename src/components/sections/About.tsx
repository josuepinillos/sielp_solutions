import { Avatar } from "../Avatar";
import { Reveal } from "../Reveal";

const beliefs = [
  { strong: "La tecnología", rest: " es el medio." },
  { strong: "El diseño", rest: " es parte del producto." },
  { strong: "La experiencia", rest: " es el resultado." },
];

export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-title" className="anchor-section pb-24 md:pb-32">
      <div className="shell">
        <div className="mx-auto max-w-[58rem] text-center">
          {/* She sits on the rule that opens the section. */}
          <Reveal className="relative">
            <Avatar
              name="idea"
              sizes="(min-width: 768px) 224px, 184px"
              className="mx-auto w-[11.5rem] md:w-[14rem]"
            />
            <div aria-hidden className="h-px bg-line" />
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="about-title" className="text-h2 mt-12 md:mt-14">
              Digitalizamos ideas. Diseñamos experiencias.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lead mx-auto mt-6 max-w-[40rem]">
              Sielp Solutions es una empresa de soluciones digitales. Trabajamos con empresas y marcas que quieren
              comunicar mejor, y con personas que quieren compartir sus momentos importantes de una forma especial.
            </p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-20 max-w-[58rem] space-y-1 text-center md:mt-24">
          {beliefs.map((line, index) => (
            <Reveal as="li" key={line.strong} delay={0.08 * index}>
              <p className="text-[clamp(1.625rem,1.1rem+1.9vw,2.625rem)] leading-[1.18] font-medium tracking-[-0.03em] text-ink-soft">
                <span className="text-ink">{line.strong}</span>
                {line.rest}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
