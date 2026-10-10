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
    date: '2026-10-14',
    planned: true
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
    date: '2026-10-28',
    planned: true
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
    date: '2026-11-11',
    planned: true
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
  }

];
