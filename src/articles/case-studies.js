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
    date: '2026-10-14',
    imgAlt: 'A small two-piece rigid jewellery box with the lid lifted off, a gold ring standing in a single slit cut into a suedette-wrapped pad',
    img: 'case-two-piece-rigid-box-for-a-jewellery-label.webp',
    body: 'two-piece-rigid-box-for-a-jewellery-label',
    faq: [
      {
        q: 'How does one slit hold a ring when the sizes in the range are different?',
        a: 'It is a wedge, not a fit. A ring pushed band-first into a slit is held by the slit\'s ends, at the depth where the width of the ring equals the length of the slit — and that can only happen if the slit is shorter than the ring. A larger ring wedges at a shallower depth and stands taller; a smaller one sinks deeper. Here a 16 mm slit wedged the smallest ring at 5.8 mm deep and the largest at 3.8 mm, both held by the same two contact points, with the 10 mm floor below the slit there only so nothing can ever drop through.'
      },
      {
        q: 'Why is the slit sized from the smallest ring rather than the largest?',
        a: 'Because a slit long enough to admit the largest ring will also admit the smallest, and the smallest then never reaches a width that wedges — it falls straight through to the floor of the slot. That is what the first sample did: a 20 mm slit, cut to the largest ring, dropped the smallest ring the full 12 mm so that it stood less than 5 mm proud of the pad and had to be dug out with a fingernail. It looked fine in a photograph, which is why it is measured rather than looked at.'
      },
      {
        q: 'How is the lid depth chosen when one box has to hold a whole range?',
        a: 'From the tallest configuration in the range, which is often not the item that looks tallest. Here a size R ring with an 8 mm setting stood 24.8 mm above the pad, and with the pad top 12 mm below the rim that put its top 12.8 mm above the rim — beating the tallest pendant by 0.8 mm. The lid interior was set to 18 mm, leaving just over 5 mm above it. Two millimetres would not have been enough: a lid panel deflects downward on impact, and at 2 mm the setting marks the interior.'
      },
      {
        q: 'Why EVA for the pad instead of die-cut paperboard?',
        a: 'Two reasons, both material properties rather than preferences. EVA is compliant, so the same slit grips a 2 mm solitaire band and a 6 mm wide band without the grip collapsing on the thin one, and it accepts an undercut: the chain channel is 5 mm wide and 7 mm deep with its mouth narrower than its body, so the chain presses in at assembly speed and does not come back out in transit. A slot in board is the same width all the way down, so it cannot do that. The tooling is also one steel-rule die per pad rather than a mould per SKU.'
      },
      {
        q: 'Can the slit be changed after the first sample?',
        a: `Yes, and a revised sample takes ${trade.sampleLead} from the change being agreed. The pad itself is the cheap part — it is one steel-rule die — but the slit length sets how high every ring in the range stands, so changing it can move the lid depth that was chosen off the tallest configuration. That is the reason to fix the slit against the smallest item before the box height is settled rather than after.`
      }
    ]
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
    date: '2026-10-15',
    imgAlt: 'A matte black telescoping carton gift set with its slipcase lid lifted off, three aluminium tea caddies standing through a die-cut board platform',
    img: 'case-gift-presentation-set-for-a-tea-brand.webp',
    body: 'gift-presentation-set-for-a-tea-brand',
    faq: [
      {
        q: 'When is a folding carton the better answer than a rigid box?',
        a: 'When none of the four things a rigid box buys is load-bearing in your project. Those four are load-carrying, crush resistance, a structure that survives being kept, and an edge quality a fold cannot give you. Loose-leaf tea in metal caddies needed none of them: 555 g spread across three rigid cylinders on a flat panel is not a load problem, board is strong in compression along a vertical wall so a carton stacks as well, and the caddies are what gets kept while the box is recycled the week the tea is opened. The carton loses on the fourth — a crease at each corner where a rigid box has a wrapped edge — and that is a decision to make deliberately rather than discover.'
      },
      {
        q: 'How much freight volume does an assembled rigid box really add?',
        a: 'Against flat carton blanks, roughly thirteen to one. At 236 × 92 × 76 mm packed 24 to a shipper, 12,000 rigid boxes is about 16 m³; the same quantity of cartons shipped flat is about 1.2 m³. On a sea leg that is a rounding error, but on an air freight leg to hit a launch date it is the difference between a freight line and a freight problem — and it is charged twice, because the brand\'s warehouse stores those 16 m³ of empty boxes until they are used.'
      },
      {
        q: 'How do you hold three round tins in a board box without foam?',
        a: 'With a window platform: a die-cut board sheet with three circular holes sitting 18 mm above the base floor on four folded flaps, so each caddy passes through its own hole and stands on the floor beneath it. The alternative — letting the tins hold each other in a row — accumulates tolerance, and the middle tin, held only by two loose neighbours, is the one that rattles. Give each item its own hole and no tolerance accumulates. Specify the hole clearance against the hole\'s depth rather than as an absolute: 1.2 mm of play limits a caddy to about 4° of tilt in an 18 mm deep hole, and would rattle in a 6 mm one.'
      },
      {
        q: 'What does the carton give up compared with the rigid box?',
        a: 'About 230 g of heft, a crease at each corner, and emboss depth. A 450 gsm board cannot hold the deep deboss a 1.5 mm greyboard takes, so a logo drawn for one has to be reduced to a shallow blind emboss and paired with foil. There is a second-order version of that limitation worth knowing: an emboss raised on the outside of a slipcase raises a matching ridge on the inside, and the inside is the face that slides over the tray, so raised finishes stay above the line the tray\'s top edge travels.'
      },
      {
        q: 'Can we switch from a rigid box to a carton after the first sample?',
        a: `Yes, and it is cheaper to do than the reverse — a revised sample takes ${trade.sampleLead} from the change being agreed, and the tooling is a steel-rule die rather than a wrapping setup. What does not carry over is the artwork: the exterior dimensions shrink by roughly 5 mm in each direction because 0.6 mm of board replaces 1.5 mm of greyboard plus a wrap, so every panel the artwork was laid out against moves. Settle the structure before the artwork is finalised, not after.`
      }
    ]
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
    date: '2026-10-16',
    imgAlt: 'A matte black two-piece rigid box with the lid off, four foil-wrapped chocolate bars lying flat on a raised paperboard platform inside the base',
    img: 'case-rigid-box-for-a-chocolate-brand.webp',
    body: 'rigid-box-for-a-chocolate-brand',
    faq: [
      {
        q: 'Why not use foam, when it insulates better than an air gap?',
        a: 'Because insulation was not the failure that was going to happen. A cavity cut to the bar profile grips the bar on both faces, and above roughly 28 °C tempered chocolate is plastic — a plastic bar held in a cavity takes the shape of the cavity and then sets that way, so the customer unwraps a bar that is no longer flat. On top of that, closed empty for twenty-four hours at 40 °C, the foam sample had a distinct adhesive and foam note, and cocoa butter picks up volatiles at levels a person cannot smell in a room but can taste in a fat. Foam buys time; this product was going to fail by deformation and odour first.'
      },
      {
        q: 'How much difference does a 6 mm standoff actually make?',
        a: 'Two to three hours of margin over a box where the bars sit in contact with the board, which on a shop-window afternoon is the difference between a bar that survives and one that does not. The reason a gap outperforms a material here is that heat reaches the chocolate through what it is touching: still air conducts at about 0.026 W/m·K, paperboard at roughly 0.05 to 0.07, and a direct contact path between two solids conducts far better than either because there is no interface resistance in it. That is also why the standoff is four folded flaps rather than a solid rim — the flaps are the four bridges left in an otherwise unbroken air layer, and a solid rim would put the conduction path straight back.'
      },
      {
        q: 'Does the colour of the wrap really matter that much?',
        a: 'It measured as a sixteen-degree difference at the surface from nothing but the colour of the paper. Two identical samples in a south-facing window in July: matte black reached 61 °C on its exterior and stone reached 45 °C, with interior air at 41 °C against 33 °C after three hours. The bars in the black box softened and the bars in the stone box did not. The brand kept matte black, which is a defensible shelf decision — what came out of the measurement was display guidance in the retail pack and a recommendation that the box not be the item left in direct sun. No box keeps chocolate solid indefinitely in a window that reaches 45 °C; the point of measuring is that the trade-off is made with the number in hand.'
      },
      {
        q: 'How do I stop a chocolate box from smelling?',
        a: 'Run the empty-box test, because it is the only check that catches odour transfer before production and it costs nothing: close the finished empty box, leave it twenty-four hours at 40 °C, open it and smell the interior. A box that has a smell will give it to the chocolate. Three specifications follow. Water-based adhesive rather than solvent-based, and fully cured, because water-based adhesives still off-gas while curing. No foam anywhere in the assembly, including under the platform. And UV-cured ink held and aired before assembly rather than going straight from the press into a box, since a sharp print note dissipates on an open shelf and not at all in a sealed one.'
      },
      {
        q: 'Why can the bars not be stacked in two layers to keep the box smaller?',
        a: 'Because at 34 °C the top row loads the bottom row, and it loads it at the two points where the bars overlap, so the bottom bar sags between those points and sets sagging. A bowed bar tastes identical and looks wrong on the plate. Going to a single layer took the exterior from 180 × 130 × 52 mm to 246 × 132 × 46 mm — 66 mm wider and 6 mm shallower, which is the better shape for a shelf anyway, since it presents the bars rather than stacking them. If you do want to revisit the layout, a revised sample takes ' + trade.sampleLead + ' from the change being agreed, and the artwork does not survive it: every panel moves when the footprint does.'
      }
    ]
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
    date: '2026-10-17',
    imgAlt: 'A matte black two-piece rigid subscription box with its lid lifted, two valved kraft coffee bags held apart by a folded paperboard divider and a printed belly band slid over the box',
    img: 'case-subscription-box-for-a-coffee-roaster.webp',
    body: 'subscription-box-for-a-coffee-roaster',
    faq: [
      {
        q: 'Why a paper band instead of a magnetic closure?',
        a: 'Three reasons, and the third is the one that decided it. A magnetic closure is a genuine answer to the problem — a two-piece lid held by friction came off on the second drop test, because friction positions a lid and a drop rotates it — but it came back around thirty per cent above the equivalent two-piece box once the skirt is recessed and the halves have to register. Second, a band does four jobs at once: positive closure, tamper evidence, the artwork that changes each month, and a surface that takes the courier label and is then thrown away. Third, and decisively: a subscriber bins twelve of these a year, and a box with magnets and steel plates in it is not kerbside recyclable without a disassembly step nobody will do.'
      },
      {
        q: 'How much headroom does a bag of coffee need inside the box?',
        a: 'Size it against the largest the bag will be, not the size it is when packed. Coffee degasses for about a fortnight, mostly in the first three days, and the one-way valve lets CO₂ out without letting the bag burst — but the bag still changes shape. A gusseted 500 g bag measured 62 mm across its flat face settled and 72 mm at its most inflated forty-eight hours after packing. The first sample had a 70 mm base interior, which read as 8 mm of clearance at packing time and was 2 mm of interference two days later, lifting the lid from the inside. The interior went to 78 mm, and packing moved to forty-eight hours after roast so most of the degassing happens in a tray rather than in a closed box.'
      },
      {
        q: 'Why is there no insert holding the bags in place?',
        a: 'Because a cavity is a fixed volume and a bag of coffee is not. Cut the cavity to the settled bag and an inflated one will not seat; cut it to the inflated bag and a settled one rattles, and a bag that moves inside a box arrives at one end of it. The box gives the bags a plain volume with clearance, and one folded paperboard divider across the middle stops both bags migrating to the same end over a journey — a box with all its mass at one end drops onto one corner with the whole load behind it. The divider is deliberately shorter than the bags: it separates rather than captures, because a captured bag has to be lifted out over a wall on every unit of a monthly run.'
      },
      {
        q: 'How do I stop a coffee box from smelling of print or adhesive?',
        a: 'Treat odour as a specification rather than a hope, because coffee beans are literally sold as odour absorbers — a box that smells of anything will hand that smell to the product. Three specifications: water-based adhesive, fully cured before assembly, since it off-gasses while curing and the box is closed while it does; no foam anywhere in the assembly; and an unprinted interior face on the wrap, because a heavy solid of ink on the inside of a sealed box is a print note that dissipates on an open shelf and not at all in a closed one. Then run the test that catches it: close the empty finished box, leave it twenty-four hours somewhere warm, open it and smell it.'
      },
      {
        q: 'Can the artwork change every month without retooling?',
        a: 'Yes, if the variable artwork goes on the band rather than on the box. The structure is identical in month one and month twelve, so the cutting die is charged on the first order and not on the eleven that follow — the twelfth month\'s box is cheaper per unit than the first even though nothing about it changed, which is worth modelling when you forecast subscription unit economics. What changes each month is the band print: a CMYK run of the month\'s origin, roast date and tasting note. If you do want to change the box itself rather than the band, a revised sample takes ' + trade.sampleLead + ' from the change being agreed, and every dimension downstream moves with it.'
      }
    ]
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
