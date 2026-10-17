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
    date: '2026-10-11',
    imgAlt: 'Three rigid box greyboard sheets of different thicknesses next to a finished rigid box',
    img: 'blog-rigid-box-board-thickness.webp',
    body: 'rigid-box-board-thickness',
    faq: [
      {
        q: 'What board thickness should I specify for my rigid box?',
        a: 'Work through four inputs in order: what the box carries, the longest unsupported panel dimension, how many boxes will be stacked on it, and how the customer opens it. Under half a kilo with a panel under 250 mm and parcel shipping, 2 mm is genuinely right. A panel over 250 mm should treat 2 mm as the floor whatever the product weighs, and a palletised carton stack moves the number further than the product does.'
      },
      {
        q: 'Does thicker board simply mean a stronger box?',
        a: 'It means a much stiffer one, which is not the same thing — panel stiffness rises with roughly the cube of thickness, so 3 mm board is about eight times stiffer than 1.5 mm. But over-specifying adds exterior volume and that volume is what freight is charged on, so the return stops well before the thickness range does.'
      },
      {
        q: 'Can the lid and the base be made from different board?',
        a: 'Yes, and it is usually the better specification. The base carries the product and whatever is stacked above it; the lid only has to hold its own shape and close flat. Putting the thicker board in the base and the lighter board in the lid puts material where it works and takes weight off the part the customer lifts.'
      },
      {
        q: 'What should I check on the sample to confirm the board?',
        a: 'Measure it with a calliper at a corner and at the middle of a panel, because board is sometimes thinner at the fold than at the face. Then compare the exterior dimensions against what was quoted — the exterior is what you pay to ship, and it grows by 1 mm in each of length and width for every 0.5 mm of board.'
      },
      {
        q: 'Can I change the board thickness after the sample is made?',
        a: `Yes, and a revised sample takes ${trade.sampleLead} from the change being agreed. The cost is not the sampling time but the dieline: corner allowance, lid clearance and the wrap turn over the top edge are all set by the board, so they all move with it. That is the reason to settle thickness before the structure is drawn rather than after.`
      }
    ]
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
    date: '2026-10-12',
    imgAlt: 'A magnetic closure rigid box with the lid lifted, showing two recessed magnets in the front skirt and the steel plates in the lid',
    img: 'blog-magnetic-box-magnet-specification.webp',
    body: 'magnetic-box-magnet-specification',
    faq: [
      {
        q: 'How strong should the magnets in a magnetic closure box be?',
        a: 'Specify the performance rather than the part: the box must hold shut when inverted and when carried by the base, must open one-handed without being put down, and must still do both after a drop test if it ships direct. Given that, plus the lid dimensions and the board, the grade, size, count and position can be engineered and then proved on a physical sample. Naming N42 in a brief does not tell anyone what the box has to do.'
      },
      {
        q: 'Why does the lid lift at the corners when the box is carried by the base?',
        a: 'Because the closure is resisting a rotation about the back edge, not a straight pull, and the load is applied at exactly the point where the magnet is. Two magnets spaced out towards the corners hold better than one of the same total area placed centrally, for the same reason. It is also the check that catches an undersized closure almost every time, so approve the sample by carrying it loaded rather than by pressing it shut on a table.'
      },
      {
        q: 'Is a higher magnet grade worth specifying for a premium box?',
        a: 'Usually not. N38 to N42 covers nearly every rigid box, and the force gained by moving to N52 is smaller than the force lost to half a millimetre of extra material between the magnet and its counterpart. Grade is the last variable to reach for — geometry, count, position and the air gap are all decided in the dieline and all do more work.'
      },
      {
        q: 'What does the magnet close against?',
        a: 'Normally a mild steel plate recessed into the lid skirt to match. It is cheaper, it has no polarity to get wrong, and the magnet holds anywhere on it. A second magnet roughly doubles the force available in the same space and self-locates, but every unit has to be assembled with the polarity right, which makes it the part most likely to go wrong on a line. We quote steel unless there is a reason not to.'
      },
      {
        q: 'Can the magnet specification be changed after the first sample?',
        a: `Yes, and a revised sample takes ${trade.sampleLead} from the change being agreed. What matters is that the fix is usually not the magnet: if the magnets were recessed too deep, or the lid and base skirts are not registering flush, no grade will recover the force. Those are dieline dimensions, so the closure is worth settling before the structure is drawn rather than after.`
      }
    ]
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
    date: '2026-10-13',
    imgAlt: 'A two-piece rigid box with its lid lifted off beside a magnetic closure box with the lid hinged open at the spine',
    img: 'blog-two-piece-vs-magnetic-rigid-box.webp',
    body: 'two-piece-vs-magnetic-rigid-box',
    faq: [
      {
        q: 'Which structure should I choose — two-piece or magnetic?',
        a: 'Answer it from the journey rather than from the product. If the box travels on its own — shipped direct, carried by a courier, picked up by the base — the closure earns its cost, because a lid arriving off is the complaint you otherwise get. If it travels inside a retail carton or an outer shipper with the lid never moving, the two-piece is better value and the money reads better on the wrap or the interior print. The exception is retail shelving, where shoppers lift lids and re-seat them badly: a hinged lid always looks right on a shelf.'
      },
      {
        q: 'Why is my two-piece lid either too tight or too loose?',
        a: 'Because it is held by friction alone, and friction has a window — tight enough not to fall off when the box is tilted, loose enough to lift one-handed. That window is measured in fractions of a millimetre and it is set in the dieline. Approve a two-piece sample by lifting the lid with one hand: if it needs two hands or a wiggle, the window is wrong on every unit rather than on the sample.'
      },
      {
        q: 'How much more does a magnetic closure actually cost?',
        a: 'Not in the board or the wrap, which are the same in both structures — it is the hardware and the operations. Magnets and steel plates are bought components, the skirt board has to be recessed, the two halves have to register, and the spine has to be wrapped and folded. In our experience that puts the magnetic structure somewhere in the region of a fifth to a half above the equivalent two-piece box at the same size, board and finish, and the gap does not scale down at low quantities because the magnet minimum order and the setup are fixed.'
      },
      {
        q: 'Can I switch from one structure to the other after the artwork is finished?',
        a: `You can, and a revised sample takes ${trade.sampleLead} from the change being agreed — but the artwork does not survive it. The lid depth, the skirt, the board recesses and the back panel all move, so every panel the artwork was laid out against moves with them, and a design that crosses the spine has to allow for the fold or it breaks in half. It is also a re-quote. Settle the structure before the dieline rather than after the design.`
      },
      {
        q: 'How long will the hinge on a magnetic box last?',
        a: 'Longer than most products, if the wrap is chosen for it. A spine in a coated paper takes several hundred openings; a heavy textured stock cracks at the fold much sooner; a fabric or a reinforced construction outlasts the box. If the box is meant to be kept and reopened, the wrap is no longer a free choice — it is chosen against the hinge. One caveat: if the box has to be recycled in a single stream, say so before the closure is chosen, because the magnets and steel plates have to come out first.'
      }
    ]
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
    date: '2026-10-14',
    imgAlt: 'A matte black drawer box with its tray pulled out on a ribbon pull, beside a two-piece rigid box with its lid lifted off',
    img: 'blog-drawer-box-vs-lid-and-base.webp',
    body: 'drawer-box-vs-lid-and-base',
    faq: [
      {
        q: 'Which structure should I choose — a drawer box or a lid-and-base box?',
        a: 'Answer it from the journey and from the product. A lid-and-base box is the better value whenever the box travels inside something else, because the lid never moves in transit and the money reads better on the wrap or the interior print. A drawer box earns its cost when the box is opened on a table, one-handed, and looked down into, and when the tray staying attached matters — it cannot be lost or put down somewhere. It is the wrong choice when the box ships direct with no outer and no band, or when the product is heavy enough to press the tray onto the sleeve floor, because that turns a slide into a bind exactly when the customer pulls.'
      },
      {
        q: 'How much clearance does a drawer need, and where should it come from?',
        a: 'Between 0.5 mm and 0.8 mm per side, in both width and height, and it comes out of the sleeve — never out of the tray. The tray\'s exterior sets its interior, the interior sets the cavity, and the cavity sets the fitment holding the product, so shrinking the tray to make it slide takes the dimension out of the one part that cannot afford to give, and the product ends up loose in its own box. Growing the sleeve interior instead costs exterior volume, which on a box under about 200 mm is worth less than the grip is.'
      },
      {
        q: 'Why does the ribbon pull off the drawer?',
        a: 'Because it is usually glued to the outer face of the tray, so the pull load runs through the adhesive bond into a coated or laminated paper surface and releases — often at well under the force a customer applies to a drawer that sticks. The fix is not a stronger adhesive but a different load path: a slot is cut through the tray\'s front board, the ribbon end passes through it and is trapped under the wrap, so the load goes into the board and the failure moves to the ribbon itself. Test it by pulling hard with the box held by the sleeve; the ribbon should fail first.'
      },
      {
        q: 'Why did my drawers bind after shipping by sea when they were fine in the factory?',
        a: 'Not because the clearance shrank but because the board grew. Paperboard absorbs moisture and swells more across the grain than with it, and at half a millimetre per side that is enough to close the gap on the units whose grain ran the wrong way. The other cause is a sleeve whose corners were formed slightly proud, so the interior is correct across the middle of each panel and tight at the four corners — exactly where the tray corners travel. Specify a matte lamination on the sleeve\'s inner face, which seals the board and lowers the sliding friction, and gauge the sleeve interior with a go/no-go gauge rather than measuring across a panel.'
      },
      {
        q: 'Can I switch from one structure to the other after the first sample?',
        a: `Yes, and a revised sample takes ${trade.sampleLead} from the change being agreed. What does not survive it is the artwork and the insert: the usable interior changes because a drawer box has no lid volume to borrow, a tall product has to be laid down or the tray deepened, and every panel the artwork was laid out against moves with it. It is also a re-quote, because the operations are priced differently even though a drawer box uses slightly less board than the lid-and-base it replaces.`
      }
    ]
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
    date: '2026-10-15',
    imgAlt: 'A matte black two-piece rigid perfume box with the lid lifted off, a glass bottle standing in a foam cradle with clear air above its cap',
    img: 'blog-perfume-box-structure-guide.webp',
    body: 'perfume-box-structure-guide',
    faq: [
      {
        q: 'Should the lid and the base of a perfume box use the same board thickness?',
        a: 'No — the lid carries nothing but its own panel, so it does not need to match the base. On a 100 ml box we specify 2.0 mm greyboard on the base and 1.5 mm on the lid; on a 50 ml box 1.5 mm throughout. Specifying the heavier board on both adds material cost and exterior volume to the one part with no load in it. The other half of the answer is a doubler: a second layer of board glued under the cradle footprint inside the base, which is the cheapest thing that stops a base floor splitting at the crease on a corner drop.'
      },
      {
        q: 'Where should the cradle grip the bottle?',
        a: 'On the body, over 25 to 30 mm of contact height, with the cradle\'s top edge kept below the shoulder — and never on the neck. Glass is strong in compression along its axis and useless against a side load at the neck, which is the thinnest section on the bottle. Two drawing errors follow from getting this wrong: cutting the cavity to the bottle\'s widest point, which lets a tapered bottle sink through until it is lower than designed and unsupported; and letting the cradle rise past the shoulder, which grips a curved section that was never meant to take load.'
      },
      {
        q: 'How much clearance does a perfume cap need inside the box?',
        a: 'Two clearances, and both are usually left to the sampling stage to discover. Radially, 1.0 to 1.5 mm around the cap — not zero, because a cap touching the cavity wall on one side is a cap being pushed, and on a friction-fit cap that push works it loose in transit. Vertically, 4 to 6 mm between the top of the cap and the lid\'s interior face. That one is not about impact: a lid slides down over the base skirt on the way on, and if the cap is within a millimetre or two of the lid interior the lid catches it, tilts, and marks the foil the first time the box is closed.'
      },
      {
        q: 'EVA foam or paperboard for a perfume box insert?',
        a: 'Decide on odour first, because a box that opens with a chemical smell is a defect in this category before it is anything else — the customer\'s first act is to smell the contents. EVA is fine once fully cured and aired, and we specify low-VOC grade and hold it before assembly; some polyurethane and recycled-content foams are not fine. Board is odour-safe and recyclable in the same stream, but it has almost no compliance, so it locates rather than grips. The tie-breaker is the product: if the bottle has a screw or pour neck with any history of seepage, board absorbs the leak and keeps the smell permanently, which argues for foam despite the recyclability cost.'
      },
      {
        q: 'Can the cradle be changed after the first sample?',
        a: `Yes, and a revised sample takes ${trade.sampleLead} from the change being agreed. What tends not to survive it is the box height: a deeper cradle lifts the bottle, and the vertical clearance above the cap is the dimension that has to absorb that. Change the cradle contact height or the cavity diameter and re-check the 4 to 6 mm above the cap before assuming the lid still fits. Test the revised sample with the heaviest bottle in the range rather than a representative one — the worst case is not the average one.`
      }
    ]
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
    date: '2026-10-16',
    imgAlt: 'An open rigid cosmetic gift box with a die-cut paperboard insert holding four containers upright, a folded shoulder collar standing above one pump',
    img: 'blog-cosmetic-packaging-leak-paths.webp',
    body: 'cosmetic-packaging-leak-paths',
    faq: [
      {
        q: 'How much clearance should an insert have around a cosmetic bottle?',
        a: 'Two different numbers, used on two different parts. To locate a rigid container in a paperboard cavity, 0.5 to 1.0 mm per side — below about 0.5 mm the cavity will not release the container at assembly speed and the line starts forcing units in. To stop a container rotating or moving at all, 0.2 to 0.5 mm of interference per side in a compliant material such as EVA, which compresses to seat and does not change as the material wears. Clearance goes around the thing that has to release, interference around the thing that must not move: a dropper bulb gets clearance, a jar wall gets interference.'
      },
      {
        q: 'Why did my pump bottle leak when there was clearance above the actuator?',
        a: 'Because clearance only holds while the top panel stays where it was measured, and the load case that matters is the one where it does not. A courier stack, or a heavy parcel dropped onto the box, pushes the lid panel down by more than a few millimetres of allowance, and the actuator is the highest point inside, so it is what gets touched. The fix is a different load path rather than more space: a folded paperboard collar over the bottle shoulder, standing 2 to 3 mm taller than the actuator, so the load lands on the shoulder instead. Also worth asking whether the pump ships locked down, and checking that the insert is not occluding the pump vent.'
      },
      {
        q: 'How do I stop a screw-top jar backing off in transit?',
        a: 'Stop it rotating, because back-off is rotation rather than a failed seal. Vibration gives the jar a small oscillating torque, the lid is held by friction against the box interior, and the jar turns under it — a quarter turn is enough to take the liner out of compression. Grip the jar wall with an interference fit in a compliant material; pressure on the lid from above does nothing, because the load is not coming from above. Check it by applying torque to the jar with the box closed: if the lid turns with the jar, the grip is on the lid and the relative rotation you were trying to prevent is still there.'
      },
      {
        q: 'Should I use foam to protect a product that might leak?',
        a: 'Foam is the wrong choice for containing a leak, which is a different question from cushioning one. Closed-cell EVA absorbs nothing, so a leak stays liquid, pools in the cavity and is visible the moment the product is lifted out. Paperboard wicks, so a small seep becomes a large mark; moulded pulp absorbs quietly and reads as a shadow rather than a defect. If the container has a known seep path — a screw neck on an oil-based product, a pump that weeps after a hot leg — the honest fix is a barrier between the container and the insert. A two per cent leak rate on a 20,000-unit run is 400 replacements and 400 reviews; a bag costs cents.'
      },
      {
        q: 'How do I test a cosmetic fitment before production?',
        a: 'Four tests on the loaded, closed sample: twenty-four hours inverted at 40 °C for the pressure and viscosity case; one metre onto each corner for the lid-panel deflection that reaches the actuator; the real carton stack load applied to the top face for an hour; and weighing the container before and after to 0.1 g, because a seep that leaves no visible mark still loses mass. Run them with the real filled product and never with water — a surfactant formulation has a lower surface tension and finds paths water does not. Measure the closure torque before and after as well; a lid that has lost torque has backed off whether or not it has leaked yet. A revised sample after any change takes ' + trade.sampleLead + ' from the change being agreed.'
      }
    ]
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
    date: '2026-10-17',
    imgAlt: 'Three custom packaging samples on a workshop bench — an unprinted white dummy, a matte black two-piece box with its insert, and a printed sample — measured with a ruler and calliper',
    img: 'blog-packaging-sampling-process.webp',
    body: 'packaging-sampling-process',
    faq: [
      {
        q: 'What does a packaging sample fee actually cover?',
        a: 'Four things, none of which is profit: machine setup, because a press costs nearly as much to print one sheet as five hundred; tooling, because a cutting die has to be made before anything can be cut; materials bought at their minimum, which for a stock that is not on the shelf is a ream or a mill minimum rather than one box worth; and the engineering time to turn a description into a dieline. That is also why a free sample is worth less than it looks — it is built to be cheap, which in practice means a stock structure in a shelf material, hand-finished by the best person on the floor rather than made by the line that would make your run.'
      },
      {
        q: 'Is the sample fee refundable if I do not go ahead?',
        a: 'No, and the difference between "credited" and "refundable" is worth pinning down before you pay. Most suppliers, including us, credit the fee against the first production order, so in the normal case it ends up costing nothing. But it is spent rather than held: the die exists, the material minimum has been bought and the press has been set up, so if the project stops there is nothing to hand back. Also ask whether the credit survives a change of structure — moving from a two-piece to a drawer box is new tooling, and the fee is usually not credited twice.'
      },
      {
        q: 'Can I approve a sample from a photograph?',
        a: 'You can approve the appearance from a photograph and nothing else. Four things do not show up in an image: fit, because a lid with the right clearance and one with too much look identical; force, because a magnet that holds under a base carry and one that does not are the same magnet in the same position; odour, which no image carries; and stiffness, because whether a 250 mm panel flexes when you pick the box up loaded is the most common complaint about a box that looked right in every picture. If the courier wait matters, ask for video of the specific checks instead — the lid lifted one-handed, the box inverted, the product lifted out of its cavity.'
      },
      {
        q: 'When is a second round of sampling worth paying for?',
        a: 'When the change is a dimension, when the product has changed, or when the first sample failed a physical test — a lid that lifted, a magnet that let go, foil that flaked under tape, a drawer that bound. Those are defects, not preferences, and only a revised sample resolves them. It is not worth it when the change is in the artwork, which a print proof settles faster and cheaper, or when the brief itself is unresolved: "make it feel more premium" is not a specification, and a second box will feel wrong for reasons nobody can name. By a third round the problem is almost never the box — go back to the brief instead.'
      },
      {
        q: 'What does the sampling time actually run from?',
        a: `From approved artwork, not from the enquiry — which is why schedules slip in ways nobody's lead time accounts for. The weeks of email before the file is signed off are part of the project but not part of the clock. Once it has started, three things move it, and all three are yours to control: whether the structure is new or one we have cut before, whether the wrap material is on the shelf or has to be bought in, and how many finishes are involved, since each one that needs its own block, screen or plate adds a setup. Sampling runs ${trade.sampleLead} from approved artwork.`
      }
    ]
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
