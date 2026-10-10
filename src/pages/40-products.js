'use strict';

/* The seven product detail pages.
 *
 * On the existing site every product "page" is an anchor on products.html
 * (#rigid-boxes, #magnetic-boxes, …). That means one URL competing for seven
 * different search intents, no page a buyer can send to a colleague, and no
 * place to put a specification table.
 *
 * Each page below keeps the existing product name, image and one-line
 * description verbatim, and adds the depth a buyer needs. The page is built
 * from three kinds of module:
 *
 *   product-specific   attributes, detail, when, construction, finishing,
 *                      spec, services, faq — every one written per product,
 *                      because this is the page's reason to exist
 *   shared builders    specTable, proseSection, featureGrid, faqBlock from
 *                      src/industry-blocks.js; attributeStrip, detailBlocks,
 *                      serviceBands, capabilityMatrix from
 *                      src/product-blocks.js
 *   shared copy        the OEM list, the export terms and the lead times,
 *                      assembled in src/product-blocks.js from src/config.js
 *                      so seven pages cannot quote seven different numbers
 *
 * Band order follows the layout the product pages were rebuilt against:
 * hero → image and intro → attributes → when to use → detail → construction →
 * finishing → specification → services → FAQ → capability matrix → enquiry
 * → related. The `alt` flag on each band is passed explicitly, because the
 * correct alternation depends on the whole page and not on any one section. */

const { navHref } = require('../layout');
const { relatedSection, rfqForm } = require('../partials');
const {
  attributeStrip, detailBlocks, serviceBands, capabilityMatrix
} = require('../product-blocks');

const HOME = { label: 'Home', href: '/' };
const PROD = { label: 'Products', href: '/products/' };

function crumb(label, href) {
  return [HOME, PROD, { label, href }];
}

/* Shared spec-table builder. */
function specTable(rows, note) {
  return `<section class="section section-alt">

<div class="container">

<div class="table-wrap">
<table class="spec-table">
<tbody>
${rows.map((r) => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('\n')}
</tbody>
</table>
</div>

${note ? `<p class="table-note">${note}</p>` : ''}

</div>

</section>`;
}

function proseSection(s) {
  return `<section class="section${s.alt ? ' section-alt' : ''}">

<div class="container narrow prose">

<h2>${s.heading}</h2>

${(s.paras || []).map((p) => `<p>${p}</p>`).join('\n')}

${s.list ? `<ul class="check-list">${s.list.map((li) => `<li>${li}</li>`).join('\n')}</ul>` : ''}

</div>

</section>`;
}

