'use strict';

/* Build helper for pages whose <main> body is carried over verbatim from the
   previous site. Four things are rewritten on the way through:

     1. internal links       -> clean trailing-slash paths that match canonical
     2. asset references     -> depth-correct relative paths
     3. legacy mp-* classes  -> the unified design system's equivalents
     4. the old floating-contact / footer markup is dropped (it is generated
        once in src/layout.js now)

   The body text itself is never touched. That is deliberate: the copy was
   written against real manufacturing detail and paraphrasing it would only
   make it worse. */

const fs = require('fs');
const path = require('path');

const BODIES = path.join(__dirname, 'bodies');

/* Old file-based href -> canonical clean path. */
const LINK_MAP = [
  ['index.html', '/'],
  ['products.html', '/products/'],
  ['packaging-solutions.html', '/packaging-solutions/'],
  ['industries.html', '/industries/'],
  ['industries/cosmetics.html', '/industries/cosmetics/'],
  ['industries/perfume.html', '/industries/perfume/'],
  ['industries/premium-consumer-products.html', '/industries/premium-consumer-products/'],
  ['industries/gift-presentation.html', '/industries/gift-presentation/'],
  ['industries/retail-branded.html', '/industries/retail-branded/'],
  ['about.html', '/about/'],
  ['manufacturing-process.html', '/manufacturing-process/'],
  ['quality-control.html', '/quality-control/'],
  ['blog.html', '/blog/'],
  ['case-studies.html', '/case-studies/'],
  ['contact.html', '/contact/']
];

/* In-page anchors on the old pages -> the new product detail pages.
   On the old site `products.html#rigid-boxes` was the only "product page"
   there was; each of these now resolves to a real URL. */
const ANCHOR_MAP = {
  'products.html#rigid-boxes': '/products/rigid-boxes/',
  'products.html#magnetic-boxes': '/products/magnetic-boxes/',
  'products.html#two-piece': '/products/two-piece-boxes/',
  'products.html#drawer-boxes': '/products/drawer-boxes/',
  'products.html#perfume': '/products/perfume-packaging/',
  'products.html#cosmetic': '/products/cosmetic-packaging/',
  'products.html#gift-packaging': '/products/gift-packaging/'
};

/* The three nested industry pages and the company/quality/blog pages use a
   second, inline-styled template (mp-* classes). Those are mapped onto the
   unified design system so the whole site finally looks like one site
   instead of two. Order matters: the longest prefixes are replaced first. */
const CLASS_MAP = [
  ['class="mp-section"', 'class="section"'],
  ['class="mp-wrap"', 'class="container"'],
  ['class="mp-num"', 'class="feature-number"'],
  ['class="mp-step"', 'class="process-step"'],
  ['class="mp-grid"', 'class="features-grid"'],
  ['class="mp-card"', 'class="feature-card"'],
  ['class="mp-hero"', 'class="page-hero"'],
  ['class="mp-lead"', 'class="page-lead"'],
  ['class="mp-eyebrow"', 'class="eyebrow"'],
  ['class="mp-cta"', 'class="dark-cta"'],
  ['class="mp-btn"', 'class="btn btn-light"']
];

/* Inline styles that the old inline-styled template relied on. They are
   replaced with the structural class the design system already uses, so the
   layout no longer depends on a one-off style attribute. */
