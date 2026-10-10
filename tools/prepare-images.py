"""Turn the staged ImageGen PNGs into deployable 1600x900 WebP files.

Two things this has to get right.

1. The watermark. Every ImageGen result carries an "AI生成 / WORKBUDDY" mark in
   the bottom-right corner. It is baked into the pixels, so the only honest
   removal is to crop past it. Measured on a 1536x1024 result, the mark lives
   in roughly the bottom 60 px. A 16:9 crop of 1536x1024 is 1536x864, which
   means 160 px has to go — so the crop is anchored to the TOP and drops the
   whole bottom 160 px. That clears the mark with a wide margin, and it costs
   nothing compositionally because these are studio shots with the subject
   sitting above centre.

2. The declared size. The pages declare width="1600" height="900" on every
   article thumbnail and detail-block image. An intrinsic size that does not
   match the file makes the browser reserve the wrong box and the layout jumps
   when the image lands. So the output is exactly 1600x900, not "about" it.

Run:  python tools/prepare-images.py
"""

import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
STAGING = ROOT / "img-staging"
OUT = ROOT / "img"

WIDTH, HEIGHT = 1600, 900
QUALITY = 82

# How much of the bottom of a source has to be dropped to clear the watermark.
# Measured at 56 px on a 1024 px tall result; 100 leaves margin.
#
# This is a geometric assertion rather than a pixel sniff because the mark
# cannot reliably be told apart from the scene. On the workshop shot it sits on
# a bright workbench, so an "is anything very bright in the bottom right" test
# fires on the workbench whether or not the mark is there. What can be asserted
# is that the crop went past the band the mark occupies.
WATERMARK_BAND = 100

# staging file stem  ->  deployed file name in img/
MAP = {
    "rigid-boxes": "rigid-boxes-detail.webp",
    "magnetic-boxes": "magnetic-boxes-detail.webp",
    "two-piece-boxes": "two-piece-boxes-detail.webp",
    "drawer-boxes": "drawer-boxes-detail.webp",
    "perfume-packaging": "perfume-packaging-detail.webp",
    "cosmetic-packaging": "cosmetic-packaging-detail.webp",
    "gift-packaging": "gift-packaging-detail.webp",
    "blog-custom-rigid-box-manufacturing-process":
        "blog-custom-rigid-box-manufacturing-process.webp",
    "case-magnetic-gift-set-for-a-skincare-brand":
        "case-magnetic-gift-set-for-a-skincare-brand.webp",
}


def main():
    if not STAGING.is_dir():
        sys.exit(f"staging directory not found: {STAGING}")

    missing = [s for s in MAP if not (STAGING / f"{s}.png").exists()]
    if missing:
        sys.exit("missing staged image(s): " + ", ".join(missing))

    OUT.mkdir(exist_ok=True)
    total = 0

    for stem, name in MAP.items():
        src = STAGING / f"{stem}.png"
        im = Image.open(src).convert("RGB")
        w, h = im.size

        # 16:9, anchored to the top so the watermark band at the bottom goes.
        crop_h = round(w * HEIGHT / WIDTH)
        if crop_h > h:
            sys.exit(f"{stem}: source {w}x{h} is not tall enough for a 16:9 crop")

        dropped = h - crop_h
        if dropped < WATERMARK_BAND:
            sys.exit(
                f"{stem}: a 16:9 crop of {w}x{h} drops only {dropped} px off the "
                f"bottom, which does not clear the {WATERMARK_BAND} px watermark "
                f"band. Nothing downstream would catch this, so the mark would "
                f"ship on the live site."
            )

        im = im.crop((0, 0, w, crop_h)).resize((WIDTH, HEIGHT), Image.LANCZOS)

        dest = OUT / name
        im.save(dest, "WEBP", quality=QUALITY, method=6)
        kb = dest.stat().st_size / 1024
        total += kb
        print(f"  {name:<56} {w}x{h} -{dropped}px -> {WIDTH}x{HEIGHT}  {kb:6.1f} KB")

    print(f"\n  {len(MAP)} images, {total:.0f} KB total")


if __name__ == "__main__":
    main()
