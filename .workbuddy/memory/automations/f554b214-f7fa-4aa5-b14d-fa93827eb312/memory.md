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

## 2026-10-14

Published day 4 of 15:
- Blog: "Drawer Boxes vs Lid-and-Base: What the Opening Sequence Costs You" (`drawer-box-vs-lid-and-base`)
- Case study: "A Two-Piece Rigid Box for a Jewellery Label: Sizing Around a Ring That Moves" (`two-piece-rigid-box-for-a-jewellery-label`)

Same routine as days 1–3: bodies written, 5 FAQs each, `planned: true` removed and `date` set to 2026-10-14, two thumbnails generated one at a time, renamed in `img-staging/`, MAP extended, `img`/`imgAlt` added after the WebPs were confirmed on disk. `--check` → verification PASS; full build run; `check-live.js` lists both new URLs as not live yet (local 39, live 37).

Next up: blog `perfume-box-structure-guide`, case study `gift-presentation-set-for-a-tea-brand`.

## 2026-10-15

Published day 5 of 15:
- Blog: "Perfume Box Structures: Cradles, Cap Clearance and the Weight of Glass" (`perfume-box-structure-guide`, Perfume)
- Case study: "A Gift Presentation Set for a Tea Brand: When the Carton Is the Right Answer" (`gift-presentation-set-for-a-tea-brand`, Sourcing)

Same routine as days 1–4: bodies written, 5 FAQs each, `planned: true` removed and `date` set to 2026-10-15, two 1600x900 thumbnails generated one at a time, renamed in `img-staging/`, MAP extended in `tools/prepare-images.py`, WebPs confirmed in `img/`, `img`/`imgAlt` added. `--check` → verification PASS (41 pages); full build run; `check-live.js` lists both new URLs as not live yet (local 41, live 39). Nothing committed or deployed.

Environment: `prepare-images.py` needs the hermes venv python (Pillow 12.3.0); the managed 3.13 has no PIL.

Next up: blog `cosmetic-packaging-leak-paths`, case study `rigid-box-for-a-chocolate-brand`.
