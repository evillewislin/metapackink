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
    hours: 'Monday to Saturday, 09:00 - 18:00 (GMT+8)'
  },

  /* One GA4 property, not two. See README-DEPLOY.md. */
  ga4: 'G-G4VHR7QHGD',

  social: [
    { name: 'Facebook', icon: 'facebook.png', url: 'https://www.facebook.com/people/Guyin-Packaging/' },
    { name: 'Instagram', icon: 'instagram.png', url: 'https://www.instagram.com/gooinpack_guyin/' },
    { name: 'YouTube', icon: 'youtube.png', url: 'https://www.youtube.com/@GooinPack' },
    { name: 'LinkedIn', icon: 'linkedin.png', url: 'https://www.linkedin.com/in/yin-gu-76a75a39b' },
    { name: 'Pinterest', icon: 'pinterest.png', url: 'https://au.pinterest.com/yingu312/_profile/' },
    { name: 'X', icon: 'twitter.png', url: 'https://x.com/Gooinpack' }
  ]
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

module.exports = { site, nav, footerGroups, legalLinks, redirects };
