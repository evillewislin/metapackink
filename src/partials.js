'use strict';

/* Shared page fragments. Markup uses the existing style.css class names, and
   new classes are added in style-additions.css. */

const { site } = require('./config');
const { asset, navHref } = require('./layout');

const STRUCTURE_OPTIONS = [
  'Rigid box', 'Magnetic closure box', 'Two-piece rigid box', 'Drawer box',
  'Perfume packaging', 'Cosmetic packaging', 'Gift / presentation packaging',
  'Paper bags or wrapping', 'Not sure yet — please advise'
];

const QUANTITY_OPTIONS = [
  'Under 500', '500 – 1,000', '1,000 – 3,000', '3,000 – 10,000',
  '10,000 – 50,000', 'Over 50,000'
];

const TIMELINE_OPTIONS = [
  'As soon as possible', 'Within 2 – 4 weeks', 'Within 1 – 2 months',
  'In 3 months or more', 'Planning / budgeting only'
];

function options(list) {
  return list.map((v) => `<option value="${v}">${v}</option>`).join('');
}

function field(o) {
  const req = o.required ? ' required' : '';
  const star = o.required ? '<span class="req" aria-hidden="true">*</span>' : '';
  const opt = !o.required ? '<span class="opt">optional</span>' : '';
  const id = 'f-' + o.name;
  let control;
  if (o.type === 'textarea') {
    control = `<textarea id="${id}" name="${o.name}" rows="${o.rows || 5}"${req} placeholder="${o.placeholder || ''}"></textarea>`;
  } else if (o.type === 'select') {
    control = `<select id="${id}" name="${o.name}"${req}><option value="">Please select…</option>${options(o.options)}</select>`;
  } else {
    control = `<input id="${id}" type="${o.type || 'text'}" name="${o.name}"${req} placeholder="${o.placeholder || ''}">`;
  }
  return `<div class="form-row${o.full ? ' full' : ''}">
<label for="${id}">${o.label}${star}${opt}</label>
${control}
${o.hint ? `<span class="hint">${o.hint}</span>` : ''}
<span class="field-error">This field is required.</span>
</div>`;
}

/* The endpoint comes from src/config.js, so there is exactly one place to
   set it. FORM_CONFIGURED travels into the markup as a data attribute, so
   js/forms.js does not have to re-derive it from the URL, and the build can
   refuse to ship a placeholder endpoint to production. */
const FORM_ENDPOINT = site.formAction + site.formId;
const FORM_CONFIGURED = site.formId !== 'YOUR_FORM_ID';

/* Country, derived rather than asked for.
 *
 * Both inputs are filled in by js/forms.js from the visitor's IP. Cloudflare
 * already reports the country of every request at its own same-origin
 * /cdn-cgi/trace endpoint, so asking the visitor to type it means asking them
 * to retype something the platform told us as the page loaded.
 *
 * Two fields because they have two readers: `country` is the name a person
 * wants in the inbox, `country_code` is the ISO code a spreadsheet can group
 * on. Both are plain hidden inputs rather than script-created ones, so the
 * field order in the submission is stable and a failed lookup leaves them
 * visible in the payload as empty rather than missing.
 *
 * Deliberately absent: the IP address itself. The country is all we need, and
 * storing the address of every enquirer would be a liability with no use. */
function countryFields() {
  return `<!-- Country comes from the visitor's IP; see js/forms.js. -->
<input type="hidden" name="country" value="" data-country-auto>
<input type="hidden" name="country_code" value="" data-country-auto>`;
}

/**
 * Full RFQ form. This is the site's primary conversion asset; before this
 * rebuild the site had no <form> anywhere and every "Get a Quote" button led
 * to a contact page with no way to submit anything.
 */
