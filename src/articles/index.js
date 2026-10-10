'use strict';

/* The article system.
 *
 * Blog posts and case studies are the same object with different furniture
 * around it, so they share one builder rather than two that drift. A
 * collection lives in src/articles/<key>.js as a plain array of data, and its
 * long-form body lives in src/articles/bodies/<slug>.html — kept out of the
 * data file because a 1,500-word guide inside a JavaScript template literal is
 * miserable to edit and impossible to diff.
 *
 * Three things are derived rather than stored, because a hand-maintained copy
 * of a derived value is a value that goes wrong quietly:
 *
 *   reading time       counted from the body, not typed into the entry
 *   table of contents  read out of the body's own <h2 id="..."> elements
 *   related articles   chosen from the catalogue unless the entry names its own
 *
 * What is deliberately NOT derivable is checked instead: see checkArticles()
 * in tools/build.js, which fails the build when a published entry has no body,
 * when a thumbnail it names is not in img/, when a related slug does not exist,
 * or when a planned entry is linked from somewhere.
 *
 * `planned: true` marks an article that is scheduled and titled but not yet
 * written. Planned entries produce no page and never appear in a list, so the
 * site can be deployed at any moment without a dead link. */

const fs = require('fs');
const path = require('path');
const { navHref } = require('../layout');
const { toc, relatedSection, darkCta } = require('../partials');
const { site } = require('../config');

const BODIES = path.join(__dirname, 'bodies');
const HOME = { label: 'Home', href: '/' };

/* Average adult reading speed for non-fiction. Used only to turn a word count
   into a rough promise, so the exact figure does not matter — but it must be
   the same figure for every article, which is why it is not per-entry. */
const WORDS_PER_MINUTE = 220;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/* How each collection presents itself. Everything that differs between the two
   lives here, so the builders below contain no `if (key === 'blog')`. */
const COLLECTIONS = {
  blog: {
    key: 'blog',
    url: '/blog/',
    label: 'Blog',
    eyebrow: 'PACKAGING INSIGHTS',
    h1: 'Packaging guides, written from the factory floor',
    lead:
      'How structures are chosen, how materials are specified, what sampling really involves and what a fair quotation should contain. Written for buyers sourcing custom packaging, not for search engines.',
    metaTitle: 'Custom Packaging Guides & Manufacturing Insights | Metapackink',
    metaDesc:
      'Practical guides to custom packaging: rigid box construction, magnetic closures, perfume and cosmetic packaging, materials, sampling, quality control and sourcing from China.',
    listHeading: 'All guides',
    noun: 'guide',
    emptyNote:
      'New guides are published as they are finished. In the meantime, the fastest route to a useful answer is to send us the product and the quantity.',
    relatedHeading: 'Related reading',
    cta: {
      heading: 'Have a structure in mind?',
      text:
        'Send the product dimensions, the quantity and whatever packaging reference you are working from. We will come back with a structure and an indicative price.',
      button: 'Request a quote',
      href: '/request-a-quote/'
    },
    links: [
      { title: 'All products', text: 'Compare every structure we manufacture.', href: '/products/' },
      { title: 'Packaging solutions', text: 'How a project moves from brief to production.', href: '/packaging-solutions/' },
      { title: 'Request a sample', text: 'See and feel the structure before committing.', href: '/request-sample/' }
    ]
  },

  'case-studies': {
    key: 'case-studies',
    url: '/case-studies/',
    label: 'Case Studies',
    eyebrow: 'PROJECT NOTES',
    h1: 'Projects, and what actually decided them',
    lead:
      'Each note covers one brief: the product, the structure chosen, the dimensions and materials, the interior, the finishing, and the constraint that shaped the decision. Written so the reasoning is reusable on your own project.',
    metaTitle: 'Custom Packaging Case Studies | Structure & Material Decisions | Metapackink',
    metaDesc:
      'Custom packaging case studies: the product, the structure chosen, dimensions, materials, interior fitment, finishing, tooling and quality control for each project.',
    listHeading: 'All projects',
    noun: 'case study',
    emptyNote:
      'More project notes are being written up. If you want to see work close to your own product, ask and we will send the closest example we have.',
    relatedHeading: 'More projects',
    cta: {
      heading: 'Want this looked at for your product?',
      text:
        'Send the product dimensions and the quantity. We will tell you which structure suits it and where the constraint on your project is likely to sit.',
      button: 'Request a quote',
      href: '/request-a-quote/'
    },
    links: [
      { title: 'Quality control', text: 'How a specification is held through production.', href: '/quality-control/' },
      { title: 'Manufacturing process', text: 'Brief to shipment, stage by stage.', href: '/manufacturing-process/' },
      { title: 'All products', text: 'The structures these projects are built from.', href: '/products/' }
    ]
  }
};

