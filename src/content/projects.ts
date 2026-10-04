/*
  Proyectos reales de Sielp Solutions. Agrega solo trabajos existentes.

  Cada proyecto pertenece a una línea:
  - "empresas": se muestra en la home (sitios web, landing pages, dashboards...).
  - "invitaciones": se muestra en /invitacionesdigitales, dentro de su
    categoría (matrimonios, cumpleaños o baby showers).
  Nunca se mezclan en la misma sección.

  Las demos (`demo: true`) son proyectos propios de Sielp creados para mostrar
  un nivel de producto (`plan`); no son trabajos para clientes.

  Las imágenes son capturas reales de cada sitio publicado, generadas con
  `npm run capture:projects` (ver scripts/capture_projects.mjs): 1600x1000 WebP
  en /public/projects/ (y una captura de celular cuando se indica) y el PNG
  original en /assets/projects/.
  Para sumar un proyecto, añade su URL al script, captura y agrega una entrada
  AL INICIO de la lista.
*/

import type { InvitationCategoryId, PlanId } from "./invitaciones";

export type ProjectLine = "empresas" | "invitaciones";

type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  name: string;
  domain: string;
  href: string;
  line: ProjectLine;
  // Tipo de proyecto, p. ej. "Sitio web", "Landing page", "Invitación digital".
  label: string;
  // Solo invitaciones: la categoría del evento.
  category?: InvitationCategoryId;
  // Solo demos: el nivel de producto que muestran.
  plan?: PlanId;
  demo?: boolean;
  // Subtítulo propio del proyecto, p. ej. "Nuestra boda".
  title?: string;
  description: string;
  // Solo demos: lo que incluye realmente la invitación publicada.
  highlights?: string[];
  image: ProjectImage;
  mobileImage?: ProjectImage;
};

const capture = (file: string, alt: string): ProjectImage => ({ src: `/projects/${file}.webp`, width: 1600, height: 1000, alt });
const mobileCapture = (file: string, alt: string): ProjectImage => ({
  src: `/projects/${file}-mobile.webp`,
  width: 780,
  height: 1688,
  alt,
});

export const projects: Project[] = [
  {
    name: "Josué y Claudia",
    title: "Nuestra boda",
    domain: "bodasielplvltwo.vercel.app",
    href: "https://bodasielplvltwo.vercel.app/",
    line: "invitaciones",
    label: "Invitación digital",
    category: "matrimonios",
    plan: "plus",
    demo: true,
    description: "Una experiencia digital completa para compartir cada detalle del gran día.",
    // Verificado en la demo publicada.
    highlights: [
      "Nuestra historia",
      "Fecha y cuenta regresiva",
      "Ubicación con mapa y cómo llegar",
      "Agregar al calendario",
      "Itinerario del día",
      "Sección de regalos",
      "Confirmación con acompañantes",
      "Mensaje para los novios",
      "Detalles interactivos: sobre y caja de regalo",
    ],
    image: capture("bodasielplvltwo", "Portada de la invitación de matrimonio de Josué y Claudia en computadora"),
    mobileImage: mobileCapture("bodasielplvltwo", "Portada de la invitación de matrimonio de Josué y Claudia en celular"),
  },
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
    category: "baby-showers",
    description:
      "Experiencia digital personalizada para un baby shower, diseñada para presentar el evento y facilitar la confirmación de asistencia.",
    image: capture("josueyclaudia", "Vista previa de la invitación de baby shower de josueyclaudia.com"),
  },
  {
    name: "Kevyn Dávila",
    domain: "kevyndavila.com",
    href: "https://www.kevyndavila.com/",
    line: "invitaciones",
    label: "Invitación digital",
    category: "cumpleanos",
    description: "Invitación digital de cumpleaños con una experiencia visual personalizada y confirmación de asistencia.",
    image: capture("kevyndavila", "Vista previa de la invitación de cumpleaños de kevyndavila.com"),
  },
];

const LATEST = 3;

export const latestProjects = (line: ProjectLine) => projects.filter((project) => project.line === line).slice(0, LATEST);

export const projectsInCategory = (category: InvitationCategoryId) =>
  projects.filter((project) => project.line === "invitaciones" && project.category === category);
