'use strict';

/* The five industry pages.
 *
 * Why this file replaces the old approach
 * ---------------------------------------
 * Two of these pages (/industries/gift-presentation/ and /industries/retail-branded/)
 * were generated from a shared template with a five-card grid. Pairwise text
 * similarity between them measured 0.67 — high enough that a buyer opening
 * both sees two versions of one page. The cause was that the cards were
 * interchangeable claims ("Shelf presence", "Brand consistency") that would
 * sit just as comfortably on any other industry. Two different sectors were
 * being told the same five things, which means neither page was actually
 * about its sector.
 *
 * The other three (/cosmetics/, /perfume/, /premium-consumer-products/) were
 * carried over verbatim from the previous site, capped around 200 words on the
 * same sentence frames ("Depending on product and presentation requirements,
 * options may include…").
 *
 * What changed
 * -------------
 * Each page now leads with the thing that is genuinely different about
 * packaging for that sector, and the detail is sector-specific in a way that
 * could not be moved to a sibling page:
 *
 *   cosmetics   leak paths and travel, dropper and pump cutouts, multi-piece sets
 *   perfume     the bottle as the load — weight, cradles, cap clearance
 *   premium     cross-category consistency, and when a carton is the wrong answer
 *   gift        the unboxing sequence as a designed, ordered event
 *   retail      shelf geometry, palletising, barcodes, distribution centres
 *
 * Structure follows the product pages (hero → intro → grid → construction →
 * finishing → comparison → spec → FAQ → form → related) so the two families
 * read as one site, and the builders come from src/industry-blocks.js shared
 * with src/pages/40-products.js. */

const { navHref } = require('../layout');
const { relatedSection, rfqForm } = require('../partials');
const {
  specTable, proseSection, featureGrid, comparisonTable, faqBlock, noteBlock
} = require('../industry-blocks');

const HOME = { label: 'Home', href: '/' };
const IND = { label: 'Industries', href: '/industries/' };

