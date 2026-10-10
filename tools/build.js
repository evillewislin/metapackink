#!/usr/bin/env node
'use strict';

/**
 * Metapackink static site builder.
 *
 *   node tools/build.js          write every page to ./dist
 *   node tools/build.js --check  build, then verify links and assets
 *
 * Pages live in src/pages/*.js. Each module exports an array of page objects:
 *
 *   { url, title, description, content, breadcrumbs?, faq?, ogImage?, noindex? }
 *
 * `content` is the HTML between <main> and </main>. The header, footer,
 * floating contact panel and <head> are generated once in src/layout.js, so
 * every page shares one navigation and one footer by construction.
 *
 * Cloudflare Pages serves /about/ from about.html, so `url` uses clean
 * trailing-slash paths and the builder writes them out as .html files.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { site, redirects, flatRoutes } = require('../src/config');
const { renderPage, setAssetVersion } = require('../src/layout');
const { FORM_CONFIGURED, FORM_ENDPOINT } = require('../src/partials');

/* The host the enquiry forms post to, derived from src/config.js rather than
   written out. A policy that names the wrong host does not fail loudly — it
   quietly makes every submission fail in the browser, which is the single
   outage this site cannot absorb. Deriving it means changing the form provider
   cannot leave the policy behind. */
const FORM_HOST = (() => {
  try { return new URL(FORM_ENDPOINT).host; } catch { return ''; }
})();

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PAGES = path.join(ROOT, 'src', 'pages');

/* ------------------------------------------------------------------ *
 * helpers
 * ------------------------------------------------------------------ */

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

function write(rel, contents) {
  const full = path.join(DIST, rel);
  mkdirp(path.dirname(full));
  fs.writeFileSync(full, contents, 'utf8');
  return rel;
}

/* URLs map to directory-style output: '/about/' -> 'about/index.html',
   '/industries/cosmetics/' -> 'industries/cosmetics/index.html', '/' -> 'index.html'.

   Directory-style matters, do not "simplify" this back to about.html at the
   root. If about.html sits at the root, Cloudflare Pages serves /about/ from
   it *and* redirects /about.html to /about — two different rules acting on
   the same file, which is what let the site end up in a redirect loop. With
   about/index.html there is exactly one way to reach the page, so the
   platform's automatic extension-less redirect has nothing to collide with.

   /thank-you/ and /404/ stay flat as thank-you.html and 404.html because
   Cloudflare needs them at the root to find them by convention. */
/* Kept in src/config.js because src/layout.js needs it too, to get the
   canonical URL right for the same two routes. It used to be declared only
   here, which is how the flat pages ended up declaring themselves canonical at
   a URL the platform serves as a redirect. */
const FLAT = new Set(flatRoutes);

function urlToFile(url) {
  if (url === '/') return 'index.html';
  const clean = url.replace(/^\//, '').replace(/\/$/, '');
  if (FLAT.has(url)) return clean + '.html';
  return clean + '/index.html';
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  mkdirp(to);
  let n = 0;
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, e.name);
    const d = path.join(to, e.name);
    if (e.isDirectory()) n += copyDir(s, d);
    else { fs.copyFileSync(s, d); n++; }
  }
  return n;
}

function clearDist() {
  if (!fs.existsSync(DIST)) return;
  try { fs.rmSync(DIST, { recursive: true, force: true }); }
  catch (err) {
    console.warn(`  note: could not clear ./dist (${err.code || err.message}) — overwriting.`);
  }
}

/* ------------------------------------------------------------------ *
 * page collection
 * ------------------------------------------------------------------ */

function collectPages() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.js')).sort();
  let pages = [];
  let deferred = [];

  for (const f of files) {
    const mod = require(path.join(PAGES, f));

    /* A factory that needs the full page list (e.g. the HTML sitemap) is
       deferred until every other page has been collected. */
    if (typeof mod === 'function') {
      deferred.push({ file: f, fn: mod });
      continue;
    }

    if (!Array.isArray(mod)) {
      throw new Error(`${f} must export an array of pages, or a factory returning one`);
    }
    pages = pages.concat(mod.map((p) => Object.assign({ __file: f }, p)));
  }

  for (const d of deferred) {
    const built = d.fn(pages);
    const list = Array.isArray(built) ? built : [built];
    pages = pages.concat(list.map((p) => Object.assign({ __file: d.file }, p)));
  }
  return pages;
}

/* ------------------------------------------------------------------ *
 * generated files
 * ------------------------------------------------------------------ */

/* lastmod describes when a page's *content* last changed.
 *
 * Stamping every URL with build time is the common shortcut and it is a bad
 * one: the sitemap is regenerated on every deploy, and CI deploys on every
 * push, so every page claims to have changed every single time. Crawlers
 * learn to distrust the signal, and an unchanged page that really did change
 * gets no credibility bump either.
 *
 * Source of truth is the page module's own mtime — that is the file a human
 * edits when the copy changes. src/bodies/*.html feed carried pages, so those
 * are folded in too. Anything unaccounted for falls back to today rather than
 * to a stale guess, which is the safe direction (a wrong-but-recent date
 * costs a recrawl; a wrong-but-old date risks the page never being revisited).
 *
 * Override per page with `lastmod: 'YYYY-MM-DD'` when you need it exact —
 * the legal pages use this so a copy tweak does not imply the terms changed. */
function lastmodFor(page) {
  if (page.lastmod) return page.lastmod;

  const stamp = (f) => {
    try { return fs.statSync(f).mtime; } catch { return null; }
  };

  const candidates = [];
  if (page.__file) {
    const p = path.join(ROOT, 'src', 'pages', page.__file);
    const m = stamp(p);
    if (m) candidates.push(m);
  }
  /* A carried page's prose lives in src/bodies/<slug>.html, not in the module
     that merely wires it up. Prefer the body when we can identify it. */
  if (page.body) {
    const m = stamp(path.join(ROOT, 'src', 'bodies', page.body));
    if (m) candidates.push(m);
  }

  const newest = candidates.reduce((a, b) => (a && a > b ? a : b), null);
  return (newest || new Date()).toISOString().slice(0, 10);
}

function buildSitemap(pages) {
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const loc = site.domain + (p.url === '/' ? '/' : p.url);
      const priority = p.url === '/' ? '1.0' : p.priority || '0.7';
      const freq = p.url === '/' ? 'weekly' : 'monthly';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(p)}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /thank-you/

# Block low-value duplicate-parameter URLs
Disallow: /*?utm_
Disallow: /*?ref=

# AI crawlers are welcome to read and cite this site.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# XML Sitemap
Sitemap: ${site.domain}/sitemap.xml
`;
}

function buildRedirects() {
  const lines = redirects.map(([from, to]) => `${from}  ${to}  301`).join('\n');
  return `# Cloudflare Pages redirect rules.
# 301 every legacy / WordPress-era URL to its canonical clean path.
${lines}

# NOTE: no apex -> www rule lives here on purpose.
#
# A rule whose source is the bare host, such as
#     https://example.com/*   https://www.example.com/:splat   301
# cannot work in this file. Cloudflare Pages matches the PATH only, never the
# hostname, so the pattern is read as "/*": it fires on www as well as on the
# apex, :splat resolves to nothing, and every request is answered with a
# redirect to a bare "/". That is an infinite loop, reported by browsers as
# ERR_TOO_MANY_REDIRECTS. It was live on this site once; hence the warning.
#
# Rules in this file are also followed BEFORE static files are considered, so
# a path rule here can shadow a page that exists.
#
# Force the canonical host from the dashboard instead:
#   Rules -> Redirect Rules -> if hostname equals "metapackink.com"
#   then dynamic redirect to concat("https://www.metapackink.com", http.request.uri.path)
`;
}

/* Cloudflare Pages header rules.
 *
 * READ THIS BEFORE EDITING.
 * Cloudflare does not let a later rule override an earlier one. When two
 * matching rules set the same header, the values are JOINED with a comma.
 * So a Cache-Control in the catch-all block would not be overridden by the
 * asset rules further down — it would be concatenated onto them, and a browser
 * would receive "no-cache, public, max-age=31536000, immutable", which is not
 * what either rule meant. That is why the HTML rules are explicit path
 * patterns rather than a catch-all. checkHeaders() below fails the build if
 * anyone puts a Cache-Control back into the catch-all block. */
