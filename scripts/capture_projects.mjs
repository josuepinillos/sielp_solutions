/*
  Real screenshots of Sielp's published projects for the portfolio.

  site -> headless browser capture -> PNG master (assets/projects/) ->
  WebP for the web (public/projects/). Nothing is redrawn or retouched.

  Each site gets a desktop capture (1440x900, 16:10, at 2x for Retina) and,
  when listed with `mobile: true`, also a phone capture (390x844 at 3x) for
  phone mockups.

  Uses the Microsoft Edge (or Chrome) already installed on the machine via
  playwright-core, so no browser download is needed.

  Run: npm run capture:projects            (all)
       npm run capture:projects raulpinillos
*/

import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const masters = path.join(root, "assets", "projects");
const output = path.join(root, "public", "projects");

const formats = {
  desktop: { suffix: "", viewport: { width: 1440, height: 900 }, scale: 2, webWidth: 1600, mobile: false },
  mobile: { suffix: "-mobile", viewport: { width: 390, height: 844 }, scale: 3, webWidth: 780, mobile: true },
};

const sites = {
  raulpinillos: { url: "https://raulpinillos.com/" },
  josueyclaudia: { url: "https://josueyclaudia.com/" },
  kevyndavila: { url: "https://www.kevyndavila.com/" },
  // Plan Plus demo (personal portfolio project, wedding).
  bodasielplvltwo: { url: "https://bodasielplvltwo.vercel.app/", mobile: true },
};

const only = process.argv.slice(2);
const targets = Object.entries(sites).filter(([name]) => only.length === 0 || only.includes(name));

await mkdir(masters, { recursive: true });
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: process.env.CAPTURE_CHANNEL ?? "msedge", headless: true });

for (const [name, site] of targets) {
  const kinds = site.mobile ? ["desktop", "mobile"] : ["desktop"];
  for (const kind of kinds) {
    const format = formats[kind];
    const context = await browser.newContext({
      viewport: format.viewport,
      deviceScaleFactor: format.scale,
      isMobile: format.mobile,
      hasTouch: format.mobile,
      locale: "es-PE",
    });
    const page = await context.newPage();
    const file = `${name}${format.suffix}`;
    try {
      await page.goto(site.url, { waitUntil: "networkidle", timeout: 60_000 });
      // Let entrance animations, web fonts and hero images settle.
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(6_000);

      const master = path.join(masters, `${file}.png`);
      await page.screenshot({ path: master });

      const web = path.join(output, `${file}.webp`);
      const info = await sharp(master)
        .resize({ width: format.webWidth, kernel: "lanczos3" })
        .webp({ quality: 86, effort: 6, smartSubsample: true })
        .toFile(web);
      console.log(`${file}: ${site.url} -> public/projects/${file}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
    } catch (error) {
      // Never fall back to an invented preview: report and leave the asset missing.
      console.error(`${file}: NO se pudo capturar ${site.url}: ${error.message}`);
      process.exitCode = 1;
    } finally {
      await context.close();
    }
  }
}

await browser.close();