/* ------------------------------------------------------------------ *
 * catalogue
 * ------------------------------------------------------------------ */

function catalogue(key) {
  const col = COLLECTIONS[key];
  if (!col) {
    throw new Error(
      `unknown article collection "${key}". Known collections: ` +
      Object.keys(COLLECTIONS).join(', ')
    );
  }
  const file = path.join(__dirname, key + '.js');
  if (!fs.existsSync(file)) {
    throw new Error(`src/articles/${key}.js is missing, so ${col.url} has nothing to list`);
  }
  return { col, entries: require(file) };
}

/** Every collection, for the build's cross-checking. */
function allCollections() {
  return Object.keys(COLLECTIONS).map((key) => catalogue(key));
}

const isPublished = (entry) => !entry.planned;
const published = (entries) => entries.filter(isPublished);
const articleUrl = (entry, col) => col.url + entry.slug + '/';
const imageFor = (entry) => (entry.img ? entry.img : null);

/* ------------------------------------------------------------------ *
 * derived values
 * ------------------------------------------------------------------ */

/** Dates are typed by hand into the catalogue, so a malformed one fails here
 *  rather than rendering "NaN undefined NaN" into a byline and the sitemap. */
function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) throw new Error(`article date must be YYYY-MM-DD, got "${iso}"`);
  const month = Number(m[2]);
  if (month < 1 || month > 12) throw new Error(`article date "${iso}" has no such month`);
  return `${Number(m[3])} ${MONTHS[month - 1]} ${m[1]}`;
}

function wordCount(html) {
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Rounded up, and never "0 min read" on a short note. */
const readingMinutes = (body) => Math.max(1, Math.round(wordCount(body) / WORDS_PER_MINUTE));

/** The table of contents, read out of the body itself.
 *
 *  A <h2> without an id would produce a link to "#" that scrolls nowhere, and
 *  nothing downstream would complain, so it is an error here. */
function extractToc(body) {
  return [...String(body).matchAll(/<h2([^>]*)>([\s\S]*?)<\/h2>/g)].map((m) => {
    const id = /\bid="([^"]+)"/.exec(m[1]);
    const label = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!id) {
      throw new Error(
        `an article <h2> has no id, so it cannot be linked or listed in the ` +
        `table of contents: "${label.slice(0, 60)}"`
      );
    }
    return { id: id[1], label };
  });
}

function loadBody(entry) {
  const name = entry.body || entry.slug;
  const file = path.join(BODIES, name + '.html');
  if (!fs.existsSync(file)) {
    throw new Error(
      `src/articles/bodies/${name}.html is missing, but the article ` +
      `"${entry.slug}" claims it as its body`
    );
  }
  return fs.readFileSync(file, 'utf8').trim();
}

/** Same category first, then whatever else exists, capped at three. */
function relatedEntries(entry, col, entries) {
  const others = published(entries).filter((e) => e.slug !== entry.slug);

  if (Array.isArray(entry.related)) {
    return entry.related.map((slug) => {
      const found = others.find((e) => e.slug === slug);
      if (!found) {
        throw new Error(
          `"${entry.slug}" lists related article "${slug}", which is not a ` +
          `published article in ${col.url}`
        );
      }
      return found;
    });
  }

  const same = others.filter((e) => e.category === entry.category);
  const rest = others.filter((e) => e.category !== entry.category);
  return same.concat(rest).slice(0, 3);
}

