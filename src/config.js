'use strict';

/* Site-wide configuration.
   Every phone number, email, social URL and navigation label on the site comes
   from this file, so changing one means changing one place. */

const site = {
  brand: 'METAPACKINK',
  brandHtml: '<span>META</span>PACKINK',
  legalName: 'Guangzhou Metapackink Packaging Co., Ltd.',
  domain: 'https://www.metapackink.com',
  lang: 'en',

  /* Cloudflare Pages serves /about/ from about.html, so every internal link,
     canonical and sitemap entry uses the clean trailing-slash form. */
  contact: {
    phoneDisplay: '+86-13143789995',
    phoneHref: 'tel:+8613143789995',
    whatsapp: 'https://web.whatsapp.com/send?phone=+86-13143789995&text=Hello',
    whatsappDisplay: '+86-13143789995',
    email: 'sales@metapackink.com',
    emailHref: 'mailto:sales@metapackink.com',
    addressLine1: 'Jiangnan Industrial Zone 2, Nancun Town',
    addressLine2: 'Panyu District, Guangzhou, China',

    /* The factory pin, copied verbatim from the Maps "Share -> Embed a map"
       dialog. The pb= parameter encodes the pin and the !2d/!3d pair inside it
       is the longitude and latitude, so it is not something to hand-edit;
       re-copy it from Maps if the pin ever moves.

       Changing the host here means changing the frame-src directive in
       tools/build.js as well — checkHeaders() fails the build if a page
       embeds a host the policy does not name, because a blocked iframe
       renders as an empty box and reports nothing. */
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.1401347050731!2d113.38071920715167!3d23.003182204353838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ab464802670b%3A0x85357009563a1c41!2sNancunzhen%2C%20Panyu%20District%2C%20Guangzhou%2C%20Guangdong%20Province%2C%20China%2C%20511442!5e0!3m2!1sen!2shk!4v1784278227500!5m2!1sen!2shk',

    /* The link under the map. It is the way out for anyone whose network
       cannot reach Google — which includes mainland China, where this factory
       is — and it doubles as directions for a buyer planning a visit. */
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=23.003182204353838,113.38071920715167'
  },

  /* One GA4 property, not two. See README-DEPLOY.md. */
  ga4: 'G-G4VHR7QHGD',

  /* ------------------------------------------------------------------ *
   * Form submission
   *
   * Paste the form id from your form provider here (Formspree dashboard ->
   * your form -> Integration). It is the last path segment of the endpoint:
   *   https://formspree.io/f/mbgdydjj   ->   formId: 'mbgdydjj'
   *
   * While this is left as the placeholder, every form on the site refuses to
   * pretend it submitted: js/forms.js detects the placeholder and opens the
   * visitor's mail client pre-filled instead, so no enquiry is silently lost.
   * The trade-off is that a mailto: needs the visitor to actually press Send,
   * and on a phone with no mail app configured it does nothing at all — so
   * set a real id before you take traffic.
   * ------------------------------------------------------------------ */
  formId: 'mbgdydjj',
  formAction: 'https://formspree.io/f/',

  /* Where a failed submission should go instead. Shown as a link in the
     inline error, so a visitor who hits a network problem still has a route. */
  fallbackEmail: 'sales@metapackink.com',

  social: [
    { name: 'Facebook', icon: 'facebook.png', url: 'https://www.facebook.com/people/Guyin-Packaging/' },
    { name: 'Instagram', icon: 'instagram.png', url: 'https://www.instagram.com/gooinpack_guyin/' },
    { name: 'YouTube', icon: 'youtube.png', url: 'https://www.youtube.com/@GooinPack' },
    { name: 'LinkedIn', icon: 'linkedin.png', url: 'https://www.linkedin.com/in/yin-gu-76a75a39b' },
    { name: 'Pinterest', icon: 'pinterest.png', url: 'https://au.pinterest.com/yingu312/_profile/' },
    { name: 'X', icon: 'twitter.png', url: 'https://x.com/Gooinpack' }
  ]
};

/* Commercial terms we publish to buyers.

   These figures were previously repeated as prose in several places — the
   product FAQs, the sample page, the FAQ page, the terms — and by the time
   they were audited one of them had drifted: a draft article quoted a 15 to
   25 working day production time against the 12 to 20 the rest of the site
   states. A buyer comparing two pages of the same site is exactly the reader
   who notices that, so the numbers live here now and every page that
   publishes one reads it from this object.

   tools/build.js checks the built output against these values
   (checkTradeLanguage), so a page that hard-codes its own range fails the
   build rather than quietly contradicting the rest of the site. */
