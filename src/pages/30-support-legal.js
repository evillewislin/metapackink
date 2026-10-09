'use strict';

/* Support and legal pages.

   /faq/             — the questions buyers actually ask before ordering
   /privacy-policy/  — required by GDPR/UK GDPR and by every form's consent box
   /terms/           — the terms on which we quote, sample and supply
   /cookie-policy/   — what the site stores, including the single GA4 property
   /sitemap/         — HTML sitemap, generated from the real page list

   BEFORE PUBLISHING: have the three legal documents reviewed by a lawyer for
   the jurisdictions you sell into. They describe what this website and this
   business actually do — the forms, the file uploads, Google Analytics 4, and
   export sales from China — which makes them a good draft, not legal advice. */

const { navHref } = require('../layout');
const { relatedSection, darkCta } = require('../partials');
const { site } = require('../config');

const HOME = { label: 'Home', href: '/' };
const UPDATED = '9 October 2026';

/* Render a grouped FAQ block that also feeds FAQPage JSON-LD. */
function faqSection(groups) {
  return groups
    .map(
      (g) => `<section class="section${g.alt ? ' section-alt' : ''}"${g.id ? ` id="${g.id}"` : ''}>

<div class="container">

<h2>${g.heading}</h2>

<div class="faq-list">
${g.items
  .map(
    (f) => `<details class="faq-item">
<summary>${f.q}</summary>
<div class="faq-answer"><p>${f.a}</p></div>
</details>`
  )
  .join('\n')}
</div>

</div>

</section>`
    )
    .join('\n\n');
}

function flatten(groups) {
  return groups.reduce((acc, g) => acc.concat(g.items), []);
}

/* Table of contents for a long legal document. */
function toc(items) {
  return `<section class="section section-toc">

<div class="container narrow">

<nav class="toc" aria-label="On this page">
<h2 class="toc-title">On this page</h2>
<ol class="toc-list">
${items.map((it) => `<li><a href="#${it.id}">${it.label}</a></li>`).join('\n')}
</ol>
</nav>

</div>

</section>`;
}

/* Long-form legal body: each block is a heading + paragraphs + optional list. */
function legalBlock(b) {
  return `<section class="section${b.alt ? ' section-alt' : ''}"${b.id ? ` id="${b.id}"` : ''}>

<div class="container narrow prose">

<h2>${b.heading}</h2>

${(b.paras || []).map((p) => `<p>${p}</p>`).join('\n')}

${b.list ? `<ul class="check-list">${b.list.map((li) => `<li>${li}</li>`).join('\n')}</ul>` : ''}

${b.note ? `<p class="table-note">${b.note}</p>` : ''}

</div>

</section>`;
}

function legalFooterContact() {
  return legalBlock({
    id: 'contact',
    alt: true,
    heading: 'Questions about this document',
    paras: [
      `If you have a question about this policy, want a copy of the personal data we hold about you, or want us to correct or delete it, contact us at <a href="${site.contact.emailHref}">${site.contact.email}</a> or write to ${site.legalName}, ${site.contact.addressLine1}, ${site.contact.addressLine2}.`,
      'We aim to respond to any privacy or data request within 30 days. If you are in the EEA or the UK and you are not satisfied with our response, you have the right to complain to your national data protection authority.',
      `<strong>Last updated:</strong> ${UPDATED}. We will update this page when our practices change and will revise the date above.`
    ]
  });
}

/* Drafting note for whoever deploys the site — an HTML comment, never rendered. */
const REVIEW_NOTE =
  '<!-- DRAFT FOR LEGAL REVIEW. Describes the actual data flows of this website: ' +
  'enquiry forms, optional file uploads, Google Analytics 4. Have a qualified lawyer ' +
  'confirm it against the jurisdictions you sell into before publishing. -->';

