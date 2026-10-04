import { Button } from "../Button";
import { HeroMascot } from "./HeroMascot";

const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div className="shell grid items-center gap-14 pt-8 pb-20 md:pt-14 lg:min-h-[min(calc(100dvh-68px),56rem)] lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-16 lg:pt-6 lg:pb-14">
        <div className="max-w-[44rem]">
          <h1 id="hero-title" className="text-display rise" style={rise(0)}>
            Soluciones digitales que convierten <span className="text-indigo">ideas en experiencias.</span>
          </h1>
          <p className="text-lead rise mt-6 max-w-[34rem]" style={rise(0.08)}>
            Desarrollamos sitios web, landing pages, dashboards y soluciones digitales a medida para empresas, marcas y
            negocios.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={rise(0.16)}>
            <Button href="#proyectos" arrow>
              Ver proyectos
            </Button>
            <Button href="#contacto" variant="secondary">
              Hablemos
            </Button>
          </div>
        </div>

        <HeroMascot />
      </div>
    </section>
  );
}