const STYLE_FIXES = [
  [/<article class="mp-card"( style="[^"]*")?>/g, '<article class="feature-card">'],
  [/<p style="margin-top:18px">/g, '<p class="card-action">'],
  [/<section class="mp-section">/g, '<section class="section">'],
  [/<div class="mp-step">/g, '<div class="process-step">'],
  [/<div class="mp-num">/g, '<div class="feature-number">']
];

/* A card grid on the old pages was a flat run of <article> siblings; the new
   .features-grid is a CSS grid and needs them grouped, which they already are
   inside the container, so no structural change is needed. */

function rewriteClassNames(html) {
  let out = html;
  for (const [from, to] of CLASS_MAP) {
    out = out.split(from).join(to);
  }
  for (const [re, to] of STYLE_FIXES) {
    out = out.replace(re, to);
  }
  return out;
}

/* Rewrite every href/src/srcset so it resolves from the page's own URL.
   Before this, carried bodies emitted bare paths like `img/hero-box.webp`,
   which resolve from `/` but break from `/products/` and deeper. */
function rewriteAssets(html, url, asset) {
  /* src / href on their own */
  let out = html.replace(/(\s(?:src|href)\s*=\s*")([^"]+)(")/g, (m, pre, v, post) => {
    if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/|\/)/i.test(v)) return m;
    if (!/^(\.\.?\/)?(img|css|js)\//.test(v)) return m;
    const clean = v.replace(/^(\.\.?\/)+/, '');
    return pre + asset('/' + clean, url) + post;
  });

  /* srcset: "a.webp 440w, b.webp 600w" */
  out = out.replace(/(\ssrcset\s*=\s*")([^"]+)(")/g, (m, pre, v, post) => {
    const parts = v.split(',').map((entry) => {
      const t = entry.trim();
      if (!t) return t;
      const bits = t.split(/\s+/);
      const ref = bits[0];
      if (/^(https?:|\/\/|\/)/i.test(ref)) return t;
      const clean = ref.replace(/^(\.\.?\/)+/, '');
      return [asset('/' + clean, url)].concat(bits.slice(1)).join(' ');
    });
    return pre + parts.join(', ') + post;
  });

  return out;
}

function rewriteLinks(html, url, navHref) {
  let out = html;

  /* product anchors first — they are the most specific form */
  for (const [anchor, target] of Object.entries(ANCHOR_MAP)) {
    out = out.split(`href="${anchor}"`).join(`href="${navHref(target, url)}"`);
  }

  /* file links become clean paths */
  for (const [from, to] of LINK_MAP) {
    out = out.split(`href="${from}"`).join(`href="${navHref(to, url)}"`);
    /* nested pages wrote ../foo.html */
    out = out.split(`href="../${from}"`).join(`href="${navHref(to, url)}"`);
    out = out.split(`href="../../${from}"`).join(`href="${navHref(to, url)}"`);
  }

  /* The old brand's address used to be rewritten here. It is not any more:
     rewriting it meant a body file could carry a dead address and the build
     would silently paper over it. checkPublishedFacts() in tools/build.js now
     fails on any published address that is not site.contact.email, which only
     works while this function leaves addresses alone. */

  return out;
}

/* Remove the old floating-contact panel and footer if a body still carries them. */
function stripSiteChrome(html) {
  return html
    .replace(/<aside class="floating-contact"[\s\S]*?<\/aside>/g, '')
    .replace(/<footer[\s\S]*?<\/footer>/g, '')
    .trim();
}

/* Nine of the carried bodies had no <h1> at all — those pages went straight
   from the navigation into a wall of cards, which is bad for both search and
   screen readers. When a body has no h1, prepend a real page hero built from
   the page's own title/breadcrumb so the heading matches the <title>. */
function ensureHero(html, o) {
  if (/<h1[\s>]/i.test(html)) return html;

  const crumbs = o.breadcrumbs || [];
  const last = crumbs.length ? crumbs[crumbs.length - 1].label : '';
  const heading = o.heroHeading || last || o.title.split('|')[0].trim();
  const lead = o.heroLead || o.description || '';
  const eyebrow = o.heroEyebrow || '';

  return `<section class="page-hero">

<div class="container">

${eyebrow ? `<div class="eyebrow">${eyebrow}</div>\n\n` : ''}<h1>${heading}</h1>

<p>${lead}</p>

</div>

</section>

${html}`;
}

function loadBody(name) {
  return fs.readFileSync(path.join(BODIES, name + '.html'), 'utf8');
}

/**
 * Build a page whose body comes from src/bodies/<name>.html.
 * @param {object} o
 * @param {string} o.body   file name stem in src/bodies
 * @param {string} o.url    the page's clean URL, used to resolve depth
 */
function carriedPage(o) {
  const { navHref, asset } = require('./layout');
  let content = loadBody(o.body);
  content = stripSiteChrome(content);
  content = rewriteClassNames(content);
  content = rewriteLinks(content, o.url, navHref);
  content = rewriteAssets(content, o.url, asset);
  content = ensureHero(content, o);

  const page = Object.assign({}, o, { content });
  delete page.body;
  return page;
}

module.exports = {
  carriedPage, loadBody, rewriteLinks, rewriteClassNames, rewriteAssets,
  stripSiteChrome, ensureHero,
  LINK_MAP, ANCHOR_MAP, CLASS_MAP
};
