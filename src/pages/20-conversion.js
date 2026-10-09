'use strict';

/* The conversion pages.

   Before this rebuild the site had no <form> element anywhere — every "Get a
   Quote" button across the site landed on contact.html, which offered a phone
   number, a WhatsApp link and an email address and nothing else. There was no
   way to actually send a packaging brief.

   /contact/  keeps the existing contact cards and adds a message form.
   /request-a-quote/  is the full RFQ form (deep-linked from every CTA).
   /request-sample/  is the lighter sample request.
   /thank-you/  is the post-submit destination, noindexed. */

const { carriedPage } = require('../carried');
const { rfqForm, sampleForm, contactForm, darkCta, relatedSection } = require('../partials');
const { navHref } = require('../layout');

const HOME = { label: 'Home', href: '/' };

module.exports = [

  /* ------------------------------------------------------------------ *
   * /contact/ — existing content, plus the form the page was missing
   * ------------------------------------------------------------------ */
  (() => {
    const page = carriedPage({
      url: '/contact/',
      body: 'contact',
      bodyClass: 'contact-page',
      title: 'Contact Metapackink | Request a Packaging Quote',
      description:
        'Contact Metapackink about custom packaging: rigid boxes, magnetic boxes, perfume and cosmetic packaging. Send your specifications, dimensions and quantity for a quotation.',
      ogImage: 'hero-box.webp',
      priority: '0.9',
      breadcrumbs: [HOME, { label: 'Contact', href: '/contact/' }],
      faq: [
        {
          q: 'How quickly will I get a reply?',
          a: 'We reply to every enquiry within one business day. If your brief is complete enough for us to quote against, you will normally receive structure and material recommendations with an indicative price in that first reply.'
        },
        {
          q: 'What should I include in my first message?',
          a: 'Product type and dimensions, weight, estimated quantity, target market, any packaging reference you like, and your required timeline. Artwork is welcome but not necessary at the first contact — we can quote structure before artwork exists.'
        },
        {
          q: 'Can I visit the factory?',
          a: 'Yes, by appointment. Our facility is in Panyu District, Guangzhou. We also support third-party inspections and audits — tell us who is coming and we will arrange access.'
        }
      ]
    });

    page.content = page.content + '\n\n' + contactForm(page);
    return page;
  })(),

  /* ------------------------------------------------------------------ *
   * /request-a-quote/ — the primary conversion page
   * ------------------------------------------------------------------ */
  (() => {
    const page = {
      url: '/request-a-quote/',
      title: 'Request a Custom Packaging Quote | Metapackink',
      description:
        'Request a quotation for custom packaging. Send your product dimensions, quantity, structure and finishing requirements and we will reply with recommendations and indicative pricing.',
      ogImage: 'hero-box.webp',
      priority: '0.9',
      breadcrumbs: [HOME, { label: 'Request a quote', href: '/request-a-quote/' }],
      faq: [
        {
          q: 'What information do you need to quote?',
          a: 'Structure or a description of what you want, approximate dimensions, quantity, and any material or finishing preferences. Product dimensions matter most, because they determine the box size, internal clearance and board thickness. If you do not know the structure yet, describe the product and we will recommend one.'
        },
        {
          q: 'Is the quotation free?',
          a: 'Yes. There is no charge for reviewing your requirements or for a quotation. Physical samples are chargeable, and we confirm the sample cost and lead time in writing before anything is produced.'
        },
        {
          q: 'How long does a quotation take?',
          a: 'One business day for most projects. If your brief needs structural development before a price is meaningful, we will tell you that and give you a realistic timeframe rather than sending a number that would change later.'
        },
        {
          q: 'Do you quote in my currency?',
          a: 'We normally quote in USD or EUR. Quotations are valid for 30 days and exclude duties and taxes in the destination country unless we state otherwise.'
        },
        {
          q: 'What happens to the files I upload?',
          a: 'They are used only to prepare your quotation and, if you order, to make your packaging. They are not published, reused for other customers, or shared outside the people who need them. See the privacy policy for the full detail.'
        }
      ]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">REQUEST A QUOTE</div>

<h1>Send your packaging requirements.</h1>

<p>Tell us what you are packaging, how many you need and when. We will come back with structure and material recommendations and an indicative price — normally within one business day.</p>

</div>

</section>

${rfqForm(page)}
`;
    return page;
  })(),

  /* ------------------------------------------------------------------ *
   * /request-sample/
   * ------------------------------------------------------------------ */
  (() => {
    const page = {
      url: '/request-sample/',
      title: 'Request a Packaging Sample or Swatch Book | Metapackink',
      description:
        'Request a physical packaging sample or a material and finishing swatch book before committing to a production run. Custom samples, stock structures and material books.',
      ogImage: 'rigid-boxes-600.webp',
      priority: '0.8',
      breadcrumbs: [HOME, { label: 'Request a sample', href: '/request-sample/' }],
      faq: [
        {
          q: 'Why should I sample before ordering?',
          a: 'A screen or a digital proof cannot tell you how stiff the board feels, how a foil catches the light, or whether your product sits properly in the cavity. A physical sample answers all three, and it becomes the approved reference our production line works to.'
        },
        {
          q: 'What does a sample cost?',
          a: 'It depends on the structure and finishing. Simple stock structures and material swatch books are inexpensive; a fully finished custom structure with foil, emboss and a custom insert costs more. We confirm the cost in writing before producing anything, and sample charges are commonly credited against the production order.'
        },
        {
          q: 'How long does a sample take?',
          a: 'Typically 5 to 8 working days for production once the structure is agreed, plus 3 to 6 days for courier delivery. Requirements review and dieline development add a few days before that.'
        },
        {
          q: 'Can I get just a materials swatch book?',
          a: 'Yes. If you are still choosing between papers, boards, fabrics and finishes, a swatch book is often the most useful first step and the cheapest way to narrow the options down.'
        }
      ]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">REQUEST A SAMPLE</div>

<h1>See and feel it before you commit.</h1>

<p>A physical sample is the only way to judge board stiffness, surface feel, colour accuracy and product fit. Request a custom sample, a stock structure, or a material and finishing swatch book.</p>

</div>

</section>

${sampleForm(page)}
`;
    return page;
  })(),

  /* ------------------------------------------------------------------ *
   * /thank-you/
   * ------------------------------------------------------------------ */
  (() => {
    const page = {
      url: '/thank-you/',
      noindex: true,
      title: 'Thank you | Metapackink',
      description: 'Your enquiry has been received. We reply to every enquiry within one business day.',
      priority: '0.1',
      breadcrumbs: [HOME]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">ENQUIRY RECEIVED</div>

<h1>Thank you — we have your enquiry.</h1>

<p>We reply to every enquiry within one business day. If your brief is complete enough for us to quote against, that reply will normally include structure and material recommendations with an indicative price.</p>

</div>

</section>

<section class="section">

<div class="container narrow prose">

<h2>What happens next</h2>

<ol class="aside-list">
<li><strong>We review your specification.</strong> If something is unclear or a detail would change the recommendation, we will ask rather than guess.</li>
<li><strong>You receive a quotation.</strong> Structure and material recommendations with indicative pricing, normally within one business day.</li>
<li><strong>We produce a physical sample.</strong> Once structure and finishing are agreed, for your written approval.</li>
<li><strong>Approved samples go into production</strong> with in-line quality checks and a pre-shipment final inspection.</li>
</ol>

<p>If you would rather talk it through, message us on <a href="https://web.whatsapp.com/send?phone=+86-13143789995&amp;text=Hello" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:sales@metapackink.com">sales@metapackink.com</a> and quote the reference in your confirmation email.</p>

<p><strong>Nothing arrived?</strong> Check your spam folder, and if there is no confirmation email within a few minutes the submission did not go through — please send it again or contact us directly.</p>

</div>

</section>

${relatedSection([
  { title: 'Back to the home page', text: 'Products, industries and how we work.', href: navHref('/', page.url) },
  { title: 'Browse products', text: 'Rigid boxes, magnetic boxes and more.', href: navHref('/products/', page.url) },
  { title: 'Case studies', text: 'How packaging projects come together.', href: navHref('/case-studies/', page.url) }
], 'While you wait')}
`;
    return page;
  })(),

  /* ------------------------------------------------------------------ *
   * /404/
   * ------------------------------------------------------------------ */
  (() => {
    const page = {
      url: '/404/',
      noindex: true,
      title: 'Page not found | Metapackink',
      description: 'The page you were looking for does not exist. Find packaging products, industries and resources from here.',
      priority: '0.1',
      breadcrumbs: [HOME]
    };

    page.content = `
<section class="page-hero">

<div class="container">

<div class="eyebrow">ERROR 404</div>

<h1>That page does not exist.</h1>

<p>The link may be out of date, or the address may have a typo in it. These are the places most people are looking for.</p>

</div>

</section>

${relatedSection([
  { title: 'Products', text: 'Rigid boxes, magnetic boxes, perfume, cosmetic and gift packaging.', href: navHref('/products/', page.url) },
  { title: 'Packaging solutions', text: 'How a custom packaging project is developed and produced.', href: navHref('/packaging-solutions/', page.url) },
  { title: 'Industries', text: 'Packaging by the sector it is made for.', href: navHref('/industries/', page.url) },
  { title: 'Request a quote', text: 'Send your specifications and get indicative pricing.', href: navHref('/request-a-quote/', page.url) },
  { title: 'Contact us', text: 'Phone, WhatsApp and email.', href: navHref('/contact/', page.url) },
  { title: 'Sitemap', text: 'Every page on this website.', href: navHref('/sitemap/', page.url) }
], 'Where to go next')}
`;
    return page;
  })()

];