function buildHeaders() {
  const formHost = FORM_HOST ? ' https://' + FORM_HOST : '';

  return `# Cloudflare Pages header rules. Generated by tools/build.js.

/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com${formHost}; frame-src 'self' https://www.google.com; base-uri 'self'; object-src 'none'; frame-ancestors 'self'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

# ------------------------------------------------------------------ #
# About the Content-Security-Policy                                   #
# ------------------------------------------------------------------ #
# This replaces a rule that was configured in the Cloudflare dashboard and
# never worked. Its header name was misspelled "ontent-Security-Policy", which
# is a valid header name that no browser recognises — so the policy was sent on
# every response and enforced on none. Keeping it in this file means it is
# versioned, reviewed and checked by the build.
#
# Each directive is here for a reason:
#
#   default-src 'self'   Nothing external is loaded that is not named below.
#   script-src           Google Tag Manager plus 'unsafe-inline' for the GA4
#                        snippet, which is written into every page by
#                        src/layout.js. Removing 'unsafe-inline' means moving
#                        that snippet to a file or hashing it.
#   style-src            'unsafe-inline' is required: the carried page bodies
#                        still use style="..." attributes in a few places
#                        (the hero headline colours, two dark-band headings).
#                        Without it those attributes are dropped and the text
#                        changes colour. checkHeaders() verifies this against
#                        the built HTML rather than trusting this note.
#   img-src              data: for inline SVG, plus GA's own pixels.
#   connect-src          'self' covers /cdn-cgi/trace, which js/forms.js reads
#                        to resolve the visitor's country, and the form host
#                        below, which it posts to. Dropping the form host stops
#                        every enquiry at the browser. checkHeaders() fails the
#                        build if it goes missing.
#   base-uri, object-src Hardening that costs nothing here.
#   frame-src            Google Maps, for the factory map on /contact/. 'self'
#                        is kept so a page may embed one of its own URLs later.
#                        Omit a host here and the frame is not blocked with an
#                        error — it renders as an empty rectangle, on a page
#                        that otherwise looks fine. checkHeaders() reads every
#                        iframe back out of the built HTML and fails the build
#                        if frame-src does not permit its host.
#   frame-ancestors      The modern equivalent of X-Frame-Options, which is kept
#                        as well for older browsers.
#
# NOT set: form-action. It would restrict where a <form> may submit, and the
# no-JavaScript path posts straight to the form host and then follows whatever
# redirect it returns. That redirect behaviour is not something this build can
# verify offline, and getting it wrong would break the no-JS path silently, so
# the directive is left out rather than added untested.

# ------------------------------------------------------------------ #
# HTML — always revalidate                                           #
# ------------------------------------------------------------------ #
# Pages are served as directory URLs (/about/, /products/rigid-boxes/) and
# every asset is served from a path that does not end in a slash. "/" and "/*/"
# between them therefore cover every page and no asset.
#
# no-cache means "you may store this response, but you must check with the
# server before reusing it". It is the strongest directive that still permits
# caching, and it means a visitor cannot be left on a page from an earlier
# deployment — which is exactly the problem it exists to prevent.
#
# The platform's own default for HTML is "public, max-age=0, must-revalidate",
# which is close to this but leaves the shared cache free to answer from a
# stored copy. Stating it here removes that freedom.
/
  Cache-Control: no-cache

/*/
  Cache-Control: no-cache

# Cloudflare serves /404 and /thank-you from the flat files at the root.
/404
  Cache-Control: no-cache

/404.html
  Cache-Control: no-cache

/thank-you
  Cache-Control: no-cache

/thank-you.html
  Cache-Control: no-cache

# ------------------------------------------------------------------ #
# Assets — safe for a year, because the URL is versioned             #
# ------------------------------------------------------------------ #
# Each of these is linked as "…?v=<build hash>"; see assetVersion() above. A
# rebuilt file has a different hash and therefore a different URL, so it cannot
# be served from a stale cache entry. A file left untouched keeps its hash and
# stays cached.
#
# The exception is /img/*, which is not versioned: replacing an image in place
# will not be seen by returning visitors until the cache expires. Give a
# changed image a new filename instead, which is the usual fix and costs
# nothing.
/style.css
  Cache-Control: public, max-age=31536000, immutable

/main.js
  Cache-Control: public, max-age=31536000, immutable

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

/* ------------------------------------------------------------------ *
 * _headers verification
 * ------------------------------------------------------------------ */

/* Split the generated file into its rule blocks. Unindented, non-comment lines
   start a block; indented lines are that block's headers. An "! Name" line
   detaches a header and is recorded as if it were that header, because the
   duplicate-detection below should see it. */
function parseHeaderBlocks(text) {
  const blocks = [];
  let block = null;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (!/^\s/.test(raw)) {
      block = { pattern: line, headers: [], values: {} };
      blocks.push(block);
      continue;
    }
    if (!block) continue;
    const cut = line.indexOf(':');
    const name = line.slice(0, cut).replace(/^!/, '').trim().toLowerCase();
    block.headers.push(name);
    block.values[name] = line.slice(cut + 1).trim();
  }
  return blocks;
}

/* The value of one directive in a CSP, or null when the directive is absent.
   Matching has to start at a ";" or the beginning of the policy, otherwise
   `script-src` would also be found inside a hypothetical `worker-script-src`
   and quietly return the wrong value. */
function cspDirective(policy, name) {
  const m = new RegExp('(?:^|;)\\s*' + name + '\\s+([^;]*)', 'i').exec(policy);
  return m ? m[1].trim() : null;
}

/* Does a CSP source list permit a given host? Deliberately narrow: it knows
   'self', '*', and the exact-host and wildcard-host forms this policy uses, so
   an unexpected token shows up as a failure rather than being waved through by
   a general-purpose URL matcher. */
function cspAllowsHost(sourceList, host) {
  const selfHost = (() => {
    try { return new URL(site.domain).host; } catch { return ''; }
  })();

  return sourceList.split(/\s+/).some((token) => {
    if (!token) return false;
    if (token === '*') return true;
    if (token === "'self'") return host === selfHost;
    const m = /^https?:\/\/(\*\.)?([^/\s]+)$/.exec(token);
    if (!m) return false;
    const wildcard = Boolean(m[1]);
    const named = m[2];
    return wildcard ? host === named || host.endsWith('.' + named) : host === named;
  });
}

/* Read a page straight back off disk. checkHeaders runs after every page has
   been written, so the built HTML is the authority on what the policy has to
   permit — reasoning about it from the sources is how you end up shipping a
   policy that drops the hero's colours. */
function readBuilt(page, cache) {
  const file = path.join(DIST, urlToFile(page.url));
  if (!cache.has(file)) {
    cache.set(file, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '');
  }
  return cache.get(file);
}

/* Does a rule's pattern match a request path? Deliberately narrow: it knows
   only the four forms this file uses, so an unexpected pattern shows up as a
   failure rather than being quietly accepted by a general glob. */
function headerPatternMatches(pattern, url) {
  if (pattern === url) return true;
  if (pattern === '/*') return true;
  if (pattern === '/*/') return url !== '/' && url.endsWith('/');
  if (pattern.endsWith('/*')) return url.startsWith(pattern.slice(0, -1));
  return false;
}

function checkHeaders(pages) {
  const blocks = parseHeaderBlocks(buildHeaders());
  const problems = [];

  for (const b of blocks) {
    const seen = new Set();
    for (const h of b.headers) {
      if (seen.has(h)) problems.push(`"${b.pattern}" sets ${h} twice`);
      seen.add(h);
    }
  }

  const patterns = blocks.map((b) => b.pattern);
  for (const p of new Set(patterns)) {
    if (patterns.filter((q) => q === p).length > 1) {
      problems.push(`duplicate rule pattern "${p}"`);
    }
  }

  /* The one mistake that would corrupt every asset rule at once. */
  const catchAll = blocks.find((b) => b.pattern === '/*');
  if (catchAll && catchAll.headers.includes('cache-control')) {
    problems.push(
      'the "/*" block sets Cache-Control. It overlaps every other rule, and ' +
      'Cloudflare joins the values of a header set by two matching rules, so ' +
      'its value would be concatenated onto the asset rules rather than ' +
      'letting them win'
    );
  }

  /* Every page must land on a rule that sets Cache-Control. One that does not
     silently inherits whatever the platform decides, which is how a page can
     go stale without anyone noticing. */
  for (const p of pages) {
    const covers = blocks.some(
      (b) => b.headers.includes('cache-control') && headerPatternMatches(b.pattern, p.url)
    );
    if (!covers) problems.push(`no Cache-Control rule matches the page ${p.url}`);
  }

  /* A Content-Security-Policy only helps if the header NAME is spelled right.
     A typo there produces a header that is syntactically valid and that no
     browser recognises, so the policy ships on every response and enforces
     nothing. That is not hypothetical here: this site served
     "ontent-Security-Policy" for months, and nothing — not the build, not the
     logs, not the console — ever said a word about it. */
  for (const b of blocks) {
    for (const name of b.headers) {
      if (/security-policy$/.test(name) && name !== 'content-security-policy') {
        problems.push(
          `"${b.pattern}" sets "${name}". Only "Content-Security-Policy" is ` +
          `recognised — any other spelling is ignored by every browser, which is ` +
          `how the previous policy came to be sent on every response and enforced ` +
          `on none`
        );
      }
    }
  }

  const csp = blocks.map((b) => b.values['content-security-policy']).find(Boolean);

  if (!csp) {
    problems.push(
      'no Content-Security-Policy is set. This file owns it now, precisely ' +
      'because the dashboard copy was misspelled for months and nobody noticed'
    );
  } else {
    /* The forms submit from JavaScript, and connect-src governs that fetch. A
       policy that forgets the endpoint does not break the build or the page —
       it makes every enquiry fail inside the browser, silently. */
    if (FORM_HOST && !csp.includes(FORM_HOST)) {
      problems.push(
        `the Content-Security-Policy does not allow ${FORM_HOST} in connect-src, ` +
        `so the browser would block every form submission`
      );
    }

    /* The policy has to permit what the pages actually contain. Read the built
       HTML rather than trusting the comment above it: an inline style attribute
       or an inline <script> stops working the moment the policy disallows it,
       and the page still returns 200, so nothing downstream notices.

       Each is checked against the directive that actually governs it — a
       style-src is governed by style-src, falling back to default-src only
       when style-src is absent. Testing the policy as a whole for the string
       'unsafe-inline' is not enough: script-src carries it too, so dropping it
       from style-src would sail through while the hero headline quietly went
       back to its default colour. */
    const cache = new Map();
    const inlineStyle = pages.some((p) => readBuilt(p, cache).includes(' style="'));
    const inlineScript = pages.some((p) => /<script>/.test(readBuilt(p, cache)));

    const governs = (directive) =>
      cspDirective(csp, directive) !== null
        ? cspDirective(csp, directive)
        : cspDirective(csp, 'default-src');

    if (inlineStyle) {
      const style = governs('style-src');
      if (style !== null && !style.includes("'unsafe-inline'")) {
        problems.push(
          `the pages contain inline style attributes, but style-src is "${style}" ` +
          `without 'unsafe-inline', so the browser would drop every one of them`
        );
      }
    }

    if (inlineScript) {
      const script = governs('script-src');
      if (script !== null && !script.includes("'unsafe-inline'")) {
        problems.push(
          `the pages contain inline <script> blocks, but script-src is "${script}" ` +
          `without 'unsafe-inline', so the browser would refuse to run them`
        );
      }
    }

    /* An embedded frame that the policy forbids does not fail, warn or log
       anything on the page — it renders as an empty rectangle inside a page
       that otherwise looks complete, which is the worst way for an embed to
       break. So every iframe the built HTML actually contains is read back and
       matched against frame-src, falling back to default-src when frame-src is
       absent: that fallback is exactly the path by which an embed added later
       dies without anyone seeing why. */
    const frameHosts = new Set();
    for (const p of pages) {
      const html = readBuilt(p, cache);
      for (const m of html.matchAll(/<iframe\b[^>]*\ssrc="([^"]+)"/gi)) {
        try {
          frameHosts.add(new URL(m[1]).host);
        } catch {
          /* a relative or malformed src — it cannot be matched against a host */
        }
      }
    }

    const frameSrc = governs('frame-src');
    for (const host of [...frameHosts].sort()) {
      if (frameSrc !== null && !cspAllowsHost(frameSrc, host)) {
        problems.push(
          `a page embeds https://${host} in an <iframe>, but frame-src resolves ` +
          `to "${frameSrc}", which does not permit it. The browser would show an ` +
          `empty box and report nothing. Add https://${host} to frame-src in ` +
          `buildHeaders()`
        );
      }
    }
  }

  if (problems.length) {
    throw new Error('_headers is wrong:\n    - ' + [...new Set(problems)].join('\n    - '));
  }
}

