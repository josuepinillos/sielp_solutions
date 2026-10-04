/*
  Datos de la marca y única fuente de verdad del contacto. No inventes datos aquí.
*/

export const site = {
  name: "Sielp Solutions",
  // Dominio público. Se usa para URLs canónicas, el sitemap y las vistas
  // previas al compartir la web en redes y mensajería.
  url: "https://www.sielpsolutions.com",
  tagline: "Soluciones digitales para empresas, marcas y negocios.",
  description:
    "Diseñamos y desarrollamos sitios web, landing pages, dashboards y soluciones digitales a medida para empresas, marcas y negocios.",

  // Logotipo oficial. Copia el archivo a /public/brand/ y completa la ruta y
  // sus dimensiones, p. ej. { src: "/brand/sielp-logo.svg", width: 160, height: 40 }.
  // Mientras sea null se muestra el nombre de la marca en texto.
  logo: null as null | { src: string; width: number; height: number },

  // Canales oficiales. Son los únicos que aparecen en la web.
  contact: {
    whatsapp: {
      // Código de país + número, solo dígitos (para wa.me).
      number: "51936913743",
      display: "+51 936 913 743",
    },
    instagram: {
      url: "https://www.instagram.com/sielpsolutions/",
      handle: "@sielpsolutions",
    },
    // Escrito exactamente así a pedido de la marca.
    email: "administador@sielpsolutions.com",
  },
};

// WhatsApp link, optionally with a prefilled message the visitor still sends themselves.
export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.contact.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/*
  Arquitectura: la home es la línea principal (soluciones digitales para
  empresas) e invitaciones digitales es una línea secundaria con su propia ruta.
*/
export const routes = {
  home: "/",
  invitations: "/invitacionesdigitales",
} as const;

export const lines = [
  { label: "Soluciones digitales", href: routes.home },
  { label: "Invitaciones digitales", href: routes.invitations },
] as const;

export type NavItem = { label: string; href: string; id: string };

// In-page navigation of each route (anchors to its own sections). Contact is
// not a nav item: the header's "Hablemos" button is the single way there.
export const homeNav: NavItem[] = [
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Proyectos", href: "#proyectos", id: "proyectos" },
  { label: "Nosotros", href: "#nosotros", id: "nosotros" },
];

// Invitations: one item per category (anchors from src/content/invitaciones.ts).
export const invitationsNav: NavItem[] = [
  { label: "Matrimonios", href: "#matrimonios", id: "matrimonios" },
  { label: "Cumpleaños", href: "#cumpleanos", id: "cumpleanos" },
  { label: "Baby showers", href: "#babyshowers", id: "babyshowers" },
  { label: "Proceso", href: "#proceso", id: "proceso" },
];

export type ChannelId = "whatsapp" | "instagram" | "email";

export type Channel = {
  id: ChannelId;
  label: string;
  handle: string;
  href: string;
  external: boolean;
};

export function getChannels(): Channel[] {
  const { whatsapp, instagram, email } = site.contact;
  return [
    { id: "whatsapp", label: "WhatsApp", handle: whatsapp.display, href: whatsappUrl(), external: true },
    { id: "instagram", label: "Instagram", handle: instagram.handle, href: instagram.url, external: true },
    { id: "email", label: "Email", handle: email, href: `mailto:${email}`, external: false },
  ];
}
