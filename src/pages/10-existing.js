'use strict';

/* The 13 pages that already existed on the site.
   Their <main> content is carried over unchanged from src/bodies/, with links
   rewritten to clean paths. What is new is everything around it: shared
   header, shared footer, breadcrumbs, OG/Twitter tags, canonical, JSON-LD,
   and a single GA4 property. */

const { carriedPage } = require('../carried');
const { darkCta } = require('../partials');

const HOME = { label: 'Home', href: '/' };

module.exports = [

  carriedPage({
    url: '/',
    body: 'index',
    title: 'Metapackink | Custom Packaging Manufacturer for Premium Brands',
    description:
      'Custom packaging manufacturer in China producing premium rigid boxes, magnetic boxes, perfume packaging, cosmetic packaging and branded presentation packaging developed around your product.',
    ogImage: 'hero-box.webp',
    priority: '1.0',
    breadcrumbs: [HOME]
  }),

  carriedPage({
    url: '/products/',
    body: 'products',
    title: 'Custom Packaging Products | Rigid, Magnetic & Cosmetic Boxes | Metapackink',
    description:
      'Explore custom rigid boxes, magnetic closure boxes, two-piece boxes, drawer boxes, perfume packaging, cosmetic packaging and premium gift packaging from Metapackink.',
    ogImage: 'rigid-boxes-600.webp',
    priority: '0.9',
    breadcrumbs: [HOME, { label: 'Products', href: '/products/' }],
    faq: [
      {
        q: 'What is the minimum order quantity for custom packaging?',
        a: 'It depends on the structure rather than a single company-wide figure. Rigid and magnetic boxes typically start in the low hundreds of pieces; simpler structures can go lower. Small trial runs are often possible on standard structures, and we will tell you plainly when a quantity is not economical rather than quoting it as though it were.'
      },
      {
        q: 'Can you produce packaging from my product dimensions?',
        a: 'Yes — that is the normal starting point. Send the product dimensions and weight, and we will develop the box structure, internal clearance, insert and board thickness around it, then confirm the product actually fits before anything is quoted.'
      },
      {
        q: 'Which structures do you manufacture?',
        a: 'Rigid boxes, magnetic closure boxes, two-piece rigid boxes, drawer boxes, and the perfume, cosmetic, gift and premium presentation packaging built from them, plus supporting items such as paper bags and wrapping paper.'
      },
      {
        q: 'Do you provide samples before production?',
        a: 'Yes. A physical sample is produced for your written approval before every production run, and it becomes the reference the production line is measured against.'
      }
    ]
  }),

  carriedPage({
    url: '/packaging-solutions/',
    body: 'packaging-solutions',
    title: 'Custom Packaging Solutions & Manufacturing Process | Metapackink',
    description:
      'A complete custom packaging workflow: structural development, materials, finishing, artwork, prototyping, mass production and quality control, coordinated around your product.',
    ogImage: 'hero-box.webp',
    priority: '0.9',
    breadcrumbs: [HOME, { label: 'Solutions', href: '/packaging-solutions/' }]
  }),

  carriedPage({
    url: '/industries/',
    body: 'industries',
    title: 'Packaging by Industry | Beauty, Fragrance & Premium Products | Metapackink',
    description:
      'Custom packaging developed for cosmetics and beauty, perfume and fragrance, premium consumer products, gifting, retail and branded product companies.',
    ogImage: 'cosmetic-packaging-600.webp',
    priority: '0.8',
    breadcrumbs: [HOME, { label: 'Industries', href: '/industries/' }],
    heroEyebrow: 'INDUSTRIES',
    heroHeading: 'Packaging for the sector your product sells into',
    heroLead:
      'Different sectors buy packaging for different reasons. Cosmetics has to survive travel and read well on a shelf, fragrance has to hold a bottle precisely, and gifting has to be kept rather than thrown away. These pages cover what changes in each case.'
  }),

  carriedPage({
    url: '/industries/cosmetics/',
    body: 'ind-cosmetics',
    title: 'Custom Cosmetic Packaging for Beauty Brands | Metapackink',
    description:
      'Custom cosmetic packaging for beauty, skincare, makeup and personal-care brands: rigid boxes, magnetic boxes, drawer boxes, materials and premium finishing.',
    ogImage: 'cosmetic-packaging-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Industries', href: '/industries/' }, { label: 'Cosmetics & Beauty', href: '/industries/cosmetics/' }],
    heroEyebrow: 'COSMETICS & BEAUTY',
    heroHeading: 'Custom cosmetic packaging for beauty brands',
    heroLead:
      'Packaging for skincare, makeup, personal-care and beauty gift sets — developed around the product it holds, the shelf it sits on and the journey it has to survive.'
  }),

  carriedPage({
    url: '/industries/perfume/',
    body: 'ind-perfume',
    title: 'Custom Perfume & Fragrance Packaging | Metapackink',
    description:
      'Custom perfume packaging built around bottle dimensions and brand presentation: rigid and magnetic fragrance boxes, inserts, materials and premium finishing.',
    ogImage: 'perfume-packaging-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Industries', href: '/industries/' }, { label: 'Perfume & Fragrance', href: '/industries/perfume/' }],
    heroEyebrow: 'PERFUME & FRAGRANCE',
    heroHeading: 'Custom perfume and fragrance packaging',
    heroLead:
      'Fragrance packaging starts from the bottle. Dimensions, weight and where the cap sits determine the structure, the insert and the clearance long before artwork is considered.'
  }),

  carriedPage({
    url: '/industries/premium-consumer-products/',
    body: 'ind-premium-consumer-products',
    title: 'Premium Consumer Product Packaging | Metapackink',
    description:
      'Premium packaging for consumer products that need a stronger presentation experience, including branded retail products, premium gifts and specialty products.',
    ogImage: 'rigid-boxes-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Industries', href: '/industries/' }, { label: 'Premium Consumer Products', href: '/industries/premium-consumer-products/' }],
    heroEyebrow: 'PREMIUM CONSUMER PRODUCTS',
    heroHeading: 'Packaging for premium consumer products',
    heroLead:
      'For products where a standard retail carton would undersell what is inside it — specialty goods, premium retail ranges and branded collections.'
  }),

  carriedPage({
    url: '/about/',
    body: 'about',
    title: 'About Metapackink | Custom Packaging Manufacturer in Guangzhou',
    description:
      'Metapackink is a China-based custom packaging manufacturer producing premium rigid boxes, magnetic boxes, perfume and cosmetic packaging for international brands.',
    ogImage: 'hero-box.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'About', href: '/about/' }],
    heroEyebrow: 'ABOUT METAPACKINK',
    heroHeading: 'A custom packaging manufacturer in Guangzhou',
    heroLead:
      'Metapackink produces premium paper-based packaging — rigid boxes, magnetic boxes, drawer boxes and the perfume, cosmetic and gift packaging built from them — for brands buying from outside China.'
  }),

  carriedPage({
    url: '/manufacturing-process/',
    body: 'manufacturing-process',
    title: 'Manufacturing Process | From Brief to Shipment | Metapackink',
    description:
      'How a custom packaging project moves from requirements and structural development through materials, sampling, production, printing, finishing, QC and shipment.',
    ogImage: 'rigid-boxes-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Process', href: '/manufacturing-process/' }],
    heroEyebrow: 'MANUFACTURING PROCESS',
    heroHeading: 'From your brief to a shipped box',
    heroLead:
      'Ten stages, in the order they actually happen. Knowing where a project is — and what has to be signed off before the next stage starts — is what keeps a packaging order on schedule.'
  }),

  carriedPage({
    url: '/quality-control/',
    body: 'quality-control',
    title: 'Quality Control & Inspection | Custom Packaging | Metapackink',
    description:
      'How packaging quality is checked: dimensions, materials, printing, finishing, structure and assembly, with sample approval and pre-shipment final inspection.',
    ogImage: 'rigid-boxes-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Quality Control', href: '/quality-control/' }],
    heroEyebrow: 'QUALITY CONTROL',
    heroHeading: 'What gets checked, and when',
    heroLead:
      'Quality is decided by the specification, not by the final inspection. These are the points we check, from the approved sample through to the pre-shipment audit.'
  }),

  carriedPage({
    url: '/blog/',
    body: 'blog',
    title: 'Packaging Insights | Guides for Packaging Buyers | Metapackink',
    description:
      'Buyer-focused guides on packaging manufacturing, rigid and magnetic box structures, perfume and cosmetic packaging, quality control and sourcing from China.',
    ogImage: 'hero-box.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Blog', href: '/blog/' }],
    heroEyebrow: 'PACKAGING INSIGHTS',
    heroHeading: 'Guides for people buying packaging',
    heroLead:
      'Practical writing on structures, materials, sampling, quality control and sourcing custom packaging from China — written for buyers rather than for designers.'
  }),

  carriedPage({
    url: '/case-studies/',
    body: 'case-studies',
    title: 'Packaging Case Studies | Project Examples | Metapackink',
    description:
      'How custom packaging projects are specified and produced: structure, dimensions, materials, printing, finishing, interior configuration, sampling and quality control.',
    ogImage: 'magnetic-boxes-600.webp',
    priority: '0.7',
    breadcrumbs: [HOME, { label: 'Case Studies', href: '/case-studies/' }],
    heroEyebrow: 'CASE STUDIES',
    heroHeading: 'How packaging projects come together',
    heroLead:
      'What a real packaging brief contains, how the structure is decided, and what gets specified before a production run is approved.'
  })

];