function featureGrid(s) {
  return `<section class="section${s.alt ? ' section-alt' : ''}">

<div class="container">

<h2>${s.heading}</h2>

${s.intro ? `<p class="section-intro">${s.intro}</p>` : ''}

<div class="features-grid">
${s.items
  .map(
    (it) => `<article class="feature-card">
<h3>${it.title}</h3>
<p>${it.text}</p>
</article>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

function faqBlock(items) {
  return `<section class="section section-alt">

<div class="container">

<h2>Questions about this packaging</h2>

<div class="faq-list">
${items
  .map(
    (f) => `<details class="faq-item">
<summary>${f.q}</summary>
<div class="faq-answer"><p>${f.a}</p></div>
</details>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

/* ------------------------------------------------------------------ *
 * product definitions
 * ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    slug: 'rigid-boxes',
    name: 'Premium Rigid Boxes',
    img: 'rigid-boxes-600.webp',
    metaTitle: 'Premium Rigid Boxes | Custom Rigid Box Manufacturer | Metapackink',
    metaDesc:
      'Custom premium rigid boxes manufactured to your product dimensions, with greyboard construction, specialty paper wraps and premium finishing for luxury and retail brands.',
    lead:
      'Rigid board packaging for products that require a premium presentation and durable structure. Custom sizes, papers, finishes and internal structures.',
    intro: [
      'A rigid box is built from thick greyboard that is wrapped in paper or fabric, rather than folded from a single printed sheet. That construction is what gives it the stiffness, the crisp corners and the weight in the hand that a folding carton cannot reproduce.',
      'It is the structure to choose when the packaging has to carry the brand rather than simply protect the product: unboxing is part of what the customer is buying, the box needs to survive being kept and reused, or the product is heavy or fragile enough that a thin carton would not hold it.'
    ],
    when: {
      heading: 'When a rigid box is the right choice',
      items: [
        { title: 'Presentation is the product', text: 'Premium consumer goods, gifts and luxury retail, where the box is opened in front of the customer and kept afterwards.' },
        { title: 'The product needs real protection', text: 'Heavy, fragile or high-value items where a folding carton would flex, crush or fail in transit.' },
        { title: 'The box must survive the journey intact', text: 'Rigid construction holds its shape under stacking and handling where a thin carton dents at the corners.' },
        { title: 'You need an engineered interior', text: 'Custom cavities, foam or EVA inserts and compartmented fitments all sit more naturally inside a rigid shell.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Board</strong> — greyboard from 1.5 mm to 3 mm, selected against product weight and box size.',
        '<strong>Wrap</strong> — coated paper, specialty and textured paper, fabric, or printed paper with your own artwork.',
        '<strong>Form</strong> — lid-and-base, book-style, magnetic closure, drawer, or a custom structure developed from your product.',
        '<strong>Interior</strong> — die-cut paperboard fitment, foam or EVA cavity, ribbon pull, compartmented tray, or a printed insert card.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'Metallic and specialty foil effects on the wrap, the insert card or the closure.' },
        { title: 'Embossing and debossing', text: 'Raised or recessed branding for a tactile finish that reads without light.' },
        { title: 'Spot UV', text: 'Selective high-gloss contrast against a matte laminated surface.' },
        { title: 'Lamination', text: 'Matte, gloss or soft-touch film to protect the wrap and set the surface feel.' },
        { title: 'Screen print', text: 'Heavier ink laydown for solid colours and effects on textured stock.' },
        { title: 'Ribbon and hardware', text: 'Ribbon pulls, metal corners, magnets and closures as part of the construction.' }
      ]
    },
    spec: [
      ['Structure', 'Rigid lid-and-base, book-style, magnetic closure, drawer or custom'],
      ['Board', 'Greyboard 1.5 mm – 3 mm, selected against product weight and box size'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, ribbon pull, compartmented tray'],
      ['Typical sizes', 'From small jewellery boxes to large presentation and gift sets'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Minimum order', 'Typically low hundreds of pieces; stated on each quotation'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    faq: [
      { q: 'How do I choose the board thickness?', a: 'Board thickness is driven by the product weight and the box size. Small boxes for light items work at 1.5 mm; larger boxes, heavier contents or structures that need to hold a crisp shape are built from 2 mm or more. Tell us what goes inside and we will specify it rather than leaving you to guess.' },
      { q: 'Can a rigid box have a magnetic closure?', a: 'Yes — the magnetic closure box is a rigid box with magnets set into the lid and base so it snaps shut. See the magnetic closure page for how the closure is specified.' },
      { q: 'How long does production take?', a: 'Typical production is 12 to 20 working days depending on structure, finishing and quantity, after the sample is approved and the deposit has cleared. Transit is additional.' },
      { q: 'Is there a minimum order quantity?', a: 'Rigid boxes typically start in the low hundreds of pieces, because the dies and setup are fixed costs. Small trial runs are possible on standard structures — ask and we will tell you honestly whether your quantity is viable.' },
      { q: 'Can you match my brand colour exactly?', a: 'We match against the approved physical sample under standard lighting, with a Delta E of up to 3 treated as a match on solid brand colours. A digital proof is not a colour contract. See the FAQ for detail on colour variation.' }
    ],

    /* The five values a buyer scans before reading anything. The labels are
       the same on all seven products and in this order, so the strip is in a
       predictable place whichever page a buyer lands on. */
    attributes: [
      ['Material', 'Greyboard 1.5 – 3 mm, wrapped in paper or fabric'],
      ['Shape', 'Lid and base, book-style, magnetic or drawer'],
      ['Application', 'Luxury retail, gifting, subscription sets'],
      ['Advantage', 'Rigid board that holds its shape and gets kept'],
      ['Printing', 'Offset CMYK or Pantone, foil, emboss, spot UV']
    ],

    detail: {
      heading: 'Custom rigid boxes, built around your product',
      intro: 'Three decisions decide whether a rigid box works: how thick the board is, how the interior holds the product, and how the wrap is finished. All three are set from your product rather than picked from a stock size.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Premium rigid boxes',
      blocks: [
        {
          title: 'Board thickness follows the product, not the box size',
          text: 'A small box for a light item works at 1.5 mm greyboard. A large box, a heavy product, or a structure that has to hold a crisp shape is built from 2 mm or more — thin board bows across a wide lid no matter how good the wrap is. Send the weight and the dimensions and the board is specified from those, which is the opposite of choosing a stock box and hoping.',
          img: 'rigid-boxes-detail.webp',
          imgAlt: 'Premium rigid lid-and-base box with the lid lifted off, showing the wrapped greyboard edge'
        },
        {
          title: 'The interior is engineered, not filled',
          text: 'A die-cut paperboard fitment, a foam or EVA cavity, a compartmented tray or a printed insert card. The fitment is drawn alongside the box so the product sits at the height the design intends. This is the part most often left until last, and the part that most often forces the box to be resized once the product finally goes in.'
        },
        {
          title: 'One wrap and one finish specification, held across the order',
          text: 'The wrap carries the brand, so it is specified once: coated, specialty or textured paper, fabric, or printed paper with your own artwork, finished with foil, emboss, deboss, spot UV, lamination or screen print. Where two finishes share a panel we check that they do not compromise each other, because foil will not adhere reliably to every stock.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for rigid boxes. ODM means adapting one of our existing structures and tooling to your product; OEM means building to your drawing from the first dieline.',
      sampling: 'every rigid box sample is inspected for corner tension, wrap position and the absence of a glueline before it is signed off as the reference production is measured against.',
      assurance: 'Rigid boxes are warranted against the approved sample for corner and wrap defects, which are the two failure modes specific to hand-built rigid construction.'
    },

    capabilities: {
      noun: 'premium rigid boxes',
      industries: ['Luxury retail', 'Gifting and gift sets', 'Beauty and personal care', 'Jewellery', 'Premium consumer products', 'Subscription boxes'],
      shapes: ['Lid and base', 'Magnetic closure', 'Book-style', 'Drawer', 'Lidded hamper', 'Custom structure'],
      inserts: ['Die-cut paperboard', 'Foam or EVA cavity', 'Compartmented tray', 'Fabric-wrapped tray', 'Moulded pulp', 'Printed insert card', 'Ribbon pull']
    }
  },

  {
    slug: 'magnetic-boxes',
    name: 'Magnetic Closure Boxes',
    img: 'magnetic-boxes-600.webp',
    metaTitle: 'Magnetic Closure Boxes | Custom Magnetic Gift Boxes | Metapackink',
    metaDesc:
      'Custom magnetic closure boxes with concealed magnets, rigid greyboard construction, ribbon or tab opening and premium finishing for luxury brands and gift sets.',
    lead:
      'Premium magnetic boxes for luxury product presentation. A concealed magnet holds the lid shut, so the box opens deliberately rather than falling open.',
    intro: [
      'A magnetic closure box is a rigid box with magnets set into the lid and the base so the lid snaps down and holds. The magnets are concealed inside the board, so nothing is visible from the outside — the closure simply feels intentional, and the box stays shut in a bag or on a shelf.',
      'It is the structure most often chosen for unboxing-led products and gift sets, because the moment of opening is a designed moment rather than an accident of gravity.'
    ],
    when: {
      heading: 'When a magnetic box is the right choice',
      items: [
        { title: 'The unboxing is the point', text: 'Brands where opening the package is a designed experience the customer films, photographs or repeats.' },
        { title: 'The box travels and returns', text: 'The magnetic lid keeps the box shut in a bag, and the rigid structure survives being kept and reused.' },
        { title: 'Gift and presentation sets', text: 'Multi-piece gift sets, beauty sets and subscription boxes where a hinged lid reads as considered.' },
        { title: 'It needs to stay shut', text: 'Products handled or displayed by the customer, where a loose lid would open at the wrong moment.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Magnet specification</strong> — magnet size and grade are chosen against the lid size and how firmly the box should hold. Undersized magnets let the lid drift; oversized ones make it fight the customer.',
        '<strong>Magnet placement</strong> — concealed between the board and the wrap, set in recesses so the surface stays flat with no bulge.',
        '<strong>Lid style</strong> — full flap, half flap, or a wrap-around cover wrapping onto the base.',
        '<strong>Opening</strong> — ribbon pull, die-cut thumb tab, or a lift-off lid with no tab.',
        '<strong>Interior</strong> — die-cut fitment, foam or EVA cavity, compartmented tray for multi-product sets.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'Brand mark or logo in metallic or specialty foil on the lid face or the spine.' },
        { title: 'Emboss and deboss', text: 'Tactile branding that reads in the hand as well as the eye.' },
        { title: 'Spot UV', text: 'Gloss pattern against matte for a layered, premium surface.' },
        { title: 'Soft-touch lamination', text: 'A velvety surface finish that is common on premium beauty and fragrance packaging.' },
        { title: 'Printed wrap', text: 'Full-colour printed paper or specialty textured stock with your artwork.' },
        { title: 'Ribbon', text: 'Satin or grosgrain ribbon pull, colour-matched to the brand palette.' }
      ]
    },
    spec: [
      ['Structure', 'Rigid box with concealed magnetic closure, full or half flap'],
      ['Board', 'Greyboard 1.5 mm – 3 mm'],
      ['Magnet', 'Size and grade specified against lid dimensions and required holding force'],
      ['Magnet placement', 'Concealed between board and wrap, recessed so the surface stays flat'],
      ['Opening', 'Ribbon pull, die-cut thumb tab, or lift-off with no tab'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, compartmented tray'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    faq: [
      { q: 'How strong should the magnets be?', a: 'Strong enough to hold the lid closed in handling, but not so strong that the customer has to pry it open. Magnet size and grade are specified against the lid dimensions and the holding force the box needs, which is why lid size matters more than the product weight here.' },
      { q: 'Can the magnets be hidden?', a: 'Yes, and they normally are. The magnets sit in recesses between the board and the wrap so the outside of the box stays perfectly flat with no bulge or visible closure.' },
      { q: 'What is the difference between a magnetic box and a two-piece box?', a: 'A two-piece box is a separate lid and base held by friction and gravity; a magnetic box has a hinged lid held by magnets. Magnetic boxes cost more, open more deliberately, and stay shut in transit. See the comparison for the full trade-off.' },
      { q: 'Can I add a ribbon pull?', a: 'Yes. A colour-matched satin or grosgrain ribbon pull is one of the most common additions, either as a lift tab or as a decorative band under the lid.' },
      { q: 'Will the lid stay aligned after repeated opening?', a: 'The rigid shell and the board hinge are what keep alignment. We build the hinge and lid clearance so the box still closes cleanly after repeated use, which matters for packaging that is kept rather than discarded.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 3 mm with concealed magnets'],
      ['Shape', 'Hinged lid, full flap, half flap or wrap-around'],
      ['Application', 'Gift sets, unboxing-led retail, discovery sets'],
      ['Advantage', 'A lid that snaps shut and stays shut'],
      ['Printing', 'Offset CMYK or Pantone, foil, soft-touch, spot UV']
    ],

    detail: {
      heading: 'Custom magnetic closure boxes, specified around the lid',
      intro: 'A magnetic box lives or dies on its closure. Magnet grade, count and position are chosen together against the lid size and the way the box is carried, and the result is proved on a physical sample rather than on a drawing.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Magnetic closure boxes',
      blocks: [
        {
          title: 'Magnet strength is the same error in two directions',
          text: 'Too weak and the lid drifts open when the box is carried by the base. Too strong and the customer has to pry it open, which is a worse first impression than a loose lid. Grade and count are specified against the lid dimensions and the holding force the box needs, which is why lid size matters more here than product weight does.',
          img: 'magnetic-boxes-detail.webp',
          imgAlt: 'Black magnetic closure rigid box hinged open, with a satin ribbon pull lying on the lid'
        },
        {
          title: 'The magnets stay concealed and the surface stays flat',
          text: 'Magnets sit in recesses between the board and the wrap, so nothing shows from outside and no bulge telegraphs through a soft-touch laminate. Placement is set in the dieline so every box in the run seats at the same height, not just the sample that was photographed.'
        },
        {
          title: 'The opening is designed, not left to gravity',
          text: 'A ribbon pull, a die-cut thumb tab, or a lift-off lid with no tab at all. A ribbon can be colour-matched to the palette and anchored under the wrap; a thumb tab interrupts the outer face but needs no extra component. Whichever you choose decides how the first two seconds of the unboxing feel.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for magnetic closure boxes. ODM means adapting one of our existing magnetic structures and magnet positions to your lid; OEM means specifying the closure from your drawing.',
      sampling: 'a magnetic sample is approved loaded and closed, then inverted and carried by the base — a magnet that holds convincingly on a bench can still lift at the front corners in a bag.',
      assurance: 'Magnetic closures are warranted against the approved sample for holding force and lid alignment after repeated opening, the two faults that only surface once the customer has the box.'
    },

    capabilities: {
      noun: 'magnetic closure boxes',
      industries: ['Gift and presentation sets', 'Beauty and skincare', 'Fragrance', 'Jewellery', 'Corporate gifting', 'Electronics accessories'],
      shapes: ['Magnetic closure, full flap', 'Magnetic closure, half flap', 'Wrap-around cover to base', 'Book-style magnetic', 'Magnetic drawer', 'Custom structure'],
      inserts: ['Die-cut paperboard fitment', 'Foam or EVA cavity', 'Compartmented tray', 'Ribbon pull', 'Printed insert card', 'Mirror insert']
    }
  },

  {
    slug: 'two-piece-boxes',
    name: 'Two-Piece Rigid Boxes',
    img: 'two-piece-boxes-600.webp',
    metaTitle: 'Two-Piece Rigid Boxes | Custom Lid and Base Boxes | Metapackink',
    metaDesc:
      'Custom two-piece rigid boxes with a separate lid and base, wrapped greyboard construction and premium finishing. The classic premium lid-and-base presentation box.',
    lead:
      'Classic lid-and-base construction with custom finishing. A separate lid and base held by friction — the simplest premium structure there is.',
    intro: [
      'A two-piece rigid box is exactly what it sounds like: a base and a separate lid that slides on and holds by friction. There is no hinge, no magnet and no mechanism, which makes it the most direct and often the most economical way to present a product in a rigid box.',
      'It is also the structure with the clearest "ker-chunk" of assembly: the lid seats fully home, which gives the customer a definite sense that the box is closed.'
    ],
    when: {
      heading: 'When a two-piece box is the right choice',
      items: [
        { title: 'You want premium without a mechanism', text: 'Rigid presentation and the feel of a proper box, without the cost of a hinge, magnet set or lid wrap.' },
        { title: 'The budget is a real constraint', text: 'The simplest rigid construction, so the per-unit cost is lower than a magnetic or book-style box at the same size.' },
        { title: 'The box needs to be produced at scale', text: 'Fewer components and simpler assembly make it the easiest rigid structure to run in high volume.' },
        { title: 'Classic retail presentation', text: 'Beauty, confectionery, apparel and premium retail where the lid-lifts-off gesture is the expected one.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Lid depth</strong> — full-depth lid covering the whole base, or a shallow lid that shows a band of the base as a design detail.',
        '<strong>Lid fit</strong> — lid-to-base clearance is set so the lid holds by friction but still releases without force. Too tight and it sticks; too loose and it falls off.',
        '<strong>Board</strong> — greyboard 1.5 mm to 2.5 mm, matched to box size.',
        '<strong>Base interior</strong> — die-cut fitment, foam or EVA cavity, or a simple printed base liner.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Full wrap', text: 'Lid and base wrapped in the same stock for a continuous look.' },
        { title: 'Contrasting wraps', text: 'A different stock, colour or finish on the lid and the base to create a deliberate two-tone effect.' },
        { title: 'Foil stamping', text: 'Foil on the lid face, lid edge or base as a brand mark.' },
        { title: 'Emboss and deboss', text: 'Tactile branding, often on the lid face where the thumb naturally lands.' },
        { title: 'Spot UV', text: 'Selective gloss against matte for surface contrast.' },
        { title: 'Printed wrap', text: 'Full-colour print with your artwork across one or both pieces.' }
      ]
    },
    spec: [
      ['Structure', 'Separate lid and base, held by friction — no hinge or closure mechanism'],
      ['Board', 'Greyboard 1.5 mm – 2.5 mm'],
      ['Lid depth', 'Full-depth or shallow, as a design decision'],
      ['Lid fit', 'Clearance set so the lid holds securely but releases without force'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, printed base liner'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    faq: [
      { q: 'Will the lid stay on in transit?', a: 'Yes, provided the lid fit is specified correctly. The lid-to-base clearance is set so the lid holds by friction — we test it on the physical sample, because a lid that holds well on a bench can behave differently once the base carries the product weight.' },
      { q: 'Can the lid and base be different colours?', a: 'Yes, and it is a common design choice. A contrasting lid and base creates a deliberate two-tone effect and is often cheaper than adding a printed design.' },
      { q: 'Two-piece or magnetic — which should I choose?', a: 'Two-piece is simpler, cheaper and easier to scale; magnetic opens more deliberately and stays shut more positively. If the unboxing moment matters and the budget allows, magnetic; if you want premium presentation at the best unit cost, two-piece.' },
      { q: 'Can I add an insert?', a: 'Yes. A die-cut paperboard fitment, foam or EVA cavity, or a printed base liner are all normal additions, and the fitment is designed alongside the box so the product sits correctly.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 2.5 mm, paper or fabric wrap'],
      ['Shape', 'Separate lid and base, held by friction'],
      ['Application', 'Retail presentation, confectionery, apparel'],
      ['Advantage', 'Premium presentation at the lowest rigid unit cost'],
      ['Printing', 'Offset CMYK or Pantone, foil, emboss, two-tone wraps']
    ],

    detail: {
      heading: 'Custom two-piece boxes, where the lid fit is the whole design',
      intro: 'There is no hinge and no magnet, so everything rests on the clearance between the lid and the base. Set it correctly and the lid seats with a definite stop and releases without force; set it wrong and the box either sticks or drops its lid in transit.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Two-piece rigid boxes',
      blocks: [
        {
          title: 'Lid clearance is a measured value, not a judgement call',
          text: 'Board thickness, wrap thickness and humidity all change the fit, so the clearance is set in the dieline and then proved on the physical sample. A lid that holds well on a bench can behave differently once the base is carrying the product’s weight, which is why samples are fitted with the product in them.',
          img: 'two-piece-boxes-detail.webp',
          imgAlt: 'Two-piece rigid box in sand-beige paper with the shallow lid lifted off beside the open base'
        },
        {
          title: 'Full-depth or shallow, as a design decision',
          text: 'A full-depth lid covers the base entirely and reads as one solid block of colour. A shallow lid exposes a band of the base and gives you a two-tone box without printing a two-tone design, which is often the cheaper route to a distinctive shelf presence.'
        },
        {
          title: 'The simplest rigid structure to produce at volume',
          text: 'Two components, no mechanism and a straightforward wrap make this the rigid structure that scales most easily, and the one that carries the lowest per-unit cost at a given size. That is why it remains the default choice for retail presentation when the quantity is large.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for two-piece lid-and-base boxes. ODM means running one of our existing lid-and-base tools at your size; OEM means developing the clearance from your dimensions.',
      sampling: 'a two-piece sample is fitted with the product in the base and then opened and closed repeatedly, because a lid that holds empty can behave differently once it is carrying weight.',
      assurance: 'Two-piece boxes are warranted against the approved sample for lid fit, including the lid still seating correctly after the box has been through repeated open-and-close cycles.'
    },

    capabilities: {
      noun: 'two-piece rigid boxes',
      industries: ['Confectionery', 'Apparel and accessories', 'Beauty', 'Premium retail', 'Corporate gifting', 'Subscription boxes'],
      shapes: ['Full-depth lid and base', 'Shallow lid and base', 'Two-tone lid and base', 'Square and rectangular', 'Tall and narrow', 'Custom structure'],
      inserts: ['Die-cut paperboard', 'Foam or EVA cavity', 'Printed base liner', 'Compartmented tray', 'Moulded pulp', 'Fabric-wrapped tray']
    }
  },

  {
    slug: 'drawer-boxes',
    name: 'Custom Drawer Boxes',
    img: 'drawer-boxes-600.webp',
    metaTitle: 'Custom Drawer Boxes | Sliding Rigid Drawer Packaging | Metapackink',
    metaDesc:
      'Custom drawer boxes with a sliding inner tray inside a rigid outer sleeve, ribbon or finger pull, and premium finishing for retail and gifting.',
    lead:
      'Elegant pull-out drawer packaging for premium retail and gifting. An inner tray slides out of a rigid outer sleeve.',
    intro: [
      'A drawer box is a rigid outer sleeve with a sliding inner tray. Pull the ribbon or the finger hole and the tray comes out, presenting the product as a revealed object rather than something lifted out of a lid.',
      'The structure suits products that are displayed as much as they are opened, and it gives designers a clean, unbroken outer surface to print on — the sleeve can carry the artwork with nothing interrupting it.'
    ],
    when: {
      heading: 'When a drawer box is the right choice',
      items: [
        { title: 'The product should be revealed', text: 'Jewellery, accessories, small premium goods, where sliding the drawer open presents the product cleanly.' },
        { title: 'The outer face is the design', text: 'A seamless sleeve gives an uninterrupted printed or wrapped surface, with no lid seam or hinge to design around.' },
        { title: 'Retail shelf presence', text: 'A drawer box stacks squarely and presents a clean face on shelf, which a hinged lid does not always do.' },
        { title: 'Repeated handling', text: 'Drawer boxes are opened and closed often; the sliding action stays reliable where a friction lid loosens with use.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Sleeve</strong> — rigid greyboard sleeve wrapped in paper or fabric, carrying the outer design.',
        '<strong>Tray</strong> — sliding inner tray, wrapped to match or deliberately contrasted.',
        '<strong>Pull</strong> — ribbon pull, die-cut finger hole, or a tab formed from the tray itself.',
        '<strong>Stop</strong> — an internal stop so the tray cannot be pulled fully out unless the design intends it.',
        '<strong>Interior</strong> — die-cut fitment, foam or EVA cavity inside the tray.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'Brand mark on the sleeve face, where it reads on shelf.' },
        { title: 'Emboss and deboss', text: 'Tactile detail on the sleeve or the tray face.' },
        { title: 'Spot UV', text: 'Gloss pattern across a matte sleeve for surface contrast.' },
        { title: 'Printed sleeve', text: 'Full-colour artwork wrapping the whole outer face uninterrupted.' },
        { title: 'Ribbon pull', text: 'Satin or grosgrain ribbon, colour-matched, as the drawer pull.' },
        { title: 'Contrast linings', text: 'A different stock inside the tray for a reveal effect when it opens.' }
      ]
    },
    spec: [
      ['Structure', 'Rigid outer sleeve with sliding inner tray'],
      ['Board', 'Greyboard 1.5 mm – 2.5 mm'],
      ['Pull', 'Ribbon pull, die-cut finger hole, or formed tab'],
      ['Stop', 'Internal stop to limit tray travel, if required'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity inside the tray'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    faq: [
      { q: 'Can the drawer be pulled out completely?', a: 'That is a design decision. Most drawer boxes have an internal stop so the tray cannot be pulled fully out and dropped. If you want the tray to come free — for example as a separate display element — we build it without the stop.' },
      { q: 'How does the drawer slide?', a: 'The tray runs on the inside face of the sleeve, with the clearance specified so it moves smoothly without binding. Board thickness, wrap thickness and humidity all affect the fit, which is why the sliding action is checked on the physical sample rather than assumed.' },
      { q: 'What is the best pull option?', a: 'A ribbon pull reads most premium and allows the sleeve to stay completely clean when closed. A die-cut finger hole is more robust and needs no extra component, but it interrupts the outer face.' },
      { q: 'Can the sleeve be printed all over?', a: 'Yes. The wrap can carry full-colour artwork uninterrupted across the whole sleeve, which is the main design advantage of a drawer box over a hinged lid.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 2.5 mm, wrapped sleeve and tray'],
      ['Shape', 'Outer sleeve with a sliding inner tray'],
      ['Application', 'Jewellery, accessories, retail display'],
      ['Advantage', 'An unbroken outer face and a revealed product'],
      ['Printing', 'Full-wrap print, foil, emboss, contrast lining']
    ],

    detail: {
      heading: 'Custom drawer boxes, one clean face and one reveal',
      intro: 'A drawer box splits the design across two surfaces that do different jobs: an outer sleeve with no seam, hinge or closure interrupting it, and an inner tray whose lining the customer sees only at the moment it opens.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Custom drawer boxes',
      blocks: [
        {
          title: 'The sleeve is a continuous printed surface',
          text: 'No lid seam and no hinge means full-colour artwork can run across the whole outer face without interruption, edge to edge. That is the structural advantage a drawer box has over a hinged lid, and it is why the sleeve usually carries the brand mark while the tray stays quiet.',
          img: 'drawer-boxes-detail.webp',
          imgAlt: 'Rigid drawer box with a navy wrapped sleeve and the cream inner tray pulled part way out'
        },
        {
          title: 'The tray travel is designed, not left to the customer',
          text: 'Most drawer boxes carry an internal stop so the tray cannot be pulled free and dropped. Leaving the stop out is a deliberate choice — for a tray that doubles as a display element — and it changes the fitment, so it is settled at the dieline stage rather than after the first sample.'
        },
        {
          title: 'The sliding fit is what has to survive handling',
          text: 'A friction lid loosens with use; a drawer runs on the inside face of the sleeve, with a clearance specified for smooth travel without binding. Board thickness, wrap thickness and humidity all move that clearance, so the sliding action is checked on the sample with the product loaded rather than assumed from a drawing.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for drawer boxes. ODM means adapting an existing sleeve-and-tray tool to your footprint; OEM means developing the stop and the travel from your drawing.',
      sampling: 'a drawer sample is checked for tray travel with the product loaded, and for the internal stop holding under withdrawal, which is the failure that only shows up after repeated use.',
      assurance: 'Drawer boxes are warranted against the approved sample for tray travel and stop performance, since those are what degrade first on a box that is opened daily.'
    },

    capabilities: {
      noun: 'custom drawer boxes',
      industries: ['Jewellery', 'Watches and accessories', 'Beauty', 'Premium retail', 'Gift sets', 'Hospitality and amenity'],
      shapes: ['Drawer with ribbon pull', 'Drawer with finger hole', 'Drawer with formed tab', 'Drawer with internal stop', 'Removable tray', 'Custom structure'],
      inserts: ['Die-cut paperboard', 'Fabric-wrapped tray', 'Foam or EVA cavity', 'Compartmented tray', 'Contrast fabric lining', 'Printed insert card']
    }
  },

  {
    slug: 'perfume-packaging',
    name: 'Perfume Packaging',
    img: 'perfume-packaging-600.webp',
    metaTitle: 'Custom Perfume Box Packaging | Fragrance Box Manufacturer | Metapackink',
    metaDesc:
      'Custom perfume and fragrance packaging built around your bottle dimensions: rigid and magnetic fragrance boxes, bottle-specific inserts, materials and premium finishing.',
    lead:
      'Custom fragrance boxes built around bottle dimensions. Rigid and magnetic structures with inserts designed to hold the bottle securely.',
    intro: [
      'Perfume packaging is a dimensional problem before it is a design problem. The bottle has a specific footprint and height, the cap is often wider than the body, and the whole thing has to arrive without moving inside the box. Get the cavity wrong and no amount of finishing rescues it.',
      'So we work from the bottle. Send the bottle dimensions — or the bottle itself — and the box and insert are developed around it, with the clearance set so the bottle is held firmly but can be taken out without force.'
    ],
    when: {
      heading: 'What we design around',
      items: [
        { title: 'Bottle footprint and height', text: 'Including any cap or atomiser that is wider than the bottle body, which is the most common fit error we correct.' },
        { title: 'Bottle weight', text: 'Glass is heavy per unit volume; the board thickness and cavity depth follow the weight, not just the dimensions.' },
        { title: 'Cavity clearance', text: 'Set so the bottle cannot rattle in transit but still lifts out cleanly. Too tight is worse than too loose — it risks chipping the glass.' },
        { title: 'Gift set configuration', text: 'Single bottle, bottle plus a smaller travel size, or a full set with a printed insert card.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Rigid lid-and-base</strong> — the classic fragrance box, with a die-cut fitment holding the bottle.',
        '<strong>Magnetic closure</strong> — hinged lid with concealed magnets, common for premium and gift-set fragrance.',
        '<strong>Drawer</strong> — sliding tray, used for sets and for display-led packshots.',
        '<strong>Fitment</strong> — die-cut paperboard collar, foam or EVA cavity, or a moulded insert for irregular bottle shapes.',
        '<strong>Neck support</strong> — where a tall bottle needs the neck or the cap restrained as well as the base.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'The dominant finish on fragrance packaging — brand marks, borders and fine detail in metallic or specialty foil.' },
        { title: 'Emboss and deboss', text: 'Tactile brand marks, often combined with foil on the same element.' },
        { title: 'Soft-touch lamination', text: 'A velvety matte surface that is standard across premium fragrance.' },
        { title: 'Spot UV', text: 'Gloss detail layered over a matte, soft-touch surface.' },
        { title: 'Specialty and textured papers', text: 'Heavy textured stock for a tactile surface under the hand.' },
        { title: 'Ribbon', text: 'Colour-matched satin ribbon as a pull or as a decorative band.' }
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, magnetic closure, drawer'],
      ['Bottle sizes', 'From travel-size 10 ml up to large-format flacons'],
      ['Board', 'Greyboard 1.5 mm – 3 mm, specified against bottle weight'],
      ['Fitment', 'Die-cut paperboard collar, foam or EVA cavity, moulded insert'],
      ['Neck support', 'Available where a tall bottle needs the cap restrained'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, soft-touch lamination, screen print'],
      ['Sampling', 'Physical sample with the bottle fitted before every production run']
    ],
    faq: [
      { q: 'What bottle dimensions do you need?', a: 'Overall height including the cap, the bottle body width and depth, the widest point if the cap or shoulders are wider than the body, and the filled weight. If the cap is wider than the bottle body, tell us — that is the most common cause of a box that does not close properly.' },
      { q: 'Can you work from a bottle sample?', a: 'Yes, and it is the most reliable route. Send the physical bottle or a filled sample and the cavity is developed and tested against it, so the fit is confirmed before production rather than discovered afterwards.' },
      { q: 'How is the bottle held in place?', a: 'Normally a die-cut paperboard collar that grips the bottle at the base, sometimes with a neck or cap support for tall bottles. Foam and EVA cavities are used where the bottle shape is irregular or the protection requirement is higher.' },
      { q: 'Will the bottle rattle in transit?', a: 'Not if the cavity is specified correctly. Clearance is set tight enough to hold the bottle firmly without making it difficult to remove — the tension is checked on the physical sample with the actual bottle fitted.' },
      { q: 'Do you make multi-bottle gift sets?', a: 'Yes. Compartmented fitments for a full-size bottle plus a travel size, or a complete set with a printed insert card, are common configurations.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 3 mm, specified against bottle weight'],
      ['Shape', 'Lid and base, magnetic closure or drawer'],
      ['Application', 'Fragrance, flacons, travel sizes, gift sets'],
      ['Advantage', 'A cavity cut to the bottle, not to a stock size'],
      ['Printing', 'Foil, emboss, soft-touch, textured and specialty papers']
    ],

    detail: {
      heading: 'Custom fragrance boxes, developed from the bottle',
      intro: 'Perfume packaging is a dimensional problem before it is a design problem. The bottle has a footprint and a height, the cap is often wider than the body, and the whole thing has to arrive without moving. Get the cavity wrong and no amount of finishing rescues it.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Perfume packaging',
      blocks: [
        {
          title: 'Send the bottle, not only the dimensions',
          text: 'Overall height with the cap on, body width and depth, the widest point if the shoulders or the cap exceed the body, and the filled weight. A cap wider than the body is the single most common cause of a fragrance box that will not close, and it is invisible in a dimension list that only quotes the bottle itself.',
          img: 'perfume-packaging-detail.webp',
          imgAlt: 'Fragrance box open with a glass flacon seated upright in a die-cut paperboard collar'
        },
        {
          title: 'The cavity is specified for glass, not for paper',
          text: 'Glass is heavy per unit of volume, so board thickness and cavity depth follow the weight rather than the outline. Clearance is set so the bottle cannot rattle in transit but still lifts out cleanly. Too tight is the worse error here, because a tight cavity chips the glass at the shoulder.'
        },
        {
          title: 'Foil and soft-touch are the category default for a reason',
          text: 'Foil carries fine detail on a small panel better than process print does, and it is what the category expects to see. Soft-touch lamination gives the matte, velvety surface the hand reads as expensive. Where the two meet on one panel the foil is applied first, and the interaction is checked on the sample.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for fragrance packaging. ODM means fitting an existing fragrance structure to your flacon; OEM means developing the cavity and the cradle from your bottle.',
      sampling: 'a fragrance sample is produced and checked with the actual bottle fitted, filled to its working weight, so the cavity is proved with glass in it rather than empty.',
      assurance: 'Fragrance packaging is warranted against the approved sample with the bottle fitted, covering cavity clearance and cap support, which is where a fit problem shows up first.'
    },

    capabilities: {
      noun: 'perfume packaging',
      industries: ['Fragrance and perfumery', 'Beauty and skincare', 'Travel retail', 'Gift and presentation sets', 'Premium retail', 'Corporate gifting'],
      shapes: ['Lid and base', 'Magnetic closure', 'Drawer', 'Book-style', 'Multi-bottle coffret', 'Custom structure'],
      inserts: ['Die-cut bottle collar', 'Foam or EVA cavity', 'Moulded insert', 'Neck and cap support', 'Compartmented tray', 'Moulded pulp', 'Printed or mirror insert card']
    }
  },

  {
    slug: 'cosmetic-packaging',
    name: 'Cosmetic Packaging',
    img: 'cosmetic-packaging-600.webp',
    metaTitle: 'Custom Cosmetic Packaging Boxes | Skincare & Beauty | Metapackink',
    metaDesc:
      'Custom cosmetic packaging for skincare, makeup and beauty brands: rigid and magnetic boxes, inserts for jars and bottles, retail-ready structures and premium finishing.',
    lead:
      'Branded packaging for skincare and beauty products. Structures developed around jars, bottles, tubes and multi-piece routine sets.',
    intro: [
      'Cosmetic packaging spans a wider range of container shapes than almost any other category — a heavy glass cream jar, a slim serum dropper, a wide compact, a tube, a pump bottle — and each one has different fit and protection requirements inside the same box.',
      'So the insert does most of the work. We design the cavity around the specific container, and where a set mixes shapes we build a compartmented fitment so every piece is held individually rather than loose in the same space.'
    ],
    when: {
      heading: 'What we design around',
      items: [
        { title: 'Mixed container shapes', text: 'A routine set with a jar, a dropper bottle and a tube needs three different cavities in one box.' },
        { title: 'Heavy glass', text: 'Cream jars and glass bottles carry real weight; board thickness and cavity depth follow it.' },
        { title: 'Retail shelf requirements', text: 'Boxes that have to stack squarely, face out cleanly and survive handling on a retail floor.' },
        { title: 'E-commerce transit', text: 'Packaging that ships direct to the customer has to protect through a courier network, not just look good on a shelf.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Rigid lid-and-base</strong> — the standard presentation box for a single hero product.',
        '<strong>Magnetic closure</strong> — common for gift sets, discovery sets and premium skincare.',
        '<strong>Drawer</strong> — sliding tray for sets and for products presented as a reveal.',
        '<strong>Folding carton</strong> — for lighter cosmetic items where a rigid structure is unnecessary.',
        '<strong>Compartmented fitment</strong> — individual cavities so multi-piece sets do not move against each other.',
        '<strong>Leaflet and mirror</strong> — printed insert cards, leaflets and mirror inserts as part of the assembly.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Foil stamping', text: 'Brand marks and fine decorative detail in metallic or specialty foil.' },
        { title: 'Spot UV', text: 'Gloss pattern over matte, widely used across beauty packaging.' },
        { title: 'Soft-touch lamination', text: 'A velvety matte surface that photographs well and feels premium.' },
        { title: 'Emboss and deboss', text: 'Tactile brand marks, often combined with foil.' },
        { title: 'Printed wrap', text: 'Full-colour artwork, including photographic and gradient reproduction.' },
        { title: 'Specialty papers', text: 'Textured and coated stocks for a distinctive surface under the hand.' }
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, magnetic closure, drawer, folding carton'],
      ['Products covered', 'Cream jars, serum bottles, droppers, tubes, pumps, compacts, sets'],
      ['Board', 'Greyboard 1.5 mm – 2.5 mm for rigid structures'],
      ['Fitment', 'Individual cavities, compartmented trays, foam or EVA where needed'],
      ['Insert cards', 'Printed card, leaflet, or mirror insert'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, printed paper'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, soft-touch lamination, screen print'],
      ['Sampling', 'Physical sample with the product fitted before every production run']
    ],
    faq: [
      { q: 'Can you make packaging for a mixed-format skincare set?', a: 'Yes, and it is one of the most common requests. Each container gets its own cavity in a compartmented fitment, so a heavy glass jar and a thin dropper bottle are both held securely without moving against each other in transit.' },
      { q: 'What do you need to design the insert?', a: 'The dimensions of each container, and ideally a physical sample of each. For cream jars the filled weight matters as much as the dimensions, because it determines how deep the cavity has to be to hold the jar without straining the base.' },
      { q: 'Is rigid packaging necessary for cosmetics?', a: 'Not always. Lighter items and refill pouches often work fine in a folding carton at a much lower unit cost. Rigid and magnetic structures earn their cost when presentation, protection or product weight justify them — we will tell you which side of that line your product falls on.' },
      { q: 'Can the box ship direct to consumers?', a: 'Yes, though it needs designing for it. E-commerce transit is harsher than retail pallet transit, so the cavity needs to hold through a courier network. Tell us it is shipping direct and we will specify the fitment accordingly.' },
      { q: 'Do you supply the insert card and leaflet too?', a: 'Yes — printed insert cards, leaflets and mirror inserts are produced as part of the assembly, so the box arrives ready to pack rather than needing components from a second supplier.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 2.5 mm, paper or specialty wrap'],
      ['Shape', 'Lid and base, magnetic, drawer or folding carton'],
      ['Application', 'Skincare, makeup, droppers, tubes, routine sets'],
      ['Advantage', 'A different cavity for every container in the set'],
      ['Printing', 'Offset CMYK or Pantone, foil, soft-touch, spot UV']
    ],

    detail: {
      heading: 'Custom cosmetic packaging, built container by container',
      intro: 'Cosmetics spans more container shapes than any other category — a heavy glass cream jar, a slim serum dropper, a wide compact, a tube, a pump — and each one has a different fit and protection requirement inside a box that still has to read as one brand.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Cosmetic packaging',
      blocks: [
        {
          title: 'Mixed formats get compartmented fitments',
          text: 'A routine set with a jar, a dropper and a tube needs three different cavities in one box. Each container is held individually, so a heavy glass jar and a thin dropper bottle cannot move against each other in transit. That is a fitment question rather than a box question, and it is why the contents list matters more than the hero product.',
          img: 'cosmetic-packaging-detail.webp',
          imgAlt: 'Cosmetic gift box with a compartmented insert holding a cream jar, a dropper bottle and a tube'
        },
        {
          title: 'Filled weight, not only dimensions',
          text: 'A cream jar is specified against its filled weight as much as its outline, because the weight decides how deep the cavity has to be to hold the jar without straining the base. Where the product is oil-based we face or laminate the interior, because oils wick into raw board and show through as a stain weeks after the box looked perfect.'
        },
        {
          title: 'Rigid is not always the answer',
          text: 'Lighter items and refill pouches often work in a folding carton at a much lower unit cost. Rigid and magnetic structures earn their price when presentation, protection or product weight justify them, and we will tell you plainly which side of that line your product falls on rather than quoting the more expensive one.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for cosmetic and skincare packaging. ODM means fitting our existing jars-and-bottles structures to your range; OEM means developing every cavity from your containers.',
      sampling: 'where the order is a set, the sample is checked with every container fitted and filled to its working weight, so nothing is approved on an empty mock-up.',
      assurance: 'Cosmetic packaging is warranted against the approved sample for fitment clearance and interior facing, covering the two faults specific to this category: interior oil staining and cap or actuator stress.'
    },

    capabilities: {
      noun: 'cosmetic packaging',
      industries: ['Skincare', 'Colour cosmetics', 'Beauty and personal care', 'Fragrance', 'Daily chemicals', 'Subscription and discovery sets'],
      shapes: ['Lid and base', 'Magnetic closure', 'Drawer', 'Folding carton', 'Book-style', 'Custom structure'],
      inserts: ['Individual die-cut cavities', 'Compartmented tray', 'Foam or EVA cavity', 'Printed insert card', 'Leaflet', 'Mirror insert', 'Moulded pulp']
    }
  },

  {
    slug: 'gift-packaging',
    name: 'Premium Gift Packaging',
    img: 'premium-gift-packaging-600.webp',
    metaTitle: 'Premium Gift Packaging & Presentation Boxes | Metapackink',
    metaDesc:
      'Custom premium gift packaging and presentation boxes for gifting, retail presentation and special editions, with rigid construction and premium finishing.',
    lead:
      'Luxury presentation boxes designed for gifting and special editions. Packaging the recipient keeps rather than discards.',
    intro: [
      'Gift packaging has a different job from standard retail packaging: it is often given in place of a bag, presented rather than shelved, and kept by the recipient afterwards. That changes what matters — the surface under the hand, the way the lid opens, and whether the box looks good enough to store things in long after the product is used.',
      'The same construction principles apply as for any rigid box, but the emphasis shifts towards presentation and reusability over protection.'
    ],
    when: {
      heading: 'When gift packaging is the right choice',
      items: [
        { title: 'The box is part of the gift', text: 'Where a plain box would undercut the value of the product inside it.' },
        { title: 'Seasonal and limited editions', text: 'One-off editions where the packaging itself is the collectable element.' },
        { title: 'Corporate and client gifting', text: 'Boxes branded for a company rather than a product, often produced in smaller quantities.' },
        { title: 'Retained rather than discarded', text: 'Gift boxes are kept and reused; rigid construction and a good surface finish are what make that happen.' }
      ]
    },
    construction: {
      heading: 'Construction options',
      list: [
        '<strong>Rigid lid-and-base</strong> — the classic gift box, in any size from a small jewellery box upwards.',
        '<strong>Magnetic closure</strong> — the structure most often chosen for premium corporate and client gifting.',
        '<strong>Drawer</strong> — sliding tray for a reveal-style presentation.',
        '<strong>Fabric wrap</strong> — fabric over board for a tactile, soft-surface box, common in luxury gifting.',
        '<strong>Lidded hamper</strong> — larger formats for multi-item gifting.',
        '<strong>Ribbon and hardware</strong> — ribbon pulls, metal corners, closures and decorative bands.'
      ]
    },
    finishing: {
      heading: 'Finishing',
      items: [
        { title: 'Fabric wraps', text: 'Cloth, linen-effect and other fabrics laminated over board for a soft, tactile surface.' },
        { title: 'Foil stamping', text: 'Metallic and specialty foil for brand marks and decorative detail.' },
        { title: 'Emboss and deboss', text: 'Tactile branding, effective on uncoated and fabric surfaces.' },
        { title: 'Screen print', text: 'Heavier ink laydown for solid colours on textured or fabric stock.' },
        { title: 'Ribbon', text: 'Satin or grosgrain ribbon as a pull, a band or a decorative closure.' },
        { title: 'Specialty linings', text: 'A contrasting lining inside the box for a reveal effect on opening.' }
      ]
    },
    spec: [
      ['Structures', 'Rigid lid-and-base, magnetic closure, drawer, lidded hamper'],
      ['Sizes', 'Small jewellery formats through to large multi-item hampers'],
      ['Board', 'Greyboard 1.5 mm – 3 mm'],
      ['Wrap materials', 'Coated paper, specialty and textured paper, fabric, printed paper'],
      ['Hardware', 'Ribbon pulls, metal corners, decorative closures'],
      ['Internal fitment', 'Die-cut paperboard, foam or EVA cavity, compartmented tray'],
      ['Finishing', 'Foil, emboss, deboss, spot UV, lamination, screen print'],
      ['Sampling', 'Physical sample for approval before every production run']
    ],
    faq: [
      { q: 'Can you make fabric-wrapped boxes?', a: 'Yes. Fabric is laminated over the board and turned at the edges, which gives a soft tactile surface with no visible paper edge. Different fabrics take foil and emboss differently, so we recommend sampling before committing if the finish is critical.' },
      { q: 'What is the smallest quantity you can produce?', a: 'Gift packaging is often needed in smaller quantities than retail packaging, and standard structures can run in smaller batches because the dies already exist. Tell us your quantity and we will tell you honestly what is viable.' },
      { q: 'Can the box carry a company brand rather than a product brand?', a: 'Yes. Corporate and client gifting boxes are normally branded with the company mark only, and we produce them the same way as product packaging — one structure, one wrap, one finishing specification.' },
      { q: 'Do you supply the ribbon and hardware?', a: 'Yes. Ribbon, metal corners and decorative closures are sourced and assembled as part of the box, so it arrives complete rather than needing components fitted later.' }
    ],

    attributes: [
      ['Material', 'Greyboard 1.5 – 3 mm, fabric or specialty paper wrap'],
      ['Shape', 'Lid and base, magnetic, drawer or lidded hamper'],
      ['Application', 'Gifting, limited editions, corporate gifts'],
      ['Advantage', 'A box the recipient keeps rather than discards'],
      ['Printing', 'Foil, emboss, screen print, fabric and specialty wraps']
    ],

    detail: {
      heading: 'Custom gift packaging, designed to be kept',
      intro: 'Gift packaging is usually handed over in person rather than shelved, and kept by the recipient afterwards. That shifts the emphasis away from shelf presence and transit survival and towards the surface under the hand and the sequence of the opening.',
      ctaLabel: 'Customise this box',
      plateLabel: 'Premium gift packaging',
      blocks: [
        {
          title: 'The surface is judged in the hand, not on a shelf',
          text: 'Fabric laminated over board, heavy textured stock or a soft-touch laminate are chosen for how they feel before they are seen. Fabric turns at the edges and takes foil and emboss differently from paper, so a finish that works on one wrap can fail on another — which is why it is sampled rather than assumed.',
          img: 'gift-packaging-detail.webp',
          imgAlt: 'Fabric-wrapped rigid gift box in charcoal linen with a satin bow, resting under a hand'
        },
        {
          title: 'The opening is a sequence you can design',
          text: 'A magnetic lid that lifts, a drawer that slides, a ribbon that has to be untied: each one sets a pace and controls what is seen first. Deciding the order in which the product and the message are revealed is a structural decision, not a graphic one, and it is settled at the dieline stage.'
        },
        {
          title: 'Smaller quantities are normal here',
          text: 'Gift and corporate packaging is often needed in far smaller runs than retail packaging, and standard structures can run in smaller batches because the tooling already exists. Tell us the quantity and we will say honestly whether it is viable, rather than quoting a minimum you do not actually need.'
        }
      ]
    },

    services: {
      oemIntro: 'We offer complete OEM and ODM services for gift and presentation packaging. ODM means producing one of our existing gift structures with your wrap and finish; OEM means developing the structure and the hardware from your brief.',
      sampling: 'where a fabric or specialty wrap is involved the swatch is approved before the box is wrapped, because fabric takes foil, emboss and screen print differently from paper.',
      assurance: 'Gift packaging is warranted against the approved sample for wrap appearance and finish adhesion, the two faults a fabric or heavily textured stock can develop.'
    },

    capabilities: {
      noun: 'premium gift packaging',
      industries: ['Gifting and presentation', 'Corporate and client gifting', 'Beauty and fragrance', 'Confectionery', 'Jewellery and watches', 'Limited and seasonal editions'],
      shapes: ['Lid and base', 'Magnetic closure', 'Drawer', 'Lidded hamper', 'Book-style', 'Custom structure'],
      inserts: ['Die-cut paperboard', 'Fabric-wrapped tray', 'Foam or EVA cavity', 'Compartmented tray', 'Moulded pulp', 'Ribbon and hardware', 'Printed insert card']
    }
  }
];

/* ------------------------------------------------------------------ *
 * page generation
 * ------------------------------------------------------------------ */

module.exports = PRODUCTS.map((p) => {
  const url = '/products/' + p.slug + '/';
  const breadcrumb = crumb(p.name, url);

  /* detailBlocks() in src/product-blocks.js resolves no URLs of its own — it
     has no idea what page it is being rendered into. So the one photograph a
     product has is resolved here, where the depth is known, and a block with
     no image keeps the typographic plate. */
  const detail = Object.assign({}, p.detail, {
    blocks: p.detail.blocks.map((b) =>
      b.img ? Object.assign({}, b, { img: navHref('/img/' + b.img, url) }) : b
    )
  });

  return {
    url,
    title: p.metaTitle,
    description: p.metaDesc,
    ogImage: p.img,
    priority: '0.8',
    breadcrumbs: breadcrumb,
    faq: p.faq,

    content: `
<section class="page-hero">

<div class="container">

<div class="eyebrow">${p.name.toUpperCase()}</div>

<h1>${p.name}</h1>

<p>${p.lead}</p>

<div class="hero-buttons">
<a href="${navHref('/request-a-quote/', url)}" class="btn btn-primary">Request a quote</a>
<a href="${navHref('/request-sample/', url)}" class="btn btn-outline">Request a sample</a>
</div>

</div>

</section>

<section class="section section-media">

<div class="container">

<figure class="product-figure">
<img src="${navHref('/img/' + p.img, url)}" alt="${p.name} custom packaging by Metapackink" width="600" height="600" loading="eager" decoding="async">
</figure>

<div class="prose">
${p.intro.map((t) => `<p>${t}</p>`).join('\n')}
</div>

</div>

</section>

${attributeStrip(p.attributes)}

${featureGrid({ heading: p.when.heading, items: p.when.items })}

${detailBlocks(detail, navHref('/request-a-quote/', url))}

${proseSection({ heading: p.construction.heading, paras: [], list: p.construction.list, alt: true })}

${featureGrid({ heading: p.finishing.heading, items: p.finishing.items, alt: false })}

${specTable(p.spec, 'Specifications are confirmed on your written quotation. Anything not written into the specification is not part of the order.')}

${serviceBands(p.services, navHref('/request-a-quote/', url))}

${faqBlock(p.faq)}

${capabilityMatrix(p.capabilities, false)}

${rfqForm({ url })}

${relatedSection([
  { title: 'All products', text: 'Compare every structure we manufacture.', href: navHref('/products/', url) },
  { title: 'Request a sample', text: 'See and feel the structure before committing.', href: navHref('/request-sample/', url) },
  { title: 'Packaging solutions', text: 'How a project moves from brief to production.', href: navHref('/packaging-solutions/', url) }
], 'Related')}
`
  };
});
