/*
  Share images (Open Graph, 1200x630) for each route of the site.

  Renders a small HTML card with the brand typeface and the official mascot
  using the Microsoft Edge (or Chrome) already installed, via playwright-core,
  and writes the PNG next to each route (Next's opengraph-image convention):
    src/app/opengraph-image.png                         (home: business line)
    src/app/invitacionesdigitales/opengraph-image.png   (invitations line)

  Run: npm run og   (needs internet once, to load the font from Google Fonts)
*/

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Inlined: a page built with setContent cannot load local files.
const mascotFile = await readFile(path.join(root, "public", "assets", "sielp_avatars", "hero.webp"));
const mascot = `data:image/webp;base64,${mascotFile.toString("base64")}`;

const base = (theme) => `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=block" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; }
    html, body { width: 1200px; height: 630px; }
    body { font-family: "Bricolage Grotesque", sans-serif; overflow: hidden; ${theme.body} }
    .card { position: relative; width: 1200px; height: 630px; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
    .brand { font-size: 30px; font-weight: 650; letter-spacing: -0.035em; ${theme.brand} }
    .brand span { font-weight: 400; ${theme.brandSoft} }
    .eyebrow { font-size: 22px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; ${theme.eyebrow} }
    h1 { margin-top: 18px; max-width: 690px; font-size: 64px; line-height: 1.02; letter-spacing: -0.035em; font-weight: 620; ${theme.h1} }
    h1 em { font-style: normal; ${theme.accent} }
    p { max-width: 640px; font-size: 26px; line-height: 1.4; ${theme.p} }
    .url { font-size: 22px; ${theme.url} }
    .arch { position: absolute; right: 72px; bottom: 0; width: 330px; height: 470px; border-radius: 165px 165px 0 0; ${theme.arch} }
    .mascot { position: absolute; right: 100px; bottom: -330px; width: 274px; }
  </style>`;

const cards = [
  {
    out: path.join(root, "src", "app", "opengraph-image.png"),
    alt: "Sielp Solutions: soluciones digitales para empresas, marcas y negocios",
    theme: {
      body: "background: #f9f9fb; color: #17153f;",
      brand: "color: #17153f;",
      brandSoft: "color: #676683;",
      eyebrow: "color: #2520b6;",
      h1: "color: #17153f;",
      accent: "color: #2520b6;",
      p: "color: #4f4e6c;",
      url: "color: #676683;",
      arch: "background: linear-gradient(180deg, #f1f0fa 0%, #e2e1f6 100%);",
    },
    html: `
      <div class="card">
        <div class="brand">Sielp<span> Solutions</span></div>
        <div>
          <div class="eyebrow">Soluciones digitales</div>
          <h1>Desarrollo web para <em>empresas, marcas y negocios.</em></h1>
          <p style="margin-top: 22px">Sitios web, landing pages, dashboards y soluciones a medida.</p>
        </div>
        <div class="url">sielpsolutions.com</div>
      </div>`,
  },
  {
    out: path.join(root, "src", "app", "invitacionesdigitales", "opengraph-image.png"),
    alt: "Invitaciones digitales de Sielp Solutions para matrimonios, cumpleaños, baby showers y más",
    theme: {
      body: "background: linear-gradient(135deg, #110d5c 0%, #1f19b4 100%); color: #ffffff;",
      brand: "color: #ffffff;",
      brandSoft: "color: #bbb9e7;",
      eyebrow: "color: #bbb9e7;",
      h1: "color: #ffffff;",
      accent: "color: #bbb9e7;",
      p: "color: #e2e1f6;",
      url: "color: #bbb9e7;",
      arch: "background: radial-gradient(70% 55% at 50% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0) 72%), linear-gradient(180deg, #bbb9e7 0%, #6a61dc 100%);",
    },
    html: `
      <div class="card">
        <div class="brand">Sielp<span> Solutions</span></div>
        <div>
          <div class="eyebrow">Invitaciones digitales</div>
          <h1>Tu evento comienza <em>antes del gran día.</em></h1>
          <p style="margin-top: 22px">Para matrimonios, cumpleaños, baby showers, bautizos y aniversarios.</p>
        </div>
        <div class="url">sielpsolutions.com/invitacionesdigitales</div>
      </div>`,
  },
];

const browser = await chromium.launch({ channel: process.env.CAPTURE_CHANNEL ?? "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const card of cards) {
  await page.setContent(
    `<!doctype html><html lang="es"><head><meta charset="utf-8">${base(card.theme)}</head><body>
      ${card.html}
      <div class="arch"></div>
      <img class="mascot" src="${mascot}" alt="">
    </body></html>`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.ready);
  const font = await page.evaluate(() => document.fonts.check('620 64px "Bricolage Grotesque"'));
  if (!font) throw new Error("No se cargó la tipografía Bricolage Grotesque (¿sin conexión?).");
  const mascotLoaded = await page.$eval(".mascot", (img) => img.complete && img.naturalWidth > 0);
  if (!mascotLoaded) throw new Error("No se cargó la imagen de la mascota.");
  await page.screenshot({ path: card.out, type: "png" });
  await writeFile(card.out.replace(/\.png$/, ".alt.txt"), card.alt, "utf-8");
  console.log(path.relative(root, card.out));
}

/*
  Provisional site icon: an "S" in the brand typeface on brand indigo, until the
  official logo is confirmed. icon.png (browser tab) and apple-icon.png.
*/
const icons = [
  { out: path.join(root, "src", "app", "icon.png"), size: 512, radius: 112 },
  { out: path.join(root, "src", "app", "apple-icon.png"), size: 180, radius: 0 },
];
for (const icon of icons) {
  await page.setViewportSize({ width: icon.size, height: icon.size });
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=block" rel="stylesheet">
      <style>
        html, body { margin: 0; width: ${icon.size}px; height: ${icon.size}px; background: transparent; }
        div { width: 100%; height: 100%; border-radius: ${icon.radius}px; background: #2520b6; color: #fff;
              display: grid; place-items: center; font: 600 ${Math.round(icon.size * 0.68)}px/1 "Bricolage Grotesque", sans-serif;
              letter-spacing: -0.04em; padding-bottom: ${Math.round(icon.size * 0.06)}px; box-sizing: border-box; }
      </style></head><body><div>S</div></body></html>`,
    { waitUntil: "networkidle" },
  );
  await page.evaluate(() => document.fonts.load('600 100px "Bricolage Grotesque"'));
  const iconFont = await page.evaluate(() => document.fonts.check('600 100px "Bricolage Grotesque"'));
  if (!iconFont) throw new Error("No se cargó la tipografía Bricolage Grotesque para el ícono.");
  await page.screenshot({ path: icon.out, type: "png", omitBackground: true });
  console.log(path.relative(root, icon.out));
}

await browser.close();
