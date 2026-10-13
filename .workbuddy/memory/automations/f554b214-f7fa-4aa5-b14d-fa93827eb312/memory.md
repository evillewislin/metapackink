# Automation memory

## 2026-10-11

Published day 1 of 15:
- Blog: "Rigid Box Board Thickness: Specifying It From the Product, Not From Habit" (`rigid-box-board-thickness`)
- Case study: "A Perfume Coffret: Carrying a 100 ml Glass Bottle in a Rigid Box" (`perfume-coffret-for-a-fragrance-house`)

Actions:
- Wrote bodies to `src/articles/bodies/` for both slugs.
- Added 5 FAQ entries to each catalogue entry.
- Removed `planned: true` and set `date` to `2026-10-11`.
- Generated 1600x900 article thumbnails (one request at a time), renamed, processed through `tools/prepare-images.py`.
- Updated `tools/prepare-images.py` MAP for the two new stems.
- Added `img`/`imgAlt` fields after confirming processed WebPs exist.
- `node tools/build.js --check` returned `verification PASS`.

Note: case-studies.js required adding `const { trade } = require('../config');` so the FAQ could interpolate sample lead times from config.

## 2026-10-12

Published day 2 of 15:
- Blog: "Magnetic Closure Boxes: Magnet Strength, Position and How the Lid Should Shut" (`magnetic-box-magnet-specification`)
- Case study: "A Drawer Box for a Watch Brand: Where the Sliding Tolerance Has to Come From" (`drawer-box-for-a-watch-brand`)

Actions mirror day 1: bodies written, 5 FAQs each, `planned: true` removed and `date` set to `2026-10-12`, two thumbnails generated one at a time and renamed, MAP in `tools/prepare-images.py` extended, `img`/`imgAlt` added after the WebPs were confirmed on disk, `node tools/build.js --check` → `verification PASS`.

## 2026-10-13

Published day 3 of 15:
- Blog: "Two-Piece or Magnetic Rigid Box? A Decision You Should Make Before Artwork" (`two-piece-vs-magnetic-rigid-box`)
- Case study: "A DTC Mailer for a Colour Cosmetics Brand: Surviving the Post Without Losing the Unboxing" (`cosmetic-mailer-for-a-dtc-colour-brand`)

Same routine as days 1–2: bodies written, 5 FAQs each, `planned: true` removed and `date` set to 2026-10-13, two thumbnails generated one at a time and renamed immediately, MAP extended, `img`/`imgAlt` added after the WebPs were confirmed on disk, `--check` → verification PASS, full build run. `check-live.js` listed both new URLs as not live yet.

Next up: blog `drawer-box-vs-lid-and-base`, case study `two-piece-rigid-box-for-a-jewellery-label`.
