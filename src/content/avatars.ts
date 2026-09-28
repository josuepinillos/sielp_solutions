import manifest from "./avatar-manifest.json";

// Official mascot poses. scripts/build_avatars.py builds the web files and
// avatar-manifest.json (size, source, and whether the file is a temporary
// cut-out from the pose sheet). Replacing a pose with a high-resolution render
// only needs the render in assets/sielp_avatars/<name>.png and `npm run assets`.
const alts = {
  hero: "Mascota de Sielp Solutions con blazer índigo, sonriendo y formando un corazón con las manos",
  services: "La mascota de Sielp presentando con la mano abierta",
  dashboard: "La mascota de Sielp señalando una tablet junto a un panel con gráficos",
  idea: "La mascota de Sielp sentada en un puf con un café, junto a una bombilla encendida",
  events: "La mascota de Sielp mostrando un celular y señalándolo",
  portfolio: "La mascota de Sielp señalando hacia arriba con una tablet bajo el brazo",
  process: "La mascota de Sielp trabajando en su laptop sobre un escritorio con una planta",
  testimonial: "La mascota de Sielp con auriculares, escuchando frente a su laptop",
  cta: "La mascota de Sielp saltando con los brazos en alto para celebrar",
  contact: "La mascota de Sielp saludando con la mano",
} as const;

export type AvatarName = keyof typeof alts;

export function avatar(name: AvatarName) {
  const { width, height, temporary } = manifest[name];
  return {
    src: `/assets/sielp_avatars/${name}.webp`,
    alt: alts[name],
    width,
    height,
    temporary,
  };
}