/* A breadcrumb label spanning three lines on a phone is worse than a shortened
   one, and the JSON-LD BreadcrumbList is built from the same value, so the two
   cannot disagree about what the crumb says. */
function crumbLabel(title) {
  return title.length > 52 ? title.slice(0, 51).replace(/\s+\S*$/, '') + '…' : title;
}

/* ------------------------------------------------------------------ *
 * markup
 * ------------------------------------------------------------------ */

/* The image half of a card. When an article has no photograph yet the tile is
   still a deliberate piece of design — the category set in the brand's eyebrow
   type on the light surface — rather than a grey rectangle or a broken image,
   so a list is presentable whether or not the photography exists yet. */
function cardMedia(entry, href, fromUrl) {
  const img = imageFor(entry);

  return `<a class="post-card-media" href="${href}" tabindex="-1" aria-hidden="true">${
    img
      ? `\n<img src="${navHref('/img/' + img, fromUrl)}" alt="${entry.imgAlt || entry.title}" width="1600" height="900" loading="lazy" decoding="async">`
      : `\n<span class="post-card-plate">${entry.category}</span>`
  }
</a>`;
}

function postCard(entry, col, fromUrl) {
  const href = navHref(articleUrl(entry, col), fromUrl);

  return `<article class="post-card">

${cardMedia(entry, href, fromUrl)}

<div class="post-card-body">

<p class="post-card-meta"><span class="post-card-category">${entry.category}</span><time datetime="${entry.date}">${formatDate(entry.date)}</time></p>

<h3 class="post-card-title"><a href="${href}">${entry.title}</a></h3>

<p class="post-card-excerpt">${entry.excerpt}</p>

<span class="post-card-more">Read the ${col.noun} →</span>

</div>

</article>`;
}

/* The site's FAQ component is a <details>/<summary> accordion, not a definition
   list — .faq-item styles the summary's +/– marker, so a <dl> here would render
   as unstyled text. Kept in step with faqBlock() in src/industry-blocks.js. */
function faqList(entry) {
  if (!entry.faq || !entry.faq.length) return '';
  return `<section class="article-faq">

<h2>Questions this raises</h2>

<div class="faq-list">
${entry.faq
    .map(
      (f) => `<details class="faq-item">
<summary>${f.q}</summary>
<div class="faq-answer"><p>${f.a}</p></div>
</details>`
    )
    .join('\n')}
</div>

</section>`;
}

/* Long-form content is where a reader is most convinced and furthest from a
   form, so the enquiry rail travels down the page with them instead of waiting
   at the bottom. */
function articleAside(fromUrl) {
  return `<aside class="article-aside">

<div class="aside-card">
<h3>Talk to the factory</h3>
<p>Send the product dimensions and the quantity. We will come back with a structure and an indicative price, normally within one business day.</p>
<a class="btn-outline" href="${navHref('/request-a-quote/', fromUrl)}">Request a quote</a>
</div>

<div class="aside-card">
<h3>Written by</h3>
<p>${site.legalName} — a custom packaging manufacturer in Panyu District, Guangzhou, producing rigid, magnetic, perfume and cosmetic packaging.</p>
<a class="aside-link" href="${navHref('/about/', fromUrl)}">About Metapackink →</a>
</div>

</aside>`;
}

/* ------------------------------------------------------------------ *
 * pages
 * ------------------------------------------------------------------ */