const PAGES = [

  /* ---------------------------------------------------------------- *
   * Cosmetics & beauty
   * ---------------------------------------------------------------- */
  {
    slug: 'cosmetics',
    eyebrow: 'COSMETICS & BEAUTY',
    h1: 'Custom cosmetic packaging for beauty brands',
    img: 'cosmetic-packaging-600.webp',
    metaTitle: 'Custom Cosmetic Packaging for Beauty & Skincare Brands | Metapackink',
    metaDesc:
      'Custom cosmetic packaging for skincare, makeup and personal-care brands, developed around dropper and pump cutouts, leak paths, travel conditions and multi-piece set configuration.',
    lead:
      'Packaging for skincare, makeup and personal-care products — developed around the bottle it holds, the shelf it sits on and the journey it has to survive before either.',
    intro: [
      'Cosmetic packaging is judged twice, and the two judgements pull in opposite directions. On a shelf or in a photograph it has to sell a product in the second or two of attention it gets — which pushes towards a sparse surface, a strong finish and a clean face. In transit it has to survive being shipped as a parcel, which pushes towards structure, fitment and protection.',
      'The difficulty is mostly in the second half. A cosmetic box usually contains something that leaks, something with a component that can crack, or several items that have to arrive still sitting in their own compartments. That is what the structure is actually solving, and it is why a cosmetic box is rarely just a gift box with different artwork.'
    ],
    challenges: {
      heading: 'What is genuinely difficult about cosmetic packaging',
      intro:
        'These are the problems that decide the specification. Presentation questions come after them, not before.',
      items: [
        {
          title: 'Leaking and residue migration',
          text: 'A pump or dropper bottle can weep a small amount of product. That residue wicks into uncoated board and shows as a stain on the outside of the box within weeks. Where the product is oil-based or alcohol-based, the board has to be faced with a barrier rather than left raw.'
        },
        {
          title: 'Every SKU is a different shape',
          text: 'A 30 ml dropper, a 50 ml pump jar and a compact are three different solids with three different centres of gravity. A fitment cut for one will not hold the others. Packaging a range usually means either separate fitments per shape or one layout that locates each container by its own edge.'
        },
        {
          title: 'Travel and humidity',
          text: 'Beauty products travel as check-in luggage and sit in steamy bathrooms. Humidity softens board, and soft board lets a fitment loosen so the bottle moves and the cap takes the impact. Rigid construction plus a tight cavity is what prevents it.'
        },
        {
          title: 'Component damage before the box is opened',
          text: 'Caps, atomisers, droppers and mirrors crack rather than dent. This is a clearance problem: the cavity has to hold the container so the fragile part cannot move, without pressing on it hard enough to stress the closure.'
        },
        {
          title: 'Multi-piece sets that must stay separate',
          text: 'A routine set of four items has to arrive as four items in four positions, not as one rattling mass. That is a compartmented tray with defined pockets, and it has to survive the box being turned over.'
        },
        {
          title: 'A surface that photographs well',
          text: 'Beauty packaging is shot constantly — for product pages, for influencers, for social. A finish that catches fingerprints, scuffs at a touch or reflects the camera reads as cheap on a phone screen even when the print is correct.'
        }
      ]
    },
    structures: {
      heading: 'Structures we build for cosmetic products',
      items: [
        { title: 'Rigid lid-and-base', text: 'The default for a single premium product, with a die-cut fitment locating the container. Highest perceived value for a single-item box.' },
        { title: 'Magnetic closure', text: 'For sets and gift ranges where the unboxing is photographed and the lid has to stay shut in a bag.' },
        { title: 'Two-piece rigid', text: 'A lidded box with a fitted base, used where the box is handled repeatedly and has to close cleanly every time.' },
        { title: 'Drawer or sleeve', text: 'Where the product should be revealed by pulling, common for compact collections and smaller items.' },
        { title: 'Book-style and folder', text: 'For palettes, flat compacts and mirrors, where the contents are presented as a spread rather than a cavity.' },
        { title: 'Compartmented set boxes', text: 'Traced trays dividing a multi-product routine into separate pockets, each sized to its own container.' }
      ]
    },
    fitment: {
      heading: 'Fitments, by container type',
      intro:
        'The fitment is where a cosmetic box succeeds or fails. These are the container types we cut for most often and what each one demands.',
      cols: ['Container', 'What the fitment has to do'],
      rows: [
        ['Dropper bottles', 'Locate on the body, not the cap. The dropper bulb is the most crushable part of the whole package and should never carry the load.'],
        ['Pump and mist sprays', 'Leave the actuator clear of the fitment wall, so nothing depresses it in transit and empties the product into the box.'],
        ['Jars and creams', 'Support on the shoulder, and account for the weight of the filled jar rather than the empty one.'],
        ['Compacts and palettes', 'Hold flat and prevent the hinge from cycling open; usually a recessed ledge rather than a full cavity.'],
        ['Tubes', 'Short tubes tend to roll. They need a flat channel or a shaped cradle, not a round hole.'],
        ['Candle and fragrance vessels', 'Assume the glass is heavy and brittle, and cushion both ends since the base takes the drop.'],
        ['Mirrors and applicators', 'Sit in their own slot away from anything hard, or the silvering scratches in transit.']
      ]
    },
    finishing: {
      heading: 'Finishing and surface',
      items: [
        { title: 'Soft-touch lamination', text: 'The most-requested beauty surface, because it reads matte without looking unfinished. It does show fingerprints, so it suits products handled briefly.' },
        { title: 'Matte lamination', text: 'A hard-wearing matte that resists scuffing better than soft-touch and is the safer choice for a box that travels loose in a bag.' },
        { title: 'Foil stamping', text: 'Metallic and coloured foil for branding and borders. On cosmetics it is usually kept small so the face stays clean.' },
        { title: 'Embossing and debossing', text: 'Tactile branding that reads in a photograph under side light, and adds perceived weight without adding a colour.' },
        { title: 'Spot UV', text: 'Selective gloss on a matte field — a common way to make one element lift off the surface in a product shot.' },
        { title: 'Textured and specialty stock', text: 'Linen, felt and uncoated boards give a surface that photographs as material rather than as print.' }
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, magnetic closure, two-piece rigid, drawer, book-style, compartmented set tray'],
      ['Board', 'Greyboard 1.5 mm – 3 mm, specified against filled product weight'],
      ['Wrap materials', 'Coated paper, specialty and textured stock, printed paper, fabric for premium ranges'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, traced compartment tray, ribbon pull'],
      ['Barrier options', 'Faced or laminated interior where the product is oil- or alcohol-based'],
      ['Finishing', 'Soft-touch, matte or gloss lamination, foil, emboss, deboss, spot UV, screen print'],
      ['Range consistency', 'One structure and finish specification carried across a product family'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    notes: [
      'Four to six weeks is normal for skincare packaging to reveal a residue problem. Board absorbs oil slowly, so a box that looks clean when it is first packed can be marked by the time a customer receives it. Where the product is oil-based, specify a faced interior from the start rather than substituting it after the first complaint.'
    ],
    faq: [
      { q: 'Can you package a whole skincare range consistently?', a: 'Yes, and it is usually the right approach. One board, one wrap and one finish specification applied across different box sizes keeps a range reading as one brand on a shelf. The fitments differ per container type; everything else stays constant. Send the full list of product dimensions and we will work through the range rather than one box at a time.' },
      { q: 'Will an oil-based product stain the box?', a: 'It can, if the interior is raw board. Oils and alcohols wick into uncoated paper and show through as a stain. Where that is a risk we face or laminate the interior, or set the product in a foam or tray that keeps liquid away from the board. Tell us the product type and we will specify accordingly.' },
      { q: 'Do you cut fitments for specific bottle shapes?', a: 'Yes — that is the normal starting point. Send the container dimensions including the cap, and we develop the fitment around the container body. For droppers and sprays we deliberately keep the fitment clear of the cap and actuator so nothing is stressed in transit.' },
      { q: 'Can a gift set hold items of different sizes?', a: 'Yes. A compartmented tray gives each item its own pocket sized to that item, so a set of four products arrives as four located pieces rather than as loose contents. The tray is cut to the specific combination, so send the full contents list.' },
      { q: 'Which finishes hold up best in transit?', a: 'Matte lamination is the most forgiving. Soft-touch feels better in the hand but marks more easily, so it suits boxes that are handled briefly and shown rather than carried loose. High-gloss film shows scuffs and fingerprints most clearly. If a box travels inside a bag or a suitcase, matte is usually the safer specification.' },
      { q: 'Do you supply folding cartons as well as rigid boxes?', a: 'Our production is built around rigid and paperboard constructions — rigid boxes, magnetic boxes, two-piece and drawer structures and the fitments inside them. If a folding carton is genuinely the right answer for a particular SKU we will say so rather than pushing everything towards a rigid box.' }
    ]
  },

  /* ---------------------------------------------------------------- *
   * Perfume & fragrance
   * ---------------------------------------------------------------- */
  {
    slug: 'perfume',
    eyebrow: 'PERFUME & FRAGRANCE',
    h1: 'Custom perfume and fragrance packaging',
    img: 'perfume-packaging-600.webp',
    metaTitle: 'Custom Perfume & Fragrance Packaging | Bottle-Based Design | Metapackink',
    metaDesc:
      'Custom perfume packaging built from the bottle outwards: weight, cap clearance and centre of gravity determine the structure, cradle and closure before artwork is considered.',
    lead:
      'Fragrance packaging starts from the bottle. Its dimensions, weight and where the cap sits determine the structure, the cradle and the clearance long before artwork is considered.',
    intro: [
      'A perfume box is unusual because the object inside it is both heavy and fragile at the same time. A 100 ml glass flacon weighs several hundred grams and will break if it moves, but it cannot be gripped tightly because the neck and cap assembly is the weakest part of it. Almost every decision in a fragrance box follows from those two facts.',
      'That makes the cradle the centre of the design rather than an accessory to it. The box has to hold the bottle still through a parcel network without bearing on the cap, and it has to present the bottle at a defined height when the lid is lifted, so that the flacon is the first thing seen.'
    ],
    challenges: {
      heading: 'What the bottle dictates',
      intro:
        'These are the constraints a fragrance box is engineered around. They are set by the glass, not by the brand.',
      items: [
        {
          title: 'Weight and centre of gravity',
          text: 'A filled 100 ml flacon is heavy enough that the box has to be sized against the filled weight, not the empty. If the centre of gravity sits high, the box tips when it is stood on a shelf and the bottle leans against the cradle wall, stressing the neck.'
        },
        {
          title: 'The cap is the fragile part',
          text: 'Caps and atomiser collars crack rather than bend, and they sit at the top of the bottle. A cradle that grips the body and leaves the cap entirely unloaded is the only arrangement that survives a drop. Gripping the neck to save space is the most common mistake in fragrance packaging.'
        },
        {
          title: 'Base impact',
          text: 'Parcels are dropped base-first far more often than they are dropped flat. The base of the box carries the impact, so the cushioning under the bottle matters more than the cushioning around it.'
        },
        {
          title: 'Glass clarity and shape',
          text: 'Fragrance glass is often faceted, tapered or asymmetric, and the reference bottle is a display object. A cavity has to locate a shape like that on its widest true plane, which usually means measuring the actual sample rather than working from a volume figure.'
        },
        {
          title: 'Component set completeness',
          text: 'A fragrance package is often a flacon plus a travel refill plus a cap or stopper. Each piece has to arrive in its own position, and the set has to hold together when the box is turned over.'
        },
        {
          title: 'Open and close as part of the product',
          text: 'The lid action is a designed moment for fragrance more than for almost any other category. How much resistance the closure has, and whether it stays open while the bottle is lifted out, is part of the presentation.'
        }
      ]
    },
    cradles: {
      heading: 'How the bottle is held',
      intro:
        'The cradle decides whether a fragrance box protects its contents. Each option below trades cost against protection and handling.',
      cols: ['Cradle type', 'Best for', 'What to know'],
      rows: [
        ['Die-cut paperboard tray', 'Rigid boxes and lighter flacons up to around 50 ml', 'Cheapest to tool and easy to recycle, but offers limited cushioning. Best where the bottle is small or the box is shipped in an outer carton.'],
        ['Foam or EVA cavity', 'Heavier flacons and anything shipped as a direct parcel', 'Cut to the exact bottle profile with a controlled fit, so the cap never bears load. The most protective option and the usual choice above 50 ml.'],
        ['Moulded pulp insert', 'Ranges where a natural, uncoated interior suits the brand', 'Good cushioning and a material story that suits clean-beauty positioning. Tooling takes longer, so it suits an established range rather than a one-off.'],
        ['Fabric-wrapped tray', 'Premium and limited editions', 'Wrap the tray in the same fabric as the box for a continuous surface when the lid lifts. Adds cost but gives the most considered opening.'],
        ['Ribbon or tab lift', 'Tall flacons in a deep box', 'Not a cradle on its own — a lift that lets the bottle be extracted without fingers entering the cavity. Usually combined with one of the above.']
      ]
    },
    structures: {
      heading: 'Structures for fragrance',
      items: [
        { title: 'Magnetic closure box', text: 'The most common fragrance structure. The lid holds shut, opens to a defined angle and can be lifted off a shelf one-handed.' },
        { title: 'Rigid lid-and-base', text: 'A separate lid and base, where the lid is meant to be taken fully off and set down. Classic for a single flacon.' },
        { title: 'Drawer or sleeve', text: 'The bottle is drawn out on a tray rather than lifted, which suits a presentation where the reveal is horizontal.' },
        { title: 'Two-piece rigid', text: 'A tighter, more compact format for smaller flacons and travel sizes.' },
        { title: 'Book-style with fitted interior', text: 'Where the package presents the bottle alongside printed material or a second item.' },
        { title: 'Multi-bottle and coffret', text: 'Compartmented trays for a fragrance plus refill, or a collection across several flacons.' }
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'The dominant fragrance finish. Gold, silver and coloured foils on the wrap or the cradle for branding and borders.' },
        { title: 'Embossing and debossing', text: 'Tactile branding that reinforces the weight of the package and reads in the hand before the box is opened.' },
        { title: 'Soft-touch lamination', text: 'A matte, velvety surface that contrasts deliberately with the glass and metal of the flacon.' },
        { title: 'Fabric wrap', text: 'Linen and woven papers used on limited editions and coffrets, usually carried through to the tray.' },
        { title: 'Spot UV', text: 'Selective gloss for a single element against a matte field.' },
        { title: 'Metallic and pearlescent stock', text: 'A way to get a metallic read without full foil coverage, common on mid-range ranges.' }
      ]
    },
    spec: [
      ['Structures', 'Magnetic closure, rigid lid-and-base, drawer, two-piece, book-style, multi-bottle coffret'],
      ['Board', 'Greyboard 2 mm – 3 mm, specified against the filled flacon weight'],
      ['Cradle', 'Die-cut tray, foam or EVA cavity, moulded pulp, fabric-wrapped tray, ribbon lift'],
      ['Clearance', 'Cap and atomiser collar kept fully unloaded; fitment locates on the bottle body'],
      ['Base protection', 'Increased cushioning beneath the flacon to absorb base-first impacts'],
      ['Wrap materials', 'Coated paper, specialty and textured stock, fabric, metallic and pearlescent paper'],
      ['Finishing', 'Foil, emboss, deboss, soft-touch and matte lamination, spot UV'],
      ['Sampling', 'Physical sample with the actual bottle fitted, before every production run']
    ],
    notes: [
      'Send the filled bottle, or a dimensioned drawing of it including the cap and any pump or collar, before the structure is fixed. Fragrance packaging cannot be developed reliably from a volume figure such as "100 ml": two bottles of the same volume can differ by 15 mm in height and by more than 100 g, and those two measurements decide both the box depth and the board thickness.'
    ],
    faq: [
      { q: 'Why do you need the actual bottle rather than its volume?', a: 'Because volume does not describe the load. A 100 ml flacon from one supplier can be taller, wider and considerably heavier than a 100 ml flacon from another, and the cap assembly differs too. Depth, board thickness and cavity all follow from the real dimensions and the filled weight. A dimensioned drawing with the cap fitted is usually enough; a physical sample is better.' },
      { q: 'How do you stop the cap being damaged in transit?', a: 'By designing the cradle to locate the bottle on its body and leave the cap completely unloaded. The cavity is cut so the bottle cannot move laterally, and any load path runs through the glass body rather than through the neck. Gripping the neck is cheaper and is what causes most cap damage, so we do not do it.' },
      { q: 'Can the same box hold a flacon and a refill?', a: 'Yes. A compartmented or traced tray gives the refill its own pocket at the correct depth, so both pieces arrive located. Send the dimensions of every component including any travel case, and the tray is cut to hold them individually rather than as a loose set.' },
      { q: 'Do you produce gift sets with a printed insert card?', a: 'Yes. An insert card sits over the cradle to frame the bottle and carry brand or product copy. It is cut to register with the cavity, so it needs to be designed alongside the tray rather than added later.' },
      { q: 'What is the minimum order for a fragrance box?', a: 'It depends on the structure and the cradle. Rigid and magnetic structures typically start in the low hundreds of pieces because the dies and the tooling are fixed costs. Moulded pulp inserts carry longer tooling time, so they suit an established range rather than a first sample run. We will tell you plainly when a quantity is not economical rather than quoting it as though it were.' }
    ]
  },

  /* ---------------------------------------------------------------- *
   * Premium consumer products
   * ---------------------------------------------------------------- */
  {
    slug: 'premium-consumer-products',
    eyebrow: 'PREMIUM CONSUMER PRODUCTS',
    h1: 'Packaging for premium consumer products',
    img: 'rigid-boxes-600.webp',
    metaTitle: 'Premium Consumer Product Packaging | Presentation & Protection | Metapackink',
    metaDesc:
      'Premium packaging for consumer products where a standard retail carton would undersell the contents — specialty goods, premium ranges and gift collections, with consistent structures across a product family.',
    lead:
      'For products where a standard retail carton would undersell what is inside it — specialty goods, premium retail ranges and branded collections.',
    intro: [
      'This is the least uniform page on the site, and that is the point of it. It covers the products that do not belong to a single named sector but share one trait: the packaging has to carry a level of perceived value that a standard printed carton cannot, because the product inside costs enough that a thin box becomes the thing the customer remembers.',
      'What those products tend to share is not a material or a structure but a decision problem. The product is sold at a price where the packaging is a visible part of the cost, so the question is not "what does it need to survive" but "what does it need to signal, and can we afford to signal it".'
    ],
    when: {
      heading: 'When a premium structure is the right answer',
      intro:
        'A premium box is a real cost. These are the cases where it earns that cost rather than simply adding to it.',
      items: [
        { title: 'The product is sold on its presentation', text: 'Where the customer compares products they cannot touch, a box that reads as substantial is doing part of the selling.' },
        { title: 'A standard carton undersells the price', text: 'Once a product crosses a certain price, a thin carton starts to work against it — the packaging becomes the thing that feels wrong.' },
        { title: 'The box is kept rather than discarded', text: 'Products whose boxes get reused, displayed or stored are still carrying the brand after purchase.' },
        { title: 'The item is bought as a gift', text: 'Where the buyer and the recipient are different people, packaging has to read well to someone who did not choose it.' },
        { title: 'The product is fragile or unusually shaped', text: 'Non-standard geometry needs an engineered interior that a folding carton cannot provide.' },
        { title: 'The range needs to look like a range', text: 'Consistency across a product family is often the single biggest driver of perceived brand quality.' }
      ]
    },
    cartonVsRigid: {
      heading: 'Folding carton or rigid box?',
      intro:
        'The honest answer is not always "rigid". A folding carton is cheaper, lighter to ship and perfectly adequate for a large share of consumer products. This is the comparison we would walk through with you.',
      cols: ['Question', 'Folding carton', 'Rigid box'],
      rows: [
        ['How does it feel in the hand?', 'Light; the print is carrying the impression', 'Substantial — the weight is part of the message'],
        ['When does it show damage?', 'Dents and creases at corners under stacking', 'Holds its shape; corners survive handling'],
        ['What does the interior allow?', 'A printed insert card, at most', 'Custom cavities, trays and compartmented fitments'],
        ['What does it cost per unit?', 'Lower, and it ships flatter and cheaper', 'Higher — dies, wrapping and assembly are manual steps'],
        ['Where does it make sense?', 'Volume ranges, refills, secondary packaging, price-competitive products', 'Single premium items, gift sets, presentation-led products'],
        ['What is the environmental read?', 'Single material, usually easy to recycle', 'Mixed material unless specified carefully']
      ]
    },
    consistency: {
      heading: 'Making a range look like a range',
      intro:
        'For most premium brands this matters more than any individual box decision, and it is the part that is easiest to get wrong across a growing range.',
      items: [
        { title: 'Fix the variables early', text: 'Board, wrap and finish should be the same across the range. Decide them once, at the start, and let only the dimensions vary.' },
        { title: 'Keep one grid rule', text: 'A consistent margin, logo position and type size across different box sizes is what makes a shelf look ordered rather than assembled.' },
        { title: 'Vary the format, not the language', text: 'It is fine for one SKU to be a drawer and another a lid-and-base, as long as the surface treatment stays constant.' },
        { title: 'Specify the finish once', text: 'Soft-touch on one product and gloss on another reads as two brands, even when the print matches exactly.' },
        { title: 'Watch colour across materials', text: 'The same brand colour prints differently on coated, uncoated and textured stock. Test it on the stock you intend to use across the whole range.' },
        { title: 'Write it down', text: 'A one-page specification that every box in the range is ordered against prevents drift as new SKUs are added.' }
      ]
    },
    structures: {
      heading: 'Structures',
      items: [
        { title: 'Rigid lid-and-base', text: 'The standard premium format for a single item, with room for a fitted interior.' },
        { title: 'Magnetic closure', text: 'Where the box is opened in front of the customer and the lid should hold shut.' },
        { title: 'Two-piece rigid', text: 'A closer-fitting format for smaller products.' },
        { title: 'Drawer box', text: 'For products presented by being drawn out, and for items that sit flat.' },
        { title: 'Book-style', text: 'For flat products presented as a spread, or where printed material accompanies the product.' },
        { title: 'Compartmented and multi-item', text: 'Where a premium purchase is a set, or two items are sold together.' }
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, magnetic closure, two-piece, drawer, book-style, compartmented set boxes'],
      ['Board', 'Greyboard 1.5 mm – 3 mm, specified against product weight and box size'],
      ['Wrap materials', 'Coated paper, specialty and textured stock, fabric, printed paper'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, compartmented tray, ribbon pull, insert card'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, matte, gloss and soft-touch lamination, screen print'],
      ['Range consistency', 'Shared board, wrap and finish across a product family, with dimensions varying'],
      ['Environmental options', 'Paper-based fitments and mono-material construction where recyclability matters'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    notes: [
      'Recyclability is worth deciding deliberately rather than by default. A rigid box wrapped in paper over paper-based fitments is straightforward to recycle; the same box with a foam cavity and a magnetic closure is not, because the closure has to be removed and the foam is a separate stream. If the environmental read matters for the range, say so before the structure is fixed — it is a design decision, and it is much cheaper to make at that point than afterwards.'
    ],
    faq: [
      { q: 'Is a rigid box always the right choice for a premium product?', a: 'No, and we would rather say so. A large share of consumer products are perfectly well served by a well-designed folding carton, which costs less, ships flat and is usually easier to recycle. A rigid box earns its cost when the presentation is part of what is being sold, when the product is fragile or unusually shaped, or when the box needs an engineered interior. We will tell you which side of that line we think your product falls on.' },
      { q: 'How do you keep a growing range looking consistent?', a: 'By fixing the variables that should not change — board, wrap and finish — and writing them into a one-page specification that every box in the range is ordered against. Only dimensions vary between SKUs. Without that document, ranges drift as new products are added by different people at different times, and the drift is what customers read as inconsistency.' },
      { q: 'Can the packaging be recycled?', a: 'It depends on the construction, and it is a decision made at design stage. A rigid box with paper-based fitments and no metal or plastic components recycles through the normal paper stream. Magnetic closures have to be removed before recycling, and foam or EVA cavities are a separate waste stream. If recyclability is a requirement, tell us and we will design towards it and say plainly what any given structure can and cannot achieve.' },
      { q: 'What is the minimum order quantity?', a: 'It depends on the structure rather than on a single company-wide figure. Rigid and magnetic boxes typically start in the low hundreds of pieces because the dies and setup are fixed costs. Simpler structures can go lower, and small trial runs are often possible on standard constructions. We will tell you plainly when a quantity is not economical rather than quoting it as though it were.' },
      { q: 'Can you produce a one-off or a very short run?', a: 'Sometimes, on existing standard structures where the dies already exist. A fully custom structure carries tooling that has to be amortised, so a very short run of a new design is rarely economical. If you are testing a market, the usual route is a standard structure with custom printing for the trial, and a bespoke structure once the volumes justify it.' }
    ]
  },

  /* ---------------------------------------------------------------- *
   * Gift & presentation
   * ---------------------------------------------------------------- */
  {
    slug: 'gift-presentation',
    eyebrow: 'GIFT & PRESENTATION',
    h1: 'Custom gift and presentation packaging',
    img: 'premium-gift-packaging-600.webp',
    metaTitle: 'Custom Gift & Presentation Packaging | Unboxing Design | Metapackink',
    metaDesc:
      'Custom gift and presentation packaging designed around the opening sequence — lid action, tray reveal, insert layers and the surfaces touched first — for gifting and premium unboxing.',
    lead:
      'Presentation boxes for products intended for gifting, retail presentation or a premium unboxing experience — designed around the sequence in which they are opened.',
    intro: [
      'Gift packaging is bought for a different reason from ordinary retail packaging: the box is part of what is being given. It is handed over in person, opened in front of someone, and usually kept afterwards. The recipient is not comparing it against a competitor on a shelf — they are experiencing it once, in order, with no control over what they see first.',
      'That single fact is what shapes the design. Because the opening happens in a fixed sequence and someone is watching, the sequence itself can be designed: what is revealed when the lid lifts, what the hands touch before they touch the product, and whether the product rises out of the box or has to be dug out of it. Protection still matters, but presentation leads.'
    ],
    sequence: {
      heading: 'The opening sequence',
      intro:
        'A gift box is experienced as a series of moments in a fixed order. Each one can be designed, and each one is a place where a cheap box gives itself away.',
      items: [
        { title: '1 — The weight', text: 'The box is picked up before it is opened. Weight and rigidity are the first information the recipient receives, and they arrive before anything is seen.' },
        { title: '2 — The lid action', text: 'How much resistance the lid gives, whether it lifts cleanly and whether it stays open by itself while the contents are reached for.' },
        { title: '3 — The first surface', text: 'What is visible when the lid comes off: an insert card, a wrapped tray, or the product itself. This is the frame the product is presented in.' },
        { title: '4 — The reveal', text: 'Whether the product rises, slides or is simply sitting there. A ribbon lift means nothing is dug for; a plain cavity means fingers go in.' },
        { title: '5 — The lift out', text: 'The moment the product leaves the box. A cradle that releases cleanly reads as considered; one that grips reads as a fault.' },
        { title: '6 — What is left', text: 'The empty box is kept far more often than it is thrown away. Anything printed underneath or inside is read at this point, not during the opening.' }
      ]
    },
    occasions: {
      heading: 'Gift packaging by occasion',
      intro:
        'The occasion decides the priorities far more than the product does. A corporate gift and a limited edition are not solved the same way.',
      items: [
        { title: 'Corporate and client gifting', text: 'Branded to a company rather than a product, often presenting several items together, and produced in repeated batches over a season.' },
        { title: 'Seasonal and limited editions', text: 'Where the packaging is itself the collectable, quantities are smaller, and the box has to justify being kept.' },
        { title: 'Retail gift sets', text: 'Multi-piece sets assembled under one box with compartmented fitments, each item held individually.' },
        { title: 'Premium unboxing', text: 'Products where the opening is designed and photographed, and the sequence is part of the campaign.' },
        { title: 'Wedding and milestone', text: 'Low quantities, high expectation, and often a structure that has to present a single irreplaceable object.' },
        { title: 'Subscription and repeat', text: 'Opened on a schedule rather than on one occasion, so the lid action has to survive being worked repeatedly.' }
      ]
    },
    structures: {
      heading: 'Structures and lid actions',
      intro: 'The lid is the part the recipient interacts with most, so it is usually the right place to start.',
      items: [
        { title: 'Magnetic closure', text: 'The lid holds shut and opens to a set angle. Reads as deliberate and stays shut in a bag — the most common gift structure.' },
        { title: 'Rigid lid-and-base', text: 'A separate lid meant to be lifted off and set down. Simple, and the reveal is the whole surface at once.' },
        { title: 'Drawer box', text: 'The contents are drawn out rather than lifted, which suits a horizontal reveal and ribbon-pull openings.' },
        { title: 'Two-piece rigid', text: 'A tighter format for smaller items and lower-cost gift ranges.' },
        { title: 'Book-style', text: 'Opens like a book, presenting the contents as a spread — suits gifting alongside a card or a printed piece.' },
        { title: 'Compartmented sets', text: 'Traced trays dividing a multi-item gift into separate pockets, each held individually.' }
      ]
    },
    finishing: {
      heading: 'Finishing that is touched before it is seen',
      items: [
        { title: 'Soft-touch lamination', text: 'The surface most associated with premium unboxing, because the hand registers it before the eye reads anything.' },
        { title: 'Fabric and woven wraps', text: 'A tactile material surface that paper stock cannot reproduce, usually carried through to the tray.' },
        { title: 'Foil stamping', text: 'Metallic and coloured foils for branding, borders and the single element that should catch the light.' },
        { title: 'Embossing and debossing', text: 'Raised or recessed detail that survives being handled and rewards being looked at closely.' },
        { title: 'Ribbon and fabric pulls', text: 'A functional detail that also solves the reveal: the product is drawn rather than dug for.' },
        { title: 'Printed interior and underside', text: 'The inside of the lid and the base of the box are read last, when the box has been emptied and is being kept.' }
      ]
    },
    spec: [
      ['Structures', 'Magnetic closure, rigid lid-and-base, drawer, two-piece, book-style, compartmented set boxes'],
      ['Board', 'Greyboard 1.5 mm – 3 mm, specified against contents and box size'],
      ['Wrap materials', 'Coated paper, specialty and textured stock, fabric and woven paper, printed paper'],
      ['Internal fitment', 'Die-cut tray, foam or EVA cavity, compartmented tray, ribbon or tab lift, insert card'],
      ['Lid action', 'Magnetic closure, friction fit, or lift-off, specified against how the box is opened'],
      ['Finishing', 'Soft-touch and matte lamination, fabric wrap, foil, emboss, deboss, spot UV, screen print'],
      ['Quantities', 'Standard structures can run smaller batches because the dies already exist'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    notes: [
      'Ask for the sample to be opened rather than looked at. A gift box is judged in the hand and in sequence — the weight when it is picked up, the resistance when the lid lifts, whether the product comes out cleanly. None of those show up in a flat photograph of the box, and they are the things that decide whether the packaging does its job.'
    ],
    faq: [
      { q: 'Can gift packaging be produced in small quantities?', a: 'Often yes, on standard structures. Gift ranges frequently run smaller than retail ranges, and because the dies for standard structures already exist, a shorter run is viable in a way it would not be for a fully bespoke design. A new magnetic closure or drawer structure carries tooling that has to be amortised, so a very short first run of a brand-new design is rarely economical. We will tell you which side of that line your quantity falls on.' },
      { q: 'How do I make the unboxing feel premium without adding cost?', a: 'Usually by putting the money into the sequence rather than into surface area. A ribbon lift so the product is drawn rather than dug for, one well-placed foil rather than full coverage, and an insert card that frames the product cost less than covering every face in specialty stock and change the experience more. The moments in the opening sequence are where perceived value is decided.' },
      { q: 'Can the box hold more than one item?', a: 'Yes. A traced or compartmented tray gives each item its own pocket at its own depth, so a set arrives as located pieces rather than as loose contents. Send the dimensions of every item in the set and the tray is cut to hold them individually.' },
      { q: 'Do you print inside the box?', a: 'Yes, and for gift packaging it is often worth it. The interior of the lid and the base are read when the box has been emptied, which is exactly when a recipient decides whether to keep it. It is the cheapest place to put something that extends the life of the box beyond the opening.' },
      { q: 'What is the difference between a gift box and a retail box?', a: 'Mostly what each one is optimised for. Retail packaging has to survive a supply chain, sit on a shelf and be compared against competitors at a glance. Gift packaging is handed over in person and opened once, so the sequence of moments matters more than shelf presence. See the retail and branded products page for the other side of that comparison.' }
    ]
  },

  /* ---------------------------------------------------------------- *
   * Retail & branded products
   * ---------------------------------------------------------------- */
  {
    slug: 'retail-branded',
    eyebrow: 'RETAIL & BRANDED PRODUCTS',
    h1: 'Custom retail and branded product packaging',
    img: 'magnetic-boxes-600.webp',
    metaTitle: 'Custom Retail & Branded Product Packaging | Shelf & Supply Chain | Metapackink',
    metaDesc:
      'Custom retail packaging engineered for shelf geometry, palletising and distribution centre handling — stacking strength, barcode placement and structures that survive the retail supply chain.',
    lead:
      'Custom packaging for brands that need packaging to carry product identity at the point of sale — and to still look right when it arrives there.',
    intro: [
      'Retail packaging has to do two jobs at once, and they pull in different directions. On the shelf it has to identify the product and the brand in the second or two of attention a shopper actually gives it. Behind the shelf it has to survive being palletised, stacked, handled repeatedly and moved through a distribution centre without arriving dented at the corners.',
      'The second job is the one that gets underestimated, because it happens out of sight. A box that looks correct in a product photograph can still fail at the point where it is stacked eight high on a pallet, or at the point where a DC rejects it for a barcode that is too close to the edge. Those failures are what this page is about.'
    ],
    supplyChain: {
      heading: 'What the supply chain does to a box',
      intro:
        'Every one of these happens after the box has been approved by the brand and before a shopper ever sees it. They are the reason retail packaging is specified differently from gift packaging.',
      items: [
        { title: 'Palletising and top load', text: 'Boxes at the bottom of a pallet carry the weight of everything above them. The specification has to account for sustained compression, not just for the weight of the product inside the box.' },
        { title: 'Repeated handling', text: 'A retail box is picked up and set down many times between the factory and the shelf. Corners and edges take the contact, so the structure has to hold its shape rather than relying on the graphic to hide damage.' },
        { title: 'DC handling and conveyance', text: 'Distribution centres move cartons through automated lines and manual pick stations. A box that is awkward to grip or that catches on a conveyor gets damaged or rejected.' },
        { title: 'Barcode and label requirements', text: 'Retailers require barcodes at a defined position with a quiet zone around them. Placing one too close to a fold, a curve or the box edge causes scan failures at the till or in the DC.' },
        { title: 'Moisture in transit', text: 'Containers and unheated warehouses expose paper to humidity that softens board. Stacking strength drops with moisture content, which is why compression performance is specified with a margin.' },
        { title: 'Shelf life of the surface', text: 'A box may sit on a shelf, under lighting, for months. Some films scuff, yellow or lift at the edges over that period even though they looked correct on the approved sample.' }
      ]
    },
    shelf: {
      heading: 'Shelf geometry and presence',
      intro:
        'The shelf is a fixed set of constraints before it is a design opportunity. These are the ones worth designing against deliberately.',
      items: [
        { title: 'Facings and footprint', text: 'The box has to fit the retailer’s facing width and shelf depth. A box that is 5 mm too deep will not sit flush and will be pushed back or turned sideways.' },
        { title: 'Stacking geometry', text: 'Whether boxes are stacked, stood in a row or hung decides which face is the one that must work, and whether the lid needs extra support.' },
        { title: 'Reading distance', text: 'A shopper reads the front face from roughly a metre and then from close range. Type that works at one distance often fails at the other.' },
        { title: 'The face that is actually seen', text: 'In many categories only one face and one edge are visible at a time. Spending the finish budget on hidden faces is a common waste.' },
        { title: 'Shelf lighting', text: 'Retail lighting is harsh and directional. High-gloss films flare under it and can make a correctly printed face unreadable.' },
        { title: 'Category coding', text: 'Colour and structure are how shoppers navigate a category quickly. A box that reads as a different category gets passed over regardless of the product.' }
      ]
    },
    structures: {
      heading: 'Structures for retail',
      items: [
        { title: 'Rigid lid-and-base', text: 'For higher-value retail products where the box has to hold its shape on a shelf and through handling.' },
        { title: 'Two-piece rigid', text: 'A more compact lidded format that stacks well and closes cleanly each time it is handled.' },
        { title: 'Magnetic closure', text: 'Where the product is handled by the shopper before purchase and the lid should stay shut.' },
        { title: 'Drawer and sleeve', text: 'For products presented by being drawn out, and for flat items that sit better horizontally.' },
        { title: 'Counter and display units', text: 'Structures that present multiple units at the point of sale rather than a single product.' },
        { title: 'Paper bags and wrapping', text: 'Supporting retail items where the brand needs to carry through from the shelf to the bag.' }
      ]
    },
    robustness: {
      heading: 'What makes a retail box survive',
      intro:
        'The choices below are the ones that most often decide whether a retail specification holds up in practice.',
      cols: ['Decision', 'Why it matters in retail', 'What we would specify'],
      rows: [
        ['Board thickness', 'Sets stacking strength and resistance to corner damage under top load', 'Sized against pallet stacking height and product weight, not box size alone'],
        ['Wrap protection', 'The surface has to survive handling before it reaches the shelf', 'Matte or gloss film lamination; soft-touch only where handling is light'],
        ['Corner construction', 'Corners take the contact in palletising and repeated handling', 'Rigid construction with wrapped corners rather than exposed board edges'],
        ['Closure', 'A lid that loosens in transit arrives sitting open on the shelf', 'Friction-fit or magnetic closure specified against the number of open/close cycles'],
        ['Barcode placement', 'A barcode in the wrong position fails scanning at the till or in the DC', 'Placed on a flat face with the retailer’s required quiet zone, away from folds and edges'],
        ['Moisture tolerance', 'Board softens in humid transit and loses compression strength', 'Compression performance specified with a margin for moisture uptake']
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, two-piece rigid, magnetic closure, drawer, counter and display units'],
      ['Board', 'Greyboard specified against pallet stacking height and product weight'],
      ['Wrap materials', 'Coated paper, specialty and textured stock, printed paper'],
      ['Surface protection', 'Matte or gloss film lamination as standard; soft-touch where handling is light'],
      ['Barcode and labelling', 'Positioned to the retailer requirement with the required quiet zone, on a flat face'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, compartmented tray, insert card'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    notes: [
      'Tell us the retailer and the stacking height before the structure is fixed. Brand guidelines usually describe how the box should look, while the retailer’s own requirements describe how it has to behave — facings, barcode position, case pack and stacking height. Where those two sets of requirements conflict, the conflict is much cheaper to resolve on paper than after the die has been cut.'
    ],
    faq: [
      { q: 'How do I know if my box will survive palletising?', a: 'By specifying board thickness against the stacking height and the total weight above the bottom layer, rather than against the box size on its own. A box that feels rigid in the hand can still collapse at the bottom of a tall pallet, because the load it carries there is many times its own contents. Tell us the intended case pack and stacking height and we will size the board for it.' },
      { q: 'Where should the barcode go?', a: 'On a flat face, at the position your retailer specifies, with the quiet zone they require around it, and away from folds, curves and box edges. Scanning failures usually come from a barcode placed too close to an edge or across a fold, not from the barcode itself. Send us the retailer’s labelling requirement and we will position it in the die line.' },
      { q: 'Is soft-touch suitable for retail packaging?', a: 'Only where handling is light. Soft-touch is the more attractive surface in the hand, but it marks more readily than matte film and shows contact from repeated picking up. For a box that will be handled in a store or travel loose in a distribution centre, matte lamination is usually the safer specification. We will say which we would choose for your specific route to market.' },
      { q: 'How is retail packaging different from gift packaging?', a: 'Retail packaging is optimised for survival through a supply chain and for being compared against competitors at a glance on a shelf. Gift packaging is handed over in person and opened once, so the sequence of moments during opening matters more than shelf presence. The structures overlap heavily — the specification priorities do not. See the gift and presentation packaging page for the other side.' },
      { q: 'Can you produce packaging that works for both retail and direct-to-consumer?', a: 'Yes, and it is a common requirement. The same structure can usually serve both channels, but the insert has to be designed for the harsher of the two journeys — which is almost always the direct-to-consumer parcel, because a parcel is handled individually while a retail case is not. Specifying for the gentler journey is the usual source of damage complaints.' }
    ]
  }
];

/* Build the body as one ordered list of blocks, then alternate the band
 * background across the finished list.
 *
 * The previous version spliced grids[0..5] and tables[0..2] into hardcoded
 * slots, and each block carried its own `alt` flag decided in isolation. Both
 * were wrong:
 *
 *   - A page defining two grids and two tables produced grid, table, grid,
 *     [empty slots], table, so the second comparison table landed at the very
 *     bottom of the page, past the finishing section.
 *   - Per-block `alt` flags cannot know what ends up adjacent once empty slots
 *     are dropped, so two same-coloured bands ended up next to each other.
 *
 * The fix is to stop letting any block decide its own background. A single
 * counter walks the page in document order and every banded block takes its
 * turn from it, so a collision is not possible whatever combination of blocks
 * a page defines. specTable, comparisonTable, faqBlock and noteBlock all
 * accept an `alt` argument for exactly this reason.
 *
 * Reading order is: the sector's problem grids, each comparison table next to
 * the grid it explains, then structures, then finishing. */
function buildBody(p, takeAlt) {
  const grids = [
    p.challenges, p.sequence, p.supplyChain, p.shelf, p.occasions, p.consistency, p.when
  ].filter(Boolean);

  const tables = [
    p.cradles, p.fitment, p.cartonVsRigid, p.robustness
  ].filter(Boolean);

  const order = [];
  let gi = 0;
  let ti = 0;
  while (gi < grids.length || ti < tables.length) {
    if (gi < grids.length) order.push({ grid: grids[gi++] });
    if (ti < tables.length && (gi % 2 === 0 || gi >= grids.length)) {
      order.push({ table: tables[ti++] });
    }
  }
  while (ti < tables.length) order.push({ table: tables[ti++] });

  order.push({ grid: p.structures });
  if (p.finishing) order.push({ grid: p.finishing });

  return order
    .map((b) =>
      b.grid
        ? featureGrid({
            heading: b.grid.heading, intro: b.grid.intro,
            items: b.grid.items, alt: takeAlt()
          })
        : comparisonTable(b.table.heading, b.table.cols, b.table.rows, b.table.note, takeAlt())
    )
    .join('\n\n');
}

module.exports = PAGES.map((p) => {
  const url = '/industries/' + p.slug + '/';
  const crumbLabel = p.eyebrow
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  /* One alternation for the whole page. The intro band is section-media, which
     is its own background and does not take a turn; the first body band starts
     unalt so the page reads light after the media band. */
  let flip = false;
  const takeAlt = () => (flip = !flip);

  const body = buildBody(p, takeAlt);
  const specAlt = takeAlt();
  const noteAlts = (p.notes || []).map(() => takeAlt());
  const faqAlt = takeAlt();

  const notes = (p.notes || [])
    .map((n, i) => noteBlock(n, noteAlts[i]))
    .join('\n\n');

  return {
    url,
    title: p.metaTitle,
    description: p.metaDesc,
    ogImage: p.img,
    priority: '0.7',
    breadcrumbs: [HOME, IND, { label: crumbLabel, href: url }],

    content: `
<section class="page-hero">

<div class="container">

<div class="eyebrow">${p.eyebrow}</div>

<h1>${p.h1}</h1>

<p>${p.lead}</p>

<div class="hero-buttons">
<a href="${navHref('/request-a-quote/', url)}" class="btn btn-primary">Request a quote</a>
<a href="${navHref('/products/', url)}" class="btn btn-outline">See structures</a>
</div>

</div>

</section>

<section class="section section-media">

<div class="container">

<figure class="product-figure">
<img src="${navHref('/img/' + p.img, url)}" alt="${p.h1} by Metapackink" width="600" height="600" loading="eager" decoding="async">
</figure>

<div class="prose">
${p.intro.map((t) => `<p>${t}</p>`).join('\n')}
</div>

</div>

</section>

${body}

${specTable(p.spec, 'Specifications are confirmed on your written quotation. Anything not written into the specification is not part of the order.', specAlt)}

${notes}

${faqBlock(p.faq, 'Questions buyers ask about ' + p.eyebrow.toLowerCase().replace('&', 'and'), faqAlt)}

${rfqForm({ url })}

${relatedSection([
  { title: 'All industries', text: 'Every sector we manufacture packaging for.', href: navHref('/industries/', url) },
  { title: 'All products', text: 'The structures this packaging is built from.', href: navHref('/products/', url) },
  { title: 'Manufacturing process', text: 'How a project moves from brief to shipment.', href: navHref('/manufacturing-process/', url) }
], 'Related')}
`
  };
});