/* ------------------------------------------------------------------ *
 * asset version
 * ------------------------------------------------------------------ */

/* Every stylesheet and script the layout links, in a stable order so the hash
   below cannot change just because a directory listing came back differently. */
function versionedAssets() {
  const list = ['style.css', 'main.js'];
  for (const dir of ['css', 'js']) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full).sort()) {
      if (/\.(css|js)$/.test(f)) list.push(dir + '/' + f);
    }
  }
  return list;
}

/* A short hash of the CSS and JS the pages link, stamped onto their URLs as
   ?v=<hash>. This is what makes the one-year `immutable` cache in _headers
   safe: a changed file is a changed URL, so it cannot be served from cache,
   while an unchanged file keeps its entry. Revert a file and its old hash —
   and therefore its old cache entry — comes back. */
function assetVersion() {
  const h = crypto.createHash('sha256');
  for (const rel of versionedAssets()) {
    h.update(rel);
    try {
      h.update(fs.readFileSync(path.join(ROOT, rel)));
    } catch {
      /* A file that vanishes mid-build simply drops out of the hash. */
    }
  }
  return h.digest('hex').slice(0, 10);
}

/* Cloudflare Pages _routes.json: keep functions out of static asset paths. */
function buildRoutesJson() {
  return JSON.stringify({ version: 1, include: ['/*'], exclude: [] }, null, 2) + '\n';
}

/* ------------------------------------------------------------------ *
 * verification
 * ------------------------------------------------------------------ */

/* Refuse to publish anything that is not a website file.
 *
 * This exists because of a real incident: wrangler.toml had
 * `[assets] directory = "."`, so `npx wrangler deploy` uploaded the entire
 * repository. /src/config.js, /tools/build.js, /README-DEPLOY.md and
 * /.git/HEAD were all publicly downloadable. The directory setting is fixed,
 * but a single edit could undo that, so the build now checks the output. */
