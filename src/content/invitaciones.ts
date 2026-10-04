/*
  Invitaciones digitales: categorías del portafolio y niveles de producto.
  El orden de las categorías es el orden de la página (/invitacionesdigitales).
*/

export type InvitationCategoryId = "matrimonios" | "cumpleanos" | "baby-showers";

export type InvitationCategory = {
  id: InvitationCategoryId;
  // Ancla de la sección: /invitacionesdigitales#<anchor>
  anchor: string;
  label: string;
  // Para etiquetas de proyecto: "Invitación digital · Baby shower".
  singular: string;
};

export const invitationCategories: InvitationCategory[] = [
  { id: "matrimonios", anchor: "matrimonios", label: "Matrimonios", singular: "Matrimonio" },
  { id: "cumpleanos", anchor: "cumpleanos", label: "Cumpleaños", singular: "Cumpleaños" },
  { id: "baby-showers", anchor: "babyshowers", label: "Baby showers", singular: "Baby shower" },
];

export const categoryById = (id: InvitationCategoryId) => invitationCategories.find((category) => category.id === id)!;

/*
  Niveles de producto. Por ahora solo existe el Plan Plus y no se publican
  precios. Para sumar otros planes (p. ej. "basico", "premium"), agrégalos aquí
  y asígnalos a sus demos en projects.ts con el campo `plan`.
*/
export type PlanId = "plus";

export const plans: Record<PlanId, { name: string }> = {
  plus: { name: "Plan Plus" },
};
