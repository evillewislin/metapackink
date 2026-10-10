'use strict';

/* Section builders and shared copy for the product detail pages.
 *
 * Companion to src/industry-blocks.js. The four blocks both page families use
 * — specTable, proseSection, featureGrid, faqBlock — live there. What lives
 * here is the set of modules only a product page carries: the attribute strip
 * under the hero, the alternating detail blocks with their inline enquiry
 * call to action, the OEM/ODM, shipping and after-sales bands, and the
 * capability matrix that closes the page.
 *
 * Why the service copy is not per product
 * ---------------------------------------
 * The OEM list, the export terms and the lead times describe the factory, not
 * the box. The reference layout this page follows repeats them on every
 * product page, and so does this one — but writing them out seven times would
 * mean seven places to change when a lead time moves and seven chances for
 * one page to end up quoting a different number. They are assembled here from
 * src/config.js, and each product contributes only the three lines that are
 * genuinely its own:
 *
 *   oemIntro   what OEM/ODM means for this structure specifically
 *   sampling   what is actually checked on a sample of this structure
 *   assurance  what the warranty covers on this structure
 *
 * Nothing in this file imports src/layout.js, so every href it renders is
 * resolved by the caller and passed in. That keeps the builders free of
 * routing concerns and testable on their own.
 */

const { trade } = require('./config');

/* ---------------------------------------------------------------- *
 * shared copy
 * ---------------------------------------------------------------- */

const OEM_ITEMS = [
  'Structural and functional design, from a sketch, a reference pack or your existing sample',
  'Material, colour and size customisation against your written specification',
  'Custom logo, print finishing and branded components such as insert cards and leaflets',
  'Sample development and mass production held against one specification',
  'Full-process quality control and pre-shipment inspection before the goods leave us'
];

const SHIPPING_ITEMS = [
  `Export terms: ${trade.terms} — the term in force is stated in every quotation`,
  `Shipping by sea, air or express courier (${trade.couriers})`,
  `Sample lead time: ${trade.sampleLead} from approved artwork`,
  `Production lead time: ${trade.productionLead} from the later of the cleared deposit or your written sample approval`,
  `Courier transit: ${trade.courierLead} after dispatch`,
  'Worldwide delivery, export-packed for the mode of transport in the quotation'
];

const AFTER_SALES_ITEMS = [
  'Quality problem return and exchange, measured against the approved sample',
  'Order follow-up and progress notification through production and shipment',
  'Priority after-sales service on bulk and repeat orders'
];

/* The three capability groups that are the same whichever structure a buyer
   arrived on, because they describe the factory rather than the box. The
   other three — industry, box shape, inner tray — come from the product,
   because those are the ones that actually differ between product pages. */
const CAPABILITY_BASE = {
  craftsmanship: {
    heading: 'Product craftsmanship',
    items: [
      'Foil stamping', 'Emboss and deboss', 'Spot UV', 'Matte and gloss lamination',
      'Soft-touch lamination', 'Screen print', 'Ribbon and hardware', 'Die-cut fitments'
    ]
  },
  materials: {
    heading: 'Paper materials',
    items: [
      'Greyboard 1.5 – 3 mm', 'Mount board', 'Coated paper',
      'Specialty and textured paper', 'Metallic and pearlescent paper',
      'Fabric and woven paper', 'Printed paper'
    ]
  },
  process: {
    heading: 'Production process',
    items: [
      'Brief and specification review', 'Structural design and dieline',
      'Physical sample and written approval', 'Board cutting and wrapping',
      'Printing and finishing', 'Insert and fitment assembly',
      'Pre-shipment inspection', 'Export packing and shipment'
    ]
  }
};

/* ---------------------------------------------------------------- *
 * internal helpers
 * ---------------------------------------------------------------- */

function band(alt) {
  return '<section class="section' + (alt ? ' section-alt' : '') + '">';
}

function chorus(items) {
  return `<ul class="check-list">
${items.map((li) => `<li>${li}</li>`).join('\n')}
</ul>`;
}

/** A band that is a heading, a list and an optional button. */
function listBand(s) {
  return `${band(s.alt)}

<div class="container narrow prose">

<h2>${s.heading}</h2>

${s.intro ? `<p class="section-intro">${s.intro}</p>` : ''}

${chorus(s.items)}

${s.cta ? `<p class="band-cta"><a class="btn btn-primary" href="${s.cta.href}">${s.cta.label}</a></p>` : ''}

</div>

</section>`;
}

/* ---------------------------------------------------------------- *
 * the modules
 * ---------------------------------------------------------------- */

/**
 * Attribute strip: the five values a buyer scans before reading anything.
 *
 * A <dl> rather than a table, because this is a list of name/value pairs and
 * not tabular data — a screen reader announcing "table, five rows" for what is
 * a summary would be wrong. Each pair is wrapped in a <div> so the grid has
 * something to place; that is valid inside <dl> and is the standard way to
 * style one.
 *
 * @param {Array<[string,string]>} rows label/value pairs
 */
