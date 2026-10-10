'use strict';

/* Shared layout: <head>, header, floating contact panel, footer.
   This is the single source of truth for site chrome. The markup and class
   names are copied from the existing pages so style.css applies unchanged, and
   every data-i18n key is one that main.js already defines — otherwise the
   language switcher would blank the label out. */

const { site, nav, footerGroups, legalLinks } = require('./config');

const esc = (s) =>
  String(s).replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/"/g, '&quot;');

/* Depth of a clean URL: '/about/' -> 1, '/industries/cosmetics/' -> 2. */
function depthOf(url) {
  if (url === '/' || url === '') return 0;
  return url.replace(/\/$/, '').split('/').filter(Boolean).length;
}

/* Convert a site-absolute clean path into a relative path for this page.
   Cloudflare Pages serves /about/ from about.html, so a link to /about/ from
   the root is written as './about/' and from /industries/cosmetics/ as '../../about/'.
   Because the site is served as static files, './about/' resolves to the file
   about.html only if the host does extensionless lookup — Cloudflare Pages does.
   For maximum portability we emit the directory form, which the host maps. */
function rel(target, fromUrl) {
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(target)) return target;
  const depth = depthOf(fromUrl);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const clean = target.replace(/^\//, '');
  return prefix + clean;
}

/* Links to an extensionless path need a trailing slash so browsers and the host
   treat it as a directory rather than a file. */
function navHref(target, fromUrl) {
  return rel(target, fromUrl);
}

/* Version stamped onto stylesheet and script URLs. tools/build.js sets it once
   per build from a hash of those files' contents; it stays empty when this
   module is used outside the build, in which case plain paths are emitted. */
let ASSET_VERSION = '';

function setAssetVersion(v) {
  ASSET_VERSION = v ? String(v) : '';
}