const FAQ_GROUPS = [
  {
    id: 'ordering',
    heading: 'Ordering and minimums',
    items: [
      {
        q: 'What is your minimum order quantity?',
        a: 'It depends on the structure rather than a single company-wide figure, and we state it on every written quotation. Rigid and magnetic boxes typically start in the low hundreds of pieces. Below that, per-unit cost rises sharply because dies, plates and machine setup are spread across fewer boxes — where a smaller trial run is possible we will say so, and where it is not economical we will say that instead of quoting it anyway.'
      },
      {
        q: 'Can I order a small trial run before committing?',
        a: 'Often yes, on standard structures. It is frequently the sensible way to validate packaging before a full production quantity, and it is cheaper than discovering a fit or finishing problem at scale. Tell us your target trial quantity and we will tell you honestly whether it is viable and what it costs per unit.'
      },
      {
        q: 'Do you work directly with brands or only through agents?',
        a: 'Directly. You deal with the people who specify and make your packaging, which is why questions about tolerances, materials and schedules get answered rather than relayed. We are equally happy to supply through an agent if that is how you buy.'
      },
      {
        q: 'How long does production take?',
        a: 'Lead time runs from the later of the deposit clearing or your written approval of the sample. Typical production is 12 to 20 working days depending on structure, finishing and quantity, plus transit. Every quotation states its own lead time; we will tell you early if one is at risk.'
      }
    ]
  },
  {
    id: 'sampling',
    alt: true,
    heading: 'Samples and specifications',
    items: [
      {
        q: 'Do I get a sample before production?',
        a: 'Yes, unless you instruct us in writing to proceed without one. A physical sample is produced for your written approval and becomes the reference the production line is measured against. Nothing goes into mass production until you have approved it.'
      },
      {
        q: 'What information do you need to start?',
        a: 'Product type, product dimensions and weight, estimated quantity, and your target market. Any packaging reference you like helps, and artwork is welcome but not required at the first contact — structure can be quoted before artwork exists.'
      },
      {
        q: 'Can you design the packaging structure for me?',
        a: 'Yes. Structural development from your product dimensions is a normal part of the service: we determine the box construction, internal clearance, opening method, board thickness and inserts, and produce the dieline.'
      },
      {
        q: 'What are your dimensional tolerances?',
        a: 'Unless the specification states otherwise, plus or minus 1.5 mm on box dimensions at typical rigid box sizes, and plus or minus 1 mm on internal fitments. Board thickness and weight carry the industry-standard tolerances for greyboard, paper and mount board.'
      }
    ]
  },
  {
    id: 'materials',
    heading: 'Materials and finishing',
    items: [
      {
        q: 'Which materials can you work in?',
        a: 'Greyboard for rigid structures, coated and specialty papers, textured papers, fabric and other wraps, and protective materials including custom-fit foam and EVA. Finishing includes foil stamping, embossing, debossing, spot UV, lamination and screen print.'
      },
      {
        q: 'Will the colour match my brand exactly?',
        a: 'We assess print colour against the approved sample under standard lighting, and a Delta E of up to 3 is treated as a match on solid and brand colours. Metallic, fluorescent and Pantone-matching finishes carry wider natural variation. A digital proof is never a colour contract — the approved physical sample is.'
      },
      {
        q: 'Why does colour vary between batches?',
        a: 'Because printing on paper, board and fabric is a physical process. Ink laydown, substrate absorbency, lamination and the material batch itself all move the result slightly. Natural materials such as fabric and recycled board vary in tone and grain as a property of the material. For continuous reorders we keep your approved sample on file so each run is measured against the same reference.'
      },
      {
        q: 'Can you make the packaging recyclable or plastic-free?',
        a: 'Often yes. Mono-material construction, paper-based inserts instead of foam or EVA, and water-based coatings instead of plastic lamination are all options. Tell us which markets you sell into and what your customers expect, and we will tell you what is achievable without compromising the structure.'
      }
    ]
  },
  {
    id: 'pricing',
    alt: true,
    heading: 'Pricing and payment',
    items: [
      {
        q: 'How is packaging priced?',
        a: 'Structure and dimensions set the board area, quantity sets whether setup costs are spread thinly or widely, and materials, finishing and inserts add the rest. Because dies, plates and machine setup are fixed costs, the unit price falls steeply as quantity rises — which is why a small run can look expensive per box while the same box at scale does not.'
      },
      {
        q: 'What are your payment terms?',
        a: 'Unless the quotation states otherwise, a deposit with the balance payable before shipment. The deposit is stated in the quotation. Production starts once the deposit has cleared and the specification and sample are approved in writing.'
      },
      {
        q: 'Are duties and taxes included?',
        a: 'No. Prices exclude duties and taxes in the destination country unless the quotation says otherwise. Delivery terms follow the Incoterm in the quotation — commonly EXW, FOB, CIF or DDP.'
      },
      {
        q: 'Do you offer credit terms?',
        a: 'For established repeat customers, sometimes. For first orders we normally ask for a deposit, and we may ask for a letter of credit on large orders. We will always tell you the terms in writing before you commit.'
      }
    ]
  },
  {
    id: 'shipping',
    heading: 'Shipping and logistics',
    items: [
      {
        q: 'How do you ship internationally?',
        a: 'By air, sea or express courier depending on quantity, value and how quickly you need it. We work with your nominated forwarder or can arrange freight ourselves. The shipping guide in each quotation sets out which Incoterm applies.'
      },
      {
        q: 'Do you handle customs documentation?',
        a: 'We provide the commercial invoice, packing list, certificate of origin and any declaration reasonably needed for clearance. You are responsible for confirming the goods may lawfully be imported into your market and for holding any licence your market requires.'
      },
      {
        q: 'Can quantities vary from what I ordered?',
        a: 'On printed and hand-assembled work, quantities may vary by plus or minus 5%, and you are invoiced for the quantity actually shipped at the quoted unit price. We will tell you before shipment if a variation is likely.'
      }
    ]
  },
  {
    id: 'working-together',
    alt: true,
    heading: 'Working with us',
    items: [
      {
        q: 'Can I visit the factory or send an inspector?',
        a: 'Yes, by appointment. Our facility is in Panyu District, Guangzhou. We support third-party inspections and audits — tell us who is coming and when, and we will arrange access and the documentation they need.'
      },
      {
        q: 'Who owns my artwork and dielines?',
        a: 'Your artwork, logos and brand assets remain yours. Structural designs and dielines we develop remain ours unless the quotation assigns them to you, but where a structure was developed specifically for you and paid for by you, we will not offer that exact structure to another customer without your written consent.'
      },
      {
        q: 'Will you use my brand in your marketing?',
        a: 'Not without your written permission. We do not use customer names, logos, artwork or the fact that we manufacture for you in case studies, on this website, or in any promotional material unless you have explicitly agreed.'
      },
      {
        q: 'What languages does your team work in?',
        a: 'Our export team works in English, and we support French, German and Arabic enquiries. Technical drawings, dielines and specifications are always issued in English so there is a single authoritative version of the spec.'
      }
    ]
  }
];

