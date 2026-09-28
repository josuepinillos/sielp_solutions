/*
  Testimonios reales de clientes, con su permiso. La sección se oculta en
  producción mientras esta lista esté vacía.

  Mantén cada cita en tres líneas como máximo (unas 30 palabras).
*/

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

export const testimonials: Testimonial[] = [];
