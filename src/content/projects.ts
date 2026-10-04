/*
  Proyectos reales de Sielp Solutions. Agrega solo trabajos existentes.

  Cada proyecto pertenece a una línea:
  - "empresas": se muestra en la home (sitios web, landing pages, dashboards...).
  - "invitaciones": se muestra en /invitacionesdigitales.
  Nunca se mezclan en la misma sección.

  Las imágenes son capturas reales de cada sitio publicado, generadas con
  `npm run capture:projects` (ver scripts/capture_projects.mjs): 1600x1000 WebP
  en /public/projects/ y el PNG original 2x en /assets/projects/.
  Para sumar un proyecto, añade su URL al script, captura y agrega una entrada
  AL INICIO de la lista: cada sección muestra los 3 más recientes de su línea.
*/

export type ProjectLine = "empresas" | "invitaciones";

export type Project = {
  name: string;
  domain: string;
  href: string;
  line: ProjectLine;
  // Tipo de proyecto, p. ej. "Sitio web", "Landing page", "Invitación digital".
  label: string;
  // Solo invitaciones: el tipo de evento, p. ej. "Baby shower".
  event?: string;
  description: string;
  image: { src: string; width: number; height: number; alt: string };
};

const capture = (file: string, alt: string) => ({ src: `/projects/${file}.webp`, width: 1600, height: 1000, alt });

export const projects: Project[] = [
  {
    name: "Raúl Pinillos",
    domain: "raulpinillos.com",
    href: "https://raulpinillos.com/",
    line: "empresas",
    label: "Sitio web",
    description: "Sitio web profesional para un profesor de inglés, con presentación de servicios, cursos y clases.",
    image: capture("raulpinillos", "Vista previa del sitio web de Raúl Pinillos"),
  },
  {
    name: "Josué y Claudia",
    domain: "josueyclaudia.com",
    href: "https://josueyclaudia.com/",
    line: "invitaciones",
    label: "Invitación digital",
    event: "Baby shower",
    description:
      "Experiencia digital personalizada para un baby shower, diseñada para presentar el evento y facilitar la confirmación de asistencia.",
    image: capture("josueyclaudia", "Vista previa de la invitación digital de Josué y Claudia"),
  },
  {
    name: "Kevyn Dávila",
    domain: "kevyndavila.com",
    href: "https://www.kevyndavila.com/",
    line: "invitaciones",
    label: "Invitación digital",
    event: "Cumpleaños",
    description: "Invitación digital de cumpleaños con una experiencia visual personalizada y confirmación de asistencia.",
    image: capture("kevyndavila", "Vista previa de la invitación digital de Kevyn Dávila"),
  },
];

const LATEST = 3;

export const latestProjects = (line: ProjectLine) => projects.filter((project) => project.line === line).slice(0, LATEST);