const SOURCE_MARKERS = [
  { test: /^\.git\//, what: 'git metadata' },
  { test: /^\.wrangler\//, what: 'wrangler scratch files' },
  { test: /^src\//, what: 'build sources' },
  { test: /^tools\//, what: 'build tooling' },
  { test: /^scripts\//, what: 'build scripts' },
  { test: /^node_modules\//, what: 'dependencies' },
  { test: /^README(-DEPLOY)?\.md$/, what: 'internal documentation' },
  { test: /^wrangler\.toml$/, what: 'deployment config' },
  { test: /^package(-lock)?\.json$/, what: 'build manifest' },
  { test: /\.(md|toml)$/, what: 'non-web file' }
];

function checkDistIsClean() {
  const leaked = [];
  const walk = (dir, rel) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      const r = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) { walk(abs, r); continue; }
      for (const m of SOURCE_MARKERS) {
        if (m.test.test(r)) { leaked.push(`${r}  (${m.what})`); break; }
      }
    }
  };
  if (fs.existsSync(DIST)) walk(DIST, '');

  if (leaked.length) {
    throw new Error(
      `dist/ contains files that must never be public:\n    - ` +
      leaked.join('\n    - ') +
      `\n  Check what is being copied into dist/ — this is how the source tree ` +
      `ended up downloadable.`
    );
  }
}

/* Read the [assets] table out of wrangler.toml.
 *
 * Deliberately a narrow reader rather than a TOML parser: it recognises
 * `[section]` headers and `key = value` lines inside the section it wants, and
 * ignores everything else. Comments are stripped before parsing, and quoted
 * values are unquoted. Good enough for the four keys this file can contain,
 * and it needs no dependency — the project has none, by design. */
function readWranglerAssets() {
  const file = path.join(ROOT, 'wrangler.toml');
  if (!fs.existsSync(file)) return null;

  const values = {};
  let section = null;

  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;

    const head = line.match(/^\[([^\]]+)\]$/);
    if (head) { section = head[1].trim(); continue; }
    if (section !== 'assets') continue;

    const kv = line.match(/^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/);
    if (kv) values[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }

  return values;
}

/* How the deployment must be configured.
 *
 * Two of these have bitten this site already, which is why the build checks
 * them rather than trusting a file nobody reads until something breaks:
 *
 *   directory          `"."` once published the whole repository.
 *   not_found_handling Unset, Workers Static Assets answers an unmatched
 *                      request itself with an empty 404 body. The branded
 *                      dist/404.html is then deployed but never seen — the
 *                      file looks present, the live site ignores it, and
 *                      nothing in the build output hints at why.
 *
 * This deploys through `npx wrangler deploy`, so these keys — not a
 * "output directory" field in a dashboard — decide what is published and how
 * a miss is handled. */
function checkWranglerConfig() {
  const problems = [];
  const assets = readWranglerAssets();

  if (!assets) {
    problems.push('wrangler.toml is missing, so the deploy has no asset directory');
  } else {
    const dir = assets.directory;
    if (!dir) {
      problems.push('[assets] sets no directory');
    } else if (dir.replace(/^\.\//, '').replace(/\/+$/, '') !== 'dist') {
      problems.push(
        `[assets] directory is "${dir}". It has to be ./dist — pointing it at the ` +
        `repository root is what put /src, /tools and /.git on the public internet`
      );
    }

    if (assets.not_found_handling !== '404-page') {
      const shown = assets.not_found_handling === undefined
        ? 'unset'
        : `"${assets.not_found_handling}"`;
      problems.push(
        `[assets] not_found_handling is ${shown}, so an unmatched request gets an ` +
        `empty 404 from the platform instead of dist/404.html`
      );
    }

    const html = assets.html_handling;
    const allowed = ['auto-trailing-slash', 'force-trailing-slash', 'drop-trailing-slash', 'none'];
    if (html !== undefined && !allowed.includes(html)) {
      problems.push(`[assets] html_handling is "${html}", which is not a documented value`);
    }
  }

  /* not_found_handling has nothing to serve without this file. */
  if (!fs.existsSync(path.join(DIST, '404.html'))) {
    problems.push('dist/404.html is missing, so not_found_handling would serve nothing');
  }

  if (problems.length) {
    throw new Error('deployment configuration:\n    - ' + problems.join('\n    - '));
  }
}

/* Warn about rendered HTML sitting outside dist/.
 *
 * The build only writes to dist/, so any generated page found next to the
 * sources is stale output from an earlier layout. It is dangerous rather than
 * merely untidy: a stale contact/index.html kept the placeholder form endpoint
 * after the real one had been configured, so deploying from the wrong
 * directory would have brought the broken form back. Warn loudly; do not fail,
 * because a deliberate /404.html or /thank-you.html at the root is legitimate.
 *
 * "Legitimate" here means exactly the three files Cloudflare looks up by
 * convention rather than by a URL we chose: the site root, the not-found page,
 * and the form thank-you page. Everything else the generator emits lives under
 * a directory. If FLAT / urlToFile() above ever changes, this list changes too. */
const ROOT_FLAT_ALLOWED = new Set(['index.html', '404.html', 'thank-you.html']);

function warnAboutStaleRootHtml() {
  const skip = new Set([
    'dist', 'src', 'node_modules', '.git', '.wrangler', 'tools', 'scripts',
    'css', 'js', 'img', 'images', 'fonts', 'assets'
  ]);
  const stale = [];
  for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (skip.has(e.name) || e.name.startsWith('.') || e.name.startsWith('_')) continue;
    /* Only things the build could have emitted: a flat .html, or a directory
       holding an index.html. */
    const rel = e.isDirectory()
      ? (fs.existsSync(path.join(ROOT, e.name, 'index.html')) ? e.name + '/index.html' : null)
      : (e.name.endsWith('.html') ? e.name : null);
    if (!rel) continue;
    /* The three conventional flat files stay. */
    if (ROOT_FLAT_ALLOWED.has(rel)) continue;
    /* Does this build actually write that same path into dist/? If so it is a
       duplicate artifact. The size comparison only enriches the message: equal
       means "exact copy, safe to delete", differing means "older than the
       build", which is the case worth shouting about. */
    const twin = path.join(DIST, rel);
    const identical = fs.existsSync(twin) &&
      fs.statSync(path.join(ROOT, rel)).size === fs.statSync(twin).size;
    stale.push({ rel, identical });
  }
  if (stale.length) {
    console.log('  ' + '!'.repeat(48));
    console.log('  !!  STALE RENDERED HTML IN THE REPO ROOT');
    console.log('  !!');
    console.log('  !!  Only dist/ is deployed, so these are ignored — but they');
    console.log('  !!  are out of date and will confuse anyone who deploys the');
    console.log('  !!  root by mistake. Delete them:');
    stale.slice(0, 10).forEach((s) =>
      console.log('  !!    ' + s.rel + (s.identical ? '' : '   (older than the build)')));
    if (stale.length > 10) console.log(`  !!    … and ${stale.length - 10} more`);
    console.log('  !!');
    console.log(`  !!  ${stale.length} rendered file(s) found next to the sources.`);
    console.log('  !!  Delete them; `node tools/build.js` regenerates dist/.');
    console.log('  ' + '!'.repeat(48) + '\n');
  }
}

function checkRedirects(pages) {
  const pageUrls = new Set(pages.map((p) => p.url));
  pageUrls.add('/');
  const problems = [];
  const seen = new Set();

  const norm = (u) => (u === '/' ? '/' : u.replace(/\/+$/, '') + '/');

  for (const [from, to] of redirects) {
    const f = norm(from);
    const t = norm(to);

    if (f === t) {
      problems.push(`redirect loops onto itself: ${from} -> ${to}`);
      continue;
    }
    if (seen.has(f)) {
      problems.push(`duplicate redirect source: ${from}`);
      continue;
    }
    seen.add(f);

    /* A 301 on a path that is also a real generated page would shadow that
       page forever, so the page could never render. */
    if (pageUrls.has(f)) {
      problems.push(`redirect shadows a live page: ${from} -> ${to}`);
    }
    /* Redirecting to something that does not exist is a soft 404. */
    const targetFile = path.join(DIST, t.replace(/^\//, ''));
    const targetExists =
      pageUrls.has(t) ||
      fs.existsSync(path.join(targetFile, 'index.html')) ||
      fs.existsSync(targetFile + '.html');
    if (!targetExists) {
      problems.push(`redirect target does not exist: ${from} -> ${to}`);
    }
  }

  if (problems.length) {
    throw new Error('redirect rules:\n    - ' + problems.join('\n    - '));
  }
}

/* Guard against the exact shape that caused the outage: a redirect whose
   source and destination resolve to the same place. Cloudflare follows
   _redirects before it looks at static assets, so a rule like
   `/about/  /about/  301` would bounce forever regardless of the file
   layout. checkRedirects covers equality; this covers the case where the
   source is a legacy .html path whose clean form is the destination AND
   Cloudflare is already going to do that redirect itself, which is what
   makes the two fight. */
function checkLegacyHtmlRules(pages) {
  const pageUrls = new Set(pages.map((p) => p.url));
  const offenders = [];

  for (const [from, to] of redirects) {
    if (!/\.html$/.test(from)) continue;
    const clean = '/' + from.replace(/^\//, '').replace(/\.html$/, '') + '/';
    if (pageUrls.has(clean) || pageUrls.has(clean.replace(/\/$/, ''))) {
      offenders.push(`${from} -> ${to}  (Cloudflare already redirects ${from} to ${clean.slice(0, -1)})`);
    }
  }

  if (offenders.length) {
    throw new Error(
      'redundant .html redirect rules — Cloudflare Pages already redirects these ' +
      'because the output is directory-style:\n    - ' + offenders.join('\n    - ')
    );
  }
}

/* Every internal href and src on a page, resolved to an absolute path.
 *
 * Shared by checkLinks() and checkArticles(): both need to know where a page
 * actually points, and a page writes its links relatively (../../request-a-
 * quote/), so the string in the HTML is not the route. `raw` is kept so an
 * error message can quote what the page really says rather than the rewrite.
 */
function internalTargets(pageUrl, html) {
  const depth = pageUrl === '/' ? 0 : pageUrl.replace(/\/$/, '').split('/').filter(Boolean).length;
  const base = depth === 0 ? '/' : pageUrl.replace(/[^/]*$/, '');
  const out = [];

  /* poster is checked as well as href/src: a <video> whose poster misses
     renders as an empty box in front of the player and reports nothing. */
  for (const m of html.matchAll(/\s(?:href|src|poster)\s*=\s*"([^"]+)"/g)) {
    const v = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(v)) continue;
    const clean = v.split('#')[0].split('?')[0];
    if (!clean) continue;
    out.push({
      raw: v,
      abs: clean.startsWith('/') ? clean : path.posix.normalize(base + clean)
    });
  }
  return out;
}

function checkLinks(pages) {
  const pageUrls = new Set(pages.map((p) => p.url));
  const broken = [];

  const resolves = (abs) => {
    if (pageUrls.has(abs)) return true;
    if (pageUrls.has(abs + '/')) return true;
    const direct = path.join(DIST, abs.replace(/^\//, ''));
    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
    /* /foo/ served from foo/index.html (directory style) … */
    if (fs.existsSync(path.join(direct, 'index.html'))) return true;
    /* … or from foo.html (the "/" and flat-page case) */
    if (fs.existsSync(direct + '.html')) return true;
    return false;
  };

  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');

    for (const { raw, abs } of internalTargets(p.url, html)) {
      if (!resolves(abs)) broken.push({ from: p.url, href: raw });
    }
  }

  if (broken.length) {
    const shown = broken.slice(0, 30).map((b) => `    ${b.from}  ->  ${b.href}`).join('\n');
    const more = broken.length > 30 ? `\n    ... and ${broken.length - 30} more` : '';
    throw new Error(`Broken internal reference(s): ${broken.length}\n${shown}${more}`);
  }
}

/* ------------------------------------------------------------------ *
 * button contrast
 * ------------------------------------------------------------------ */

/* A button's own colour is `.btn-primary { color:#fff }`, specificity (0,1,0).
 * A container rule such as `.aside-card a { color: var(--orange) }` is
 * (0,1,1) and outranks it, so a button inside `.aside-card` was drawn
 * white-on-orange as orange-on-orange: an empty orange rectangle. The label
 * appeared on hover only because `.btn-primary:hover` is (0,2,0) and beats the
 * container rule again — which is exactly the symptom that got reported.
 *
 * Nothing in the build noticed. The two buttons affected are the "Request a
 * quote" buttons in the article sidebars, so both published articles shipped
 * with an invisible call to action.
 *
 * The fix is `:not(.btn)` on the selector subject, which leaves `.btn-primary`
 * authoritative. This guard makes that the only way such a rule can be
 * written: it reads both stylesheets and the built HTML, and fails the build
 * whenever a rule that sets `color` on a descendant control can still reach a
 * button.
 *
 * Deliberately narrow, so that it never fails on a false positive:
 *
 *   - The subject must be the control element itself — `a`, `button` or a bare
 *     `input`. `.btn-primary { … }` and `.band-cta a.btn { … }` name a class,
 *     so they are colouring a button on purpose and are not touched.
 *   - The subject must not already carry `:not(.btn)`.
 *   - A pseudo-element subject (`a::before`) is skipped: it colours the
 *     generated box, not the element's own text.
 *   - `a { color: inherit }` is skipped. With no ancestor part it is (0,0,1)
 *     and cannot outrank (0,1,0) whatever the source order, which is why the
 *     buttons in the nav and the breadcrumbs render correctly.
 *
 * `:not()` is evaluated properly rather than pattern-matched, because
 * `.footer-grid a:not(.logo)` must not be read as requiring a `.logo`
 * ancestor. `:hover` and the other state pseudo-classes are ignored: a rule
 * that hides a label while hovered is the same defect as one that hides it at
 * rest.
 */

/* Every `selector { declarations }` pair, comments removed, including rules
   nested in @media blocks. At-rule preludes are dropped; their bodies are not. */
function cssRules(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [];
  const stack = [];
  let buf = '';
  for (const ch of src) {
    if (ch === '{') { stack.push(buf.trim()); buf = ''; continue; }
    if (ch === '}') {
      const sel = stack.pop();
      if (sel !== undefined && !sel.startsWith('@')) out.push({ sel, decl: buf });
      buf = '';
      continue;
    }
    buf += ch;
  }
  return out;
}

/* A selector list split on the commas that are not inside () or []. */
function splitSelectorList(sel) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of sel) {
    if ('(['.includes(ch)) depth++;
    if (')]'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/* One complex selector as compounds, each remembering the combinator that
   precedes it: `nav a:hover` -> [{c:'nav',k:' '}, {c:'a:hover',k:' '}]. */
function selectorCompounds(sel) {
  const parts = [];
  let cur = '';
  let pending = ' ';
  const flush = () => {
    if (!cur.trim()) return;
    parts.push({ compound: cur.trim(), combinator: pending });
    cur = '';
    pending = ' ';
  };
  for (const ch of sel) {
    if (ch === '>' || ch === '+' || ch === '~') { flush(); pending = ch; continue; }
    if (/\s/.test(ch)) { flush(); continue; }
    cur += ch;
  }
  flush();
  return parts;
}

/* Does one compound match one element? `node` is { tag, classes }. */
function compoundMatches(compound, node) {
  let rest = compound;
  const negations = [];
  rest = rest.replace(/:not\(\s*([^)]*?)\s*\)/g, (_, inner) => { negations.push(inner); return ''; });

  if (/^[a-zA-Z]/.test(rest)) {
    const tag = rest.match(/^[a-zA-Z][\w-]*/)[0].toLowerCase();
    if (node.tag !== tag) return false;
    rest = rest.slice(tag.length);
  } else if (rest.startsWith('*')) {
    rest = rest.slice(1);
  }
  for (const m of rest.matchAll(/\.([\w-]+)/g)) {
    if (!node.classes.includes(m[1])) return false;
  }
  /* Every :not() must fail against this node, or the compound does not match. */
  for (const inner of negations) if (compoundMatches(inner, node)) return false;
  return true;
}

/* Walk the compounds right to left against [<button node>, ...ancestors].
   `>` is honoured; the sibling combinators are treated as descendant, which
   can only over-report — and a rule that over-reports is one the maintainer
   should mark `:not(.btn)` anyway. */
function selectorReachesButton(parts, nodes) {
  const subject = parts[parts.length - 1];
  if (!compoundMatches(subject.compound, nodes[nodes.length - 1])) return false;

  let idx = nodes.length - 2;
  for (let k = parts.length - 2; k >= 0; k--) {
    const { compound, combinator } = parts[k];
    if (combinator === '>') {
      if (idx < 0 || !compoundMatches(compound, nodes[idx])) return false;
      idx--;
      continue;
    }
    let found = false;
    while (idx >= 0) {
      if (compoundMatches(compound, nodes[idx])) { found = true; idx--; break; }
      idx--;
    }
    if (!found) return false;
  }
  return true;
}

const CSS_VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'path', 'polygon', 'polyline', 'rect', 'circle', 'line', 'source', 'track',
  'use', 'wbr'
]);

/* Every `<a class="… btn …">` in one built page, as the node chain from the
   root down to the anchor itself. A tag stack rather than a nesting regex,
   because a stray `</div>` must not be able to close the wrong element. */
function buttonsIn(html) {
  const out = [];
  const stack = [];
  const src = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const m of src.matchAll(/<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g)) {
    const [, closing, rawTag, attrs] = m;
    const tag = rawTag.toLowerCase();
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break; }
      }
      continue;
    }
    if (CSS_VOID_ELEMENTS.has(tag) || attrs.trimEnd().endsWith('/')) continue;

    const classAttr = /\bclass\s*=\s*"([^"]*)"/i.exec(attrs);
    const classes = classAttr ? classAttr[1].trim().split(/\s+/).filter(Boolean) : [];
    const node = { tag, classes };
    if (classes.includes('btn')) out.push(stack.concat(node));
    stack.push(node);
  }
  return out;
}

