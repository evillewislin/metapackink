'use strict';

/* Two industry pages that existed as cards on /industries/ but as nothing else.

   On the existing site, /industries/ showed six industry cards. Four of them
   led somewhere; "Gift & Presentation Packaging" and "Retail & Branded Products"
   were links to nothing — the URLs did not exist. These fill that gap, and they
   sit at the same URL depth as the three industry pages that are already there. */

const { navHref } = require('../layout');
const { relatedSection, rfqForm } = require('../partials');

const HOME = { label: 'Home', href: '/' };
const IND = { label: 'Industries', href: '/industries/' };

function cards(items) {
  return `<section class="section section-alt">

<div class="container">

<div class="features-grid">
${items
  .map(
    (it) => `<article class="feature-card">
<h2>${it.title}</h2>
<p>${it.text}</p>
</article>`
  )
  .join('\n')}
</div>

</div>

</section>`;
}

const PAGES = [
  {
    slug: 'gift-presentation',
    eyebrow: 'GIFT & PRESENTATION',
    h1: 'Custom Gift and Presentation Packaging',
    metaTitle: 'Custom Gift & Presentation Packaging | Metapackink',
    metaDesc:
      'Custom gift and presentation packaging for products intended for gifting, retail presentation or a premium unboxing experience, in rigid, magnetic and drawer structures.',
    lead:
      'Custom presentation boxes for products intended for gifting, retail presentation or premium unboxing experiences.',
    intro: [
      'Gift and presentation packaging is bought for a different reason from ordinary retail packaging: the box is part of what is being given. It is handed over in person, opened in front of someone, and usually kept afterwards.',
      'That shifts the priorities towards the surface under the hand, the way the lid opens, and whether the box looks good enough to store things in once the product has been used. Protection still matters, but presentation leads.'
    ],
    cards: [
      { title: 'Corporate and client gifting', text: 'Boxes branded for a company rather than a product, often with a structure that presents several items together.' },
      { title: 'Seasonal and limited editions', text: 'One-off editions where the packaging is itself the collectable element, produced in smaller quantities.' },
      { title: 'Retail gift sets', text: 'Multi-piece gift sets assembled under one box, with compartmented fitments holding each item individually.' },
      { title: 'Premium unboxing', text: 'Products where the opening sequence is designed and photographed, and the box shape is part of it.' },
      { title: 'Luxury fabric presentation', text: 'Fabric-wrapped boxes for a soft tactile surface that paper stock cannot reproduce.' }
    ],
    note: 'Gift packaging often runs in smaller quantities than retail packaging, and standard structures can be produced in smaller batches because the dies already exist.'
  },

  {
    slug: 'retail-branded',
    eyebrow: 'RETAIL & BRANDED',
    h1: 'Custom Retail and Branded Product Packaging',
    metaTitle: 'Custom Retail & Branded Product Packaging | Metapackink',
    metaDesc:
      'Custom retail and branded product packaging designed to carry product identity at the point of sale and survive the retail supply chain, in rigid and folding structures.',
    lead:
      'Custom packaging for brands that need packaging to communicate product identity at the point of sale.',
    intro: [
      'Retail packaging has to do two jobs at once. On the shelf it has to identify the product and the brand in the second or two of attention a shopper actually gives it. Behind the shelf it has to survive palletising, stacking, repeated handling and a distribution centre without arriving dented at the corners.',
      'That combination rules out a lot of design decisions before they start, which is why surface finish, box rigidity and shelf geometry all get specified together rather than one at a time.'
    ],
    cards: [
      { title: 'Shelf presence', text: 'A clean uninterrupted face, correct stacking geometry and a finish that reads from a metre away and from close up.' },
      { title: 'Distribution survival', text: 'Rigid construction and correctly specified board so boxes still look right after palletising and handling.' },
      { title: 'Brand consistency', text: 'One structure and finish specification applied across a product family so the range reads as one brand.' },
      { title: 'Retailer requirements', text: 'Boxes that meet the shelf, stacking and labelling conventions your retail channel expects.' },
      { title: 'Security and tamper evidence', text: 'Structures and closures where the packaging has to show whether it has been opened.' }
    ],
    note: 'Where a product ships both to retail and direct to consumers, the same structure is often specified for both — but the insert has to be designed for the harsher of the two journeys.'
  }
];

module.exports = PAGES.map((p) => {
  const url = '/industries/' + p.slug + '/';

  return {
    url,
    title: p.metaTitle,
    description: p.metaDesc,
    ogImage: 'rigid-boxes-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, IND, { label: p.h1.replace('Custom ', ''), href: url }],

    content: `
<section class="page-hero">

<div class="container">

<div class="eyebrow">${p.eyebrow}</div>

<h1>${p.h1}</h1>

<p>${p.lead}</p>

<div class="hero-buttons">
<a href="${navHref('/request-a-quote/', url)}" class="btn btn-primary">Request a quote</a>
<a href="${navHref('/industries/', url)}" class="btn btn-outline">All industries</a>
</div>

</div>

</section>

<section class="section">

<div class="container narrow prose">

${p.intro.map((t) => `<p>${t}</p>`).join('\n')}

</div>

</section>

${cards(p.cards)}

<section class="section">

<div class="container narrow prose">

<p class="table-note">${p.note}</p>

</div>

</section>

${rfqForm({ url })}

${relatedSection([
  { title: 'All industries', text: 'Every sector we manufacture packaging for.', href: navHref('/industries/', url) },
  { title: 'Products', text: 'The structures this packaging is built from.', href: navHref('/products/', url) },
  { title: 'Case studies', text: 'How packaging projects come together.', href: navHref('/case-studies/', url) }
], 'Related')}
`
  };
});
