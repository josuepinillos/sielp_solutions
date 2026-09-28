"""Build the web versions of the Sielp mascot poses.

For every pose name (hero, services, dashboard, ...) the source is chosen in
this order:

  1. An individual high-resolution render in assets/sielp_avatars/ with the
     pose name: <name>.png or <name>.webp (transparent background). It is
     trimmed to the figure and kept at full resolution (never downscaled).
  2. hero only: assets/sielp_avatars/sielp-personaje-original.png, the
     original individual render.
  3. Otherwise, a TEMPORARY cut-out from the pose sheet (~250 px per pose),
     taken with the sheet's own alpha channel; no re-generation, retouching or
     upscaling.

Output: public/assets/sielp_avatars/<name>.webp plus
src/content/avatar-manifest.json (size, source, temporary), which the site
reads to size and serve each image. Sources are never modified.

Run: npm run assets   (Python with pillow, numpy and scikit-image)
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image
from skimage import measure, morphology

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "sielp_avatars"
OUT = ROOT / "public" / "assets" / "sielp_avatars"
MANIFEST = ROOT / "src" / "content" / "avatar-manifest.json"

SHEET = SRC / "sielp-hoja-de-poses.png"
ORIGINAL = SRC / "sielp-personaje-original.png"

# Approximate centre of each pose on the 1536x1024 sheet -> pose name.
SHEET_POSES = {
    "services": (714, 569),     # presenting, open hand
    "dashboard": (1342, 572),   # tablet + analytics card
    "idea": (484, 865),         # bean bag, coffee, light bulb
    "events": (1397, 861),      # showing a phone
    "portfolio": (695, 227),    # pointing, tablet under arm
    "process": (988, 582),      # working at the desk
    "testimonial": (1157, 869), # headset + laptop, listening
    "cta": (1384, 227),         # jumping, celebrating (standing leg cut by the sheet)
    "contact": (913, 869),      # waving hello
}
NAMES = ["hero", *SHEET_POSES]

RECOMMENDED_HEIGHT = 1500
PAD = 4


def trim(img: Image.Image, pad_bottom: bool) -> Image.Image:
    # Ignore the faint glow around each pose so the crop hugs the figure and
    # half-body poses end exactly at their straight cut (to sit on an edge).
    solid = img.getchannel("A").point(lambda a: 255 if a > 60 else 0)
    x0, y0, x1, y1 = solid.getbbox()
    x0, y0 = max(x0 - PAD, 0), max(y0 - PAD, 0)
    x1 = min(x1 + PAD, img.width)
    y1 = min(y1 + (PAD if pad_bottom else 0), img.height)
    return img.crop((x0, y0, x1, y1))


def render_source(name: str) -> Path | None:
    for ext in ("png", "webp"):
        path = SRC / f"{name}.{ext}"
        if path.exists():
            return path
    if name == "hero" and ORIGINAL.exists():
        return ORIGINAL
    return None


def sheet_cutouts() -> dict[str, Image.Image]:
    sheet = np.array(Image.open(SHEET).convert("RGBA"))
    mask = morphology.dilation(sheet[:, :, 3] > 40, morphology.disk(12))
    labels = measure.label(mask)
    regions = [r for r in measure.regionprops(labels) if r.area > 3000]
    cutouts = {}
    for name, (cx, cy) in SHEET_POSES.items():
        region = min(
            regions,
            key=lambda r: ((r.bbox[1] + r.bbox[3]) / 2 - cx) ** 2 + ((r.bbox[0] + r.bbox[2]) / 2 - cy) ** 2,
        )
        pose = sheet.copy()
        pose[labels != region.label, 3] = 0
        cutouts[name] = trim(Image.fromarray(pose), pad_bottom=False)
    return cutouts


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict] = {}
    cutouts = None

    for name in NAMES:
        path = OUT / f"{name}.webp"
        source = render_source(name)
        if source:
            img = trim(Image.open(source).convert("RGBA"), pad_bottom=True)
            # Near-lossless: these are the masters the site resizes from.
            img.save(path, "WEBP", quality=95, method=6, exact=True)
            kind, temporary = "render", False
        else:
            cutouts = cutouts or sheet_cutouts()
            img = cutouts[name]
            # Lossless: never add compression on top of an already small cut-out.
            img.save(path, "WEBP", lossless=True, quality=100, method=6, exact=True)
            kind, temporary = "sheet", True

        width, height = img.size
        manifest[name] = {"width": width, "height": height, "source": kind, "temporary": temporary}
        note = "TEMPORAL (recorte de la hoja de poses)" if temporary else f"render: {source.name}"
        if not temporary and height < RECOMMENDED_HEIGHT:
            note += f" (menos de {RECOMMENDED_HEIGHT}px de alto)"
        print(f"{path.relative_to(ROOT)}  {width}x{height}  {note}")

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"{MANIFEST.relative_to(ROOT)} actualizado")


if __name__ == "__main__":
    main()