/* In-page anchors: every `#fragment` must land on an element that carries it.
 *
 * checkLinks() strips the fragment before resolving a route — correctly, since
 * the fragment is not part of the path — so a href pointing at nothing on a
 * page that does exist is invisible to it. That is exactly how this site
 * shipped a contents list whose first entry went nowhere: /cookie-policy/
 * advertised "What we store, and why", but the section holding that id was
 * never rendered, so the link was dead from the day it was written and no
 * guard in this file could see it.
 *
 * It is not a routing failure — the page loads, nothing errors, clicking the
 * entry simply does nothing. */
function idSetOf(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\sid\s*=\s*"([^"]+)"/g)) ids.add(m[1]);
  return ids;
}

function checkAnchors(pages) {
  const html = new Map();
  const ids = new Map();
  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    html.set(p.url, text);
    ids.set(p.url, idSetOf(text));
  }

  const broken = [];
  for (const [url, text] of html) {
    const depth = url === '/' ? 0 : url.replace(/\/$/, '').split('/').filter(Boolean).length;
    const base = depth === 0 ? '/' : url.replace(/[^/]*$/, '');

    for (const m of text.matchAll(/\shref\s*=\s*"([^"]+)"/g)) {
      const v = m[1];
      if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(v)) continue;
      const hash = v.indexOf('#');
      if (hash < 0) continue;
      const frag = decodeURIComponent(v.slice(hash + 1));
      if (!frag) continue;                        /* `#` alone scrolls to the top */

      /* Nothing before the `#` means this page; anything else is resolved the
         same way checkLinks() resolves a route. */
      const before = v.slice(0, hash);
      let targetUrl = url;
      if (before) {
        const abs = before.startsWith('/') ? before : path.posix.normalize(base + before);
        targetUrl = abs.endsWith('/') ? abs : abs + '/';
      }
      /* A fragment aimed at a route this build does not produce is somebody
         else's problem — checkLinks() reports it. */
      const targetIds = ids.get(targetUrl);
      if (!targetIds) continue;
      if (!targetIds.has(frag)) broken.push(`${url} -> ${v}`);
    }
  }

  if (broken.length) {
    throw new Error(
      'broken in-page anchor(s) — no element on the page carries the id:\n    ' +
      [...new Set(broken)].join('\n    ')
    );
  }
}

