# Sielp Solutions: sitio web

Next.js 16 (App Router) + Tailwind CSS 4 + Motion. Un solo proyecto y un solo deployment con
dos rutas, una por línea de negocio:

| Ruta | Línea | Secciones |
| --- | --- | --- |
| `/` | **Principal:** soluciones digitales para empresas, marcas y negocios | Hero, Nosotros, Servicios, Proyectos (solo empresariales), Proceso, Testimonios (oculta), CTA, Contacto |
| `/invitacionesdigitales` | **Secundaria:** invitaciones digitales para eventos | Hero con demo interactiva, "Elige el tipo de evento", Matrimonios (Plan Plus, destacado), Cumpleaños, Baby showers, Proceso, CTA, Contacto |

La home solo enlaza a invitaciones de forma secundaria: un enlace discreto en el header, una
línea al final de Servicios y el footer. Header, Footer, Portfolio, Process, FinalCta y
Contact se comparten entre ambas rutas y reciben por props lo que cambia (navegación, textos,
proyectos, variante del formulario). Lo exclusivo de invitaciones vive en
`src/components/invitaciones/` y solo se carga en su ruta.

SEO por ruta: cada `page.tsx` define título, descripción, URL canónica y Open Graph; la imagen
para compartir es el `opengraph-image.png` de cada carpeta de ruta. `src/app/sitemap.ts` y
`src/app/robots.ts` publican ambas rutas.

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm start        # sirve la compilación
```

Las secciones sin contenido real (por ahora, Testimonios) simplemente no se muestran; no hay
avisos ni placeholders en la web.

## Contenido pendiente (no se inventó nada)

| Qué | Dónde |
| --- | --- |
| Logotipo oficial | Copiar a `public/brand/` y completar `logo` en `src/content/site.ts` |
| Ícono definitivo | `src/app/icon.png` y `apple-icon.png` son una "S" provisoria (`npm run og`); reemplazar por el logo |
| Testimonios reales | `src/content/testimonials.ts` (la sección se oculta mientras esté vacía) |

## Imágenes para compartir

```bash
npm run og   # regenera los Open Graph de cada ruta y el ícono provisorio
```

`scripts/build_og.mjs` renderiza con el Edge instalado una tarjeta de 1200x630 con la tipografía
y la mascota de la marca: `src/app/opengraph-image.png` (home, línea empresarial) y
`src/app/invitacionesdigitales/opengraph-image.png` (invitaciones). Necesita internet para
cargar la tipografía.

## Contacto

Los únicos canales oficiales son WhatsApp (+51 936 913 743), Instagram (@sielpsolutions) y
email (administador@sielpsolutions.com). Se configuran en un solo lugar, `contact` en
`src/content/site.ts`, y de ahí los toman la sección Contacto y el footer.

El formulario valida los campos y abre WhatsApp con un mensaje ya redactado a partir de lo que
escribió el visitante; el envío final lo hace siempre el visitante desde WhatsApp. Tiene una
variante por línea: en la home pide empresa y servicio; en invitaciones, evento y tipo de evento,
y el mensaje indica "Invitación digital", así cada consulta llega identificada.

## Proyectos

Cada ruta muestra capturas reales de sus propios proyectos publicados. En `src/content/projects.ts`:

- `line` ("empresas" o "invitaciones") decide la ruta: la home muestra los empresariales
  (raulpinillos.com, como "Nuestro proyecto más reciente.").
- `category` ("matrimonios", "cumpleanos", "baby-showers") ubica cada invitación en su sección de
  `/invitacionesdigitales`: Matrimonios (bodasielplvltwo.vercel.app), Cumpleaños
  (kevyndavila.com) y Baby showers (josueyclaudia.com).
- `demo` y `plan` marcan una demo propia de Sielp que muestra un nivel de producto. La boda de
  Josué y Claudia es la demo del **Plan Plus**: se presenta como "Plan Plus · Demo", nunca como
  trabajo para un cliente, y sus `highlights` listan solo lo que la invitación publicada incluye.

Las categorías y los planes están en `src/content/invitaciones.ts`. No hay precios publicados; para
sumar planes (por ejemplo Básico o Premium) se agregan ahí y se asignan con `plan`.

Ninguna invitación se incrusta en la página (sin iframes): se muestran capturas y cada tarjeta abre
el sitio real en una pestaña nueva, así no se descarga nada externo hasta que el visitante lo pide.

```bash
npm run capture:projects                    # vuelve a capturar todos los sitios
npm run capture:projects bodasielplvltwo    # solo uno
```

El script (`scripts/capture_projects.mjs`) abre cada URL con el Microsoft Edge instalado
(`CAPTURE_CHANNEL=chrome` para usar Chrome), captura la primera pantalla a 1440x900 en 2x
(y, para los sitios marcados `mobile: true`, también a 390x844 en 3x para el mockup de celular)
y guarda el PNG original en `assets/projects/` y el WebP que usa la web en `public/projects/`.
Si un sitio no se puede capturar, lo informa y no genera nada en su lugar.

Para sumar un proyecto: agrega su URL al script, captura, y añade la entrada al inicio de
`src/content/projects.ts` con su `line` (y su `category` si es una invitación).

## Mascota

Los archivos de `public/assets/sielp_avatars/` se generan a partir de las fuentes de
`assets/sielp_avatars/` (que no se modifican):

```bash
npm run assets   # requiere Python con pillow, numpy y scikit-image
```

Estado actual (detalle en `assets/sielp_avatars/AUDITORIA.md`): `hero` sale del render original
en alta resolución; las demás poses son **recortes temporales** de la hoja de poses (~250 px).
Una pose temporal nunca se muestra más ancha que su archivo y se sirve sin recompresión, pero en
pantallas Retina no puede verse del todo nítida: necesita un render de mayor resolución.

### Reemplazar por renders en alta resolución

1. Guarda el render individual con fondo transparente en `assets/sielp_avatars/` con el nombre
   de la pose: `services.png`, `dashboard.png`, `idea.png`, `events.png`, `cta.png`,
   `contact.png` (también sirve `.webp`). Recomendado: al menos 1500 px de alto; se conserva a
   resolución completa. Mantén el mismo encuadre que la pose actual (las de medio cuerpo, cortadas
   en la cintura, porque se apoyan sobre el borde de un panel); `cta` puede ser de cuerpo completo.
2. Ejecuta `npm run assets`. El script lo recorta a la figura, lo exporta a
   `public/assets/sielp_avatars/<pose>.webp` y lo marca como render en
   `src/content/avatar-manifest.json`.

No hace falta tocar componentes: cada sección ya define el tamaño de diseño de su pose, y
`src/components/Avatar.tsx` deja de limitarla a su tamaño original cuando pasa a ser un render.

Dónde aparece la mascota (y dónde no, a propósito):

| Sección | Pose | Mensaje |
| --- | --- | --- |
| Home: Hero | `hero` (corazón, bajo un arco) | Bienvenido a Sielp |
| Home: Nosotros | `idea` (puf, café, bombilla) | Somos una marca humana |
| Home: Servicios | `services` / `dashboard` al pasar por Dashboards | Creamos soluciones / trabajamos con tecnología |
| Invitaciones: Hero | `events` (muestra un celular junto a la demo) | Creamos experiencias |
| CTA (ambas rutas) | `cta` (se asoma celebrando detrás del panel y reacciona al pasar por el botón) | Hablemos |
| Formulario enviado (ambas) | `contact` (saluda) | Gracias |

Proyectos, Proceso, Contacto y Footer no llevan mascota: en Proyectos los sitios
reales son los protagonistas, y en el resto su ausencia da ritmo a la página.
`portfolio.webp`, `process.webp` y `testimonial.webp` quedan disponibles (la última se usa cuando
existan testimonios).