const trade = {
  /* Incoterms named in the terms and in every quotation. */
  terms: 'EXW, FOB, CIF or DDP',

  couriers: 'DHL, UPS or FedEx',

  /* Working days counted from approved artwork, not from the enquiry. */
  sampleLead: '5 – 8 working days',

  /* Working days from the later of the cleared deposit or written sample
     approval — the same trigger the terms and conditions state. Keep the
     trigger wording in step if either changes. */
  productionLead: '12 – 20 working days',

  courierLead: '3 – 6 days'
};

/* Primary navigation.
   `key` is an existing key in main.js so the language switcher keeps working. */
const nav = [
  { label: 'Products', key: 'nav.products', href: '/products/' },
  { label: 'Industries', key: 'nav.industries', href: '/industries/' },
  { label: 'Solutions', key: 'nav.solutions', href: '/packaging-solutions/' },
  {
    label: 'Company', key: 'nav.company', href: '/about/',
    children: [
      { label: 'About', key: 'nav.about', href: '/about/' },
      { label: 'Process', key: 'nav.process', href: '/manufacturing-process/' },
      { label: 'Quality', key: 'nav.quality', href: '/quality-control/' },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Blog', href: '/blog/' }
    ]
  },
  { label: 'Contact', key: 'nav.contact', href: '/contact/' }
];

const footerGroups = [
  {
    title: 'Products', key: 'footer.products',
    links: [
      { label: 'Rigid Boxes', href: '/products/rigid-boxes/' },
      { label: 'Magnetic Boxes', href: '/products/magnetic-boxes/' },
      { label: 'Two-Piece Boxes', href: '/products/two-piece-boxes/' },
      { label: 'Drawer Boxes', href: '/products/drawer-boxes/' },
      { label: 'Perfume Packaging', href: '/products/perfume-packaging/' },
      { label: 'Cosmetic Packaging', href: '/products/cosmetic-packaging/' },
      { label: 'Gift Packaging', href: '/products/gift-packaging/' },
      { label: 'All products', href: '/products/' }
    ]
  },
  {
    title: 'Company', key: 'footer.company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Process', href: '/manufacturing-process/' },
      { label: 'Quality Control', href: '/quality-control/' },
      { label: 'Case Studies', href: '/case-studies/' },
      { label: 'Industries', href: '/industries/' },
      { label: 'Solutions', href: '/packaging-solutions/' }
    ]
  },
  {
    title: 'Resources', key: 'footer.resources',
    links: [
      { label: 'Packaging Insights', href: '/blog/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Request a Quote', href: '/request-a-quote/' },
      { label: 'Request a Sample', href: '/request-sample/' },
      { label: 'Sitemap', href: '/sitemap/' }
    ]
  }
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms/' },
  { label: 'Cookie Policy', href: '/cookie-policy/' }
];

/* Legacy URLs -> canonical clean paths, written to _redirects.

   Two things are deliberately NOT in this list, and both used to cause an
   infinite redirect loop (ERR_TOO_MANY_REDIRECTS):

   1. No apex -> www rule. Cloudflare Pages _redirects cannot match on
      hostname — domain-level redirects are unsupported. A rule written as
        https://metapackink.com/*   https://www.metapackink.com/:splat
      is parsed as a plain path pattern that also matches www, with :splat
      resolving to the empty string. The result was `Location: /` on every
      request. Canonicalise the host in the Cloudflare dashboard instead
      (Rules -> Redirect Rules), not here.

   2. No /foo.html -> /foo/ rules. This site is deployed as directory-style
      output (about/index.html, with no about.html at the root), and
      Cloudflare Pages already redirects /about.html to /about on its own.
      Adding our own rule for the same path risks the two fighting. */
const redirects = [
  /* The previous sitemap advertised these bare URLs — fold them into the
     nested industry paths. These are real 404s otherwise. */
  ['/industries-cosmetics/', '/industries/cosmetics/'],
  ['/industries-perfume/', '/industries/perfume/'],
  ['/industries-premium-consumer-products/', '/industries/premium-consumer-products/']
];

module.exports = { site, trade, nav, footerGroups, legalLinks, redirects };