function checkButtonContrast(pages) {
  const stylesheets = ['style.css', 'css/style-additions.css'];

  /* Buttons first: if there are none in the output, nothing can be hidden and
     the whole check is moot. */
  const buttons = [];
  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    for (const chain of buttonsIn(fs.readFileSync(file, 'utf8'))) {
      buttons.push({ url: p.url, chain });
    }
  }
  if (!buttons.length) return;

  const problems = [];
  for (const rel of stylesheets) {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) continue;

    for (const { sel, decl } of cssRules(fs.readFileSync(file, 'utf8'))) {
      /* Only `color:` — `border-color`, `background-color` and `outline-color`
         do not touch a label. */
      if (!/(^|;)\s*color\s*:/i.test(decl)) continue;

      for (const one of splitSelectorList(sel)) {
        const parts = selectorCompounds(one);
        const subject = parts[parts.length - 1];
        if (!subject) continue;
        /* The subject must be the control element itself, not a class: the
           class is what carries .btn-primary, and it is the element underneath
           that gets outranked. `<button class="btn btn-primary">` is the same
           hazard as `<a class="btn btn-primary">`, and 15 of the 95 buttons on
           this site are submits, so both shapes are covered. A bare `input` is
           included because a hidden label there is the same defect;
           `input[type="text"]` and `select` are deliberately not, since those
           are the form-field rules and cannot carry .btn here. */
        if (!/^(?:a|button|input)(?![-\w])/.test(subject.compound)) continue;
        if (subject.compound.includes('[')) continue;          /* input[type=…] */
        if (parts.length < 2) continue;                        /* `a { }` — (0,0,1) */
        if (/::/.test(subject.compound)) continue;             /* a::before colours the marker  */
        if (/:not\(\s*\.btn\s*\)/.test(subject.compound)) continue;

        const hits = buttons.filter((b) => selectorReachesButton(parts, b.chain));
        if (!hits.length) continue;

        /* Rebuild the selector with the fix applied, so the message is a
           selection to copy rather than a description of one. The subject is
           the tail of the string, because that is where it was parsed from. */
        const fixed = one.slice(0, one.length - subject.compound.length) +
          subject.compound.replace(/^(a|button|input)/, '$1:not(.btn)');

        const shown = [...new Set(hits.map((h) => h.url))];
        const sample = shown.slice(0, 3).join(', ') +
          (shown.length > 3 ? `, +${shown.length - 3} more` : '');
        problems.push(
          `${one}  (${rel})\n` +
          `      colours the label of ${hits.length} button(s): ${sample}\n` +
          `      fix: ${fixed}`
        );
      }
    }
  }

  if (problems.length) {
    throw new Error(
      'button contrast — a container rule is setting `color` on a descendant ' +
      'control that is a button, so the label is drawn in the background\'s own ' +
      'colour and the button reads as a bare rectangle (until :hover outranks ' +
      'the rule again):\n\n    ' +
      [...new Set(problems)].join('\n\n    ')
    );
  }
}

