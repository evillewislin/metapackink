'use strict';

/* ------------------------------------------------------------------ *
 * Standalone HTML -> XML sitemap converter
 *
 * Takes the single-file HTML sitemap page (/sitemap/) and emits a valid
 * XML sitemap. Useful when you only have the rendered HTML and not the
 * build pipeline.
 *
 *   node tools/sitemap-xml.js sitemap.html sitemap.xml
 *
 * With no arguments it reads sitemap.html from the project root and
 * writes sitemap.xml next to it.
 *
 * It reads the structure the sitemap page actually uses:
 *   <h2>Group heading</h2>
 *   <ul class="sitemap-list">
 *     <li><a href="../products/">Products</a><span class="sitemap-url">/products/</span></li>
 *   </ul>
 *
 * Priority is derived from URL depth and section, matching the values the
 * build pipeline assigns, so both routes produce the same file.
 * ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DEFAULT_DOMAIN = 'https://www.metapackink.com';

/* Pages that must never appear in a public sitemap. */
const EXCLUDE = new Set(['/404/', '/thank-you/', '/sitemap.xml', '/sitemap.html']);

/* Cloudflare Pages serves extensionless clean URLs; anything ending in
   .html is a legacy path and should be canonicalised away. */
const EXTENSIONLESS = true;

function decode(s) {
  return String(s)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/* Strip tags and collapse whitespace — the label is used for reference
   only, so it must survive whatever markup the anchor contains. */
function textOf(html) {
  return decode(String(html).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function resolvePath(href) {
  let h = decode(String(href)).trim();
  if (!h) return null;
  if (/^(mailto:|tel:|data:|javascript:)/i.test(h)) return null;

  /* Absolute URL on our own domain -> pathname. */
  const abs = h.match(/^https?:\/\/[^/]+(\/.*)?$/i);
  if (abs) h = abs[1] || '/';

  h = h.split('#')[0].split('?')[0];
  if (!h) return null;

  /* Collapse ../ and ./ against a root base. */
  const out = [];
  for (const seg of h.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') { out.pop(); continue; }
    out.push(seg);
  }
  h = '/' + out.join('/');
  if (h !== '/' && !h.endsWith('/') && !/\.[a-z0-9]+$/i.test(h)) h += '/';

  if (EXTENSIONLESS && /\.html?$/i.test(h)) h = h.replace(/\.html?$/i, '/').replace(/\/+/g, '/');

  return h;
}

function priorityFor(url) {
  if (url === '/') return '1.0';
  if (EXCLUDE.has(url)) return null;

  const segs = url.split('/').filter(Boolean);
  const top = segs[0];

  if (top === 'privacy-policy' || top === 'terms' || top === 'cookie-policy') return '0.3';
  if (top === 'sitemap') return '0.4';

  if (url === '/products/' || url === '/packaging-solutions/') return '0.9';
  if (url === '/contact/' || url === '/request-a-quote/') return '0.9';

  /* The industries hub is 0.8, its child pages are 0.7. The hub test must
     come first so it is not swallowed by the child rule. */
  if (url === '/industries/') return '0.8';
  if (top === 'industries') return '0.7';
  if (url === '/request-sample/' || url === '/faq/') return '0.8';

  if (top === 'products') return '0.8'; /* product detail pages */
  return '0.7';
}

function parseSitemap(html) {
  const items = [];
  const seen = new Set();

  /* Each <li> in a sitemap-list holds one link. Pair the anchor with the
     optional sitemap-url span; fall back to the anchor href. */
  const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(html)) !== null) {
    const body = m[1];
    const a = body.match(/<a\b[^>]*href\s*=\s*"([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!a) continue;

    const url = resolvePath(a[1]);
    if (!url || EXCLUDE.has(url) || seen.has(url)) continue;

    const span = body.match(/<span\b[^>]*class\s*=\s*"[^"]*sitemap-url[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    const shown = span ? textOf(span[1]) : '';
    const label = shown && shown.startsWith('/') ? textOf(a[2]) : textOf(a[2]);

    seen.add(url);
    items.push({ url, label, priority: priorityFor(url) });
  }
  return items;
}

function buildXml(items, domain, lastmod) {
  const lines = items
    .filter((it) => it.priority !== null)
    .sort((a, b) => {
      if (a.url === '/') return -1;
      if (b.url === '/') return 1;
      return parseFloat(b.priority) - parseFloat(a.priority) || a.url.localeCompare(b.url);
    })
    .map((it) => {
      const loc = domain + (it.url === '/' ? '/' : it.url);
      const freq = it.url === '/' ? 'weekly' : 'monthly';
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${it.priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines}\n</urlset>\n`;
}

function main() {
  const args = process.argv.slice(2);
  const here = path.resolve(__dirname, '..');
  const input = path.resolve(here, args[0] || 'sitemap.html');
  const output = path.resolve(here, args[1] || 'sitemap.xml');

  if (!fs.existsSync(input)) {
    console.error(`Input not found: ${input}`);
    process.exit(1);
  }

  const html = fs.readFileSync(input, 'utf8');

  /* Prefer the canonical tag for the domain so the file matches the page. */
  let domain = DEFAULT_DOMAIN;
  const canon = html.match(/<link\b[^>]*rel\s*=\s*"canonical"[^>]*href\s*=\s*"([^"]+)"/i);
  if (canon) {
    const o = canon[1].match(/^(https?:\/\/[^/]+)/i);
    if (o) domain = o[1];
  }

  const items = parseSitemap(html);
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = buildXml(items, domain, lastmod);

  fs.writeFileSync(output, xml, 'utf8');

  console.log(`\n  Sitemap XML\n  ${'-'.repeat(48)}`);
  console.log(`  input               ${path.relative(process.cwd(), input)}`);
  console.log(`  output              ${path.relative(process.cwd(), output)}`);
  console.log(`  domain              ${domain}`);
  console.log(`  urls written        ${items.filter((i) => i.priority !== null).length}`);
  console.log(`  ${'-'.repeat(48)}\n`);
}

if (require.main === module) main();

module.exports = { parseSitemap, buildXml, resolvePath, priorityFor };