function attributeStrip(rows) {
  return `<section class="product-attributes">

<div class="container">

<dl class="attr-grid">
${rows
  .map(
    ([label, value]) => `<div class="attr-cell">
<dt>${label}</dt>
<dd>${value}</dd>
</div>`
  )
  .join('\n')}
</dl>

</div>

</section>`;
}

/**
 * Alternating detail blocks: the long-form description, with the enquiry
 * button repeated inside each block rather than only at the foot of the page.
 *
 * Each block alternates side by side with a media cell, exactly as the
 * reference layout does. There is one photograph per product, so the media
 * cell falls back to a typographic plate carrying the step number — the same
 * approach cardMedia() in src/articles/index.js takes when an article has no
 * illustration. Set `block.img` to an already-resolved URL to replace the
 * plate with a photograph; the builder will not resolve it itself.
 *
 * @param {{heading:string, intro:string, ctaLabel:string, plateLabel:string,
 *          blocks:Array<{title:string, text:string, img?:string, imgAlt?:string}>}} s
 * @param {string} quoteHref resolved href of the quote page, relative to this page
 */
function detailBlocks(s, quoteHref) {
  const rows = s.blocks
    .map((b, i) => {
      const ord = String(i + 1).padStart(2, '0');
      const media = b.img
        ? `<img src="${b.img}" alt="${b.imgAlt || ''}" width="1600" height="900" loading="lazy" decoding="async">`
        : `<span class="detail-ord" aria-hidden="true">${ord}</span>
<span class="detail-ord-label">${s.plateLabel}</span>`;

      return `<div class="detail-block${i % 2 ? ' detail-block-flip' : ''}">

<div class="detail-media${b.img ? ' detail-media-photo' : ''}">
${media}
</div>

<div class="detail-body">
<h3>${b.title}</h3>
<p>${b.text}</p>
<a class="btn btn-outline btn-small" href="${quoteHref}">${s.ctaLabel}</a>
</div>

</div>`;
    })
    .join('\n\n');

  return `<section class="section product-detail-blocks">

<div class="container">

<h2>${s.heading}</h2>

<p class="section-intro">${s.intro}</p>

${rows}

</div>

</section>`;
}

/**
 * The three service bands, in the order the reference layout uses them.
 *
 * @param {{oemIntro:string, sampling:string, assurance:string}} s per-product hooks
 * @param {string} quoteHref resolved href of the quote page
 */
function serviceBands(s, quoteHref) {
  return `${listBand({
    heading: 'OEM &amp; ODM services',
    intro: s.oemIntro,
    items: OEM_ITEMS,
    alt: false,
    cta: { label: 'Customise my packaging', href: quoteHref }
  })}

${listBand({
    heading: 'Shipping &amp; delivery',
    intro: 'The terms, the lead times and how the goods travel.',
    items: SHIPPING_ITEMS.concat([`On this structure: ${s.sampling}`]),
    alt: true,
    cta: { label: 'Send my request', href: quoteHref }
  })}

${listBand({
    heading: 'After-sales &amp; support',
    intro: 'What we are responsible for once the boxes have arrived.',
    items: AFTER_SALES_ITEMS.concat([s.assurance]),
    alt: false
  })}`;
}

/**
 * Capability matrix: what the same factory and tooling can otherwise be asked
 * for. This is the last band on the page, where the reference layout puts it —
 * after the FAQs, once the reader has decided the structure is plausible and
 * is now wondering how far it can be pushed.
 *
 * @param {{industries:string[], shapes:string[], inserts:string[], noun:string}} caps
 * @param {boolean} alt band background, decided by the caller's alternation
 */
function capabilityMatrix(caps, alt) {
  const groups = [
    CAPABILITY_BASE.craftsmanship,
    CAPABILITY_BASE.materials,
    { heading: 'Industry scenarios', items: caps.industries },
    { heading: 'Box shape options', items: caps.shapes },
    { heading: 'Inner tray materials', items: caps.inserts },
    CAPABILITY_BASE.process
  ];

  return `<section class="section capability-matrix${alt ? ' section-alt' : ''}">

<div class="container">

<h2>Everything this structure can be built from</h2>

<p class="section-intro">The same factory, tooling and finishing line make every structure on this page. These are the options that can be combined for ${caps.noun}.</p>

<div class="capability-grid">
${groups
  .map(
    (g) => `<div class="capability-group">
<h3>${g.heading}</h3>
<ul class="chip-list">
${g.items.map((i) => `<li>${i}</li>`).join('\n')}
</ul>
</div>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

module.exports = {
  attributeStrip, detailBlocks, serviceBands, capabilityMatrix
};