/* ------------------------------------------------------------------ *
 * published facts
 * ------------------------------------------------------------------ */

/* llms.txt is the one file on this site that is written by hand, copied to the
 * deploy root untouched, and checked by nothing. That combination is exactly
 * why it was still advertising sales@gooinpack.com — the address of the
 * previous brand — and four URLs the directory-style rebuild had already
 * retired, long after both had stopped being true. It is handed to machine
 * readers as the description of this site, so being wrong in it is worse than
 * being wrong on a page a person can sanity-check.
 *
 * Two things are verified here: that no address other than the configured one
 * is published anywhere in the deploy output, and that every internal link in
 * llms.txt points at a page this build actually produces. */
function checkPublishedFacts(pages) {
  const problems = [];
  const allowed = new Set(
    [site.contact.email, site.fallbackEmail].map((e) => String(e).toLowerCase())
  );

  /* Walk everything that ships, so the check cannot be sidestepped by adding a
     page that mentions an address somewhere new. */
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!/\.(html|txt|xml|js|css|json)$/.test(e.name)) continue;
      const rel = path.relative(DIST, full).split(path.sep).join('/');

      /* A placeholder is an example the visitor types over, not an address we
         publish — jane@company.com is correctly not ours. */
      const text = fs.readFileSync(full, 'utf8').replace(/placeholder="[^"]*"/g, '');
      for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
        if (!allowed.has(m[0].toLowerCase())) {
          problems.push(`${rel} publishes ${m[0]}, which is not ${site.contact.email}`);
        }
      }
    }
  };
  walk(DIST);

  /* llms.txt is not generated, so its links need checking separately from the
     pages checkLinks() already covers. */
  const llms = path.join(DIST, 'llms.txt');
  if (fs.existsSync(llms)) {
    const known = new Set(pages.map((p) => p.url));
    for (const m of fs.readFileSync(llms, 'utf8')
      .matchAll(/\((https:\/\/www\.metapackink\.com[^)\s]*)\)/g)) {
      const route = new URL(m[1]).pathname;
      const clean = route === '/' ? '/' : route.replace(/\/+$/, '') + '/';
      if (!known.has(clean)) {
        problems.push(`llms.txt links to ${route}, which is not a page this build produces`);
      }
    }
  }

  const unique = [...new Set(problems)];
  if (unique.length) {
    throw new Error('published facts:\n    - ' + unique.join('\n    - '));
  }
}

function checkSchema(pages) {
  const bad = [];
  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch (e) { bad.push(`${p.url}: ${e.message}`); }
    }
  }
  if (bad.length) throw new Error('Invalid JSON-LD:\n    ' + bad.join('\n    '));
}

/* ------------------------------------------------------------------ *
 * article catalogue
 * ------------------------------------------------------------------ */

/* The article catalogue is the one place where a title, a date, a body file
 * and a thumbnail are named separately and have to agree — so it is where
 * mismatches are cheapest to make and quietest to ship.
 *
 * Four of those mismatches are already hard errors inside the article builders
 * in src/articles/index.js, because the builders cannot do their job without
 * the answer:
 *
 *   body file missing      loadBody()      throws; it has to read the file
 *   <h2> with no id        extractToc()    throws; the id is the anchor
 *   unknown related slug   relatedEntries() throws, for published entries
 *   duplicate slug         build()         the duplicate-URL guard sees the page
 *
 * Those are deliberately NOT repeated below. A guard that cannot be reached is
 * worse than no guard: it reads like coverage that is not there, and it is one
 * more thing to keep true. What is checked here is the set the builders never
 * look at, because every one of them concerns either an entry that produces no
 * page or a page that no builder writes:
 *
 *   a planned entry's date, thumbnail and related slugs — never read at all
 *   a duplicate slug between two planned entries — produces no pages, so the
 *     duplicate-URL guard cannot see it
 *   an empty body — loadBody() returns "" rather than failing, so a published
 *     article can currently be built with no words in it
 *   a link to a planned entry — the mistake that makes `planned: true` unsafe
 *   a published article that its own list does not link to — in the sitemap
 *     and reachable from nowhere
 */
function checkArticles(pages) {
  const { allCollections, isPublished, articleUrl } = require('../src/articles');

  const problems = [];
  const IMG = path.join(ROOT, 'img');
  const planned = new Map();     /* absolute url -> the entry that declared it */
  const published = [];          /* { url, list } */

  for (const { col, entries } of allCollections()) {
    const slugs = new Set();

    for (const entry of entries) {
      const label = entry.slug || '(no slug)';

      if (!entry.slug) { problems.push(`${col.key}: an entry has no slug`); continue; }
      if (slugs.has(entry.slug)) problems.push(`${col.key}/${label} is a duplicate slug`);
      slugs.add(entry.slug);

      /* formatDate() throws on a bad date, but only for the entries it is
         called for, which are the published ones. A typo in a planned entry's
         date is not caught by anything else until the day it is published. */
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(entry.date || ''))) {
        problems.push(`${col.key}/${label}: date "${entry.date}" is not YYYY-MM-DD`);
      }
      if (entry.updated && !/^\d{4}-\d{2}-\d{2}$/.test(String(entry.updated))) {
        problems.push(`${col.key}/${label}: updated "${entry.updated}" is not YYYY-MM-DD`);
      }

      /* Card media falls back to a plate when there is no image, so a name
         that does not resolve is not an error — it is a broken <img> inside a
         card that otherwise looks finished. */
      if (entry.img && !fs.existsSync(path.join(IMG, entry.img))) {
        problems.push(`${col.key}/${label} names thumbnail img/${entry.img}, which does not exist`);
      }

      const url = articleUrl(entry, col);

      if (isPublished(entry)) {
        published.push({ url, list: col.url });
        const body = path.join(ROOT, 'src', 'articles', 'bodies', (entry.body || entry.slug) + '.html');
        if (fs.existsSync(body) && !fs.readFileSync(body, 'utf8').trim()) {
          problems.push(`${col.key}/${label} is published with an empty body`);
        }
        continue;
      }

      planned.set(url, label);

      /* Nothing reads a planned entry, so an unresolvable `related` sits there
         until the article is written — at which point it becomes a hard error
         in relatedEntries() against a catalogue that has moved on. */
      for (const rel of entry.related || []) {
        if (!entries.some((e) => e.slug === rel)) {
          problems.push(`${col.key}/${label}: related article "${rel}" is not in ${col.key}`);
        }
      }
    }
  }

  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    const targets = internalTargets(p.url, fs.readFileSync(file, 'utf8'));

    for (const t of targets) {
      if (planned.has(t.abs)) {
        problems.push(
          `${p.url} links to ${t.abs} ("${t.raw}"), which is planned but not written. ` +
          `Write the article or remove the link`
        );
      }
    }

    /* Reachability is checked list page by list page, against the list the
       article says it belongs to. Matching on a URL prefix instead would drag
       the home page in — every path starts with "/" — and report it for not
       linking to every article on the site. */
    for (const { url } of published.filter((e) => e.list === p.url)) {
      if (!targets.some((t) => t.abs === url)) problems.push(`${p.url} does not link to ${url}`);
    }
  }

  if (problems.length) {
    throw new Error('article catalogue:\n    - ' + [...new Set(problems)].join('\n    - '));
  }
}

/* ------------------------------------------------------------------ *
 * trade figures
 * ------------------------------------------------------------------ */

