import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { latestProjects } from "@/content/projects";
import { homeNav, routes, site } from "@/content/site";

// Home: the main line of Sielp Solutions, digital solutions for businesses.
export const metadata: Metadata = {
  title: { absolute: "Sielp Solutions | Desarrollo web y soluciones digitales para empresas" },
  description: site.description,
  alternates: { canonical: routes.home },
  openGraph: {
    title: "Sielp Solutions | Soluciones digitales para empresas, marcas y negocios",
    description: site.description,
    url: routes.home,
  },
};

export default function Home() {
  const projects = latestProjects("empresas");

  return (
    <>
      <Header nav={homeNav} secondary={{ label: "Invitaciones digitales", href: routes.invitations }} />
      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Portfolio
          projects={projects}
          title={projects.length === 1 ? "Nuestro proyecto más reciente." : `Nuestros ${projects.length} últimos proyectos.`}
          lead="Una muestra del trabajo que diseñamos y desarrollamos para empresas, marcas y profesionales."
        />
        <Process />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
