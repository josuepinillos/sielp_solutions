import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { EventTypes } from "@/components/invitaciones/EventTypes";
import { Features } from "@/components/invitaciones/Features";
import { InvitationsHero } from "@/components/invitaciones/InvitationsHero";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process, type ProcessStep } from "@/components/sections/Process";
import { latestProjects } from "@/content/projects";
import { invitationsNav, routes } from "@/content/site";

// Secondary line of Sielp Solutions: digital invitations for events.
const description =
  "Invitaciones digitales personalizadas para matrimonios, cumpleaños, baby showers, bautizos y aniversarios, con cuenta regresiva, ubicación y confirmación de asistencia.";

export const metadata: Metadata = {
  title: { absolute: "Invitaciones digitales | Sielp Solutions" },
  description,
  alternates: { canonical: routes.invitations },
  openGraph: {
    title: "Invitaciones digitales | Sielp Solutions",
    description,
    url: routes.invitations,
  },
};

const steps: ProcessStep[] = [
  { title: "Cuéntanos tu evento", body: "Qué celebras, cuándo y dónde, y cómo te imaginas la invitación." },
  { title: "Definimos el estilo", body: "Elegimos juntos la estética, los textos y las secciones que tendrá." },
  { title: "Diseñamos y desarrollamos", body: "Creamos tu invitación a medida, lista para verse bien en cualquier celular." },
  { title: "Revisamos contigo", body: "Ajustamos cada detalle hasta que quede como la imaginaste." },
  { title: "Publicamos y compartes", body: "Te entregamos el enlace para que lo envíes a tus invitados." },
];

export default function InvitacionesDigitales() {
  return (
    <>
      <Header
        nav={invitationsNav}
        brandHref={routes.home}
        division="Invitaciones digitales"
        secondary={{ label: "Soluciones para empresas", href: routes.home }}
      />
      <main id="contenido">
        <InvitationsHero />
        <EventTypes />
        <Features />
        <Portfolio
          projects={latestProjects("invitaciones")}
          title="Invitaciones que hemos creado."
          lead="Invitaciones reales, diseñadas y desarrolladas por Sielp para celebraciones recientes."
        />
        <Process
          title="De tu idea al enlace que compartes."
          lead="Te acompañamos desde la primera conversación hasta que envías tu invitación."
          steps={steps}
        />
        <FinalCta
          title={["¿Tienes un evento?", "Hagamos su invitación."]}
          text="Cuéntanos qué celebras y cómo lo imaginas, y diseñamos una invitación digital a la medida de tu evento."
          cta="Cuéntanos sobre tu evento"
        />
        <Contact variant="eventos" />
      </main>
      <Footer />
    </>
  );
}
