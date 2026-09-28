/*
  Datos de la marca y única fuente de verdad del contacto. No inventes datos aquí.
*/

export const site = {
  name: "Sielp Solutions",
  // Dominio público, p. ej. "https://midominio.com". Se usa para las vistas
  // previas al compartir la web en redes y mensajería.
  url: "",
  tagline: "Digital experiences for businesses, brands & events.",
  description:
    "Diseñamos y desarrollamos experiencias digitales para empresas, marcas y momentos que merecen ser recordados.",

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

export const nav = [
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Proyectos", href: "#proyectos", id: "proyectos" },
  { label: "Experiencias", href: "#eventos", id: "eventos" },
  { label: "Nosotros", href: "#nosotros", id: "nosotros" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
] as const;

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