module.exports = [

  /* ================================================================== *
   * /faq/
   * ================================================================== */
  (() => {
    const page = {
      url: '/faq/',
      title: 'Frequently Asked Questions | Custom Packaging | Metapackink',
      description:
        'Answers to the questions packaging buyers ask most: minimum order quantities, sampling, materials, colour matching, pricing, payment terms, shipping and lead times.',
      ogImage: 'hero-box.webp',
      priority: '0.8',
      breadcrumbs: [HOME, { label: 'FAQ', href: '/faq/' }],
      faq: flatten(FAQ_GROUPS)
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">FREQUENTLY ASKED QUESTIONS</div>

<h1>The questions buyers ask before ordering.</h1>

<p>Minimums, sampling, colour, pricing, payment, shipping and lead times — answered directly, including where the honest answer is "it depends".</p>

</div>

</section>

${toc(FAQ_GROUPS.map((g) => ({ id: g.id, label: g.heading })))}

${faqSection(FAQ_GROUPS)}

${relatedSection([
  { title: 'Request a quote', text: 'Send your specifications for indicative pricing.', href: navHref('/request-a-quote/', page.url) },
  { title: 'Request a sample', text: 'See and feel the material before committing.', href: navHref('/request-sample/', page.url) },
  { title: 'Manufacturing process', text: 'How a project moves from brief to shipment.', href: navHref('/manufacturing-process/', page.url) }
], 'Still have a question?')}
`;
    return page;
  })(),

  /* ================================================================== *
   * /privacy-policy/
   * ================================================================== */
  (() => {
    const blocks = [
      {
        id: 'who-we-are',
        heading: 'Who we are',
        paras: [
          `This website is operated by ${site.legalName}, a packaging manufacturer registered in Guangzhou, Guangdong, China, at ${site.contact.addressLine1}, ${site.contact.addressLine2}.`,
          'We are the controller of the personal data described in this policy. That means we decide why and how it is used, and we are the party you should contact if you want to exercise any of the rights set out below.',
          'This policy covers this website and the enquiry, quotation, sampling and order processes that follow from it. It does not cover any third-party website we link to.'
        ]
      },
      {
        id: 'what-we-collect',
        alt: true,
        heading: 'What we collect',
        paras: ['We only collect what we need to answer your enquiry and, if it goes ahead, to manufacture and ship your order. In practice that means:'],
        list: [
          '<strong>Contact and company details</strong> you type into a form: your name, company name, business email address, country or region, and where relevant a phone or WhatsApp number.',
          '<strong>Project details</strong> you choose to give us: packaging structure, estimated quantity, product or box dimensions, required timeline, destination market, and any notes you write.',
          '<strong>Files you upload</strong> with an enquiry: artwork, dielines, reference images, specifications or a ZIP of any of these.',
          '<strong>Correspondence</strong> — the emails, messages and drawings exchanged while quoting, sampling and producing your order.',
          '<strong>Technical data</strong> collected automatically when you browse: IP address, browser type and version, device type, referring page, pages viewed and time on page, collected via Google Analytics 4.',
          '<strong>Order and shipping data</strong> if you become a customer: billing details, delivery addresses, consignee contacts and customs documentation information.'
        ]
      },
      {
        id: 'why',
        heading: 'Why we use it',
        paras: ['We use personal data for the following purposes, and for no others:'],
        list: [
          'To read and answer your enquiry, and to prepare a quotation or recommendation.',
          'To develop a structure, produce a sample and discuss specifications with you.',
          'To manufacture, inspect, pack and ship goods you have ordered.',
          'To arrange freight, customs clearance and delivery with your nominated forwarder or ours.',
          'To keep accounting, tax and export records that we are legally required to keep.',
          'To improve this website: which pages are read, which are abandoned, and what visitors search for.',
          'To send you occasional packaging-related updates — <strong>only if you have asked us to</strong>, and always with a working unsubscribe link.'
        ]
      },
      {
        id: 'legal-basis',
        alt: true,
        heading: 'Our legal basis for processing',
        paras: ['Where the GDPR or UK GDPR applies to you, we rely on the following legal bases:'],
        list: [
          '<strong>Contract</strong> — processing needed to quote for, produce and deliver goods you have asked us to supply, and to handle the shipping and customs steps that follow.',
          '<strong>Legitimate interests</strong> — answering business enquiries you have sent us, protecting our systems from abuse, and understanding at an aggregate level how the website is used. We balance these against your rights and expect that contacting a supplier about a project is something you would reasonably expect a reply to.',
          '<strong>Consent</strong> — optional things you actively opt into, such as marketing emails. You can withdraw consent at any time and it will not affect anything else.',
          '<strong>Legal obligation</strong> — retaining invoices, customs declarations and export records for the periods Chinese tax and customs law requires.'
        ]
      },
      {
        id: 'files',
        heading: 'Artwork and file uploads',
        paras: [
          "Files you send us — artwork, dielines, photographs of a competitor's box, technical drawings — are used for one purpose: preparing your quotation and, if you order, making your packaging. They are not used for anything else.",
          'We do not sell, publish, display or reuse your artwork or your dielines on this website, in our marketing, or for any other customer.',
          'Unless we agree otherwise in writing, your artwork and structures remain your property. We treat them as confidential and share them internally only with the people who need to see them to quote or produce the job.',
          'If you would like us to delete files you sent with an enquiry that did not proceed, ask us and we will remove them rather than wait for the retention period to expire.'
        ]
      },
      {
        id: 'sharing',
        alt: true,
        heading: 'Who we share it with',
        paras: ['We do not sell personal data. We do not rent it, trade it or pass it to advertising networks. We share it only where it is necessary, and only with:'],
        list: [
          '<strong>Freight forwarders and couriers</strong> — the minimum needed to move your goods, normally the consignee name, address, contact and the customs description of the shipment.',
          '<strong>Our analytics and hosting providers</strong> — Google Analytics 4 and Cloudflare, which hosts this website, processing technical usage data on our behalf.',
          '<strong>Payment and banking intermediaries</strong> — where a transfer or letter of credit is involved, the details needed to settle the transaction.',
          '<strong>Professional advisers and auditors</strong> — accountants, customs brokers and auditors, where they are working on our records for a customer.',
          '<strong>Authorities</strong> — where Chinese law, customs or tax rules require disclosure, or where we are compelled by a valid legal order.'
        ]
      },
      {
        id: 'transfers',
        heading: 'International transfers',
        paras: [
          'We are based in China. If you are in the EEA, the UK, Switzerland or another jurisdiction with transfer restrictions, sending your enquiry to us means your data is transferred to and processed in China.',
          "We take that seriously. For customer and project data we put in place the safeguards available to us — normally the European Commission's Standard Contractual Clauses, or an equivalent mechanism, backed by a written assessment of the transfer. We will provide a copy of the safeguard we rely on if you ask.",
          'By submitting an enquiry you understand that your data will be handled in China under this policy. If you are not comfortable with that, contact us and we will discuss what we can do.'
        ]
      },
      {
        id: 'retention',
        alt: true,
        heading: 'How long we keep it',
        paras: ['We keep personal data only as long as there is a reason to:'],
        list: [
          '<strong>Enquiries that do not become orders</strong> — up to 24 months, so that if you come back about the same project we still know what was discussed. Files you sent can be deleted sooner on request.',
          '<strong>Quotations and specifications</strong> — up to 3 years, which is the realistic span over which a brand re-orders the same packaging.',
          '<strong>Customer order, shipping and accounting records</strong> — 10 years, to satisfy Chinese tax, customs and export record-keeping requirements.',
          '<strong>Website analytics</strong> — 14 months, after which the underlying event data expires in Google Analytics 4.',
          '<strong>Marketing consent records</strong> — until you unsubscribe, plus a short period afterwards so we can evidence that you did.'
        ]
      },
      {
        id: 'rights',
        heading: 'Your rights',
        paras: ['Depending on where you live, you may have some or all of the following rights. We honour them for everyone who asks, not only where we are legally obliged to.'],
        list: [
          '<strong>Access</strong> — ask for a copy of the personal data we hold about you.',
          '<strong>Correction</strong> — ask us to fix anything inaccurate or incomplete.',
          '<strong>Deletion</strong> — ask us to erase data, subject to record-keeping duties we cannot override.',
          '<strong>Restriction and objection</strong> — ask us to stop or limit certain processing, including any based on legitimate interests.',
          '<strong>Portability</strong> — receive data you gave us in a structured, machine-readable format.',
          '<strong>Withdraw consent</strong> — at any time, for anything you opted into. This does not affect processing already carried out.',
          '<strong>No automated decisions</strong> — we do not make decisions with legal effect about you through automated processing or profiling.',
          '<strong>CCPA/CPRA rights</strong> — if you are a California resident, we do not sell or share personal information as those terms are defined by the CCPA, and we will not discriminate against you for exercising any right.'
        ]
      },
      {
        id: 'security',
        alt: true,
        heading: 'How we protect it',
        paras: [
          'We serve this website over HTTPS, restrict internal access to enquiry and order data to the staff who need it to do their job, and keep project files on controlled storage rather than on personal devices.',
          'No system is perfect. If a breach ever affects your personal data in a way that risks your rights, we will notify you and the relevant authority without undue delay, as the law requires.'
        ]
      },
      {
        id: 'cookies',
        heading: 'Cookies and analytics',
        paras: [
          'This website sets no advertising or tracking cookies and runs no third-party advertising pixels. We use a single Google Analytics 4 property to understand which pages are useful. The full breakdown, including how to opt out, is in our <a href="/cookie-policy/">Cookie Policy</a>.'
        ]
      },
      {
        id: 'children',
        alt: true,
        heading: 'Children',
        paras: ['This is a business-to-business website. Our products and services are not directed at children, and we do not knowingly collect personal data from anyone under 16. If you believe a child has sent us personal data, tell us and we will delete it.']
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        paras: [
          'If we change how we handle personal data we will update this page and revise the date at the top. If the change is significant — for example a new category of data or a new purpose — we will make that clear on the page rather than quietly amending the text.',
          'Continuing to use the site after an update means you accept the revised policy. If you do not, stop using the site and tell us to delete your data.'
        ]
      }
    ];

    const page = {
      url: '/privacy-policy/',
      title: 'Privacy Policy | Metapackink',
      description:
        'How Metapackink collects, uses, stores and protects personal data submitted through our enquiry forms, sample requests and website analytics.',
      ogImage: 'hero-box.webp',
      priority: '0.3',
      breadcrumbs: [HOME, { label: 'Privacy Policy', href: '/privacy-policy/' }]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">LEGAL</div>

<h1>Privacy Policy</h1>

<p>How ${site.legalName} collects, uses and protects personal information. Last updated ${UPDATED}.</p>

</div>

</section>

${toc(blocks.map((b) => ({ id: b.id, label: b.heading })).concat([{ id: 'contact', label: 'Questions about this document' }]))}

${blocks.map(legalBlock).join('\n\n')}

${legalFooterContact()}

${relatedSection([
  { title: 'Cookie Policy', text: 'Which cookies this site sets and how to opt out.', href: navHref('/cookie-policy/', page.url) },
  { title: 'Terms & Conditions', text: 'The terms on which we quote, sample and supply.', href: navHref('/terms/', page.url) },
  { title: 'Contact us', text: 'Reach us about anything on this page.', href: navHref('/contact/', page.url) }
], 'Related')}

${REVIEW_NOTE}
`;
    return page;
  })(),

  /* ================================================================== *
   * /terms/
   * ================================================================== */
  (() => {
    const blocks = [
      {
        id: 'scope',
        heading: 'Scope and formation of contract',
        paras: [
          `These terms apply to quotations, samples and supply of custom packaging by ${site.legalName} ("we", "us") to a business customer ("you"). They apply to the exclusion of any terms you may seek to impose, unless we agree otherwise in a document signed by both parties.`,
          'A contract is formed when you accept a written quotation from us and pay any deposit it requires, or when we confirm your purchase order in writing — whichever happens first. Nothing on this website is an offer capable of acceptance; prices and specifications shown here are indicative until confirmed in a written quotation.',
          'If there is a conflict between these terms and a signed supply agreement between us, the signed agreement prevails.'
        ]
      },
      {
        id: 'quotes',
        alt: true,
        heading: 'Quotations and prices',
        paras: [
          'Quotations are valid for 30 days unless stated otherwise, and are based on the specification, quantity and delivery terms set out in them.',
          'Prices are quoted in the currency shown. They are exclusive of taxes, duties and any customs charges in the destination country unless the quotation says otherwise.',
          'A quotation may be revised if: the specification changes; the quantity falls below the quoted band; the delivery term changes (for example EXW becomes DDP); or the cost of board, paper, magnets, fabric or freight moves materially before the order is confirmed. We will tell you why before revising, not after.'
        ]
      },
      {
        id: 'specs',
        heading: 'Specifications and approvals',
        paras: [
          'The written specification — structure, dimensions, board thickness, material, finishing, print colours and insert — is the authoritative description of what we will make. Anything not written into the specification is not part of the order.',
          'You are responsible for checking that the specification is correct and complete before approving it, including that your product fits the internal dimensions, that the artwork is the version you intend, and that any statutory or regulatory marking your market requires is present.',
          'Once you approve a specification and a physical sample, they become the reference against which production is measured.'
        ]
      },
      {
        id: 'samples',
        alt: true,
        heading: 'Sampling and tooling',
        paras: [
          'We produce a physical sample for your written approval before a production run, unless you instruct us in writing to proceed without one. If you instruct us to proceed without a sample, you accept the risk of any difference between what you expected and what is produced.',
          'Sample costs and lead times are confirmed in writing before the sample is made. Sample charges are normally credited against the production order above a minimum quantity, where the quotation says so.',
          'Custom dies, cutting formes and any tooling made specifically for your structure remain our property unless the order states otherwise, but we will not use them for another customer without your written consent.'
        ]
      },
      {
        id: 'tolerances',
        heading: 'Tolerances and colour',
        paras: ['Custom packaging is manufactured, not printed by a desktop printer, and it is judged against trade tolerances rather than perfection. Unless the specification states otherwise:'],
        list: [
          '<strong>Dimensions</strong> — plus or minus 1.5 mm on box dimensions at typical rigid box sizes, and plus or minus 1 mm on internal fitments.',
          '<strong>Board thickness and weight</strong> — industry-standard tolerances for greyboard, paper and mount board apply.',
          '<strong>Print colour</strong> — assessed against the approved sample under standard lighting. A Delta E of up to 3 is treated as a match on solid and brand colours. Metallic, fluorescent and Pantone-matching finishes carry wider natural variation.',
          '<strong>Lamination, foil and emboss registration</strong> — up to 0.5 mm variation on registered finishing.',
          '<strong>Natural materials</strong> — fabric, textured paper and recycled boards vary in tone and grain between batches. This is a property of the material, not a defect.'
        ],
        note: 'Colour appearance also changes with lighting, screen calibration and the substrate it is printed on. A digital proof is never a colour contract; the approved physical sample is.'
      },
      {
        id: 'moq',
        alt: true,
        heading: 'Minimum order quantities',
        paras: [
          'Minimum order quantities depend on structure and material rather than a single company-wide figure. They are stated on the relevant written quotation.',
          'Below the stated minimum, per-unit setup cost rises sharply because dies, plates and machine setup are spread across fewer pieces. Where we can produce a smaller trial run we will say so, and we will say plainly when a quantity is not economical rather than quoting it as though it were.'
        ]
      },
      {
        id: 'payment',
        heading: 'Payment terms',
        paras: [
          'Unless the quotation states otherwise, our standard terms are a deposit with the balance payable before shipment. The deposit is stated in the quotation as a percentage or a fixed amount.',
          'Accepted methods include bank transfer (T/T) and, where agreed, other instruments confirmed in writing. Bank charges are the responsibility of the party incurring them; we are not responsible for deductions made by intermediary banks.',
          'Production does not start until the deposit has cleared and the specification and sample are approved in writing. If payment is late, we may suspend production or withhold shipment, and lead times are extended by the period of delay.',
          'We may ask for a letter of credit or other security for large or first orders. We reserve the right, acting reasonably and in writing, to decline an order if credit or payment risk is unacceptable.'
        ]
      },
      {
        id: 'lead-times',
        alt: true,
        heading: 'Lead times and delay',
        paras: [
          'Lead times run from the later of: the date the deposit clears, or the date we receive your written approval of the sample and specification. They are working-day estimates, not guarantees, unless expressly agreed as fixed in writing.',
          'We will tell you promptly if a lead time is at risk and what we are doing about it. We are not liable for losses arising from delay that we could not reasonably have avoided — for example a port closure, a customs hold or a carrier failure after the goods have left us.'
        ]
      },
      {
        id: 'delivery',
        heading: 'Delivery, title and risk',
        paras: [
          'Delivery terms follow the Incoterm stated in the quotation — commonly EXW, FOB, CIF or DDP. The Incoterm version in force at the date of the quotation applies.',
          'Under EXW and FOB, risk passes when the goods are made available or loaded as the term provides. Under CIF and DDP, risk passes as those terms provide. Title in the goods passes to you only once we have received payment in full.',
          "Where we arrange freight as an accommodation, we do so as your agent and the carrier's terms apply. Transit damage claims must be raised with the carrier, and we will provide the documentation you need to support them.",
          'Quantities may vary by plus or minus 5% on printed and hand-assembled work, and you will be invoiced for the quantity actually shipped at the unit price quoted. We will tell you before shipment if a variation is likely.'
        ]
      },
      {
        id: 'ip',
        alt: true,
        heading: 'Intellectual property',
        paras: [
          'You retain all rights in artwork, logos, brand assets and product designs you send us. You grant us a licence to use them only for the purpose of quoting, sampling and producing your order, and to keep a copy as an archive record of what we made for you.',
          "You confirm that you own or are licensed to use everything you send us, and that using it will not infringe anyone else's rights. You agree to indemnify us against claims arising from artwork or designs you supplied.",
          'Structural designs, dielines and tooling we develop remain our intellectual property unless the quotation assigns them to you. Where a structure was developed specifically for you and paid for by you, we will not offer that exact structure to another customer without your written consent.',
          'We will not use your name, logo, artwork or the fact that we manufacture for you in our marketing, case studies, or on this website without your written permission.'
        ]
      },
      {
        id: 'warranty',
        heading: 'Warranty and claims',
        paras: [
          'We warrant that goods will conform to the approved specification and approved sample, and will be free from material defect in workmanship and materials at the time of shipment.',
          'Claims must be notified in writing within 14 days of delivery, or within 7 days of delivery where the defect would have been visible on a reasonable inspection. Where a claim is about something that could not reasonably be seen on inspection, notify us within 30 days of delivery.',
          'Please keep the affected goods, their packaging and the shipping documentation, and send photographs. If you cannot preserve the goods, tell us straight away so we can agree an alternative method of assessment.',
          'Where a valid claim is established, we will at our option repair, replace or refund the affected units. Our liability is limited to the value of the defective goods. We do not accept claims for cost of recall, lost profit, lost sales, or consequential loss of any kind.'
        ]
      },
      {
        id: 'liability',
        alt: true,
        heading: 'Limitation of liability',
        paras: [
          'Nothing in these terms limits liability that cannot lawfully be limited, including liability for death or personal injury caused by negligence, or for fraud.',
          'Subject to that, our total liability arising out of or in connection with a contract is limited to the amount you paid us for the goods giving rise to the claim. We are not liable for loss of profit, loss of business, loss of goodwill, loss of anticipated savings, or any indirect or consequential loss.',
          'We are not liable for defects, losses or delays caused by: artwork or specifications you supplied; a product that does not fit the dimensions you gave us; a third-party carrier; customs action in the destination country; or your storage of the goods after delivery.'
        ]
      },
      {
        id: 'force-majeure',
        heading: 'Force majeure',
        paras: [
          'We are not in breach of contract, and are not liable for delay or failure to perform, where it is caused by something outside our reasonable control. That includes natural disaster, epidemic or pandemic, war, civil unrest, government or customs action, port closure, carrier failure, industrial action, power or utility failure, fire, flood, or a shortage of a specific raw material beyond our reasonable ability to source an equivalent.',
          'If a force majeure event continues for more than 90 days, either party may cancel the affected part of the order in writing. Amounts paid for goods not produced will be refunded.'
        ]
      },
      {
        id: 'confidentiality',
        alt: true,
        heading: 'Confidentiality',
        paras: [
          "Each party will keep the other's confidential information confidential and use it only for the purposes of the contract. This covers pricing, specifications, dielines, artwork, customer lists and any information marked or reasonably understood as confidential.",
          'We limit internal access to your files to the people who need them to quote and produce your order, and we do not disclose them to third parties except as needed for shipping, customs or professional advice.',
          'These obligations survive the end of the contract for 3 years, and indefinitely for artwork and structures that remain your property.'
        ]
      },
      {
        id: 'termination',
        heading: 'Cancellation and termination',
        paras: [
          'You may cancel an order before production starts, and amounts paid will be refunded less any work already properly carried out — dies made, materials ordered, samples produced.',
          'Once production has started, custom packaging cannot be cancelled because the goods are specific to you and cannot be sold to anyone else. Cancellation after production starts is treated as a full order, and the balance remains payable.',
          'Either party may terminate immediately if the other becomes insolvent or commits a material breach that is not remedied within 14 days of written notice.'
        ]
      },
      {
        id: 'compliance',
        alt: true,
        heading: 'Anti-corruption and trade compliance',
        paras: [
          'We comply with applicable anti-bribery and anti-corruption laws and do not offer or accept improper payments in connection with any order.',
          'You are responsible for confirming that the goods may lawfully be imported into your destination country, and for holding any licence, permit or registration your market requires. We will provide the documentation and declarations reasonably needed for clearance.',
          'We will not supply where doing so would breach export control, sanctions or trade restrictions applicable to a transaction.'
        ]
      },
      {
        id: 'law',
        heading: 'Governing law and disputes',
        paras: [
          "These terms and any contract formed under them are governed by the laws of the People's Republic of China.",
          "The parties will first attempt to resolve any dispute through good-faith discussion between senior representatives. If that does not resolve it within 30 days, the dispute will be submitted to the competent court at our place of business in Guangzhou, or to arbitration where the quotation specifies it, in each case without prejudice to either party's right to seek interim relief.",
          'If any provision of these terms is found unenforceable, the rest remains in force and the unenforceable provision is replaced by one achieving as nearly as possible the same commercial effect.'
        ]
      }
    ];

    const page = {
      url: '/terms/',
      title: 'Terms &amp; Conditions of Sale | Metapackink',
      description:
        'Terms governing quotations, sampling, production, payment, shipping and after-sales for Metapackink custom packaging orders.',
      ogImage: 'hero-box.webp',
      priority: '0.3',
      breadcrumbs: [HOME, { label: 'Terms & Conditions', href: '/terms/' }]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">LEGAL</div>

<h1>Terms &amp; Conditions</h1>

<p>The terms on which ${site.legalName} quotes for, samples and supplies custom packaging. Last updated ${UPDATED}.</p>

</div>

</section>

${toc(blocks.map((b) => ({ id: b.id, label: b.heading })).concat([{ id: 'contact', label: 'Questions about this document' }]))}

${blocks.map(legalBlock).join('\n\n')}

${legalFooterContact()}

${relatedSection([
  { title: 'Frequently asked questions', text: 'Minimums, sampling, pricing and lead times.', href: navHref('/faq/', page.url) },
  { title: 'Privacy Policy', text: 'How we handle the data you send us.', href: navHref('/privacy-policy/', page.url) },
  { title: 'Request a quote', text: 'Start a project under these terms.', href: navHref('/request-a-quote/', page.url) }
], 'Related')}

${REVIEW_NOTE}
`;
    return page;
  })(),

  /* ================================================================== *
   * /cookie-policy/
   * ================================================================== */
  (() => {
    const blocks = [
      {
        id: 'short-version',
        heading: 'The short version',
        paras: [
          'This website sets no advertising cookies, no retargeting pixels and no social media trackers. No cookie here follows you around the internet.',
          'We use a single Google Analytics 4 property to understand which pages are useful. Everything else the site needs to work is a strictly necessary item that does not identify you.'
        ],
        list: [
          'No advertising or retargeting cookies',
          'No third-party advertising pixels',
          'No cross-site tracking',
          'Analytics can be blocked without breaking the site'
        ]
      },
      {
        id: 'what-we-store',
        alt: true,
        heading: 'What we store, and why',
        paras: ['The table below lists every cookie and storage item this website can set.'],
        note: 'This site sets no advertising, profiling or cross-site tracking cookies of any kind.'
      },
      {
        id: 'categories',
        heading: 'The categories, explained',
        paras: ['We group what we use into two categories, because the distinction matters for what you can switch off.'],
        list: [
          '<strong>Strictly necessary.</strong> These make the site work: remembering your chosen language and remembering that you have already dismissed any notice. They do not identify you, and the site cannot function properly without them, so they do not require consent.',
          '<strong>Analytics.</strong> Google Analytics 4 tells us which pages are read, which are abandoned and roughly where visitors come from — in aggregate. It does not give us your name, and we do not enable Google Signals or advertising features. You can block this without affecting the site.'
        ]
      },
      {
        id: 'control',
        alt: true,
        heading: 'How to control or opt out',
        paras: ['You are in control of all of it. Any of these will work:'],
        list: [
          '<strong>Browser settings.</strong> Every major browser lets you block or delete cookies and clear site data. Blocking strictly necessary items may make parts of the site behave oddly, but blocking analytics has no effect on how it works.',
          '<strong>Private or incognito mode.</strong> Cookies set during a private session are discarded when you close the window.',
          '<strong>Google Analytics opt-out.</strong> Google publishes a browser add-on that stops Google Analytics collecting data on any site you visit.',
          '<strong>Do Not Track and Global Privacy Control.</strong> We honour these signals as an opt-out of analytics wherever the browser sends them.'
        ]
      },
      {
        id: 'third-parties',
        heading: 'Third-party services this site interacts with',
        paras: ['Two third parties are relevant:'],
        list: [
          '<strong>Google Analytics 4</strong> — loads on page view to count and describe visits in aggregate. It receives your IP address and technical data about your device and browser. Google acts as our processor for this.',
          '<strong>Cloudflare</strong> — hosts and serves this website, and processes request data as part of delivering it, including basic security and performance logging.'
        ]
      },
      {
        id: 'changes',
        alt: true,
        heading: 'Changes to this policy',
        paras: ['If we add a cookie or change what an existing one does, we will update the table above and revise the date at the top of this page. We will not introduce advertising or cross-site tracking cookies without telling you on this page first.']
      }
    ];

    /* The cookie table is its own section because it needs table markup. */
    const cookieTable = `<section class="section section-alt">

<div class="container">

<div class="table-wrap">
<table class="spec-table">
<thead><tr><th>Name</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
<tbody>
<tr><td><code>_ga</code></td><td>Analytics (Google Analytics 4)</td><td>Distinguishes one browser from another so we can count visits and see which pages are read.</td><td>13 months</td></tr>
<tr><td><code>_ga_&lt;id&gt;</code></td><td>Analytics (Google Analytics 4)</td><td>Maintains session state for Google Analytics 4, including how a visit progressed between pages.</td><td>13 months</td></tr>
<tr><td><code>mpk_lang</code></td><td>Strictly necessary</td><td>Remembers the language you selected, so the site does not reset to English on every page.</td><td>12 months</td></tr>
<tr><td><code>cf_clearance</code>, <code>__cf_bm</code></td><td>Strictly necessary (Cloudflare)</td><td>Set by our host to distinguish real visitors from automated traffic and to protect the site from abuse.</td><td>Up to 30 minutes</td></tr>
<tr><td><code>localStorage</code></td><td>Strictly necessary</td><td>Stores small interface state in your browser only. It is never sent to us or to anyone else.</td><td>Until cleared</td></tr>
</tbody>
</table>
</div>

</div>

</section>`;

    const page = {
      url: '/cookie-policy/',
      title: 'Cookie Policy | Metapackink',
      description:
        'Which cookies and similar technologies this website uses, what they do, how long they last, and how to control or opt out of them.',
      ogImage: 'hero-box.webp',
      priority: '0.3',
      breadcrumbs: [HOME, { label: 'Cookie Policy', href: '/cookie-policy/' }]
    };

    const order = ['short-version', 'categories', 'control', 'third-parties', 'changes'];

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">LEGAL</div>

<h1>Cookie Policy</h1>

<p>What this website stores on your device, why, and how to switch it off. Last updated ${UPDATED}.</p>

</div>

</section>

${toc([
  { id: 'short-version', label: 'The short version' },
  { id: 'what-we-store', label: 'What we store, and why' },
  { id: 'categories', label: 'The categories, explained' },
  { id: 'control', label: 'How to control or opt out' },
  { id: 'third-parties', label: 'Third-party services' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Questions about this document' }
])}

${legalBlock(blocks.find((b) => b.id === 'short-version'))}

${cookieTable}

${order
  .filter((id) => id !== 'short-version')
  .map((id) => legalBlock(blocks.find((b) => b.id === id)))
  .join('\n\n')}

${legalFooterContact()}

${relatedSection([
  { title: 'Privacy Policy', text: 'The full picture on personal data, rights and retention.', href: navHref('/privacy-policy/', page.url) },
  { title: 'Terms & Conditions', text: 'The terms on which we quote, sample and supply.', href: navHref('/terms/', page.url) },
  { title: 'Contact us', text: 'Ask us anything about cookies or tracking.', href: navHref('/contact/', page.url) }
], 'Related')}

${REVIEW_NOTE}
`;
    return page;
  })()

];