function rfqForm(page) {
  const u = page.url;
  return `<section class="section" id="enquiry">
<div class="container">
<div class="form-layout">

<form class="form-card" data-rfq data-form-name="rfq"
      data-endpoint-configured="${FORM_CONFIGURED}"
      action="${FORM_ENDPOINT}" method="POST"
      data-thank-you="${navHref('/thank-you', u)}" novalidate>
<h2>Tell us about your packaging project</h2>
<p class="section-intro">The more detail you share, the more specific our recommendation and quotation will be. Only the fields marked with an asterisk are required.</p>

<div class="form-grid">
${countryFields()}
${field({ name: 'email', label: 'Business email', type: 'email', required: true, placeholder: 'jane@company.com' })}
${field({ name: 'structure', label: 'Packaging structure', type: 'select', required: true, options: STRUCTURE_OPTIONS })}
${field({ name: 'quantity', label: 'Estimated quantity', type: 'select', required: true, options: QUANTITY_OPTIONS })}
${field({ name: 'dimensions', label: 'Product or box dimensions', placeholder: 'e.g. 120 x 80 x 45 mm, or "fits a 50 ml bottle"' })}
${field({ name: 'timeline', label: 'When do you need it?', type: 'select', required: true, options: TIMELINE_OPTIONS })}
${field({ name: 'notes', label: 'Project details', type: 'textarea', rows: 5, placeholder: 'Product type, target market, material or finishing preferences, reference packaging, anything else we should know.', full: true })}

<div class="form-row full">
<label for="f-artwork">Attach artwork or reference images <span class="opt">optional</span></label>
<div class="upload-field">
<span>AI, PDF, EPS, JPG, PNG or ZIP — up to 20 MB each.</span>
<input id="f-artwork" type="file" name="artwork" multiple accept=".ai,.pdf,.eps,.jpg,.jpeg,.png,.zip,.psd">
<span class="upload-filenames" hidden></span>
</div>
</div>

<div class="form-row full">
<label class="consent">
<input type="checkbox" name="consent" required>
<span>I agree to the <a href="${navHref('/privacy-policy/', u)}">Privacy Policy</a> and consent to being contacted about this enquiry.</span>
</label>
<span class="field-error">Please confirm before submitting.</span>
</div>

<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
</div>

<div class="form-foot">
<button type="submit" class="btn btn-primary">Send enquiry</button>
<span class="form-status" role="status" aria-live="polite"></span>
</div>
<p class="form-note">We reply to every enquiry within one business day. Files are used only to prepare your quotation.</p>
</form>

<aside class="form-aside">
<div class="aside-card">
<h3>Prefer to talk it through?</h3>
<p>Send your requirements on WhatsApp and we will come back with structure suggestions and an indicative price.</p>
<p class="aside-last"><a href="${site.contact.whatsapp}" target="_blank" rel="noopener">WhatsApp ${site.contact.whatsappDisplay}</a><br>
<a href="${site.contact.emailHref}">${site.contact.email}</a></p>
</div>
<div class="aside-card">
<h3>What happens next</h3>
<ol class="aside-list">
<li>We review your specification and ask anything that is unclear.</li>
<li>You receive structure and material recommendations with an indicative quotation.</li>
<li>We produce a physical sample for your approval.</li>
<li>Approved samples move into production with in-line quality checks.</li>
</ol>
</div>
<div class="aside-card">
<h3>Helpful to include</h3>
<ul class="aside-list">
<li>Product weight and dimensions</li>
<li>Target retail price point</li>
<li>Reference packaging you like</li>
<li>Destination country and port</li>
<li>Any certification your brand requires</li>
</ul>
</div>
</aside>

</div>
</div>
</section>`;
}

/** Lighter sample-request form. */
function sampleForm(page) {
  const u = page.url;
  return `<section class="section" id="sample">
<div class="container">
<div class="form-layout">

<form class="form-card" data-rfq data-form-name="sample"
      data-endpoint-configured="${FORM_CONFIGURED}"
      action="${FORM_ENDPOINT}" method="POST"
      data-thank-you="${navHref('/thank-you', u)}" novalidate>
<h2>Request a sample or swatch book</h2>
<p class="section-intro">Not ready to commit to a full specification? Send us your product type and we will advise what to sample first.</p>

<div class="form-grid">
${countryFields()}
${field({ name: 'email', label: 'Business email', type: 'email', required: true, placeholder: 'jane@company.com' })}
${field({ name: 'structure', label: 'What would you like to sample?', type: 'select', required: true, options: STRUCTURE_OPTIONS.concat(['Material swatch book only', 'Existing stock sample']) })}
${field({ name: 'sample_type', label: 'Sample type', type: 'select', required: true, options: ['Custom sample of my product', 'Stock sample of a similar structure', 'Material and finishing swatch book'] })}
${field({ name: 'notes', label: 'Product details', type: 'textarea', rows: 4, full: true, placeholder: 'Product type, approximate dimensions, and what you would like to evaluate (structure, material, finish, product fit).' })}

<div class="form-row full">
<label class="consent">
<input type="checkbox" name="consent" required>
<span>I agree to the <a href="${navHref('/privacy-policy/', u)}">Privacy Policy</a> and consent to being contacted about this enquiry.</span>
</label>
<span class="field-error">Please confirm before submitting.</span>
</div>
<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
</div>

<div class="form-foot">
<button type="submit" class="btn btn-primary">Request sample</button>
<span class="form-status" role="status" aria-live="polite"></span>
</div>
<p class="form-note">Sample cost and lead time depend on the structure and finishing you choose. We confirm both in writing before anything is produced.</p>
</form>

<aside class="form-aside">
<div class="aside-card">
<h3>Why sample first</h3>
<p class="aside-last">A physical sample is the only way to judge board stiffness, surface feel, colour accuracy and how your product actually sits inside the box. It also becomes the approved reference our production line works to.</p>
</div>
<div class="aside-card">
<h3>Typical sampling timeline</h3>
<ul class="aside-list">
<li>Requirements review: 1 – 2 days</li>
<li>Structure and dieline: 2 – 4 days</li>
<li>Sample production: 5 – 8 working days</li>
<li>Courier delivery: 3 – 6 days</li>
</ul>
</div>
</aside>

</div>
</div>
</section>`;
}

/** Short contact form.

    Returns a grid child rather than a self-contained section: on /contact/ the
    form sits in the right-hand column of .contact-grid, level with the contact
    cards, so it must not bring its own container or section padding. */
