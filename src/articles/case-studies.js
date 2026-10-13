'use strict';

/* The case study catalogue. Same shape and same rules as src/articles/blog.js.
 *
 * These differ from the blog in one respect that matters: the honest unit is a
 * project, not a topic. Each note describes a real brief and the constraint
 * that decided it, so the reading is useful to someone with a similar product
 * rather than a list of things we are able to do.
 *
 * Client names, artwork and exact commercial figures are deliberately absent.
 * Dimensions, board, wrap, insert material, finishing and quantity bands are
 * not — those are the parts a buyer can actually reuse, and they are the parts
 * a supplier is normally vague about. */

const { trade } = require('../config');

module.exports = [

  {
    slug: 'magnetic-gift-set-for-a-skincare-brand',
    title: 'A Magnetic Gift Set for a Skincare Brand: Fitting Three Bottles Into One Rigid Shell',
    metaTitle: 'Case Study: Magnetic Gift Set for a Skincare Brand | Metapackink',
    metaDesc:
      'How a three-piece skincare gift set was fitted into a magnetic closure rigid box, and why the insert material changed the box size, the freight cost and the assembly time.',
    excerpt:
      'Three glass bottles of different heights in one presentation box. The structure was straightforward; the decision that shaped the project was the insert, and it moved the box size in a direction nobody expected.',
    category: 'Cosmetics',
    date: '2026-09-30',
    imgAlt: 'Magnetic closure rigid gift box with moulded insert holding three skincare bottles',
    img: 'case-magnetic-gift-set-for-a-skincare-brand.webp',
    body: 'magnetic-gift-set-for-a-skincare-brand',
    faq: [
      {
        q: 'Why did the insert change the size of the box?',
        a: 'Because a moulded insert needs a wall thickness to hold its own shape, and that thickness is subtracted from the usable interior. The bottles had not changed; the cavity around them had grown by roughly 10 mm on each side, and the outer box had to grow with it.'
      },
      {
        q: 'Could the same result have been reached with a die-cut paperboard insert?',
        a: 'Yes for a smaller or lighter set. With three glass bottles the paperboard version needed a folded rib between each pair to stop them touching, and the folded assembly consumed more clearance than the moulded insert did. Below two bottles, paperboard usually wins on both cost and volume.'
      },
      {
        q: 'How is the magnet specified for a box of this size?',
        a: 'The closure was sized against the lid overhang and the weight of the loaded box rather than copied from a previous job. A larger lid needs either more magnets or a stronger grade, otherwise the corners of the lid lift when the box is carried by the base.'
      },
      {
        q: 'What should a brand check on the sample for a set like this?',
        a: 'Load the actual filled bottles, close the lid and turn the box upside down. Then carry it by the base only. Those two checks catch most cradle and magnet problems before production, and they are impossible to judge from a photograph.'
      }
    ]
  },

  {
    slug: 'perfume-coffret-for-a-fragrance-house',
    title: 'A Perfume Coffret: Carrying a 100 ml Glass Bottle in a Rigid Box',
    metaTitle: 'Case Study: Perfume Coffret Rigid Box | Metapackink',
    metaDesc:
      'Designing a rigid coffret around a 100 ml glass perfume bottle: board selection for glass weight, cradle geometry, cap clearance and how the box survives a courier network.',
    excerpt:
      'A full 100 ml bottle is a heavy, hard, fragile object in a thin-walled box. Everything about this structure follows from taking the bottle weight seriously at the start rather than discovering it at the drop test.',
    category: 'Perfume',
    date: '2026-10-11',
    imgAlt: 'A two-piece rigid perfume coffret with the lid lifted, showing a glass bottle held by a die-cut shoulder insert',
    img: 'case-perfume-coffret-for-a-fragrance-house.webp',
    body: 'perfume-coffret-for-a-fragrance-house',
    faq: [
      {
        q: 'Why does it matter which part of the bottle carries the load?',
        a: 'Glass is strongest in compression through the foot, where the section is thickest, and weakest at the neck, where the wall is thin and the thread concentrates stress. An insert that grips the bottle along its length — a foam silhouette, for instance — can end up hanging the bottle from its shoulder, and a shoulder hang is what cracks in a drop. We specify that the foot rests on the base panel and everything above it only locates.'
      },
      {
        q: 'How is the aperture in the shoulder shelf sized?',
        a: 'It has two limits, both readable off the bottle drawing before anything is cut. It must be larger than the widest part that passes through it — here the 28 mm cap, so 36 mm gives 8 mm of freedom — and smaller than the shoulder it has to catch, here 48 mm. The shoulder is a slope rather than a step, so the contact is a ring, which makes the fit tolerant of batch variation in the glass.'
      },
      {
        q: 'Why let the cap sit inside the lid instead of making the base taller?',
        a: 'Because deepening the base to hide the cap adds exterior height for no benefit and makes the bottle harder to lift out. Letting the top 25 mm of the bottle occupy the lid costs nothing structurally and keeps the box smaller — and exterior height is freight, paid once per carton and again per pallet.'
      },
      {
        q: 'Why is 5 mm of clearance above the cap needed rather than 2 mm?',
        a: 'Two millimetres is a static measurement and a drop is not static: the lid panel deflects downward on impact, and at 2 mm the cap marked the interior of the lid. The better fix is not a deeper lid but a board stiffener under the lid panel, because that removes the deflection rather than simply moving the lid further away from it.'
      },
      {
        q: 'Could the same coffret have been made with a moulded pulp insert?',
        a: `Yes, and a second sample in moulded pulp was quoted alongside it at ${trade.sampleLead}. It would have held the bottle just as well. It was not chosen because a moulded cavity needs wall thickness to hold its own shape, and on a single-bottle box that thickness is paid for in exterior volume for no gain — a die-cut board insert with a shelf does the same job in less space, with no tooling beyond a cutting die.`
      }
    ]
  },

  {
    slug: 'drawer-box-for-a-watch-brand',
    title: 'A Drawer Box for a Watch Brand: Where the Sliding Tolerance Has to Come From',
    metaTitle: 'Case Study: Drawer Box for a Watch Brand | Metapackink',
    metaDesc:
      'A drawer box with a ribbon pull for a mechanical watch: tray clearance, ribbon anchoring, cushion fitment and the assembly step that decides whether the drawer glides.',
    excerpt:
      'The drawer has to slide, which means it cannot touch. Every millimetre of that clearance comes out of somewhere, and if it comes out of the cushion the watch moves instead of the tray.',
    category: 'Structures',
    date: '2026-10-12',
    imgAlt: 'A wrapped drawer box with the tray pulled halfway out of the sleeve, ribbon pull visible and a fabric cushion form seated in the tray cavity',
    img: 'case-drawer-box-for-a-watch-brand.webp',
    body: 'drawer-box-for-a-watch-brand',
    faq: [
      {
        q: 'Why should the slide clearance come out of the sleeve rather than the tray?',
        a: 'Because the tray\'s exterior sets its interior, the interior sets the cavity, and the cavity sets the fitment that holds the product. Shrinking the tray to make it slide takes the clearance out of the one part that cannot afford to give — the watch ends up on a smaller cushion with less grip. Growing the sleeve interior instead leaves the tray, the cavity and the product at the size they need, and on a box this size the extra exterior volume is negligible against the freight.'
      },
      {
        q: 'How tight does the fitment need to be inside the drawer?',
        a: 'Tighter than the slide clearance. A drawer converts a pull on the ribbon into movement of everything in it, and that only works if the cushion grips the cavity harder than the tray resists the sleeve — otherwise the tray comes out and the product stays where it was, arriving at the back of its own box. We cut the cavity 2 mm undersize per side so the EVA compresses to seat, which is an interference fit rather than a friction one and does not change as the fabric wears.'
      },
      {
        q: 'Why did the first sample\'s ribbon pull off?',
        a: 'It was glued to the outer face of the tray, so the pull load went through the adhesive bond to a coated paper surface and it released at roughly 3 kg. The fix was not a stronger glue but a different load path: a slot is cut through the tray board, the ribbon end passes through it and is trapped under the wrap, so the load goes into the board. The failure moves from the glue line to the ribbon itself.'
      },
      {
        q: 'Why did some drawers bind only after shipping by sea?',
        a: 'Not because the clearance shrank but because the board grew. Paperboard absorbs moisture and swells more across the grain than with it, and at 0.5 mm per side that is enough to close the gap on the units whose grain ran the wrong way. The clearance was opened to 0.8 mm per side and the wrap specified with a matte lamination, which seals the board against moisture uptake and lowers the sliding friction at the same time.'
      },
      {
        q: 'What is the one check that prevents a drawer from jamming in production?',
        a: 'Gauge the sleeve interior rather than measuring it. The defect that causes binding is not a sleeve that is too small overall — it is a sleeve whose corners were formed slightly proud, so the interior is correct across the middle of each panel and tight at the four corners, which is exactly where the tray corners travel. A go/no-go gauge cut to the minimum interior dimension finds it in a second, and no amount of specification review will.'
      }
    ]
  },

  {
    slug: 'cosmetic-mailer-for-a-dtc-colour-brand',
    title: 'A DTC Mailer for a Colour Cosmetics Brand: Surviving the Post Without Losing the Unboxing',
    metaTitle: 'Case Study: DTC Cosmetic Mailer Box | Metapackink',
    metaDesc:
      'An e-commerce mailer for pressed powder and liquid colour cosmetics: corrugated grade, crush resistance, interior printing, and the cost trade-off against a rigid box.',
    excerpt:
      'Pressed powder breaks and liquid leaks, and the customer opens the parcel before they open the product. A mailer has to absorb both the postal network and the unboxing, which usually means one compromise stated openly.',
    category: 'Cosmetics',
    date: '2026-10-13',
    imgAlt: 'An open printed corrugated mailer with a die-cut paperboard tray holding a palette face down and a glass foundation bottle beside a paperboard collar',
    img: 'case-cosmetic-mailer-for-a-dtc-colour-brand.webp',
    body: 'cosmetic-mailer-for-a-dtc-colour-brand',
    faq: [
      {
        q: 'Why is the palette shipped lid-down rather than lid-up?',
        a: 'Because the mirror is bonded at its edges and unsupported across the middle, so a load on the compact lid flexes the glass and glass flexed across an unsupported span cracks — two of five units crazed in the first drop test. Lid-down, the mirror rests flat on the tray floor and is supported across its whole area, and the load path runs through the compact base instead of its lid. It also keeps the friction catch closed: vibration opens those catches, and lid-down means any powder that escapes stays inside the compact rather than dusting the interior the customer is about to film.'
      },
      {
        q: 'Why was the foam insert rejected when it protected the products better?',
        a: 'It protected them perfectly and failed on everything else — the unboxing read as industrial, and the brand claimed kerbside recyclability that a foam block contradicts in the customer\'s hands rather than in a specification. Replacing it with paperboard gave back real protection, and that protection then had to be recovered by geometry rather than by material: the lid-down orientation and the shoulder collar. That is the trade in full — paperboard cushions less per millimetre, so with paperboard the fitment has to be the part that is engineered.'
      },
      {
        q: 'Why wasn\'t 4 mm of clearance above the pump enough to stop the leak?',
        a: 'Because clearance only works while the top panel stays where it is, and a courier stack pushes the top panel down. The sample held on the bench and one unit leaked in the compression test. The fix is not more clearance but a different load path: a folded paperboard collar sits over the bottle shoulder, taller than the pump head by about 3 mm, so any downward load lands on the collar and goes into the shoulder instead of actuating the pump. The same collar doubles as the divider between the two wells.'
      },
      {
        q: 'Will E-flute survive being stacked, or should the mailer be B-flute?',
        a: 'E-flute survived it here, because the crush requirement was met by the fitment rather than by the board. B-flute resists crushing and cushions better, but it is roughly twice the thickness, it shows flute lines through solid areas of print, and 3 mm on every face is exterior volume paid for twice — in the carton and in the parcel. The order we recommend is to buy the print surface you want and make the interior carry the load, and only go up a flute if the fitment cannot get there.'
      },
      {
        q: 'When is a rigid box the right answer instead of a mailer?',
        a: 'When the box is handled, opened and re-closed by strangers rather than opened once by the buyer — retail, gifting, anything where the box is part of the product. On this project a two-piece rigid box in a corrugated shipper was quoted alongside the mailer at roughly three times the unit cost and enough extra weight per parcel to move the shipping band, and we advised against it: the rigid version is a better object, but it is bought once, filmed once and then sits on a shelf. One practical note if you do go rigid — a rigid box is not a shipping container, so it needs an outer shipper, which the mailer does not.'
      }
    ]
  },

  {
    slug: 'two-piece-rigid-box-for-a-jewellery-label',
    title: 'A Two-Piece Rigid Box for a Jewellery Label: Sizing Around a Ring That Moves',
    metaTitle: 'Case Study: Two-Piece Rigid Box for Jewellery | Metapackink',
    metaDesc:
      'A lid-and-base rigid box with a slot insert for a jewellery range spanning multiple ring and pendant sizes, and how one box was made to fit the whole range.',
    excerpt:
      'One box for a range of sizes is a fitting problem, not a packaging problem. The answer was a compliant insert that holds the smallest item as firmly as the largest, with a lid depth set by the tallest.',
    category: 'Structures',
    date: '2026-11-25',
    planned: true
  },

  {
    slug: 'gift-presentation-set-for-a-tea-brand',
    title: 'A Gift Presentation Set for a Tea Brand: When the Carton Is the Right Answer',
    metaTitle: 'Case Study: Tea Gift Presentation Packaging | Metapackink',
    metaDesc:
      'A presentation set for loose-leaf tea where a folding carton with a rigid-look finish outperformed a rigid box on cost, freight volume and recyclability.',
    excerpt:
      'The brief asked for a rigid box. The right answer was a carton, and saying so cost us the larger order. The reasoning is worth writing down because it applies to a whole class of products.',
    category: 'Sourcing',
    date: '2026-12-09',
    planned: true
  },

  {
    slug: 'rigid-box-for-a-chocolate-brand',
    title: 'A Rigid Box for a Chocolate Brand: Keeping Tempered Bars Solid Inside a Wrapped Shell',
    metaTitle: 'Case Study: Rigid Box for a Chocolate Brand | Metapackink',
    metaDesc:
      'A chocolate bar that softens above 28 degrees, a box that sits in a shop window, and the board and insert decisions that kept the two apart.',
    excerpt:
      'Nothing about the box was unusual. The constraint was the product: tempered chocolate loses its snap well below the temperature a shop window reaches, and every decision followed from that.',
    category: 'Confectionery',
    date: '2026-12-23',
    planned: true
  },

  {
    slug: 'subscription-box-for-a-coffee-roaster',
    title: 'A Subscription Box for a Coffee Roaster: Holding Its Shape Through the Post, Every Month',
    metaTitle: 'Case Study: Subscription Box for a Coffee Roaster | Metapackink',
    metaDesc:
      'A monthly box carrying a kilo of beans: repeated cost, repeated handling, and why a structure that survives one month of shipping often fails on the twelfth.',
    excerpt:
      'Subscription packaging is not one box shipped once. It is the same box shipped every month, so the things that wear — the closure, the corners, the print — become the specification.',
    category: 'Food & Beverage',
    date: '2027-01-06',
    planned: true
  },

  {
    slug: 'magnetic-box-for-an-electronics-accessory-brand',
    title: 'A Magnetic Box for an Electronics Accessory Brand: Protecting Without Wrapping Everything in Foam',
    metaTitle: 'Case Study: Magnetic Box for an Electronics Accessory Brand | Metapackink',
    metaDesc:
      'A small electronics accessory that had to arrive unmarked, presented without a foam lining, and what replaces foam once it is off the table.',
    excerpt:
      'Foam solves protection and quietly damages the unboxing. Removing it meant solving the same problem with paper — and accepting a slightly larger cavity to do it.',
    category: 'Electronics',
    date: '2027-01-20',
    planned: true
  },

  {
    slug: 'candle-box-for-a-home-fragrance-label',
    title: 'A Candle Box for a Home Fragrance Label: Insulating a Vessel That Generates Its Own Heat',
    metaTitle: 'Case Study: Candle Box for a Home Fragrance Label | Metapackink',
    metaDesc:
      'A glass candle vessel, a wax that softens in transit, and the insert geometry that stopped the product carrying load through its own weakest part.',
    excerpt:
      'Glass is strong in compression and useless in point loading. Most candle boxes fail by loading the rim, which is the one place glass cannot take it.',
    category: 'Home Fragrance',
    date: '2027-02-03',
    planned: true
  },

  {
    slug: 'treatment-set-for-a-skincare-clinic',
    title: "A Skincare Clinic's Treatment Set: One Insert for Six Different Product Heights",
    metaTitle: 'Case Study: Skincare Clinic Treatment Set | Metapackink',
    metaDesc:
      'Six products of different heights in one presentation box, and the stepped cradle that held them all without a moulded tool.',
    excerpt:
      'The obvious answer is a moulded insert sized for the tallest item. The one that shipped was stepped, cheaper, and did not need tooling at all.',
    category: 'Cosmetics',
    date: '2027-02-17',
    planned: true
  },

  {
    slug: 'gift-box-for-a-fashion-label',
    title: 'A Gift Box for a Fashion Label: Holding a Folded Garment Without a Crease Along the Fold',
    metaTitle: 'Case Study: Gift Box for a Fashion Label | Metapackink',
    metaDesc:
      'A folded garment in a presentation box, the tissue-and-board assembly that replaced a pleat, and what arrives creased when neither is used.',
    excerpt:
      'Garments crease along the fold, not from being boxed. Stopping that is a question of what supports the fold, and paperboard does it better than foam.',
    category: 'Apparel',
    date: '2027-03-03',
    planned: true
  },

  {
    slug: 'supplement-box-for-a-wellness-brand',
    title: 'A Supplement Box for a Wellness Brand: Meeting Labelling Rules Without Redesigning the Print',
    metaTitle: 'Case Study: Supplement Box for a Wellness Brand | Metapackink',
    metaDesc:
      'Supplement labelling rules that arrived after the artwork was approved, and the structural change that made room for them without a reprint.',
    excerpt:
      'Regulatory text grows after approval more often than before it. A structure that assumes it will fit nowhere is a structure that gets redesigned mid-run.',
    category: 'Health & Supplements',
    date: '2027-03-17',
    planned: true
  },

  {
    slug: 'print-box-for-an-illustrator',
    title: 'A Print Box for an Illustrator: Protecting a Flat Sheet From Corner Damage',
    metaTitle: 'Case Study: Print Box for an Illustrator | Metapackink',
    metaDesc:
      'An art print that has to arrive flat and unmarked, and how corner construction and interior padding solved it without a tube.',
    excerpt:
      'A print has one failure mode: a creased corner. Everything about the box exists to keep a flat object flat while something heavy is stacked on top of it.',
    category: 'Stationery & Print',
    date: '2027-03-31',
    planned: true
  },

  {
    slug: 'gift-box-for-a-distillery',
    title: 'A Gift Box for a Distillery: Carrying a Heavy Bottle Without Adding a Handle',
    metaTitle: 'Case Study: Gift Box for a Distillery | Metapackink',
    metaDesc:
      'A heavy glass bottle in a presentation box, why the handle most briefs ask for is usually the wrong answer, and what carries the load instead.',
    excerpt:
      'A handle moves the whole load into one panel of board. There is a better way to make a heavy box easy to carry, and it costs less than a handle does.',
    category: 'Spirits',
    date: '2027-04-14',
    planned: true
  },

  {
    slug: 'pet-care-box-for-a-premium-brand',
    title: 'A Premium Pet Care Box: Making a Large, Light Package Survive Being Stacked',
    metaTitle: 'Case Study: Premium Pet Care Box | Metapackink',
    metaDesc:
      'A large box carrying very little weight, which is the worst possible case for stacking, and the board specification that stopped it collapsing from the bottom.',
    excerpt:
      'Heavy and small is easy. Large and light is the hard one: nothing is stabilising the panels, and the first pallet is what usually finds that out.',
    category: 'Pet Care',
    date: '2027-04-28',
    planned: true
  }

];