function articlePage(entry, col, entries) {
  const url = articleUrl(entry, col);
  const body = loadBody(entry);
  const heads = extractToc(body);
  const minutes = readingMinutes(body);
  const updated = entry.updated || entry.date;
  const img = imageFor(entry);

  const content = `<section class="page-hero article-hero">

<div class="container">

<div class="eyebrow">${entry.category}</div>

<h1>${entry.title}</h1>

<p class="article-byline"><time datetime="${entry.date}">${formatDate(entry.date)}</time><span class="byline-sep" aria-hidden="true">·</span>${minutes} min read</p>

</div>

</section>

<section class="section section-media article-opening">

<div class="container narrow">
${
    img
      ? `<figure class="article-figure">
<img src="${navHref('/img/' + img, url)}" alt="${entry.imgAlt || entry.title}" width="1600" height="900" loading="eager" decoding="async">
</figure>
`
      : ''
  }
<p class="article-lead">${entry.lead || entry.excerpt}</p>

</div>

</section>

${heads.length >= 3 ? toc(heads) : ''}

<section class="section">

<div class="container article-layout">

<div class="article-main">

<div class="prose article-prose">

${body}

</div>

${faqList(entry)}

<p class="article-updated">Last reviewed <time datetime="${updated}">${formatDate(updated)}</time>. Figures in this article are typical rather than quoted — your written quotation is the document that governs.</p>

</div>

${articleAside(url)}

</div>

</section>

${darkCta(navHref(col.cta.href, url), col.cta.heading, col.cta.text, col.cta.button)}

${relatedSection(
    relatedEntries(entry, col, entries).map((r) => ({
      title: r.title,
      text: r.excerpt,
      href: navHref(articleUrl(r, col), url)
    })),
    col.relatedHeading
  )}`;

  return {
    url,
    title: entry.metaTitle || entry.title,
    description: entry.metaDesc || entry.excerpt,
    ogImage: img || undefined,
    priority: entry.priority || '0.6',
    lastmod: updated,
    breadcrumbs: [HOME, { label: col.label, href: col.url }, { label: crumbLabel(entry.title), href: url }],
    faq: entry.faq,
    article: {
      type: col.key === 'case-studies' ? 'Article' : 'BlogPosting',
      headline: entry.title,
      description: entry.metaDesc || entry.excerpt,
      image: img || undefined,
      datePublished: entry.date,
      dateModified: updated,
      section: entry.category
    },
    content
  };
}

function articleListPage(key) {
  const { col, entries } = catalogue(key);
  const live = published(entries);

  const cards = live.length
    ? `<div class="post-list">
${live.map((e) => postCard(e, col, col.url)).join('\n\n')}
</div>`
    : `<p class="post-empty">${col.emptyNote}</p>`;

  const content = `<section class="page-hero">

<div class="container">

<div class="eyebrow">${col.eyebrow}</div>

<h1>${col.h1}</h1>

<p>${col.lead}</p>

</div>

</section>

<section class="section">

<div class="container">

<h2 class="section-heading">${col.listHeading}<span class="section-count">${live.length}</span></h2>

${cards}

</div>

</section>

${darkCta(navHref(col.cta.href, col.url), col.cta.heading, col.cta.text, col.cta.button)}

${relatedSection(col.links.map((l) => Object.assign({}, l, { href: navHref(l.href, col.url) })))}`;

  return {
    url: col.url,
    title: col.metaTitle,
    description: col.metaDesc,
    ogImage: live.length && imageFor(live[0]) ? imageFor(live[0]) : 'hero-box.webp',
    priority: '0.8',
    breadcrumbs: [HOME, { label: col.label, href: col.url }],
    content
  };
}

/** Every page this system produces: the two lists, then each published article. */
function allArticlePages() {
  const pages = [];
  for (const { col, entries } of allCollections()) {
    pages.push(articleListPage(col.key));
    for (const entry of published(entries)) pages.push(articlePage(entry, col, entries));
  }
  return pages;
}

module.exports = {
  COLLECTIONS, allCollections, catalogue, articleListPage, articlePage,
  allArticlePages, formatDate, readingMinutes, extractToc, relatedEntries,
  articleUrl, published, loadBody, isPublished, imageFor, crumbLabel, BODIES
};