function asset(path, fromUrl) {
  const depth = depthOf(fromUrl);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const clean = path.replace(/^\//, '');
  const out = prefix + clean;

  /* style.css, main.js and friends are served `immutable` for a year. That is
     the right cache setting, but on its own it means a redeploy hands visitors
     new HTML together with a stylesheet the browser refuses to re-check — a
     page that looks half-updated and is very hard to explain. The query string
     gives every changed file a new URL, so long caching stays safe and a
     redeploy is picked up on the next load.
     Images are deliberately left alone: they are not rewritten on every build,
     and hashing them would only force needless refetches. */
  return ASSET_VERSION && /\.(css|js)$/.test(clean)
    ? out + '?v=' + ASSET_VERSION
    : out;
}

/* ------------------------------------------------------------------ *
 * head
 * ------------------------------------------------------------------ */
function renderHead(page) {
  const u = page.url;
  const canonical = site.domain + (u === '/' ? '/' : u);
  const ogImage = site.domain + '/img/' + (page.ogImage || 'hero-box.webp');
  const desc = page.description || '';

  const jsonLd = [];
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: 'Metapackink',
    url: site.domain + '/',
    logo: site.domain + '/img/hero-box.webp',
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.addressLine1,
      addressLocality: 'Guangzhou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN'
    },
    sameAs: site.social.map((s) => s.url)
  });

  if (page.breadcrumbs && page.breadcrumbs.length > 1) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.label.replace(/&amp;/g, '&'),
        item: site.domain + b.href
      }))
    });
  }

  if (page.faq && page.faq.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  /* Articles. BlogPosting for the blog, Article for a case study — the two
     differ only in how a search engine files them, but saying "BlogPosting"
     about a project note is simply wrong. `image` is omitted rather than
     pointed at a default, because a shared placeholder logo as an article's
     image is worse than no image at all: it is what gets shown in the rich
     result. */
  if (page.article) {
    const a = page.article;
    const node = {
      '@context': 'https://schema.org',
      '@type': a.type || 'BlogPosting',
      headline: a.headline,
      description: a.description,
      datePublished: a.datePublished,
      dateModified: a.dateModified || a.datePublished,
      author: { '@type': 'Organization', name: site.legalName, url: site.domain + '/' },
      publisher: {
        '@type': 'Organization',
        name: site.legalName,
        logo: { '@type': 'ImageObject', url: site.domain + '/img/hero-box.webp' }
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': site.domain + page.url }
    };
    if (a.section) node.articleSection = a.section;
    if (a.image) node.image = [site.domain + '/img/' + a.image];
    jsonLd.push(node);
  }

  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${esc(page.title)}</title>
<meta name="description" content="${esc(desc)}">

<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<link rel="icon" href="${asset('/img/favicon.svg', u)}" type="image/svg+xml">

<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="Metapackink">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImage}">

${page.noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}${jsonLd
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`)
    .join('\n')}

<link rel="stylesheet" href="${asset('/style.css', u)}">
<link rel="stylesheet" href="${asset('/css/style-additions.css', u)}">

<script async src="https://www.googletagmanager.com/gtag/js?id=${site.ga4}"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${site.ga4}');
</script>
</head>`;
}

/* ------------------------------------------------------------------ *
 * header
 * ------------------------------------------------------------------ */
function renderHeader(page) {
  const u = page.url;
  const isActive = (href) => {
    if (href === '/') return u === '/';
    return u === href || u.startsWith(href);
  };

  const items = nav
    .map((item) => {
      const active = isActive(item.href) ? ' class="active"' : '';
      const i18n = item.key ? ` data-i18n="${item.key}"` : '';

      if (!item.children) {
        return `<a href="${navHref(item.href, u)}"${active}${i18n}>${item.label}</a>`;
      }

      const groupActive = item.children.some((c) => isActive(c.href));
      const sub = item.children
        .map((c) => {
          const ca = u === c.href ? ' class="active"' : '';
          const ci = c.key ? ` data-i18n="${c.key}"` : '';
          return `<a href="${navHref(c.href, u)}"${ca}${ci}>${c.label}</a>`;
        })
        .join('\n');
      return `<div class="nav-group">
<a href="${navHref(item.href, u)}" class="nav-group-label${groupActive ? ' active' : ''}"${i18n}>${item.label}</a>
<div class="nav-submenu">
${sub}
</div>
</div>`;
    })
    .join('\n');

  return `<header class="site-header">

<div class="container nav">

<a href="${navHref('/', u)}" class="logo" aria-label="Home">
${site.brandHtml}
</a>

<nav>
${items}
</nav>

<div class="nav-controls">
<div class="lang-switcher" aria-label="Language switcher">
    <button type="button" class="lang-toggle" aria-expanded="false" aria-label="Select language">
        <span class="lang-current">EN</span>
    </button>
    <div class="lang-menu" role="menu">
        <button type="button" class="lang-option is-active" data-lang="en" aria-pressed="true">English</button>
        <button type="button" class="lang-option" data-lang="fr" aria-pressed="false">Français</button>
        <button type="button" class="lang-option" data-lang="de" aria-pressed="false">Deutsch</button>
        <button type="button" class="lang-option" data-lang="ar" aria-pressed="false">العربية</button>
    </div>
</div>

<a href="${navHref('/contact/', u)}" class="nav-btn" data-i18n="nav.quote">
Get a Quote
</a>
</div>

</div>

</header>`;
}

/* ------------------------------------------------------------------ *
 * floating contact
 * ------------------------------------------------------------------ */
function renderFloating(page) {
  const u = page.url;
  return `<aside class="floating-contact" aria-label="Contact us" data-i18n-attr="aria-label:floating.contact">
    <span class="floating-tab" data-i18n="floating.whatsapp">WhatsApp</span>
    <h3 class="floating-title" data-i18n="floating.contact">Contact us</h3>
    <div class="floating-item">
        <span class="floating-label" data-i18n="floating.phone">Phone</span>
        <a href="${site.contact.phoneHref}">${site.contact.phoneDisplay}</a>
    </div>
    <div class="floating-item">
        <span class="floating-label" data-i18n="floating.email">Email</span>
        <a href="${site.contact.emailHref}">${site.contact.email}</a>
    </div>
    <div class="floating-item">
        <span class="floating-label" data-i18n="floating.whatsapp">WhatsApp</span>
        <a href="${site.contact.whatsapp}" target="_blank" rel="noopener">${site.contact.whatsappDisplay}</a>
    </div>
    <div class="floating-item floating-qr">
        <span class="floating-label" data-i18n="floating.scan">Scan to WhatsApp</span>
        <img src="${asset('/img/whatsapp-qr.webp', u)}" alt="Scan the QR code to contact us on WhatsApp" width="300" height="300" loading="lazy" decoding="async" data-i18n-attr="alt:floating.qrAlt">
    </div>
</aside>`;
}

/* ------------------------------------------------------------------ *
 * footer
 * ------------------------------------------------------------------ */
function renderFooter(page) {
  const u = page.url;
  const social = site.social
    .map(
      (s) => `<a class="social-link" rel="nofollow noopener" target="_blank" href="${s.url}">
<img src="${asset('/img/' + s.icon, u)}" alt="${s.name}" width="18" height="18" loading="lazy" decoding="async">
</a>`
    )
    .join('\n');

  const groups = footerGroups
    .map(
      (g) => `<div>

<h4 data-i18n="${g.key}">${g.title}</h4>

${g.links.map((l) => `<a href="${navHref(l.href, u)}">${l.label}</a>`).join('\n')}

</div>`
    )
    .join('\n\n');

  const legal = legalLinks
    .map((l) => `<a href="${navHref(l.href, u)}">${l.label}</a>`)
    .join('\n');

  return `<footer>

<div class="container footer-grid">

<div>

<a href="${navHref('/', u)}" class="logo footer-logo" aria-label="Home">
${site.brandHtml}
</a>

<p data-i18n="footer.tagline">
Custom packaging manufacturing
for premium brands.
</p>

<p class="footer-contact">
<a href="${site.contact.phoneHref}">${site.contact.phoneDisplay}</a><br>
<a href="${site.contact.emailHref}">${site.contact.email}</a><br>
${site.contact.addressLine1},<br>${site.contact.addressLine2}
</p>

</div>

${groups}

<div>

<h4 data-i18n="footer.start">Start a Project</h4>

<p data-i18n="footer.description">
Send your packaging requirements
and request a quotation.
</p>

<a href="${navHref('/request-a-quote/', u)}" class="footer-button" data-i18n="footer.button">
Get a Quote
</a>

<div class="social-links" aria-label="Social media links" data-i18n-attr="aria-label:footer.social">
${social}
</div>

</div>

</div>


<div class="footer-bottom">

<div class="container footer-bottom-inner">

<span data-i18n="footer.copy">© 2026 Metapackink. All rights reserved.</span>

<nav class="footer-legal" aria-label="Legal">
${legal}
</nav>

</div>

</div>

</footer>`;
}

/* ------------------------------------------------------------------ *
 * page shell
 * ------------------------------------------------------------------ */
function renderPage(page) {
  const u = page.url;
  const bodyClass = page.bodyClass ? ` class="${page.bodyClass}"` : '';
  const crumbs =
    page.breadcrumbs && page.breadcrumbs.length > 1 && u !== '/'
      ? `\n${renderBreadcrumbs(page)}\n`
      : '';

  return `${renderHead(page)}

<body${bodyClass}>

${renderHeader(page)}

<main>
${crumbs}
${page.content}
</main>

${renderFloating(page)}

${renderFooter(page)}

<script src="${asset('/main.js', u)}"></script>
<script src="${asset('/js/forms.js', u)}" defer></script>

</body>

</html>
`;
}

function renderBreadcrumbs(page) {
  const items = page.breadcrumbs
    .map((b, i) => {
      const last = i === page.breadcrumbs.length - 1;
      if (last) return `<span aria-current="page">${b.label}</span>`;
      return `<a href="${navHref(b.href, page.url)}">${b.label}</a>`;
    })
    .join('<span class="crumb-sep" aria-hidden="true">/</span>');

  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
<div class="container">
${items}
</div>
</nav>`;
}

module.exports = {
  esc,
  rel,
  navHref,
  asset,
  setAssetVersion,
  depthOf,
  renderHead,
  renderHeader,
  renderFloating,
  renderFooter,
  renderPage,
  renderBreadcrumbs
};
