# Auditoría de avatares de Sielp (28-09-2026)

## Fuentes disponibles en esta carpeta

| Archivo | Tamaño | Formato | Transparencia | Uso |
| --- | --- | --- | --- | --- |
| `sielp-personaje-original.png` | 1367 × 2048 | PNG RGBA | Real, bordes limpios | Único render individual en alta resolución (pose "corazón") |
| `sielp-hoja-de-poses.png` | 1536 × 1024 | PNG RGBA | Real, con un leve resplandor alrededor de cada pose | Hoja con 15 poses de ~170 a 350 px cada una |
| `sielp-hoja-de-poses.webp` | 1536 × 1024 | WebP RGB | No | Copia de la hoja sin transparencia (no sirve para recortar) |
| `sielp-personajes-sin-texto.png` | 1254 × 1254 | PNG RGB | No (fondo blanco, con rótulos) | Poses de ~200 px; peor que la hoja con transparencia |

## Archivos que usa la web (`public/assets/sielp_avatars/`)

| Archivo | Tamaño real | Origen | Estado | Observaciones |
| --- | --- | --- | --- | --- |
| `hero.webp` | 577 × 1708 | Render individual | **Alta resolución** | De los píxeles claros del borde, el 58 % son las zapatillas y el 15 % la camiseta y las manos. El cabello tiene un filete claro de 1 px heredado del recorte original: solo se nota sobre fondos oscuros; en la web se muestra sobre lavanda claro y no es visible. |
| `services.webp` | 248 × 250 | Recorte de la hoja | **Temporal** | Medio cuerpo, cortado en la cintura por la propia hoja. |
| `dashboard.webp` | 284 × 250 | Recorte de la hoja | **Temporal** | Medio cuerpo. |
| `idea.webp` | 261 × 259 | Recorte de la hoja | **Temporal** | Sentada en el puf. |
| `events.webp` | 220 × 266 | Recorte de la hoja | **Temporal** | Medio cuerpo. |
| `portfolio.webp` | 228 × 346 | Recorte de la hoja | **Temporal** | Cortada en las rodillas. Sin uso actual. |
| `process.webp` | 339 × 222 | Recorte de la hoja | **Temporal** | Sin uso actual. |
| `testimonial.webp` | 219 × 252 | Recorte de la hoja | **Temporal** | Medio cuerpo. Sección oculta hasta tener testimonios. |
| `cta.webp` | 226 × 346 | Recorte de la hoja | **Temporal** | **No es de cuerpo completo:** la pierna de apoyo está cortada en línea recta a la altura de la pantorrilla, porque la fila superior de la hoja termina ahí. Era el "recorte" visible en el CTA. |
| `contact.webp` | 204 × 251 | Recorte de la hoja | **Temporal** | Medio cuerpo. |

## Diagnóstico

1. **Resolución.** Las 9 poses secundarias salen de la hoja de poses y miden entre 204 y 339 px.
   En pantalla se muestran a su tamaño original, pero en pantallas Retina (2x) el navegador
   necesita el doble de píxeles: se amplían entre 1,7x y 2x y por eso se ven blandas o pixeladas.
   No existe una fuente de mayor calidad para estas poses. Ampliarlas artificialmente no es una
   solución, así que quedan marcadas como **temporales**.
2. **Recompresión.** La web volvía a comprimir estos archivos pequeños (AVIF calidad 75), lo que
   sumaba artefactos en cabello y bordes.
3. **Transparencia y halos.** Transparencia real en todos. Sin halos claros apreciables (0 a 2 %
   de píxeles de borde claros en las poses; en `dashboard` el 8 % es el panel blanco del gráfico).
4. **CTA.** Ningún contenedor recorta a la mascota. El corte visible venía del propio archivo
   (pierna truncada en la hoja).

## Qué se cambió en la web

- `scripts/build_avatars.py` usa un render individual si existe (`<pose>.png` o `<pose>.webp` en
  esta carpeta) y lo conserva a resolución completa; si no, recorta la hoja y marca la pose como
  temporal. Los recortes temporales se guardan sin pérdida.
- `src/content/avatar-manifest.json` registra tamaño, origen y si cada pose es temporal.
- `src/components/Avatar.tsx` muestra cada pose: una temporal nunca se muestra más ancha que su
  archivo y se sirve tal cual (sin recompresión); un render se redimensiona en alta calidad
  para cada pantalla. Las secciones solo indican el tamaño de diseño.
- CTA: la mascota se asoma por detrás del borde superior del panel; el panel oculta la parte baja
  (y el corte de la pierna), y ella sobresale celebrando.

## Qué se necesita para la versión definitiva

Renders individuales de la misma mascota, con fondo transparente, en PNG (o WebP sin pérdida), de
**al menos 1500 px de alto**, uno por pose y con estos nombres:

`services`, `dashboard`, `idea`, `events`, `cta`, `contact` (y opcionalmente `portfolio`,
`process`, `testimonial`). La pose `cta` debería ser de **cuerpo completo** (celebrando/saltando).

Cómo reemplazarlos: ver "Reemplazar por renders en alta resolución" en `README.md`.
