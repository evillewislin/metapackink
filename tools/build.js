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

const { site, redirects } = require('../src/config');
const { renderPage } = require('../src/layout');

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

/* '/about/' -> 'about.html';  '/industries/cosmetics/' -> 'industries/cosmetics.html';
   '/' -> 'index.html'  — the layout Cloudflare Pages expects for clean URLs. */
function urlToFile(url) {
  if (url === '/') return 'index.html';
  return url.replace(/^\//, '').replace(/\/$/, '') + '.html';
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

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const loc = site.domain + (p.url === '/' ? '/' : p.url);
      const priority = p.url === '/' ? '1.0' : p.priority || '0.7';
      const freq = p.url === '/' ? 'weekly' : 'monthly';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
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

# Canonical host: force www (pages.dev preview URLs are left alone).
https://metapackink.com/*  https://www.metapackink.com/:splat  301
`;
}

function buildHeaders() {
  return `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN

/style.css
  Cache-Control: public, max-age=31536000, immutable

/main.js
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

/* Cloudflare Pages _routes.json: keep functions out of static asset paths. */
function buildRoutesJson() {
  return JSON.stringify({ version: 1, include: ['/*'], exclude: [] }, null, 2) + '\n';
}

/* ------------------------------------------------------------------ *
 * verification
 * ------------------------------------------------------------------ */

function checkLinks(pages) {
  const pageUrls = new Set(pages.map((p) => p.url));
  const broken = [];

  const resolves = (abs) => {
    if (pageUrls.has(abs)) return true;
    if (pageUrls.has(abs + '/')) return true;
    const direct = path.join(DIST, abs.replace(/^\//, ''));
    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
    /* /foo/ served from foo.html */
    if (fs.existsSync(direct + '.html')) return true;
    return false;
  };

  for (const p of pages) {
    const file = path.join(DIST, urlToFile(p.url));
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const depth = p.url === '/' ? 0 : p.url.replace(/\/$/, '').split('/').filter(Boolean).length;
    const base = depth === 0 ? '/' : p.url.replace(/[^/]*$/, '');

    for (const m of html.matchAll(/\s(?:href|src)\s*=\s*"([^"]+)"/g)) {
      const v = m[1];
      if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(v)) continue;
      const clean = v.split('#')[0].split('?')[0];
      if (!clean) continue;
      const abs = clean.startsWith('/') ? clean : path.posix.normalize(base + clean);
      if (!resolves(abs)) broken.push({ from: p.url, href: v });
    }
  }

  if (broken.length) {
    const shown = broken.slice(0, 30).map((b) => `    ${b.from}  ->  ${b.href}`).join('\n');
    const more = broken.length > 30 ? `\n    ... and ${broken.length - 30} more` : '';
    throw new Error(`Broken internal reference(s): ${broken.length}\n${shown}${more}`);
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

  checkLinks(pages);
  checkSchema(pages);

  const bySection = {};
  for (const p of pages) {
    const seg = p.url.split('/').filter(Boolean)[0] || 'root';
    bySection[seg] = (bySection[seg] || 0) + 1;
  }

  console.log('\n  Metapackink build\n  ' + '-'.repeat(48));
  console.log(`  pages written       ${pages.length}`);
  console.log(`  sitemap urls        ${pages.filter((p) => !p.noindex).length}`);
  console.log(`  redirects           ${redirects.length}`);
  console.log(`  images copied       ${imgCount}`);
  console.log(`  css additions       ${cssCount} file(s)`);
  console.log(`  js additions        ${jsCount} file(s)`);
  console.log('  ' + '-'.repeat(48));
  Object.entries(bySection).sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${k.padEnd(22)}${v}`));
  console.log(`\n  output -> ${path.relative(process.cwd(), DIST)}\n`);

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
      /* Mimic Cloudflare Pages: a clean trailing-slash URL is served from the
         matching .html file, so /products/rigid-boxes/ -> products/rigid-boxes.html.
         The trailing slash has to be stripped before the .html candidate is
         tried, otherwise the path resolves to a directory that does not exist. */
      const trimmed = url.replace(/\/+$/, '');
      const candidates = [
        path.join(DIST, url, 'index.html'),
        path.join(DIST, trimmed + '.html'),
        path.join(DIST, url),
        path.join(DIST, trimmed, 'index.html'),
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