function contactForm(page) {
  const u = page.url;
  return `<div class="contact-form-col">
<div class="form-card">
<h2>Send us a message</h2>
<p class="section-intro">For quotations with specifications, the <a href="${navHref('/request-a-quote/', u)}">request a quote</a> form collects everything we need in one go. Use this form for everything else.</p>
<form data-rfq data-form-name="contact"
      data-endpoint-configured="${FORM_CONFIGURED}"
      action="${FORM_ENDPOINT}" method="POST"
      data-thank-you="${navHref('/thank-you', u)}" novalidate>
<div class="form-grid">
${countryFields()}
${field({ name: 'email', label: 'Business email', type: 'email', required: true })}
${field({ name: 'subject', label: 'Subject', type: 'select', required: true, options: ['New packaging project', 'Existing order or production question', 'Sample follow-up', 'Quality or after-sales', 'Supplier and partnership enquiry', 'Something else'] })}
${field({ name: 'message', label: 'Message', type: 'textarea', required: true, full: true, rows: 5 })}
<div class="form-row full">
<label class="consent">
<input type="checkbox" name="consent" required>
<span>I agree to the <a href="${navHref('/privacy-policy/', u)}">Privacy Policy</a> and consent to being contacted about this enquiry.</span>
</label>
<span class="field-error">Please confirm before submitting.</span>
</div>
<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
</div>
<div class="form-foot">
<button type="submit" class="btn btn-primary">Send message</button>
<span class="form-status" role="status" aria-live="polite"></span>
</div>
</form>
</div>
</div>`;
}

/** The factory on a map, as a full-bleed band under the contact columns.

    Two things this markup has to get right:

     1. The iframe host must be named in frame-src (see buildHeaders() in
        tools/build.js). A policy that omits it does not break the build, the
        page or the console — the frame simply renders as an empty rectangle.
        checkHeaders() reads this element back out of the built HTML so the
        two cannot drift apart.
     2. Google Maps is not reachable from mainland China, where the factory is.
        A visitor on a Chinese network therefore sees an empty frame, which is
        why the address and an outbound link are rendered underneath it in
        ordinary text rather than overlaid on the map. */
function mapSection(page) {
  const { mapEmbed, mapLink } = site.contact;
  const title = `${site.legalName} — ${site.contact.addressLine1}, ${site.contact.addressLine2}`;

  return `<section class="contact-map">
<div class="container">
<div class="map-head">
<div class="eyebrow" data-i18n="contact.mapEyebrow">FIND US</div>
<h2 data-i18n="contact.mapTitle">Our factory, in Panyu District, Guangzhou.</h2>
<p class="section-intro" data-i18n="contact.mapText">Visits are by appointment. Tell us who is coming and we will arrange factory access, and we support third-party inspections and audits.</p>
</div>
</div>
<div class="map-frame">
<iframe title="${title}"
        src="${mapEmbed}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen></iframe>
</div>
</section>`;
}

/** Table of contents for a long document.
 *
 *  Lifted out of src/pages/30-support-legal.js when the article pages arrived,
 *  so a legal document and a blog post cannot drift into two different
 *  "On this page" designs. `items` is [{ id, label }] and each id must match an
 *  element id in the document it heads. */
function toc(items, title) {
  return `<section class="section section-toc">

<div class="container narrow">

<nav class="toc" aria-label="On this page">
<h2 class="toc-title">${title || 'On this page'}</h2>
<ol class="toc-list">
${items.map((it) => `<li><a href="#${it.id}">${it.label}</a></li>`).join('\n')}
</ol>
</nav>

</div>

</section>`;
}

/** Dark CTA band — matches the existing .dark-cta styling. */
function darkCta(href, heading, text, buttonLabel) {
  return `<section class="dark-cta">

<div class="container">

<div>

<div class="eyebrow" data-i18n="cta.eyebrow">CUSTOM PROJECT</div>

<h2 data-i18n="cta.title">${heading || "Don't see exactly what you need?"}</h2>

<p data-i18n="cta.text">${text || 'Tell us your product dimensions, quantity and packaging requirements. We can develop a custom solution.'}</p>

</div>

<a href="{{HREF}}" class="btn btn-light" data-i18n="cta.button">${buttonLabel || 'Talk to Metapackink →'}</a>

</div>

</section>`.replace('{{HREF}}', href);
}

/** Three-up related-links grid. */
function relatedSection(items, heading) {
  return `<section class="related-section">
<div class="container">
<h2 class="related-heading">${heading || 'Related pages'}</h2>
<div class="related-grid">
${items
  .map(
    (it) => `<a class="related-card" href="{{H}}">
<h3>${it.title}</h3>
<p>${it.text}</p>
<span class="related-cta">Read more →</span>
</a>`.replace('{{H}}', it.href)
  )
  .join('\n')}
</div>
</div>
</section>`;
}

module.exports = {
  rfqForm, sampleForm, contactForm, mapSection, darkCta, relatedSection, toc,
  field, options, FORM_ENDPOINT, FORM_CONFIGURED,
  STRUCTURE_OPTIONS, QUANTITY_OPTIONS, TIMELINE_OPTIONS
};
