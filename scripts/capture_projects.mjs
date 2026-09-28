/*
  Real screenshots of Sielp's published projects for the portfolio.

  site -> headless browser capture -> PNG master (assets/projects/) ->
  WebP for the web (public/projects/). Nothing is redrawn or retouched.

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

// Viewport 1440x900 (16:10, same ratio as the preview frame) at 2x for Retina.
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;
const WEB_WIDTH = 1600;

const sites = {
  raulpinillos: "https://raulpinillos.com/",
  josueyclaudia: "https://josueyclaudia.com/",
  kevyndavila: "https://www.kevyndavila.com/",
};

const only = process.argv.slice(2);
const targets = Object.entries(sites).filter(([name]) => only.length === 0 || only.includes(name));

await mkdir(masters, { recursive: true });
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: process.env.CAPTURE_CHANNEL ?? "msedge", headless: true });

for (const [name, url] of targets) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: SCALE, locale: "es-PE" });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    // Let entrance animations, web fonts and hero images settle.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(6_000);

    const master = path.join(masters, `${name}.png`);
    await page.screenshot({ path: master });

    const web = path.join(output, `${name}.webp`);
    const info = await sharp(master)
      .resize({ width: WEB_WIDTH, kernel: "lanczos3" })
      .webp({ quality: 86, effort: 6, smartSubsample: true })
      .toFile(web);
    console.log(`${name}: ${url} -> public/projects/${name}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
  } catch (error) {
    // Never fall back to an invented preview: report and leave the asset missing.
    console.error(`${name}: NO se pudo capturar ${url}: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await context.close();
  }
}

await browser.close();
