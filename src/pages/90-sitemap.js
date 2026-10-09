'use strict';

/* HTML sitemap, generated from the real page list at build time.
   Because it is built from the same array that produced every page, it cannot
   go stale — which is exactly what happened to the hand-written sitemap.xml on
   the previous site (it listed /products.html and /packaging-solutions.html
   while the canonical tags on those pages said /products/ and
   /packaging-solutions/, so the two disagreed with each other). */

const { navHref } = require('../layout');
const { darkCta } = require('../partials');

const HOME = { label: 'Home', href: '/' };

/* Top-level URL segment -> group heading, in the order they should appear. */
const GROUPS = [
  { title: 'Main pages', segments: [''] },
  { title: 'Products', segments: ['products'] },
  { title: 'Industries', segments: ['industries'] },
  { title: 'Solutions and company', segments: ['packaging-solutions', 'about', 'manufacturing-process', 'quality-control'] },
  { title: 'Case studies and insights', segments: ['case-studies', 'blog'] },
  { title: 'Get in touch', segments: ['request-a-quote', 'request-sample', 'contact'] },
  { title: 'Legal and site', segments: ['faq', 'privacy-policy', 'terms', 'cookie-policy', 'sitemap'] }
];

module.exports = function sitemapPage(pages) {
  const visible = pages.filter((p) => !p.noindex && p.url !== '/sitemap/');

  const segmentOf = (p) => p.url.split('/').filter(Boolean)[0] || '';

  const labelFor = (p) => {
    if (p.url === '/') return 'Home';
    if (p.breadcrumbs && p.breadcrumbs.length > 1) {
      return p.breadcrumbs[p.breadcrumbs.length - 1].label;
    }
    return p.title.split('|')[0].trim();
  };

  const sections = GROUPS.map((g) => {
    const items = visible
      .filter((p) => g.segments.indexOf(segmentOf(p)) !== -1)
      .sort((a, b) => {
        if (a.url === '/') return -1;
        if (b.url === '/') return 1;
        return a.url.localeCompare(b.url);
      });

    if (!items.length) return '';

    return `<section class="section">

<div class="container">

<h2>${g.title}</h2>

<ul class="sitemap-list">
${items
  .map(
    (p) => `<li><a href="${navHref(p.url, '/sitemap/')}">${labelFor(p)}</a><span class="sitemap-url">${p.url}</span></li>`
  )
  .join('\n')}
</ul>

</div>

</section>`;
  })
    .filter(Boolean)
    .join('\n\n');

  return {
    url: '/sitemap/',
    title: 'Sitemap | Metapackink',
    description: 'Every page on the Metapackink website: products, industries, capabilities, resources, legal documents and contact.',
    ogImage: 'hero-box.webp',
    priority: '0.4',
    breadcrumbs: [HOME, { label: 'Sitemap', href: '/sitemap/' }],

    content: `
<section class="page-hero">

<div class="container">

<div class="eyebrow">SITEMAP</div>

<h1>Every page on this site.</h1>

<p>${visible.length} pages, grouped by what they are for. Generated from the site itself, so it is always current.</p>

</div>

</section>

${sections}
`
  };
};