/* Every published lead time has to be one of the ranges in src/config.js.
 *
 * The site had already drifted once: a draft article quoted "15 to 25 working
 * days" while the product pages and the terms said "12 to 20". A buyer
 * comparing two pages of the same site is exactly the reader who notices, and
 * the mistake is invisible to everyone else. So rather than trusting every
 * future page to copy the numbers correctly, this reads them back out of the
 * built HTML and compares them with the approved set.
 *
 * Only "working days" is matched. "1 – 2 days" for a requirements review is a
 * service-level nicety rather than a contracted lead time, and pinning every
 * such phrase to a config value would make the guard noisy enough to disable —
 * which is the failure mode a guard cannot recover from. */
function checkTradeLanguage(pages) {
  const { trade } = require('../src/config');
  const approved = new Set(
    [trade.sampleLead, trade.productionLead].map((v) => String(v).replace(/\s+/g, ' ').trim())
  );

  const problems = [];
  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    /* Entities would otherwise split a range across the pattern. */
    const text = fs.readFileSync(file, 'utf8').replace(/&nbsp;|&#8209;|&ndash;/g, ' ');

    for (const m of text.matchAll(/(\d+)\s*(?:–|—|-|\bto\b)\s*(\d+)\s*working days/gi)) {
      const found = `${m[1]} – ${m[2]} working days`;
      if (!approved.has(found)) {
        problems.push(
          `${p.url} says "${m[0].replace(/\s+/g, ' ').trim()}". The approved ` +
          `ranges are ${[...approved].join(' and ')} — change it there rather than here`
        );
      }
    }
  }

  if (problems.length) {
    throw new Error('lead times:\n    - ' + [...new Set(problems)].join('\n    - '));
  }
}

/* ------------------------------------------------------------------ *
 * main
 * ------------------------------------------------------------------ */

function build() {
  clearDist();
  mkdirp(DIST);

  const pages = collectPages();

  const seen = new Set();
  for (const p of pages) {
    if (seen.has(p.url)) throw new Error(`Duplicate page URL: ${p.url}`);
    seen.add(p.url);
  }

  /* Hashed before the pages are rendered, because the hash is part of the
     stylesheet and script URLs those pages contain. */
  const version = assetVersion();
  setAssetVersion(version);

  for (const page of pages) {
    write(urlToFile(page.url), renderPage(page));
  }

  /* assets and config */
  const cssCount = copyDir(path.join(ROOT, 'css'), path.join(DIST, 'css'));
  const jsCount = copyDir(path.join(ROOT, 'js'), path.join(DIST, 'js'));
  fs.copyFileSync(path.join(ROOT, 'style.css'), path.join(DIST, 'style.css'));
  fs.copyFileSync(path.join(ROOT, 'main.js'), path.join(DIST, 'main.js'));
  const imgCount = copyDir(path.join(ROOT, 'img'), path.join(DIST, 'img'));

  write('sitemap.xml', buildSitemap(pages));
  write('robots.txt', buildRobots());
  write('_redirects', buildRedirects());
  write('_headers', buildHeaders());
  write('_routes.json', buildRoutesJson());

  /* 404 — Cloudflare Pages serves 404.html for any unmatched path */
  const notFound = pages.find((p) => p.url === '/404/');
  if (notFound) fs.copyFileSync(path.join(DIST, urlToFile('/404/')), path.join(DIST, '404.html'));

  /* llms.txt is maintained by hand; carry it through */
  const llms = path.join(ROOT, 'llms.txt');
  if (fs.existsSync(llms)) fs.copyFileSync(llms, path.join(DIST, 'llms.txt'));

  checkDistIsClean();
  checkWranglerConfig();
  checkRedirects(pages);
  checkLegacyHtmlRules(pages);
  checkHeaders(pages);
  /* Before checkLinks(): a link to an article that is planned but not written
     fails both checks, and this one says so in those words. Running it first
     means the maintainer is told the article is scheduled rather than being
     told the route is broken. */
  checkArticles(pages);
  checkLinks(pages);
  /* After checkLinks(): both read the same hrefs, but this one keeps the
     fragment the Route check discards, so it can say what is missing. */
  checkAnchors(pages);
  /* Reads the built HTML for the buttons and the source stylesheets for the
     rules that might colour them, so it has to run after both exist. */
  checkButtonContrast(pages);
  checkPublishedFacts(pages);
  checkSchema(pages);
  checkTradeLanguage(pages);
  warnAboutStaleRootHtml();

  const bySection = {};
  for (const p of pages) {
    const seg = p.url.split('/').filter(Boolean)[0] || 'root';
    bySection[seg] = (bySection[seg] || 0) + 1;
  }

  console.log('\n  Metapackink build\n  ' + '-'.repeat(48));
  console.log(`  pages written       ${pages.length}`);
  console.log(`  sitemap urls        ${pages.filter((p) => !p.noindex).length}`);
  console.log(`  redirects           ${redirects.length}`);
  console.log(`  asset version       ${version}`);
  console.log(`  images copied       ${imgCount}`);
  console.log(`  css additions       ${cssCount} file(s)`);
  console.log(`  js additions        ${jsCount} file(s)`);
  console.log('  ' + '-'.repeat(48));
  Object.entries(bySection).sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${k.padEnd(22)}${v}`));
  console.log(`\n  output -> ${path.relative(process.cwd(), DIST)}\n`);

  /* Loud, because a placeholder endpoint means every enquiry falls back to
     the visitor's mail client — which silently does nothing on a device with
     no mail app configured. Easy to forget, expensive to miss. */
  if (!FORM_CONFIGURED) {
    console.log('  ' + '!'.repeat(48));
    console.log('  !!  FORM ENDPOINT IS STILL THE PLACEHOLDER');
    console.log('  !!');
    console.log('  !!  Forms will open the visitor\'s mail client instead of');
    console.log('  !!  submitting. On phones with no mail app that fails silently.');
    console.log('  !!');
    console.log('  !!  Set site.formId in src/config.js before taking traffic.');
    console.log('  ' + '!'.repeat(48) + '\n');
  }

  return pages;
}

if (require.main === module) {
  const pages = build();
  if (process.argv.includes('--check')) {
    console.log('  verification  PASS — no broken links, all JSON-LD parses\n');
  }
  /* --serve: static preview with Cloudflare's extensionless behaviour */
  if (process.argv.includes('--serve')) {
    const http = require('http');
    const types = {
      '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8', '.xml': 'application/xml',
      '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg', '.png': 'image/png', '.txt': 'text/plain; charset=utf-8',
      '.json': 'application/json', '.ico': 'image/x-icon'
    };
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      /* Mimic Cloudflare Pages' resolution order for the directory-style
         output this build produces:
           /products/rigid-boxes/  -> products/rigid-boxes/index.html
           /about                  -> about/index.html  (extension-less too)
           /                        -> index.html
         The trailing slash has to be stripped before the .html candidate is
         tried, otherwise the path resolves to a directory that is not a file. */
      const trimmed = url.replace(/\/+$/, '');
      const candidates = [
        path.join(DIST, url, 'index.html'),        /* /about/ -> about/index.html */
        path.join(DIST, trimmed, 'index.html'),    /* /about  -> about/index.html */
        path.join(DIST, trimmed + '.html'),        /* flat pages: 404.html, thank-you.html */
        path.join(DIST, url),
        path.join(DIST, trimmed)
      ];

      let file = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
      let code = 200;
      if (!file) { file = path.join(DIST, '404.html'); code = 404; }
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end('Not found'); }

      res.writeHead(code, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(fs.readFileSync(file));
    });
    const port = Number(process.env.PORT || 4173);
    server.listen(port, '127.0.0.1', () => console.log(`  preview  ->  http://127.0.0.1:${port}/\n`));
  }
}

module.exports = { build, urlToFile, mkdirp, DIST, ROOT };
