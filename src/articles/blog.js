'use strict';

/* The blog catalogue.
 *
 * Each entry is metadata plus, once written, `body: '<file>'` naming the
 * long-form HTML in src/articles/bodies/. Reading time and the table of
 * contents are derived from that body, so neither is set here.
 *
 * `planned: true` means titled and scheduled but not yet written. A planned
 * entry produces no page and appears in no list, so the catalogue can run ahead
 * of the writing without anything linking to a page that does not exist.
 *
 * `date` is the publication date, rendered verbatim in the card, the byline and
 * the Article structured data. Set it to the real date when the body is
 * written — a scheduled date left in place after an early publication is a
 * small lie that search engines will repeat.
 *
 * `img` is the 1600x900 thumbnail in img/. Leave it out and the card falls back
 * to the designed category plate; add it and the photo takes over. Do not name
 * a file that is not there — checkArticles() fails the build. */

const { trade } = require('../config');

module.exports = [

  {
    slug: 'custom-rigid-box-manufacturing-process',
    title: 'How a Custom Rigid Box Is Made, From Board to Approved Sample',
    metaTitle: 'How a Custom Rigid Box Is Made, Step by Step | Metapackink',
    metaDesc:
      'The eight stages a custom rigid box passes through — board selection, wrap, corner forming, insert, finishing, sampling and approval — and what to check at each one.',
    excerpt:
      'A rigid box is not printed and folded; it is wrapped. That one fact decides which stages exist, why corners separate, why the second run costs less than the first, and what you should be inspecting at each handover.',
    category: 'Manufacturing',
    date: '2026-09-24',
    imgAlt: 'Custom rigid box during wrapping and corner forming at the Metapackink factory',
    img: 'blog-custom-rigid-box-manufacturing-process.webp',
    body: 'custom-rigid-box-manufacturing-process',
    faq: [
      {
        q: 'How long does a first rigid box run take?',
        a: `Sampling is ${trade.sampleLead} from approved artwork, and production ${trade.productionLead} from the later of the sample being signed off or the deposit clearing. The variable that moves most is structure development: a standard lid-and-base box is quick, a new custom structure with a die-cut insert can add a week before sampling even starts.`
      },
      {
        q: 'Why do corners sometimes separate on a rigid box?',
        a: 'Almost always the wrap material or the corner-forming tension rather than the board. Heavier textured papers and fabrics need more wrap allowance at the corner, and if that allowance is not built into the dieline the paper pulls back as the adhesive cures. It is fixed in the dieline, not on the line.'
      },
      {
        q: 'What is the minimum order for a rigid box?',
        a: 'Typically low hundreds of pieces, because that is roughly where the tooling and setup stop dominating the unit cost. Below that it is usually still possible, just less economical — we will tell you plainly when a quantity is not worth producing rather than quoting it as though it were.'
      },
      {
        q: 'Do I need finished artwork before you can quote?',
        a: 'No. Structure, board, wrap material, dimensions and finishing can all be quoted from a description, and quoting structure before artwork exists is normal. Artwork only becomes necessary for the sample.'
      },
      {
        q: 'Is a physical sample always produced?',
        a: 'Yes, for every production run. The approved sample becomes the reference the production line is measured against, which is what makes a quality dispute resolvable rather than a matter of opinion.'
      }
    ]
  },

  {
    slug: 'rigid-box-board-thickness',
    title: 'Rigid Box Board Thickness: Specifying It From the Product, Not From Habit',
    metaTitle: 'Rigid Box Board Thickness Guide | 1.5mm to 3mm | Metapackink',
    metaDesc:
      'How to choose greyboard thickness for a rigid box from product weight and box size, what goes wrong at each end of the range, and why 2mm is not always the safe answer.',
    excerpt:
      'Thickness is usually copied from the last project rather than calculated from the current one. Here is what actually drives it — product weight, box size, stack height and how the box is opened — and what fails when you go too thin or too thick.',
    category: 'Materials',
    date: '2026-10-15',
    planned: true
  },

  {
    slug: 'magnetic-box-magnet-specification',
    title: 'Magnetic Closure Boxes: Magnet Strength, Position and How the Lid Should Shut',
    metaTitle: 'Magnetic Closure Box Magnets: Strength & Placement | Metapackink',
    metaDesc:
      'How magnet grade, size, count and position determine whether a magnetic closure box shuts with a firm click or peels open in transit, and how to specify it before sampling.',
    excerpt:
      'A magnetic box that opens too easily and one that fights the customer are the same specification error in opposite directions. Magnet grade, count and position are chosen together, and the only reliable test is a physical sample.',
    category: 'Structures',
    date: '2026-10-22',
    planned: true
  },

  {
    slug: 'two-piece-vs-magnetic-rigid-box',
    title: 'Two-Piece or Magnetic Rigid Box? A Decision You Should Make Before Artwork',
    metaTitle: 'Two-Piece vs Magnetic Rigid Box | Which to Choose | Metapackink',
    metaDesc:
      'Comparing lid-and-base and magnetic closure rigid boxes on opening experience, cost, durability in transit, freight volume and which products suit each.',
    excerpt:
      'Both are rigid boxes with the same board and the same wrap. They differ in one mechanism, and that one difference changes the opening experience, the freight cost and the failure mode.',
    category: 'Structures',
    date: '2026-10-29',
    planned: true
  },

  {
    slug: 'drawer-box-vs-lid-and-base',
    title: 'Drawer Boxes vs Lid-and-Base: What the Opening Sequence Costs You',
    metaTitle: 'Drawer Boxes vs Lid-and-Base Boxes | Comparison | Metapackink',
    metaDesc:
      'How a sliding drawer box and a lift-off lid-and-base box differ in structure, clearance, insert design, assembly time and the unboxing they produce.',
    excerpt:
      'A drawer box adds a sliding tolerance that a lid-and-base box does not have, and that tolerance has to come from somewhere. Understanding where it goes prevents the ribbon pulling loose and the tray jamming.',
    category: 'Structures',
    date: '2026-11-05',
    planned: true
  },

  {
    slug: 'perfume-box-structure-guide',
    title: 'Perfume Box Structures: Cradles, Cap Clearance and the Weight of Glass',
    metaTitle: 'Perfume Packaging Structures & Cradle Design | Metapackink',
    metaDesc:
      'Designing a perfume box around the bottle: cradle geometry, neck and cap clearance, board selection for glass weight, and why the bottle is the load the structure carries.',
    excerpt:
      'In perfume packaging the bottle is not a component inside the box, it is the load the box exists to carry. That reframing settles cradle design, board thickness and where the box has to be reinforced.',
    category: 'Perfume',
    date: '2026-11-12',
    planned: true
  },

  {
    slug: 'cosmetic-packaging-leak-paths',
    title: 'Where Cosmetic Packaging Leaks, and How the Insert Prevents It',
    metaTitle: 'Cosmetic Packaging Leak Prevention & Insert Design | Metapackink',
    metaDesc:
      'The leak paths in skincare and cosmetic packaging — pump, cap, pipette, travel — and how cutout geometry, insert material and clearance are specified to close them.',
    excerpt:
      'Leaks are rarely a bottle fault. They are a tolerance between the container and the insert that lets the container move during transit, and that tolerance is chosen at the design stage.',
    category: 'Cosmetics',
    date: '2026-11-19',
    planned: true
  },

  {
    slug: 'packaging-sampling-process',
    title: 'What Actually Happens During Packaging Sampling, and What It Costs',
    metaTitle: 'Packaging Sampling Process & Cost Explained | Metapackink',
    metaDesc:
      'The sampling stage of a custom packaging project: what the fee covers, why it is charged, how long it takes, what to check on arrival and when a second round is worth it.',
    excerpt:
      'The sample fee is not a deposit and it is not a profit centre. Knowing what it actually pays for makes the approval decision — and the question of whether to sample twice — much less of a guess.',
    category: 'Manufacturing',
    date: '2026-11-26',
    planned: true
  },

  {
    slug: 'packaging-dieline-and-tooling',
    title: 'Dielines, Tooling and Why Your Second Run Costs Less Than the First',
    metaTitle: 'Packaging Dielines & Tooling Costs Explained | Metapackink',
    metaDesc:
      'What a dieline is, what cutting and creasing tooling costs, who owns it, how long it is kept, and why the tooling charge does not repeat on a reorder.',
    excerpt:
      'The tooling charge on a first order is a one-off, which is why a reorder of the same structure is meaningfully cheaper. What is less obvious is what happens when you change the artwork but keep the structure.',
    category: 'Manufacturing',
    date: '2026-12-03',
    planned: true
  },

  {
    slug: 'packaging-quality-control-checklist',
    title: 'A Pre-Shipment Quality Control Checklist for Custom Packaging',
    metaTitle: 'Packaging Pre-Shipment QC Checklist | Metapackink',
    metaDesc:
      'What to check before a custom packaging order ships: dimensions against the dieline, board thickness, print and colour, finishing adhesion, assembly, count and carton condition.',
    excerpt:
      'Most packaging disputes are decidable in ten minutes with the approved sample and a ruler. This is the list we check against, written so a buyer can run the same checks on arrival.',
    category: 'Quality',
    date: '2026-12-10',
    planned: true
  },

  {
    slug: 'how-to-write-a-packaging-rfq',
    title: 'How to Write a Packaging RFQ That Comes Back With a Price You Can Use',
    metaTitle: 'How to Write a Packaging RFQ | Template & Checklist | Metapackink',
    metaDesc:
      'The eight pieces of information that let a packaging manufacturer quote properly, what to do when you do not know the structure yet, and how to compare two quotations fairly.',
    excerpt:
      'A quotation is only as specific as the brief behind it. This is the minimum information that turns a vague range into a number you can actually plan a launch around.',
    category: 'Sourcing',
    date: '2026-12-17',
    planned: true
  },

  {
    slug: 'sourcing-custom-packaging-from-china',
    title: 'Sourcing Custom Packaging From China: What to Verify Before You Order',
    metaTitle: 'Sourcing Custom Packaging From China | Buyer Checklist | Metapackink',
    metaDesc:
      'How to evaluate a Chinese packaging manufacturer: what to ask for, which documents are real evidence and which are not, factory versus trading company, payment terms and inspection.',
    excerpt:
      'The difference between a factory and a trading company matters less than most buyers assume. What matters is whether the entity answering your emails controls the machine that will make your box.',
    category: 'Sourcing',
    date: '2026-12-24',
    planned: true
  },

  {
    slug: 'insert-options-for-rigid-boxes',
    title: 'Rigid Box Inserts: Foam, Board and Moulded Pulp, and What Each One Costs You',
    metaTitle: 'Rigid Box Insert Options Compared | Foam, Board, Pulp | Metapackink',
    metaDesc:
      'How to choose between foam, die-cut paperboard and moulded pulp inserts for a rigid box, and what each one does to interior clearance, assembly time, freight volume and unit cost.',
    excerpt:
      'The insert decides whether the product arrives centred, how long the line takes to pack it, and how much air you end up shipping. It is also the part most often specified by habit rather than by calculation.',
    category: 'Structures',
    date: '2026-12-31',
    planned: true
  },

  {
    slug: 'packaging-print-file-setup',
    title: 'Print Files for Packaging: What Has to Be Right Before You Send Them',
    metaTitle: 'Packaging Print File Setup | Dieline, Bleed, Spot Colour | Metapackink',
    metaDesc:
      'What a packaging printer needs from a design file — dieline layer, bleed, spot colours, trapping and proofing — and which mistakes are expensive to discover at press.',
    excerpt:
      'Most problems blamed on the printing are decided before the file arrives: missing bleed, a gap in the dieline, a spot colour nobody specified. They are all cheap to fix at this stage and none are cheap to fix after it.',
    category: 'Artwork',
    date: '2027-01-07',
    planned: true
  },

  {
    slug: 'moq-and-unit-cost-in-packaging',
    title: 'Why Packaging Unit Cost Falls With Quantity, and Where It Stops',
    metaTitle: 'Packaging MOQ and Unit Cost Explained | Metapackink',
    metaDesc:
      'How minimum order quantities, tooling and machine setup spread across a run, why unit cost drops steeply and then flattens, and how to choose a quantity that is not a false economy.',
    excerpt:
      'The unit cost curve falls steeply and then flattens. Knowing where the flat part starts is the difference between buying for the year and paying rent on inventory nobody has sold yet.',
    category: 'Cost & Pricing',
    date: '2027-01-14',
    planned: true
  },

  {
    slug: 'shipping-and-export-packaging',
    title: 'Export Packing for Custom Packaging: Cartons, Pallets and the Cost of Damage',
    metaTitle: 'Export Packing for Custom Packaging | Cartons & Pallets | Metapackink',
    metaDesc:
      'How finished boxes are cartoned, palletised and shipped, what sea, air and express each do to a rigid box in transit, and where damage actually comes from.',
    excerpt:
      'Boxes that survived ninety days in a container get crushed in the last mile. Export packing is mostly about compression and humidity, and both are decisions made long before anything is loaded.',
    category: 'Logistics',
    date: '2027-01-21',
    planned: true
  }

];
